import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getSitemapPaths } from "@/app/sitemap";
import { primaryNavRoutes } from "@/lib/routes";
import { publishedCalculatorRoutes } from "@/lib/published-calculators";

const outRoot = join(process.cwd(), "out");

function readExport(relativePath: string): string {
  const filePath = join(outRoot, relativePath);
  expect(existsSync(filePath), `missing export: ${relativePath}`).toBe(true);
  return readFileSync(filePath, "utf8");
}

function extractPrimaryNavLabels(html: string): string[] {
  const match = html.match(/aria-label="Primary"[\s\S]*?<\/nav>/);
  expect(match).not.toBeNull();
  return [...match![0].matchAll(/>(Calculators|Statistics|Methodology|About)</g)].map(
    (entry) => entry[1]!,
  );
}

function extractSiteHeader(html: string): string {
  const match = html.match(/<header[\s\S]*?<\/header>/);
  expect(match).not.toBeNull();
  return match![0];
}

describe("Phase 4.2.1 static export navigation parity", () => {
  it("exports identical Phase 4.2 primary navigation across public pages", () => {
    const pages = [
      "index.html",
      "calculators/index.html",
      "calculators/statistics/mean-absolute-deviation/index.html",
      "calculators/statistics/outlier-iqr/index.html",
      "methodology/index.html",
      "about/index.html",
    ];

    const expected = primaryNavRoutes.map((route) => route.label);
    const navSets = pages.map((page) => {
      const html = readExport(page);
      expect(html).not.toMatch(/localhost|127\.0\.0\.1|staging/i);
      const header = extractSiteHeader(html);
      expect(header).toContain('aria-label="Site"');
      expect(header).toContain("Search");
      expect(header).not.toMatch(/>Statistics</);
      return extractPrimaryNavLabels(html);
    });

    for (const labels of navSets) {
      expect(labels).toEqual(expected);
    }

    expect(new Set(navSets.map((labels) => labels.join("|"))).size).toBe(1);
  });

  it("keeps Statistics in MAD breadcrumbs while excluding it from site header", () => {
    const html = readExport(
      "calculators/statistics/mean-absolute-deviation/index.html",
    );
    const header = extractSiteHeader(html);
    expect(header).not.toContain("Statistics");
    expect(html).toMatch(/aria-label="Breadcrumb"[\s\S]*?>Statistics</);
  });

  it("keeps sitemap and published calculator inventory unchanged", () => {
    expect(getSitemapPaths()).toHaveLength(12);
    expect(publishedCalculatorRoutes).toHaveLength(2);
    expect(existsSync(join(outRoot, "calculators/index.html"))).toBe(true);
  });
});
