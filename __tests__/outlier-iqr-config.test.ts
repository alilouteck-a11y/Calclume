import { describe, expect, it } from "vitest";
import { calculateOutlierIqr } from "@/lib/calculators/outlier-iqr";
import { outlierIqrCalculatorConfig } from "@/lib/calculators/outlier-iqr-config";
import { parseDataset } from "@/lib/calculators/parse-dataset";

describe("outlierIqrCalculatorConfig examples", () => {
  it("defines at least four verified examples", () => {
    expect(outlierIqrCalculatorConfig.examples.length).toBeGreaterThanOrEqual(4);
  });

  for (const example of outlierIqrCalculatorConfig.examples) {
    it(`verifies ${example.id}`, () => {
      const parsed = parseDataset(example.input);
      expect(parsed.ok).toBe(true);

      if (!parsed.ok) {
        return;
      }

      const result = calculateOutlierIqr(parsed.values);
      expect(result.iqr).toBe(example.expectedIqr);
      expect(result.outlierCount).toBe(example.expectedOutlierCount);
    });
  }

  it("documents method-comparison example divergence for excel-r7", () => {
    const example = outlierIqrCalculatorConfig.examples.find(
      (item) => item.id === "method-comparison",
    );
    expect(example).toBeDefined();

    const parsed = parseDataset(example!.input);
    expect(parsed.ok).toBe(true);

    if (!parsed.ok) {
      return;
    }

    const exclusive = calculateOutlierIqr(parsed.values);
    const excel = calculateOutlierIqr(parsed.values, {
      quartileMethod: "excel-r7",
    });

    expect(exclusive.q1).not.toBe(excel.q1);
    expect(exclusive.q3).not.toBe(excel.q3);
  });
});
