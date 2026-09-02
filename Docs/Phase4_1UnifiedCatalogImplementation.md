# Phase 4.1 — Unified Catalog Implementation

**Status:** Implemented  
**Date:** 2026-09-02

## Summary

Phase 4.1 establishes `lib/calculator-catalog.ts` as the sole manually maintained source of calculator and category metadata. Publication and portfolio consumers derive from it.

## Modules

| Module | Role |
|--------|------|
| `lib/calculator-catalog.ts` | Categories, calculator records, pure selectors |
| `lib/calculator-catalog-publication.ts` | Derived `publishedCalculatorRoutes`, `isCalculatorPublished`, `getCalculatorHref` |
| `lib/published-calculators.ts` | Backwards-compatible re-export shim |
| `lib/calculator-portfolio.ts` | Derived PlannedCalculator compatibility layer (statistics lists) |

## Catalog contents (Phase 4.1)

- **Published (2):** MAD, Outlier/IQR  
- **Launch candidates (3):** CV, SEM, Critical Value  
- **Expansion candidates (4):** CI, P-Value, Sample Size, Linear Regression  
- **Not included:** Percentage Calculator (SEO validation pending); Five Number Summary standalone (cancelled Phase 3.0)

## Publication rules

`isPublished(record)` requires:

1. `status === "published"`
2. `sitemapEligible === true`
3. `publishedAt !== null`

Unknown slugs/routes fail closed. `isCalculatorPublished` matches by exact slug (not substring).

## Compatibility

- Existing imports of `published-calculators` and `calculator-portfolio` continue to work.
- UI still uses launch/expansion candidate lists + `isCalculatorPublished` for badges/links.
- Related calculator sections still list other launch candidates (unchanged rendered set).
- `relatedCalculatorIds` are validated in tests for future Page V2 consumption.

## Discrepancies vs Phase 4.0 text

| Topic | Resolution |
|-------|------------|
| Percentage as catalog `launch-candidate` | Deferred — would change homepage/directory card counts |
| Portfolio removal | Deferred to Phase 4.3; Phase 4.1 keeps derived shim |
| Trust strip component | Deferred to Phase 4.4 (token-only in 4.1) |

## Tests

- `__tests__/calculator-catalog.test.ts` — identity, publication, sitemap, relations, metadata, purity
- Existing publication / route-guard / sitemap tests remain green via shim
