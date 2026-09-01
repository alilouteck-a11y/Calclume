import {
  DEFAULT_FENCE_MULTIPLIER,
  DEFAULT_QUARTILE_METHOD,
  getFenceMultiplierId,
  INSUFFICIENT_OUTLIER_IQR_DATA_MESSAGE,
  INVALID_FENCE_MULTIPLIER_MESSAGE,
  INVALID_OUTLIER_IQR_VALUE_MESSAGE,
  INVALID_QUARTILE_METHOD_MESSAGE,
  isFenceMultiplier,
  isQuartileMethod,
  MAX_OUTLIER_IQR_OBSERVATIONS,
  MIN_OUTLIER_IQR_OBSERVATIONS,
  TOO_MANY_OUTLIER_IQR_OBSERVATIONS_MESSAGE,
  type CalculateOutlierIqrOptions,
  type FenceMultiplier,
  type ObservationClassification,
  type OutlierIqrBoxPlotData,
  type OutlierIqrOutlierEntry,
  type OutlierIqrResult,
  type QuartileMethod,
} from "@/lib/calculators/outlier-iqr-schema";
import { computeQuartiles } from "@/lib/calculators/quartiles";

export {
  DEFAULT_FENCE_MULTIPLIER,
  DEFAULT_QUARTILE_METHOD,
  INSUFFICIENT_OUTLIER_IQR_DATA_MESSAGE,
  INVALID_FENCE_MULTIPLIER_MESSAGE,
  INVALID_OUTLIER_IQR_VALUE_MESSAGE,
  INVALID_QUARTILE_METHOD_MESSAGE,
  MAX_OUTLIER_IQR_OBSERVATIONS,
  MIN_OUTLIER_IQR_OBSERVATIONS,
  TOO_MANY_OUTLIER_IQR_OBSERVATIONS_MESSAGE,
};
export type {
  CalculateOutlierIqrOptions,
  FenceMultiplier,
  FenceMultiplierId,
  ObservationClassification,
  OutlierIqrBoxPlotData,
  OutlierIqrFiveNumberSummary,
  OutlierIqrObservationRow,
  OutlierIqrOutlierEntry,
  OutlierIqrResult,
  QuartileMethod,
} from "@/lib/calculators/outlier-iqr-schema";

export function classifyObservationValue(
  value: number,
  lowerFence: number,
  upperFence: number,
): ObservationClassification {
  if (value < lowerFence) {
    return "lower-outlier";
  }

  if (value > upperFence) {
    return "upper-outlier";
  }

  return "non-outlier";
}

function buildBoxPlotDomain(minimum: number, maximum: number): {
  domainMin: number;
  domainMax: number;
} {
  const span = maximum - minimum;

  if (span === 0) {
    return {
      domainMin: minimum - 1,
      domainMax: maximum + 1,
    };
  }

  const padding = span * 0.08;

  return {
    domainMin: minimum - padding,
    domainMax: maximum + padding,
  };
}

function buildWhiskers(
  values: number[],
  lowerFence: number,
  upperFence: number,
): { lowerWhisker: number; upperWhisker: number } {
  const nonOutlierValues = values.filter(
    (value) => value >= lowerFence && value <= upperFence,
  );

  if (nonOutlierValues.length === 0) {
    throw new RangeError(
      "At least one observation must fall within the computed fences.",
    );
  }

  return {
    lowerWhisker: Math.min(...nonOutlierValues),
    upperWhisker: Math.max(...nonOutlierValues),
  };
}

function validateObservationValues(values: number[]): void {
  for (const value of values) {
    if (!Number.isFinite(value)) {
      throw new RangeError(INVALID_OUTLIER_IQR_VALUE_MESSAGE);
    }
  }
}

function validateObservationCount(count: number): void {
  if (count < MIN_OUTLIER_IQR_OBSERVATIONS) {
    throw new RangeError(INSUFFICIENT_OUTLIER_IQR_DATA_MESSAGE);
  }

  if (count > MAX_OUTLIER_IQR_OBSERVATIONS) {
    throw new RangeError(TOO_MANY_OUTLIER_IQR_OBSERVATIONS_MESSAGE);
  }
}

