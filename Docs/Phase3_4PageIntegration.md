# Phase 3.4 — Page Integration

**Status:** Complete (uncommitted)  
**Route:** `/calculators/statistics/outlier-iqr/`  
**Last reviewed:** 2026-09-02

## Integration approach

Mirrors the MAD calculator page architecture:

| Layer | Implementation |
|-------|----------------|
| Route | `app/calculators/statistics/outlier-iqr/page.tsx` (Server Component) |
| Calculator | `OutlierIqrCalculator` (client) |
| Education | `OutlierIqrEducationalContent` (server) |
| Config | `lib/calculators/outlier-iqr-config.ts` |
| JSON-LD | `lib/calculators/outlier-iqr-structured-data.ts` |
| Worked example | `lib/calculators/outlier-iqr-educational-example.ts` (F02) |
| Publication | `lib/published-calculators.ts` |

## Page order

1. Breadcrumbs (`PageHeader`)
2. H1 + introduction
3. Calculator shell
4. Educational content (13 H2 sections)
5. Sources and methodology (footer)
6. Related calculators (footer)
7. Last reviewed date

## Portfolio change

Removed `five-number-summary-box-plot` from `launchCandidates` — scope bundled into Outlier/IQR per Phase 3.0.

## Screenshots

Captured via `scripts/capture-outlier-iqr-screenshots.mjs` → `Docs/screenshots/phase-3-4/`.

## Build

`next build --webpack` (Hostinger). Static export to `out/`.
