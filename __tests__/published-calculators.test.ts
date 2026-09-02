import { describe, expect, it } from "vitest";
import { publishedCalculatorRoutes } from "@/lib/published-calculators";

/** Legacy alias — publication contract lives in outlier-iqr-publication.test.tsx */
describe("published calculator routes (smoke)", () => {
  it("lists two published calculator routes", () => {
    expect(publishedCalculatorRoutes).toHaveLength(2);
  });
});
