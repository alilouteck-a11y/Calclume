# Phase 3.1 — Product and UI Contract

**Status:** Locked for Phase 3.2  
**Route:** `/calculators/statistics/outlier-iqr/`  
**Last reviewed:** 2026-09-01

## Output data contract

Pure-function types only — no React, no formatted strings in the core result.

### Enums / unions

```typescript
type QuartileMethod = "exclusive-halves" | "excel-r7";

type FenceMultiplierId = "inner-1.5" | "outer-3.0";

type ObservationClassification =
  | "non-outlier"
  | "lower-outlier"
  | "upper-outlier";
```

### `OutlierIqrObservationRow`

| Field | Type | Invariant |
|-------|------|-----------|
| `index` | `number` | 1-based position in **original input order** |
| `value` | `number` | Finite; equals `originalValues[index - 1]` |
| `classification` | `ObservationClassification` | Mutually exclusive categories |

### `OutlierIqrOutlierEntry`

| Field | Type | Invariant |
|-------|------|-----------|
| `index` | `number` | 1-based original index |
| `value` | `number` | Finite; classified as lower- or upper-outlier |

### `OutlierIqrFiveNumberSummary`

| Field | Type | Invariant |
|-------|------|-----------|
| `minimum` | `number` | = min(sorted values) |
| `q1` | `number` | First quartile per method |
| `median` | `number` | Second quartile |
| `q3` | `number` | Third quartile |
| `maximum` | `number` | = max(sorted values) |

### `OutlierIqrBoxPlotData`

| Field | Type | Invariant |
|-------|------|-----------|
| `domainMin` | `number` | Scale domain low (may extend beyond data for padding) |
| `domainMax` | `number` | Scale domain high |
| `lowerWhisker` | `number` | ≤ upperWhisker |
| `q1` | `number` | Box left edge |
| `median` | `number` | Inside box |
| `q3` | `number` | Box right edge |
| `upperWhisker` | `number` | ≥ lowerWhisker |
| `lowerFence` | `number` | Reference line; not necessarily on scale endpoint |
| `upperFence` | `number` | Reference line |
| `lowerOutliers` | `OutlierIqrOutlierEntry[]` | May be empty |
| `upperOutliers` | `OutlierIqrOutlierEntry[]` | May be empty |

See `Phase3_1AccessibleBoxPlotContract.md` for rendering rules.

### `OutlierIqrResult` (success)

| Field | Type | Invariant |
|-------|------|-----------|
| `originalValues` | `number[]` | Input order preserved |
| `sortedValues` | `number[]` | Ascending copy |
| `count` | `number` | = originalValues.length |
| `minimum` | `number` | Data minimum |
| `maximum` | `number` | Data maximum |
| `q1` | `number` | |
| `median` | `number` | |
| `q3` | `number` | |
| `iqr` | `number` | = q3 - q1 |
| `fenceMultiplier` | `1.5 \| 3.0` | Selected k |
| `fenceMultiplierId` | `FenceMultiplierId` | |
| `lowerFence` | `number` | = q1 - k × iqr |
| `upperFence` | `number` | = q3 + k × iqr |
| `lowerWhisker` | `number` | Extreme non-outlier low |
| `upperWhisker` | `number` | Extreme non-outlier high |
| `lowerOutliers` | `OutlierIqrOutlierEntry[]` | Strictly below lowerFence |
| `upperOutliers` | `OutlierIqrOutlierEntry[]` | Strictly above upperFence |
| `outliers` | `OutlierIqrOutlierEntry[]` | lower + upper, original-index order |
| `outlierCount` | `number` | = outliers.length |
| `nonOutlierCount` | `number` | = count - outlierCount |
| `quartileMethod` | `QuartileMethod` | |
| `fiveNumberSummary` | `OutlierIqrFiveNumberSummary` | Consistent with min/q1/median/q3/max |
| `rows` | `OutlierIqrObservationRow[]` | length = count |
| `boxPlot` | `OutlierIqrBoxPlotData` | Derived from same calculation |

### Error types (separate from success)

| Error | When | User message |
|-------|------|----------------|
| Parser failure | `parseDataset` returns `ok: false` | Parser message (unchanged) |
| Insufficient data | `n < 4` after successful parse | `At least 4 observations are required for quartile and IQR calculations.` |

Do not return partial results on error.

---

## Fence multiplier UI

