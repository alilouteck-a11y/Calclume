# Phase 4.0 — Accessibility and Performance Budgets

**Status:** Budgets for Phase 4.1–4.5 — **not current measured scores**  
**Date:** 2026-09-02

## Accessibility standard

**Target:** WCAG 2.2 Level AA on all public pages and calculator interactions.

| Criterion | Budget |
|-----------|--------|
| Perceivable | Text contrast ≥4.5:1 (normal), ≥3:1 (large text ≥18px / 14px bold) |
| Operable | Full keyboard access; no keyboard trap except focus-managed overlays |
| Understandable | Consistent nav; errors identify field and correction |
| Robust | Semantic HTML; ARIA only where native insufficient |

**Phase 4.1:** Automated axe-core on homepage, directory, MAD, Outlier/IQR — zero critical violations.

---

## Viewport and zoom

| Target | Budget |
|--------|--------|
| Minimum width | **320px** without horizontal `document` overflow |
| Zoom | Usable at **200%** zoom without loss of content or functionality |
| Orientation | Portrait and landscape on mobile |

---

## Keyboard-only navigation

- Skip link to `#main` — first focusable  
- All nav, search, calculator controls, expandable tables reachable  
- Visible `:focus-visible` on all interactive elements  
- Calculator: Calculate, Reset, Copy, precision selector, method toggles — tab order follows visual order  
- No `tabindex` &gt; 0

---

## Touch targets

Minimum **44×44 CSS pixels** (`--touch-target: 2.75rem`) for:

- Nav links and icon buttons  
- Mobile drawer items  
- Search results rows  
- Calculator buttons and selects  
- Expand/collapse toggles on tables/lists

---

## Reduced motion

Honor `prefers-reduced-motion: reduce`:

- Disable drawer/search transitions  
- No smooth scroll  
- No animated chart emphasis

---

## Search announcements

- `aria-live="polite"` for result counts (debounced 200ms)  
- Combobox pattern with `aria-activedescendant` during arrow navigation  
- See `Phase4_0SearchAndDiscovery.md`

---

## Mobile menu focus management

- Focus trap in drawer while open  
- Escape closes; focus returns to trigger  
- Body scroll lock on mobile drawer only  
- `aria-expanded` on menu button

---

## Accessible tables and charts

| Component | Requirement |
|-----------|-------------|
| Data tables | `<table>`, `<th scope>`, captions where helpful |
| Large tables | `aria-label` on scroll container |
| Box plot SVG | `role="img"`, `aria-label`, `<desc>`, sr-only data table |
| Validation errors | `role="alert"` or `aria-live="assertive"` on calculate failure |

---

## Lighthouse targets (budgets)

Measured on **production build** (`next build --webpack`), throttled mobile simulation, representative pages:

| Metric | Budget |
|--------|--------|
| Performance score | ≥ **90** |
| Accessibility score | **100** |
| Best Practices | ≥ **95** |
| SEO | **100** |

Pages to test: `/`, `/calculators/`, MAD, Outlier/IQR.

---

## Core Web Vitals (budgets)

| Metric | Budget | Notes |
|--------|--------|-------|
| **LCP** | ≤ **2.5s** | Hero text or search input as LCP element — no large images |
| **CLS** | ≤ **0.1** | Reserve space for results; no font swap layout shift |
| **INP** | ≤ **200ms** | Calculate action on mid-tier mobile |

---

## JavaScript budget

| Scope | Budget |
|-------|--------|
| Initial route JS (gzipped, per page) | ≤ **120 KB** above Next.js shared baseline |
| Search index @ 100 tools | ≤ **+45 KB** gzipped inline JSON |
| Search index @ 500 tools | ≤ **+200 KB** — monitor; split if exceeded |
| No chart library | 0 KB |
| No fuzzy search library | 0 KB |

Measure with `@next/bundle-analyzer` in Phase 4.5.

---

## Font budget

| Font | Budget |
|------|--------|
| Source Sans 3 | Subset latin, `display: swap`, ≤ **2 weights** (400, 600) |
| JetBrains Mono | Subset latin, ≤ **1 weight** (400) |
| Total font transfer (first visit) | ≤ **80 KB** gzipped |

---

## Image budget

| Type | Budget |
|------|--------|
| OG image (when added) | 1200×630, ≤ **150 KB** WebP/PNG |
| Icons | SVG inline or favicon only |
| Calculator pages | **No decorative images** in Phase 4.x |
| Total images per page | ≤ **50 KB** except OG meta |

---

## Dependency constraints

| Prohibited in Phase 4.x | Reason |
|-------------------------|--------|
| Chart.js, Recharts, D3 | Bundle + a11y complexity |
| Fuse.js, Algolia | Policy |
| shadcn default theme | Brand |
| Heavy animation libraries | Motion budget |
| CMS client SDKs | Architecture |

Inline SVG for box plot remains.

---

## Static export and Hostinger compatibility

- All features must work from `out/` static files  
- No middleware, no server actions, no ISR  
- Webpack production build (`next build --webpack`) — verify each phase  
- Client search: static JSON bundled at build time  
- No environment-specific runtime APIs

---

## Regression checklist (Phase 4.5)

- [ ] axe on 4 key routes  
- [ ] 320px overflow check  
- [ ] 200% zoom manual pass  
- [ ] Keyboard-only MAD + Outlier flows  
- [ ] Lighthouse mobile on home + calculator  
- [ ] Bundle size within JS budget  
- [ ] `prefers-reduced-motion` screen recording  
- [ ] Search aria-live announcement  

---

## Related documents

- Search a11y: `Phase4_0SearchAndDiscovery.md`  
- Calculator charts: `Phase4_0CalculatorPageV2.md`  
- Tokens: `Phase4_0ScientificLuminanceV2Strategy.md`
