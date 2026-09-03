import type { MetadataRoute } from "next";
import { absoluteUrl, sitemapRoutes } from "@/lib/routes";
import { getSitemapEligibleCategoryRoutes } from "@/lib/calculator-category-publication";
import { publishedCalculatorRoutes } from "@/lib/published-calculators";

export const dynamic = "force-static";

export function getSitemapPaths(): string[] {
  const categoryRoutes = getSitemapEligibleCategoryRoutes();
  return [...sitemapRoutes, ...categoryRoutes, ...publishedCalculatorRoutes];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapPaths().map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/calculators") ? 0.9 : 0.7,
  }));
}
