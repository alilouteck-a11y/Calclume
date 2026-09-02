# Phase 4.0 — Scientific Luminance V2 Strategy

**Status:** Design strategy — no production implementation in Phase 4.0  
**Date:** 2026-09-02  
**Builds on:** `Docs/Phase1DesignSystem.md`, `app/globals.css`

## V2 objective

Evolve Scientific Luminance from a **single-category statistics site** aesthetic to a **multi-category calculator library** without losing calm, trust, or accessibility — and without adopting calculator-farm visual noise.

---

## Preserve (non-negotiable)

| Element | Rationale |
|---------|-----------|
| Ink / paper / teal core palette | Brand recognition; WCAG-tested contrast |
| Source Sans 3 + JetBrains Mono | Readable prose + formulas |
| No gradients, no glassmorphism, no SaaS hero blobs | Differentiation from generic tools |
| Teal focus rings (`--color-focus-ring`) | Accessibility contract |
| Calculator-before-education page order | Usefulness-first |
| Dashed “illustrative” panels on marketing pages | Honest non-interactive demos |
| Local-calculation privacy messaging | Trust pillar |

---

## V2 design tokens (implementation-ready)

**Phase 4.1:** Add tokens to `app/globals.css` and `@theme inline`.  
**Phase 4.1:** Run exact contrast verification on all foreground/background pairs — values below are **intended** WCAG 2.2 AA; not yet measured in CI.

### Semantic color roles

| Token | Value | Role | Pairing (intended AA) |
|-------|-------|------|------------------------|
| `--color-ink` | `#0B132B` | Primary text, headings | on `--color-paper`, `--color-white` |
| `--color-text-muted` | `#5D677A` | Secondary text | on paper/white |
| `--color-paper` | `#F6F8F7` | Page background | ink text |
| `--color-surface` | `#FFFFFF` | Cards, header | ink text |
| `--color-surface-subtle` | `#F0F3F2` | **NEW** inset panels | ink text |
| `--color-deep-surface` | `#121C35` | Footer CTA band | white text |
| `--color-border` | `#DDE3E1` | Default borders | — |
| `--color-border-strong` | `#B8C4C0` | **NEW** table headers | — |
| `--color-accent` | `#087A70` | Primary interactive | white button text |
| `--color-accent-hover` | `#06695F` | Hover | white button text |
| `--color-focus-ring` | `#087A70` | Focus outline | — |
| `--color-error` | `#C63E4E` | Errors | on `--color-error-bg` |
| `--color-error-bg` | `#FDF2F3` | **NEW** error surface | error text |
| `--color-success` | `#18856F` | Success | on paper |
| `--color-warning` | `#9A7B2F` | **NEW** warnings (text) | on `--color-warning-bg` |
| `--color-warning-bg` | `#FBF6E8` | **NEW** warning surface | warning text |
| `--color-warm-signal` | `#F2C66D` | Illustrative labels only | ink label text nearby |

### Category accent system (single derived family)

**Not ten independent palettes.** All category accents share:

- Same saturation band (~35–45%)  
- Same lightness band (~38–42%)  
- Hue offset only on a **teal-adjacent spectrum** (blue-teal → green-teal → neutral-warm)  
- Usage limited to: 2px left border, badge outline, directory section marker  
- **Never** used for body text, buttons, or large fills

| Token | Value | Maps to |
|-------|-------|---------|
| `--category-accent-statistics` | `#087A70` | `statistics` (= brand teal) |
| `--category-accent-math` | `#3A6E85` | `math` |
| `--category-accent-finance` | `#2A6B58` | `finance` |
| `--category-accent-business` | `#5C6358` | `business` |
| `--category-accent-everyday-life` | `#7A7048` | `everyday-life` |
| `--category-accent-date-time` | `#4A6578` | `date-time` |
| `--category-accent-conversions` | `#556570` | `conversions` |
| `--category-accent-construction` | `#6E5A48` | `construction` |
| `--category-accent-health` | `#7A4A58` | `health` |
| `--category-accent-science` | `#4A5288` | `science` |

```css
/* Phase 4.1 — resolve by category id */
--category-accent: var(--category-accent-statistics); /* default */
```

Badge on card: `border: 1px solid var(--category-accent)`; text remains `--color-ink`.

### Surface hierarchy

| Level | Token / class | Use |
|-------|---------------|-----|
| 0 | `body` / `--color-paper` | Page |
| 1 | `--color-surface` | Cards, header |
| 2 | `--color-surface-subtle` | Illustrative panels, inset |
| 3 | `--color-deep-surface` | Footer band |

