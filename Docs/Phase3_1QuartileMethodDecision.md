# Phase 3.1 — Quartile Method Decision

**Research date:** 2026-09-01  
**Status:** Locked for Phase 3.2 implementation  
**Route:** `/calculators/statistics/outlier-iqr/`

## Summary decision

| Role | Internal ID | User-facing label |
|------|-------------|-------------------|
| **Default (V1)** | `exclusive-halves` | **Median of halves (exclude middle when odd)** |
| **Alternate (V1)** | `excel-r7` | **Linear interpolation (Excel PERCENTILE.INC)** |

Helper text (default):

> Splits the sorted data into lower and upper halves and takes the median of each half. When the count is odd, the overall median is excluded from both halves. This matches many introductory statistics texts and graphing calculators. Results may differ from Excel or Python unless you switch methods.

Helper text (alternate):

> Uses linear interpolation between sorted values at the 25th and 75th percentiles, matching Excel `PERCENTILE.INC`, NumPy `quantile(..., method="linear")`, and Hyndman–Fan type 7. Useful when comparing to spreadsheet output.

**No method is universally correct.** CalcLume exposes the convention explicitly.

---

## Methods researched

### 1. Median of halves — exclude middle when odd (`exclusive-halves`)

**Also called:** Exclusive method, Moore & McCabe method, TI-83 quartile method (Langford Method 2).

#### Algorithm

1. Sort values ascending → `x₁ ≤ x₂ ≤ … ≤ xₙ`.
2. **Median (Q2):**
   - If `n` is odd: `Q2 = x_{(n+1)/2}` (1-indexed middle).
   - If `n` is even: `Q2 = (x_{n/2} + x_{n/2 + 1}) / 2`.
3. **Lower half:**
   - If `n` is odd: all values strictly below `Q2` (exclude the middle value).
   - If `n` is even: `x₁ … x_{n/2}`.
4. **Upper half:**
   - If `n` is odd: all values strictly above `Q2`.
   - If `n` is even: `x_{n/2 + 1} … xₙ`.
5. **Q1** = median of lower half; **Q3** = median of upper half (same median rule on each half).

#### Odd `n` example — Langford S₅ = (1, 2, 3, 4, 5)

| Step | Result |
|------|--------|
| Q2 | 3 |
| Lower half | (1, 2) → Q1 = 1.5 |
| Upper half | (4, 5) → Q3 = 4.5 |

**Source:** Langford (2006), Method 2 — https://doi.org/10.1080/10691898.2006.11910589

#### Even `n` example — OpenStax 14-value dataset

Input: `1, 1, 2, 2, 4, 6, 6.8, 7.2, 8, 8.3, 9, 10, 10, 11.5`

| Stat | Value |
|------|------:|
| Q1 | 2 |
| Q2 | 7 |
| Q3 | 9 |

**Independent verification:** OpenStax Introductory Statistics 2e, §2.4 Box Plots — https://openstax.org/books/introductory-statistics-2e/pages/2-4-box-plots

#### Software / educational contexts

- Moore & McCabe textbooks (Langford Method 2)
- TI-83/84 1-Var Stats (Langford reports Method 2 in practice)
- Brase & Brase; Peck, Olsen, Devore
- OpenStax box-plot worked examples (verified for 14-value and 15-value sets)

#### Terminology ambiguity

Some sites label this “Tukey hinges.” **Langford shows formal Tukey hinges (Method 3) are numerically equal to the inclusive method, not this exclusive method.** CalcLume does not call `exclusive-halves` “Tukey hinges” to avoid that confusion.

---

### 2. Median of halves — include middle when odd (`inclusive-halves`)

**Not offered in V1** (documented for comparison only).

#### Algorithm difference

When `n` is odd, the overall median is **included in both** lower and upper halves before taking medians.

#### Odd `n` example — S₅ = (1, 2, 3, 4, 5)

| Step | Result |
|------|--------|
| Lower half | (1, 2, 3) → Q1 = 2 |
| Upper half | (3, 4, 5) → Q3 = 4 |

**Source:** Langford (2006), Method 1 — Siegel & Morgan.

