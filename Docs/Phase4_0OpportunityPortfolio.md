# Phase 4.0 — Opportunity Portfolio

**Status:** Exploratory — does not authorize implementation  
**Date:** 2026-09-02  
**Note:** No keyword volumes, CPC, or difficulty scores.

Risk dimensions (orthogonal):

| Dimension | Meaning |
|-----------|---------|
| **YMYL** | Google quality / trust sensitivity (finance, health, legal-adjacent) |
| **Safety** | Physical harm if output misused (structural, medical dosing) |
| **Formula/unit** | Wrong convention, rounding, or unit conversion misleads |
| **Editorial cost** | Ongoing review burden, disclaimers, regional variance |

Levels: **Low** · **Medium** · **High** · **Very high**

---

## Portfolio (20 calculators)

### Statistics

#### 1. Coefficient of Variation Calculator

| Field | Value |
|-------|-------|
| Category | Statistics |
| Primary query family | `coefficient of variation calculator` |
| Intent | Calculate and compare relative variability |
| Complexity | Medium |
| Differentiation | Explicit population vs sample CV; steps from raw data |
| Source requirements | NIST, OpenStax |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | MAD, Outlier/IQR, SEM |
| **Recommendation** | **P1** — next statistics depth tool |

#### 2. Standard Error of the Mean Calculator

| Field | Value |
|-------|-------|
| Category | Statistics |
| Primary query family | `standard error calculator`, `sem calculator` |
| Intent | Compute SEM for inference |
| Complexity | Medium |
| Differentiation | Full deviation table to SEM |
| Source requirements | OpenStax, NIST |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | CI, sample size, MAD |
| **Recommendation** | **P1** |

#### 3. Confidence Interval Calculator (mean)

| Field | Value |
|-------|-------|
| Category | Statistics |
| Primary query family | `confidence interval calculator` |
| Intent | Interval estimate for population mean |
| Complexity | High |
| Differentiation | t vs z branch shown; assumptions stated |
| Source requirements | OpenStax, NIST |
| YMYL | Medium |
| Safety | Low |
| Formula/unit | High |
| Internal-link potential | SEM, critical value |
| **Recommendation** | **P2** |

#### 4. Sample Size Calculator (mean)

| Field | Value |
|-------|-------|
| Category | Statistics |
| Primary query family | `sample size calculator` |
| Intent | Plan study size for margin/power |
| Complexity | High |
| Differentiation | Assumption panel; no black-box n |
| Source requirements | Cochran, OpenStax |
| YMYL | Medium |
| Safety | Low |
| Formula/unit | High |
| Internal-link potential | CI, SEM |
| **Recommendation** | **P3** |

---

### Math

#### 5. Percentage Calculator ⚠️ third-calculator candidate

| Field | Value |
|-------|-------|
| Category | Math |
| Primary query family | `percentage calculator`, `percent change calculator` |
| Intent | Find %, increase/decrease, reverse percentage |
| Complexity | Low–medium |
| Differentiation | Multi-mode with unified step engine |
| Source requirements | Standard arithmetic texts |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Low |
| Internal-link potential | Fraction, ratio, tip, statistics interpretation |
| **Recommendation** | **Candidate for 3rd calculator** — **requires live SEO validation before build** |

#### 6. Fraction Calculator

| Field | Value |
|-------|-------|
| Category | Math |
| Primary query family | `fraction calculator` |
| Intent | Operate on fractions with steps |
| Complexity | Medium |
| Differentiation | LCD steps shown |
| Source requirements | Textbook |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | Percentage, ratio |
| **Recommendation** | **P2** |

#### 7. Ratio Calculator

| Field | Value |
|-------|-------|
| Category | Math |
| Primary query family | `ratio calculator`, `simplify ratio` |
| Intent | Simplify and scale ratios |
| Complexity | Low |
| Differentiation | Ratio table + steps |
| Source requirements | Textbook |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Low |
| Internal-link potential | Percentage, fraction |
| **Recommendation** | **P2** |

#### 8. Quadratic Formula Calculator

| Field | Value |
|-------|-------|
| Category | Math |
| Primary query family | `quadratic formula calculator` |
| Intent | Solve quadratic with discriminant |
| Complexity | Medium |
| Differentiation | Discriminant interpretation block |
| Source requirements | Standard algebra |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | Math hub |
| **Recommendation** | **P3** |

---

### Finance

#### 9. Compound Interest Calculator

| Field | Value |
|-------|-------|
| Category | Finance |
| Primary query family | `compound interest calculator` |
| Intent | Future value with compounding |
| Complexity | Medium |
| Differentiation | Period-by-period table optional |
| Source requirements | SEC/CFPB investor education |
| YMYL | **High** |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | Loan payment, ROI |
| **Recommendation** | **P2** — after YMYL process |

#### 10. Loan Payment Calculator

| Field | Value |
|-------|-------|
| Category | Finance |
| Primary query family | `loan payment calculator`, `amortization calculator` |
| Intent | Monthly payment on amortizing loan |
| Complexity | Medium |
| Differentiation | Amortization schedule with steps |
| Source requirements | CFPB |
| YMYL | **High** |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | Compound interest |
| **Recommendation** | **P2** |

