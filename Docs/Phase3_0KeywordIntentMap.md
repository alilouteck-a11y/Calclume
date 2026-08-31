# Phase 3.0 — Keyword & Intent Map

**Research date:** 2026-09-01  
**Search market:** Global English web (observed .com-centric SERPs)  
**Device:** Mixed; not locked  
**Metric status:** No verified keyword volumes/CPC/KD from Ahrefs/Semrush/GSC in this phase

All volume-like claims below are **Directional evidence** or **Qualitative judgment** unless stated otherwise.

## Intent taxonomy used

- **Calculator:** expects interactive computation
- **Educational:** expects definition/how-to/article
- **Hybrid:** expects calculator plus teaching content
- **Ambiguous:** multiple meanings

---

## Candidate A — Outlier / IQR (combined product primary)

### Primary query family (target)
- outlier calculator
- IQR calculator
- interquartile range calculator
- outlier calculator using IQR / Tukey fences

**Intent:** Hybrid calculator (Directional — SERPs filled with tools)

### Secondary families
- how to find outliers using IQR
- 1.5 IQR rule
- lower fence upper fence calculator
- mild vs extreme outliers
- box plot outliers

### Related classroom terminology
- quartiles Q1 Q3
- Tukey’s fences
- resistant measures of spread

### Ambiguity / wrong-audience risk
- “Outlier” in ML anomaly detection / fraud tools
- Non-IQR outlier tests (Grubbs, z-score) — must state scope = IQR method

---

## Candidate B — Five-number summary

### Primary
- five number summary calculator
- 5 number summary calculator

**Intent:** Hybrid calculator

### Secondary
- how to find five number summary
- min Q1 median Q3 max
- five number summary box plot

### Architecture note
Should be **sections of Candidate A**, not a competing indexable tool at launch.

---

## Candidate C — Coefficient of variation

### Primary
- coefficient of variation calculator
- CV calculator

### Secondary
- how to calculate coefficient of variation
- CV vs standard deviation
- relative standard deviation (RSD) — related but not identical branding

### Ambiguity
- Finance “CV” jargon
- Sample vs population SD (n−1 vs n)

**Intent:** Calculator + formula education

---

## Candidate D — Standard error

### Primary
- standard error calculator
- standard error of the mean calculator
- SEM calculator

### Secondary
- SE vs SD
- how to calculate standard error
- SEM formula s/√n

### Ambiguity (high)
- Standard error of **measurement** (psychometrics)
- SE of proportion / regression coefficient

**Intent:** Calculator; often wants sample SD path

---

## Candidate E — Critical value

### Primary
- critical value calculator
- z critical value / t critical value

### Secondary
- chi-square critical value
- F critical value
- critical value for 95% confidence

### Ambiguity
- Distribution-specific; “critical value” alone under-specifies

**Intent:** Calculator / table replacement

---

## Cross-map: what users expect on-page

| Expectation | Outlier/IQR/5NS | CV | SE | Critical |
|-------------|-----------------|----|----|----------|
| Interactive calculator | Yes | Yes | Yes | Yes |
| Formula + steps | Yes | Yes | Yes | Yes |
| Worked example | Yes | Yes | Yes | Yes |
| Table of row-level flags | Yes (outliers) | Optional | Optional | No |
| Visualization | Box plot strong | Histogram optional | Histogram optional | Density optional |
| Sample vs population option | Quartile methods | SD divisor | Usually sample SEM | N/A |
| Distribution inputs | No | No | No | Yes (major) |

## Recommended targeting for Phase 3.1 page

**Primary title focus:** Outlier and IQR  
**On-page secondary coverage:** Five-number summary, fences, box plot  
**Supporting article sections (same URL):** how-to, worked example, MAD comparison, limitations  

Future separate URLs (not Phase 3.1): CV calculator; SEM calculator; critical-value hub.
