# Phase 4.3 — Category Registry Implementation

**Date:** 2026-09-02  
**Status:** Complete — awaiting approval to commit

## Source of truth

`lib/calculator-categories.ts` is the sole manually maintained category registry.

Calculator membership remains in `lib/calculator-catalog.ts` via `categoryId` — calculators are not duplicated inside the registry.

`lib/calculator-catalog.ts` re-exports `categories` as an alias of `calculatorCategories` for compatibility.

## Model fields

| Field | Purpose |
|-------|---------|
| `id` / `slug` | Stable kebab-case identity |
| `route` | `/calculators/[slug]/` |
| `name` / `shortName` / `pageTitle` | Display + H1 |
| `description` / `intro` / `metaDescription` | Cards + page body + SEO |
| `accentToken` / `iconKey` | Dependency-free visual keys (CSS tokens) |
| `searchAliases` | Future search only — no alias URLs |
| `ymylRisk` / `safetyRisk` / `formulaUnitRisk` / `editorialCost` | Four separate risk dimensions |
| `launchOrder` / `priority` | Sequencing (`launch` / `later` / `defer`) |
| `minimumPublishedCalculators` | Indexation gate |
| `publicationPolicy` | `standard` or `grandfather` |
| `featured` | Editorial flag |

## Ten architectural categories

| Category | Priority | Index threshold | Notes |
|----------|----------|-----------------|-------|
| Statistics | launch | 2 (grandfather) | Only public hub today |
| Math | launch | 3 | Next planned — not public |
| Everyday Life | later | 3 | |
| Date & Time | later | 3 | |
| Conversions | later | 3 | |
| Finance | later | 3 | High YMYL |
| Business | later | 3 | |
| Science | later | 3 | |
| Health | defer | 3 | Very high YMYL |
| Construction | defer | 3 | High safety/unit/editorial — not auto-YMYL |

**Existence in the registry does not imply publication.**
