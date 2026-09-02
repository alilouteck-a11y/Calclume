# Phase 4.0 — Category Architecture

**Status:** Locked for Phase 4.1 planning  
**Date:** 2026-09-02

## Proposed model evaluation

The ten proposed categories are **directionally correct** for a broad calculator library. Three structural adjustments are recommended:

| Change | Rationale |
|--------|-----------|
| Rename **Statistics** → keep **Statistics** (not “Statistics & Data”) | Shorter slug (`statistics`), matches existing routes; “& Data” can appear in display title only |
| Keep **Finance** and **Business** separate | Different YMYL posture, sources, and user intent; cross-link heavily |
| Do **not** merge **Math** and **Science** | Math = symbolic/arithmetic; Science = domain formulas (physics, chemistry units) |
| Treat **Conversions** as high-volume, low-margin | Launch later with strong unit-source discipline |
| **Defer Construction** until editorial capacity exists | Code compliance and regional variance are costly |

No empty category index pages will be published (existing Phase 1 policy, reaffirmed).

---

## Risk classification model

Four **separate** dimensions — do not collapse into a single “YMYL/safety” score.

| Dimension | Definition | Drives |
|-----------|------------|--------|
| **YMYL risk** | Trust sensitivity for financial, medical, or life decisions (Google quality) | Disclaimer depth, review cadence, source bar |
| **Safety risk** | Physical harm if a user acts on output (structural failure, injury) | Prominent warnings, defer publication |
| **Formula/unit risk** | Wrong method, rounding, or units mislead results | Convention selectors, citations, tests |
| **Editorial maintenance cost** | Ongoing review burden, regional variance, legal exposure | Staffing, deferral, category priority |

Levels: **Low** · **Medium** · **High** · **Very high**

**Corrections from initial Phase 4.0 draft:**

- **Construction** is **not automatically YMYL** — default YMYL **Low–Medium**, but **Safety** and **Formula/unit** are often **High**; **Editorial cost** is **High** due to regional codes.  
- **Health** is **YMYL Very high**; Safety varies by tool (BMI vs dosage).  
- **Finance** is **YMYL High**; Safety usually Low unless misused for critical decisions.  
- **Statistics** inference tools carry **Formula/unit High** and **YMYL Medium**, not just “low stats risk.”

---

## Minimum calculators for indexable category landing

| Rule | Value |
|------|-------|
| **New categories** | **3 published calculators** minimum before an indexable `/calculators/[category]/` page ships |
| **Statistics (grandfather)** | Existing `/calculators/statistics/` may remain indexable at **2** published tools until a third statistics calculator ships or Phase 4.1 explicitly refreshes the hub |
| **Directory listing** | Category may appear on `/calculators/` as “Coming soon” **without** a link once 1–2 tools are in development — not indexable as a category hub |
| **Sitemap** | Category URLs enter sitemap only when the 3-calculator gate is met |

Rationale: Avoid thin category hubs that compete with calculator detail pages; three tools demonstrate cluster depth and support meaningful internal linking.

---

## Category definitions

### 1. Math

| Dimension | Assessment |
|-----------|------------|
| **User intent** | Solve arithmetic, algebra, and general mathematical expressions with verifiable steps |
| **Example calculators** | Percentage, fraction, ratio, standard form, quadratic formula, GCD/LCM |
| **YMYL risk** | Low |
| **Safety risk** | Low |
| **Formula/unit risk** | Low–medium |
| **Editorial maintenance cost** | Low |
| **Formula/source requirements** | Standard textbook definitions; note integer/real conventions |
| **Monetization potential** | Low direct; high traffic anchor for library discovery |
| **Priority** | **Launch** (second category after Statistics) |

### 2. Statistics

| Dimension | Assessment |
|-----------|------------|
| **User intent** | Explore, summarize, and test data with transparent EDA and inference tools |
| **Example calculators** | MAD, Outlier/IQR (live), CV, standard error, confidence interval, sample size |
| **YMYL risk** | Low–medium (misinterpreted inference) |
| **Safety risk** | Low |
| **Formula/unit risk** | Medium–high (quartiles, distributions, CI methods) |
| **Editorial maintenance cost** | Medium |
| **Formula/source requirements** | NIST, OpenStax, academic texts; explicit convention selectors |
| **Monetization potential** | Low direct; strong trust and education brand |
| **Priority** | **Launch** (founding cluster — 2 live, expand to 3+) |

### 3. Finance

| Dimension | Assessment |
|-----------|------------|
| **User intent** | Personal and small-business financial planning with understandable outputs |
| **Example calculators** | Compound interest, loan payment, mortgage, ROI, inflation adjustment |
| **YMYL risk** | **High** |
| **Safety risk** | Low (indirect decision harm) |
| **Formula/unit risk** | Medium–high (compounding, fees, rounding) |
| **Editorial maintenance cost** | High (disclaimers, regional tax) |
| **Formula/source requirements** | CFPB, SEC investor ed, standard financial math texts; payment schedule tables |
| **Monetization potential** | Medium (affiliate potential — **not** Phase 4 scope) |
| **Priority** | **Later** (after Math + Statistics depth) |

### 4. Business

