import { describe, expect, it } from "vitest";
import {
  calculateOutlierIqr,
  INSUFFICIENT_OUTLIER_IQR_DATA_MESSAGE,
  MIN_OUTLIER_IQR_OBSERVATIONS,
} from "@/lib/calculators/outlier-iqr";
import {
  MAX_DATASET_OBSERVATIONS,
  parseDataset,
} from "@/lib/calculators/parse-dataset";

function calc(input: number[], options?: Parameters<typeof calculateOutlierIqr>[1]) {
  return calculateOutlierIqr(input, options);
}

describe("calculateOutlierIqr fixture matrix", () => {
  it("F01 — no outliers", () => {
    const result = calc([2, 4, 6, 8, 10, 12, 14]);

    expect(result.sortedValues).toEqual([2, 4, 6, 8, 10, 12, 14]);
    expect(result.q1).toBe(4);
    expect(result.median).toBe(8);
    expect(result.q3).toBe(12);
    expect(result.iqr).toBe(8);
    expect(result.lowerFence).toBe(-8);
    expect(result.upperFence).toBe(24);
    expect(result.lowerWhisker).toBe(2);
    expect(result.upperWhisker).toBe(14);
    expect(result.outlierCount).toBe(0);
  });

  it("F02 — one high outlier", () => {
    const result = calc([1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);

    expect(result.upperOutliers).toEqual([{ index: 10, value: 100 }]);
    expect(result.outliers).toEqual([{ index: 10, value: 100 }]);
    expect(result.q1).toBe(3);
    expect(result.median).toBe(5.5);
    expect(result.q3).toBe(8);
  });

  it("F03 — one low outlier", () => {
    const result = calc([1, 10, 11, 12, 13, 14, 15, 16, 17, 18]);

    expect(result.lowerOutliers).toEqual([{ index: 1, value: 1 }]);
    expect(result.q1).toBe(11);
    expect(result.median).toBe(13.5);
    expect(result.q3).toBe(16);
  });

  it("F04 — outliers on both sides", () => {
    const result = calc([-50, 1, 2, 3, 4, 5, 6, 7, 8, 200]);

    expect(result.lowerOutliers).toEqual([{ index: 1, value: -50 }]);
    expect(result.upperOutliers).toEqual([{ index: 10, value: 200 }]);
    expect(result.outlierCount).toBe(2);
  });

  it("F05 — odd observation count", () => {
    const result = calc([10, 12, 14, 15, 19]);

    expect(result.q1).toBe(11);
    expect(result.median).toBe(14);
    expect(result.q3).toBe(17);
    expect(result.iqr).toBe(6);
    expect(result.outlierCount).toBe(0);
  });

  it("F06 — even count OpenStax verified", () => {
    const result = calc([
      1, 1, 2, 2, 4, 6, 6.8, 7.2, 8, 8.3, 9, 10, 10, 11.5,
    ]);

    expect(result.q1).toBe(2);
    expect(result.median).toBe(7);
    expect(result.q3).toBe(9);
    expect(result.iqr).toBe(7);
    expect(result.outlierCount).toBe(0);
  });

  it("F07 — duplicate values", () => {
    const result = calc([5, 5, 5, 10, 10, 10, 10, 15]);

    expect(result.q1).toBe(5);
    expect(result.median).toBe(10);
    expect(result.q3).toBe(10);
    expect(result.outlierCount).toBe(0);
  });

  it("F08 — negative values", () => {
    const result = calc([-10, -5, 0, 5, 10]);

    expect(result.q1).toBe(-7.5);
    expect(result.median).toBe(0);
    expect(result.q3).toBe(7.5);
    expect(result.outlierCount).toBe(0);
  });

  it("F09 — decimal values", () => {
    const result = calc([1.5, 2.25, 0.5, 3.75, 4.0]);

    expect(result.sortedValues).toEqual([0.5, 1.5, 2.25, 3.75, 4.0]);
    expect(result.q1).toBe(1);
    expect(result.median).toBe(2.25);
    expect(result.q3).toBe(3.875);
    expect(result.iqr).toBeCloseTo(2.875);
    expect(result.lowerFence).toBeCloseTo(-3.3125);
    expect(result.upperFence).toBeCloseTo(8.1875);
  });

  it("F10 — all values equal", () => {
    const result = calc([7, 7, 7, 7, 7]);

    expect(result.q1).toBe(7);
    expect(result.median).toBe(7);
    expect(result.q3).toBe(7);
    expect(result.iqr).toBe(0);
    expect(result.outlierCount).toBe(0);
  });

  it("F11 — IQR zero with non-identical values", () => {
    const result = calc([3, 3, 3, 3, 3, 10]);

    expect(result.iqr).toBe(0);
    expect(result.upperOutliers).toEqual([{ index: 6, value: 10 }]);
  });

  it("F13 — minimum allowed dataset", () => {
    const result = calc([1, 2, 3, 4]);

    expect(result.q1).toBe(1.5);
    expect(result.median).toBe(2.5);
    expect(result.q3).toBe(3.5);
    expect(result.outlierCount).toBe(0);
  });

  it("F14 — 1,000 observation boundary", () => {
    const values = Array.from({ length: 1000 }, (_, index) => index + 1);
    const result = calc(values);

    expect(result.count).toBe(1000);
    expect(result.q1).toBe(250.5);
    expect(result.median).toBe(500.5);
    expect(result.q3).toBe(750.5);
    expect(result.iqr).toBe(500);
    expect(result.outlierCount).toBe(0);
  });

  it("F16 — excel-r7 alternate method", () => {
    const result = calc([10, 12, 14, 15, 19], {
      quartileMethod: "excel-r7",
    });

    expect(result.q1).toBe(12);
    expect(result.median).toBe(14);
    expect(result.q3).toBe(15);
    expect(result.iqr).toBe(3);
    expect(result.lowerFence).toBe(7.5);
    expect(result.upperFence).toBe(19.5);
    expect(result.outlierCount).toBe(0);
    expect(result.quartileMethod).toBe("excel-r7");
  });

  it("F06b — OpenStax 15-value five-number summary", () => {
    const result = calc([
      10, 10, 10, 15, 35, 75, 90, 95, 100, 175, 420, 490, 515, 515, 790,
    ]);

    expect(result.q1).toBe(15);
    expect(result.median).toBe(95);
    expect(result.q3).toBe(490);
  });
});

describe("calculateOutlierIqr result contract", () => {
  it("preserves original order and builds rows by index", () => {
    const result = calc([15, 10, 20, 5]);

    expect(result.originalValues).toEqual([15, 10, 20, 5]);
    expect(result.sortedValues).toEqual([5, 10, 15, 20]);
    expect(result.rows).toHaveLength(4);
    expect(result.rows[0]).toEqual({
      index: 1,
      value: 15,
      classification: "non-outlier",
    });
  });

  it("tracks duplicate outlier values separately by index", () => {
    const result = calc([1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 100]);

    expect(result.upperOutliers).toEqual([
      { index: 10, value: 100 },
      { index: 11, value: 100 },
    ]);
    expect(result.outlierCount).toBe(2);
  });

  it("populates five-number summary and box plot consistently", () => {
    const result = calc([2, 4, 6, 8, 10, 12, 14]);

    expect(result.fiveNumberSummary).toEqual({
      minimum: 2,
      q1: 4,
      median: 8,
      q3: 12,
      maximum: 14,
    });
    expect(result.boxPlot.q1).toBe(result.q1);
    expect(result.boxPlot.median).toBe(result.median);
    expect(result.boxPlot.q3).toBe(result.q3);
    expect(result.boxPlot.lowerWhisker).toBe(result.lowerWhisker);
    expect(result.boxPlot.upperWhisker).toBe(result.upperWhisker);
    expect(result.boxPlot.lowerFence).toBe(result.lowerFence);
    expect(result.boxPlot.upperFence).toBe(result.upperFence);
  });

  it("defaults to exclusive-halves and 1.5 multiplier", () => {
    const result = calc([1, 2, 3, 4, 5, 6]);

    expect(result.quartileMethod).toBe("exclusive-halves");
    expect(result.fenceMultiplier).toBe(1.5);
    expect(result.fenceMultiplierId).toBe("inner-1.5");
  });

  it("maps fence multiplier 3 to outer-3.0 id", () => {
    const result = calc([1, 2, 3, 4, 5, 6], { fenceMultiplier: 3 });

    expect(result.fenceMultiplier).toBe(3);
    expect(result.fenceMultiplierId).toBe("outer-3.0");
  });

  it("does not mutate the input array", () => {
    const input = [10, 12, 14, 15];
    const snapshot = [...input];

    calc(input);

    expect(input).toEqual(snapshot);
  });
});

describe("parseDataset integration (F15)", () => {
  it("rejects 1,001 observations before calculation", () => {
    const input = Array.from({ length: MAX_DATASET_OBSERVATIONS + 1 }, () => "1").join(
      ", ",
    );
    const parsed = parseDataset(input);

    expect(parsed.ok).toBe(false);
    if (!parsed.ok) {
      expect(parsed.error).toContain("1,000");
    }
  });

  it("accepts exactly 1,000 observations for calculation", () => {
    const input = Array.from({ length: MAX_DATASET_OBSERVATIONS }, (_, index) =>
      String(index + 1),
    ).join(", ");
    const parsed = parseDataset(input);

    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.values.length).toBe(MAX_DATASET_OBSERVATIONS);
      expect(() => calculateOutlierIqr(parsed.values)).not.toThrow();
    }
  });
});

describe("constants", () => {
  it("exports stable minimum observation threshold", () => {
    expect(MIN_OUTLIER_IQR_OBSERVATIONS).toBe(4);
    expect(INSUFFICIENT_OUTLIER_IQR_DATA_MESSAGE).toContain("4 observations");
  });
});