### Border hierarchy

| Token | Width | Use |
|-------|-------|-----|
| `--color-border` | 1px | Cards, inputs |
| `--color-border-strong` | 1px | Table header row |
| `--category-accent` | 2px left | Category section header |
| Dashed `--color-border` | 1px | Illustrative demo panels |

### Shadow scale

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-none` | `none` | Default cards (border-only) |
| `--shadow-sm` | `0 1px 2px rgb(11 19 43 / 0.04)` | Elevated dropdown |
| `--shadow-md` | `0 4px 12px rgb(11 19 43 / 0.06)` | Search overlay (desktop) |

No `--shadow-lg`. No colored shadows.

### Radius scale

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | `0.375rem` (6px) | Badges, chips |
| `--radius-md` | `0.5rem` (8px) | Buttons, inputs |
| `--radius-lg` | `0.75rem` (12px) | Cards |

### Spacing scale

| Token | Value | Use |
|-------|-------|-----|
| `--space-1` | `0.25rem` | Tight gaps |
| `--space-2` | `0.5rem` | Inline |
| `--space-3` | `0.75rem` | Form fields |
| `--space-4` | `1rem` | Card padding base |
| `--space-6` | `1.5rem` | Section gaps |
| `--space-8` | `2rem` | Calculator columns |
| `--space-section-sm` | `2.5rem` | Mobile section |
| `--space-section` | `4rem` | Desktop section |
| `--touch-target` | `2.75rem` (44px) | Minimum tap |

### Container widths

| Token | Value | Use |
|-------|-------|-----|
| `--container-prose` | `65ch` | Educational content |
| `--container-content` | `72rem` | `max-w-6xl` site |
| `--container-narrow` | `42rem` | Hero subcopy |

### Typography scale

| Token | Size / line-height | Use |
|-------|-------------------|-----|
| `--text-display` | `2.25rem / 1.2` (36px) | Homepage H1 |
| `--text-h1` | `1.875rem / 1.25` (30px) | Calculator page H1 |
| `--text-h2` | `1.375rem / 1.3` (22px) | Prose h2 |
| `--text-h3` | `1.125rem / 1.35` (18px) | Prose h3 |
| `--text-body` | `1rem / 1.6` (16px) | Body |
| `--text-small` | `0.875rem / 1.5` (14px) | Trust strip, meta |
| `--text-result-primary` | `1.5rem / 1.3` (24px), semibold | Primary answer |
| `--text-result-secondary` | `1.125rem / 1.4` (18px), medium | Secondary metrics |
| `--font-size-formula` | `0.9375rem / 1.6` | `.formula-block` |
| Letter-spacing display | `-0.02em` | H1 only |

**Fonts:** Source Sans 3 (`--font-sans`), JetBrains Mono (`--font-mono`).

### Formula typography

```css
.formula-block {
  font-family: var(--font-mono);
  font-size: var(--font-size-formula);
  line-height: var(--line-height-formula);
  overflow-x: auto;
  word-break: break-word;
  background: var(--color-surface-subtle);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}
