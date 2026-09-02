# Phase 3.4 — Publication Validation Report

**Date:** 2026-09-02  
**Vitest exit code:** 0

## Verification commands

| Command | Result |
|---------|--------|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm test -- --run` | **213** tests passed |
| `npm run build` | Webpack build succeeded |

## Publication contract

| Check | Status |
|-------|--------|
| Registry lists MAD + Outlier/IQR | Pass |
| Sitemap exactly 12 URLs | Pass |
| Outlier/IQR once in sitemap | Pass |
| No five-number-summary route | Pass |
| `/calculators/` shows 2 Available + links | Pass |
| `/calculators/statistics/` shows 2 linked calculators | Pass |
| Homepage preview: “2 calculators are available” | Pass |
| No separate five-number card | Pass |
| Static HTML at `out/calculators/statistics/outlier-iqr/index.html` | Pass |
| MAD HTML unchanged | Pass |
| `robots.txt` → production sitemap | Pass |
| No localhost in exported HTML | Pass |

## Test inventory

| File | Tests | Focus |
|------|-------|-------|
| `__tests__/outlier-iqr-publication.test.tsx` | 11 | Registry, sitemap, directory/homepage render, metadata, schema, F02 example, static export |
| `__tests__/outlier-iqr-page.test.tsx` | 8 | Metadata, headings, F02 values, sources, schema policy |

## MAD regression

52 MAD UI tests + 9 page tests pass in full suite.

## Static pages

**18** prerendered routes (including `outlier-iqr`, `robots.txt`, `sitemap.xml`).

## Screenshots

8 captures in `Docs/screenshots/phase-3-4/` using F02 dataset.

## Deferred

- VoiceOver / NVDA walkthrough
- Production Lighthouse after deploy
- Owner review of SERP snippets
