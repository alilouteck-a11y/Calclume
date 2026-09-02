import type { CalculationStep } from "@/components/calculator/CalculationSteps";
import {
  DEFAULT_DISPLAY_PRECISION,
  type DisplayPrecision,
  formatDisplayNumber,
  formatNumberList,
} from "@/lib/calculators/format-number";
import type {
  FenceMultiplier,
  ObservationClassification,
  OutlierIqrResult,
  QuartileMethod,
} from "@/lib/calculators/outlier-iqr-schema";

export const OUTLIER_IQR_TABLE_ROW_LIMIT = 100;

export const OUTLIER_LIST_DISPLAY_LIMIT = 20;

export const STALE_RESULT_NOTICE =
  "Settings or data have changed. Press Calculate outliers and IQR to update the result.";

export const EMPTY_STATE_MESSAGE =
  "Enter a dataset and press Calculate outliers and IQR to see the result.";

export type OutlierIqrResultSummaryField = {
  label: string;
  value: string;
  mono?: boolean;
  primary?: boolean;
};

export type QuartileMethodOption = {
  value: QuartileMethod;
  label: string;
  helper: string;
};

export type FenceMultiplierOption = {
  value: FenceMultiplier;
  label: string;
  helper: string;
};

export const quartileMethodOptions: QuartileMethodOption[] = [
  {
    value: "exclusive-halves",
    label: "Median of halves (exclusive)",
    helper:
      "Splits sorted data into lower and upper halves and takes the median of each. When the count is odd, the overall median is excluded from both halves. Other calculators may use different quartile rules.",
  },
  {
    value: "excel-r7",
    label: "Excel-compatible percentile (INC)",
    helper:
      "Uses linear interpolation equivalent to Excel PERCENTILE.INC. Useful when comparing to spreadsheet output.",
  },
];

export const fenceMultiplierOptions: FenceMultiplierOption[] = [
  {
    value: 1.5,
    label: "1.5 × IQR — standard inner fences",
    helper:
      "Changes fence distance only. Quartiles (Q1, median, Q3) stay the same.",
  },
  {
    value: 3,
    label: "3.0 × IQR — wider outer fences",
    helper:
      "Uses a wider fence multiplier. Quartiles are unchanged; only fence boundaries move.",
  },
];

export function getQuartileMethodLabel(method: QuartileMethod): string {
  return (
    quartileMethodOptions.find((option) => option.value === method)?.label ??
    method
  );
}

export function getFenceMultiplierLabel(multiplier: FenceMultiplier): string {
  return (
    fenceMultiplierOptions.find((option) => option.value === multiplier)?.label ??
    `${multiplier} × IQR`
  );
}

export function getClassificationLabel(
  classification: ObservationClassification,
): string {
  switch (classification) {
    case "lower-outlier":
      return "Below lower fence";
    case "upper-outlier":
      return "Above upper fence";
    default:
      return "Within fences";
  }
}

