/**
 * Backwards-compatible publication shim.
 * Source of truth: lib/calculator-catalog.ts (via calculator-catalog-publication).
 * Do not add a manually maintained published route list here.
 */

export {
  getCalculatorHref,
  isCalculatorPublished,
  publishedCalculatorRoutes,
  type PublishedCalculatorRoute,
} from "@/lib/calculator-catalog-publication";
