# Phase 4.2.1 — Production Validation Report

**Date:** 2026-09-02  
**Status:** Complete — awaiting approval to commit

---

## 1. Phase status

Phase 4.2.1 complete. Stopped before Phase 4.3. Nothing committed or pushed.

---

## 2. Confirmed root cause (MAD header)

Source and live HTML use one shared root-layout `Header`. MAD never rendered a separate legacy primary nav in the Phase 4.2 codebase.

Reported “Statistics” on MAD is explained by:

- Breadcrumb trail includes Statistics (correct, not primary nav), and/or
- Possible transient CDN/cache during the initial Phase 4.2 deploy

Live MAD and Outlier primary nav are identical: Calculators · Methodology · About · Search.

---

## 3. Implementation change

- Added `aria-label="Site"` to shared `Header` banner
- Added shell + static-export regression tests
- Added directory reliability script against `out/`
- **No calculator math, route, metadata, or sitemap changes**

---

## 4–5. Directory failure reproduction

| Step | Result |
|------|--------|
| `npm run build` (Webpack static export) | Pass — 18 pages |
| Serve `out/` via local static HTTP | Pass |
| Direct open `/calculators/` | Pass — H1 + search |
| Reload | Pass |
| Navigate from homepage | Pass |
| Back / forward | Pass |
| Search after direct entry and client navigation | Pass (`mad`, `iqr`) |
| Console / page errors | None |

**Classification:**  
`Automation/browser-session anomaly — not reproduced in production export`

No speculative error suppression or defensive rewrites were added.

Script: `scripts/verify-phase-4-2-1-directory.mjs`

---

## 6. Files created and modified

See `Phase4_2_1LiveNavigationConsistency.md`.

---

## 7. Navigation consistency results

| Page | Primary nav | Statistics in primary | Search control |
|------|-------------|----------------------|----------------|
| Homepage | Calculators · Methodology · About | Absent | Present |
| Directory | Same | Absent | Present |
| MAD | Same | Absent (breadcrumb only) | Present |
| Outlier/IQR | Same | Absent (breadcrumb only) | Present |
| Methodology / About | Same | Absent | Present |

Mobile drawer destinations identical: Calculators · Methodology · About · Contact.

Exactly one `banner` landmark named “Site”; exactly one Primary navigation landmark.

---

## 8. Desktop and mobile validation

Viewports: 1280, 768, 390, 320.

| Check | Result |
|-------|--------|
| Horizontal overflow | None on homepage, directory, MAD, Outlier |
| Header consistency | Pass |
| Mobile drawer open (390) | Pass |
| MAD calc `12,15,14,10,19` → 2.4 | Pass |
| Console / page errors | None |

---

## 9. Accessibility

| Check | Result |
|-------|--------|
| Primary nav accessible name | `Primary` |
| Site banner accessible name | `Site` |
| Breadcrumb separate landmark | `Breadcrumb` (may contain Statistics) |
| Search accessible name | Search calculators |
| Mobile Escape / focus return | Covered by existing + new tests |

---

## 10–13. Command verification

| Command | Result |
|---------|--------|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm test -- --run` | **286** passed, exit 0 |
| `npm run build` | Pass — Webpack, 18 static pages |

---

## 14. Sitemap

Exactly **12** URLs. Unchanged.

---

## 15. Calculator mathematics

Unchanged. MAD engine/UI/config untouched; smoke confirmed MAD = 2.4 for the standard dataset.

---

## 16. Remaining manual checks

- After deploy of 4.2.1, hard-refresh MAD on production and confirm Primary nav (ignore breadcrumb Statistics)
- Confirm Hostinger CDN serves updated `layout-*.js` / HTML for all calculator paths
- Optional: clear Hostinger/browser cache if any visitor still reports legacy chrome

---

## 17–18. Git

Uncommitted local Phase 4.2.1 changes only. **Nothing committed or pushed** in this phase.