#### 11. ROI Calculator

| Field | Value |
|-------|-------|
| Category | Finance |
| Primary query family | `roi calculator`, `return on investment` |
| Intent | Simple ROI percentage |
| Complexity | Low |
| Differentiation | Net vs gross ROI defined |
| Source requirements | Finance primers |
| YMYL | Medium |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | Business margin |
| **Recommendation** | **P3** |

---

### Business

#### 12. Profit Margin Calculator

| Field | Value |
|-------|-------|
| Category | Business |
| Primary query family | `profit margin calculator` |
| Intent | Gross/net margin |
| Complexity | Low |
| Differentiation | Margin vs markup callout |
| Source requirements | Accounting primers |
| YMYL | Medium |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | Break-even, ROI |
| **Recommendation** | **P2** |

#### 13. Break-Even Calculator

| Field | Value |
|-------|-------|
| Category | Business |
| Primary query family | `break even calculator` |
| Intent | Units to cover fixed costs |
| Complexity | Medium |
| Differentiation | Step breakdown without chart junk |
| Source requirements | Managerial accounting |
| YMYL | Medium |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | Profit margin |
| **Recommendation** | **P3** |

---

### Everyday Life

#### 14. Tip Calculator

| Field | Value |
|-------|-------|
| Category | Everyday Life |
| Primary query family | `tip calculator` |
| Intent | Tip and bill split |
| Complexity | Low |
| Differentiation | Split + round options with steps |
| Source requirements | Minimal |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Low |
| Internal-link potential | Percentage |
| **Recommendation** | **P2** |

#### 15. Fuel Cost Trip Calculator

| Field | Value |
|-------|-------|
| Category | Everyday Life |
| Primary query family | `fuel cost calculator` |
| Intent | Trip fuel estimate |
| Complexity | Low |
| Differentiation | Unit toggle mi/km with formula |
| Source requirements | Minimal |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Low |
| Internal-link potential | Length converter |
| **Recommendation** | **P3** |

---

### Date & Time

#### 16. Days Between Dates Calculator

| Field | Value |
|-------|-------|
| Category | Date & Time |
| Primary query family | `days between dates calculator` |
| Intent | Calendar day count |
| Complexity | Medium |
| Differentiation | Inclusive/exclusive toggle documented |
| Source requirements | Leap-year rules |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | Age calculator |
| **Recommendation** | **P2** |

#### 17. Age Calculator

| Field | Value |
|-------|-------|
| Category | Date & Time |
| Primary query family | `age calculator` |
| Intent | Age in years/months/days |
| Complexity | Medium |
| Differentiation | Timezone/locale assumptions stated |
| Source requirements | Calendar rules |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | Days between |
| **Recommendation** | **P2** |

---

### Conversions

#### 18. Temperature Converter

| Field | Value |
|-------|-------|
| Category | Conversions |
| Primary query family | `celsius to fahrenheit`, `temperature converter` |
| Intent | Scale conversion |
| Complexity | Low |
| Differentiation | Formula + factor citation |
| Source requirements | NIST |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | Conversions hub |
| **Recommendation** | **P2** |

#### 19. Length Converter

| Field | Value |
|-------|-------|
| Category | Conversions |
| Primary query family | `cm to inches`, `length converter` |
| Intent | Length unit conversion |
| Complexity | Low |
| Differentiation | NIST SP 811 factors inline |
| Source requirements | NIST SP 811 |
| YMYL | Low |
| Safety | Low |
| Formula/unit | Medium |
| Internal-link potential | Temperature, fuel cost |
| **Recommendation** | **P2** |

---

### Cancelled / deferred (portfolio slots)

#### 20. Five Number Summary (standalone)

| Field | Value |
|-------|-------|
| Category | Statistics |
| **Recommendation** | **Cancelled** — bundled in Outlier/IQR (Phase 3.0) |

#### Construction / Health / Science backlog (not in top 20)

See `Phase4_0CategoryArchitecture.md` — deferred categories. Portfolio slot 20 filled by Length Converter above; Construction and Health reserved for future waves after governance.

---

## Distribution

| Category | Count in portfolio |
|----------|-------------------|
| Statistics | 4 |
| Math | 4 |
| Finance | 3 |
| Business | 2 |
| Everyday Life | 2 |
| Date & Time | 2 |
| Conversions | 2 |
| **Total** | **20** |

---

## Third calculator

**Percentage Calculator (Math)** — exploratory recommendation only. **Do not implement** until separate SEO opportunity-validation phase approves.

**Fallback if validation fails:** Coefficient of Variation (Statistics) — stays in founding cluster, no second category proof.

---

## Related documents

- Expansion summary: `Phase4_0ExpansionStrategy.md`  
- Category risk: `Phase4_0CategoryArchitecture.md`  
- Catalog fields: `Phase4_0CalculatorCatalogArchitecture.md`
