# Phase 3.4 — Manual Validation

**Status:** COMPLETE WITH MANUAL VALIDATION REQUIRED  
**Date:** 2026-09-02

## Automated checks completed

- Typecheck, lint, 213 Vitest tests, Webpack static export
- Publication test suite (`outlier-iqr-publication.test.tsx`)
- Sitemap count (12 URLs) and `robots.txt` reference
- Static HTML export for Outlier/IQR and MAD
- Playwright screenshots at 320 / 390 / 768 / 1280px (`Docs/screenshots/phase-3-4/`)

## Responsive audit (automated + screenshot review)

| Width | Finding |
|-------|---------|
| 320px | Calculator stacks; box plot wrapper scrolls; no full-page horizontal overflow observed in screenshots |
| 390px | Touch targets `min-h-11`; validation error visible in screenshot 06 |
| 768px | Tablet calculated layout captured (screenshot 03) |
| 1024px+ | Two-column input/result at `lg:` breakpoint (screenshot 02) |
| 1280px | Desktop initial, calculated, and box-plot sections captured |

## Accessibility (automated / static)

| Check | Status |
|-------|--------|
| One H1 per page | Pass (`PageHeader`) |
| Heading hierarchy H1 → H2 → H3 | Pass |
| Calculator before educational content | Pass |
| Box plot textual summary + sr-only table | Pass (Phase 3.3) |
| `role="alert"` on validation | Pass (Phase 3.3 tests) |
| `aria-live` copy confirmation | Pass (shared `CopyResultButton`) |
| Visible focus styles on controls | Pass (design system) |

## Owner manual checks remaining

- [ ] VoiceOver or NVDA full page walkthrough on Outlier/IQR route
- [ ] Physical device spot-check at 320px and 390px
- [ ] Production Lighthouse (Performance, Accessibility, SEO) after Hostinger deploy
- [ ] Search Console URL inspection after deploy
- [ ] Visual review of screenshot set in `Docs/screenshots/phase-3-4/`

## Screenshot index

| File | Viewport / state |
|------|------------------|
| `01-desktop-initial-1280.png` | Desktop empty |
| `02-desktop-calculated-1280.png` | Desktop F02 calculated |
| `03-tablet-calculated-768.png` | Tablet F02 calculated |
| `04-mobile-initial-390.png` | Mobile empty |
| `05-mobile-calculated-390.png` | Mobile F02 calculated |
| `06-mobile-validation-error-390.png` | Mobile invalid input |
| `07-narrow-mobile-calculated-320.png` | Narrow mobile F02 |
| `08-desktop-boxplot-table-1280.png` | Desktop box plot region |

Dataset for calculated shots: `1, 2, 3, 4, 5, 6, 7, 8, 9, 100` (F02).
