/**
 * Compatibility layer for pre–Phase 4.1 portfolio consumers.
 * Derived from the unified calculator catalog — do not edit calculator metadata here.
 */

import {
  getCalculatorsByCategory,
  type CalculatorRecord,
} from "@/lib/calculator-catalog";

/** Legacy portfolio status — published tools surface as launch-candidates for UI lists. */
export type CalculatorStatus = "launch-candidate" | "expansion-candidate";

export type PlannedCalculator = {
  slug: string;
  name: string;
  description: string;
  status: CalculatorStatus;
};

function toPlannedStatus(
  status: CalculatorRecord["status"],
): CalculatorStatus | null {
  if (status === "expansion-candidate") {
    return "expansion-candidate";
  }
  if (status === "published" || status === "launch-candidate") {
    return "launch-candidate";
  }
  return null;
}

function toPlannedCalculator(record: CalculatorRecord): PlannedCalculator | null {
  const status = toPlannedStatus(record.status);
  if (!status) {
    return null;
  }
  return {
    slug: record.slug,
    name: record.name,
    description: record.description,
    status,
  };
}

/** Statistics planning + published tools as PlannedCalculator records (catalog-derived). */
export const statisticsCalculators: PlannedCalculator[] = getCalculatorsByCategory(
  "statistics",
)
  .map(toPlannedCalculator)
  .filter((entry): entry is PlannedCalculator => entry !== null);

export const launchCandidates = statisticsCalculators.filter(
  (calculator) => calculator.status === "launch-candidate",
);

export const expansionCandidates = statisticsCalculators.filter(
  (calculator) => calculator.status === "expansion-candidate",
);
