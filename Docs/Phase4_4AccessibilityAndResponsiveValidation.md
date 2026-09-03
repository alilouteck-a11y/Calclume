# Phase 4.4 — Accessibility and Responsive Validation

**Date:** 2026-09-03
**Updated:** Final visual reconciliation (intro dedupe, published-only related, compact Outlier grids)

## Accessibility

| Check | Result |
|-------|--------|
| Skip link → `#main-content` | Pass (`main` landmark) |
| One `banner` (Site) | Pass |
| One `main` | Pass (root layout) |
| One H1 | Pass on both calculators |
| Heading outline | H1 then H2 regions; calculator H3/H4 nested |
| Form labels | Existing `DatasetInput` / selects unchanged |
| Errors | Existing `aria-invalid`, `aria-describedby`, `role="alert"`, focus on field |
| Result live region | `aria-live="polite"` unchanged |
| Stale notice | `role="status"`, non-error copy unchanged |
| Trust strip | One semantic list; intro micro-facts removed |
| Related links | Published names only; accessible link text |
| Nested interactives | None on related cards |
| Five-number / fences | Compact `dl` grids; all labels and values retained |
| Box plot | SVG `role="img"` + summary prose + `sr-only` table |
| Reduced motion | Existing global CSS |
| Mobile drawer | Unchanged Header |

## Responsive (Playwright screenshots)

Viewports exercised: **1280**, **1024**, **768**, **390**, **320**.

Reconciliation replacements:

| File | Focus |
|------|--------|
| `02-mad-desktop-result-1280.png` | Result + single trust strip |
| `03-mad-mobile-result-390.png` | Higher calculator after intro dedupe |
| `06-outlier-desktop-result-1280.png` | Compact secondary grids |
| `07-outlier-mobile-result-390.png` | Dense five-number / fences |
| `09-outlier-narrow-mobile-boxplot-320.png` | 320px box plot + compact data |
| `10-mad-related-education-transition-1280.png` | One published related card |
| `13-outlier-related-390.png` | One published related card on mobile |

Prior shots `01`, `04`, `05`, `08`, `11`, `12` remain from the earlier Phase 4.4 capture set (unaffected chrome).

## Remaining manual

- Visual approval of reconciliation screenshots
- Full keyboard-only pass on a physical device
- Copy confirmation with clipboard permission granted
- Hostinger deploy of `/calculators/math/` 404
