# Phase 2.3 — Post-Deployment Checklist

Complete after uploading `out/` to production. Do not mark soft launch done until critical items pass.

## HTTP and routing

- [ ] Homepage returns HTTP 200 at `https://calclume.com/`
- [ ] MAD route returns HTTP 200 at `https://calclume.com/calculators/statistics/mean-absolute-deviation/`
- [ ] Trailing-slash URLs do not redirect-loop
- [ ] Unknown path serves the custom 404 page
- [ ] Canonical tags use `https://calclume.com/...` (not HTTP, not localhost)

## Discovery files and assets

- [ ] `https://calclume.com/sitemap.xml` loads and lists the MAD route once
- [ ] `https://calclume.com/robots.txt` loads and references the production sitemap
- [ ] Favicon loads (`/favicon.ico` and/or `/icon.png`)
- [ ] External NIST and OpenStax source links open correctly

## Calculator behavior (desktop + phone)

- [ ] Empty initial state shows empty-result message
- [ ] Calculate MAD works for `12, 15, 14, 10, 19` → MAD 2.4
- [ ] Invalid input shows an error and clears stale results
- [ ] Copy result works (clipboard permission may require HTTPS + user gesture)
- [ ] Reset returns to empty initial state
- [ ] Large-table expand/collapse works for >100 values

## Quality / accessibility (manual)

- [ ] Production Lighthouse (Performance / Accessibility / Best Practices / SEO)
- [ ] Real VoiceOver (or TalkBack) spot-check of MAD calculator controls
- [ ] Keyboard-only pass: skip link, nav, dataset, example, precision, Calculate, Reset, Copy, table toggle, footer

## Search Console (owner only)

- [ ] Create Google Search Console property for `https://calclume.com`
- [ ] Verify ownership with a **real** verification method (DNS TXT, HTML file, or meta tag provided by Google)
- [ ] Submit `https://calclume.com/sitemap.xml`
- [ ] Request indexing for homepage
- [ ] Request indexing for MAD calculator

Do **not** invent or commit a fabricated verification token.
