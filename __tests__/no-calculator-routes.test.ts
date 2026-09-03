import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { statisticsCalculators } from "@/lib/calculator-portfolio";
import {
  isCalculatorPublished,
  publishedCalculatorRoutes,
} from "@/lib/published-calculators";

const appDir = join(process.cwd(), "app");

function collectPageRoutes(dir: string, base = ""): string[] {
  const routes: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      routes.push(...collectPageRoutes(fullPath, `${base}/${entry}`));
      continue;
    }

    if (entry === "page.tsx") {
      routes.push(base || "/");
    }
  }

  return routes;
}

describe("calculator route publication", () => {
  it("publishes only approved calculator detail routes", () => {
    const routes = collectPageRoutes(appDir);
    const calculatorDetailRoutes = routes.filter(
      (route) =>
        route.startsWith("/calculators/") &&
        route !== "/calculators" &&
        route !== "/calculators/statistics" &&
        !route.includes("["),
    );

    expect(calculatorDetailRoutes).toEqual([
      "/calculators/statistics/mean-absolute-deviation",
      "/calculators/statistics/outlier-iqr",
    ]);
  });

  it("does not create filesystem routes for unpublished category hubs", () => {
    const routes = collectPageRoutes(appDir);
    expect(routes).toContain("/calculators/statistics");
    expect(routes).not.toContain("/calculators/math");
    expect(routes).not.toContain("/calculators/finance");
    expect(routes).not.toContain("/calculators/[category]");
  });

  it("does not publish unpublished calculator slugs", () => {
    const routes = collectPageRoutes(appDir);
    const unpublishedSlugs = statisticsCalculators
      .map((calculator) => calculator.slug)
      .filter((slug) => !isCalculatorPublished(slug));

    for (const slug of unpublishedSlugs) {
      const detailRoute = routes.find((route) => route.includes(slug));
      expect(detailRoute).toBeUndefined();
    }
  });

  it("matches published route registry", () => {
    expect(publishedCalculatorRoutes).toEqual([
      "/calculators/statistics/mean-absolute-deviation/",
      "/calculators/statistics/outlier-iqr/",
    ]);
  });
});
