import { describe, expect, it } from "vitest";
import { publishedCalculatorRoutes } from "@/lib/published-calculators";
import { sitemapRoutes } from "@/lib/routes";
import { madCalculatorConfig } from "@/lib/calculators/mean-absolute-deviation-config";

describe("published calculator routes", () => {
  it("includes mean absolute deviation in published routes", () => {
    expect(publishedCalculatorRoutes).toContain(madCalculatorConfig.path);
  });

  it("does not include unpublished calculator slugs", () => {
    expect(publishedCalculatorRoutes).not.toContain(
      "/calculators/statistics/outlier-iqr/",
    );
  });
});

describe("sitemap coverage", () => {
  it("includes published calculator routes beyond base public routes", () => {
    const combined = [...sitemapRoutes, ...publishedCalculatorRoutes];
    expect(combined).toContain("/calculators/statistics/mean-absolute-deviation/");
    expect(combined.length).toBe(sitemapRoutes.length + publishedCalculatorRoutes.length);
  });
});
