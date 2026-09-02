# Phase 4.2 — Homepage V2 Implementation

**Date:** 2026-09-02  
**Status:** Complete (visual deduplication verified)

## Scope

Library-first homepage per `Phase4_0HomepageV2.md`. Server-rendered sections with client search combobox in hero only.

## Files

| File | Role |
|------|------|
| `app/page.tsx` | Composes homepage sections; builds search index server-side |
| `components/home/HomeHeroSearch.tsx` | H1, value prop, `CalculatorSearch` (hero variant) |
| `components/home/HomeFeatured.tsx` | Editorial featured grid — **sole location for full calculator cards** |
| `components/home/HomeCategoryBrowse.tsx` | Compact category summaries via `CategorySummaryCard` |
| `components/home/HomeRecentlyAdded.tsx` | Conditional — hidden when eligibility rule fails |
| `components/home/HomeHowItWorks.tsx` | Compact illustrative preview + link to live MAD |
| `components/home/HomeTrustStrip.tsx` | Stacked trust links on mobile |
| `components/home/HomeDiscoveryCta.tsx` | Single CTA to `/calculators/` |
| `components/calculator/CategorySummaryCard.tsx` | Reusable category discovery card |

## Metadata

- Title: `CalcLume — Clear Calculators That Show the Work` (`absoluteTitle` in `lib/metadata.ts`)
- Description: library-first, local calculation

## Section composition

Homepage body renders **six substantive sections** plus global Header (§1) and Footer (§9) from `app/layout.tsx`.

| # | Contract section | Component | Rendered heading | Status |
|---|------------------|-----------|------------------|--------|
| 1 | Header | `Header` (layout) | CalcLume brand | Implemented (global) |
| 2 | Search-led hero | `HomeHeroSearch` | H1: Clear calculators that show the work | Implemented |
| 3 | Featured calculators | `HomeFeatured` | Featured calculators | Implemented — full cards |
| 4 | Browse by category | `HomeCategoryBrowse` | Browse by category | Implemented — **compact summaries only** |
| 5 | Recently added | `HomeRecentlyAdded` | Recently added | Hidden (<2 eligible) |
| 6 | How CalcLume shows the work | `HomeHowItWorks` | How CalcLume shows the work | Compact preview (no pillar grid) |
| 7 | Trust / methodology strip | `HomeTrustStrip` | Trust and methodology (sr-only) | Implemented — stacked mobile |
| 8 | Final discovery CTA | `HomeDiscoveryCta` | Ready to explore? | Implemented |
| 9 | Footer | `Footer` (layout) | Site / Contact | Unchanged (global) |

## Visual deduplication (2026-09-02)

| Before | After |
|--------|-------|
| Featured + Browse both showed full MAD/Outlier cards | Full cards **only in Featured** |
| Browse by category nested calculator cards | `CategorySummaryCard` with catalog-derived `{n} available` |
| How-it-works had 3 detailed step cards + 3 pillar cards | Compact result/formula/working summary/interpretation + “See the full worked calculation” |

Category counts derive from `getCategorySummariesWithPublishedTools()` — no hard-coded numbers.

## Scale behavior (2 published calculators)

- Featured shows **both** MAD and Outlier/IQR
- Browse by category shows **one Statistics summary** (2 available, 9 tools in collection)
- Math category omitted (no published Math tools)
- Recently Added hidden per contract eligibility

## Server vs client

| Component | Server | Client |
|-----------|--------|--------|
| `HomeHeroSearch` wrapper | ✓ | Search input only |
| All other `Home*` sections | ✓ | — |

Both published calculators appear as `<a href>` in server HTML via Featured section only.

## Tests

- `__tests__/homepage-v2.test.tsx`
- `__tests__/phase-4-2-deduplication.test.tsx`
- `__tests__/phase-4-2-reconciliation.test.tsx`

## Screenshots

Regenerated 2026-09-02 after deduplication — `Docs/screenshots/phase-4-2/01` through `04`.
