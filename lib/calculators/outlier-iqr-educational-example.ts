import { calculateOutlierIqr } from "@/lib/calculators/outlier-iqr";
import { formatDisplayNumber } from "@/lib/calculators/format-number";

/** Verified Phase 3.1 fixture F02 — one high outlier (high-outlier example). */
const EDUCATIONAL_EXAMPLE_VALUES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 100,
] as const;

const result = calculateOutlierIqr([...EDUCATIONAL_EXAMPLE_VALUES]);

const fmt = (value: number) => formatDisplayNumber(value, 4);

export const outlierIqrEducationalExample = {
  fixtureId: "F02",
  exampleId: "high-outlier",
  input: "1, 2, 3, 4, 5, 6, 7, 8, 9, 100",
  sortedInput: result.sortedValues.map((value) => fmt(value)).join(", "),
  quartileMethod: "exclusive-halves" as const,
  quartileMethodLabel: "Median of halves (exclusive)",
  fenceMultiplier: 1.5 as const,
  count: result.count,
  q1: fmt(result.q1),
  median: fmt(result.median),
  q3: fmt(result.q3),
  iqr: fmt(result.iqr),
  lowerFence: fmt(result.lowerFence),
  upperFence: fmt(result.upperFence),
  lowerWhisker: fmt(result.lowerWhisker),
  upperWhisker: fmt(result.upperWhisker),
  outlierValues: result.upperOutliers.map(
    (entry) => `#${entry.index}: ${fmt(entry.value)}`,
  ),
  outlierCount: result.outlierCount,
  result,
};
