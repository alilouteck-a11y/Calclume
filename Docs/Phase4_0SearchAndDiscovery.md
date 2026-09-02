# Phase 4.0 — Search and Discovery

**Status:** Contract — implementation Phase 4.2  
**Date:** 2026-09-02

## Scope

Static **client-side** calculator search for the published catalog. No Algolia, external API, backend, analytics, or fuzzy-search npm dependency. **Custom filtering** on a pre-built index is sufficient.

---

## Architecture

```text
Build time / module init
  calculator-catalog (published only)
        ↓
  searchIndex: SearchableCalculator[]
        ↓
Client (React island or header component)
  normalize(query) → filter + rank → render results
```

Index ships inline in JS bundle (JSON-serialized array). Rebuild on each deploy when catalog changes.

---

## Searchable fields

| Field | Weight in ranking | Indexed |
|-------|-------------------|---------|
| `name` | Highest | ✓ |
| `shortName` | High | ✓ |
| `searchAliases[]` | High | ✓ |
| `slug` | Medium (prefix) | ✓ |
| `description` | Low (contains only) | ✓ |
| `categoryId` | Filter only | ✓ (display name resolved at render) |

Not indexed: formula text, educational prose, internal `id`.

---

## Normalization

Apply to query and all indexed strings before comparison:

```typescript
function normalizeSearchText(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "") // strip diacritics
    .replace(/\s+/g, " ");
}
```

- **Case-insensitive** via lowercase  
- Collapse internal whitespace  
- No stemming in Phase 4.2 (add only if recall fails at 500+ entries)

---

## Category filtering

- Optional `<select>` or chip row: **All categories** + one chip per category with ≥1 published calculator  
- Filter applied **before** ranking  
- Category chips hidden when only one category has published tools  
- `categoryId` match is exact after normalization of display name is **not** used — filter by id only

---

## Ranking (deterministic)

Score each published calculator for query `q` (empty → no results list, show prompt):

| Match type | Score | Condition |
|------------|-------|-----------|
| Exact name | 1000 | `normalize(name) === q` |
| Exact alias | 900 | any alias equals `q` |
| Name prefix | 800 | `name` starts with `q` |
| Alias prefix | 700 | any alias starts with `q` |
| Name contains | 400 | `name` includes `q` |
| Short name contains | 350 | `shortName` includes `q` |
| Description contains | 200 | `description` includes `q` |
| Slug prefix | 150 | `slug` starts with `q` |

- Sort by score descending, then `name` ascending  
- Cap results at **12** visible (show “View all in directory” link to `/calculators/`)  
- Minimum query length: **2** characters (1 char shows hint: “Type at least 2 characters”)

**Keyword aliases** live in `searchAliases` — improve recall without `/alias-url/` routes.

---

## UI behavior

### Placement

- **Homepage hero:** primary search input (Phase 4.2)  
- **Header:** compact search button → expands overlay or navigates to `/#search` on home  
- **Directory:** optional secondary search above category list

### Keyboard

| Key | Behavior |
|-----|----------|
| `/` | Focus search when not in input (homepage + directory only; `preventDefault`) |
| `↓` / `↑` | Move active result option |
| `Enter` | Navigate to active result |
| `Escape` | Clear query, close overlay, return focus to trigger |
| `Tab` | Standard tab order through combobox pattern |

Implement as **combobox** (`role="combobox"`, `aria-expanded`, `aria-controls`, `listbox` + `option`).

### Clear button

- Visible when `query.length > 0`  
- `aria-label="Clear search"`  
- Clears input, resets results, refocuses input

### No-results state

```text
No calculators match “[query]”.
Browse all calculators →
```

Link to `/calculators/`. No suggested misspellings (no fuzzy lib).

### Screen reader announcements

`aria-live="polite"` region:

- On debounced input (200ms): `"[n] calculators found"` or `"No calculators found"`  
- On filter change: `"Filtered to [category name], [n] calculators"`  
- Do not announce on every keystroke before debounce

### Mobile

- Full-width input in hero  
- Results list below input (not side popover)  
- Touch targets ≥44px per result row  
- Virtual keyboard does not obscure results: `scroll-margin-top` on results container

---

## URL / query-state decision

| Context | Policy |
|---------|--------|
| Homepage / header search | **No URL persistence** — client state only |
| Directory inline search | **No `?q=`** in Phase 4.2 |
| Future | If `?q=` added later: **`noindex, follow`** on parameterized URLs; canonical to `/calculators/` |

Rationale: avoid thin/search-result indexation; static export has no server rendering of search pages.

---

## No-JavaScript fallback

| Feature | Fallback |
|---------|------------|
| Search | Hidden; users use `/calculators/` directory links |
| Category chips | Server-rendered category sections with links |
| Calculator pages | Fully usable (forms submit client-side still needs JS for calc — unchanged) |

Homepage includes `<noscript>`:

```html
<noscript>
  <p>Browse all calculators on the <a href="/calculators/">calculator directory</a>.</p>
</noscript>
```

Directory remains the **accessible browse path** without JS.

---

## Performance budgets

Index size estimate: ~400 bytes per published entry (minified JSON).

| Catalog size | Index JSON (approx) | Filter + rank (mid device) | Verdict |
|--------------|---------------------|----------------------------|---------|
| 100 | ~40 KB | &lt;5 ms | Trivial |
| 500 | ~200 KB | &lt;15 ms | Acceptable |
| 1,000 | ~400 KB | &lt;30 ms | Acceptable with debounce |

- Debounce input: **200 ms**  
- Memoize last query result  
- No re-index on keystroke — index is static constant  
- At 1,000+ entries: split index by category for filter-first path (Phase 4.5 optimization if needed)

**Custom filtering is sufficient** — no Levenshtein/fuse.js unless recall gaps documented at 500+ live tools.

---

## Dependencies

**None added.** Implementation uses `String.prototype.includes`, array `filter`/`sort`, and React state.

---

## Test requirements (Phase 4.2)

- Unit: normalization, ranking order fixtures  
- Unit: alias match without route collision  
- Component: keyboard navigation, Escape, aria-live text  
- E2E: search → navigate to MAD route  
- a11y: axe on combobox open state

---

## Related documents

- Catalog fields: `Phase4_0CalculatorCatalogArchitecture.md`  
- Homepage placement: `Phase4_0HomepageV2.md`  
- SEO indexing policy: `Phase4_0SEOArchitecture.md`