export const outlierIqrCalculatorConfig = {
  slug: "outlier-iqr",
  name: "Outlier and IQR Calculator",
  description:
    "Calculate Q1, median, Q3, and IQR from your data. Find Tukey fence boundaries, identify potential outliers, view the five-number summary and an accessible box plot, and choose a quartile method—all computed locally in your browser.",
  path: "/calculators/statistics/outlier-iqr/",
  lastReviewed: "2026-09-02",
  formula: {
    iqr: "IQR = Q3 − Q1",
    lowerFence: "Lower fence = Q1 − k × IQR",
    upperFence: "Upper fence = Q3 + k × IQR",
    combined:
      "IQR = Q3 − Q1\nLower fence = Q1 − k × IQR\nUpper fence = Q3 + k × IQR",
  },
  rounding: {
    defaultDisplayDecimals: DEFAULT_DISPLAY_PRECISION,
    note: "Intermediate calculations use full floating-point precision. Displayed values follow the selected decimal places setting.",
  },
  examples: [
    {
      id: "even-spread",
      label: "Even spread (no outliers)",
      description: "Seven values with no points beyond 1.5×IQR fences (F01)",
      input: "2, 4, 6, 8, 10, 12, 14",
      expectedIqr: 8,
      expectedOutlierCount: 0,
      source: "Phase 3.1 fixture F01",
    },
    {
      id: "high-outlier",
      label: "One high outlier",
      description: "Single value beyond the upper fence (F02)",
      input: "1, 2, 3, 4, 5, 6, 7, 8, 9, 100",
      expectedIqr: 5,
      expectedOutlierCount: 1,
      source: "Phase 3.1 fixture F02",
    },
    {
      id: "low-outlier",
      label: "One low outlier",
      description: "Single value below the lower fence (F03)",
      input: "1, 10, 11, 12, 13, 14, 15, 16, 17, 18",
      expectedIqr: 5,
      expectedOutlierCount: 1,
      source: "Phase 3.1 fixture F03",
    },
    {
      id: "method-comparison",
      label: "Quartile method comparison",
      description: "Q1 and Q3 differ between exclusive-halves and Excel INC (F16)",
      input: "10, 12, 14, 15, 19",
      expectedIqr: 6,
      expectedOutlierCount: 0,
      source: "Phase 3.1 fixture F16 (exclusive-halves default)",
    },
  ],
  sources: [
    {
      title: "NIST/SEMATECH e-Handbook — What are outliers in the data?",
      publisher: "National Institute of Standards and Technology",
      url: "https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm",
      note: "Defines outliers in exploratory analysis; describes box-plot quartiles, IQR, and inner/outer fence multipliers (1.5× and 3× IQR). NIST quartile extraction in worked examples may differ from classroom median-of-halves rules—CalcLume documents its quartile methods separately.",
    },
    {
      title: "OpenStax Introductory Statistics — Box Plots",
      publisher: "OpenStax",
      url: "https://openstax.org/books/introductory-statistics-2e/pages/2-4-box-plots",
      note: "Five-number summary components, IQR, whiskers, and outlier marking in box-plot context.",
    },
    {
      title: "Langford (2006) — Quartiles in elementary education",
      publisher: "American Statistician",
      url: "https://doi.org/10.1080/10691898.2006.11910589",
      note: "Documents that quartile definitions vary across textbooks and software; supports offering an explicit method selector.",
    },
  ],
} as const;

export function buildOutlierIqrResultSummary(
  result: OutlierIqrResult,
  decimals: DisplayPrecision = DEFAULT_DISPLAY_PRECISION,
): OutlierIqrResultSummaryField[] {
  const fmt = (value: number) => formatDisplayNumber(value, decimals);

  return [
    {
      label: "Interquartile range (IQR)",
      value: fmt(result.iqr),
      primary: true,
      mono: true,
    },
    { label: "Outlier count", value: String(result.outlierCount) },
    { label: "Q1", value: fmt(result.q1), mono: true },
    { label: "Median", value: fmt(result.median), mono: true },
    { label: "Q3", value: fmt(result.q3), mono: true },
    { label: "Lower fence", value: fmt(result.lowerFence), mono: true },
    { label: "Upper fence", value: fmt(result.upperFence), mono: true },
  ];
}

export function buildOutlierIqrSteps(
  result: OutlierIqrResult,
  decimals: DisplayPrecision = DEFAULT_DISPLAY_PRECISION,
): CalculationStep[] {
  const fmt = (value: number) => formatDisplayNumber(value, decimals);
  const k = formatDisplayNumber(result.fenceMultiplier, decimals);

  return [
    {
      label: "Sort the data",
      detail: formatNumberList(result.sortedValues, decimals),
    },
    {
      label: `Find quartiles (${getQuartileMethodLabel(result.quartileMethod)})`,
      detail: `Q1 = ${fmt(result.q1)}, Median = ${fmt(result.median)}, Q3 = ${fmt(result.q3)}`,
    },
    {
      label: "Compute the interquartile range",
      detail: `IQR = Q3 − Q1 = ${fmt(result.q3)} − ${fmt(result.q1)} = ${fmt(result.iqr)}`,
    },
    {
      label: "Compute fence boundaries",
      detail: [
        `Lower fence = Q1 − k × IQR = ${fmt(result.q1)} − ${k} × ${fmt(result.iqr)} = ${fmt(result.lowerFence)}`,
        `Upper fence = Q3 + k × IQR = ${fmt(result.q3)} + ${k} × ${fmt(result.iqr)} = ${fmt(result.upperFence)}`,
      ].join("\n"),
    },
    {
      label: "Classify each observation",
      detail: `${result.outlierCount} outlier(s); ${result.nonOutlierCount} within fences (strict comparisons: values on a fence are not outliers).`,
    },
    {
      label: "Locate whisker endpoints",
      detail: `Lower whisker = ${fmt(result.lowerWhisker)}, Upper whisker = ${fmt(result.upperWhisker)} (most extreme non-outlier values).`,
    },
  ];
}

