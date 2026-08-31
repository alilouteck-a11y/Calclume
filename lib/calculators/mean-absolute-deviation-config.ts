import type { CalculationStep } from "@/components/calculator/CalculationSteps";
import {
  DEFAULT_DISPLAY_PRECISION,
  type DisplayPrecision,
  formatDisplayNumber,
  formatNumberList,
  formatSigned,
} from "@/lib/calculators/format-number";
import type { MeanAbsoluteDeviationResult } from "@/lib/calculators/mean-absolute-deviation";

export const MAD_TABLE_ROW_LIMIT = 100;

export type MadResultSummaryField = {
  label: string;
  value: string;
  mono?: boolean;
};

export function buildMadResultSummary(
  result: MeanAbsoluteDeviationResult,
  decimals: DisplayPrecision = DEFAULT_DISPLAY_PRECISION,
): MadResultSummaryField[] {
  return [
    {
      label: "Mean Absolute Deviation",
      value: formatDisplayNumber(result.meanAbsoluteDeviation, decimals),
    },
    {
      label: "Mean",
      value: formatDisplayNumber(result.mean, decimals),
      mono: true,
    },
    { label: "Count", value: String(result.count) },
    {
      label: "Sum of absolute deviations",
      value: formatDisplayNumber(result.absoluteDeviationSum, decimals),
      mono: true,
    },
    {
      label: "Minimum",
      value: formatDisplayNumber(result.minimum, decimals),
      mono: true,
    },
    {
      label: "Maximum",
      value: formatDisplayNumber(result.maximum, decimals),
      mono: true,
    },
    {
      label: "Range",
      value: formatDisplayNumber(result.range, decimals),
      mono: true,
    },
  ];
}

export const madCalculatorConfig = {
  slug: "mean-absolute-deviation",
  name: "Mean Absolute Deviation Calculator",
  description:
    "Calculate mean absolute deviation about the arithmetic mean with formula, step-by-step working, and interpretation.",
  path: "/calculators/statistics/mean-absolute-deviation/",
  lastReviewed: "2026-08-31",
  formula: {
    mean: "x̄ = (Σxᵢ) / n",
    absoluteDeviation: "|xᵢ − x̄|",
    mad: "MAD = (Σ|xᵢ − x̄|) / n",
    combined:
      "x̄ = (Σxᵢ) / n\n|xᵢ − x̄| = absolute deviation for each value\nMAD = (Σ|xᵢ − x̄|) / n",
  },
  rounding: {
    defaultDisplayDecimals: DEFAULT_DISPLAY_PRECISION,
    options: [2, 4, 6] as const,
    method: "half-up" as const,
    note: "Intermediate calculations use full floating-point precision. Displayed values follow the selected decimal places setting.",
  },
  examples: [
    {
      id: "class-scores",
      label: "Class test scores",
      description: "Five scores from a short quiz",
      input: "12, 15, 14, 10, 19",
      expectedMad: 2.4,
    },
    {
      id: "simple-set",
      label: "Simple dataset",
      description: "Three evenly spaced values",
      input: "2, 4, 6",
      expectedMad: 4 / 3,
    },
    {
      id: "consecutive",
      label: "Consecutive integers",
      description: "1 through 5",
      input: "1, 2, 3, 4, 5",
      expectedMad: 1.2,
    },
  ],
  sources: [
    {
      title: "NIST/SEMATECH e-Handbook — Measures of Scale",
      publisher: "National Institute of Standards and Technology",
      url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm",
      note: "Discusses average absolute deviation about the mean as a scale measure and separately defines median absolute deviation (which NIST abbreviates MAD).",
    },
    {
      title: "OpenStax Introductory Statistics — Measures of the Spread of the Data",
      publisher: "OpenStax",
      url: "https://openstax.org/books/introductory-statistics/pages/2-7-measures-of-the-spread-of-the-data",
      note: "Consulted for mean, deviations, and standard-deviation context when contrasting dispersion measures—not as a mean-absolute-deviation formula source.",
    },
  ],
} as const;

export function buildMadSteps(
  result: MeanAbsoluteDeviationResult,
  decimals: DisplayPrecision = DEFAULT_DISPLAY_PRECISION,
): CalculationStep[] {
  const fmt = (value: number) => formatDisplayNumber(value, decimals);

  const valuesFormatted = formatNumberList(
    result.rows.map((row) => row.value),
    decimals,
  );
  const deviationTerms = result.rows
    .map((row) => fmt(row.absoluteDeviation))
    .join(" + ");

  return [
    {
      label: "Count the values",
      detail: `n = ${result.count}`,
    },
    {
      label: "Compute the arithmetic mean",
      detail: `x̄ = (${valuesFormatted}) / ${result.count} = ${fmt(result.sum)} / ${result.count} = ${fmt(result.mean)}`,
    },
    {
      label: "Find absolute deviations from the mean",
      detail: result.rows
        .map(
          (row) =>
            `|${fmt(row.value)} − ${fmt(result.mean)}| = ${fmt(row.absoluteDeviation)}`,
        )
        .join("\n"),
    },
    {
      label: "Sum the absolute deviations",
      detail: `Σ|xᵢ − x̄| = ${deviationTerms} = ${fmt(result.absoluteDeviationSum)}`,
    },
    {
      label: "Divide by n to get MAD",
      detail: `MAD = ${fmt(result.absoluteDeviationSum)} / ${result.count} = ${fmt(result.meanAbsoluteDeviation)}`,
    },
  ];
}

export function buildMadInterpretation(
  result: MeanAbsoluteDeviationResult,
  decimals: DisplayPrecision = DEFAULT_DISPLAY_PRECISION,
): string {
  const mad = formatDisplayNumber(result.meanAbsoluteDeviation, decimals);
  const mean = formatDisplayNumber(result.mean, decimals);

  return `Values in this dataset are, on average, ${mad} units away from the arithmetic mean of ${mean}.`;
}

export function buildMadCopyText(
  result: MeanAbsoluteDeviationResult,
  datasetInput: string,
  decimals: DisplayPrecision = DEFAULT_DISPLAY_PRECISION,
): string {
  const fmt = (value: number) => formatDisplayNumber(value, decimals);

  return [
    `Dataset: ${datasetInput.trim()}`,
    `Count (n): ${result.count}`,
    `Mean (x̄): ${fmt(result.mean)}`,
    `Mean Absolute Deviation (MAD): ${fmt(result.meanAbsoluteDeviation)}`,
    `Sum of absolute deviations: ${fmt(result.absoluteDeviationSum)}`,
    `Minimum: ${fmt(result.minimum)}`,
    `Maximum: ${fmt(result.maximum)}`,
    `Range: ${fmt(result.range)}`,
    "",
    `Formula: ${madCalculatorConfig.formula.mad}`,
  ].join("\n");
}

export type MadTableRow = {
  index: number;
  value: string;
  signedDeviation: string;
  absoluteDeviation: string;
};

export function buildMadTableRows(
  result: MeanAbsoluteDeviationResult,
  decimals: DisplayPrecision = DEFAULT_DISPLAY_PRECISION,
): MadTableRow[] {
  return result.rows.map((row) => ({
    index: row.index,
    value: formatDisplayNumber(row.value, decimals),
    signedDeviation: formatSigned(row.signedDeviation, decimals),
    absoluteDeviation: formatDisplayNumber(row.absoluteDeviation, decimals),
  }));
}
