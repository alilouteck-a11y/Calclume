export type QuartileMethod = "exclusive-halves" | "excel-r7";

export type FenceMultiplier = 1.5 | 3;

export type FenceMultiplierId = "inner-1.5" | "outer-3.0";

export type ObservationClassification =
  | "non-outlier"
  | "lower-outlier"
  | "upper-outlier";

export type OutlierIqrObservationRow = {
  index: number;
  value: number;
  classification: ObservationClassification;
};

export type OutlierIqrOutlierEntry = {
  index: number;
  value: number;
};

export type OutlierIqrFiveNumberSummary = {
  minimum: number;
  q1: number;
  median: number;
  q3: number;
  maximum: number;
};

export type OutlierIqrBoxPlotData = {
  domainMin: number;
  domainMax: number;
  lowerWhisker: number;
  q1: number;
  median: number;
  q3: number;
  upperWhisker: number;
  lowerFence: number;
  upperFence: number;
  lowerOutliers: OutlierIqrOutlierEntry[];
  upperOutliers: OutlierIqrOutlierEntry[];
};

export type OutlierIqrResult = {
  originalValues: number[];
  sortedValues: number[];
  count: number;
  minimum: number;
  maximum: number;
  q1: number;
  median: number;
  q3: number;
  iqr: number;
  fenceMultiplier: FenceMultiplier;
  fenceMultiplierId: FenceMultiplierId;
  lowerFence: number;
  upperFence: number;
  lowerWhisker: number;
  upperWhisker: number;
  lowerOutliers: OutlierIqrOutlierEntry[];
  upperOutliers: OutlierIqrOutlierEntry[];
  outliers: OutlierIqrOutlierEntry[];
  outlierCount: number;
  nonOutlierCount: number;
  quartileMethod: QuartileMethod;
  fiveNumberSummary: OutlierIqrFiveNumberSummary;
  rows: OutlierIqrObservationRow[];
  boxPlot: OutlierIqrBoxPlotData;
};

export type CalculateOutlierIqrOptions = {
  quartileMethod?: QuartileMethod;
  fenceMultiplier?: FenceMultiplier;
};

export const MIN_OUTLIER_IQR_OBSERVATIONS = 4;

export const MAX_OUTLIER_IQR_OBSERVATIONS = 1000;

export const INSUFFICIENT_OUTLIER_IQR_DATA_MESSAGE =
  "At least 4 observations are required for quartile and IQR calculations.";

export const TOO_MANY_OUTLIER_IQR_OBSERVATIONS_MESSAGE =
  "Datasets are limited to 1,000 observations for quartile and IQR calculations.";

export const INVALID_OUTLIER_IQR_VALUE_MESSAGE =
  "All observations must be finite numbers.";

export const INVALID_QUARTILE_METHOD_MESSAGE =
  "Unsupported quartile method.";

export const INVALID_FENCE_MULTIPLIER_MESSAGE =
  "Unsupported fence multiplier.";

export const DEFAULT_QUARTILE_METHOD: QuartileMethod = "exclusive-halves";

export const DEFAULT_FENCE_MULTIPLIER: FenceMultiplier = 1.5;

export const SUPPORTED_QUARTILE_METHODS = [
  "exclusive-halves",
  "excel-r7",
] as const satisfies readonly QuartileMethod[];

export const SUPPORTED_FENCE_MULTIPLIERS = [1.5, 3] as const satisfies readonly FenceMultiplier[];

export function isQuartileMethod(value: string): value is QuartileMethod {
  return (SUPPORTED_QUARTILE_METHODS as readonly string[]).includes(value);
}

export function isFenceMultiplier(value: number): value is FenceMultiplier {
  return value === 1.5 || value === 3;
}

export function getFenceMultiplierId(
  multiplier: FenceMultiplier,
): FenceMultiplierId {
  return multiplier === 1.5 ? "inner-1.5" : "outer-3.0";
}
