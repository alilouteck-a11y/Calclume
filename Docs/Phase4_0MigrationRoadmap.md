# Phase 4.0 — Migration Roadmap

**Status:** Plan only — **do not begin** until approved  
**Date:** 2026-09-02

Preserves existing URLs and calculator mathematics. No Phase 4.0.1 SEO validation or Phase 4.1 implementation in this document’s authority.

---

## Phase 4.1 — Catalog foundation + design tokens + global shell

### Scope

- Create `lib/calculator-catalog.ts` with categories + all calculators (2 published, rest planning)  
- Derive `publishedCalculatorRoutes` from catalog; shim `published-calculators.ts`  
- Add V2 CSS tokens to `app/globals.css` (non-breaking additions)  
- `CalculatorTrustStrip` component (not yet on pages OR behind feature-less direct add to MAD/Outlier — **prefer token-only in 4.1**, strip in 4.4)  
- CI tests: catalog ↔ publication parity

### Non-goals

- Homepage V2  
- Search  
- Nav drawer  
- New calculator routes  
- Math category page  
- Percentage Calculator implementation

### Expected files

| Action | Path |
|--------|------|
| Create | `lib/calculator-catalog.ts` |
| Create | `lib/calculator-catalog-publication.ts` |
| Modify | `lib/published-calculators.ts` (shim) |
| Modify | `app/globals.css` |
| Create | `__tests__/calculator-catalog.test.ts` |
| Modify | `__tests__/published-calculators.test.ts` |

### Test requirements

- Catalog published count === shim routes length  
- Every published route has filesystem page  
- No duplicate `(categoryId, slug)`  
- MAD + Outlier math tests unchanged (0 regression)

### Manual checks

- Visual spot-check tokens on one page (dev)  
- `npm run build` webpack export succeeds

### Risks

- Import cycle between catalog and pages — mitigate with publication helper module  
- Test breakage on `getCalculatorHref` — keep signature stable

### Rollback boundary

Revert catalog files; restore literal `published-calculators.ts` array.

### Publication impact

**None** — no user-visible change if tokens additive only.

---

## Phase 4.2 — Header, mobile navigation, homepage V2, search, directory V2

### Scope

- Navigation V2: remove Statistics from nav; add Search; mobile drawer  
- Homepage sections per `Phase4_0HomepageV2.md`  
- Client search combobox per `Phase4_0SearchAndDiscovery.md`  
- Directory V2: category sections from catalog  
- `HomeHowItWorks` absorbs `ExamplePanel` with dual calculator links

### Non-goals

- New calculators  
- Category index pages for Math  
- Calculator page V2 migration  
- Category accent on all cards (optional partial)

### Expected files

| Action | Path |
|--------|------|
| Modify | `components/layout/Header.tsx` |
| Create | `components/layout/MobileNavDrawer.tsx` |
| Create | `components/search/CalculatorSearch.tsx` |
| Create | `lib/calculator-search-index.ts` |
| Modify | `app/page.tsx` |
| Modify | `app/calculators/page.tsx` |
| Modify | `lib/routes.ts` |
| Create | `__tests__/calculator-search.test.ts` |
| Create | `__tests__/homepage-v2.test.tsx` |
| Modify | `__tests__/navigation.test.tsx` |

### Test requirements

- Search ranking fixtures  
- Nav drawer focus trap unit test  
- Homepage renders featured published tools only  
- No “popular” copy in snapshots  
- axe: search + drawer

### Manual checks

- 320px header/drawer  
- Keyboard: Escape, focus return  
- Noscript block present  
- Lighthouse home (budget)

### Risks

- Header layout regression at 320px  
- Search bundle size — monitor index JSON

### Rollback boundary

Revert header + homepage; keep catalog from 4.1.

### Publication impact

**Visible** homepage and nav change; URLs unchanged.

---

## Phase 4.3 — Category infrastructure and conditional category publication

### Scope

- Dynamic or shared `[category]/page.tsx` template  
- `isCategoryIndexable()` gates sitemap + nav footer links  
- Math category **not** indexable until 3 published OR explicit grandfather (none for Math)  
- Repoint statistics page to catalog filter  
- Deprecate `calculator-portfolio.ts`  
- Category accent borders on directory sections  
- Footer category column when ≥2 indexable categories

### Non-goals

- Publishing Math category with &lt;3 tools  
- Percentage calculator without SEO validation  
- Health / finance tools

### Expected files