function resolveQuartileMethod(
  method: CalculateOutlierIqrOptions["quartileMethod"],
): QuartileMethod {
  const resolved = method ?? DEFAULT_QUARTILE_METHOD;

  if (!isQuartileMethod(resolved)) {
    throw new RangeError(INVALID_QUARTILE_METHOD_MESSAGE);
  }

  return resolved;
}

function resolveFenceMultiplier(
  multiplier: CalculateOutlierIqrOptions["fenceMultiplier"],
): FenceMultiplier {
  const resolved = multiplier ?? DEFAULT_FENCE_MULTIPLIER;

  if (!isFenceMultiplier(resolved)) {
    throw new RangeError(INVALID_FENCE_MULTIPLIER_MESSAGE);
  }

  return resolved;
}

function buildOutlierLists(
  values: number[],
  lowerFence: number,
  upperFence: number,
): {
  lowerOutliers: OutlierIqrOutlierEntry[];
  upperOutliers: OutlierIqrOutlierEntry[];
  outliers: OutlierIqrOutlierEntry[];
  rows: OutlierIqrResult["rows"];
} {
  const lowerOutliers: OutlierIqrOutlierEntry[] = [];
  const upperOutliers: OutlierIqrOutlierEntry[] = [];
  const outliers: OutlierIqrOutlierEntry[] = [];
  const rows: OutlierIqrResult["rows"] = [];

  values.forEach((value, index) => {
    const classification = classifyObservationValue(
      value,
      lowerFence,
      upperFence,
    );
    const row = {
      index: index + 1,
      value,
      classification,
    };

    rows.push(row);

    if (classification === "lower-outlier") {
      const entry = { index: row.index, value };
      lowerOutliers.push(entry);
      outliers.push(entry);
    } else if (classification === "upper-outlier") {
      const entry = { index: row.index, value };
      upperOutliers.push(entry);
      outliers.push(entry);
    }
  });

  return {
    lowerOutliers,
    upperOutliers,
    outliers,
    rows,
  };
}

export function calculateOutlierIqr(
  values: number[],
  options: CalculateOutlierIqrOptions = {},
): OutlierIqrResult {
  validateObservationCount(values.length);
  validateObservationValues(values);

  const quartileMethod = resolveQuartileMethod(options.quartileMethod);
  const fenceMultiplier = resolveFenceMultiplier(options.fenceMultiplier);
  const originalValues = [...values];
  const sortedValues = [...values].sort((a, b) => a - b);
  const count = originalValues.length;
  const minimum = sortedValues[0];
  const maximum = sortedValues[count - 1];
  const { q1, median, q3 } = computeQuartiles(sortedValues, quartileMethod);
  const iqr = q3 - q1;
  const lowerFence = q1 - fenceMultiplier * iqr;
  const upperFence = q3 + fenceMultiplier * iqr;
  const { lowerWhisker, upperWhisker } = buildWhiskers(
    originalValues,
    lowerFence,
    upperFence,
  );
  const { lowerOutliers, upperOutliers, outliers, rows } = buildOutlierLists(
    originalValues,
    lowerFence,
    upperFence,
  );
  const { domainMin, domainMax } = buildBoxPlotDomain(minimum, maximum);
  const fiveNumberSummary = {
    minimum,
    q1,
    median,
    q3,
    maximum,
  };
  const boxPlot: OutlierIqrBoxPlotData = {
    domainMin,
    domainMax,
    lowerWhisker,
    q1,
    median,
    q3,
    upperWhisker,
    lowerFence,
    upperFence,
    lowerOutliers,
    upperOutliers,
  };

  return {
    originalValues,
    sortedValues,
    count,
    minimum,
    maximum,
    q1,
    median,
    q3,
    iqr,
    fenceMultiplier,
    fenceMultiplierId: getFenceMultiplierId(fenceMultiplier),
    lowerFence,
    upperFence,
    lowerWhisker,
    upperWhisker,
    lowerOutliers,
    upperOutliers,
    outliers,
    outlierCount: outliers.length,
    nonOutlierCount: count - outliers.length,
    quartileMethod,
    fiveNumberSummary,
    rows,
    boxPlot,
  };
}
