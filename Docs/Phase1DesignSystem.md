# Phase 1 Design System — Scientific Luminance

**Status:** Locked for Phase 1

## Brand character

Precise, calm, trustworthy, mathematical, modern, transparent, approachable.

## Color palette

| Token | Value | Usage |
|-------|-------|-------|
| Ink | `#0B132B` | Primary text, headings |
| Deep surface | `#121C35` | Dark sections, footer CTA |
| Lume teal | `#087A70` | Primary interactive (links, buttons, focus) — WCAG AA |
| Lume teal bright | `#18B8A6` | Decorative accents (borders, light fills) |
| Teal hover | `#06695F` | Hover states |
| Warm signal | `#F2C66D` | Illustrative labels, warnings |
| Paper | `#F6F8F7` | Page background |
| White | `#FFFFFF` | Card and header surfaces |
| Muted | `#5D677A` | Secondary text |
| Border | `#DDE3E1` | Borders and dividers |
| Error | `#C63E4E` | Error states |
| Success | `#18856F` | Success states |

Tokens are defined in `app/globals.css` as CSS custom properties and mapped to Tailwind via `@theme inline`.

## Typography

- **Body:** Source Sans 3 — readable, professional
- **Formulas/code:** JetBrains Mono — monospace for formulas, steps, and data

Formula blocks use the `.formula-block` class with overflow handling for mobile.

## Layout

- Max content width: 72rem (`max-w-6xl`)
- Section padding: responsive (`py-10 sm:py-16`)
- Medium corner radii (`rounded-md`, `rounded-lg`)
- Restrained borders, minimal shadows

## Components

### UI primitives

- `Container`, `Section`, `Button`, `Badge`, `Card`

### Layout

- `Header`, `Footer`, `SkipLink`, `Breadcrumbs`, `PageHeader`

### Calculator (Phase 2 ready)

- Full set documented in Calculator Page Contract

## Visual prohibitions

- No generic shadcn default appearance
- No excessive gradients, glassmorphism, neon effects
- No decorative blobs or stock imagery
- No huge rounded cards or dashboard styling
- No emoji icons (use text and semantic HTML)

## Motion

- Respect `prefers-reduced-motion`
- No unnecessary animation
- Smooth scroll disabled under reduced motion

## Calculator page viewport priority

The first viewport of future calculator pages must prioritize the working surface, not a large marketing hero.

## Light mode first

Phase 1 ships light mode only. Dark mode tokens are not implemented.

## Accessibility in design

- Visible focus rings (teal, 2px offset)
- Minimum touch target: 44px (`min-h-11`)
- Accessible contrast on all text/background pairs
- Error and notice styles with distinct color coding
