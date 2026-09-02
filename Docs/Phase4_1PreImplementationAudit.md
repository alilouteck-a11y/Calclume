# Phase 4.1 — Pre-Implementation Audit

**Date:** 2026-09-02  
**Status:** Complete before catalog migration

## Existing sources of truth

| File | Role | Problem |
|------|------|---------|
| `lib/calculator-portfolio.ts` | Manual planning array (9 statistics tools) | Names/descriptions/status duplicated outside publication |
| `lib/published-calculators.ts` | Manual published route list (2 URLs) | Second hand-maintained publication list |
| Per-calculator configs | `lastReviewed`, page copy | Dates not in portfolio; not a registry |

Published tools appear as `launch-candidate` in the portfolio and as published only via the separate route list. Cards use `isCalculatorPublished(slug)` to decide Available vs In preparation.

## Duplication found

- Calculator **name** and **description** live only in portfolio today (pages use local titles for H1).
- **Publication** is a parallel array of routes — can diverge from portfolio slugs.
- No stable calculator **id**, **categoryId**, **aliases**, **relatedIds**, or **featured** flags.
- Five Number Summary was already removed from portfolio (Phase 3.4) — must not reappear.

## Consumer map

| Consumer | Imports |
|----------|---------|
| `app/sitemap.ts` | `publishedCalculatorRoutes` |
| `app/calculators/page.tsx` | `launchCandidates`, `statisticsCalculators`, `isCalculatorPublished` |
| `app/calculators/statistics/page.tsx` | `launchCandidates`, `expansionCandidates`, `isCalculatorPublished` |
| `components/home/StatisticsPreview.tsx` | `launchCandidates`, `isCalculatorPublished` |
| `components/calculator/CalculatorCard.tsx` | `getCalculatorHref` |
| MAD / Outlier pages | `launchCandidates`, `isCalculatorPublished` (related cards) |
| `__tests__/published-calculators.test.ts` | `publishedCalculatorRoutes` |
| `__tests__/no-calculator-routes.test.ts` | portfolio + published |
| `__tests__/production-readiness.test.ts` | portfolio + published |
| `__tests__/outlier-iqr-publication.test.tsx` | portfolio + published |

## Migration plan

1. Create `lib/calculator-catalog.ts` — categories + calculators (sole manual metadata).
2. Create `lib/calculator-catalog-publication.ts` — derived publication helpers.
3. Convert `lib/published-calculators.ts` to a re-export shim.
4. Convert `lib/calculator-portfolio.ts` to a derived compatibility layer (statistics-only PlannedCalculator view) so UI lists stay identical.
5. Add V2 tokens to `app/globals.css` without redesigning components.
6. Add catalog + token tests; keep existing publication/sitemap assertions green.

**Percentage Calculator:** Not added in Phase 4.1 — exploratory candidate only; adding it would change homepage/directory preparation card counts. Documented as deferred to post-SEO-validation.

## Rendered-output invariants (must remain unchanged)

- Sitemap URL set identical (2 calculator routes + existing public routes).
- Exactly two published calculators: MAD, Outlier/IQR.
- Homepage `StatisticsPreview` still lists the same five launch candidates (2 Available + 3 In preparation).
- `/calculators/` and `/calculators/statistics/` same available/preparation states.
- Related cards still list other launch candidates; preparation remain non-linked.
- No Five Number Summary card; no Math/Percentage route.
- Calculator mathematics, metadata, educational content unchanged.
- Visual appearance substantially unchanged (tokens additive; `surface-subtle` may refine inset value per V2 — no component redesign).
