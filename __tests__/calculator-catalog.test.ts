import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  calculatorCatalog,
  categories,
  findCalculatorById,
  findCalculatorByRoute,
  findCalculatorBySlug,
  getAllCalculators,
  getCalculatorsByCategory,
  getPublishedCalculators,
  getPublishedCalculatorsByCategory,
  getSitemapEligibleCalculatorRoutes,
  isCategoryIndexable,
  isPublished,
  isRoutePublished,
  resolveRelatedCalculators,
  type CalculatorRecord,
  type CalculatorStatus,
  type EditorialRiskLevel,
  type SearchIntent,
} from "@/lib/calculator-catalog";
import {
  getCalculatorHref,
  isCalculatorPublished,
  publishedCalculatorRoutes,
} from "@/lib/published-calculators";
import {
  expansionCandidates,
  launchCandidates,
  statisticsCalculators,
} from "@/lib/calculator-portfolio";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const APPROVED_STATUSES: readonly CalculatorStatus[] = [
  "published",
  "launch-candidate",
  "expansion-candidate",
  "deferred",
  "cancelled",
];
const APPROVED_INTENTS: readonly SearchIntent[] = [
  "calculate",
  "explain",
  "compare",
  "convert",
];
const APPROVED_RISKS: readonly EditorialRiskLevel[] = ["low", "medium", "high"];

function routeToAppPath(route: string): string {
  const segments = route.replace(/^\/|\/$/g, "").split("/");
  return path.join(process.cwd(), "app", ...segments, "page.tsx");
}

