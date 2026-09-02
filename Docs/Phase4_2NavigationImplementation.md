# Phase 4.2 — Navigation Implementation

**Date:** 2026-09-02  
**Status:** Complete (reconciliation verified)

## Scope

Professional site header and mobile navigation per `Phase4_0NavigationV2.md`. No footer changes in this phase.

## Files

| File | Role |
|------|------|
| `components/layout/Header.tsx` | Client header — primary nav, search toggle, mobile menu trigger |
| `components/layout/MobileNavDrawer.tsx` | Client drawer — focus trap, Escape, scroll lock |
| `lib/routes.ts` | Statistics removed from `primaryNavRoutes` |
| `app/layout.tsx` | Passes `buildSearchIndex()` to `Header` |

## Desktop primary navigation

| Item | Target | Notes |
|------|--------|-------|
| CalcLume brand | `/` | Tagline hidden below `sm` |
| Calculators | `/calculators/` | `aria-current="page"` when under `/calculators` |
| Methodology | `/methodology/` | Active on exact path |
| About | `/about/` | Active on exact path |
| Search | Overlay / hero focus | Separate button — **not** a fourth nav destination |

**Removed:** Statistics from primary nav (remains in footer only).

**Deferred:** Browse/Categories link — hidden until ≥2 categories each have ≥1 published calculator (`getBrowseNavigationLink()` returns `null` at current scale).

## Search control behavior

| Page | Desktop Search click |
|------|---------------------|
| Homepage | Focuses `#home-search-input` (no overlay) |
| Other pages | Opens header search panel with `CalculatorSearch` |

Mobile always opens the header search panel. No dead `#` anchors. Listeners cleaned up on unmount/close.

## Mobile navigation decision

**Approved contract:** Menu button + drawer at mobile (not horizontal wrapping links).

| Requirement | Implementation |
|-------------|----------------|
| Menu trigger | `aria-expanded`, `aria-controls="mobile-nav-drawer"`, label "Menu" |
| Drawer | `role="dialog"`, `aria-label="Site navigation"` |
| Escape closes | ✓ — focus returns to menu trigger |
| Link selection closes | ✓ — `onClose` on each link click |
| 44×44 targets | `min-h-11 min-w-11` on icon buttons |
| Focus trap | Tab cycles within drawer |
| Body scroll lock | Restored on close |
| Search outside drawer | Header Search button always visible |

At **320px** and **390px**, primary links live in the drawer only; no horizontal nav row overflow.

## Accessibility

- Skip link unchanged in `app/layout.tsx`
- Semantic `<nav aria-label="Primary">` on desktop
- Current page: `aria-current="page"` **and** bottom border + semibold (not color-only)
- `<noscript>` fallback lists nav links + directory link when JavaScript is disabled

## Tests

- `__tests__/navigation.test.tsx` — primary links, Statistics absent, search
- `__tests__/phase-4-2-reconciliation.test.tsx` — aria-current, drawer Escape/focus return

## Screenshot evidence

`Docs/screenshots/phase-4-2/10-mobile-navigation-open-390.png`
