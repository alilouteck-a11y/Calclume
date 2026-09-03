# Phase 4.3 — Pre-Implementation Audit

**Date:** 2026-09-02  
**Baseline commit:** `949d311e4993138013e814a9bb782b5b86d26c8a`  
**Status:** Complete before implementation

---

## Current category data sources

| Source | Role today |
|--------|------------|
| `lib/calculator-catalog.ts` → `categories` | Minimal category records (`id`, `name`, `description`, `minPublishedForIndex`, `editorialRiskLevel`) |
| `lib/calculator-catalog.ts` → `calculatorCatalog[].categoryId` | Calculator membership |
| `lib/routes.ts` → `publicRoutes` | Hard-codes `/calculators/statistics/` for footer + sitemap |
| `app/calculators/statistics/page.tsx` | Explicit Statistics page (portfolio-derived cards) |
| `app/globals.css` | `--category-accent-*` tokens for all ten category IDs |
| Derived helpers | `getCategoryCollectionSummary`, `isCategoryIndexable`, directory/homepage summaries |

There is **no** dedicated `lib/calculator-categories.ts` yet. Category metadata is thinner than the Phase 4.0 Category Architecture contract (missing four risk dimensions, launch order, aliases, publication policy label, page title/intro).

---

## Hard-coded Statistics assumptions

| Location | Assumption |
|----------|------------|
| `lib/routes.ts` | Statistics path always in `publicRoutes` / sitemap / footer |
| `categories[].minPublishedForIndex` | Statistics = 2; others = 3 (grandfather encoded as number only) |
| `app/calculators/statistics/page.tsx` | Dedicated page; title “Statistics & Data Calculators”; uses `launchCandidates` / `expansionCandidates` |
| Footer | Always links Statistics regardless of derived indexability helper |

---

## Duplicated counts or labels

| Surface | Count source |
|---------|--------------|
| Statistics page notice | `launchCandidates.filter(isCalculatorPublished)` vs `launchCandidates.length` |
| Directory CategorySummaryCard | `getCategoryCollectionSummary` (catalog-derived) |
| Homepage browse | Same summary helper |
| Portfolio shim | Re-derives statistics lists from catalog |

Labels: display name “Statistics” vs page title “Statistics & Data Calculators” vs collection copy “Statistics & Data” — intentional but not centralized.

---

## Current category page publication mechanism

- **Only** filesystem route: `app/calculators/statistics/page.tsx`
- No `app/calculators/[category]/` dynamic segment
- No `generateStaticParams` for categories
- Empty/planned categories have **no** page files (correct)
- Math and other categories are not generated (correct)

---

## Current sitemap coupling

```text
getSitemapPaths() = sitemapRoutes (all publicRoutes) + publishedCalculatorRoutes
```

Statistics enters the sitemap because it is hard-coded in `publicRoutes`, **not** because `isCategoryIndexable("statistics")` is consulted. Calculator routes are derived correctly from the publication shim.

**Risk:** A future category could be added to `publicRoutes` independently of the catalog gate — second source of truth.

---

## Discrepancies vs Phase 4.0 contracts

| Contract | Current code | Gap |
|----------|--------------|-----|
| Full category registry (risks, aliases, launch order) | Minimal `CategoryRecord` | Under-specified |
| Sitemap category URLs via indexability | Hard-coded Statistics | Coupling |
| ≥3 tools for new category hubs | `minPublishedForIndex: 3` | OK |
| Statistics grandfather at 2 | `minPublishedForIndex: 2` | OK but unnamed policy |
| Category page ≥80-word intro | Short description only | Thin SEO body |
| Shared category page architecture | Single bespoke Statistics page | Missing reusable template |
| Directory “coming soon” without link | Not implemented; only inventory categories shown | Acceptable; Phase 4.3 prefers no planned-only cards |

---

## Safe migration path

1. Add `lib/calculator-categories.ts` as the category registry (ten architectural records).
2. Re-export / thin-wrap from `calculator-catalog.ts` so existing imports keep working.
3. Expand pure helpers: visible / public / indexable / sitemap-eligible (derived only).
4. Build shared `CategoryCollectionPage` UI; migrate Statistics to a thin wrapper.
5. Add `[category]/generateStaticParams` returning **only** public categories that lack a dedicated folder (today: empty set; Statistics stays on explicit route).
6. Derive sitemap category URLs from `getIndexableCategoryRoutes()`; remove hard-coded Statistics from `publicRoutes`.
7. Point footer category links at derived public categories.
8. Keep directory/homepage on derived summaries; filter to public/visible policies.
9. Tests for registry integrity, threshold simulation, static export absence of Math, sitemap = 12.

**Non-goals this phase:** Percentage Calculator, Math publication, Calculator Page V2, math engine changes.

---

## Audit conclusion

Phase 4.3 is required to separate **category architecture** from **publication**, eliminate hard-coded Statistics sitemap coupling, and provide a reusable collection page without generating thin category routes.