```

### Result typography

- Primary: `--text-result-primary`, `color: var(--color-ink)`  
- Secondary: `--text-result-secondary`, `color: var(--color-text-muted)`  
- Labels above results: `--text-small`, uppercase tracking optional — **avoid** all-caps for sentences

### Card variants

| Variant | Border | Background | Link |
|---------|--------|------------|------|
| `card-default` | `1px border` | `surface` | optional |
| `card-published` | + category 2px top OR left accent | `surface` | full card `<a>` |
| `card-preparation` | dashed `border` | `surface-subtle` | none |
| `card-category` | `1px border` | `surface` | to category hub |

### Button variants

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| `primary` | `--color-accent` | white | none |
| `primary:hover` | `--color-accent-hover` | white | — |
| `secondary` | transparent | `--color-accent` | `1px solid --color-accent` |
| `ghost` | transparent | `--color-ink` | none |
| `disabled` | `border` 40% opacity | muted | — |

Min height: `--touch-target`.

### Focus ring

```css
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
```

No `outline: none` without replacement.

### Error / warning / success

| State | Text | Background | Border |
|-------|------|------------|--------|
| Error | `--color-error` | `--color-error-bg` | `1px solid` error @ 30% |
| Warning | `--color-warning` | `--color-warning-bg` | same pattern |
| Success | `--color-success` | paper | none |

Stale notice uses **warning** tokens.

### Table treatment

- Wrapper: `.table-scroll`  
- Header: `background: var(--color-surface-subtle)`; `border-bottom: 2px solid var(--color-border-strong)`  
- Cells: `padding: var(--space-2) var(--space-3)`  
- Zebra: **optional** even rows `surface-subtle` at 50% opacity — test contrast in 4.1  
- `scope="col"` / `scope="row"` required

### Chart treatment (SVG)

- Stroke ink @ 85% opacity; median heavier  
- Fences: dashed, muted  
- Outliers: open circles + `aria-label`  
- No chart library colors — use ink, teal, warm-signal only  
- Always pair with visible prose summary + sr-only table

### Icon rules

- **No emoji icons** (Phase 1)  
- Phase 4.x: inline SVG only if needed; `aria-hidden="true"` decorative  
- Prefer text labels over icons for search, menu, close  
- Icon touch target still 44px

### Motion rules

```css
@media (prefers-reduced-motion: reduce) {
  /* existing global reduction */
}
```

- No autoplay  
- Drawer/search: opacity + transform ≤200ms; disabled under reduced motion  
- No parallax, no scroll-jacking

### Dark mode

**Decision: Defer** to Phase 5+. Light mode only in Phase 4.x. Do not add `prefers-color-scheme` overrides yet.

---

## V2 component additions

### 2. Trust strip (calculator pages)

Compact horizontal strip **above** `CalculatorShell`:

```text
Local calculation · Sources below · Last reviewed [date]
```

Links to Methodology and on-page Sources anchor. Reinforces differentiation vs ad farms.

### 3. Directory layout V2

| Zone | Content |
|------|---------|
| Hero | Global value prop (not statistics-specific) |
| Featured | 2–4 recently published or highlighted tools |
| By category | Sections appear only when category has ≥1 published tool |
| Preparation | Collapsed or statistics-pipeline-only until multi-category pipeline exists |

### 4. Category collection template

Reusable layout distinct from calculator detail:

- Category H1 + one-paragraph scope statement
- Published tools grid (linked cards)
- “In development” subsection optional, **no links**
- Cross-link to Methodology for convention policy

### 5. Card variants

| Variant | Use |
|---------|-----|
| `CalculatorCard` published | Existing — keep |
| `CalculatorCard` preparation | Existing — keep |
| `CategoryCard` (new) | Directory: category name, count, 1-line description |
| `RelatedCalculatorCard` linked | **Improve** — wrap in `<a>` when published |

### 6. Result hierarchy extensions

Core four blocks remain universal:

1. Answer / summary  
2. Formula  
3. Steps  
4. Interpretation  

Category extensions (optional fifth block):

| Category | Extension |
|----------|-----------|
| Statistics | Chart/table (box plot, deviation table) |
| Finance | Amortization schedule (paginated) |
| Conversions | Factor citation block |
| Date & Time | Calendar assumption callout |

### 7. Navigation V2

**Primary nav (target):**

```text
Calculators · Methodology · About
```

Remove **Statistics** from primary nav. Category discovery via `/calculators/` and in-page breadcrumbs.

**Footer:** Add “Calculator categories” column when ≥2 indexable categories exist.

### 8. Typography refinements

| Token | Change |
|-------|--------|
| `--text-display` | Slightly tighter letter-spacing on H1 (-0.02em) |
| Category H1 | Use display size; calculator H1 stays `text-2xl`/`3xl` |
| `.prose-content` | Add `max-width: 65ch` on education sections for long-form readability |

### 9. Mobile

- Preserve single-column calculator stack
- **Defer** sticky section nav for long education blocks
- Trust strip wraps to 2 lines max

### 10. Dark mode

**Defer** to Phase 5+. If added, derive from same tokens — no new brand palette.

---

## Replace

| Current | V2 target |
|---------|-----------|
| Statistics-centric homepage copy | Library-first copy with featured tools |
| Statistics in primary nav | Directory-first navigation |
| Non-clickable related cards for published tools | Linked related cards |

---

## Defer

- Global search UI and client-side index
- Category illustrations or custom icons per tool
- Animated transitions
- Dark mode
- Category mega-menus

---

## Implementation phases (documentation only)

| Phase | Scope |
|-------|-------|
| 4.1 | Category registry, Math route scaffold, nav V2, directory refresh |
| 4.2 | Client-side search over published index |
| 4.3 | Category accent tokens in CSS |
| 4.4 | Trust strip component on calculator pages |

---

## Anti-patterns (V2)

- Rainbow category tiles (Omni-style)
- Stock calculator icons per card
- Gradient CTAs
- Hiding steps behind “Show more” paywalls
- Fake review stars or FAQ schema
