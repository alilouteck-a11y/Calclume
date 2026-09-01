# Phase 3.3 — Accessible Box Plot Implementation

**Status:** Complete (component only — no published route)  
**Technology:** Inline SVG + visible prose summary + `sr-only` data table  
**Last reviewed:** 2026-09-02

## Component

`components/calculators/outlier-iqr/AccessibleBoxPlot.tsx`

## Data flow

- **Domain:** `result.boxPlot.domainMin` / `domainMax` from the engine (8% padding; ±1 pad when span = 0).
- **Mapping:** `valueToX()` in the component maps numeric values to SVG coordinates only at render time.
- **Integrity:** Visual clamping is not applied to mathematical values; fence/whisker/outlier numbers in text and table match the engine.

## Zero-span domain

When `domainMax === domainMin`, `valueToX()` returns the horizontal center of the plot. Tick builder returns `[domainMin, midpoint, domainMax]`. All SVG coordinates remain finite (verified in tests).

## Visual encoding (not color alone)

| Element | Encoding |
|---------|----------|
| Box (Q1–Q3) | Filled rect + stroke |
| Median | Thicker vertical line (`data-testid="boxplot-median"`) |
| Whiskers | Solid horizontal + vertical caps |
| Fences | Dashed vertical lines (`stroke-dasharray="4 3"`) |
| Outliers | Open circles (`fill="white"`, stroked) with `aria-label` per observation |

Duplicate outlier values share the same horizontal position but have unique `aria-label` values (`Outlier #index: value`) and React keys (`index-value`).

## Accessibility

- `<svg role="img" aria-labelledby="…" aria-describedby="…">` with `<title>` and `<desc>` duplicating the summary.
- Visible `<p>` summary above the SVG (`buildBoxPlotSummaryText`) — understandable without SVG or color.
- `sr-only` table lists lower whisker, Q1, median, Q3, upper whisker, lower fence, upper fence, outlier count.
- Tick labels use the selected display precision (no excessive floating precision in SVG text).
- No hover-only information; static render only.
- Decorative axis/tick elements are unlabeled SVG primitives (not individually announced).

## Responsive SVG

- `viewBox="0 0 640 140"`
- Wrapper: `overflow-x-auto`
- SVG: `min-w-[320px] w-full max-w-full`
- Label positioning uses `textAnchor="middle"` on ticks; plot padding (`PLOT_LEFT = 48`, `PLOT_RIGHT = 16`) keeps edge labels readable.

## Degenerate cases handled

| Case | Behavior |
|------|----------|
| All values equal | Extra prose: “All values equal at [v].”; finite coordinates |
| IQR = 0 | Zero-width box (`Math.max(abs(q3-q1), 1)` minimum box width) |
| Negative / decimal values | Standard mapping; finite coordinates |
| Outliers beyond whiskers | Plotted at value position within engine domain |

## Tests

`__tests__/outlier-iqr-box-plot.test.tsx` (7 tests): accessible name, summary + fallback table, engine domain, finite coordinates, all-equal, negative/decimal precision, duplicate outlier identities, median/fence distinction, tick precision.

**Deferred to Phase 3.4:** real-browser screen-reader walkthrough and 320px visual inspection.
