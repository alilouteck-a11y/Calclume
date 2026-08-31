# Phase 1 Manual Validation

**Date:** 2026-08-31  
**Phase:** 1.1 — Manual UI, Accessibility & Static Export Validation  
**Status:** COMPLETE WITH MANUAL VALIDATION REQUIRED

---

## Validation methods used

| Method | Scope |
|--------|-------|
| Dev server (`npm run dev`, port 3456) | Runtime compile, navigation, metadata fetch |
| Static export inspection (`out/`) | Route reconciliation, HTML structure |
| Pa11y WCAG2AA (via npx, no permanent install) | Automated accessibility on 6 pages |
| Lighthouse 13.4.1 (via npx, static `out/` served on 3457) | Performance, a11y, SEO scores |
| Static responsive script (`tools/static-responsive-check.mjs`) | H1 count, skip link, CSS overflow patterns |
| HTML/metadata fetch scripts | SEO spot-check, keyboard focusable inventory |
| Code review | Content integrity, Client Component audit |

**Not performed:** Real screen reader session (VoiceOver/NVDA), physical device testing, Playwright viewport screenshots (Playwright install blocked in sandbox).

---

## Viewport checks

### Widths inspected (static + dev server HTML/CSS analysis)

- 320px, 390px, 768px, 1024px, 1280px

### Pages inspected

| Page | Method | Result |
|------|--------|--------|
| `/` (homepage) | Pa11y, Lighthouse, static HTML | PASS after fixes |
| `/calculators/` | Pa11y, static HTML | PASS |
| `/calculators/statistics/` | Pa11y, static HTML | PASS |
| `/methodology/` | Pa11y, static HTML | PASS |
| `/privacy/` | Pa11y, static HTML | PASS |
| `/404` (unknown route) | Pa11y, dev fetch | PASS |

### Responsive findings

- **No horizontal overflow issues** detected via static CSS analysis (formula blocks use `overflow-x: auto`; header uses `flex-wrap`).
- **Header navigation** wraps on narrow viewports; no dedicated mobile menu (acceptable — links remain reachable).
- **Card grids** collapse to single column below `sm` breakpoint.
- **Homepage first viewport** at 320px: H1, value proposition, and primary CTA visible without decorative hero imagery.
- **Formula/example panel** uses monospace with word-break and scroll wrapper; long step strings wrap.

### Visual findings (before fixes)

1. Starter template SVG assets in `public/` (next.svg, vercel.svg, etc.) — unused but exported.
2. Final CTA secondary button: Tailwind variant/class conflict caused white-on-white text.
3. Breadcrumb separator (`text-border`) failed contrast (decorative, aria-hidden).
4. Interactive teal `#18B8A6` failed WCAG AA contrast for text and buttons on white/dark backgrounds.

### Fixes applied

| Issue | Fix | Files |
|-------|-----|-------|
| Starter SVG assets | Deleted unused create-next-app assets | `public/*.svg` (5 files) |
| Final CTA button contrast | Replaced conflicting `Button variant="secondary"` with styled `Link` | `components/home/FinalCta.tsx` |
| Breadcrumb separator contrast | Changed `text-border` → `text-muted/50` | `components/layout/Breadcrumbs.tsx` |
| Teal contrast (systemic) | Darkened interactive token to `#087a70`; preserved `#18b8a6` as `lume-teal-bright` for decorative use | `app/globals.css`, `ExamplePanel.tsx`, `InterpretationPanel.tsx` |
| 404 metadata | Added `noindex` title/description; fixed homepage title logic | `app/not-found.tsx`, `lib/metadata.ts` |

---

## Keyboard validation

### Verified (HTML structure + dev server)

- Skip-to-content link present on all pages (`a.skip-link[href="#main-content"]`).
- No positive `tabindex` values found in rendered HTML.
- All primary nav, footer, and CTA links are standard `<a>` elements (keyboard reachable).
- Illustrative example panel uses `role="img"` with descriptive `aria-label` — no interactive controls that could mislead users.
- 404 page provides "Return home" button and "Browse calculators" link.

### Not verified

- Full keyboard-only walk-through in a browser (requires manual owner check).
- Skip link focus visibility and jump-to-main behavior (requires browser focus test).

---

## Accessibility findings

### Pa11y WCAG2AA results (after fixes)

| Page | Result |
|------|--------|
| `/` | No issues |
| `/calculators/` | No issues |
| `/calculators/statistics/` | No issues |
| `/methodology/` | No issues |
| `/privacy/` | No issues |
| `/does-not-exist/` | No issues |

### Structural checks (code + rendered HTML)

- One `<h1>` per page on all public routes.
- Landmarks: `header`, `nav`, `main`/`section`, `footer`, `article`, `aside`, `figure`.
- Calculator test fixture: label/error association, `aria-live` on result panel, table caption (sr-only).
- `prefers-reduced-motion` disables animations in CSS.
- Decorative breadcrumb separators use `aria-hidden="true"`.

