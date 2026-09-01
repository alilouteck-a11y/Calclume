import { describe, expect, it } from "vitest";
import {
  calculateOutlierIqr,
  INSUFFICIENT_OUTLIER_IQR_DATA_MESSAGE,
  INVALID_FENCE_MULTIPLIER_MESSAGE,
  INVALID_OUTLIER_IQR_VALUE_MESSAGE,
  INVALID_QUARTILE_METHOD_MESSAGE,
  TOO_MANY_OUTLIER_IQR_OBSERVATIONS_MESSAGE,
} from "@/lib/calculators/outlier-iqr";
import type { CalculateOutlierIqrOptions } from "@/lib/calculators/outlier-iqr-schema";

function calc(
  values: number[],
  options?: CalculateOutlierIqrOptions,
) {
  return calculateOutlierIqr(values, options);
}

describe("calculateOutlierIqr runtime validation — observation count", () => {
  it("rejects n = 0", () => {
    expect(() => calc([])).toThrow(RangeError);
    expect(() => calc([])).toThrow(INSUFFICIENT_OUTLIER_IQR_DATA_MESSAGE);
  });

  it("rejects n = 1", () => {
    expect(() => calc([5])).toThrow(RangeError);
    expect(() => calc([5])).toThrow(INSUFFICIENT_OUTLIER_IQR_DATA_MESSAGE);
  });

  it("rejects n = 2", () => {
    expect(() => calc([1, 9])).toThrow(RangeError);
    expect(() => calc([1, 9])).toThrow(INSUFFICIENT_OUTLIER_IQR_DATA_MESSAGE);
  });

  it("rejects n = 3", () => {
    expect(() => calc([1, 5, 9])).toThrow(RangeError);
    expect(() => calc([1, 5, 9])).toThrow(INSUFFICIENT_OUTLIER_IQR_DATA_MESSAGE);
  });

  it("rejects n = 1,001 in the pure numeric engine", () => {
    const values = Array.from({ length: 1001 }, (_, index) => index + 1);

    expect(() => calc(values)).toThrow(RangeError);
    expect(() => calc(values)).toThrow(TOO_MANY_OUTLIER_IQR_OBSERVATIONS_MESSAGE);
  });

  it("accepts n = 1,000 in the pure numeric engine", () => {
    const values = Array.from({ length: 1000 }, (_, index) => index + 1);

    expect(() => calc(values)).not.toThrow();
    expect(calc(values).count).toBe(1000);
  });
});

describe("calculateOutlierIqr runtime validation — non-finite values", () => {
  it("rejects NaN", () => {
    expect(() => calc([1, 2, NaN, 4])).toThrow(RangeError);
    expect(() => calc([1, 2, NaN, 4])).toThrow(INVALID_OUTLIER_IQR_VALUE_MESSAGE);
  });

  it("rejects positive Infinity", () => {
    expect(() => calc([1, 2, Infinity, 4])).toThrow(RangeError);
    expect(() => calc([1, 2, Infinity, 4])).toThrow(
      INVALID_OUTLIER_IQR_VALUE_MESSAGE,
    );
  });

  it("rejects negative Infinity", () => {
    expect(() => calc([1, 2, -Infinity, 4])).toThrow(RangeError);
    expect(() => calc([1, 2, -Infinity, 4])).toThrow(
      INVALID_OUTLIER_IQR_VALUE_MESSAGE,
    );
  });
});

describe("calculateOutlierIqr runtime validation — options", () => {
  it("rejects unsupported quartile method at runtime", () => {
    expect(() =>
      calc([1, 2, 3, 4], {
        quartileMethod: "minitab" as CalculateOutlierIqrOptions["quartileMethod"],
      }),
    ).toThrow(RangeError);
    expect(() =>
      calc([1, 2, 3, 4], {
        quartileMethod: "minitab" as CalculateOutlierIqrOptions["quartileMethod"],
      }),
    ).toThrow(INVALID_QUARTILE_METHOD_MESSAGE);
  });

  it("rejects unsupported fence multiplier at runtime", () => {
    expect(() =>
      calc([1, 2, 3, 4], {
        fenceMultiplier: 2 as CalculateOutlierIqrOptions["fenceMultiplier"],
      }),
    ).toThrow(RangeError);
    expect(() =>
      calc([1, 2, 3, 4], {
        fenceMultiplier: 2 as CalculateOutlierIqrOptions["fenceMultiplier"],
      }),
    ).toThrow(INVALID_FENCE_MULTIPLIER_MESSAGE);
  });
});
