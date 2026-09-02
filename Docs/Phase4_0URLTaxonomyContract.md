# Phase 4.0 — URL and Taxonomy Contract

**Status:** Locked for Phase 4.1 implementation  
**Date:** 2026-09-02

## URL model

```text
/                                    → Site home
/calculators/                        → Global calculator directory
/calculators/[category]/             → Category collection (indexable at ≥3 published tools)
/calculators/[category]/[calculator]/ → Calculator detail (indexable when published)
```

Trust and legal pages remain at root:

```text
/about/
/methodology/
/sources/
/editorial-policy/
/contact/
/privacy/
/terms/
```

Future locale prefix (not Phase 4.1):

```text
/[locale]/calculators/...
```

---

## Trailing slashes

**Preserve** `trailingSlash: true` (Phase 1 decision). All canonical URLs and internal links use trailing slashes except root `https://calclume.com/`.

---

## Slug rules

### Category slugs

| Rule | Example |
|------|---------|
| Lowercase kebab-case | `date-time`, `everyday-life` |
| English only at launch | `statistics` not `statistiques` |
| Stable — no renames post-launch | `statistics` stays `statistics` |
| Max length 30 characters | — |
| No version suffixes | Not `outlier-iqr-v2` |

### Calculator slugs

| Rule | Example |
|------|---------|
| Descriptive, primary keyword aligned | `mean-absolute-deviation`, `outlier-iqr` |
| No category prefix in slug | `outlier-iqr` not `statistics-outlier-iqr` |
| Avoid stop-word stuffing | Prefer `loan-payment` over `loan-payment-calculator` (calculator implied by route) |
| One canonical URL per tool | No duplicate routes for synonyms |

### Anti-patterns (prohibited)

- `/calculators/percentage/` without category (flat namespace)
- `/stats/mad/` (abbreviated category)
- `/calculators/statistics/outlier/` and `/calculators/statistics/outlier-iqr/` (synonym split)
- Query-string calculators (`?tool=mad`)

---

## Taxonomy hierarchy

```text
Site
└── Calculators (directory)
    └── Category (collection)
        └── Calculator (detail)
```

**No third level** at launch (e.g. `/calculators/finance/loans/mortgage/`). Revisit only if a category exceeds ~25 tools.

---

## Publication gate

| Layer | Source of truth | Indexable when |
|-------|-----------------|----------------|
| Calculator detail | `publishedCalculatorRoutes` in `lib/published-calculators.ts` | Route in array + static page exists |
| Category collection | Category registry + ≥3 published routes in category | Page exists + sitemap entry |
| Directory | Always | Lists published tools and eligible categories |

Unpublished planning records live in portfolio/registry only — **no filesystem route**.

---

## Breadcrumb contract

```text
Home → Calculators → [Category display name] → [Calculator name]
```

JSON-LD `BreadcrumbList` on calculator and category pages (category when indexable). Directory uses:

```text
Home → Calculators
```

---

## Metadata contract

| Page type | Title pattern | Canonical |
|-----------|---------------|-----------|
| Calculator | `[Calculator Name] \| CalcLume` | `absoluteUrl(route)` |
| Category | `[Category] Calculators \| CalcLume` | Category path |
| Directory | `Calculator Directory \| CalcLume` | `/calculators/` |

Descriptions: unique per page; no template spam across calculators.

---

## Sitemap rules

1. Include all `publicRoutes` trust pages.
2. Include `/calculators/`.
3. Include category routes only when **indexable** (≥3 published calculators).
4. Include calculator routes from `publishedCalculatorRoutes` only.
5. Exclude preparation-only portfolio slugs.

Current state (Phase 4.0): **12 URLs** — Statistics category indexable under grandfather rule (2 tools).

---

## Registry model (Phase 4.1 target)

Split current `calculator-portfolio.ts` concept into:

```typescript
// Conceptual — not implemented in Phase 4.0
type Category = {
  slug: string;           // URL segment
  name: string;           // Display
  description: string;
  minPublishedForIndex: number; // default 3
};

type CalculatorRecord = {
  slug: string;
  categorySlug: string;
  name: string;
  description: string;
  status: "published" | "launch-candidate" | "expansion-candidate";
};
```

`published-calculators.ts` remains the **hard publication gate** for sitemap and href generation.

---

## Internal link href helper

Extend `getCalculatorHref(slug)` to require category context:

```text
getCalculatorHref(categorySlug, calculatorSlug) → /calculators/[category]/[calculator]/
```

Backward-compatible wrapper may resolve from full route string during migration.

---

## Redirect policy

Static export on Hostinger: **avoid URL changes**. If a slug must change:

1. Add new route at new slug.
2. Document old URL in DecisionLog.
3. Owner configures 301 at hosting layer (not in Next.js middleware — no server).

---

## Filesystem mapping (App Router)

```text
app/calculators/page.tsx                           → /calculators/
app/calculators/[category]/page.tsx                → /calculators/[category]/  (Phase 4.1+)
app/calculators/[category]/[calculator]/page.tsx   → /calculators/[category]/[calculator]/
```

Statistics currently uses explicit path `app/calculators/statistics/` — may migrate to dynamic `[category]` when second category ships.

---

## Cross-reference

- Category slugs: `Docs/Phase4_0CategoryArchitecture.md`
- Publication minimums: 3 calculators per new category
- Third calculator target: `/calculators/math/percentage/` (pending SEO validation)
