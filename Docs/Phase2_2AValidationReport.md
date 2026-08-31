# Phase 2.2A Validation — Mean Absolute Deviation Functional Completion

**Date:** 2026-08-31  
**Status:** COMPLETE WITH MANUAL VALIDATION REQUIRED

## Automated validation results

| Check | Result |
|-------|--------|
| TypeScript strict (`npm run typecheck`) | Pass |
| ESLint (`npm run lint`) | Pass |
| Vitest (`npm test`) | **76/76 pass** (12 files) |
| Production build (`npm run build`) | Pass |
| Static export (`out/`) | Pass — 16 routes |

## Reference dataset verification

Input: `12, 15, 14, 10, 19` (after **Calculate MAD**)

| Field | Expected | Display (4 dp) |
|-------|----------|----------------|
| Mean Absolute Deviation | 2.4 | 2.4 |
| Mean | 14 | 14 |
| Count | 5 | 5 |
| Sum of absolute deviations | 12 | 12 |
| Minimum | 10 | 10 |
| Maximum | 19 | 19 |
| Range | 9 | 9 |

## Workflow validation

| Requirement | Verified by |
|-------------|-------------|
| Empty initial state | UI test |
| Calculate MAD button (no keystroke calc) | UI test |
| Example fills input only | UI test |
| Copy hidden before calculation | UI test |
| Full reset | UI test |
| Stale result cleared on invalid Calculate | UI test |
| aria-live polite on result | UI test |

## Parser validation

| Case | Result |
|------|--------|
| Semicolons | Pass |
| Mixed separators | Pass |
| Negative decimals / `.5` | Pass |
| Partial tokens (`12abc`) | Rejected with token name |
| NaN / ±Infinity | Rejected |
| Exactly 1,000 observations | Accepted |
| 1,001 observations | Rejected |

## Precision validation

| Setting | Behavior |
|---------|----------|
| 2 / 4 / 6 decimal places | Display-only; internal precision unchanged |
| Trailing zeros | Removed (`2.4000` → `2.4`) |
| Negative zero | Displays as `0` |

## Large-table validation

| Case | Result |
|------|--------|
| 100 rows | Full table, no expand button |
| 101 rows | Collapsed to 100; expand/collapse works |
| 1,000 rows | Collapsed; count correct in summary |
| Reset / new calc | Expansion reset |

## Responsive screenshots

Captured at documented paths:

1. `Docs/screenshots/phase-2-2a/01-desktop-initial-1280.png`
2. `Docs/screenshots/phase-2-2a/02-desktop-calculated-1280.png`
3. `Docs/screenshots/phase-2-2a/03-mobile-initial-390.png`
4. `Docs/screenshots/phase-2-2a/04-mobile-calculated-390.png`
5. `Docs/screenshots/phase-2-2a/05-mobile-validation-error-390.png`
6. `Docs/screenshots/phase-2-2a/06-large-table-collapsed-1280.png`

Regenerate: `npm run build && npm run screenshots:mad`

## Viewports requiring manual review

Screenshots cover 1280px and 390px. Manual review recommended at:

- 320px — overflow and tap targets
- 768px — tablet stacking
- 1024px — two-column breakpoint transition

States to confirm visually: initial empty, calculated, validation error, collapsed table (101+ rows), expanded table.

## Remaining manual checks

- Live browser keyboard navigation for table expand/collapse
- Focus indicator visibility on precision selector and Calculate MAD
- Formula readability at 320px
- Confirm MAD visible beside input without scroll at ≥1024px on a real monitor

## Confirmations

- No second calculator started
- No analytics, ads, backend, database, auth, CMS, or external APIs added
- Phase 2.2B not started
- Phase 3 not started
