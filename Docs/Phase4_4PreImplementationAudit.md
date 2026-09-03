# Phase 4.4 — Pre-Implementation Audit

**Date:** 2026-09-03
**Baseline:** `58db85d` (Phase 4.3 category infrastructure)
**Status:** Complete before production edits

---

## Existing page structure (both calculators)

| Region | MAD | Outlier/IQR |
|--------|-----|-------------|
| Site header/footer | Root layout | Same |
| Breadcrumbs + H1 | `PageHeader` | Same |
| Trust strip | **Missing** | **Missing** |
| Interactive workspace | `MeanAbsoluteDeviationCalculator` in `CalculatorShell` | `OutlierIqrCalculator` in `CalculatorShell` |
| Educational prose | `MadEducationalContent` (7 H2s) | `OutlierIqrEducationalContent` (13 H2s) |
| Sources | Duplicated section markup | Same pattern, different note |
| Related | `launchCandidates` slice, **no hrefs** | Same |
| Last reviewed | ISO date from tool config | Same |

Neither page uses catalog `relatedCalculatorIds` or `lastReviewedAt` directly. Related cards never link, even for published MAD ↔ Outlier/IQR.

---

## Shared patterns

- Identical page chrome: `PageHeader` + `Section` + `Container`
- Identical sources/related/last-reviewed footer block (~80 duplicated lines)
- Shared primitives: `CalculatorShell`, input/result panels, formula, steps, interpretation, tables
- Desktop: `lg:grid-cols-2` input | result; working below
- Client islands only for engines; education is server-rendered

---

## Duplicated markup

- Breadcrumb construction
- Structured data wiring (`BreadcrumbList` + `SoftwareApplication`)
- Sources intro + `SourceList`
- Related grid over `launchCandidates`
- Last-reviewed line

---

## Visual / hierarchy issues

- Hero `PageHeader` padding (`py-8 sm:py-10`) plus `Section` (`py-10 sm:pt-8`) pushes the workspace down
- No category context label above H1
- Result primary uses `text-3xl` but not V2 `--text-result-primary`
- No compact trust strip above the shell
- Related tools look like a mini-directory of four unlinked cards
- Education uses `max-w-3xl` rather than ~65ch; H2s lack `id` / `scroll-margin` for a TOC

---

## Responsive notes

- Tables already wrap in `overflow-x-auto`
- Outlier box plot has prose + table alternatives (preserve)
- Trust strip and related cards must stack at 320px without overflow
- Shell padding is adequate; avoid adding extra vertical dead space

---

## Calculator-specific elements (must stay unique)

**MAD**

- Parser, n bounds, examples, precision, mean, |deviations|, divide by **n**
- Fixture `12, 15, 14, 10, 19` → mean 14, MAD **2.4**
- Deviation table, copy/reset/validation
- About-notice: arithmetic-mean MAD, not median AD, no n−1
- Metadata/canonical/JSON-LD unchanged

**Outlier/IQR**

- n ≥ 4, exclusive-halves default, excel-r7, 1.5× / 3.0× fences, strict fence equality
- Fixture `1…9, 100` → Q1 3, median 5.5, Q3 8, IQR 5, fences −4.5 / 15.5, whiskers 1 / 9, outlier #10 = 100
- Classification table, outlier lists, accessible SVG + textual summary + SR table
- Stale-result policy, focus-on-error
- Metadata/canonical/JSON-LD unchanged

---

## Mathematical and behavioral invariants

Do not change engines, parsers, rounding, SVG geometry, stale policy, validation copy, routes, sitemap, or educational factual wording.

---

## Safe migration plan

1. Add presentation-only server components for intro, trust strip, education TOC, sources, related, last reviewed, and a composing `CalculatorPageShell`.
2. Thin both `page.tsx` files to compose those parts; keep metadata factories as today.
3. Derive related tools from `resolveRelatedCalculators` (max 4); link only published routes.
4. Add compact trust copy (MAD vs IQR method wording) without certification claims.
5. Tighten intro spacing; keep engines inside existing `CalculatorShell`.
6. Add H2 ids + TOC (both tools have ≥5 educational H2s).
7. Use result-primary tokens in summaries without changing numeric builders.
8. Tests for shell structure; existing engine/UI tests remain the math lock.
9. Static-export browser check + screenshots; no new routes.

**Non-goals:** Percentage Calculator, Math publication, Phase 4.5, engine changes.
