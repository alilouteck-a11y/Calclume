/**
 * Derived publication helpers backed by the unified calculator catalog.
 * No manually maintained published-route array.
 */

import {
  findCalculatorBySlug,
  getSitemapEligibleCalculatorRoutes,
  isPublished,
} from "@/lib/calculator-catalog";

/** Derived published calculator routes (order matches catalog). */
export const publishedCalculatorRoutes = getSitemapEligibleCalculatorRoutes();

export type PublishedCalculatorRoute = (typeof publishedCalculatorRoutes)[number];

/**
 * Fail-closed publication check by calculator slug.
 * Unknown slugs and in-preparation calculators return false.
 */
export function isCalculatorPublished(slug: string): boolean {
  if (!slug) {
    return false;
  }
  const record = findCalculatorBySlug(slug);
  return record !== undefined && isPublished(record);
}

/**
 * Canonical href for a published calculator slug, or undefined if unpublished.
 */
export function getCalculatorHref(slug: string): string | undefined {
  if (!slug) {
    return undefined;
  }
  const record = findCalculatorBySlug(slug);
  if (!record || !isPublished(record)) {
    return undefined;
  }
  return record.route;
}
