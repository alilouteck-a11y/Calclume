# Phase 1 Accessibility Strategy

**Status:** Locked for Phase 1

## Targets

- WCAG 2.1 Level AA alignment as a goal (not formally certified in Phase 1)
- Mobile-first responsive behavior from 320px width
- Minimal client-side JavaScript; Server Components by default

## Structural accessibility

- Skip-to-content link (`SkipLink`) as first focusable element
- Logical heading hierarchy (one h1 per page)
- Semantic HTML throughout (`nav`, `main`, `section`, `article`, `aside`, `figure`)
- `lang="en"` on html element

## Keyboard and focus

- All interactive elements keyboard accessible
- Visible focus indicators on all focusable elements
- Minimum touch target sizing (44px height on buttons and nav links)

## Forms and calculator inputs

- All form controls have associated labels
- Descriptions linked via `aria-describedby`
- Errors linked via `aria-describedby` and `role="alert"`
- Invalid state via `aria-invalid`

## Live regions

- Calculator results announced via `aria-live="polite"` on result panel
- Copy button feedback via polite live region
- Error notices use `role="alert"`

## Tables

- `ResultTable` uses `<caption>` (sr-only), `<th scope="col">`, horizontal scroll wrapper
- Usable on mobile via `.table-scroll`

## Motion

- `prefers-reduced-motion` disables animations and smooth scroll

## Color and contrast

- Ink on paper/white meets contrast requirements
- Teal accent used for links with hover state
- Error and success colors distinct from body text

## Testing

- Component tests verify label association, live regions, keyboard interaction
- No automated Lighthouse audit documented in Phase 1 (manual validation recommended)

## Future calculator accessibility

- Example selector must not be the only input method
- Step sequences readable by screen readers in order
- Formula blocks available as plain text (not image-only)
