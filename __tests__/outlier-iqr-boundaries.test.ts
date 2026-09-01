import { describe, expect, it } from "vitest";
import {
  calculateOutlierIqr,
  classifyObservationValue,
} from "@/lib/calculators/outlier-iqr";

describe("classifyObservationValue (F12 boundary rules)", () => {
  const lowerFence = 2;
  const upperFence = 26;

  it("treats values exactly on fences as non-outliers", () => {
    expect(classifyObservationValue(2, lowerFence, upperFence)).toBe(
      "non-outlier",
    );
    expect(classifyObservationValue(26, lowerFence, upperFence)).toBe(
      "non-outlier",
    );
  });

  it("flags values strictly outside fences", () => {
    expect(classifyObservationValue(1, lowerFence, upperFence)).toBe(
      "lower-outlier",
    );
    expect(classifyObservationValue(27, lowerFence, upperFence)).toBe(
      "upper-outlier",
    );
  });

  it("uses strict comparisons without epsilon adjustment", () => {
    expect(classifyObservationValue(1.999999999999, lowerFence, upperFence)).toBe(
      "lower-outlier",
    );
    expect(classifyObservationValue(26.000000000001, lowerFence, upperFence)).toBe(
      "upper-outlier",
    );
  });
});

describe("fence and whisker boundaries via calculateOutlierIqr", () => {
  it("does not flag values equal to computed fences (F05 reference)", () => {
    const result = calculateOutlierIqr([10, 12, 14, 15, 19]);

    expect(result.lowerFence).toBe(2);
    expect(result.upperFence).toBe(26);
    expect(result.outlierCount).toBe(0);

    expect(classifyObservationValue(2, result.lowerFence, result.upperFence)).toBe(
      "non-outlier",
    );
    expect(classifyObservationValue(26, result.lowerFence, result.upperFence)).toBe(
      "non-outlier",
    );
  });

  it("separates whiskers from fences when outliers exist (F02)", () => {
    const result = calculateOutlierIqr([1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);

    expect(result.lowerWhisker).toBe(1);
    expect(result.upperWhisker).toBe(9);
    expect(result.lowerFence).toBe(-4.5);
    expect(result.upperFence).toBe(15.5);
    expect(result.lowerWhisker).not.toBe(result.lowerFence);
    expect(result.upperWhisker).not.toBe(result.upperFence);
  });

  it("applies multiplier 3.0 without changing quartiles (F02b)", () => {
    const inner = calculateOutlierIqr([1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
    const outer = calculateOutlierIqr([1, 2, 3, 4, 5, 6, 7, 8, 9, 100], {
      fenceMultiplier: 3,
    });

    expect(outer.q1).toBe(inner.q1);
    expect(outer.median).toBe(inner.median);
    expect(outer.q3).toBe(inner.q3);
    expect(outer.lowerFence).toBe(-12);
    expect(outer.upperFence).toBe(23);
    expect(outer.upperOutliers).toEqual([{ index: 10, value: 100 }]);
  });
});

describe("degenerate datasets", () => {
  it("handles all equal values (F10)", () => {
    const result = calculateOutlierIqr([7, 7, 7, 7, 7]);

    expect(result.q1).toBe(7);
    expect(result.median).toBe(7);
    expect(result.q3).toBe(7);
    expect(result.iqr).toBe(0);
    expect(result.lowerFence).toBe(7);
    expect(result.upperFence).toBe(7);
    expect(result.lowerWhisker).toBe(7);
    expect(result.upperWhisker).toBe(7);
    expect(result.nonOutlierCount).toBe(5);
    expect(result.outlierCount).toBe(0);
    expect(result.boxPlot.domainMin).toBe(6);
    expect(result.boxPlot.domainMax).toBe(8);
  });

  it("flags isolated values when IQR is zero (F11)", () => {
    const result = calculateOutlierIqr([3, 3, 3, 3, 3, 10]);

    expect(result.iqr).toBe(0);
    expect(result.lowerFence).toBe(3);
    expect(result.upperFence).toBe(3);
    expect(result.lowerWhisker).toBe(3);
    expect(result.upperWhisker).toBe(3);
    expect(result.nonOutlierCount).toBe(5);
    expect(result.upperOutliers).toEqual([{ index: 6, value: 10 }]);
  });

  it("always leaves at least one non-outlier for approved degenerate fixtures", () => {
    const datasets = [
      [7, 7, 7, 7, 7],
      [3, 3, 3, 3, 3, 10],
      [1, 2, 3, 4],
      [10, 12, 14, 15, 19],
    ];

    for (const dataset of datasets) {
      const exclusive = calculateOutlierIqr(dataset);
      const excel = calculateOutlierIqr(dataset, { quartileMethod: "excel-r7" });

      expect(exclusive.nonOutlierCount).toBeGreaterThan(0);
      expect(excel.nonOutlierCount).toBeGreaterThan(0);
      expect(exclusive.lowerWhisker).toBeLessThanOrEqual(exclusive.upperWhisker);
      expect(excel.lowerWhisker).toBeLessThanOrEqual(excel.upperWhisker);
    }
  });

  it("uses non-outlier extrema for whiskers, not data min/max when outliers exist", () => {
    const result = calculateOutlierIqr([1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);

    expect(result.minimum).toBe(1);
    expect(result.maximum).toBe(100);
    expect(result.lowerWhisker).toBe(1);
    expect(result.upperWhisker).toBe(9);
    expect(result.nonOutlierCount).toBe(9);
  });
});

describe("insufficient data", () => {
  it("rejects fewer than four observations with one combined example", () => {
    expect(() => calculateOutlierIqr([1, 2, 3])).toThrow(
      "At least 4 observations are required for quartile and IQR calculations.",
    );
  });
});
