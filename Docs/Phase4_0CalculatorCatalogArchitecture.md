# Phase 4.0 — Calculator Catalog Architecture

**Status:** Specification — not implemented  
**Date:** 2026-09-02

## Decision

**One source of truth:** `lib/calculator-catalog.ts` (new, Phase 4.1)  
**Publication gate:** Derived `publishedCalculatorRoutes` — `published-calculators.ts` becomes a **re-export shim** for backward compatibility, then may be removed in Phase 4.5.

Avoid two conflicting registries: portfolio planning fields merge into catalog `status`; no parallel `calculator-portfolio.ts` arrays after migration.

---

## Category record

```typescript
export type CategoryId =
  | "math"
  | "statistics"
  | "finance"
  | "business"
  | "everyday-life"
  | "date-time"
  | "conversions"
  | "construction"
  | "health"
  | "science";

export type CategoryRecord = {
  /** Stable machine id — equals URL slug */
  id: CategoryId;
  /** Display name */
  name: string;
  /** One-line directory description */
  description: string;
  /** Minimum published calculators before indexable category page */
  minPublishedForIndex: number; // default 3; statistics may override to 2
  /** Editorial risk rollup for category-level review cadence */
  editorialRiskLevel: "low" | "medium" | "high";
};
```

---

## Calculator record (implementation-ready)

```typescript
export type CalculatorStatus =
  | "published"
  | "launch-candidate"
  | "expansion-candidate"
  | "deferred"
  | "cancelled";

export type SearchIntent =
  | "calculate"      // user wants a numeric/tool result
  | "explain"        // user wants steps + interpretation
  | "compare"        // user choosing between methods/tools
  | "convert";       // unit or format transformation

export type EditorialRiskLevel = "low" | "medium" | "high";

export type CalculatorRecord = {
  // ── Identity (required) ──────────────────────────────────
  /** Stable unique id, never changes — e.g. "statistics-mad" */
  id: string;
  /** Full display name — page H1 source */
  name: string;
  /** Card / search title when space constrained */
  shortName: string;
  /** URL segment — kebab-case */
  slug: string;
  /** Foreign key to CategoryRecord.id */
  categoryId: CategoryId;

  // ── Routing (required) ─────────────────────────────────────
  /** Canonical path with trailing slash */
  route: `/calculators/${CategoryId}/${string}/`;

  // ── Discovery copy (required) ──────────────────────────────
  /** 1–2 sentences for cards and meta description base */
  description: string;

  // ── Lifecycle (required) ───────────────────────────────────
  status: CalculatorStatus;

  // ── SEO / editorial (required for published; optional otherwise) ──
  primarySearchIntent: SearchIntent;
  /** Search-only synonyms — never create alias URLs */
  searchAliases: string[];

  // ── Graph (required) ───────────────────────────────────────
  /** CalculatorRecord.id values — max 4 displayed */
  relatedCalculatorIds: string[];

  // ── Dates (required when published) ──────────────────────
  publishedAt: string | null; // ISO 8601 date
  lastReviewedAt: string | null; // ISO 8601 date

  // ── Flags (required) ─────────────────────────────────────
  /** Sitemap and href generation */
  sitemapEligible: boolean;
  /** Homepage featured section — editorial only */
  featured: boolean;
  /** Homepage “Recently added” — auto when published within 90 days unless false */
  recentlyAddedEligible: boolean;

  // ── Risk (required) ──────────────────────────────────────
  editorialRiskLevel: EditorialRiskLevel;
};
```

### Required vs optional by status

| Field | published | launch-candidate | expansion / deferred |
|-------|-----------|------------------|----------------------|
| id, name, shortName, slug, categoryId, route, description, status | ✓ | ✓ | ✓ |
| primarySearchIntent | ✓ | ✓ | optional |
| searchAliases | ✓ (may be `[]`) | ✓ | optional |
| relatedCalculatorIds | ✓ | ✓ | optional (`[]`) |
| publishedAt, lastReviewedAt | ✓ | null | null |
| sitemapEligible | ✓ true | false | false |
| featured | ✓ | false | false |
| recentlyAddedEligible | ✓ | false | false |
| editorialRiskLevel | ✓ | ✓ | ✓ |

---

## How `published` status is derived

A calculator is **published** when **all** are true:

1. `status === "published"` in catalog  
2. Static page exists at `route`  
3. `sitemapEligible === true`  
4. `publishedAt` is set  

```typescript
export function isPublished(record: CalculatorRecord): boolean {
  return (
    record.status === "published" &&
    record.sitemapEligible &&
    record.publishedAt !== null
  );
}

export const publishedCalculatorRoutes = calculatorCatalog
  .filter(isPublished)
  .map((c) => c.route) as const;
```

