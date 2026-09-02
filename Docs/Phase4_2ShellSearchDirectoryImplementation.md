# Phase 4.2 — Shell, Search & Directory Implementation

**Status:** Implemented  
**Date:** 2026-09-02

## Summary

Phase 4.2 delivers Navigation V2, Homepage V2, client-side calculator search, and Calculator Directory V2 per Phase 4.0 contracts. No new calculators, routes, or sitemap changes.

---

## Navigation V2

| Change | Detail |
|--------|--------|
| Removed | Statistics from primary nav |
| Added | Search control (desktop button + mobile icon) |
| Added | Mobile drawer (`MobileNavDrawer`) with focus trap, Escape, scroll lock |
| Deferred | Browse/Categories nav item (requires ≥2 categories with published tools) |
| Preserved | Statistics in footer; noscript fallback links |

**Files:** `components/layout/Header.tsx`, `components/layout/MobileNavDrawer.tsx`, `lib/routes.ts`

---

## Search

| Feature | Implementation |
|---------|----------------|
| Index | `lib/calculator-search-index.ts` — published catalog only |
| UI | `components/search/CalculatorSearch.tsx` — combobox pattern |
| Placement | Homepage hero, header overlay, directory page |
| Ranking | Exact → prefix → contains (Phase 4.0 weights) |
| Debounce | 200 ms |
| Min query | 2 characters |
| Category filter | Hidden when only one category has published tools |
| No URL state | Client-only; no `?q=` |
| Fallback | `/calculators/` directory + noscript |

---

## Homepage V2

Section order (matches contract):

1. `HomeHeroSearch` — H1 + search  
2. `HomeFeatured` — editorial featured published tools  
3. `HomeCategoryBrowse` — Statistics published cards only  
4. `HomeRecentlyAdded` — **hidden** (< 2 eligible)  
5. `HomeHowItWorks` — illustrative panel + 3 pillars + links to both calculators  
6. `HomeTrustStrip` — methodology + privacy  
7. `HomeDiscoveryCta` — browse CTA  

**Removed from homepage:** `StatisticsPreview`, prep cards, statistics-only framing.

**Metadata:** `absoluteTitle: "CalcLume — Clear Calculators That Show the Work"`

---

## Directory V2

`/calculators/` now includes:

- Inline search with `/` shortcut  
- `#categories` anchor — browse by category (published only)  
- Statistics collection card (catalog-derived count)  
- Published count footer line  

Removed flat “Available now” section (redundant with category browse).

---

## Catalog selectors added

- `getCategoriesWithPublishedCalculators()`  
- `getFeaturedPublishedCalculators()`  
- `getRecentlyAddedPublishedCalculators()`  
- `shouldShowBrowseNavigation()` / `getBrowseNavigationLink()`

---

## Legacy components

These remain in repo but are unused on homepage:

- `HeroSection`, `StatisticsPreview`, `ExamplePanel`, `WhyCalcLume`, `MethodologyPreview`, `FinalCta`

Safe to remove in a future cleanup phase.
