# Phase 4.0 — SEO Architecture

**Status:** Locked for Phase 4.1+  
**Date:** 2026-09-02  
**Principle:** Google people-first content — useful pages for humans, not SERP manipulation.

---

## Indexing thresholds

| Page type | Threshold | Indexable? |
|-----------|-----------|------------|
| Calculator detail | `status: published` + static page + `sitemapEligible` | **Yes** |
| Category collection (new) | ≥ **3** published calculators in category | **Yes** |
| Category collection (Statistics) | ≥ **2** published (grandfather) | **Yes** (current) |
| Directory `/calculators/` | Always (when ≥1 published) | **Yes** |
| Homepage | Always | **Yes** |
| Trust pages | Always | **Yes** |
| Preparation / pipeline cards | No route | **No** |
| Search result UI states | Not separate URLs | **No** |
| `?q=` / filter query URLs | If ever added | **`noindex, follow`** |

---

## Category content minimum

Before indexable category page ships:

| Element | Minimum |
|---------|---------|
| Unique H1 | `[Category] Calculators` |
| Intro paragraph | ≥ **80 words** — scope, audience, what CalcLume shows |
| Published tool list | ≥ **3** linked calculators (2 for Statistics grandfather) |
| Methodology link | 1 |
| Unique meta description | 1 per category |
| Thin doorway check | No category page with only 1–2 tools unless grandfathered |

---

## Calculator publication threshold

A calculator is SEO-eligible when:

1. Engine tested and sources cited  
2. Educational content complete (definition, formula, method, example, limitations, sources)  
3. `lastReviewedAt` set  
4. Added to catalog `published` + `publishedCalculatorRoutes`  
5. Sitemap updated via derived routes  
6. No duplicate intent slug in same or other category

---

## Sitemap eligibility

Include:

- `publicRoutes` trust pages  
- `/calculators/`  
- Each `publishedCalculatorRoutes` entry  
- Category routes where `isCategoryIndexable()` is true  

Exclude:

- Preparation slugs  
- Search URLs  
- Hash-only URLs  
- Locale variants (until i18n ships)

---

## Canonical rules

| Case | Canonical |
|------|-----------|
| Calculator page | Self — `absoluteUrl(route)` with trailing slash |
| Category page | Self |
| Directory | `https://calclume.com/calculators/` |
| WWW vs apex | Apex only (`siteConfig.domain`) |
| HTTP vs HTTPS | HTTPS |
| Pagination (future) | Not applicable Phase 4.x |

No cross-canonical between similar calculators (e.g. MAD vs SD).

---

## Breadcrumb rules

**Visible HTML + JSON-LD `BreadcrumbList`** on:

- Calculator pages  
- Category pages (when indexable)  
- Directory  
- Trust pages (except home)

Pattern:

```text
Home → Calculators → [Category] → [Tool]
```

Category crumb omitted if category not indexable — use directory anchor instead.

---

## Internal linking rules

| From | To | Rule |
|------|-----|------|
| Calculator education | Other published calculators | Contextual `<a>` when relevant |
| Related section | `relatedCalculatorIds` published only | Max 4 |
| Category page | All published in category | Required |
| Directory | Published tools + indexable categories | Required |
| Homepage | Featured + category browse | Published only |
| Preparation cards | **No href** | Never |

Avoid footer link spam — max 10 categories in footer when live.

---

## Related calculator rules

- Declared in catalog `relatedCalculatorIds`  
- Prefer same category; max 1 cross-category if strongly related  
- Published only — preparation shows card without link  
- Anchor text: calculator `name`  
- No reciprocal stuffing — editorial judgment

---

## Search-result pages indexing policy

Client-side search does **not** create routes. **No indexable search result pages.**

If `?q=` is ever used for shareability:

```html
<meta name="robots" content="noindex, follow" />
<link rel="canonical" href="https://calclume.com/calculators/" />
```

---

## Query / filter URL indexing policy

| URL pattern | Index |
|-------------|-------|
| `/calculators/` | Yes |
| `/calculators/statistics/` | Yes (grandfather) |
| `/calculators/#category-math` | N/A (hash — canonical to directory) |
| `/calculators/?category=math` | **No** (if implemented) |
| `/calculators/?q=mad` | **No** |

---

## Duplicate-intent prevention

| Rule | Example |
|------|---------|
| One page per tool | Outlier/IQR includes five-number summary — no separate FNS route |
| No synonym routes | `percent-calculator` vs `percentage-calculator` — pick one slug |
| No auto-generated near-duplicates | Different quartile pages must be one tool with selector |
| Category vs tool | Category page describes cluster; tool page computes |

---

## Alias policy

| Allowed | Prohibited |
|---------|------------|
| `searchAliases` in catalog for client search | `/calculators/math/percent/` alias URL |
| 301 at host level for renamed slug (avoid) | Multiple live URLs for same tool |

---

## Review and update cadence

| Content type | Review |
|--------------|--------|
| Published calculator | **Annual** minimum; update `lastReviewedAt` |
| YMYL (finance, health) | **Semi-annual** when live |
| Methodology / editorial policy | Annual |
| Sources page | When any calculator source changes |
| Category intro | When 3rd tool added to category |

---

## Source requirements

| Risk level | Sources |
|------------|---------|
| Low (math, everyday) | Textbook or standard reference; optional |
| Medium (statistics, conversions) | NIST, OpenStax, BIPM/NIST SP 811 |
| High (finance, health) | Government or peer-reviewed; disclaimer block |
| Construction | Code body citation + regional disclaimer |

All sources linked from `/sources/` and tool-specific sections.

---

## YMYL review requirements

Before publishing **finance** or **health** calculators:

1. Editorial policy checklist signed off  
2. “Not professional advice” disclaimer visible near result  
3. Sources from authoritative bodies  
4. No personalized recommendations  
5. DecisionLog entry  

Statistics inference tools (p-value, CI): medium YMYL — limitations section mandatory.

---

## Thin-content safeguards

- No indexable category with &lt;3 tools (except Statistics grandfather)  
- No calculator page with &lt;300 words educational content  
- No programmatic city/keyword pages  
- No auto-generated FAQ blocks for rich results  
- No `SoftwareApplication` review/rating schema

---

## Structured data scope (unchanged)

| Schema | Where |
|--------|-------|
| Organization, WebSite | Site-wide |
| BreadcrumbList | Inner pages |
| SoftwareApplication | Published calculators only |

**Prohibited:** FAQ, HowTo, Review, AggregateRating, VideoObject (unless real video exists).

---

## People-first alignment

- Pages exist because a user needs a **verifiable calculation**, not to capture a keyword  
- Educational content teaches the method CalcLume actually implements  
- Updates reflect formula or convention changes — not fake freshness  
- No claims of superiority or unverifiable accuracy

---

## Related documents

- URL slugs: `Phase4_0URLTaxonomyContract.md`  
- Catalog publication: `Phase4_0CalculatorCatalogArchitecture.md`  
- Category gates: `Phase4_0CategoryArchitecture.md`