describe("calculator catalog — identity and routing", () => {
  it("has unique calculator ids", () => {
    const ids = calculatorCatalog.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique slugs within each category", () => {
    for (const category of categories) {
      const slugs = getCalculatorsByCategory(category.id).map((entry) => entry.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("has unique routes", () => {
    const routes = calculatorCatalog.map((entry) => entry.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it("routes follow /calculators/[category]/[slug]/ with trailing slash", () => {
    for (const entry of calculatorCatalog) {
      expect(entry.route).toMatch(
        new RegExp(`^/calculators/${entry.categoryId}/${entry.slug}/$`),
      );
      expect(entry.route.startsWith("/")).toBe(true);
      expect(entry.route.endsWith("/")).toBe(true);
    }
  });

  it("does not include a standalone five-number-summary calculator", () => {
    expect(
      calculatorCatalog.some(
        (entry) =>
          entry.slug.includes("five-number") ||
          entry.id.includes("five-number"),
      ),
    ).toBe(false);
  });

  it("does not include a published percentage or math route", () => {
    const percentage = findCalculatorBySlug("percentage");
    expect(percentage).toBeUndefined();
    expect(getPublishedCalculatorsByCategory("math")).toHaveLength(0);
  });
});

describe("calculator catalog — publication", () => {
  it("publishes exactly two calculators in Phase 4.1", () => {
    const published = getPublishedCalculators();
    expect(published).toHaveLength(2);
    expect(published.map((entry) => entry.slug).sort()).toEqual([
      "mean-absolute-deviation",
      "outlier-iqr",
    ]);
  });

  it("marks MAD and Outlier/IQR published with required fields", () => {
    const mad = findCalculatorBySlug("mean-absolute-deviation");
    const outlier = findCalculatorBySlug("outlier-iqr");
    expect(mad && isPublished(mad)).toBe(true);
    expect(outlier && isPublished(outlier)).toBe(true);
    expect(mad?.publishedAt).toMatch(ISO_DATE);
    expect(mad?.lastReviewedAt).toMatch(ISO_DATE);
    expect(mad?.sitemapEligible).toBe(true);
    expect(outlier?.publishedAt).toMatch(ISO_DATE);
    expect(outlier?.lastReviewedAt).toMatch(ISO_DATE);
  });

  it("keeps every other catalog entry unpublished", () => {
    for (const entry of calculatorCatalog) {
      if (
        entry.slug === "mean-absolute-deviation" ||
        entry.slug === "outlier-iqr"
      ) {
        continue;
      }
      expect(isPublished(entry)).toBe(false);
      expect(entry.sitemapEligible).toBe(false);
      expect(entry.publishedAt).toBeNull();
    }
  });

  it("fails closed for unknown routes and slugs", () => {
    expect(isRoutePublished("/calculators/statistics/unknown/")).toBe(false);
    expect(isCalculatorPublished("unknown-slug")).toBe(false);
    expect(isCalculatorPublished("")).toBe(false);
    expect(getCalculatorHref("coefficient-of-variation")).toBeUndefined();
    expect(findCalculatorByRoute("/calculators/math/percentage/")).toBeUndefined();
  });

  it("aligns published shim with catalog-derived routes", () => {
    expect(publishedCalculatorRoutes).toEqual(
      getSitemapEligibleCalculatorRoutes(),
    );
    expect(publishedCalculatorRoutes).toEqual([
      "/calculators/statistics/mean-absolute-deviation/",
      "/calculators/statistics/outlier-iqr/",
    ]);
  });

  it("has a static page for every published calculator", () => {
    for (const entry of getPublishedCalculators()) {
      expect(existsSync(routeToAppPath(entry.route))).toBe(true);
    }
  });

  it("does not have static pages for unpublished calculator routes", () => {
    for (const entry of calculatorCatalog) {
      if (isPublished(entry)) {
        continue;
      }
      expect(existsSync(routeToAppPath(entry.route))).toBe(false);
    }
  });
});

describe("calculator catalog — sitemap", () => {
  it("exposes only the two published calculator routes", () => {
    const routes = getSitemapEligibleCalculatorRoutes();
    expect(routes).toEqual([
      "/calculators/statistics/mean-absolute-deviation/",
      "/calculators/statistics/outlier-iqr/",
    ]);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it("never includes draft or candidate routes", () => {
    for (const route of getSitemapEligibleCalculatorRoutes()) {
      const record = findCalculatorByRoute(route);
      expect(record).toBeDefined();
      expect(record && isPublished(record)).toBe(true);
    }
  });
});

describe("calculator catalog — relations", () => {
  it("resolves every relatedCalculatorId to an existing calculator", () => {
    for (const entry of calculatorCatalog) {
      for (const relatedId of entry.relatedCalculatorIds) {
        expect(findCalculatorById(relatedId)).toBeDefined();
      }
    }
  });

  it("forbids self-relations and duplicate related ids", () => {
    for (const entry of calculatorCatalog) {
      expect(entry.relatedCalculatorIds).not.toContain(entry.id);
      expect(new Set(entry.relatedCalculatorIds).size).toBe(
        entry.relatedCalculatorIds.length,
      );
    }
  });

  it("does not treat related resolution as publication", () => {
    const mad = findCalculatorById("statistics-mad");
    expect(mad).toBeDefined();
    if (!mad) {
      return;
    }
    const related = resolveRelatedCalculators(mad);
    expect(related.length).toBeGreaterThan(0);
    const unpublishedRelated = related.filter((entry) => !isPublished(entry));
    expect(unpublishedRelated.length).toBeGreaterThan(0);
    for (const entry of unpublishedRelated) {
      expect(isCalculatorPublished(entry.slug)).toBe(false);
      expect(getCalculatorHref(entry.slug)).toBeUndefined();
    }
  });
});

describe("calculator catalog — metadata quality", () => {
  it("requires non-empty identity and description strings", () => {
    for (const entry of calculatorCatalog) {
      expect(entry.id.trim().length).toBeGreaterThan(0);
      expect(entry.name.trim().length).toBeGreaterThan(0);
      expect(entry.shortName.trim().length).toBeGreaterThan(0);
      expect(entry.slug.trim().length).toBeGreaterThan(0);
      expect(entry.description.trim().length).toBeGreaterThan(0);
    }
  });

  it("stores search aliases normalized lowercase and trimmed", () => {
    for (const entry of calculatorCatalog) {
      for (const alias of entry.searchAliases) {
        expect(alias).toBe(alias.trim().toLowerCase());
        expect(alias.length).toBeGreaterThan(0);
      }
    }
  });

  it("uses approved status, intent, and editorial risk unions", () => {
    for (const entry of calculatorCatalog) {
      expect(APPROVED_STATUSES).toContain(entry.status);
      expect(APPROVED_INTENTS).toContain(entry.primarySearchIntent);
      expect(APPROVED_RISKS).toContain(entry.editorialRiskLevel);
    }
  });

  it("uses ISO date format for published date fields", () => {
    for (const entry of calculatorCatalog) {
      if (entry.publishedAt !== null) {
        expect(entry.publishedAt).toMatch(ISO_DATE);
      }
      if (entry.lastReviewedAt !== null) {
        expect(entry.lastReviewedAt).toMatch(ISO_DATE);
      }
    }
  });
});

describe("calculator catalog — purity and compatibility", () => {
  it("does not mutate catalog order when filtering", () => {
    const before = calculatorCatalog.map((entry) => entry.id);
    const published = getPublishedCalculators() as CalculatorRecord[];
    published.pop();
    expect(getAllCalculators().map((entry) => entry.id)).toEqual(before);
    expect(getPublishedCalculators()).toHaveLength(2);
  });

  it("keeps statistics grandfather indexable at two published tools", () => {
    expect(isCategoryIndexable("statistics")).toBe(true);
    expect(isCategoryIndexable("math")).toBe(false);
  });

  it("derives portfolio compatibility lists without metadata duplication", () => {
    expect(statisticsCalculators).toHaveLength(9);
    expect(launchCandidates).toHaveLength(5);
    expect(expansionCandidates).toHaveLength(4);
    expect(launchCandidates.map((entry) => entry.slug)).toEqual([
      "mean-absolute-deviation",
      "outlier-iqr",
      "coefficient-of-variation",
      "standard-error",
      "critical-value",
    ]);
  });
});