export function buildOutlierIqrInterpretation(
  result: OutlierIqrResult,
  decimals: DisplayPrecision = DEFAULT_DISPLAY_PRECISION,
): string {
  const iqr = formatDisplayNumber(result.iqr, decimals);
  const method = getQuartileMethodLabel(result.quartileMethod);
  const multiplier = getFenceMultiplierLabel(result.fenceMultiplier);
  const count = result.outlierCount;

  if (count === 0) {
    return `The interquartile range for this dataset is ${iqr}. Using ${multiplier} with ${method}, no observations fall outside the fences.`;
  }

  const noun = count === 1 ? "observation" : "observations";
  return `The interquartile range for this dataset is ${iqr}. Using ${multiplier} with ${method}, ${count} ${noun} fall outside the fences and are flagged for review. Fences are reference boundaries—not automatic reasons to delete data.`;
}

export function buildOutlierIqrCopyText(
  result: OutlierIqrResult,
  datasetInput: string,
  decimals: DisplayPrecision = DEFAULT_DISPLAY_PRECISION,
): string {
  const fmt = (value: number) => formatDisplayNumber(value, decimals);

  const lowerOutliers =
    result.lowerOutliers.length > 0
      ? result.lowerOutliers
          .map((entry) => `#${entry.index}: ${fmt(entry.value)}`)
          .join(", ")
      : "none";
  const upperOutliers =
    result.upperOutliers.length > 0
      ? result.upperOutliers
          .map((entry) => `#${entry.index}: ${fmt(entry.value)}`)
          .join(", ")
      : "none";

  return [
    `Dataset: ${datasetInput.trim()}`,
    `Count: ${result.count}`,
    `Quartile method: ${getQuartileMethodLabel(result.quartileMethod)}`,
    `Fence multiplier: ${getFenceMultiplierLabel(result.fenceMultiplier)}`,
    `Data minimum: ${fmt(result.minimum)}`,
    `Q1: ${fmt(result.q1)}`,
    `Median: ${fmt(result.median)}`,
    `Q3: ${fmt(result.q3)}`,
    `Data maximum: ${fmt(result.maximum)}`,
    `IQR: ${fmt(result.iqr)}`,
    `Lower fence: ${fmt(result.lowerFence)}`,
    `Upper fence: ${fmt(result.upperFence)}`,
    `Lower whisker: ${fmt(result.lowerWhisker)}`,
    `Upper whisker: ${fmt(result.upperWhisker)}`,
    `Outlier count: ${result.outlierCount}`,
    `Lower outliers: ${lowerOutliers}`,
    `Upper outliers: ${upperOutliers}`,
    "",
    outlierIqrCalculatorConfig.formula.combined,
  ].join("\n");
}

export type OutlierIqrTableRow = {
  index: number;
  value: string;
  classification: string;
};

export function buildOutlierIqrTableRows(
  result: OutlierIqrResult,
  decimals: DisplayPrecision = DEFAULT_DISPLAY_PRECISION,
): OutlierIqrTableRow[] {
  return result.rows.map((row) => ({
    index: row.index,
    value: formatDisplayNumber(row.value, decimals),
    classification: getClassificationLabel(row.classification),
  }));
}

export function buildBoxPlotSummaryText(
  result: OutlierIqrResult,
  decimals: DisplayPrecision = DEFAULT_DISPLAY_PRECISION,
): string {
  const fmt = (value: number) => formatDisplayNumber(value, decimals);
  const outlierPhrase =
    result.outlierCount === 0
      ? "No outliers flagged."
      : `${result.outlierCount} outlier(s) flagged.`;

  return `Box plot summary: lower whisker ${fmt(result.lowerWhisker)}, Q1 ${fmt(result.q1)}, median ${fmt(result.median)}, Q3 ${fmt(result.q3)}, upper whisker ${fmt(result.upperWhisker)}. Lower fence at ${fmt(result.lowerFence)}, upper fence at ${fmt(result.upperFence)}. ${outlierPhrase} Quartile method: ${getQuartileMethodLabel(result.quartileMethod)}. Fence multiplier: ${getFenceMultiplierLabel(result.fenceMultiplier)}.`;
}
