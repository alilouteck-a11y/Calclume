# Phase 4.4 — Calculator Page V2 Architecture

**Date:** 2026-09-03
**Status:** Implemented
**Contract:** `Docs/Phase4_0CalculatorPageV2.md`

## Composition

Calculator detail pages are **not** one generic component with dozens of flags. Each `page.tsx` composes:

| Region | Component | Render |
|--------|-----------|--------|
| Breadcrumbs + intro | `CalculatorPageShell` + `CalculatorPageIntro` | Server |
| Trust | `CalculatorTrustStrip` | Server |
| Workspace | Existing calculator client island in `CalculatorShell` | Client island |
| Education TOC | `CalculatorEducationNav` (≥5 H2s) | Server |
| Education | Existing `*EducationalContent` | Server |
| Sources | `CalculatorSourcesSection` + `SourceList` | Server |
| Related | `CalculatorRelatedSection` | Server |
| Last reviewed | `CalculatorLastReviewed` | Server |

Metadata, canonical URLs, and JSON-LD stay in the page files / existing factories. There is no parallel calculator registry.

## Related calculators

`resolveRelatedCalculators(record).slice(0, 4)` from the unified catalog, then **filter to published navigable tools only** (`isPublished` + `getCalculatorHref`).

- Published with a public route → `RelatedCalculatorCard` heading is a `Link`
- Launch/expansion/deferred candidates → **omitted** from the public related section
- Missing IDs omitted (fail-closed)
- Grid uses `max-w-xl` so a single related card does not stretch full content width

## Trust strip

Authoritative trust messaging lives only in `CalculatorTrustStrip` (semantic `<ul>` plus calculator-specific method note). Shared items: local calculation, formula and steps, sources (`#sources`), methodology (`/methodology/`). The intro does **not** repeat micro-facts such as “calculations run locally”.

## Layout landmark

Root layout uses `<main id="main-content">` so skip-to-content and the `main` landmark are the same node. Header remains the single `banner` named “Site”.

## Result hierarchy (display only)

Numeric builders (`buildMadResultSummary`, `buildOutlierIqrResultSummary`) are unchanged. Presentation uses `--text-result-primary` and prefixes (`MAD =`, `IQR =`, `N outlier(s) found`).

Outlier/IQR five-number summary and fence/whisker values use a compact semantic `dl` grid (no per-value cards) so mobile results stay dense without hiding data.