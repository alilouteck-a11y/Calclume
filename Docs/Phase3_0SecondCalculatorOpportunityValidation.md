# Phase 3.0 — Second Calculator Opportunity Validation

**Research date:** 2026-09-01  
**Market context:** English-first, global web search (sources are predominantly US/.com SERPs; location not locked to a paid SEO tool)  
**Status:** COMPLETE — decision ready for approval  
**Outcome:** **PROCEED WITH CONDITIONS**

## Executive recommendation

**Recommended second calculator:** Combined **Outlier and IQR Calculator** that also computes the **five-number summary**, Tukey fences, and an accessible box-plot view.

**Decision:** PROCEED WITH CONDITIONS (does **not** reject Outlier/IQR; it confirms and scopes it correctly as a combined tool).

**Why it won**

- Strong calculator-shaped search intent across multiple related query families
- Clear CalcLume differentiation path: explicit quartile convention, transparent steps, neutral interpretation, accessible table + box plot
- Natural cluster adjacency to the live MAD calculator (descriptive spread / EDA)
- Credible sources (NIST fences; OpenStax five-number summary / box plots)
- Static-export and testability are manageable **if** quartile conventions are locked in Phase 3.1

**Why not Critical Value or Standard Error as #2**

- Critical values fragment into z/t/χ²/F products and need careful quantile numerics
- Standard error is viable later but weaker cluster adjacency and more input-mode branching
- Neither differentiates as cleanly against Omni / Stats-by-Jim style incumbents for a second launch

Exact keyword volumes and KD scores were **not** available from a paid SEO tool in this phase. Demand and competition judgments below are labeled accordingly.

## Candidates compared

1. Outlier and IQR Calculator (roadmap)
2. Five Number Summary Calculator (roadmap)
3. Coefficient of Variation Calculator (roadmap)
4. Standard Error Calculator (roadmap)
5. Critical Value Calculator (roadmap)
6. **Discovered opportunity:** treat Five Number Summary + Box Plot + IQR Outliers as **one** production page rather than two competing CalcLume tools

## Scoring model (explicit weights)

| # | Criterion | Weight |
|---|-----------|--------|
| 1 | Search-intent strength | 0.12 |
| 2 | Evidence of demand | 0.12 |
| 3 | Competitive attainability | 0.12 |
| 4 | Differentiation opportunity | 0.12 |
| 5 | Educational value | 0.10 |
| 6 | Fit with existing MAD calculator | 0.10 |
| 7 | Implementation confidence | 0.12 |
| 8 | Monetization suitability | 0.05 |
| 9 | Internal-linking potential | 0.08 |
| 10 | Long-term cluster value | 0.07 |

Scores are 1–5. Weighted score = Σ(score × weight). Max = 5.0.

### Combined Outlier + IQR + Five-Number Summary (recommended product)

| Criterion | Score | Weighted | Rationale (summary) | Confidence |
|-----------|------:|---------:|---------------------|------------|
| Intent | 5 | 0.60 | SERPs for outlier/IQR/five-number queries are dominated by interactive calculators | High |
| Demand | 4 | 0.48 | Many dedicated tools + classroom EDA usage; **no verified volumes** | Medium |
| Attainability | 3 | 0.36 | Crowded with thin tools; few with method transparency + a11y | Medium |
| Differentiation | 5 | 0.60 | Quartile-method selector, fences table, steps, accessible plot | High |
| Educational | 5 | 0.50 | Core intro-stats skill; pairs formula + interpretation | High |
| MAD fit | 5 | 0.50 | Both descriptive-spread / EDA; natural related links | High |
| Implementation | 3 | 0.36 | Quartile method disagreements are the main risk | Medium |
| Monetization | 4 | 0.20 | Homework + lab traffic; AdSense-compatible educational intent | Medium |
| Internal links | 5 | 0.40 | Links to MAD, future CV/SE, methodology/sources | High |
| Cluster value | 5 | 0.35 | Anchor for EDA / resistant-spread cluster | High |
| **Total** |  | **4.35** |  |  |

### Five Number Summary alone (if forced separate)

| Criterion | Score | Weighted | Notes | Confidence |
|-----------|------:|---------:|-------|------------|
| Intent | 5 | 0.60 | Calculator SERP | High |
| Demand | 4 | 0.48 | Strong classroom phrasing; volumes unverified | Medium |
| Attainability | 3 | 0.36 | Many dedicated pages | Medium |
| Differentiation | 3 | 0.36 | Weaker if it omits IQR/outliers competitors include | Medium |
| Educational | 5 | 0.50 | Foundational | High |
| MAD fit | 4 | 0.40 | Related, slightly less “dispersion measure” framing | High |
| Implementation | 3 | 0.36 | Same quartile risk | Medium |
| Monetization | 4 | 0.20 | Similar | Medium |
| Internal links | 4 | 0.32 | Good but cannibalizes IQR/outlier page | High |
| Cluster value | 3 | 0.21 | Splits cluster if published separately | High |
| **Total** |  | **3.79** | Inferior to combined product |  |

### Coefficient of Variation

