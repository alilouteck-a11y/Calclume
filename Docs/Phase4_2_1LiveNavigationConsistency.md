# Phase 4.2.1 — Live Navigation Consistency

**Date:** 2026-09-02  
**Status:** Complete — awaiting approval to commit  
**Production reference:** `5d6f72c` on https://calclume.com/

## Goal

Ensure every public page consumes one shared Phase 4.2 site header, and verify `/calculators/` has no reproducible hydration/runtime failure.

## Pre-implementation audit — root cause

### What was inspected

- `app/layout.tsx` (sole layout)
- Calculator pages: MAD, Outlier/IQR, statistics collection, directory
- `components/layout/Header.tsx`, `MobileNavDrawer.tsx`, `PageHeader.tsx`
- `lib/routes.ts` (`Statistics.inPrimaryNav === false`)
- Local `out/` static export and live production HTML

### Finding

**MAD does not import a legacy header and does not contain page-local primary navigation.**

Both MAD and Outlier/IQR are Server Components that render only page content (`PageHeader` breadcrumbs + calculator UI). The site chrome comes exclusively from the root layout:

```tsx
<Header searchIndex={searchIndex} />
```

There is no nested calculator layout and no second header implementation.

### Why the live audit could report “Statistics” on MAD

Live production HTML (fetched 2026-09-02) already shows identical Phase 4.2 primary navigation on MAD and Outlier/IQR:

| Surface | Labels |
|---------|--------|
| Primary `<nav aria-label="Primary">` | Calculators · Methodology · About |
| Search control | Present (separate from primary nav) |
| Breadcrumb `<nav aria-label="Breadcrumb">` | Home / Calculators / **Statistics** / … |

**Confirmed root cause of the reported inconsistency:**

1. **Likely observation confusion:** Breadcrumb link **Statistics** sits directly under the site header on calculator pages and can be mistaken for a primary-nav item. Outlier/IQR has the same breadcrumb; both pages already shared Phase 4.2 primary nav in production HTML.
2. **Possible transient CDN/cache during deploy:** If a partial Hostinger upload briefly served pre–Phase 4.2 MAD HTML, that would explain a temporary MAD-only legacy shell. Current live MAD HTML matches Phase 4.2 (no Statistics in `<header>` / Primary nav).

**Ruled out:** MAD-specific legacy Header import, page-local nav markup, layout override, duplicated header components in source, divergent static-export shells in current `out/`.

## Implementation change

No second header and no MAD navigation rewrite were required.

Narrow hardening only:

| Change | Purpose |
|--------|---------|
| `Header` → `aria-label="Site"` on the site `<header>` | Distinguishes the single site banner from calculator article `<header>` elements; improves landmark clarity |
| Regression tests (shell + static export) | Lock Phase 4.2 primary nav parity across homepage, directory, MAD, Outlier, methodology, about |
| `scripts/verify-phase-4-2-1-directory.mjs` | Reproduce directory load/search under static export |

Calculator mathematics, routes, metadata, and sitemap were not modified.

## Navigation contract (enforced)

**Desktop primary:** Calculators · Methodology · About · Search (Search is a separate control)

**Excluded from primary nav:** Statistics (footer, breadcrumbs, directory/category links only)

**Mobile drawer:** Calculators · Methodology · About · Contact — Escape, focus return, scroll lock preserved via existing `MobileNavDrawer`

## Directory reliability

See `Docs/Phase4_2_1ProductionValidationReport.md`.

**Classification:** `Automation/browser-session anomaly — not reproduced in production export`

## Files created / modified

| Path | Action |
|------|--------|
| `Docs/Phase4_2_1LiveNavigationConsistency.md` | Created |
| `Docs/Phase4_2_1ProductionValidationReport.md` | Created |
| `__tests__/phase-4-2-1-navigation-consistency.test.tsx` | Created |
| `__tests__/phase-4-2-1-static-export-nav.test.ts` | Created |
| `scripts/verify-phase-4-2-1-directory.mjs` | Created |
| `components/layout/Header.tsx` | `aria-label="Site"` |
| `Docs/DecisionLog.md` | Durable decision entry |
