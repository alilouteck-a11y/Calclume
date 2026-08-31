# Phase 2.3 — Production Pre-Launch Audit

**Date:** 2026-08-31  
**Domain:** https://calclume.com  
**Status:** COMPLETE WITH MANUAL VALIDATION REQUIRED

## Audit findings (before fixes)

| Area | Finding |
|------|---------|
| Public routes | 10 base routes + 1 MAD calculator; consistent with IA |
| Sitemap / robots | Correct HTTPS trailing-slash URLs; MAD once; 404 absent; robots references production sitemap |
| Metadata | Unique titles/descriptions/canonicals present; Twitter card claimed `summary_large_image` without an OG asset |
| OG image | **Missing** — no branded 1200×630 asset |
| Favicon | Generic create-next-app / Next default ICO still present |
| MAD NIST wording | Partially clear; needed explicit AAD vs median-MAD note |
| OpenStax attribution | Acceptable; tightened note to “spread/SD context only” |
| Structured data | BreadcrumbList + SoftwareApplication; no FAQ/HowTo/ratings |
| Privacy copy | Still said “Phase 1” / “no live calculators” on related trust pages |
| Methodology / sources / contact | Stale Phase 1 claims after MAD publication |
| README | Still create-next-app boilerplate |
| Empty social links | Correctly omitted from footer (not rendered as placeholders) |
| External sources | NIST + OpenStax HTTPS; `rel="noopener noreferrer"` + `target="_blank"` |
| Export leaks | No Docs/tests/screenshots in `out/` |
| Analytics/ads/auth | Confirmed absent |

## Fixes applied

1. Clarified MAD vs NIST average absolute deviation / median absolute deviation naming
2. Tightened OpenStax source note to spread/standard-deviation context
3. Updated privacy, methodology, sources, and contact copy to current production posture
4. Added `siteConfig.privacy` flags and `openGraphImage: null`
5. Switched Twitter card to `summary` until a real OG image exists
6. Replaced generic favicon with branded CalcLume icon (`app/favicon.ico`, `app/icon.png`)
7. Extracted `getMadSoftwareApplicationSchema()` for testable JSON-LD
8. Exported `getSitemapPaths()` for sitemap integrity tests
9. Replaced README with CalcLume deployment-oriented docs
10. Added production-readiness tests and Hostinger/post-deploy documentation

## Deferred items

| Item | Owner action |
|------|----------------|
| OG image 1200×630 | Create branded asset; set `siteConfig.openGraphImage` to e.g. `/og-default.png` and place file in `public/` |
| Google Search Console verification | Add real verification method after deploy — do not fabricate tokens |
| Production Lighthouse on live domain | After Hostinger deploy |
| VoiceOver on physical devices | After Hostinger deploy |
| Physical phone calculator/copy checks | After Hostinger deploy |
| Custom host 404 mapping confirmation | Verify Hostinger serves `404.html` for unknown paths |

## Exact production routes

### Indexed (sitemap)

1. `/`
2. `/calculators/`
3. `/calculators/statistics/`
4. `/methodology/`
5. `/about/`
6. `/editorial-policy/`
7. `/sources/`
8. `/contact/`
9. `/privacy/`
10. `/terms/`
11. `/calculators/statistics/mean-absolute-deviation/`

### Present but not indexed

- `/404` / `_not-found` (noindex)
- `/icon.png` (asset)

## OG-image status

**OG image missing — creation required**

Recommended specification:

- 1200 × 630 pixels
- CalcLume name
- Tagline: “Clear calculators that show the work.”
- Scientific Luminance palette (ink `#0B132B`, teal `#087A70`, paper `#F6F8F7`, warm signal `#F2C66D`)
- Restrained formula/result visual
- No fake ratings or statistics
- Static file under `public/` (no server-generated OG route)

## Source-link verification

| Source | URL | Verified |
|--------|-----|----------|
| NIST Measures of Scale | https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm | Yes (HTTP fetch earlier in Phase 2.2B; still referenced) |
| OpenStax §2.7 | https://openstax.org/books/introductory-statistics/pages/2-7-measures-of-the-spread-of-the-data | Yes |

## Responsive results (static `out/` via Playwright)

Widths: 320, 390, 768, 1024, 1280  
Pages: home, MAD, methodology, privacy, 404  

- Horizontal overflow hits: **none**
- Screenshots: `Docs/screenshots/phase-2-3/`
- Overflow JSON: `Docs/screenshots/phase-2-3/overflow-report.json`

## Keyboard results (automated smoke)

- Skip link `href="#main-content"` present
- Calculate MAD receives focus
- Full interactive keyboard walkthrough on a physical browser remains a site-owner check (expand/collapse, copy clipboard permissions, VoiceOver)

## Final tests and build

- Vitest: **96/96**
- TypeScript strict: pass
- ESLint: pass
- Production build + static export: pass

## Exported output (`out/`)

Confirmed present: `index.html`, public page folders, MAD route, `404.html`, `robots.txt`, `sitemap.xml`, `favicon.ico`, hashed `_next` assets.  
Confirmed absent from export: Docs, tests, screenshots, agent tooling.
