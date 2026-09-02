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

---

## 2026-09-01 — Phase 3.1 Outlier/IQR mathematical conventions

**Decision:** Default quartile method **`exclusive-halves`** (median of halves, exclude middle when odd). Alternate **`excel-r7`** (Excel PERCENTILE.INC / Hyndman–Fan type 7). Default fence multiplier **1.5×IQR**; optional **3.0×IQR**. Minimum **4** observations; maximum **1000** via shared parser. Outlier classification uses strict `<` / `>` (values on fences are not outliers). Whiskers at extreme non-outlier observations. Reuse `parseDataset()` unchanged. Accessible box plot via inline SVG + textual summary.

**Rationale:** Exclusive halves matches OpenStax verified examples and Langford Method 2 / Moore & McCabe teaching; Excel alternate covers spreadsheet users without multiplying quantile options; n ≥ 4 avoids degenerate empty-half quartiles; strict fence boundaries are reproducible without arbitrary epsilon.

---

## 2026-09-01 — Phase 3.2 pure-engine validation and whisker invariant

**Decision:** `calculateOutlierIqr()` validates count (4–1000), finite values, and supported method/multiplier at runtime independent of `parseDataset()`. Whisker endpoints use only non-outlier observations; empty non-outlier set throws (mathematically unreachable for valid inputs).

**Rationale:** Defensive pure layer for direct numeric calls and tests; documented invariant replaces undocumented min/max whisker fallback.

---

## 2026-09-02 — Phase 3.3 Outlier/IQR UI stale-result policy

**Decision:** After a successful calculation, changing dataset text, quartile method, or fence multiplier keeps the last result visible with a stale notice and hides copy until recalculate. Changing display precision alone does not mark the result stale. Failed Calculate clears the snapshot.

**Rationale:** Matches Phase 3.1 product contract; avoids losing context while making copy/export depend on current inputs.

---

## 2026-09-02 — Phase 3.3 observation-table expansion policy

**Decision:** Render the first 100 classification-table rows when `n > 100`; provide expand/collapse in the UI only. New calculation and reset collapse the table. The engine always processes the full dataset.

**Rationale:** Parity with MAD large-table UX; keeps DOM size bounded for 1,000-observation limit.

---

## 2026-09-02 — Phase 3.3 large-outlier-list expansion policy

**Decision:** Show the first 20 lower or upper outliers per side when count exceeds 20; toggle `Show [k] more` / `Show first 20`. List entries use `index-value` keys so duplicate values remain distinct.

**Rationale:** Implements Phase 3.1 contract; prevents long outlier lists from dominating the page while preserving per-observation identity.

---

## 2026-09-02 — Phase 3.3 accessible box plot approach

**Decision:** Inline SVG box plot with `role="img"`, visible prose summary, `<desc>` duplication, and `sr-only` data table. Engine supplies `boxPlot.domainMin/Max`; coordinate mapping occurs only in the component. Fences use dashed strokes; median uses heavier stroke; outliers use labeled open circles. No chart library.

**Rationale:** Locked in Phase 3.1; satisfies non-color-only and no-hover requirements while staying static-export friendly.

---

## 2026-09-02 — Phase 3.4 Outlier/IQR page publication

**Decision:** Publish `/calculators/statistics/outlier-iqr/` via `publishedCalculatorRoutes`; educational worked example uses verified fixture **F02** (`high-outlier`: one upper outlier at 100). Remove the separate `five-number-summary-box-plot` launch-candidate card (scope bundled into Outlier/IQR per Phase 3.0).

**Rationale:** F02 demonstrates the calculator’s primary outlier-detection purpose with engine-verified numbers; a no-outlier example (F05) under-served user intent. Separate five-number route would cannibalize the combined page.

---

## 2026-09-02 — Phase 4.0 multi-category architecture

**Decision:** Adopt `/calculators/[category]/[calculator]/` URL taxonomy with kebab-case stable slugs; ten top-level categories (Math, Statistics, Finance, Business, Everyday Life, Date & Time, Conversions, Construction, Health, Science); **no indexable empty category pages**.

**Rationale:** Scales the library without flat URL sprawl or synonym-split routes; matches existing Statistics paths; defers Construction and Health until editorial/YMYL capacity exists.

---

## 2026-09-02 — Phase 4.0 category publication gate

**Decision:** New categories require **3 published calculators** before an indexable `/calculators/[category]/` landing page and sitemap entry. Statistics category page may remain indexable at **2** tools (grandfather) until a third statistics calculator ships.

**Rationale:** Prevents thin hub pages; maintains Phase 1 honest-publication policy; Statistics is the founding cluster with an existing live collection page.

---

## 2026-09-02 — Phase 4.0 navigation model

**Decision:** Remove category-specific items (e.g. Statistics) from primary navigation in favor of **Calculators · Methodology · About**; category discovery via directory and breadcrumbs.

**Rationale:** Primary nav cannot scale to ten categories; directory-first IA matches multi-category positioning.

---

## 2026-09-02 — Phase 4.0 third calculator recommendation

**Decision:** Recommend **Percentage Calculator** in **Math** as the third calculator candidate, subject to a **separate SEO opportunity-validation phase** (mirror Phase 3.0). Do not authorize implementation until validation completes.

**Rationale:** Expands into a second category to prove multi-category registry and UX; low YMYL; strong step-by-step differentiation. If validation fails, fall back to Coefficient of Variation (Statistics).

---

## 2026-09-02 — Phase 4.0 Scientific Luminance V2

**Decision:** Extend design system with restrained per-category accent tokens, calculator trust strip (local · sources · last reviewed), directory V2 layout, and linked related-calculator cards for published tools — without gradients, ads, or calculator-farm visual patterns.

**Rationale:** Visual evolution must support category breadth while preserving calm, trustworthy Scientific Luminance identity.

---

## 2026-09-02 — Phase 4.0 reconciliation (architecture contracts)

**Decision:** Complete Phase 4.0 with implementation-ready contracts: unified `calculator-catalog.ts` source of truth (derived publication gate), client-side search without external deps, Homepage/Nav/Calculator Page V2 hierarchies, Scientific Luminance V2 token spec, a11y/performance budgets, SEO safeguards, four-dimension risk model (YMYL / Safety / Formula-unit / Editorial cost), and migration phases 4.1–4.5.

**Rationale:** Original Phase 4.0 batch lacked explicit IA, catalog, search, shell, a11y, SEO, and migration contracts; reconciliation maps every deliverable without duplicating shallow content. Construction risk corrected — not auto-YMYL; high safety/formula/editorial cost. Categories in primary nav deferred until second category publishes; use Browse link then Categories label.

**Corrections:** `published-calculators.ts` becomes derived shim, not parallel registry. Percentage Calculator remains candidate-only pending separate SEO validation — not authorized in 4.1.
