# Phase 3.1 — Fixture Matrix

**Status:** Locked for Phase 3.2 tests  
**Default method unless noted:** `exclusive-halves`  
**Default multiplier unless noted:** `k = 1.5`  
**Verification date:** 2026-09-01

Fixtures computed with independent Python script using the algorithms in `Phase3_1QuartileMethodDecision.md`. OpenStax fixtures cross-checked against published textbook values.

---

## F01 — No-outlier dataset

| Field | Value |
|-------|-------|
| **Input** | `2, 4, 6, 8, 10, 12, 14` |
| **Sorted** | 2, 4, 6, 8, 10, 12, 14 |
| **n** | 7 |
| **Q1** | 4 |
| **Median** | 8 |
| **Q3** | 12 |
| **IQR** | 8 |
| **Lower fence** | −8 |
| **Upper fence** | 24 |
| **Lower whisker** | 2 |
| **Upper whisker** | 14 |
| **Outliers** | none |
| **Verification** | Manual exclusive-halves derivation; script |

---

## F02 — One high outlier

| Field | Value |
|-------|-------|
| **Input** | `1, 2, 3, 4, 5, 6, 7, 8, 9, 100` |
| **Sorted** | 1 … 9, 100 |
| **n** | 10 |
| **Q1** | 3 |
| **Median** | 5.5 |
| **Q3** | 8 |
| **IQR** | 5 |
| **Lower fence** | −4.5 |
| **Upper fence** | 15.5 |
| **Lower whisker** | 1 |
| **Upper whisker** | 9 |
| **Outliers** | upper: 100 (index 10) |
| **Verification** | Script |

---

## F03 — One low outlier

| Field | Value |
|-------|-------|
| **Input** | `1, 10, 11, 12, 13, 14, 15, 16, 17, 18` |
| **Q1** | 11 |
| **Median** | 13.5 |
| **Q3** | 16 |
| **IQR** | 5 |
| **Lower fence** | 3.5 |
| **Upper fence** | 23.5 |
| **Outliers** | lower: 1 (index 1) |
| **Verification** | Script |

---

## F04 — Outliers on both sides

| Field | Value |
|-------|-------|
| **Input** | `-50, 1, 2, 3, 4, 5, 6, 7, 8, 200` |
| **Q1** | 2 |
| **Median** | 4.5 |
| **Q3** | 7 |
| **IQR** | 5 |
| **Lower fence** | −5.5 |
| **Upper fence** | 14.5 |
| **Outliers** | lower: −50; upper: 200 |
| **Verification** | Script |

---

## F05 — Odd observation count

| Field | Value |
|-------|-------|
| **Input** | `10, 12, 14, 15, 19` |
| **Sorted** | 10, 12, 14, 15, 19 |
| **Q1** | 11 |
| **Median** | 14 |
| **Q3** | 17 |
| **IQR** | 6 |
| **Lower fence** | 2 |
| **Upper fence** | 26 |
| **Outliers** | none |
| **Verification** | Script; lower half (10,12), upper (15,19) |

---

## F06 — Even count (OpenStax verified)

| Field | Value |
|-------|-------|
| **Input** | `1, 1, 2, 2, 4, 6, 6.8, 7.2, 8, 8.3, 9, 10, 10, 11.5` |
| **n** | 14 |
| **Q1** | 2 |
| **Median** | 7 |
| **Q3** | 9 |
| **IQR** | 7 |
| **Lower fence** | −8.5 |
| **Upper fence** | 19.5 |
| **Outliers** | none |
| **Verification** | OpenStax Introductory Statistics 2e §2.4 — https://openstax.org/books/introductory-statistics-2e/pages/2-4-box-plots |

---

## F07 — Duplicate values

| Field | Value |
|-------|-------|
| **Input** | `5, 5, 5, 10, 10, 10, 10, 15` |
| **Q1** | 5 |
| **Median** | 10 |
| **Q3** | 10 |
| **IQR** | 5 |
| **Lower fence** | −2.5 |
| **Upper fence** | 17.5 |
| **Outliers** | none |
| **Verification** | Script |

---

## F08 — Negative values

| Field | Value |
|-------|-------|
| **Input** | `-10, -5, 0, 5, 10` |
| **Q1** | −7.5 |
| **Median** | 0 |
| **Q3** | 7.5 |
| **IQR** | 15 |
| **Lower fence** | −30 |
| **Upper fence** | 30 |
| **Outliers** | none |
| **Verification** | Script |

---

## F09 — Decimal values