| Control | Type | Default |
|---------|------|---------|
| Quartile method | Select | `exclusive-halves` |
| Fence multiplier | Select (radio or select) | `inner-1.5` (1.5×IQR) |
| Decimal places | 2 / 4 / 6 | 4 |

**Changing quartile method** vs **changing multiplier:**

- Method → recalculates Q1, Q2, Q3, IQR, fences, whiskers, outliers, box plot.
- Multiplier → recalculates fences, classifications, whiskers, outliers, box plot only.

**Reset** restores: empty input, no example, default method, default multiplier (1.5), default precision (4), collapsed table, cleared copy confirmation.

**Copy result** includes: dataset text, count, method label, multiplier, five-number summary, IQR, fences, whiskers, outlier lists/count, formula summary. Uses selected display precision. Excludes marketing copy.

---

## Interaction states

### Initial state

- Empty dataset
- Example: “Choose an example”
- Quartile method: `exclusive-halves`
- Fence multiplier: `1.5 × IQR`
- Precision: 4 decimal places
- **Calculate outliers and IQR** button enabled (validation on click)
- Empty result: `Enter a dataset and press Calculate outliers and IQR to see the result.`
- No copy button
- Reset disabled (or disabled until dirty — match MAD: disabled until input/result/error exists)

### Input-ready state

- Dataset entered or example loaded
- **No automatic calculation**
- User presses **Calculate outliers and IQR**

### Successful state

**Desktop (≥1024px):**

- Left: input controls (example, dataset, method, multiplier, precision, calculate, reset, copy)
- Right: primary result summary
- Below full width: five-number summary, IQR/fences, outlier lists, formula, steps, table, box plot, interpretation, notice

**Mobile:**

- Input → Calculate → Primary result → Details (stacked)

### Failed calculation

- Field-level error on dataset input
- `aria-invalid="true"` on textarea
- `aria-describedby` → error element id
- Error container: `role="alert"`
- Previous result cleared
- Input preserved
- **Focus:** move focus to dataset input (or first focusable error summary) after failed calculate — match accessible error pattern from MAD

### Reset

Clears: dataset, example selection, errors, results, table expansion, copy confirmation state, box plot. Restores method, multiplier, precision defaults.

---

## Result hierarchy (page order)

1. **Primary result summary** — must show immediately:
   - IQR
   - Outlier count
   - Q1
   - Median
   - Q3
   - Lower fence
   - Upper fence
2. Five-number summary (min, Q1, median, Q3, max) — label min/max as **data** minimum/maximum
3. IQR and fence results (include whiskers; distinguish from fences)
4. Outlier count + explicit lower/upper outlier lists
5. Formula block
6. Step-by-step calculation
7. Sorted-data / classification table (original order — see below)
8. Accessible box plot
9. Interpretation (neutral)
10. Calculator notice

### Terminology distinction (required copy)

| Term | Meaning |
|------|---------|
| Data minimum / maximum | Smallest/largest **observed** values |
| Lower / upper fence | Q1 − k×IQR / Q3 + k×IQR (reference boundaries) |
| Lower / upper whisker | Most extreme **non-outlier** observed values |

---

## Large dataset behavior

| Aspect | Rule |
|--------|------|
| Calculation | Always uses all accepted observations |
| Table rows ≤100 | Show all rows |
| Table rows >100 | First 100 initially; status `Showing 100 of [n] observations` |
| Expand control | “Show all [n] rows” / “Show first 100 rows” |
| New calculation | Collapse table |
| Reset | Collapse table |
| Box plot | Always uses complete dataset |
| Large outlier lists | If outlier count > 20, show first 20 with “and [k] more” expandable, or scrollable region max-height with accessible count — implementer picks one; must announce total count to screen readers |

### Table order: **original input order**

**Justification:** Preserves observation index alignment with user input and duplicate tracking; classification column references the user’s sequence. Sorted values appear in the steps section and five-number summary.

---

## Calculate button label

**Calculate outliers and IQR**

---

## Examples (V1 config preview)

At least three built-in examples (values only; no auto-calculate):

1. Class scores (no outliers) — from fixture F01
2. Single high outlier — F02
3. Odd-count textbook set — F05 or OpenStax F06

Exact strings in Phase 3.2 config module.

---

## Internal module layout (Phase 3.2 preview)

```
lib/calculators/outlier-iqr.ts          // pure function
lib/calculators/outlier-iqr-config.ts   // display builders, examples, copy text
lib/calculators/quartiles.ts            // shared quartile helpers (optional split)
```

No files created in Phase 3.1.
