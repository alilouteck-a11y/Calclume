# Phase 3.2 — Outlier/IQR Calculation Engine

**Status:** COMPLETE  
**Date:** 2026-09-01  
**Scope:** Pure calculation layer only (no UI, routes, or SEO)

## Modules

| File | Responsibility |
|------|----------------|
| `lib/calculators/outlier-iqr-schema.ts` | Public types, constants, runtime option guards |
| `lib/calculators/quartiles.ts` | `exclusive-halves` and `excel-r7` quartile algorithms |
| `lib/calculators/outlier-iqr.ts` | `calculateOutlierIqr()`, `classifyObservationValue()` |

## Public API

```typescript
calculateOutlierIqr(
  values: number[],
  options?: {
    quartileMethod?: "exclusive-halves" | "excel-r7";
    fenceMultiplier?: 1.5 | 3;
  },
): OutlierIqrResult;
```

Defaults: `exclusive-halves`, `fenceMultiplier = 1.5`.

## Runtime validation (pure engine)

The engine validates **before** calculation:

| Check | Error |
|-------|-------|
| `n < 4` | `RangeError` — insufficient observations message |
| `n > 1000` | `RangeError` — too many observations message |
| Any non-finite value | `RangeError` — finite numbers message |
| Unsupported `quartileMethod` | `RangeError` — unsupported quartile method |
| Unsupported `fenceMultiplier` | `RangeError` — unsupported fence multiplier |

Parser validation in `parseDataset()` remains separate; the engine does not assume parsed input.

## Whisker invariant

For accepted inputs (4–1000 finite numbers, supported method and multiplier):

**At least one observation always satisfies `lowerFence ≤ x ≤ upperFence`.**

Reason:

1. `IQR ≥ 0`, so `[Q1, Q3] ⊆ [lowerFence, upperFence]`.
2. With `n ≥ 4`, both quartile methods derive Q1 and Q3 from observed order statistics in the lower/upper portions of the sorted data, guaranteeing at least one observed value in `[Q1, Q3]`.

Therefore `nonOutlierCount ≥ 1` for all valid datasets. The whisker helper **throws** if the non-outlier set is empty (bug/corrupt input guard). There is **no** silent fallback to data min/max.

Whiskers = min/max of **non-outlier** observations only.

## Output contract

See `Docs/Phase3_1ProductAndUIContract.md`. Phase 3.2 implements the full `OutlierIqrResult` including `boxPlot` numeric geometry (domain, whiskers, fences, outlier lists).

## Tests

| File | Focus |
|------|-------|
| `__tests__/outlier-iqr.test.ts` | Fixture matrix F01–F16, result contract |
| `__tests__/outlier-iqr-quartiles.test.ts` | Quartile algorithms |
| `__tests__/outlier-iqr-boundaries.test.ts` | Fence boundaries, degenerate whiskers |
| `__tests__/outlier-iqr-validation.test.ts` | Pure-engine runtime rejection |

## Explicitly excluded

React UI, route, sitemap, registry, metadata, schema, educational content, homepage, calculator cards.

## Related specs

- Phase 3.1 mathematical spec
- Phase 3.1 fixture matrix
