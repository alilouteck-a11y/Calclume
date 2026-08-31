# Phase 3.1 — Mathematical Specification

**Status:** Locked for Phase 3.2  
**Route:** `/calculators/statistics/outlier-iqr/`  
**Last reviewed:** 2026-09-01

## Purpose

Implementation-ready rules for the pure calculation layer. Display formatting is **not** applied inside the calculator function.

---

## Calculation pipeline (exact order)

Given raw parsed values `values[]`, quartile method `m`, fence multiplier `k`:

| Step | Action |
|------|--------|
| 1 | **Parse input** via shared `parseDataset()` — see § Input parsing |
| 2 | **Validate count** — `n ≥ 4` and `n ≤ 1000`; reject non-finite values (already handled by parser) |
| 3 | **Preserve original order** — store `values` as entered; never sort in place |
| 4 | **Create sorted copy** — `sorted = [...values].sort((a,b) => a - b)` (numeric ascending; stable sort not required for pure numbers) |
| 5 | **Minimum** — `min = sorted[0]` |
| 6 | **Q1** — per selected quartile method |
| 7 | **Median (Q2)** — per selected quartile method |
| 8 | **Q3** — per selected quartile method |
| 9 | **Maximum** — `max = sorted[n - 1]` |
| 10 | **IQR** — `iqr = q3 - q1` |
| 11 | **Apply fence multiplier** — use selected `k` (default `1.5`) |
| 12 | **Lower fence** — `lowerFence = q1 - k × iqr` |
| 13 | **Upper fence** — `upperFence = q3 + k × iqr` |
| 14 | **Classify each observation** — in **original order**; see § Outlier classification |
| 15 | **Whiskers** — see § Whiskers |
| 16 | **Five-number summary** — `{ min, q1, median, q3, max }` |
| 17 | **Box-plot geometry** — derive from steps 5–15; see `Phase3_1AccessibleBoxPlotContract.md` |
| 18 | **Display formatting** — presentation layer only (`formatDisplayNumber`) |

---

## Core formulas

```text
IQR = Q3 − Q1
Lower fence = Q1 − k × IQR
Upper fence = Q3 + k × IQR
```

Default `k = 1.5`.

---

## Quartile methods

See `Phase3_1QuartileMethodDecision.md` for full algorithms.

| Internal ID | Q1 / Q3 rule |
|-------------|--------------|
| `exclusive-halves` | Median of lower/upper halves; exclude middle value when `n` odd |
| `excel-r7` | Linear interpolation at p = 0.25 and 0.75 with `h = (n−1)p + 1` |

Median (Q2) always uses the same method’s p = 0.5 rule (exclusive-halves median-of-full-data; excel-r7 interpolation).

---

## Outlier classification

For each observation `x` (by original index):

```text
if x < lowerFence  → lower outlier
else if x > upperFence → upper outlier
else → non-outlier
```

### Boundary rules (strict)

- Values **strictly below** lower fence → lower outlier.
- Values **strictly above** upper fence → upper outlier.
- Values **equal to** a fence → **not** an outlier.
- **No automatic deletion** or filtering of data.
- Duplicate outlier values each retain their own row/index in classification tables.

### Floating-point comparison

- Use IEEE-754 `number` arithmetic throughout; **no display rounding in the calculation path**.
- Classification uses direct comparisons: `x < lowerFence`, `x > upperFence`.
- **Do not add an epsilon fudge factor.** If a value is misclassified solely due to floating-point representation, that is a bug in how inputs or fences are computed — fix the computation path, not the comparison.
- Tests must include fence-boundary cases (see Fixture F12 in `Phase3_1FixtureMatrix.md`).

---

## Whiskers

Whiskers are **not** fence endpoints.

```text
nonOutlierValues = { x in values | lowerFence ≤ x ≤ upperFence }
lowerWhisker = min(nonOutlierValues)   // if empty, use min (degenerate)
upperWhisker = max(nonOutlierValues)   // if empty, use max (degenerate)
```

Whiskers extend to the most extreme **observed non-outlier** values on each side.

---

## Fence multiplier (V1)

