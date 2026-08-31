# Phase 3.0 — Calculator Architecture Decision

**Research date:** 2026-09-01  
**Decision status:** Recommended for approval (not yet implemented)

## Combined vs separate

| Query / product label | Recommendation |
|-----------------------|----------------|
| Outlier Calculator | **Combine** into one page |
| IQR Calculator | **Combine** |
| Interquartile Range Calculator | **Combine** |
| Five Number Summary Calculator | **Combine** (primary output block) |
| Box Plot Calculator | **Combine** as visualization of the same computation — not a separate indexable tool at launch |

### Rationale
SERP competitors already bundle these. Splitting would cannibalize CalcLume’s own pages, dilute link equity, and force duplicate quartile logic. A single strong page matches user jobs-to-be-done: summarize → measure middle spread → flag extremes → visualize.

## Exact recommended route and title

| Field | Recommendation |
|-------|----------------|
| Route slug | `/calculators/statistics/outlier-iqr/` |
| Why this slug | Matches existing portfolio planning slug; keeps directory continuity |
| Primary page title | Outlier and IQR Calculator |
| H1 | Outlier and IQR Calculator |
| Supporting visible name | Include “five-number summary” and “box plot” in description and H2s |

**Primary query family:** outlier calculator / IQR calculator  
**Secondary:** five number summary, Tukey fences, box plot outliers

## Future supporting pages (later phases)

- Coefficient of Variation Calculator
- Standard Error Calculator
- Critical Value Calculator (possibly multi-page cluster)
- Optional later: dedicated deep-dive article only if Search Console shows informational gaps the calculator page cannot cover — prefer on-page sections first

## Internal linking

| From | To | Anchor idea |
|------|----|-------------|
| MAD page | Outlier/IQR | Resistant spread / EDA companion |
| Outlier/IQR | MAD | Average absolute deviation about the mean |
| Both | Methodology / Sources | Trust |
| Statistics directory | Both | Collection navigation |

## “In preparation” card wording (later change only)

When Phase 3.1 ships:

- Publish `outlier-iqr` card as Available
- Keep `five-number-summary-box-plot` as **preparing** **or** retitle it later to avoid promising a duplicate tool — preferred: mark as “Covered by Outlier and IQR Calculator” / merge planning records in a future IA cleanup
- Do **not** change production cards in Phase 3.0

## Required mathematical convention decisions (Phase 3.1)

Must be decided before coding:

1. **Default quartile method** for Q1/Q3  
   - Recommended default: textbook / Tukey-hinges style used in many intro courses (median of halves; document odd-n median handling explicitly)  
   - Offer alternate inclusive percentile method for spreadsheet parity
2. **Fence multiplier:** default 1.5; optional 3.0 extreme
3. **Whisker policy for plot:** to last non-outlier point (Tukey box plot), not always min/max
4. **Ties / duplicate values:** sort stably; document behavior
5. **Minimum n:** define (e.g., n ≥ 4 for meaningful quartiles) with clear errors
6. **Interpretation:** never auto-delete outliers; never label dispersion “high/low” without context

## Scope boundaries for the page

**In scope**

- Dataset input (reuse MAD parser patterns)
- Five-number summary
- IQR
- Inner (and optional outer) fences
- Outlier list with indices/values
- Accessible box plot
- Steps + sources

**Out of scope for first ship**

- Grubbs’ test / z-score outliers
- Multivariate outliers
- Grouped/frequency data
- Interactive plot editing
- Separate downloadable image CDN requirements beyond static SVG

## Risk flags

| Risk | Mitigation |
|------|------------|
| Quartile method fights with homework answers | Method selector + labeled default |
| Box plot accessibility | SVG + data table equivalent |
| Cannibalization with future 5NS card | Single published route; update planning copy later |
| Over-broad page | One calculation job: EDA summary + IQR outliers |
