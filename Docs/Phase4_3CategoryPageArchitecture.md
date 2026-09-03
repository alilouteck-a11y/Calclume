# Phase 4.3 — Category Page Architecture

**Date:** 2026-09-02  
**Status:** Complete — awaiting approval to commit

## Shared UI

`components/category/CategoryCollectionPage.tsx`

- Server Component
- Loads `getCategorySummary(categoryId)`
- Calls `notFound()` when the category is not public
- Renders breadcrumbs, H1 (`pageTitle`), intro, collection notice, launch/preparation cards, expansion cards, methodology link
- Metadata via `createCategoryPageMetadata()`

## Statistics migration

`app/calculators/statistics/page.tsx` is a **thin wrapper**:

```tsx
export const metadata = createCategoryPageMetadata("statistics");
export default function StatisticsCalculatorsPage() {
  return <CategoryCollectionPage categoryId="statistics" />;
}
```

Preserved:

- Route `/calculators/statistics/`
- Title “Statistics & Data Calculators”
- Meta description intent
- Canonical
- Two published calculator links
- Preparation + expansion card behavior
- Breadcrumb structure

## Dynamic `[category]` segment

**Not shipped in Phase 4.3.**

Next.js `output: "export"` rejects `generateStaticParams()` returning `[]`. With only Statistics public, a dynamic segment cannot be empty.

Helpers ready for the next hub:

- `lib/category-static-params.ts` → `getFutureCategoryStaticParams()`
- `getPublicCategoryStaticParams()` in publication helpers

When Math (or another category) becomes indexable, add `app/calculators/[category]/page.tsx` with non-empty params (excluding or including Statistics as appropriate).

## Sitemap

```text
getSitemapPaths() =
  sitemapRoutes (trust + directory)
  + getSitemapEligibleCategoryRoutes()
  + publishedCalculatorRoutes
```

Statistics enters sitemap via derived indexability — not a hard-coded `publicRoutes` entry.
