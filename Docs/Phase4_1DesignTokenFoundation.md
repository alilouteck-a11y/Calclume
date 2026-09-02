# Phase 4.1 — Design Token Foundation

**Status:** Implemented  
**Date:** 2026-09-02  
**Contract:** `Docs/Phase4_0ScientificLuminanceV2Strategy.md`

## What changed

`app/globals.css` now defines Scientific Luminance **V2 semantic tokens** while preserving legacy brand property names used by current components.

### Added

- Surfaces: `--color-surface-subtle` (`#F0F3F2`), `--color-border-strong`
- Status: `--color-error-bg`, `--color-warning`, `--color-warning-bg`
- Category accents: `--category-accent-*` for all ten categories + `--category-accent` default (statistics)
- Spacing: `--space-1` … `--space-8`
- Containers: `--container-prose`, `--container-content`, `--container-narrow`
- Typography roles: `--text-display`, `--text-h1`…`--text-small`, `--text-result-*`, `--letter-spacing-display`
- Elevation: `--shadow-none` (plus existing sm/md)

### Preserved (compatibility aliases)

- `--color-ink`, `--color-paper`, `--color-lume-teal`, `--color-muted`, `--color-white`, etc.
- `--color-text` → ink; `--color-accent` → lume teal; `--color-focus-ring` → lume teal
- Tailwind `@theme inline` mappings for existing utility colors

### Explicitly not done in Phase 4.1

- No component redesign or global recolor of calculator pages
- No `.formula-block` background adoption (deferred to Page V2)
- No gradients, glassmorphism, dark mode, or remote fonts
- Exact WCAG contrast measurement deferred to Phase 4.5 budgets (values are intended AA)

## Verification

`__tests__/design-tokens-v2.test.ts` asserts required properties exist, legacy tokens remain, and no gradient declarations were introduced.
