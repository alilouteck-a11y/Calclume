# CalcLume Decision Log

Chronological record of significant project decisions.

---

## 2026-08-31 — Phase 1 foundation

**Decision:** Build Phase 1 as a static-export Next.js 16 site with no backend.

**Rationale:** Calculations must run locally; static hosting is cost-effective, fast, and privacy-preserving.

**Alternatives considered:** SSR with API routes (rejected — violates local-only computation principle).

---

## 2026-08-31 — Trailing slash URLs

**Decision:** Enable `trailingSlash: true` in Next.js config.

**Rationale:** Consistent canonical URLs for static hosting; all public routes use trailing slashes except root which resolves to `https://calclume.com/`.

---

## 2026-08-31 — Statistics & Data as first cluster

**Decision:** Launch with six statistics calculators; four expansion candidates follow.

**Rationale:** Descriptive statistics tools share UI patterns (dataset input, step sequences) and validate the calculator page contract efficiently.

---

## 2026-08-31 — No indexable placeholder calculators

**Decision:** Directory pages show planning cards without links to detail routes.

**Rationale:** Prevents misleading search results and avoids publishing unfinished tools.

---

## 2026-08-31 — Scientific Luminance design system

**Decision:** Custom CSS tokens with Source Sans 3 + JetBrains Mono; no shadcn defaults.

**Rationale:** Distinctive, formula-friendly typography and calm scientific aesthetic aligned with brand positioning.

---

## 2026-08-31 — English first, curated Arabic later

**Decision:** English-only launch; architecture supports locale subpaths without CMS.

**Rationale:** Quality localization requires human curation; automatic translation is prohibited.

---

## 2026-08-31 — Contact via email only

**Decision:** Static contact page with configurable email; no form backend.

**Rationale:** Phase 1 has no backend; email link is sufficient for corrections and feedback.

---

## 2026-08-31 — Empty social links

**Decision:** Social fields in site config left empty rather than invented.

**Rationale:** Honesty requirement; populate when real profiles exist.

---

## 2026-08-31 — Vitest over Jest

**Decision:** Use Vitest for unit and component tests.

**Rationale:** Fast, ESM-native, minimal config with Vite plugin ecosystem.

---

## 2026-08-31 — Structured data scope

**Decision:** Organization + WebSite site-wide; BreadcrumbList on inner pages only.

**Rationale:** No SoftwareApplication schema until a real calculator publishes; no FAQ/review schema for SEO manipulation.

---

## 2026-08-31 — Phase 2.2A MAD calculator interaction model

**Decision:** Require explicit **Calculate MAD** action; empty initial state; no auto-calculation on keystroke.

**Rationale:** Prevents fabricated statistics from example defaults; gives users control over when parsing runs; clears stale results predictably on validation failure.

---

## 2026-08-31 — Phase 2.2A strict dataset parser

**Decision:** Token-level regex validation instead of permissive `Number()` / `parseFloat()`; max 1,000 observations.

**Rationale:** Rejects partial tokens like `12abc`; surfaces first invalid token; bounds client-side table rendering cost.

---

## 2026-08-31 — Phase 2.2A display precision selector

**Decision:** User-selectable 2 / 4 / 6 decimal places (default 4); display-only rounding with trailing-zero trim.

**Rationale:** Balances readability and user preference without altering internal calculation precision.

---

## 2026-08-31 — Phase 2.2A large-table pagination (client-side)

**Decision:** Render first 100 deviation-table rows when n > 100; expand/collapse in browser only.

**Rationale:** Avoids rendering 1,000 DOM rows initially while keeping full-dataset calculation accurate.

---

## 2026-08-31 — Phase 2.2A desktop two-column calculator layout

**Decision:** At ≥1024px, input left and result summary right; details full width below.

**Rationale:** MAD visible beside input without scrolling on desktop; mobile remains stacked.

---

## 2026-08-31 — Phase 2.2B educational content below the calculator

**Decision:** Keep the interactive MAD calculator near the top; place original educational sections after it in a fixed order (definition, formula, method, worked example, vs SD, usefulness, limitations, sources, related, last reviewed).

**Rationale:** Usefulness-first page contract; educational SEO content must not displace the working surface.

---

## 2026-08-31 — Phase 2.2B source citations for MAD

**Decision:** Cite NIST Measures of Scale (average absolute deviation about the mean) and OpenStax Introductory Statistics §2.7; explicitly distinguish NIST’s “MAD” (median absolute deviation) from mean absolute deviation.

**Rationale:** Sources must be consulted and accurate; acronym collision would otherwise confuse readers.

---

## 2026-08-31 — Phase 2.2B structured data scope for MAD

**Decision:** Publish BreadcrumbList + SoftwareApplication only; prohibit FAQ, HowTo, ratings, and review schema on the MAD page.

**Rationale:** Avoid manipulative rich-result markup; calculator identity and navigation are sufficient.

---

## 2026-08-31 — Phase 2.3 soft-launch without fabricated OG or GSC tokens

**Decision:** Ship soft-launch readiness with Twitter `summary` card while `openGraphImage` is null; document OG 1200×630 as owner-created; never commit invented Search Console verification values.

**Rationale:** Honest social/search metadata beats fake assets or tokens.

---

## 2026-08-31 — Phase 2.3 branded favicon replacement

**Decision:** Replace the create-next-app favicon with a simple CalcLume mark (ink plate + teal field + typographic C).

**Rationale:** Soft launch must not present generic Next.js branding in the browser tab.

---

## 2026-08-31 — Phase 2.3 Hostinger static export deployment model

**Decision:** Document Hostinger static hosting against `out/` only; no automatic deploy without explicit authorization.

**Rationale:** Matches `output: "export"` architecture and keeps production uploads intentional.

---

## 2026-09-01 — Phase 2.4 React Testing Library cleanup in navigation tests

**Decision:** Always call Testing Library `cleanup()` in `afterEach` for suites that `render()` React components, including navigation tests.

**Rationale:** Without cleanup, React 19’s scheduler can run after jsdom teardown (`window is not defined`), causing Vitest to exit 1 even when all assertions pass.

---

## 2026-09-01 — Phase 3.0 second calculator selection

**Decision:** PROCEED WITH CONDITIONS on a combined **Outlier and IQR Calculator** at `/calculators/statistics/outlier-iqr/`, including five-number summary, Tukey fences, outlier listing, and accessible box plot on one page. Do not ship a separate competing five-number-summary route in the next implementation phase. Defer CV, SEM, and critical-value tools.

**Rationale:** Live SERP evidence shows calculator intent across overlapping EDA queries; combining avoids cannibalization; NIST/OpenStax support fences and five-number/box-plot teaching; differentiation is credible via explicit quartile conventions and CalcLume’s transparent local-only UX. Exact keyword volumes remain unverified pending SEO tools/Search Console.
