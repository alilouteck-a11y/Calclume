import { describe, expect, it } from "vitest";
import { calculateMeanAbsoluteDeviation } from "@/lib/calculators/mean-absolute-deviation";
import {
  MAX_DATASET_OBSERVATIONS,
  parseDataset,
} from "@/lib/calculators/parse-dataset";
import { formatNumber } from "@/lib/calculators/format-number";
import { madCalculatorConfig } from "@/lib/calculators/mean-absolute-deviation-config";

describe("parseDataset", () => {
  it("parses comma-separated values", () => {
    const result = parseDataset("12, 15, 14, 10, 19");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values).toEqual([12, 15, 14, 10, 19]);
    }
  });

  it("parses whitespace and newline separated values", () => {
    const result = parseDataset("2 4\n6");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values).toEqual([2, 4, 6]);
    }
  });

  it("parses semicolon-separated values", () => {
    const result = parseDataset("1;2;3");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values).toEqual([1, 2, 3]);
    }
  });

  it("parses mixed separators", () => {
    const result = parseDataset("1, 2; 3\n4");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values).toEqual([1, 2, 3, 4]);
    }
  });

  it("parses negative decimals and leading-dot notation", () => {
    const result = parseDataset("-0.5, .5, -2");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values).toEqual([-0.5, 0.5, -2]);
    }
  });

  it("rejects empty input", () => {
    const result = parseDataset("   ");
    expect(result.ok).toBe(false);
  });

  it("rejects non-numeric tokens with the first invalid token", () => {
    const result = parseDataset("1, abc, 3");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain('"abc"');
    }
  });

  it("rejects partial numeric tokens", () => {
    const result = parseDataset("12abc");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain('"12abc"');
    }
  });

  it("rejects NaN and Infinity literals", () => {
    expect(parseDataset("NaN").ok).toBe(false);
    expect(parseDataset("Infinity").ok).toBe(false);
    expect(parseDataset("+Infinity").ok).toBe(false);
    expect(parseDataset("-Infinity").ok).toBe(false);
  });

  it("accepts exactly 1,000 observations", () => {
    const input = Array.from({ length: MAX_DATASET_OBSERVATIONS }, () => "1").join(
      ", ",
    );
    const result = parseDataset(input);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values).toHaveLength(MAX_DATASET_OBSERVATIONS);
    }
  });

  it("rejects 1,001 observations", () => {
    const input = Array.from(
      { length: MAX_DATASET_OBSERVATIONS + 1 },
      () => "1",
    ).join(", ");
    const result = parseDataset(input);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("1,000");
    }
  });
});

describe("calculateMeanAbsoluteDeviation", () => {
  it("matches the homepage reference example", () => {
    const result = calculateMeanAbsoluteDeviation([12, 15, 14, 10, 19]);
    expect(result.mean).toBe(14);
    expect(result.meanAbsoluteDeviation).toBe(2.4);
    expect(result.absoluteDeviationSum).toBe(12);
    expect(result.count).toBe(5);
    expect(result.minimum).toBe(10);
    expect(result.maximum).toBe(19);
    expect(result.range).toBe(9);
  });

  it("computes MAD for a simple three-value dataset", () => {
    const result = calculateMeanAbsoluteDeviation([2, 4, 6]);
    expect(result.mean).toBe(4);
    expect(result.meanAbsoluteDeviation).toBeCloseTo(4 / 3);
  });

  it("returns zero MAD for a single value", () => {
    const result = calculateMeanAbsoluteDeviation([7]);
    expect(result.mean).toBe(7);
    expect(result.meanAbsoluteDeviation).toBe(0);
  });

  it("uses full precision before display rounding", () => {
    const result = calculateMeanAbsoluteDeviation([1, 2, 3, 4, 5]);
    expect(result.meanAbsoluteDeviation).toBe(1.2);
    expect(formatNumber(result.meanAbsoluteDeviation, 4)).toBe("1.2000");
  });

  it("verifies all configured examples", () => {
    for (const example of madCalculatorConfig.examples) {
      const parsed = parseDataset(example.input);
      expect(parsed.ok).toBe(true);
      if (parsed.ok) {
        const result = calculateMeanAbsoluteDeviation(parsed.values);
        expect(result.meanAbsoluteDeviation).toBeCloseTo(example.expectedMad, 10);
      }
    }
  });

  it("builds row-level deviations correctly", () => {
    const result = calculateMeanAbsoluteDeviation([10, 20]);
    expect(result.rows).toEqual([
      {
        index: 1,
        value: 10,
        signedDeviation: -5,
        absoluteDeviation: 5,
      },
      {
        index: 2,
        value: 20,
        signedDeviation: 5,
        absoluteDeviation: 5,
      },
    ]);
  });
});
