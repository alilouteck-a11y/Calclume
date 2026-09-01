# Phase 3.2 — Calculation Validation Report

**Date:** 2026-09-01  
**Status:** COMPLETE — reconciliation pass

## Deliverables

| Item | Status |
|------|--------|
| `lib/calculators/outlier-iqr-schema.ts` | Created |
| `lib/calculators/quartiles.ts` | Created |
| `lib/calculators/outlier-iqr.ts` | Created |
| `Docs/Phase3_2CalculationEngine.md` | Created |
| `Docs/Phase3_2CalculationValidationReport.md` | Created |
| Phase 3.3 UI/routes | **Not started** |

## Runtime validation coverage

`calculateOutlierIqr()` explicitly rejects:

| Case | Test file | Mechanism |
|------|-----------|-----------|
| n = 0 | `outlier-iqr-validation.test.ts` | `validateObservationCount` |
| n = 1 | `outlier-iqr-validation.test.ts` | same |
| n = 2 | `outlier-iqr-validation.test.ts` | same |
| n = 3 | `outlier-iqr-validation.test.ts` | same |
| n = 1,001 (numeric array) | `outlier-iqr-validation.test.ts` | same |
| NaN | `outlier-iqr-validation.test.ts` | `validateObservationValues` |
| +Infinity | `outlier-iqr-validation.test.ts` | same |
| −Infinity | `outlier-iqr-validation.test.ts` | same |
| Unsupported quartile method | `outlier-iqr-validation.test.ts` | `resolveQuartileMethod` |
| Unsupported fence multiplier | `outlier-iqr-validation.test.ts` | `resolveFenceMultiplier` |
| n = 1,001 (text parse) | `outlier-iqr.test.ts` | `parseDataset` (separate layer) |

## Fixture matrix

All Phase 3.1 fixtures F01–F16 plus F02b and F06b covered in `outlier-iqr.test.ts` and quartile tests.

## Whisker invariant

**Decision:** Zero non-outlier observations is **mathematically impossible** for valid engine inputs under approved quartile and fence rules with `n ≥ 4`.

**Implementation:** `buildWhiskers()` throws `RangeError` if the non-outlier set is empty. No min/max fallback.

**Tests:** F10, F11, multi-method degenerate sweep, F02 whisker vs data extrema in `outlier-iqr-boundaries.test.ts`.

## Verification commands

Recorded during reconciliation (exact outputs in § Results below).

- `npm run typecheck`
- `npm run lint`
- `npm test -- --run`
- `npm run build`

## Publication boundary checks

- MAD route remains only published calculator detail route
- No `/calculators/statistics/outlier-iqr/` page
- Sitemap URL count unchanged (guarded by existing production-readiness tests)
- Build uses `--webpack` (Hostinger-compatible)

## Results

| Command | Exit code | Result |
|---------|----------:|--------|
| `npm run typecheck` | 0 | Pass |
| `npm run lint` | 0 | Pass |
| `npm test -- --run` | 0 | 17 files, **153 tests** passed |
| `npm run build` | 0 | Next.js **16.3.3 (webpack)**; static export **17 pages** |

Build routes include `/calculators/statistics/mean-absolute-deviation` only (no `outlier-iqr`).  
Static export directory `out/calculators/statistics/` contains `mean-absolute-deviation/` only.  
Sitemap integrity tests pass (count = `sitemapRoutes.length + publishedCalculatorRoutes.length`).

## Approval gate

Phase 3.3 must not begin until explicit user approval.
