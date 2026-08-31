import { describe, expect, it } from "vitest";
import { formatDisplayNumber } from "@/lib/calculators/format-number";
import { calculateMeanAbsoluteDeviation } from "@/lib/calculators/mean-absolute-deviation";
import {
  buildMadCopyText,
  buildMadInterpretation,
  buildMadResultSummary,
} from "@/lib/calculators/mean-absolute-deviation-config";

describe("formatDisplayNumber", () => {
  it("removes trailing zeros after the decimal at four places", () => {
    expect(formatDisplayNumber(2.4, 4)).toBe("2.4");
    expect(formatDisplayNumber(14, 4)).toBe("14");
    expect(formatDisplayNumber(1.2, 4)).toBe("1.2");
  });

  it("preserves necessary decimal places", () => {
    expect(formatDisplayNumber(1.2345, 4)).toBe("1.2345");
  });

  it("rounds to two decimal places", () => {
    expect(formatDisplayNumber(1.333333333, 2)).toBe("1.33");
    expect(formatDisplayNumber(2.4, 2)).toBe("2.4");
  });

  it("rounds to six decimal places", () => {
    expect(formatDisplayNumber(1.333333333, 6)).toBe("1.333333");
  });

  it("normalizes negative zero to zero", () => {
    expect(formatDisplayNumber(-0, 4)).toBe("0");
    expect(formatDisplayNumber(-2, 4)).toBe("-2");
  });

  it("formats reference examples at four-decimal precision", () => {
    expect(formatDisplayNumber(2.4, 4)).toBe("2.4");
    expect(formatDisplayNumber(14, 4)).toBe("14");
    expect(formatDisplayNumber(1.333333333, 4)).toBe("1.3333");
    expect(formatDisplayNumber(-2, 4)).toBe("-2");
    expect(formatDisplayNumber(-0, 4)).toBe("0");
  });
});

describe("buildMadResultSummary", () => {
  it("shows separate minimum, maximum, and range for the reference dataset", () => {
    const result = calculateMeanAbsoluteDeviation([12, 15, 14, 10, 19]);
    const summary = buildMadResultSummary(result);
    const byLabel = Object.fromEntries(
      summary.map((field) => [field.label, field.value]),
    );

    expect(byLabel["Mean Absolute Deviation"]).toBe("2.4");
    expect(byLabel["Mean"]).toBe("14");
    expect(byLabel["Count"]).toBe("5");
    expect(byLabel["Sum of absolute deviations"]).toBe("12");
    expect(byLabel["Minimum"]).toBe("10");
    expect(byLabel["Maximum"]).toBe("19");
    expect(byLabel["Range"]).toBe("9");
  });

  it("computes range as maximum minus minimum", () => {
    const result = calculateMeanAbsoluteDeviation([2, 4, 6]);
    expect(result.range).toBe(4);
    const summary = buildMadResultSummary(result);
    const rangeField = summary.find((field) => field.label === "Range");
    expect(rangeField?.value).toBe("4");
  });

  it("does not conflate range with a min-to-max interval label", () => {
    const summary = buildMadResultSummary(
      calculateMeanAbsoluteDeviation([12, 15, 14, 10, 19]),
    );
    const labels = summary.map((field) => field.label);
    expect(labels).toContain("Minimum");
    expect(labels).toContain("Maximum");
    expect(labels).toContain("Range");
    expect(summary.some((field) => field.value.includes(" to "))).toBe(false);
  });

  it("respects selected precision without changing underlying values", () => {
    const result = calculateMeanAbsoluteDeviation([1, 2, 3, 4, 5]);
    expect(buildMadResultSummary(result, 2)[0].value).toBe("1.2");
    expect(buildMadResultSummary(result, 6)[0].value).toBe("1.2");
    expect(result.meanAbsoluteDeviation).toBe(1.2);
  });
});

describe("buildMadInterpretation", () => {
  it("uses neutral wording without population-style labels", () => {
    const result = calculateMeanAbsoluteDeviation([12, 15, 14, 10, 19]);
    const text = buildMadInterpretation(result);
    expect(text).toContain("on average");
    expect(text).not.toMatch(/population-style/i);
    expect(text).not.toMatch(/low|moderate|high/i);
  });
});

describe("buildMadCopyText", () => {
  it("includes dataset, summary fields, and formula only", () => {
    const result = calculateMeanAbsoluteDeviation([12, 15, 14, 10, 19]);
    const copy = buildMadCopyText(result, "12, 15, 14, 10, 19");

    expect(copy).toContain("Dataset: 12, 15, 14, 10, 19");
    expect(copy).toContain("Count (n): 5");
    expect(copy).toContain("Mean (x̄): 14");
    expect(copy).toContain("Mean Absolute Deviation (MAD): 2.4");
    expect(copy).toContain("Sum of absolute deviations: 12");
    expect(copy).toContain("Minimum: 10");
    expect(copy).toContain("Maximum: 19");
    expect(copy).toContain("Range: 9");
    expect(copy).toContain("Formula: MAD = (Σ|xᵢ − x̄|) / n");
  });
});
