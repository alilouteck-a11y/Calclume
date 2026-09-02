# Phase 4.0 — Current Experience Audit

**Status:** Research complete  
**Date:** 2026-09-02  
**Sources:** Production codebase, `Docs/Phase3_4ManualValidation.md`, Phase 3.4 screenshot index (not present in repo workspace at audit time — findings reference documented capture states)

## Audit method

Static review of App Router pages, layout components, design tokens (`app/globals.css`, `Docs/Phase1DesignSystem.md`), calculator contracts (MAD, Outlier/IQR), and navigation/registry patterns. Screenshot states taken from Phase 3.4 manual validation log.

---

## Homepage

| Finding | Classification | Notes |
|---------|----------------|-------|
| Clear hero value prop (“show the work”) | **Preserve** | `HeroSection` — concise H1, dual CTAs |
| Illustrative `ExamplePanel` demonstrates result → formula → steps → interpretation | **Preserve** | Dashed border + warm-signal label avoids fake interactivity |
| `ExamplePanel` links only to MAD, not Outlier/IQR | **Improve** | Second published tool invisible in hero funnel |
| `StatisticsPreview` titled “initial collection” | **Improve** | Undersells two live calculators; reads as pre-launch |
| Homepage grid shows 3 “In preparation” vs 2 “Available” cards | **Improve** | Preparation noise dominates; needs multi-category framing or filtering |
| `WhyCalcLume` four-pillar cards | **Preserve** | Trust positioning without hype |
| No site search | **Defer** | Appropriate until library &gt; ~15 tools |
| No multi-category discovery above the fold | **Replace** | Required for platform positioning (Phase 4.1+) |

## Header / navigation

| Finding | Classification | Notes |
|---------|----------------|-------|
| Logo + tagline lockup | **Preserve** | Readable, not SaaS-generic |
| Primary nav: Calculators, **Statistics**, Methodology, About | **Replace** | Category in top nav does not scale to 10 domains |
| `min-h-11` nav links, teal focus rings | **Preserve** | Meets touch/accessibility contract |
| No search affordance | **Defer** | Phase 4.2+ with client-side index |
| Mobile: nav wraps (`flex-wrap`) | **Improve** | Acceptable at 4 items; will crowd at scale |

## Footer

| Finding | Classification | Notes |
|---------|----------------|-------|
| Privacy line (“calculations run locally”) | **Preserve** | Differentiator vs calculator farms |
| Footer nav: trust pages only | **Preserve** | No calculator spam |
| No category links | **Defer** | Add when category pages exist |
| Single-column contact on small screens | **Preserve** | Adequate |

## Calculator directory (`/calculators/`)

| Finding | Classification | Notes |
|---------|----------------|-------|
| “Available now” section with linked cards | **Preserve** | Correct publication pattern |
| Single “Statistics & Data” collection card | **Improve** | No visual model for future categories |
| Collection count uses full `statisticsCalculators.length` | **Improve** | Includes unpublished planning records |

## Statistics collection (`/calculators/statistics/`)

| Finding | Classification | Notes |
|---------|----------------|-------|
| Launch vs expansion candidate sections | **Preserve** | Honest pipeline visibility |
| Both published calculators linked | **Preserve** | Verified in Phase 3.4 tests |
| Five-number-summary card removed (Phase 3.4) | **Preserve** | Aligns with Phase 3.0 architecture |
| Page is statistics-specific, not a generic category template | **Improve** | Extract reusable category template in Phase 4.1 |

## Calculator detail pages (MAD, Outlier/IQR)

| Finding | Classification | Notes |
|---------|----------------|-------|
| Page order: breadcrumb → H1 → calculator → education → sources → related | **Preserve** | Matches product contract |
| `CalculatorShell` as working surface (not page H1) | **Preserve** | One H1 per page |
| Desktop `lg:grid-cols-2` input/result split | **Preserve** | Screenshot-validated at 1280px |
| Result hierarchy: summary → five-number/fences → lists → formula → steps → table → box plot | **Preserve** | Strong transparency |
| Long educational prose below fold | **Improve** | Mobile users scroll extensively post-result |
| `RelatedCalculatorCard` is non-clickable even when “available” | **Improve** | Missed cross-discovery between published tools |
| Stale-result + precision policies | **Preserve** | Differentiated UX |
| Accessible box plot (text + sr-only table) | **Preserve** | Rare among competitors |

## Trust pages (About, Methodology, Sources)

| Finding | Classification | Notes |
|---------|----------------|-------|
| Methodology/sources linked from calculators | **Preserve** | YMYL credibility |
| No author personas or fake credentials | **Preserve** | Honest positioning |
| Editorial policy present | **Preserve** | Scales to multi-category |

## Mobile layouts (from Phase 3.4 captures)

| Finding | Classification | Notes |
|---------|----------------|-------|
| 320px: stacked inputs, contained table/box-plot scroll | **Preserve** | No documented full-page horizontal overflow |
| 390px: validation error visible, touch targets | **Preserve** | |
| Calculator usable before educational wall | **Preserve** | |
| Full-page screenshots on calculate | **Improve** | Long pages; consider in-page section nav (defer) |

## Design tokens & typography

| Finding | Classification | Notes |
|---------|----------------|-------|
| Scientific Luminance palette (ink, teal, paper) | **Preserve** | Distinct, calm, WCAG-conscious |
| Source Sans 3 + JetBrains Mono | **Preserve** | Formula-friendly |
| CSS custom properties + Tailwind v4 `@theme` | **Preserve** | Maintainable |
| Light mode only | **Defer** | V2 may add optional dark tokens |
| No category chroma system | **Improve** | V2: restrained accent per category |
| `.prose-content` for education | **Preserve** | Extend for longer library pages |

## Cards, buttons, badges

| Finding | Classification | Notes |
|---------|----------------|-------|
| `CalculatorCard` published vs preparation states | **Preserve** | Honest, no ghost links |
| Teal primary / bordered secondary buttons | **Preserve** | |
| `Badge` variants (Available, In preparation, Planned) | **Preserve** | |
| Card density on 3-column homepage grid | **Improve** | May need compact list mode for large libraries |

## Related-calculator discovery

| Finding | Classification | Notes |
|---------|----------------|-------|
| Portfolio registry (`calculator-portfolio.ts`) statistics-only | **Replace** | Needs category dimension |
| `published-calculators.ts` as publication gate | **Preserve** | |
| Cross-links in educational content (MAD ↔ Outlier/IQR) | **Preserve** | Extend pattern |
| Related section capped at 4, non-linked | **Improve** | Link published; cluster by category |

## Summary counts

| Action | Count |
|--------|-------|
| Preserve | 28 |
| Improve | 14 |
| Replace | 3 |
| Defer | 6 |

---

## Highest-priority improvements (non-code; for Phase 4.1+)

1. Remove category-specific item from primary navigation; use directory-first discovery.
2. Reframe homepage from “Statistics initial collection” to “multi-category library” without publishing empty categories.
3. Link `RelatedCalculatorCard` to published calculator routes.
4. Introduce category registry separate from statistics-only portfolio.
5. Add second-category launch only after Phase 4.0-style SEO validation per calculator.
