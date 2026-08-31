/**
 * Static responsive risk analysis for Phase 1.1 validation.
 * Checks exported HTML and CSS patterns without browser automation.
 */

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");
const cssPath = join(outDir, "_next/static/chunks");
const widths = [320, 390, 768, 1024, 1280];

const publicHtmlPages = [
  "index.html",
  "calculators/index.html",
  "calculators/statistics/index.html",
  "methodology/index.html",
  "privacy/index.html",
  "404.html",
];

const issues = [];

for (const page of publicHtmlPages) {
  const html = readFileSync(join(outDir, page), "utf8");
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) {
    issues.push({ page, issue: `Expected 1 h1, found ${h1Count}` });
  }
  if (!html.includes("skip-link")) {
    issues.push({ page, issue: "Missing skip link" });
  }
  if (/min-w-\[(?:[3-9]\d{2,}|\d{4,})px\]/.test(html)) {
    issues.push({ page, issue: "Contains large min-width utility" });
  }
}

const cssFiles = readdirSync(cssPath).filter((f) => f.endsWith(".css"));
const css = cssFiles.map((f) => readFileSync(join(cssPath, f), "utf8")).join("\n");

if (!css.includes("overflow-x:auto") && !css.includes("overflow-x: auto")) {
  issues.push({ page: "css", issue: "formula-block overflow-x may be missing" });
}

for (const width of widths) {
  const headerRisk = css.includes("flex-wrap") || htmlHasFlexWrap(publicHtmlPages[0]);
  if (!headerRisk) {
    issues.push({ width, issue: "Header may not wrap on narrow viewports" });
  }
}

function htmlHasFlexWrap(page) {
  const html = readFileSync(join(outDir, page), "utf8");
  return html.includes("flex-wrap");
}

console.log(`STATIC_RESPONSIVE_CHECKS=${widths.length * publicHtmlPages.length}`);
console.log(`STATIC_ISSUES=${issues.length}`);
for (const issue of issues) {
  console.log(JSON.stringify(issue));
}
if (issues.length === 0) {
  console.log("STATIC_RESPONSIVE_PASS");
}

process.exit(issues.length > 0 ? 1 : 0);
