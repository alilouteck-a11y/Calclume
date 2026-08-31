# Phase 1 Information Architecture

**Status:** Locked for Phase 1

## Public routes

| Route | Purpose | In sitemap |
|-------|---------|------------|
| `/` | Homepage | Yes |
| `/calculators/` | Calculator directory | Yes |
| `/calculators/statistics/` | Statistics collection (in preparation) | Yes |
| `/about/` | About CalcLume | Yes |
| `/methodology/` | Calculation methodology | Yes |
| `/editorial-policy/` | Editorial standards | Yes |
| `/sources/` | Source hierarchy | Yes |
| `/contact/` | Contact information | Yes |
| `/privacy/` | Privacy policy | Yes |
| `/terms/` | Terms of use | Yes |

No other public routes are permitted without a documented requirement.

## Navigation structure

### Primary navigation

- Calculators → `/calculators/`
- Statistics → `/calculators/statistics/`
- Methodology → `/methodology/`
- About → `/about/`

### Footer navigation

- Calculators, Statistics, Methodology, Editorial Policy, Sources, About, Contact, Privacy, Terms

Every public page is reachable through normal navigation.

## Calculator directory behavior

### `/calculators/`

- Explains what collections are being prepared
- Links only to existing collection pages (Statistics)
- Does not present fake live calculators
- Shows "Collection in preparation" notice when no calculators are published

### `/calculators/statistics/`

- Lists launch and expansion candidates as planning cards
- Cards are labeled "In preparation" or "Planned"
- No links to nonexistent calculator detail pages
- No "available now" buttons

## Breadcrumb architecture

Breadcrumbs appear on inner pages with valid hierarchy. BreadcrumbList structured data is emitted only where a valid hierarchy exists.

## Future calculator routes (not in Phase 1)

Individual calculator pages will follow `/calculators/statistics/[slug]/`. These routes must not be created until a calculator is complete, tested, and approved.

## Localization architecture

- English routes at root level
- Future Arabic localization may use `/ar/about/` or equivalent
- No automatic route generation for translations

## Internal linking rules

- Use descriptive link text
- Do not link to unpublished calculator detail pages
- Homepage links to calculators directory and methodology
