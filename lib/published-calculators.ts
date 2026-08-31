/** Slugs of calculators published as public routes and included in the sitemap. */
export const publishedCalculatorRoutes = [
  "/calculators/statistics/mean-absolute-deviation/",
] as const;

export type PublishedCalculatorRoute = (typeof publishedCalculatorRoutes)[number];

export function isCalculatorPublished(slug: string): boolean {
  return publishedCalculatorRoutes.some((route) => route.includes(slug));
}

export function getCalculatorHref(slug: string): string | undefined {
  const route = publishedCalculatorRoutes.find((entry) => entry.includes(slug));
  return route;
}
