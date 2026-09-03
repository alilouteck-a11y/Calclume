import { describe, expect, it } from "vitest";
import {
  CATEGORY_ACCENT_TOKENS,
  CATEGORY_ICON_KEYS,
  DEFAULT_CATEGORY_INDEX_THRESHOLD,
  STATISTICS_GRANDFATHER_INDEX_THRESHOLD,
  calculatorCategories,
  getCategoryById,
  getCategoryBySlug,
} from "@/lib/calculator-categories";
import {
  getIndexableCategories,
  getPublicCategories,
  getSitemapEligibleCategoryRoutes,
  getVisibleCategories,
  isCategoryIndexable,
  isCategoryPublic,
  isCategorySitemapEligible,
  isCategoryVisible,
  wouldCategoryBeIndexable,
} from "@/lib/calculator-category-publication";
import { calculatorCatalog } from "@/lib/calculator-catalog";
import { getSitemapPaths } from "@/app/sitemap";
import { existsSync } from "node:fs";
import { join } from "node:path";

const RISK = new Set(["low", "medium", "high", "very-high"]);
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe("category registry integrity", () => {
  it("has unique ids, slugs, and routes", () => {
    const ids = calculatorCategories.map((category) => category.id);
    const slugs = calculatorCategories.map((category) => category.slug);
    const routes = calculatorCategories.map((category) => category.route);
    expect(new Set(ids).size).toBe(10);
    expect(new Set(slugs).size).toBe(10);
    expect(new Set(routes).size).toBe(10);
  });

  it("uses kebab-case slugs and /calculators/[category]/ routes", () => {
    for (const category of calculatorCategories) {
      expect(category.slug).toMatch(KEBAB);
      expect(category.id).toBe(category.slug);
      expect(category.route).toBe(`/calculators/${category.slug}/`);
      expect(CATEGORY_ACCENT_TOKENS).toContain(category.accentToken);
      expect(CATEGORY_ICON_KEYS).toContain(category.iconKey);
      expect(RISK.has(category.ymylRisk)).toBe(true);
      expect(RISK.has(category.safetyRisk)).toBe(true);
      expect(RISK.has(category.formulaUnitRisk)).toBe(true);
      expect(RISK.has(category.editorialCost)).toBe(true);
      expect(category.minimumPublishedCalculators).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps Construction YMYL separate from safety/editorial risk", () => {
    const construction = getCategoryById("construction");
    expect(construction?.ymylRisk).toBe("medium");
    expect(construction?.safetyRisk).toBe("high");
    expect(construction?.priority).toBe("defer");
  });

  it("requires every calculator categoryId to exist in the registry", () => {
    for (const entry of calculatorCatalog) {
      expect(getCategoryById(entry.categoryId)).toBeDefined();
    }
  });

  it("resolves categories by slug", () => {
    expect(getCategoryBySlug("statistics")?.name).toBe("Statistics");
    expect(getCategoryBySlug("missing")).toBeUndefined();
  });
});

describe("category publication policy", () => {
  it("marks Statistics visible and indexable with two published calculators", () => {
    expect(isCategoryVisible("statistics")).toBe(true);
    expect(isCategoryPublic("statistics")).toBe(true);
    expect(isCategoryIndexable("statistics")).toBe(true);
    expect(isCategorySitemapEligible("statistics")).toBe(true);
    expect(getCategoryById("statistics")?.minimumPublishedCalculators).toBe(
      STATISTICS_GRANDFATHER_INDEX_THRESHOLD,
    );
    expect(getCategoryById("statistics")?.publicationPolicy).toBe("grandfather");
  });

  it("keeps Math non-public with zero published calculators", () => {
    expect(isCategoryVisible("math")).toBe(false);
    expect(isCategoryPublic("math")).toBe(false);
    expect(isCategoryIndexable("math")).toBe(false);
    expect(getPublicCategories().map((category) => category.id)).toEqual([
      "statistics",
    ]);
    expect(getVisibleCategories().map((category) => category.id)).toEqual([
      "statistics",
    ]);
    expect(getIndexableCategories().map((category) => category.id)).toEqual([
      "statistics",
    ]);
  });

  it("applies the three-calculator threshold for standard categories via simulation", () => {
    expect(
      wouldCategoryBeIndexable("math", 2, DEFAULT_CATEGORY_INDEX_THRESHOLD),
    ).toBe(false);
    expect(
      wouldCategoryBeIndexable("math", 3, DEFAULT_CATEGORY_INDEX_THRESHOLD),
    ).toBe(true);
    expect(wouldCategoryBeIndexable("math", 0)).toBe(false);
  });

  it("does not count unpublished catalog rows toward the threshold", () => {
    expect(isCategoryIndexable("statistics")).toBe(true);
    // Statistics has many preparation rows; threshold uses published only.
    expect(getSitemapEligibleCategoryRoutes()).toEqual([
      "/calculators/statistics/",
    ]);
  });

  it("keeps sitemap category membership derived — no parallel published-category list", () => {
    const paths = getSitemapPaths();
    expect(paths).toHaveLength(12);
    expect(paths.filter((path) => path === "/calculators/statistics/")).toHaveLength(
      1,
    );
    expect(paths).not.toContain("/calculators/math/");
    expect(paths).not.toContain("/calculators/finance/");
  });
});

describe("category static export policy", () => {
  it("exports Statistics and does not export Math or other unpublished hubs", () => {
    const out = join(process.cwd(), "out");
    expect(existsSync(join(out, "calculators/statistics/index.html"))).toBe(true);
    expect(existsSync(join(out, "calculators/math/index.html"))).toBe(false);
    expect(existsSync(join(out, "calculators/finance/index.html"))).toBe(false);
    expect(existsSync(join(out, "calculators/health/index.html"))).toBe(false);
  });
});
