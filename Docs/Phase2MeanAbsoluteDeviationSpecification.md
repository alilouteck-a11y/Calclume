# Phase 2 Mean Absolute Deviation Specification

**Status:** Locked for Phase 2 (updated Phase 2.2A)  
**Route:** `/calculators/statistics/mean-absolute-deviation/`  
**Last reviewed:** 2026-08-31

## Mathematical definition

Mean absolute deviation about the arithmetic mean:

```text
x̄ = (Σxᵢ) / n
|xᵢ − x̄| = absolute deviation for each value
MAD = (Σ|xᵢ − x̄|) / n
```

### Rules

- Denominator is **n** (not n − 1)
- Not median absolute deviation
- Not mean absolute percentage error
- No n − 1 sample option
- Do not classify MAD as low/moderate/high without user context
- Full floating-point precision during calculation
- Display precision is user-selectable (2, 4, or 6 decimal places; default 4)
- Trailing zeros removed in UI; negative zero displays as `0`

## Result summary fields

For dataset `12, 15, 14, 10, 19`:

| Field | Value |
|-------|-------|
| Mean Absolute Deviation | 2.4 |
| Mean | 14 |
| Count | 5 |
| Sum of absolute deviations | 12 |
| Minimum | 10 |
| Maximum | 19 |
| Range | 9 |

```text
minimum = min(values)
maximum = max(values)
range = maximum - minimum
```

Range is a single numeric value (max − min), not a min-to-max interval label.

## Initial state and calculation workflow

- No example selected (`Choose an example`)
- Empty dataset input
- Empty result message: `Enter a dataset and press Calculate MAD to see the result.`
- No formula, steps, table, or interpretation until **Calculate MAD** succeeds
- Example selection fills input only; does not auto-calculate
- Copy result unavailable before successful calculation

## Input parsing

**Separators:** comma, whitespace, semicolon, line break (mixed allowed).

**Valid token:** `/^[+-]?(?:\d+\.?\d*|\.\d+)$/`

**Rejected:** empty input, words, partial tokens, NaN, ±Infinity, >1,000 observations.

Scientific notation not supported.

## Display precision

Label: `Decimal places`. Options: 2, 4, 6. Default: 4.

Precision affects display only; calculation retains full internal precision.

## Large datasets

| Count | Table behavior |
|-------|----------------|
| ≤ 100 | Full table |
| > 100 | First 100 rows; `Showing 100 of [n] observations`; expand/collapse button |

Calculation always uses full dataset. Reset and new calculation reset expansion.

## Desktop layout (≥ 1024px)

Input panel left; result summary right (MAD visible without scrolling). Formula, steps, table, and interpretation full width below.

## Copy text (after calculation)

Includes: dataset, count, mean, MAD, sum of absolute deviations, minimum, maximum, range, formula. Excludes marketing and unrelated content.

## Interpretation

Neutral template: `Values in this dataset are, on average, [MAD] units away from the arithmetic mean of [mean].`

## Examples (verified)

1. `12, 15, 14, 10, 19` → MAD 2.4
2. `2, 4, 6` → MAD 4/3
3. `1, 2, 3, 4, 5` → MAD 1.2

## Page structure

Per Phase 1 Calculator Page Contract and Phase 2.2B content order:

1. Breadcrumbs
2. Page title and description
3. Working calculator (inputs + result near top)
4. What is mean absolute deviation?
5. Mean absolute deviation formula
6. How to calculate MAD
7. Complete worked example
8. Mean absolute deviation versus standard deviation
9. When MAD is useful
10. Limitations and interpretation
11. Sources and methodology
12. Related calculators
13. Last reviewed date

Educational prose lives below the interactive calculator. Interactive formula, steps,
table, and interpretation still appear after a successful **Calculate MAD** action.

## Structured data

- BreadcrumbList
- SoftwareApplication (published calculator)
- No FAQ, HowTo, ratings, or review schema

## Privacy

All calculations run locally; no data transmitted or stored.

## Phase documentation

- Functional UX: `Docs/Phase2_2AFunctionalCompletion.md`
- Content / SEO: `Docs/Phase2_2BContentCompletion.md`
- Validation: `Docs/Phase2_2AValidationReport.md`, `Docs/Phase2_2BValidationReport.md`