| Action | Path |
|--------|------|
| Create | `app/calculators/[category]/page.tsx` (or refactor statistics) |
| Modify | `app/calculators/statistics/page.tsx` |
| Delete | `lib/calculator-portfolio.ts` (after migration) |
| Modify | sitemap generator / `lib/routes.ts` |
| Create | `__tests__/category-indexability.test.ts` |
| Modify | `__tests__/no-calculator-routes.test.ts` |

### Test requirements

- Math with 0–2 published → no category sitemap entry  
- Statistics with 2 → indexable  
- Empty category → no route file or `notFound()`  
- Preparation slugs still blocked

### Manual checks

- Breadcrumb category link when indexable vs not  
- Footer links match indexable set

### Risks

- Accidental indexable thin Math page — gate tests critical  
- Statistics URL must remain `/calculators/statistics/`

### Rollback boundary

Keep statistics static page; remove dynamic category route.

### Publication impact

Sitemap may change when gates crossed; no URL breaks.

---

## Phase 4.4 — Calculator Page V2 migration (MAD + Outlier/IQR)

### Scope

- Trust strip on both published calculators  
- Linked `RelatedCalculatorCard` for published related  
- TOC if ≥5 educational sections  
- `.prose-content` max-width 65ch  
- Preparation related cards unchanged  
- **No math engine changes**

### Non-goals

- New calculators  
- Collapsible educational sections  
- Sticky headers  
- Ad zones

### Expected files

| Action | Path |
|--------|------|
| Create | `components/calculator/CalculatorTrustStrip.tsx` |
| Modify | `app/calculators/statistics/mean-absolute-deviation/page.tsx` |
| Modify | `app/calculators/statistics/outlier-iqr/page.tsx` |
| Modify | `components/calculator/RelatedCalculatorCard.tsx` |
| Modify | `__tests__/mean-absolute-deviation-page.test.tsx` |
| Modify | `__tests__/outlier-iqr-page.test.tsx` |

### Test requirements

- Trust strip present with last reviewed date  
- Related MAD ↔ Outlier links work  
- JSON-LD unchanged scope  
- 52 MAD + 11 Outlier publication tests pass  
- Educational content still in SSR HTML (renderToStaticMarkup check)

### Manual checks

- 1280px two-column layout preserved  
- 320px stack order  
- Box plot a11y regression

### Risks

- Related card link styling — ensure focus visible  
- TOC anchor scroll under header

### Rollback boundary

Remove trust strip + unlink related cards; preserve URL and math.

### Publication impact

On-page UX improvement; URLs and sitemap unchanged.

---

## Phase 4.5 — Responsive, accessibility, performance, regression, deployment

### Scope

- Full a11y audit per budgets  
- Lighthouse on 4 routes  
- Bundle analyzer review  
- Contrast verification on all new token pairs  
- Documentation update  
- Production deployment (owner-authorized only)  
- Optional: remove `published-calculators.ts` shim if all imports migrated

### Non-goals

- New features  
- Third calculator  
- Analytics

### Expected files

| Action | Path |
|--------|------|
| Modify | `Docs/Phase4_5ValidationReport.md` (create at execution) |
| Modify | tests as needed for a11y fixes |
| Modify | `app/globals.css` contrast fixes if any pair fails |

### Test requirements

- Full suite green (213+ tests)  
- New axe tests  
- `production-readiness.test.ts` pass  
- Build: 18+ static pages (unchanged count unless gates added)

### Manual checks

- 200% zoom  
- Keyboard-only full flows  
- `prefers-reduced-motion`  
- Hostinger `out/` smoke test

### Risks

- Contrast failure on category accents — adjust hue in CSS only  
- INP regression from search — debounce verify

### Rollback boundary

Deploy previous `out/` artifact from git tag.

### Publication impact

Deployment only — no new URLs without separate calculator phase.

---

## Cross-phase invariants

| Invariant | Phases |
|-----------|--------|
| `/calculators/statistics/mean-absolute-deviation/` | All |
| `/calculators/statistics/outlier-iqr/` | All |
| Engine outputs | All |
| `trailingSlash: true` | All |
| No empty category index pages | 4.3+ |
| Percentage calc requires SEO validation | Until separate phase |

---

## Related documents

- IA: `Phase4_0InformationArchitecture.md`  
- Catalog: `Phase4_0CalculatorCatalogArchitecture.md`  
- a11y budgets: `Phase4_0AccessibilityAndPerformance.md`