#### Relation to Tukey hinges

Langford: *“Tukey hinges are numerically equal to Method 1 quartiles.”* Formal Tukey depth formula (Method 3) with interpolation can differ on even `n` with non-integer hinge depth; for simple classroom datasets they often match inclusive/exclusive on even `n`.

---

### 3. Tukey hinges (formal letter values)

**Not a separate V1 option** — covered by understanding inclusive/Tukey equivalence per Langford.

#### Algorithm (Langford Method 3)

1. Median depth `M = (n + 1) / 2`; Q2 = `#(M)` with linear interpolation when non-integer.
2. Hinge depth `H = (M + 1) / 2`.
3. Lower hinge = `#(H)`; upper hinge = `#(n + 1 − H)`.

`#(k)` = value at 1-indexed position `k`, linearly interpolated between adjacent order statistics when `k` is not integer.

**Source:** Tukey (1977); Langford (2006) Method 3; NIST handbook uses interpolated order statistics in its outlier example (different from exclusive halves).

---

### 4. Linear interpolation — Excel / R-7 (`excel-r7`)

#### Algorithm

For percentile `p ∈ {0.25, 0.5, 0.75}` on sorted data:

```text
h = (n − 1) × p + 1          (1-indexed real position)
If h is integer: Q = x_h
Else: Q = x_{⌊h⌋} + (h − ⌊h⌋) × (x_{⌊h⌋ + 1} − x_{⌊h⌋})
```

Use 0-based indexing in code as: `j = floor(h - 1)`, fraction `f = h - floor(h)`, then `sorted[j] + f * (sorted[j+1] - sorted[j])`.

#### Odd `n` example — S₅ = (1, 2, 3, 4, 5)

| Stat | Value |
|------|------:|
| Q1 | 2 |
| Q2 | 3 |
| Q3 | 4 |

**Source:** Langford (2006), Method 12 (“Excel”); Hyndman & Fan (1996), type 7.

#### Software contexts

- Microsoft Excel `PERCENTILE.INC` / `QUARTILE.INC`
- NumPy `quantile(..., method="linear")`
- R default `quantile(..., type = 7)`

---

## Method comparison table (selected datasets)

| Dataset | `exclusive-halves` Q1 / Q3 | `excel-r7` Q1 / Q3 |
|---------|---------------------------|-------------------|
| (1, 2, 3, 4, 5) | 1.5 / 4.5 | 2 / 4 |
| (10, 12, 14, 15, 19) | 11 / 17 | 12 / 15 |
| OpenStax 14-value | 2 / 9 | 2.5 / 8.825 |
| OpenStax 15-value | 15 / 490 | 25 / 455 |

Even-`n` datasets often agree on Q1/Q3 between methods; **odd-`n` datasets frequently disagree.**

---

## Selection criteria applied

| Criterion | `exclusive-halves` | `excel-r7` |
|-----------|-------------------|------------|
| Search-intent / classroom fit | Strong — box plots, five-number summaries | Strong — spreadsheet users |
| Educational recognizability | High | Medium |
| Reproducibility | High with documented rule | High with documented rule |
| Ease of explanation | High — “median of each half” | Medium — interpolation |
| Box-plot consistency | Matches whisker/fence teaching | Valid but different Q1/Q3 |
| Source support | OpenStax, Langford, Moore & McCabe | Langford, Hyndman–Fan, Excel docs |
| Homework surprise risk | Lower for intro-stats / calculator users | Higher as default; good as alternate |

**Default:** `exclusive-halves` — best balance for CalcLume’s EDA/outlier intent and OpenStax-aligned teaching.

**Alternate:** `excel-r7` — one clear second method for spreadsheet parity without offering a dozen quantile types.

---

## V1 scope limits

- Exactly **two** quartile methods.
- No MINITAB (R-6), no R-8, no manual hinge depth selector beyond these two.
- Changing quartile method requires recalculation (same as changing multiplier).

---

## Minimum sample size interaction

Quartile methods require non-empty lower and upper halves. **`exclusive-halves` requires `n ≥ 4`.** See `Phase3_1MathematicalSpecification.md` § Dataset rules.