| Setting | Internal ID | Label | `k` |
|---------|-------------|-------|-----|
| Default | `inner-1.5` | **1.5 × IQR (inner fences)** | 1.5 |
| Alternate | `outer-3.0` | **3.0 × IQR (outer fences)** | 3.0 |

### Wording (NIST-qualified)

- **1.5 × IQR:** Values beyond these fences are **candidates flagged by the 1.5×IQR rule** (NIST “inner fences”). NIST describes points beyond inner fences as **mild outliers** in the context of box plots — CalcLume uses neutral “lower/upper outlier (1.5×IQR rule)” language, not “mild/extreme” unless `k = 3.0` is selected.
- **3.0 × IQR:** NIST “outer fences” — points beyond may be described as **more extreme relative to the same rule** when `k = 3.0` is selected. Do **not** claim every value outside 3×IQR is universally “extreme” in all statistical frameworks.

Changing multiplier recalculates fences and classifications only; quartiles unchanged.

---

## Dataset rules

### Minimum / maximum

| Rule | Value | Reason |
|------|------:|--------|
| Minimum observations | **4** | Exclusive halves need at least two values per half for a meaningful quartile split; `n = 1–3` yields empty half or trivial/degenerate quartiles |
| Maximum observations | **1000** | Matches `MAX_DATASET_OBSERVATIONS` in `parse-dataset.ts` |

### Rejection behavior

| Count | Result |
|------:|--------|
| 0 (empty) | Parser error |
| 1–3 | Pure-function error: `At least 4 observations are required for quartile and IQR calculations.` |
| 4–1000 | Calculate |
| >1000 | Parser error before pure function |

### Special datasets

| Case | Behavior |
|------|----------|
| All values equal | Q1 = Q2 = Q3 = that value; IQR = 0; fences equal Q1; no outliers unless strict inequality impossible |
| IQR = 0, not all equal | Fences = Q1 = Q3; values outside that level are outliers (e.g. `[3,3,3,3,3,10]` → 10 flagged) |
| One distinct value with repeats | Same as all equal |
| Duplicates at quartile boundaries | Included in halves per sort order; no special tie-breaking beyond numeric sort |
| One-sided outliers | Valid |
| Two-sided outliers | Valid |
| Negative / decimal values | Valid |

---

## Input parsing

**Reuse `parseDataset()` unchanged** from `lib/calculators/parse-dataset.ts`.

Accepted: commas, spaces, newlines, semicolons, mixed; integers, decimals, negatives, leading `.5`, explicit `+`/`-`.

Rejected: empty, words, partial tokens, NaN, Infinity, >1000 observations.

No parser duplication in V1.

---

## Floating-point and display policy

| Layer | Rule |
|-------|------|
| Calculation | Full IEEE-754 `number` precision |
| Intermediate display | Never round back into calculations |
| Display precision | User selects 2, 4, or 6 decimal places; **default 4** |
| Trailing zeros | Trim in formatted output |
| Negative zero | Display as `0` |
| Copy text | Uses selected display precision |
| Structured JSON result | Raw `number` fields only — no pre-formatted strings in the pure result type |

Formatting uses existing `formatDisplayNumber` / `DEFAULT_DISPLAY_PRECISION` from MAD calculator.

---

## Pure function API (summary)

```typescript
type QuartileMethod = "exclusive-halves" | "excel-r7";
type FenceMultiplier = 1.5 | 3.0;

function calculateOutlierIqr(
  values: number[],
  options: { quartileMethod: QuartileMethod; fenceMultiplier: FenceMultiplier }
): OutlierIqrResult;
```

Full type definitions: `Phase3_1ProductAndUIContract.md` § Output data contract.

Errors (throw or Result type — implementer choice, but must be separate from success):

- `RangeError` / `InsufficientDataError`: fewer than 4 values
- Parser errors remain in `parseDataset` layer

---

## Non-goals (V1)

See `Phase3_1ContentAndSEOContract.md` § Scope boundaries.

---

## Related documents

- Quartile decision: `Phase3_1QuartileMethodDecision.md`
- Fixtures: `Phase3_1FixtureMatrix.md`
- UI: `Phase3_1ProductAndUIContract.md`
- Box plot: `Phase3_1AccessibleBoxPlotContract.md`
