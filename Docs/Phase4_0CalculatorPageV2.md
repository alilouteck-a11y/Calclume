# Phase 4.0 — Calculator Page V2 Contract

**Status:** Contract — migration Phase 4.4  
**Date:** 2026-09-02

## Page hierarchy (exact order)

All content **server-rendered in HTML** for SEO. Interactive calculator is a client island inside the workspace region.

| # | Region | Element | SEO visible |
|---|--------|---------|-------------|
| 1 | Breadcrumbs | `Breadcrumbs` | ✓ |
| 2 | Title block | `PageHeader`: H1 + 1–2 sentence intro | ✓ |
| 3 | Trust strip | `CalculatorTrustStrip` | ✓ |
| 4 | Calculator workspace | `CalculatorShell` + tool UI | Partial (labels static) |
| 5 | In-page nav | `EducationToc` — **conditional** | ✓ links to anchors |
| 6 | Educational content | `*EducationalContent` prose sections | ✓ |
| 7 | Sources | Section with citations | ✓ |
| 8 | Related calculators | `RelatedCalculators` grid | ✓ links when published |
| 9 | Last reviewed | Footer meta line | ✓ |

**No client-only educational content.** Hydration may enhance (expand/collapse) but full text in SSR HTML.

---

## Region specifications

### 1. Breadcrumbs

```text
Home → Calculators → [Category] → [Calculator shortName or name]
```

Category crumb links to category page only if indexable; else links to `/calculators/#category-[id]`.

### 2. Title block

- **One H1** — calculator `name` from catalog  
- Intro paragraph: what it computes + who it helps (from catalog `description`, may extend)  
- No marketing hero height — max ~3 lines on desktop

### 3. Trust strip

```text
Local calculation · Sources below · Last reviewed [date]
```

- Links: `Methodology` (`/methodology/`), `#sources` anchor  
- `lastReviewedAt` from catalog  
- Placed **above** `CalculatorShell`, below H1 block

### 4. Calculator workspace

`CalculatorShell` retains title prop for tool context (optional subtitle inside shell — not duplicate H1).

**Desktop (≥1024px):**

```text
┌─────────────────────────────────────────┐
│  Input column          │  Result summary │
│  (controls)            │  (primary answer)│
├─────────────────────────────────────────┤
│  Full-width: formula, steps, tables, charts │
└─────────────────────────────────────────┘
```

**Mobile (&lt;1024px):**

```text
Input
Result summary (primary answer)
Formula
Steps
Tables / charts
Actions (copy, reset)
```

### 5. In-page navigation (TOC)

| Condition | TOC |
|-----------|-----|
| Educational sections ≤ 4 | **Omit** TOC |
| Educational sections ≥ 5 | **Show** sticky-free anchor list below trust strip |

TOC links to `h2` ids only. No JS required — native hash navigation.

### 6–7. Educational content + sources

Fixed section order per tool (defined in tool config), minimum:

1. Definition / what it measures  
2. Formula  
3. Method / how to use  
4. Worked example (engine-verified numbers)  
5. Limitations  
6. Sources (`id="sources"`)

`.prose-content` with `max-width: 65ch` for readability.

### 8. Related calculators

- Resolve `relatedCalculatorIds` from catalog (max 4)  
- **Published:** linked `RelatedCalculatorCard` with `href`  
- **Preparation:** card with badge “In preparation”, **no link**, `aria-disabled`  
- Omit cancelled/deferred from display

### 9. Last reviewed

```text
Last reviewed: [Month D, YYYY]. See editorial policy.
```

Link to `/editorial-policy/`.

---

## Result hierarchy (within workspace)

Universal order after successful calculation:

| Priority | Block | Typography role |
|----------|-------|-------------------|
| 1 | **Primary answer** | `--text-result-primary` |
| 2 | Key secondary metrics (e.g. Q1, median, IQR) | `--text-result-secondary` |
| 3 | Formula | `.formula-block` |
| 4 | Steps (numbered) | mono / structured list |
| 5 | Data tables | accessible `<table>` |
| 6 | Charts (stats) | SVG + text summary |
| 7 | Interpretation paragraph | body prose |

Empty / error state: validation message replaces blocks 1–7 until successful calculate.

---

## Long-page readability

| Technique | Policy |
|-----------|--------|
| TOC | ≥5 `h2` sections |
| Collapsible education sections | **Defer** — all expanded in HTML for SEO |
| Collapsible large tables | **Allow** UI-only expand (engine already computed); summary row always visible |
| Collapsible outlier lists | **Keep** (Phase 3.3 policy) |
| `scroll-margin-top` on headings | `5rem` for anchor jump under sticky header |

---

## Sticky behavior

| Element | Sticky? |
|---------|---------|
| Site header | No sticky header in Phase 4.4 (defer) |
| Trust strip | No |
| Calculator input column | **No** — avoids overlap and focus bugs |
| TOC | **No** |
| Calculate button | **No** sticky |

---

## Collapsible-section policy

| Section | Collapsible |
|---------|-------------|
| Educational prose | **Never** collapsed by default |
| Observation / classification tables n&gt;100 | Expand/collapse UI |
| Outlier lists n&gt;20 | Expand/collapse UI |
| Amortization schedules (future finance) | Paginate / expand |

---

## Ad-safe future zones (no placeholders now)

Reserve semantic regions without ad markup:

| Zone id | Location | Future use |
|---------|----------|------------|
| `calc-below-result` | Below primary answer | None planned — keep clean |
| `edu-mid-content` | Between edu sections | **No ads** — editorial policy |
| `page-footer` | Above site footer | None |

**Do not** add empty ad divs or reserved heights in Phase 4.x.

---

## Migration rules — MAD

| Item | Action |
|------|--------|
| URL | **Preserve** `/calculators/statistics/mean-absolute-deviation/` |
| Mathematics | **No changes** |
| Add trust strip | Above `CalculatorShell` |
| Link related Outlier/IQR | `href` when published |
| TOC | Add if section count ≥5 (likely yes) |
| `lastReviewedAt` | From catalog |
| JSON-LD | Keep BreadcrumbList + SoftwareApplication |

---

## Migration rules — Outlier/IQR

| Item | Action |
|------|--------|
| URL | **Preserve** `/calculators/statistics/outlier-iqr/` |
| Mathematics | **No changes** |
| Box plot a11y | **Preserve** Phase 3.3 implementation |
| Trust strip | Add |
| Related MAD | Linked card |
| Stale-result policy | **Preserve** |
| JSON-LD | Unchanged scope |

---

## Structured data

- `BreadcrumbList` + `SoftwareApplication` only  
- No FAQ / HowTo / Review  
- Educational content in visible HTML, not JSON-LD duplicate

---

## Related documents

- Tokens: `Phase4_0ScientificLuminanceV2Strategy.md`  
- Catalog related IDs: `Phase4_0CalculatorCatalogArchitecture.md`  
- a11y tables/charts: `Phase4_0AccessibilityAndPerformance.md`
