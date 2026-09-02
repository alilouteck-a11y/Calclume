/**
 * Planning records only. These calculators are not published as public routes in Phase 1.
 */

export type CalculatorStatus = "launch-candidate" | "expansion-candidate";

export type PlannedCalculator = {
  slug: string;
  name: string;
  description: string;
  status: CalculatorStatus;
};

export const statisticsCalculators: PlannedCalculator[] = [
  {
    slug: "mean-absolute-deviation",
    name: "Mean Absolute Deviation Calculator",
    description:
      "Measure average distance from the mean with formula and step-by-step working.",
    status: "launch-candidate",
  },
  {
    slug: "outlier-iqr",
    name: "Outlier and IQR Calculator",
    description:
      "Identify outliers using the interquartile range method with transparent steps.",
    status: "launch-candidate",
  },
  {
    slug: "coefficient-of-variation",
    name: "Coefficient of Variation Calculator",
    description:
      "Compare relative variability across datasets using CV with clear interpretation.",
    status: "launch-candidate",
  },
  {
    slug: "standard-error",
    name: "Standard Error Calculator",
    description:
      "Calculate standard error of the mean with formula breakdown and context.",
    status: "launch-candidate",
  },
  {
    slug: "critical-value",
    name: "Critical Value Calculator",
    description:
      "Find critical values for common distributions with documented methodology.",
    status: "launch-candidate",
  },
  {
    slug: "confidence-interval",
    name: "Confidence Interval Calculator",
    description:
      "Build confidence intervals around sample statistics with full working shown.",
    status: "expansion-candidate",
  },
  {
    slug: "p-value",
    name: "P-Value Calculator",
    description:
      "Compute p-values for common test scenarios with step-by-step explanation.",
    status: "expansion-candidate",
  },
  {
    slug: "sample-size",
    name: "Sample Size Calculator",
    description:
      "Estimate required sample sizes for common study designs.",
    status: "expansion-candidate",
  },
  {
    slug: "linear-regression",
    name: "Linear Regression Calculator",
    description:
      "Fit a simple linear model with slope, intercept, and diagnostic steps.",
    status: "expansion-candidate",
  },
];

export const launchCandidates = statisticsCalculators.filter(
  (calculator) => calculator.status === "launch-candidate",
);

export const expansionCandidates = statisticsCalculators.filter(
  (calculator) => calculator.status === "expansion-candidate",
);
