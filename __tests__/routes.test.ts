import { describe, expect, it } from "vitest";
import {
  absoluteUrl,
  footerNavRoutes,
  primaryNavRoutes,
  publicRoutes,
  sitemapRoutes,
} from "@/lib/routes";

describe("routes", () => {
  it("lists all required public routes", () => {
    const paths = publicRoutes.map((route) => route.path);
    expect(paths).toContain("/");
    expect(paths).toContain("/calculators/");
    expect(paths).not.toContain("/calculators/statistics/");
    expect(paths).toContain("/about/");
    expect(paths).toContain("/methodology/");
    expect(paths).toContain("/editorial-policy/");
    expect(paths).toContain("/sources/");
    expect(paths).toContain("/contact/");
    expect(paths).toContain("/privacy/");
    expect(paths).toContain("/terms/");
  });

  it("uses trailing slashes on public paths except root handling", () => {
    for (const route of publicRoutes) {
      if (route.path !== "/") {
        expect(route.path.endsWith("/")).toBe(true);
      }
    }
  });

  it("builds absolute URLs with production domain", () => {
    expect(absoluteUrl("/about/")).toBe("https://calclume.com/about/");
    expect(absoluteUrl("/")).toBe("https://calclume.com/");
  });

  it("includes primary nav routes", () => {
    const labels = primaryNavRoutes.map((route) => route.label);
    expect(labels).toEqual(["Calculators", "Methodology", "About"]);
  });

  it("includes footer routes for trust pages and derived public categories", () => {
    const footerPaths = footerNavRoutes.map((route) => route.path);
    expect(footerPaths).toContain("/editorial-policy/");
    expect(footerPaths).toContain("/contact/");
    expect(footerPaths).toContain("/privacy/");
    expect(footerPaths).toContain("/terms/");
    expect(footerPaths).toContain("/calculators/statistics/");
  });

  it("keeps base sitemap routes separate from calculator and category hubs", () => {
    expect(sitemapRoutes.length).toBe(publicRoutes.length);
    expect(sitemapRoutes).not.toContain("/calculators/statistics/");
  });

  it("published calculators are tracked separately", () => {
    expect(sitemapRoutes).not.toContain(
      "/calculators/statistics/mean-absolute-deviation/",
    );
  });
});
