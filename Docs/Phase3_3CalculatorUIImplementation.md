# Phase 3.3 — Calculator UI Implementation

**Status:** Complete (unpublished — no route)  
**Last reviewed:** 2026-09-02

## Scope

Interactive React UI for the Outlier and IQR Calculator, wired to the Phase 3.2 pure engine. No App Router page, sitemap entry, registry publication, metadata, content page, or homepage changes.

## File map

| Path | Role |
|------|------|
| `lib/calculators/outlier-iqr-config.ts` | Examples, labels, copy/steps/interpretation builders, table row builder, constants |
| `components/calculators/outlier-iqr/OutlierIqrCalculator.tsx` | Main orchestrator |
| `components/calculators/outlier-iqr/QuartileMethodSelector.tsx` | Quartile method select |
| `components/calculators/outlier-iqr/FenceMultiplierSelector.tsx` | 1.5× / 3.0× select |
| `components/calculators/outlier-iqr/OutlierIqrResultSummary.tsx` | Primary IQR result panel |
| `components/calculators/outlier-iqr/FiveNumberSummary.tsx` | Min, Q1, median, Q3, max |
| `components/calculators/outlier-iqr/FenceWhiskerDetails.tsx` | Fences and whiskers (distinct labels) |
| `components/calculators/outlier-iqr/OutlierList.tsx` | Lower/upper outlier lists with expansion |
| `components/calculators/outlier-iqr/ObservationClassificationTable.tsx` | Per-observation classification table |
| `components/calculators/outlier-iqr/AccessibleBoxPlot.tsx` | Inline SVG + textual summary + sr-only table |
| `components/calculator/DatasetInput.tsx` | Optional `textareaRef` for focus-on-error (backwards compatible) |

## State model

| State | Purpose |
|-------|---------|
| `input` | Raw dataset textarea |
| `selectedExampleId` | Example selector value |
| `quartileMethod` | `exclusive-halves` (default) or `excel-r7` |
| `fenceMultiplier` | `1.5` (default) or `3` |
| `decimalPlaces` | `2`, `4` (default), or `6` |
| `snapshot` | Last successful calculation (`result`, `input`, `quartileMethod`, `fenceMultiplier`) |
| `validationError` | Parser or engine error message |
| `tableExpanded` | Observation table show-all toggle |
| `copyResetKey` | Resets copy confirmation on reset |

Calculation runs **only** in `handleCalculate()`. Derived display values use `useMemo` (summary, table rows); no `useEffect` synchronizes derived state.

## Stale-result policy

After a successful calculation, changing **dataset**, **quartile method**, or **fence multiplier** keeps the last result visible with `STALE_RESULT_NOTICE`; the copy button is hidden until recalculate. Changing **decimal places alone** does not mark the result stale. Failed Calculate clears `snapshot`, collapses the table, and returns focus to the dataset textarea.

## Large-table expansion policy

- Limit: `OUTLIER_IQR_TABLE_ROW_LIMIT` (100 rows).
- When `n > 100`, show first 100 rows with status text and `Show all [n] rows` / `Show first 100 rows`.
- New calculation and reset collapse expansion.
- Engine always uses the full dataset.

## Large-outlier-list expansion policy

- Limit: `OUTLIER_LIST_DISPLAY_LIMIT` (20 entries per side).
- When a side has more than 20 outliers, show first 20 with `Show [k] more` / `Show first 20`.
- Duplicate values keep separate list entries keyed by `index-value`.
- Expansion is component-local state; reset and new calculation do not persist list expansion across calculator reset (lists unmount with result).

## Result section order

1. Result summary (IQR primary)
2. Five-number summary
3. IQR fences and whiskers
4. Outlier lists
5. Formula
6. Step-by-step calculation
7. Observation classification table
8. Box plot
9. Interpretation
10. About notice (always visible)

## Examples (verified in config tests)

| ID | Label | Purpose |
|----|-------|---------|
| `even-spread` | Even spread (no outliers) | F01 baseline |
| `high-outlier` | One high outlier | F02 |
| `low-outlier` | One low outlier | F03 |
| `method-comparison` | Quartile method comparison | F16 / excel-r7 divergence |

## Responsive layout (static class audit)

| Breakpoint | Behavior |
|------------|----------|
| 320px | Single-column stack; `overflow-x-auto` on table and box-plot wrapper; SVG `min-w-[320px] w-full max-w-full`; controls `min-h-11` |
| 390px | Same stack; `sm:p-6` shell padding |
| 768px | Outlier lists `md:grid-cols-2` |
| 1024px+ | Inputs and result `lg:grid-cols-2 lg:items-start lg:gap-6` |
| 1280px | Fluid width; no fixed viewport-wide containers |

**Deferred to Phase 3.4:** real-browser visual inspection at each breakpoint.

## Tests

| File | Tests | Focus |
|------|-------|-------|
| `__tests__/outlier-iqr-ui.test.tsx` | 10 | Initial state, workflow, stale policy, validation, hierarchy |
| `__tests__/outlier-iqr-interactions.test.tsx` | 16 | Methods, multipliers, precision, validation/focus, correctness, large table, clipboard, reset |
| `__tests__/outlier-iqr-outlier-list.test.tsx` | 2 | Outlier list expand/collapse (synthetic data) |
| `__tests__/outlier-iqr-config.test.ts` | 6 | Example verification |
| `__tests__/outlier-iqr-box-plot.test.tsx` | 7 | Accessible box plot unit tests |

Shared helpers: `__tests__/outlier-iqr-test-helpers.ts`.

**Phase 3.3 UI test total: 41.**
