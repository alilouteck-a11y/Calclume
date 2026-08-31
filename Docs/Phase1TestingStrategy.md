# Phase 1 Testing Strategy

**Status:** Locked for Phase 1

## Test stack

- **Vitest** — test runner
- **React Testing Library** — component tests
- **jsdom** — DOM environment
- **TypeScript** — strict type checking (`tsc --noEmit`)
- **ESLint** — lint validation

## Required checks

| Check | Command | Purpose |
|-------|---------|---------|
| TypeScript | `npm run typecheck` | Strict mode validation |
| ESLint | `npm run lint` | Code quality |
| Unit/integration tests | `npm run test` | Focused behavioral tests |
| Production build | `npm run build` | Static export succeeds |

## Test categories

### Configuration tests

- Site config domain, email, empty social links
- Route list completeness and trailing slash convention

### Metadata tests

- Canonical URLs, metadataBase, OG/Twitter fields
- Homepage vs inner page title formats

### Structured data tests

- Organization and WebSite schema shape
- BreadcrumbList generation and null for empty

### Navigation tests

- Primary nav and footer link integrity
- Skip link presence

### Calculator primitive tests

- Label/error association on DatasetInput
- aria-live on result panel
- Semantic structure for formula and steps
- Keyboard interaction on ResetButton
- Accessible table rendering

### Route guard tests

- No calculator detail pages in app directory
- Only expected calculator directory routes exist

### Sitemap integrity

- Sitemap routes match public routes list
- No calculator detail slugs in sitemap

## Explicit exclusions

- No uncontrolled full-page snapshots
- No Lighthouse score claims without measurement
- No redundant tests for static prose content

## Test fixtures

- `__tests__/fixtures/calculator-primitives.tsx` — non-indexed component fixture
- No public component playground route

## CI recommendation (future)

Run `typecheck`, `lint`, `test`, and `build` in sequence on every push.
