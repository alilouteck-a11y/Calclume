# Phase 1 Product Architecture

**Status:** Locked for Phase 1  
**Domain:** https://calclume.com  
**Brand:** CalcLume — "Clear calculators that show the work."

## Product concept

CalcLume provides accurate, transparent calculators that return:

1. **Answer** — the computed result
2. **Formula** — the exact formula used
3. **Steps** — step-by-step working
4. **Interpretation** — plain-language explanation

## Locked product principles

| Principle | Requirement |
|-----------|-------------|
| Show the work | Every calculator must display its formula and working steps |
| Usefulness first | Calculator usefulness comes before SEO copy |
| Working surface priority | The working calculator must appear near the top of its page |
| Consolidation | Closely related calculation modes consolidated into one strong page |
| No keyword spam | Do not create one page for every keyword variation |
| Honesty | Do not fabricate search volume, expert review, authors, sources, or credentials |
| No unfinished routes | Do not publish unfinished calculator routes |
| Scope lock | Health, loan, mortgage, tax, investment, and medical calculators are outside initial scope |
| Language | English is the first launch language |
| Localization | Architecture must not prevent curated Arabic localization later |
| No mass translation | Automatic mass translation is prohibited |
| Local computation | Calculations must run locally unless a future phase explicitly changes this |
| Privacy | User-entered datasets must not be transmitted or stored |

## Phase 1 deliverables

- Production static site foundation
- Design system ("Scientific Luminance")
- Information architecture and public routes
- Trust and methodology pages
- SEO foundation (metadata, sitemap, robots, structured data)
- Reusable calculator UI primitives (no logic)
- Calculator Page Contract documentation
- Test suite and validation report

## Phase 1 exclusions

- Real calculator mathematics
- Indexable placeholder calculator pages
- Backend, database, authentication
- Analytics, AdSense, affiliate links
- CMS platforms and APIs

## Planned calculator portfolio

### Launch candidates (Statistics & Data)

1. Mean Absolute Deviation Calculator
2. Outlier and IQR Calculator
3. Five Number Summary and Box Plot Calculator
4. Coefficient of Variation Calculator
5. Standard Error Calculator
6. Critical Value Calculator

### Expansion candidates

7. Confidence Interval Calculator
8. P-Value Calculator
9. Sample Size Calculator
10. Linear Regression Calculator

These are planning records only. No public detail routes exist in Phase 1.

## Technical architecture

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 with CSS design tokens
- **Deployment:** Static export (`output: "export"`)
- **Testing:** Vitest + React Testing Library
- **Runtime:** Client-side only for calculations (future phases)

## Configuration centralization

Site-wide values live in `lib/site-config.ts`:

- Name, domain, description, email
- Social links (empty when unknown)
- Default metadata via `lib/metadata.ts`