| Dimension | Assessment |
|-----------|------------|
| **User intent** | Operational metrics: margins, break-even, inventory, payroll basics |
| **Example calculators** | Profit margin, markup vs margin, break-even units, hourly to salary |
| **YMYL risk** | Medium |
| **Safety risk** | Low |
| **Formula/unit risk** | Medium (margin vs markup confusion) |
| **Editorial maintenance cost** | Medium–high |
| **Formula/source requirements** | Accounting textbooks; define gross vs net consistently |
| **Monetization potential** | Medium |
| **Priority** | **Later** |

### 5. Everyday Life

| Dimension | Assessment |
|-----------|------------|
| **User intent** | Practical daily tasks: tips, splits, age, fuel, simple budgeting |
| **Example calculators** | Tip, bill split, fuel cost, age in days, time zone meeting |
| **YMYL risk** | Low |
| **Safety risk** | Low |
| **Formula/unit risk** | Low |
| **Editorial maintenance cost** | Low |
| **Formula/source requirements** | Minimal; clarity over citation depth |
| **Monetization potential** | Medium traffic |
| **Priority** | **Later** |

### 6. Date & Time

| Dimension | Assessment |
|-----------|------------|
| **User intent** | Duration, difference, and calendar arithmetic |
| **Example calculators** | Days between dates, add/subtract business days, age calculator, week number |
| **YMYL risk** | Low |
| **Safety risk** | Low |
| **Formula/unit risk** | Medium (leap years, DST, locale) |
| **Editorial maintenance cost** | Medium |
| **Formula/source requirements** | Document calendar assumptions; avoid DST unless scope is explicit |
| **Monetization potential** | Medium |
| **Priority** | **Later** |

### 7. Conversions

| Dimension | Assessment |
|-----------|------------|
| **User intent** | Convert units (length, mass, temperature, data) |
| **Example calculators** | Length, weight, temperature, bytes, speed |
| **YMYL risk** | Low (medical units deferred) |
| **Safety risk** | Low–medium if medical units added later |
| **Formula/unit risk** | **High** (precision, significant figures) |
| **Editorial maintenance cost** | Medium |
| **Formula/source requirements** | NIST SP 811, BIPM; cite exact conversion factors |
| **Monetization potential** | High traffic, low differentiation unless steps shown |
| **Priority** | **Later** |

### 8. Construction

| Dimension | Assessment |
|-----------|------------|
| **User intent** | Material estimates, pitch, concrete volume |
| **Example calculators** | Concrete slab, roofing pitch, tile coverage |
| **YMYL risk** | Low–medium (not medical/finance YMYL by default) |
| **Safety risk** | **High** (structural/material failure if misused) |
| **Formula/unit risk** | **High** (units, waste factors, code compliance) |
| **Editorial maintenance cost** | **High** (regional codes, ICC/ANSI) |
| **Formula/source requirements** | ICC/ANSI references; regional disclaimers |
| **Monetization potential** | Medium niche |
| **Priority** | **Defer** |

### 9. Health

| Dimension | Assessment |
|-----------|------------|
| **User intent** | BMI, BMR, calorie, pregnancy due date, clinical scores |
| **Example calculators** | BMI, BMR (Mifflin-St Jeor), target heart rate |
| **YMYL risk** | **Very high** |
| **Safety risk** | Medium–high (tool-dependent) |
| **Formula/unit risk** | Medium–high |
| **Editorial maintenance cost** | **High** |
| **Formula/source requirements** | WHO, CDC, peer-reviewed formulas; population limits stated |
| **Monetization potential** | High traffic |
| **Priority** | **Defer** until editorial/YMYL process matures |

### 10. Science

| Dimension | Assessment |
|-----------|------------|
| **User intent** | Physics, chemistry, and lab calculations |
| **Example calculators** | Molarity, density, ideal gas law, half-life |
| **YMYL risk** | Low–medium |
| **Safety risk** | Medium (lab/hazmat context) |
| **Formula/unit risk** | **High** (constants, units) |
| **Editorial maintenance cost** | Medium–high |
| **Formula/source requirements** | CODATA constants, IUPAC where relevant |
| **Monetization potential** | Medium |
| **Priority** | **Later** |

---

## Launch sequence (recommended)

```text
Phase A (now → 6 tools):  Statistics (depth) + Math (breadth)
Phase B (6 → 15):         Everyday Life, Date & Time, Conversions
Phase C (15+):            Finance, Business (with YMYL review)
Phase D:                  Science
Phase E:                  Health, Construction (defer until governance)
```

---

## Category slug registry (canonical)

| Display name | URL slug | Status |
|--------------|----------|--------|
| Math | `math` | Planned — not published |
| Statistics | `statistics` | **Live** (2 calculators) |
| Finance | `finance` | Deferred |
| Business | `business` | Deferred |
| Everyday Life | `everyday-life` | Deferred |
| Date & Time | `date-time` | Deferred |
| Conversions | `conversions` | Deferred |
| Construction | `construction` | Deferred |
| Health | `health` | Deferred |
| Science | `science` | Deferred |

Slugs are **kebab-case**, **English**, **stable** — never changed after publication without 301 strategy (static export: avoid renames).
