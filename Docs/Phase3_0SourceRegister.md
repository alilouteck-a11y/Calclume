# Phase 3.0 — Source Register (Second Calculator)

**Research date:** 2026-09-01  
**Purpose:** Authoritative sources that can support the recommended Outlier and IQR Calculator  
**Status:** Consulted for validation; not yet wired into a calculator page

## Preferred sources

### 1. NIST/SEMATECH e-Handbook — What are outliers in the data?

- **URL:** https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm  
- **Supports:** Definition of outliers; box-plot construction using quartiles; IQR as Q3−Q1; inner fences at 1.5×IQR; outer fences at 3×IQR; mild vs extreme outlier language  
- **Terminology notes:** Uses “IQ” for interquartile range; “inner/outer fences”  
- **Disagreements / caveats:** Quartile extraction in the NIST worked example uses an ordered-point interpolation approach (e.g., .25(N+1)th point). That may differ from classroom “median of halves” Tukey hinges. CalcLume must **not** imply NIST mandates one classroom hinge method while citing NIST for fences.

### 2. OpenStax Introductory Statistics — Box Plots / five-number summary context

- **URL (2e):** https://openstax.org/books/introductory-statistics-2e/pages/2-4-box-plots  
- **Also related:** https://openstax.org/books/introductory-statistics/pages/2-4-box-plots  
- **Supports:** Five values used for box plots (min, Q1, median, Q3, max); IQR = Q3−Q1; whiskers and optional outlier marking conceptually  
- **Terminology notes:** Classroom five-number summary language  
- **Caveats:** OpenStax focuses on construction/interpretation; exact quartile algorithm may still need an explicit CalcLume convention for homework parity

### 3. OpenStax — Measures of location (quartiles background)

- **URL:** https://openstax.org/books/introductory-statistics/pages/2-3-measures-of-the-location-of-the-data  
- **Supports:** Quartile/percentile location concepts used when explaining Q1/Q3  
- **Caveats:** Confirm section details against the edition cited on the eventual calculator page

## Supplementary educational references (optional later)

| Source | Use | Caution |
|--------|-----|---------|
| Harvard DFCI Intro to Data Science — Robust summaries | Tukey outlier interval discussion | Course notes; secondary to NIST/OpenStax |
| PlotNerd quartile-method explainers | Competitive/UX research on method confusion | Not a primary authority for CalcLume citations |

## Sources explicitly not sufficient alone

- Random calculator blogs without methodology
- Unverified wiki mirrors
- AI-generated unexplained formulas

## Convention conflict to resolve in Phase 3.1

| Topic | NIST example tendency | Common textbook tendency | CalcLume requirement |
|-------|----------------------|--------------------------|----------------------|
| Quartile position | Interpolated order statistics in handbook example | Median of halves / hinges | Documented selectable methods |
| Fence multipliers | 1.5 mild, 3 extreme | Often 1.5 only | Support both; default 1.5 |
| Outlier action | Investigate; may be valuable or bad data | Sometimes “remove” casually | Never auto-remove; investigate framing |

## CV / SE / Critical value (deferred candidates) — seed sources only

Not expanded fully because they are not the Phase 3.1 pick:

- OpenStax sections on SD / sampling for SE context  
- Standard normal / t tables authorities for critical values (if later)  
- NIST measures of scale already used on MAD page for related dispersion language
