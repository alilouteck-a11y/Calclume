# Phase 3.3 — Interaction Validation Report

**Status:** Reconciled  
**Date:** 2026-09-02  
**Vitest exit code:** 0

## Verification commands

| Command | Result |
|---------|--------|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm test -- --run` | **194** tests passed (exit 0) |
| `npm run build` | Webpack build succeeded; **17** static pages |

## Phase 3.3 test inventory (by behavior)

### Initial state (`outlier-iqr-ui.test.tsx`)

| Behavior | Covered |
|----------|---------|
| Empty dataset | Yes |
| Default `exclusive-halves` | Yes |
| Default 1.5× multiplier | Yes |
| Default 4 decimals | Yes |
| No result details or SVG | Yes |
| Copy unavailable | Yes |
| Reset disabled | Yes |

### Calculation workflow (`outlier-iqr-ui`, `outlier-iqr-interactions`)

| Behavior | Covered |
|----------|---------|
| Example fills input without calculating | Yes |
| Default calculation | Yes |
| `excel-r7` | Yes |
| 3.0× multiplier | Yes |
| Precision 2 and 6 (reformat without stale) | Yes |
| Precision 4 default | Yes (initial state) |
| Precision change does not mark stale | Yes |
| Input/method/multiplier changes mark stale | Yes |
| Stale copy unavailable | Yes |
| Recalculation clears stale | Yes |
| Failed calculation clears previous result | Yes |
| Reset restores exact initial state | Yes |

### Validation and focus (`outlier-iqr-ui`, `outlier-iqr-interactions`)

| Behavior | Covered |
|----------|---------|
| Empty input | Yes |
| Invalid token | Yes |
| Fewer than 4 observations | Yes |
| More than 1,000 observations | Yes |
| `aria-invalid` | Yes |
| `aria-describedby` | Yes |
| `role="alert"` | Yes |
| Dataset textarea focus after failed Calculate | Yes |
| Input preserved on failure | Yes |

### Result correctness (`outlier-iqr-interactions`)

| Behavior | Covered |
|----------|---------|
| IQR | Yes |
| Q1, median, Q3 (excel-r7 fixture) | Yes |
| Fences | Yes |
| Whiskers | Yes |
| Five-number summary | Yes |
| Lower and upper outlier lists | Yes |
| No-outlier message (`None`) | Yes |
| Duplicate outliers | Yes |
| Negative/decimal dataset | Yes |
| All-equal dataset | Yes |
| IQR = 0 | Yes |
| Fences never presented as whiskers | Yes |

### Large datasets (`outlier-iqr-interactions`)

| Behavior | Covered |
|----------|---------|
| 100 observations show all | Yes |
| 101 initially show 100 | Yes |
| Expand to all 101 | Yes |
| Collapse to first 100 | Yes |
| New calculation collapses table | Yes |
| Reset collapses table | Yes |

### Large outlier lists (`outlier-iqr-outlier-list.test.tsx`)

| Behavior | Covered |
|----------|---------|
| More than 20 initially show 20 | Yes (synthetic 25-entry list) |
| Expand/collapse | Yes |
| Duplicate occurrences visible when expanded | Yes |

*Note:* Tukey fences rarely classify >2 identical extreme values as simultaneous outliers when many copies share one value (quartiles shift). List expansion is therefore tested at the `OutlierLists` component level with synthetic engine-shaped entries; integration tests cover real duplicate outlier display for mathematically valid datasets.

### Accessible box plot (`outlier-iqr-box-plot.test.tsx`)

| Behavior | Covered |
|----------|---------|
| Accessible figure name | Yes |
| Visible textual summary | Yes |
| Screen-reader description / fallback table | Yes |
| Whiskers, quartiles, fences, outlier count | Yes |
| Finite SVG coordinates | Yes |
| All-equal / zero-span | Yes |
| Negative and decimal values | Yes |
| Duplicate outlier stable identities | Yes (`aria-label` + key) |
| Not color alone | Yes |
| No hover-only information | Yes (static component) |
| Tick label precision | Yes |

### Clipboard (`outlier-iqr-ui`, `outlier-iqr-interactions`)

| Behavior | Covered |
|----------|---------|
| Unavailable before calculation | Yes |
| Dataset count, method, multiplier | Yes |
| Summary, fences, whiskers, outliers | Yes |
| Selected precision applied | Yes |
| Success confirmation announced | Yes (`role="status"`) |
| Clipboard rejection handled | Yes |
| Stale result cannot be copied | Yes |

## Tests added during reconciliation

1. `__tests__/outlier-iqr-outlier-list.test.tsx` — expand/collapse and duplicate visibility (2 tests).
2. Input preserved on >1,000 rejection.
3. Fence vs whisker value distinction assertion.
4. `AccessibleBoxPlot` outlier `aria-label` (component fix + test update).
5. `OutlierList` collapse button fix (button remained visible when expanded).

## React review

| Check | Status |
|-------|--------|
| No components inside components | Pass |
| No effect-based derived-state sync | Pass |
| Calculate only in handler | Pass |
| Static option arrays at module scope | Pass (`outlier-iqr-config.ts`) |
| Stable keys for duplicates | Pass (`index-value`) |
| No unnecessary memoization | Pass (`useMemo` for summary/rows only) |
| Clipboard unmount guard | Not added — matches existing `CopyResultButton` shared primitive |
| Direct imports | Pass |
| No hydration-dependent initial state | Pass |
| `cleanup()` in all render suites | Pass |

## Reconciliation fixes

- **`OutlierList.tsx`:** Show expand/collapse toggle whenever `outliers.length > 20`, including when expanded (previously button disappeared).
- **`AccessibleBoxPlot.tsx`:** `aria-label` on outlier circles; stable tick keys.

## Publication guardrails (confirmed)

| Item | Status |
|------|--------|
| No `/calculators/statistics/outlier-iqr/` route | Confirmed |
| No `outlier-iqr` in sitemap | Confirmed |
| `publishedCalculatorRoutes` unchanged (MAD only) | Confirmed |
| Static page count 17 | Unchanged |
| `next build --webpack` (Hostinger) | Unchanged |
| MAD regression | All MAD tests pass in full suite |
| Phase 3.4 not started | Confirmed |

## Deferred

- Real-browser responsive visual inspection (320–1280px).
- Live screen-reader audit (VoiceOver/NVDA).