| Criterion | Score | Weighted | Notes | Confidence |
|-----------|------:|---------:|-------|------------|
| Intent | 4 | 0.48 | Calculator SERP; also Excel how-tos | High |
| Demand | 3 | 0.36 | Present; likely narrower than IQR/outlier family | Low–Med |
| Attainability | 4 | 0.48 | Some strong brands (BYJU’S); many thin pages | Medium |
| Differentiation | 4 | 0.48 | Sample vs pop SD, % vs ratio, mean≈0 caveats | High |
| Educational | 4 | 0.40 | Clear but narrower concept | High |
| MAD fit | 3 | 0.30 | Related relative dispersion; less EDA adjacency | Medium |
| Implementation | 4 | 0.48 | Simpler math; edge cases around mean sign/zero | High |
| Monetization | 3 | 0.15 | Useful later; less classroom breadth | Medium |
| Internal links | 3 | 0.24 | Links to MAD / SE | Medium |
| Cluster value | 3 | 0.21 | Good #3/#4 candidate | Medium |
| **Total** |  | **3.58** |  |  |

### Standard Error (of the mean)

| Criterion | Score | Weighted | Notes | Confidence |
|-----------|------:|---------:|-------|------------|
| Intent | 4 | 0.48 | Calculator + formula intent; SEM ambiguity exists | High |
| Demand | 4 | 0.48 | Strong homework/inference demand (directional) | Medium |
| Attainability | 3 | 0.36 | Omni, Stats by Jim, etc. | Medium |
| Differentiation | 3 | 0.36 | Need exceptional steps/interpretation | Medium |
| Educational | 5 | 0.50 | Critical for CI/tests | High |
| MAD fit | 2 | 0.20 | Inference vs descriptive spread | High |
| Implementation | 4 | 0.48 | Raw + summary modes manageable | High |
| Monetization | 4 | 0.20 | Broader stats audience | Medium |
| Internal links | 3 | 0.24 | Bridges to CI later | Medium |
| Cluster value | 4 | 0.28 | Opens inference cluster | High |
| **Total** |  | **3.58** |  |  |

### Critical Value Calculator

| Criterion | Score | Weighted | Notes | Confidence |
|-----------|------:|---------:|-------|------------|
| Intent | 5 | 0.60 | Strong calculator intent | High |
| Demand | 4 | 0.48 | Broad homework demand (directional) | Medium |
| Attainability | 2 | 0.24 | Omni, SocSci Statistics, multi-tool hubs | Medium |
| Differentiation | 2 | 0.24 | Hard without superior UX + multi-dist depth | Medium |
| Educational | 4 | 0.40 | Important but easy to oversimplify | Medium |
| MAD fit | 1 | 0.10 | Different cluster (hypothesis testing) | High |
| Implementation | 2 | 0.24 | Multi-distribution quantiles; high edge-case risk | Medium |
| Monetization | 4 | 0.20 | High homework intent | Medium |
| Internal links | 2 | 0.16 | Weak near-term MAD links | High |
| Cluster value | 4 | 0.28 | Future inference cluster, not #2 | Medium |
| **Total** |  | **2.94** | Defer as second launch |  |

## Weighted ranking

| Rank | Candidate | Weighted score |
|------|-----------|---------------:|
| 1 | Combined Outlier + IQR + Five-Number Summary | **4.35** |
| 2 | Five Number Summary alone | 3.79 |
| 3 | Coefficient of Variation | 3.58 |
| 3 | Standard Error | 3.58 |
| 5 | Critical Value | 2.94 |

## Decision thresholds checklist

| Threshold | Met? |
|-----------|------|
| Search intent expects a calculator | Yes |
| CalcLume can add material value | Yes (method transparency + a11y + trust) |
| Mathematics can be specified unambiguously | Conditionally — with explicit quartile convention |
| Credible sources available | Yes |
| Implementation/interpretation risks manageable | Conditionally |
| Strengthens coherent statistics cluster | Yes |

**Outcome:** PROCEED WITH CONDITIONS

## Conditions for Phase 3.1

1. Lock default quartile method and expose alternatives clearly
2. Default Tukey fence multiplier **1.5**; optional extreme **3.0**
3. Ship five-number summary + IQR + fences + outlier list on one page
4. Box plot must be accessible (SVG + textual/table equivalent)
5. Neutral language: flagged values are candidates for investigation, not automatic “bad data”
6. Validate demand in Search Console / keyword tool after soft content launch metrics accumulate
7. Do **not** publish a separate competing five-number-summary route in Phase 3

## Proposed Phase 3.1 scope (preview only)

- Mathematical specification + quartile convention decision record
- Parser reuse from MAD
- Pure calculation + tests for quartiles, IQR, fences, outliers
- UI calculator shell + box-plot accessibility
- Educational sections and sources
- Related links to MAD

No implementation in Phase 3.0.

## Evidence gaps

| Gap | Label |
|-----|-------|
| Exact monthly volumes / CPC / KD | Requires SEO tool or Search Console |
| Country-level demand mix | Requires SEO tool |
| Relative volume of “IQR calculator” vs “outlier calculator” vs “five number summary calculator” | Requires SEO tool |
| AI Overview / featured-snippet frequency | Manual SERP monitoring over time |

## Confirmation

No calculator code, route, sitemap entry, placeholder indexable page, or registry change was added in Phase 3.0.