### Lighthouse accessibility (static homepage)

| Mode | Score |
|------|-------|
| Desktop | 93 |
| Mobile | 98 |

### Screen reader

**Not performed.** Requires site owner validation with VoiceOver or NVDA.

---

## Exported route reconciliation

### 10 approved public routes (in sitemap)

1. `/`
2. `/calculators/`
3. `/calculators/statistics/`
4. `/about/`
5. `/methodology/`
6. `/editorial-policy/`
7. `/sources/`
8. `/contact/`
9. `/privacy/`
10. `/terms/`

### 15 Next.js build routes explained

| # | Build route | Classification |
|---|-------------|----------------|
| 1 | `/` | Intended public HTML |
| 2 | `/about` | Intended public HTML |
| 3 | `/calculators` | Intended public HTML |
| 4 | `/calculators/statistics` | Intended public HTML |
| 5 | `/contact` | Intended public HTML |
| 6 | `/editorial-policy` | Intended public HTML |
| 7 | `/methodology` | Intended public HTML |
| 8 | `/privacy` | Intended public HTML |
| 9 | `/sources` | Intended public HTML |
| 10 | `/terms` | Intended public HTML |
| 11 | `/robots.txt` | robots |
| 12 | `/sitemap.xml` | sitemap |
| 13 | `/_not-found` | Next.js system (internal not-found handler) |
| 14 | `/404` + `404.html` | 404/error output |
| 15 | (implicit) | `_not-found/index.html` duplicate of 404 output |

**Difference explained:** 10 public content pages + robots + sitemap + `_not-found` internal handler + 404 error pages = 15 build entries. No calculator detail routes, no component fixture routes, no starter/demo pages.

### Confirmed absent

- Calculator detail routes (e.g., `/calculators/statistics/mean-absolute-deviation/`)
- Public component playground
- Indexable placeholder tools

---

## Content integrity

Reviewed all trust pages and homepage copy:

- No fabricated statistics, expert reviews, or author credentials.
- No "available now" language for unpublished calculators.
- Directory pages state collection is "in preparation."
- "Tested edge cases" refers to future publication commitment, not false claim of existing tools.
- Privacy page accurately describes Phase 1 (no analytics, no data collection).
- No exaggerated superlatives ("best," "millions of users," etc.).

---

## SEO and metadata spot-check

| Check | Result |
|-------|--------|
| Unique titles per route | PASS |
| Unique descriptions | PASS |
| Canonical URLs with trailing slashes | PASS (public routes) |
| Open Graph title/description | PASS |
| X/Twitter card metadata | PASS |
| Organization + WebSite JSON-LD | PASS (site-wide) |
| BreadcrumbList on inner pages | PASS |
| No FAQ/review/rating/SoftwareApplication schema | PASS |
| No keywords meta tag | PASS |
| Sitemap: 10 URLs only, `https://calclume.com` | PASS |
| robots.txt references correct sitemap | PASS |
| 404: `noindex`, title "Page not found \| CalcLume" | PASS |
| 404: canonical still inherits homepage URL | Minor — mitigated by noindex |

---

## Lighthouse results

**Tested URL:** `http://localhost:3457/` (static export via `python3 -m http.server`)  
**Note:** Scores from local static serve, not production CDN.

### Desktop (Lighthouse default)

| Category | Score |
|----------|-------|
| Performance | 91 |
| Accessibility | 93 |
| Best Practices | 100 |
| SEO | 100 |

### Mobile (`--form-factor=mobile`)

| Category | Score |
|----------|-------|
| Performance | 93 |
| Accessibility | 98 |
| Best Practices | 100 |
| SEO | 100 |

Post-deployment Lighthouse on `https://calclume.com` recommended to account for CDN/TTFB differences.

---

## Performance review

- **Client Components:** Only calculator input primitives (`DatasetInput`, `ExampleSelector`, `ResetButton`, `CopyResultButton`) and test fixture — none used on public Phase 1 pages. All public pages are Server Components.
- **No third-party scripts** (analytics, ads, widgets).
- **Fonts:** Source Sans 3 + JetBrains Mono via `next/font/google` with `display: swap` and preload.
- **No decorative images** on public pages; favicon only.
- **No measurable layout shift** from decorative content.
- **Static export:** Minimal JS chunks for navigation hydration.

---

## Remaining manual validation (site owner)

1. **Screen reader spot-check** — VoiceOver (macOS/iOS) or NVDA (Windows) on homepage and one trust page.
2. **Physical device check** — 320px phone for header wrap and tap targets.
3. **Keyboard-only full walk-through** — confirm skip link focus visibility and tab order in browser.
4. **Production Lighthouse** — run against deployed `https://calclume.com`.
5. **Trailing slash behavior** — confirm hosting serves `/about/` correctly.

---

## Confirmations

- Phase 2 was not started
- No calculator logic was added
- No calculator detail route was created
- No analytics/ads/backend/auth/database was added
