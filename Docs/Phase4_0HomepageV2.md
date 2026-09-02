# Phase 4.0 — Homepage V2 Contract

**Status:** Contract — implementation Phase 4.2  
**Date:** 2026-09-02

## Section order (desktop and mobile)

Identical semantic order; layout stacks on mobile.

| # | Section | Component id | Notes |
|---|---------|--------------|-------|
| 1 | Header | `SiteHeader` | Global shell — not homepage-only |
| 2 | Search-led hero | `HomeHeroSearch` | H1 + value prop + search input |
| 3 | Featured calculators | `HomeFeatured` | Editorial selection |
| 4 | Browse by category | `HomeCategoryBrowse` | Directory preview |
| 5 | Recently added | `HomeRecentlyAdded` | Date-sorted |
| 6 | How CalcLume shows the work | `HomeHowItWorks` | Replaces statistics-centric demo framing |
| 7 | Trust / methodology strip | `HomeTrustStrip` | Links to methodology + privacy |
| 8 | Final discovery CTA | `HomeDiscoveryCta` | Single primary link to `/calculators/` |
| 9 | Footer | `SiteFooter` | Global shell |

**Removed / replaced:**

- `StatisticsPreview` “initial collection” → `HomeCategoryBrowse`  
- Statistics-only hero subcopy → library-first copy  
- `WhyCalcLume` four cards → merged into `HomeHowItWorks` (3 pillars max) OR retained as subsection 6b if content budget allows — prefer single section 6

---

## Copy direction (library-first)

**H1 (proposed):** Clear calculators that show the work  
**Subhead:** Formulas, steps, and interpretation on every page. Calculations run locally in your browser.

No statistics-specific language in hero.

---

## Section rules at current scale (2 published calculators)

| Section | Allowed now? | Behavior |
|---------|--------------|----------|
| 1 Header | ✓ | Standard |
| 2 Search-led hero | ✓ | Search indexes 2 tools; still useful |
| 3 Featured | ✓ | Show **both** published tools (max 4 slots) |
| 4 Browse by category | ✓ | **Statistics** section only (2 linked cards); Math omitted until ≥1 published |
| 5 Recently added | **Hide** | Requires ≥2 items with `recentlyAddedEligible`; only 1 recent after Outlier launch — hide until 3rd publish OR 2 within 90 days |
| 6 How it works | ✓ | Generic illustrative panel — see below |
| 7 Trust strip | ✓ | Always |
| 8 Discovery CTA | ✓ | “Browse all calculators” |
| 9 Footer | ✓ | Standard |

---

## Empty / fallback behavior

| Condition | Fallback |
|-----------|----------|
| 0 published (hypothetical) | Featured hidden; CTA points to methodology; no fake tools |
| 1 published | Featured shows 1 card; category browse shows 1 link |
| 2 published | Featured shows 2; Statistics browse shows 2 |
| Featured flag none set | Fall back to all published (max 4), sorted `name` asc |
| No categories with published tools | Hide section 4 entirely (should not occur while site is live) |

---

## Anti-fake rules

| Prohibited | Alternative |
|------------|-------------|
| “Popular calculators” | **Featured calculators** (editorial `featured: true`) |
| Visitor counts | None |
| “Join thousands of users” | None |
| Star ratings | None |
| Auto-rotating carousel of tools | Static grid |

If only 2 tools exist, label section **“Featured calculators”** not “Popular”.

---

## Featured selection

- **Editorial:** `featured: boolean` in catalog — owner-set  
- Max **4** cards  
- If more than 4 flagged, sort by `publishedAt` desc then name  
- Default at 2 tools: both published calculators featured unless explicitly toggled off

---

## Mobile layout

| Section | Mobile treatment |
|---------|------------------|
| Hero | Single column; search full width; H1 `text-3xl` |
| Featured | 1-column card stack |
| Category browse | Accordion per category OR stacked headings |
| How it works | Illustrative panel full width; horizontal scroll forbidden |
| Trust strip | 2-line wrap, centered |
| CTA | Full-width button |

**320px:** No `document.documentElement` horizontal overflow; cards `min-w-0`.

---

## Content density

- Max **one** H1 (hero)  
- Section vertical rhythm: `py-10 sm:py-14` (match existing `Section`)  
- Card grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for featured  
- Avoid more than **6** homepage sections of substance (current 6 + CTA meets target)

---

## MAD illustrative panel (`ExamplePanel`) treatment

| Option | Decision |
|--------|----------|
| Keep on homepage | **Move into section 6** (`HomeHowItWorks`) as static didactic demo |
| Link target | Link to **both** published calculators via small text links below panel, not only MAD |
| Interactivity | Remain non-interactive (dashed border, “Illustrative example” label) |
| Second demo | **Defer** separate Outlier panel until V2.1 — one demo sufficient |

Panel demonstrates result → formula → steps → interpretation pattern generically (may keep MAD numbers as teaching example).

---

## Statistics-centric framing removal

| Current | V2 |
|---------|-----|
| `StatisticsPreview` section title | `Browse by category` |
| “Our initial collection” copy | “Published calculators by category” |
| Statistics-only CTA | `/calculators/` |
| Nav statistics link | Removed from header (Navigation V2) |

Preparation / pipeline cards **do not appear on homepage** — directory statistics page or internal planning only.

---

## SEO

- Homepage `title`: `CalcLume — Clear Calculators That Show the Work`  
- Meta description: library-first, mentions transparency and local calculation  
- No `ItemList` schema of fake rankings  
- Optional `ItemList` of published calculators only when ≥3 tools (Phase 4.2+)

---

## Related documents

- Search hero: `Phase4_0SearchAndDiscovery.md`  
- Catalog flags: `Phase4_0CalculatorCatalogArchitecture.md`  
- Visual tokens: `Phase4_0ScientificLuminanceV2Strategy.md`
