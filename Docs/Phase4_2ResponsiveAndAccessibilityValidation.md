# Phase 4.2 — Responsive and Accessibility Validation

**Date:** 2026-09-02  
**Status:** Complete (regenerated after visual deduplication)  
**Capture script:** `scripts/capture-phase-4-2-screenshots.mjs`  
**Output:** `Docs/screenshots/phase-4-2/`

Screenshots taken against `out/` static build via local HTTP server. Deterministic catalog data; 250 ms settle wait after navigation/input.

---

## Viewports captured

| File | Page | Viewport |
|------|------|----------|
| `01-home-desktop-1280.png` | Homepage | 1280×900 |
| `02-home-tablet-768.png` | Homepage | 768×1024 |
| `03-home-mobile-390.png` | Homepage | 390×844 |
| `04-home-narrow-mobile-320.png` | Homepage | 320×568 |
| `05-directory-desktop-1280.png` | `/calculators/` | 1280×900 |
| `06-directory-tablet-768.png` | `/calculators/` | 768×1024 |
| `07-directory-mobile-390.png` | `/calculators/` | 390×844 |
| `08-search-results-desktop.png` | Homepage search (`mad`) | 1280×900 |
| `09-search-no-results-mobile.png` | Homepage search (`zzzznotfound`) | 390×844 |
| `10-mobile-navigation-open-390.png` | Mobile drawer open | 390×844 |

Mobile navigation uses **menu button + drawer** (not wrapping inline links) per Navigation V2 contract — screenshot 10 documents open state.

---

## Manual inspection checklist

| Check | Result | Notes |
|-------|--------|-------|
| Horizontal overflow | Pass | No clipped content at 320px |
| Header behavior | Pass | Brand + Search + Menu on mobile; full nav on desktop |
| Search alignment | Pass | Full-width hero search; header overlay aligned in container |
| Heading wrapping | Pass | H1 wraps cleanly at 320px |
| Card balance | Pass | Featured cards only; compact category summaries |
| Duplicate calculator cards | Pass | Homepage Featured only; directory Available section only |
| Duplicate Statistics sections | Pass | Directory: single Browse collections summary |
| Homepage length (mobile) | Pass | How-it-works substantially shorter |
| Compact example clarity | Pass | Result, formula, working summary, interpretation |
| Category summary scalability | Pass | Grid ready for additional categories |
| Trust strip (320px) | Pass | Stacked layout; readable; not color-only |
| Section spacing | Pass | Consistent `Section` rhythm |
| Footer layout | Pass | Stacks on mobile; 3-col from `lg` |
| Hero height | Pass | Not excessively tall — single column copy + search |
| Published above preparation | Pass | Available calculators before collection summary |
| Touch targets | Pass | Search/Menu buttons meet 44×44 minimum |
| Mobile drawer | Pass | Overlay dims content; links readable; Close visible |
| Search results UI | Pass | MAD result with category label; clear button visible |
| No-results UI | Pass | Message + browse fallback on mobile |
| Excessive blank space | Pass | None observed |
| Gradients / decorative blobs | Pass | None |
| Teal usage | Pass | Reserved for links, buttons, active indicators |

### Focus visibility

Focus rings not captured in static PNGs; verified in component styles (`focus-visible:outline-lume-teal`) and keyboard tests (drawer Escape/focus return).

---

## Accessibility validation summary

| Area | Verification |
|------|--------------|
| Navigation | `aria-current`, `aria-expanded`, drawer dialog label, Escape + focus return |
| Search | Combobox role, `aria-live` status (≥2 chars), visible min-char hint |
| Homepage | Single H1; logical H2 order |
| Directory | PageHeader H1; section H2/H3 hierarchy |
| Skip link | Existing layout skip link unchanged |

---

## Corrections during reconciliation

| Issue | Fix |
|-------|-----|
| One-char search could imply “no results” | `aria-live` only when debounced query ≥ 2; visible hint at 1 char |
| Statistics collection count wording | `countDescriptor="in this collection"` on directory Collections card |
| Current page indication | `aria-current="page"` on active nav links (desktop + drawer) |

No layout regressions required after reconciliation screenshot review.

---

## Visual deduplication pass (2026-09-02)

Screenshots regenerated after deduplication:

- Homepage Browse by category → compact category summary (no repeated calculator cards)
- Directory → Search, Available calculators, Browse collections (single Statistics summary)
- How-it-works → compact preview; pillar grid removed
- Trust strip → stacked on mobile

Before/after comparison confirms materially shorter homepage on mobile and no duplicate card groups.

---

## How to re-run

```bash
npm run build
node scripts/capture-phase-4-2-screenshots.mjs
```

Requires Playwright Chromium (`npx playwright install chromium` if missing).
