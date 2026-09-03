# Phase 4.3 — Conditional Indexation

**Date:** 2026-09-02  
**Status:** Complete — awaiting approval to commit

## Principle

Category existence ≠ public page ≠ sitemap entry.

All publication state is **derived** from the category registry + published calculator catalog records. There is no manually maintained published-category list.

## Helpers (`lib/calculator-category-publication.ts`)

| Helper | Meaning |
|--------|---------|
| `getCategorySummary()` | Counts + published/preparation/expansion lists |
| `isCategoryVisible()` | ≥1 published calculator (homepage browse) |
| `isCategoryPublic()` / `isCategoryIndexable()` | Meets configured published minimum |
| `isCategorySitemapEligible()` | Same as indexable |
| `getPublicCategories()` / `getIndexableCategories()` | Public hubs |
| `getSitemapEligibleCategoryRoutes()` | Category URLs for sitemap |
| `wouldCategoryBeIndexable()` | Threshold simulation for tests |

## Algorithm

```text
publishedCount = count(catalog where categoryId && isPublished)
threshold     = category.minimumPublishedCalculators
                (default 3; Statistics = 2 via grandfather policy)

indexable / public / sitemap-eligible  ⇔  publishedCount >= threshold && publishedCount > 0
visible                                ⇔  publishedCount >= 1
```

## Statistics grandfather

- `publicationPolicy: "grandfather"`
- `minimumPublishedCalculators: 2`
- Remains indexable with MAD + Outlier/IQR only

## Standard categories

- Threshold **3** published calculators
- Example: Math with 0–2 published tools → not public, not in sitemap, no static page

## Planned-only / empty categories

- Never public
- Never in static export
- Never in sitemap, navigation, directory collection browse, or homepage

## Future eligibility

When a category’s published count reaches its threshold, it becomes automatically eligible for:

1. Public collection page (thin wrapper or future `[category]` segment)
2. Sitemap membership via `getSitemapEligibleCategoryRoutes()`
3. Footer category link via `getFooterNavRoutes()`
4. Directory “Browse collections”

No parallel allowlist is required.
