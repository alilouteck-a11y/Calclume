# Phase 3.1 — Content and SEO Contract

**Status:** Locked for Phase 3.2 content implementation  
**Route:** `/calculators/statistics/outlier-iqr/`  
**Last reviewed:** 2026-09-01

## Educational page sections (below calculator)

Order after successful calculation UI blocks:

1. What is the interquartile range?
2. What is an outlier?
3. IQR formula
4. How Tukey fences work
5. How to calculate IQR and outliers
6. Worked example (matches F05 or F06 — exclusive-halves)
7. Five-number summary explained
8. How to read the box plot
9. Why quartile methods can disagree
10. IQR versus MAD (link to live MAD calculator)
11. IQR versus standard deviation
12. When IQR is useful
13. Limitations
14. Sources and methodology
15. Related calculators
16. Last reviewed date

Educational prose lives **below** the interactive calculator shell, consistent with MAD page architecture.

---

## Claims requiring citations

| Claim | Source |
|-------|--------|
| IQR = Q3 − Q1 | NIST; OpenStax |
| Inner fences at Q1 − 1.5×IQR and Q3 + 1.5×IQR | NIST https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm |
| Outer fences at 3×IQR | NIST (same) |
| Outliers should be investigated, not auto-deleted | NIST (same) |
| Five-number summary components | OpenStax §2.4 |
| Whiskers to smallest/largest non-outlier when outliers shown | OpenStax §2.4 (dots/whiskers note) |
| Quartile definitions vary across software | Langford (2006) https://doi.org/10.1080/10691898.2006.11910589 |
| MAD definition when comparing | Existing CalcLume MAD sources (NIST/OpenStax) |

Do **not** cite without source: “mild/extreme” as universal labels for 1.5/3.0 rules; arbitrary “typical IQR ranges”; significance of outlier counts.

---

## Schema policy

**Allowed on this page (Phase 3.2+):**

- `BreadcrumbList`
- `SoftwareApplication` (calculator)

**Site-wide (unchanged):** Organization, WebSite

**Forbidden:** FAQPage, HowTo, AggregateRating, Review, fabricated review counts

No schema or metadata files added in Phase 3.1.

---

## SEO proposal (provisional)

| Field | Value |
|-------|-------|
| **H1** | Outlier and IQR Calculator |
| **Title tag** | Outlier and IQR Calculator — Five-Number Summary & Box Plot \| CalcLume |
| **Meta description** | Calculate IQR, Tukey fences, and outliers from your data. See the five-number summary, step-by-step work, and an accessible box plot. Local, private calculation. |
| **Canonical** | `https://calclume.com/calculators/statistics/outlier-iqr/` |
| **Breadcrumbs** | Home → Calculators → Statistics → Outlier and IQR Calculator |

### Query families

| Priority | Queries |
|----------|---------|
| Primary | outlier calculator, IQR calculator, interquartile range calculator |
| Secondary | five number summary calculator, box plot outliers, 1.5 IQR rule, Tukey fences, how to find outliers using IQR |

### Snippet intent

Hybrid: calculator result (IQR, outlier count, fences) + educational steps visible on page.

---

## Internal links

| From | To | Anchor concept |
|------|----|----------------|
| Outlier/IQR page | `/calculators/statistics/mean-absolute-deviation/` | MAD as mean-based spread; IQR as quartile-based resistant spread |
| MAD page (future edit) | Outlier/IQR | EDA companion |
| Both | Methodology / Sources pages | Trust |
| Statistics directory | Outlier/IQR | Collection |

### Related calculator cards (on-page section)

- Mean Absolute Deviation Calculator (live)
- Future: CV, Standard Error (deferred — text only “coming later” or omit if no card)

Do **not** link to a separate five-number-summary route.

---

## Scope boundaries (V1 non-goals)

| Non-goal | Notes |
|----------|-------|
| Automatic outlier deletion | Never |
| “Remove these points” recommendations | Never |
| Statistical significance / p-values | Out of scope |
| Z-score / Grubbs / modified Z | Future separate tools |
| Arbitrary multiplier text input | Only 1.5 and 3.0 selects |
| CSV upload | Future |
| Saved datasets / accounts | Never in static V1 |
| Backend processing | Never |
| Downloadable chart images | Future |
| Separate five-number route | Rejected per Phase 3.0 |
| Advanced chart customization | Future |

---

## Interpretation template (neutral)

> The interquartile range for this dataset is **[IQR]**. Using the **[multiplier]×IQR rule** with **[method label]**, **[count]** observation(s) fall outside the fences and are flagged for review. Fences are reference boundaries — not automatic reasons to delete data.

No “high dispersion” or “unusual data quality” without user context.

---

## Last reviewed date

Set at content ship (Phase 3.2+); placeholder format: ISO date in config module.
