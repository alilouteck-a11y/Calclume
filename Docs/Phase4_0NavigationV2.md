# Phase 4.0 — Navigation V2 Contract

**Status:** Contract — implementation Phase 4.2  
**Date:** 2026-09-02

## Desktop primary navigation

Left to right:

| Item | Target | Always visible? |
|------|--------|---------------|
| **CalcLume brand** | `/` | ✓ |
| **Calculators** | `/calculators/` | ✓ |
| **Browse** | `/calculators/#categories` | Conditional — see below |
| **Search** | Opens search overlay / focuses hero on home | ✓ (from Phase 4.2) |
| **Methodology** | `/methodology/` | ✓ |
| **About** | `/about/` | ✓ |

**Removed:** Statistics (and any category-specific top-level link).

### Browse vs Categories naming

Use **“Browse”** until **≥2 categories each have ≥1 published calculator**. Then rename label to **“Categories”** (same target: directory category anchor). No mega-menu until **≥2 indexable category pages** exist.

| State | Nav label | Target |
|-------|-----------|--------|
| Only Statistics published | Hidden **or** “Browse” → `/calculators/` | No separate category nav |
| Statistics + Math (≥1 each) | **Browse** | `/calculators/#categories` |
| ≥2 indexable category hubs | **Categories** | `/calculators/#categories` |

**Resolution:** **Categories does not belong in primary nav now.** Ship **Calculators** only for category discovery until the second category publishes its first tool; then add **Browse**. Rename to **Categories** when two category clusters are publicly represented.

---

## Mobile navigation

| Element | Behavior |
|---------|----------|
| Brand | Left; links to `/` |
| Search | Icon button `aria-label="Search calculators"` — opens search overlay |
| Menu trigger | `aria-expanded`, `aria-controls="mobile-nav-drawer"` |
| Drawer | Right or full-width panel with nav links |

Drawer contents (vertical list):

1. Calculators  
2. Browse (conditional)  
3. Methodology  
4. About  
5. Contact (footer parity)

Search is **not** buried inside drawer — always reachable from header icon.

---

## 320px behavior

- Brand text may use `CalcLume` only (hide tagline below `sm`)  
- Nav links in drawer only — no horizontal link row  
- Search icon + menu icon: `min-w-11 min-h-11`  
- Drawer width `min(100vw, 20rem)`  
- No horizontal page scroll caused by header

---

## Keyboard sequence (desktop)

```text
Skip link → Brand → Calculators → Browse? → Search → Methodology → About → main
```

Search overlay open:

```text
Search input → Clear (if visible) → Results listbox → Escape closes
```

---

## Focus management

| Action | Focus |
|--------|-------|
| Open mobile drawer | Move to first link in drawer |
| Close mobile drawer (Escape / close btn) | Return to menu trigger |
| Open search overlay | Move to search input |
| Close search overlay | Return to search trigger (or hero input on home) |
| Tab from last drawer link | Cycles within drawer while open (focus trap) |

---

## Escape behavior

| Context | Escape |
|---------|--------|
| Mobile drawer open | Close drawer; return focus to trigger |
| Search overlay open | Close; clear not required |
| Submenu (future) | Close submenu only |

---

## Outside-click behavior

- Mobile drawer: click backdrop closes  
- Search overlay: click outside closes (desktop); mobile uses explicit close  
- Do not close on outside click if user is selecting text in search input

---

## Scroll locking

| Surface | `overflow: hidden` on body? |
|---------|------------------------------|
| Mobile drawer | **Yes** |
| Search overlay (mobile) | **Yes** |
| Search overlay (desktop) | **No** — dropdown below header |
| Desktop drawer N/A | — |

Restore scroll on close; avoid iOS scroll bleed via `position: fixed` on body only when drawer open (Phase 4.2 implementation note).

---

## Active states

| Item | Active when |
|------|-------------|
| Calculators | `pathname` starts with `/calculators` |
| Methodology | exact `/methodology/` |
| About | exact `/about/` |
| Browse | `/calculators/` with hash or pathname |

Active style: `font-semibold text-ink` + `border-b-2 border-lume-teal` on desktop; left border accent in drawer.

---

## Touch targets

Minimum **44×44px** (`--touch-target: 2.75rem`) for all interactive nav and drawer items.

---

## JavaScript failure behavior

- Header renders **Calculators**, **Methodology**, **About** as plain links in `<nav>` (progressive enhancement).  
- Drawer toggle requires JS — without JS, expose links in a `<noscript>` block below header:

```html
<noscript>
  <nav aria-label="Site">
    <ul>...</ul>
  </nav>
</noscript>
```

- Search requires JS — noscript points to `/calculators/`.

---

## Category visibility thresholds (summary)

| Threshold | UI change |
|-----------|-----------|
| ≥1 published calculator | Calculators link useful |
| ≥2 published in one category | Category section on directory |
| ≥1 published in second category | **Browse** appears in nav |
| ≥3 published in new category | Indexable category page + sitemap |
| ≥2 indexable category pages | Consider **Categories** label |

Statistics grandfather: indexable at 2 tools.

---

## Footer (unchanged structure, additive)

When ≥2 indexable categories:

```text
Calculator categories
  Statistics
  Math
  …
```

Footer category links only for **indexable** categories.

---

## Related documents

- IA: `Phase4_0InformationArchitecture.md`  
- Search overlay: `Phase4_0SearchAndDiscovery.md`  
- a11y budgets: `Phase4_0AccessibilityAndPerformance.md`