| Field | Value |
|-------|-------|
| **Input** | `1.5, 2.25, .5, 3.75, 4.0` |
| **Sorted** | 0.5, 1.5, 2.25, 3.75, 4.0 |
| **Q1** | 1 |
| **Median** | 2.25 |
| **Q3** | 3.875 |
| **IQR** | 2.875 |
| **Lower fence** | −3.3125 |
| **Upper fence** | 8.1875 |
| **Outliers** | none |
| **Verification** | Script |

---

## F10 — All values equal

| Field | Value |
|-------|-------|
| **Input** | `7, 7, 7, 7, 7` |
| **Q1 = Median = Q3** | 7 |
| **IQR** | 0 |
| **Lower fence = Upper fence** | 7 |
| **Whiskers** | 7 / 7 |
| **Outliers** | none |
| **Verification** | Script; degenerate case rules |

---

## F11 — IQR = 0 with non-identical values

| Field | Value |
|-------|-------|
| **Input** | `3, 3, 3, 3, 3, 10` |
| **Q1 = Q3** | 3 |
| **Median** | 3 |
| **IQR** | 0 |
| **Lower fence = Upper fence** | 3 |
| **Whiskers** | 3 / 3 |
| **Outliers** | upper: 10 |
| **Verification** | Script; only value outside Q1=Q3 flagged |

---

## F12 — Values exactly on fences (boundary rule)

Uses **reference fences** from F05 on `[10, 12, 14, 15, 19]`: lower fence = **2**, upper fence = **26**.

| Test value | Classification | Reason |
|------------|----------------|--------|
| 2 | non-outlier | equal to lower fence |
| 26 | non-outlier | equal to upper fence |
| 1 | lower outlier | 1 < 2 |
| 27 | upper outlier | 27 > 26 |

**Full-dataset note:** Adding 2 and 26 to the F05 set changes quartiles; boundary tests validate the **classification function** with fixed fence numbers.

**Verification** | Manual strict inequality rules + script on classification helper

---

## F13 — Minimum allowed dataset (n = 4)

| Field | Value |
|-------|-------|
| **Input** | `1, 2, 3, 4` |
| **Q1** | 1.5 |
| **Median** | 2.5 |
| **Q3** | 3.5 |
| **IQR** | 2 |
| **Lower fence** | −1.5 |
| **Upper fence** | 6.5 |
| **Outliers** | none |
| **Verification** | Script |

---

## F14 — 1,000-observation boundary

| Field | Value |
|-------|-------|
| **Input** | Integers `1` through `1000` (inclusive) |
| **n** | 1000 |
| **Q1** | 250.5 |
| **Median** | 500.5 |
| **Q3** | 750.5 |
| **IQR** | 500 |
| **Lower fence** | −499.5 |
| **Upper fence** | 1500.5 |
| **Outliers** | none |
| **Verification** | Script (arithmetic sequence closed form) |

---

## F15 — 1,001-observation rejection

| Field | Value |
|-------|-------|
| **Input** | 1001 numeric tokens (e.g. `1` … `1001`) |
| **Expected** | Parser error before pure function |
| **Message contains** | `limited to 1,000 observations` |
| **Verification** | `parseDataset` contract in `parse-dataset.ts` |

---

## F16 — Methods produce different answers

**Input:** `10, 12, 14, 15, 19`

| Method | Q1 | Median | Q3 | IQR | Lower fence | Upper fence |
|--------|---:|-------:|---:|----:|------------:|------------:|
| `exclusive-halves` | 11 | 14 | 17 | 6 | 2 | 26 |
| `excel-r7` | 12 | 14 | 15 | 3 | 7.5 | 19.5 |

Both methods: **0 outliers** at k = 1.5 for this input.

**Verification:** Langford S₅ pattern; script; Excel PERCENTILE.INC logic (Method 12)

---

## Supplementary fixtures

### F02b — Multiplier 3.0 on F02

Same input as F02, `k = 3.0`:

| Field | Value |
|-------|-------|
| Lower fence | −12 |
| Upper fence | 23 |
| Outliers | upper: 100 |

### F06b — OpenStax 15-value five-number summary

**Input:** `10, 10, 10, 15, 35, 75, 90, 95, 100, 175, 420, 490, 515, 515, 790`

| Stat | exclusive-halves |
|------|----------------:|
| Q1 | 15 |
| Median | 95 |
| Q3 | 490 |

**Verification:** OpenStax §2.4 worked example (five-number summary list).

---

## Fixture count summary

| Category | Count |
|----------|------:|
| Required primary fixtures (F01–F16) | 16 |
| Supplementary (F02b, F06b) | 2 |
| **Total documented** | **18** |

All primary fixtures independently checked via script and/or published source as noted.
