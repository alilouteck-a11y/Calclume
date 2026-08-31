# Phase 3.1 — Accessible Box Plot Contract

**Status:** Locked for Phase 3.2  
**Technology choice:** **Inline SVG** with semantic HTML fallback summary  
**Last reviewed:** 2026-09-01

## Rationale

- SVG scales cleanly at 320px+ without canvas accessibility gaps.
- Geometry maps directly from `OutlierIqrBoxPlotData`.
- Patterns/strokes distinguish median vs box vs whiskers without color alone.
- Screen-reader text and data table duplicate visual information.

---

## Non-negotiable requirements

- Does not rely on color alone (use stroke dash, marker shape, labels).
- Semantic surrounding content (heading + prose summary).
- Accessible name and description (`<svg role="img" aria-labelledby="..." aria-describedby="...">`).
- Communicates: min non-outlier (lower whisker), Q1, median, Q3, max non-outlier (upper whisker), fence positions, outlier count.
- Outlier markers visually distinct (e.g. open circle vs filled box).
- Median visually distinct (e.g. thicker stroke or dashed line inside box).
- Works: all values equal, negative values, zero-width IQR (degenerate box).
- Avoid clipped axis labels (padding in viewBox).
- Responsive ~320px minimum width (horizontal scroll allowed as last resort with `overflow-x: auto` on wrapper).
- No pointer hover required for understanding.
- No canvas-only output.
- `prefers-reduced-motion`: no entrance animations; static render only.

---

## Scale domain

```text
dataMin = minimum observed value (including outliers)
dataMax = maximum observed value (including outliers)
span = dataMax - dataMin

if span === 0:
  domainMin = dataMin - 1
  domainMax = dataMax + 1
else:
  padding = span × 0.08   // 8% each side, minimum absolute pad for tiny spans
  domainMin = dataMin - padding
  domainMax = dataMax + padding
```

Map value `v` to horizontal pixel `x`:

```text
x = plotLeft + ((v - domainMin) / (domainMax - domainMin)) × plotWidth
```

Clamp out-of-domain drawing only for labels, not for data integrity.

---

## Layout (horizontal box plot)

```
[padding-left | whisker line | box (Q1–Q3) with median | whisker line | outlier markers] [padding-right]
```

Vertical structure:

- Single horizontal axis baseline (optional tick marks).
- Box height ~40% of inner plot height, vertically centered.
- Whisker lines from lowerWhisker→Q1 and Q3→upperWhisker.
- Outlier markers beyond whiskers at exact value positions.
- Fence lines: lighter dashed vertical lines at lowerFence/upperFence (labeled in legend/text, not only visually).

---

## Tick strategy

- **≤10 distinct tick candidates:** aim for ~5–7 ticks at “nice” steps (implementer utility; not exposed to user).
- **Large range:** prefer powers-of-10 friendly steps.
- **Degenerate domain:** show at least 3 tick labels (domainMin, midpoint, domainMax).
- Tick labels use display precision setting.

---

## Degenerate cases

| Case | Rendering |
|------|-------------|
| All values equal | Box collapses to line at value; whiskers at same point; zero outliers; text says “All values equal at [v]” |
| IQR = 0 | Zero-width box at Q1=Q3; whiskers may still span if non-outlier range exists |
| All points outliers | Box/whiskers at fence-consistent degenerate positions; all markers as outliers |
| Single outlier one side | Whiskers on opposite side still render |

---

## Screen-reader fallback

### Required visible text summary (above or below SVG)

Template:

> Box plot summary: lower whisker [lw], Q1 [q1], median [m], Q3 [q3], upper whisker [uw]. Lower fence at [lf], upper fence at [uf]. [n] outlier(s) flagged.

### `aria-describedby` long description

Include fence multiplier and quartile method name.

### Hidden data table (optional but recommended)

`<table>` with columns: Element, Value — rows for whiskers, quartiles, fences, outlier count. `class="sr-only"` or visible “Data table view” toggle.

---

## Testable accessibility requirements (Phase 3.2)

1. SVG has `role="img"` and non-empty `aria-labelledby`.
2. Summary paragraph repeats all five-number + fence values numerically.
3. Median distinguishable in SVG markup (`data-testid="boxplot-median"` or class hook).
4. Outlier markers have `aria-hidden="false"` count announced in summary when >0.
5. Reduced-motion: no CSS animation on load.
6. 320px viewport: no required horizontal label overlap (wrap or rotate labels ≤45° if needed).
7. Color contrast ≥ WCAG AA for strokes/text on background.

---

## Marker conventions

| Element | Visual |
|---------|--------|
| Box (Q1–Q3) | Filled rectangle, solid border |
| Median | Vertical line inside box, thicker stroke |
| Whiskers | Solid horizontal lines |
| Fences | Dashed vertical lines (optional legend) |
| Outliers | Open circles at value position |

Do not use red/green good/bad semantics.

---

## Implementation note

Phase 3.1 defines contract only. Component path (preview):

`components/calculators/outlier-iqr/OutlierIqrBoxPlot.tsx`

Not created until Phase 3.2.
