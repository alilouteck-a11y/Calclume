# Phase 4.4 — Outlier/IQR Migration

**Date:** 2026-09-03
**Route:** `/calculators/statistics/outlier-iqr/` (unchanged)

## What changed

Presentation only: V2 intro, trust strip, education TOC, catalog-derived related cards, sources/last-reviewed regions, result hierarchy (`N outlier(s) found` + `IQR = …`).

## What did not change

Parser, n ≥ 4, n ≤ 1000, exclusive-halves default, excel-r7, 1.5× / 3.0× multipliers, strict fence comparisons, whiskers, five-number summary, classification table, outlier lists, SVG geometry, prose + SR table alternatives, stale-result policy, precision display-only, copy/reset/validation/focus, metadata, canonical, JSON-LD, educational factual wording, last-reviewed date, route.

## Fixture F02 (defaults)

Input: `1, 2, 3, 4, 5, 6, 7, 8, 9, 100`

| Quantity | Value |
|----------|-------|
| Q1 | 3 |
| Median | 5.5 |
| Q3 | 8 |
| IQR | **5** |
| Lower fence | −4.5 |
| Upper fence | 15.5 |
| Lower whisker | 1 |
| Upper whisker | 9 |
| Upper outlier | observation #10, value 100 |

## Trust note

Default exclusive-halves; Excel INC / R7 available; 1.5× and 3.0× fences; fence equality is not an outlier; outliers are identified, never deleted.
