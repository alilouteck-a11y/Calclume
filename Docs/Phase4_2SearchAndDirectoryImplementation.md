# Phase 4.2 — Search and Directory Implementation

**Date:** 2026-09-02  
**Status:** Complete (visual deduplication verified)

## Scope

Client-side calculator search and Calculator Directory V2 per `Phase4_0SearchAndDiscovery.md` and Phase 4.0 IA.

## Search files

| File | Role |
|------|------|
| `lib/calculator-search-index.ts` | Index builder, normalization, ranking (server-safe) |
| `components/search/CalculatorSearch.tsx` | Client combobox — hero, header, directory variants |

## Search contract

Unchanged from reconciliation pass — 2-char minimum, custom ranking, no URL params, no fetch.

## Directory V2 — `app/calculators/page.tsx`

### Section hierarchy (deduplicated)

| Order | Section | Content |
|-------|---------|---------|
| 1 | Search calculators | `CalculatorSearch` combobox |
| 2 | Available calculators | Two published `CalculatorCard` entries |
| 3 | Browse collections (`#categories`) | Compact `CategorySummaryCard` per catalog category |
| 4 | Trust note | Published count + methodology link |

### Removed redundancy

Previously: “Browse by category” repeated calculator cards, then “Collections” showed another Statistics card.

Now: calculator cards appear **once** in Available calculators; Browse collections shows a single Statistics summary with:

- `{publishedCount} available` (catalog-derived)
- `{totalCount} in this collection · {preparationCount} in preparation`

No calculator cards inside the collection summary.

## Catalog helpers

| Function | Purpose |
|----------|---------|
| `getCategoryCollectionSummary()` | Derived published/total/preparation counts |
| `getCategorySummariesWithCatalogTools()` | Directory browse collections |
| `getCategorySummariesWithPublishedTools()` | Homepage browse by category |

## Discovery without JavaScript

Server-rendered links to both published calculators in directory **Available calculators** section and homepage **Featured** section.

## Tests

| File | Coverage |
|------|----------|
| `__tests__/calculator-search.test.ts` | Index, ranking |
| `__tests__/calculator-search-ui.test.tsx` | Search UI |
| `__tests__/phase-4-2-deduplication.test.tsx` | Directory hierarchy, no duplicate cards |
| `__tests__/phase-4-2-reconciliation.test.tsx` | H1, live links, methodology |
| `__tests__/outlier-iqr-publication.test.tsx` | Publication surfaces |

## Screenshots

Regenerated 2026-09-02 — `05` through `07` directory, `08`–`09` search.
