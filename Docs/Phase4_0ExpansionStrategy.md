# Phase 4.0 — Initial Expansion Strategy

**Status:** Exploratory — does not authorize implementation  
**Date:** 2026-09-02  
**Note:** No keyword volumes or difficulty scores are stated (per Phase 4.0 policy).

---

## Third calculator recommendation

| Field | Value |
|-------|-------|
| **Recommended candidate** | **Percentage Calculator** |
| **Category** | **Math** (second category expansion) |
| **Rationale** | Broad query family; low YMYL; clear step-by-step math; complements statistics interpretation; differentiates via “show the work” for reverse-percent and change problems |
| **Status** | **Requires separate SEO opportunity-validation phase** (mirror Phase 3.0 for Outlier/IQR) before implementation authorization |
| **Alternative if validation fails** | Coefficient of Variation Calculator (Statistics — stays in founding cluster) |

Expanding into **Math** is preferred over a third consecutive Statistics tool because it validates multi-category architecture, directory UX, and category registry patterns before high-YMYL domains (Finance, Health).

---

## Next 20 calculator opportunities

Priority key: **P1** = next wave after validation, **P2** = following wave, **P3** = backlog.

### Statistics (5)

| # | Calculator | Query family | Intent | Complexity | Sources | YMYL | Differentiation | Linking | Priority |
|---|------------|--------------|--------|------------|---------|------|-----------------|---------|----------|
| 1 | Coefficient of Variation | `coefficient of variation calculator` | Compute & compare relative spread | Medium | NIST, OpenStax | Low | Method + interpretation vs SD | MAD, Outlier/IQR | P1 |
| 2 | Standard Error of the Mean | `standard error calculator` | SEM for sample mean | Medium | OpenStax, NIST | Low | Step table from raw data | CI, sample size | P1 |
| 3 | Confidence Interval (mean) | `confidence interval calculator` | Interval for population mean | High | OpenStax, NIST | Medium | Show t vs z branch explicitly | SEM, critical value | P2 |
| 4 | Sample Size (mean) | `sample size calculator` | Power / margin planning | High | Cochran texts | Medium | Document assumptions | CI, SEM | P3 |
| 5 | Five Number Summary only | `five number summary calculator` | **Do not ship standalone** | — | — | — | Bundled in Outlier/IQR per Phase 3.0 | — | **Cancelled** |

### Math (4)

| # | Calculator | Query family | Intent | Complexity | Sources | YMYL | Differentiation | Linking | Priority |
|---|------------|--------------|--------|------------|---------|------|-----------------|---------|----------|
| 6 | **Percentage** | `percentage calculator`, `percent change` | Find %, increase/decrease, reverse | Low–medium | Standard arithmetic | Low | Multi-mode with steps | Fraction, ratio | **P1 (3rd calc candidate)** |
| 7 | Fraction Calculator | `fraction calculator` | Add/multiply/simplify fractions | Medium | Textbook | Low | Step-by-step LCD | Percentage, ratio | P2 |
| 8 | Ratio Calculator | `ratio calculator` | Simplify and scale ratios | Low | Textbook | Low | Visual ratio table | Percentage, fraction | P2 |
| 9 | Quadratic Formula | `quadratic formula calculator` | Solve ax²+bx+c=0 with steps | Medium | Standard algebra | Low | Discriminant interpretation | Math hub | P3 |

### Finance (3)

| # | Calculator | Query family | Intent | Complexity | Sources | YMYL | Differentiation | Linking | Priority |
|---|------------|--------------|--------|------------|---------|------|-----------------|---------|----------|
| 10 | Compound Interest | `compound interest calculator` | Future value with compounding | Medium | SEC/CFPB edu | **High** | Amortization-style step table | Loan payment | P2 |
| 11 | Loan Payment | `loan payment calculator` | Monthly payment (amortizing) | Medium | CFPB | **High** | Full schedule optional expand | Compound interest | P2 |
| 12 | ROI | `return on investment calculator` | Simple ROI % | Low | Finance texts | Medium | Define net vs gross ROI | Business margin | P3 |

### Business (2)

| # | Calculator | Query family | Intent | Complexity | Sources | YMYL | Differentiation | Linking | Priority |
|---|------------|--------------|--------|------------|---------|------|-----------------|---------|----------|
| 13 | Profit Margin | `profit margin calculator` | Gross/net margin | Low | Accounting primers | Medium | Margin vs markup callout | Markup, break-even | P2 |
| 14 | Break-Even | `break even calculator` | Units to cover fixed costs | Medium | Managerial accounting | Medium | Chart-free step breakdown | Profit margin | P3 |

### Everyday Life (2)

| # | Calculator | Query family | Intent | Complexity | Sources | YMYL | Differentiation | Linking | Priority |
|---|------------|--------------|--------|------------|---------|------|-----------------|---------|----------|
| 15 | Tip Calculator | `tip calculator` | Tip and split bill | Low | — | Low | Split + round options | Percentage | P2 |
| 16 | Fuel Cost Trip | `fuel cost calculator` | Trip fuel estimate | Low | — | Low | Unit toggle mi/km | Conversions | P3 |

### Date & Time (2)

| # | Calculator | Query family | Intent | Complexity | Sources | YMYL | Differentiation | Linking | Priority |
|---|------------|--------------|--------|------------|---------|------|-----------------|---------|----------|
| 17 | Days Between Dates | `days between dates calculator` | Calendar day count | Medium | Leap-year rules | Low | Inclusive/exclusive toggle | Age calculator | P2 |
| 18 | Age Calculator | `age calculator` | Age in years/months/days | Medium | Calendar rules | Low | Timezone note | Days between | P2 |

### Conversions (2)

| # | Calculator | Query family | Intent | Complexity | Sources | YMYL | Differentiation | Linking | Priority |
|---|------------|--------------|--------|------------|---------|------|-----------------|---------|----------|
| 19 | Temperature Converter | `celsius to fahrenheit` | Scale conversion with formula | Low | NIST | Low | Show formula + steps | Conversions hub | P2 |
| 20 | Length Converter | `cm to inches calculator` | Unit conversion | Low | NIST SP 811 | Low | Factor citation inline | Temperature | P2 |

**Deferred categories (not in top 20):** Construction, Health, Science — see Category Architecture doc.

---

## Distribution summary

| Category | Candidates in list | P1 count |
|----------|-------------------|----------|
| Statistics | 4 (+1 cancelled) | 2 |
| Math | 4 | 1 (3rd calc) |
| Finance | 3 | 0 |
| Business | 2 | 0 |
| Everyday Life | 2 | 0 |
| Date & Time | 2 | 0 |
| Conversions | 2 | 0 |

---

## SEO validation gate (required before build)

For each P1 calculator, complete a **Phase 3.0-style validation packet**:

1. Live SERP intent review (informational vs transactional calculator intent)
2. Cannibalization check against existing CalcLume URLs
3. Source and convention lock document
4. Page contract sketch (inputs, outputs, steps, interpretation)
5. Explicit PROCEED / DEFER decision in DecisionLog

**Percentage Calculator** must pass this gate before Phase 4.1 implementation.

---

## Internal linking strategy

- **Within category:** Related section links only to **published** tools in same category.
- **Cross-category:** Educational prose may link contextually (e.g. MAD → Percentage for “percent deviation” language).
- **Hub pages:** Category landing lists only published tools; preparation cards remain statistics-only until category exists.
- **Directory:** `/calculators/` shows category sections when ≥1 published tool exists in category; category hub indexable at ≥3.
