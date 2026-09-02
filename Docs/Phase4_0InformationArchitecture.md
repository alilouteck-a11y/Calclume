# Phase 4.0 — Information Architecture

**Status:** Locked for Phase 4.1 planning  
**Date:** 2026-09-02

## Purpose

Define how users, crawlers, and maintainers navigate CalcLume as a **multi-category calculator library** without duplicating contracts in sibling documents. This document is the **IA spine**; detailed contracts live in linked files.

---

## Platform model

```text
CalcLume (site)
├── Marketing / trust (root)
│   ├── /                          Home
│   ├── /about/
│   ├── /methodology/
│   ├── /sources/
│   ├── /editorial-policy/
│   ├── /contact/
│   ├── /privacy/
│   └── /terms/
└── Calculator library (/calculators/)
    ├── /calculators/              Global directory
    ├── /calculators/[category]/   Category collection (indexable at gate)
    └── /calculators/[category]/[calculator]/  Tool detail (when published)
```

Future locale prefix: `/[locale]/…` (not Phase 4.1).

---

## Page types and jobs-to-be-done

| Page type | User job | Primary entry | Detail doc |
|-----------|----------|---------------|------------|
| Home | Understand value; find a tool quickly | `/` | `Phase4_0HomepageV2.md` |
| Directory | Browse all published tools by category | `/calculators/` | `Phase4_0SearchAndDiscovery.md` |
| Category collection | Explore one domain cluster | `/calculators/[category]/` | `Phase4_0CategoryArchitecture.md` |
| Calculator detail | Compute + verify + learn | `/calculators/…/[calculator]/` | `Phase4_0CalculatorPageV2.md` |
| Trust pages | Verify methodology and sources | `/methodology/`, `/sources/` | `Phase4_0SEOArchitecture.md` |

---

## User flows

### Flow A — Known tool

```text
Home search OR nav → Calculator detail → Related tools (same category)
```

### Flow B — Domain exploration

```text
Home “Browse by category” → Category collection (if indexable) → Calculator detail
```

### Flow C — Trust verification

```text
Calculator detail → Trust strip → Methodology / Sources → Back to calculator
```

### Flow D — No JavaScript

```text
Directory and calculator pages render static HTML links and forms;
search degrades to directory browse (see Search doc).
```

---

## Content hierarchy principles

1. **Calculator before essay** — Working surface in first viewport on detail pages.
2. **Publication honesty** — No indexable routes for unpublished tools.
3. **Category depth gate** — New category hubs at ≥3 published tools (Statistics grandfathered at 2).
4. **Single catalog truth** — One registry drives routes, cards, sitemap, search, related (see Catalog doc).
5. **No duplicate intent URLs** — One canonical slug per tool; aliases search-only.

---

## Navigation IA

| Surface | Phase 4.1 target | Doc |
|---------|------------------|-----|
| Primary header | Brand · Calculators · (conditional Browse) · Search · Methodology · About | `Phase4_0NavigationV2.md` |
| Footer | Trust links + category links when ≥2 indexable categories | Navigation V2 |
| In-page | Breadcrumbs on directory children | `Phase4_0URLTaxonomyContract.md` |
| Calculator | Related calculators + educational cross-links | Calculator Page V2 |

**Categories in primary nav:** Not until **≥2 categories each have ≥1 published calculator** (expected: Statistics + Math after first Math tool ships). Until then, category discovery lives on `/calculators/` only.

---

## Discovery layers

| Layer | Mechanism | When active |
|-------|-----------|-------------|
| Search-led hero | Client-side index | Phase 4.2; ≥2 published tools |
| Featured / editorial | `featured: true` in catalog | Manual; never “popular by traffic” |
| Browse by category | Directory sections | Per-category when ≥1 published |
| Recently added | `publishedAt` sort, max 4 | ≥2 published tools |
| Related calculators | `relatedIds` in catalog | Always on detail pages |

---

## Registry and publication IA

```text
lib/calculator-catalog.ts     ← single source of truth (Phase 4.1)
        ↓ derives
published routes · sitemap · cards · search index · related links
```

`published-calculators.ts` becomes a **derived thin export** during migration (see Catalog Architecture). Publication gate logic unchanged: only `status: "published"` entries with static pages are indexable.

---

## Cross-document map

| Original deliverable | Primary document |
|---------------------|------------------|
| Platform positioning | `Phase4_0Positioning.md` |
| Information architecture | **This document** |
| Category strategy | `Phase4_0CategoryArchitecture.md` |
| Calculator catalog architecture | `Phase4_0CalculatorCatalogArchitecture.md` |
| Search and discovery | `Phase4_0SearchAndDiscovery.md` |
| Homepage V2 | `Phase4_0HomepageV2.md` |
| Navigation V2 | `Phase4_0NavigationV2.md` |
| Calculator Page V2 | `Phase4_0CalculatorPageV2.md` |
| Scientific Luminance V2 | `Phase4_0ScientificLuminanceV2Strategy.md` |
| Accessibility and performance | `Phase4_0AccessibilityAndPerformance.md` |
| SEO architecture | `Phase4_0SEOArchitecture.md` |
| Migration roadmap | `Phase4_0MigrationRoadmap.md` |
| Opportunity portfolio | `Phase4_0OpportunityPortfolio.md` |
| Current experience audit | `Phase4_0CurrentExperienceAudit.md` |
| Competitor audit | `Phase4_0CompetitorDesignAudit.md` |
| URL / taxonomy | `Phase4_0URLTaxonomyContract.md` |
| Validation / final report | `Phase4_0ValidationReport.md` |

---

## Approved decisions (unchanged)

- Multi-category library; Statistics + Math first active clusters  
- 3 published calculators for new indexable category pages; Statistics grandfathered at 2  
- No empty category pages; `published-calculators` gate preserved through migration  
- Percentage Calculator candidate only — separate SEO validation required  
- Scientific Luminance V2 evolution; no gradients, glassmorphism, or calculator-farm UI
