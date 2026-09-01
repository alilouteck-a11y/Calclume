import { describe, expect, it } from "vitest";
import {
  exclusiveHalvesQuartiles,
  excelR7Quantile,
  excelR7Quartiles,
  medianOfSorted,
} from "@/lib/calculators/quartiles";

describe("medianOfSorted", () => {
  it("returns the middle value for odd-length data", () => {
    expect(medianOfSorted([1, 2, 3, 4, 5])).toBe(3);
  });

  it("returns the average of middle values for even-length data", () => {
    expect(medianOfSorted([1, 2, 3, 4])).toBe(2.5);
  });
});

describe("exclusiveHalvesQuartiles", () => {
  it("matches Langford S5 = (1, 2, 3, 4, 5)", () => {
    const result = exclusiveHalvesQuartiles([1, 2, 3, 4, 5]);
    expect(result.q1).toBe(1.5);
    expect(result.median).toBe(3);
    expect(result.q3).toBe(4.5);
  });

  it("matches OpenStax 14-value example (F06)", () => {
    const sorted = [
      1, 1, 2, 2, 4, 6, 6.8, 7.2, 8, 8.3, 9, 10, 10, 11.5,
    ];
    const result = exclusiveHalvesQuartiles(sorted);
    expect(result.q1).toBe(2);
    expect(result.median).toBe(7);
    expect(result.q3).toBe(9);
  });

  it("matches OpenStax 15-value example (F06b)", () => {
    const sorted = [
      10, 10, 10, 15, 35, 75, 90, 95, 100, 175, 420, 490, 515, 515, 790,
    ];
    const result = exclusiveHalvesQuartiles(sorted);
    expect(result.q1).toBe(15);
    expect(result.median).toBe(95);
    expect(result.q3).toBe(490);
  });

  it("matches F05 odd-count fixture", () => {
    const result = exclusiveHalvesQuartiles([10, 12, 14, 15, 19]);
    expect(result.q1).toBe(11);
    expect(result.median).toBe(14);
    expect(result.q3).toBe(17);
  });

  it("matches F13 minimum dataset", () => {
    const result = exclusiveHalvesQuartiles([1, 2, 3, 4]);
    expect(result.q1).toBe(1.5);
    expect(result.median).toBe(2.5);
    expect(result.q3).toBe(3.5);
  });
});

describe("excelR7Quartiles", () => {
  it("matches Langford S5 = (1, 2, 3, 4, 5)", () => {
    const result = excelR7Quartiles([1, 2, 3, 4, 5]);
    expect(result.q1).toBe(2);
    expect(result.median).toBe(3);
    expect(result.q3).toBe(4);
  });

  it("matches F16 alternate method on textbook odd set", () => {
    const result = excelR7Quartiles([10, 12, 14, 15, 19]);
    expect(result.q1).toBe(12);
    expect(result.median).toBe(14);
    expect(result.q3).toBe(15);
  });

  it("interpolates at non-integer positions", () => {
    expect(excelR7Quantile([1, 2, 4, 5], 0.25)).toBe(1.75);
  });
});

describe("method divergence (F16)", () => {
  const sorted = [10, 12, 14, 15, 19];

  it("produces different Q1 and Q3 between methods", () => {
    const exclusive = exclusiveHalvesQuartiles(sorted);
    const excel = excelR7Quartiles(sorted);

    expect(exclusive.q1).not.toBe(excel.q1);
    expect(exclusive.q3).not.toBe(excel.q3);
    expect(exclusive.median).toBe(excel.median);
  });
});