**Phase 4.1 migration:** Existing `published-calculators.ts` array is transcribed into catalog entries, then file re-exports `publishedCalculatorRoutes` from catalog helpers. Tests import the same export path until cutover completes.

---

## Consumer matrix

| Consumer | Reads | Rule |
|----------|-------|------|
| **Static routes** | `status === "published"` + filesystem page | Page build only for published |
| **Calculator cards** | `isPublished` or `status !== "published"` for badge | Prep cards: no `href` |
| **Sitemap** | `sitemapEligible && isPublished` + category gates | See SEO doc |
| **Homepage featured** | `featured && isPublished` | Max 4; editorial flag |
| **Homepage recently added** | `recentlyAddedEligible && isPublished`, sort `publishedAt` desc | Max 4; hide section if &lt;2 items |
| **Search index** | published only: `name`, `shortName`, `description`, `searchAliases`, `categoryId` | Built at compile time |
| **Related section** | `relatedCalculatorIds` resolved to published records | Omit unpublished; max 4 |
| **Breadcrumbs** | `categoryId` → category name + calculator `name` | |
| **JSON-LD** | `name`, `route`, `description`, `lastReviewedAt` | No FAQ schema |

---

## Category index eligibility (derived)

```typescript
export function isCategoryIndexable(
  categoryId: CategoryId,
  catalog: CalculatorRecord[],
  categories: CategoryRecord[],
): boolean {
  const category = categories.find((c) => c.id === categoryId);
  const publishedCount = catalog.filter(
    (c) => c.categoryId === categoryId && isPublished(c),
  ).length;
  const min = category?.minPublishedForIndex ?? 3;
  return publishedCount >= min;
}
```

Statistics override: `minPublishedForIndex: 2` on `statistics` category record.

---

## Migration plan (no implementation in Phase 4.0)

### Step 1 — Introduce catalog (Phase 4.1)

Create `lib/calculator-catalog.ts` with:

- `categories` array (10 entries, most deferred)  
- `calculators` array transcribing MAD + Outlier/IQR as `published`  
- Planning entries from `calculator-portfolio.ts` as `launch-candidate` / `expansion-candidate`

### Step 2 — Shim publication gate (Phase 4.1)

```typescript
// lib/published-calculators.ts (shim)
export { publishedCalculatorRoutes, isCalculatorPublished, getCalculatorHref } from "./calculator-catalog-publication";
```

Update `getCalculatorHref` signature:

```typescript
getCalculatorHref(slug: string): string | undefined
// resolves by slug across catalog — backward compatible
```

### Step 3 — Repoint consumers (Phase 4.1–4.2)

| File | Change |
|------|--------|
| `app/calculators/page.tsx` | Read catalog |
| `app/calculators/statistics/page.tsx` | Filter `categoryId === "statistics"` |
| `app/page.tsx` | Featured / recent from catalog |
| `__tests__/published-calculators.test.ts` | Assert derived routes match catalog |

### Step 4 — Deprecate portfolio (Phase 4.3)

Remove `lib/calculator-portfolio.ts`; import from catalog in tests and pages.

### Step 5 — Remove shim (Phase 4.5, optional)

If all imports use `calculator-catalog`, delete `published-calculators.ts` or keep as 3-line re-export permanently for stability.

---

## Avoiding dual-registry conflicts

| Rule | Enforcement |
|------|-------------|
| Single write location | All calculator metadata edits in `calculator-catalog.ts` only |
| CI test | `publishedCalculatorRoutes` equals `catalog.filter(isPublished).map(route)` |
| CI test | Every `published` entry has matching `app/.../page.tsx` |
| CI test | No `page.tsx` for non-published slugs (except statistics category template) |
| No duplicate slugs | Unique `(categoryId, slug)` constraint tested |

---

## Seed data (conceptual — Phase 4.1)

```typescript
{
  id: "statistics-mad",
  name: "Mean Absolute Deviation Calculator",
  shortName: "MAD Calculator",
  slug: "mean-absolute-deviation",
  categoryId: "statistics",
  route: "/calculators/statistics/mean-absolute-deviation/",
  description: "Measure average distance from the mean with formula and step-by-step working.",
  status: "published",
  primarySearchIntent: "calculate",
  searchAliases: ["mean absolute deviation", "mad calculator", "average absolute deviation"],
  relatedCalculatorIds: ["statistics-outlier-iqr", "statistics-cv"],
  publishedAt: "2026-08-31",
  lastReviewedAt: "2026-08-31",
  sitemapEligible: true,
  featured: true,
  recentlyAddedEligible: false,
  editorialRiskLevel: "low",
}
```

Percentage candidate exists only as `launch-candidate` with `status !== "published"` until SEO validation + implementation.
