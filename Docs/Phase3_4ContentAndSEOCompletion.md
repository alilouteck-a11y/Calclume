# Phase 3.4 — Content and SEO Completion

**Status:** Complete  
**Last reviewed:** 2026-09-02

## Metadata

| Field | Value |
|-------|--------|
| H1 | Outlier and IQR Calculator |
| Title tag | Outlier & IQR Calculator with Box Plot \| CalcLume |
| Description | Q1, median, Q3, IQR, fences, outliers, five-number summary, box plot, quartile method — local browser calculation |
| Canonical | `https://calclume.com/calculators/statistics/outlier-iqr/` |
| Robots | index, follow |
| OG / Twitter | Title + description; no `og:image` (site policy) |
| Keywords meta | Not used |

## Educational topics

| # | Topic | Location |
|---|-------|----------|
| 1–13 | IQR, outliers, formulas, fences, procedure, worked example, five-number summary, box plot, quartile disagreement, vs MAD, vs SD, usefulness, limitations | `OutlierIqrEducationalContent` |
| 14 | Sources and methodology | Page footer |
| 15 | Related calculators | Page footer |
| 16 | Last reviewed | Page footer |

## Worked example (F02)

Replaced F05 (no outliers) with verified fixture **F02** / `high-outlier`:

`1, 2, 3, 4, 5, 6, 7, 8, 9, 100`

Engine values (`exclusive-halves`, 1.5×): Q1 3, median 5.5, Q3 8, IQR 5, lower fence −4.5, upper fence 15.5, lower whisker 1, upper whisker 9, upper outlier #10: 100.

## Terminology

- Default method: `exclusive-halves` (not called “Tukey hinges”)
- Alternate: Excel PERCENTILE.INC / Hyndman–Fan type 7
- “Tukey-style fences” used only for 1.5×/3.0× IQR fence rule
- Fences ≠ whiskers; outliers not auto-removed

## Internal links

- Outlier/IQR → MAD (published)
- MAD → Outlier/IQR (published)
- Both → methodology, sources
- Related cards: informational only (no links to unpublished tools)

## Schema

`BreadcrumbList` + `SoftwareApplication` only. No FAQ, HowTo, ratings, or reviews.
