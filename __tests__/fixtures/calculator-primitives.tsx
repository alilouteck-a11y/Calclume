"use client";

import { CalculationSteps } from "@/components/calculator/CalculationSteps";
import { CalculatorInputPanel } from "@/components/calculator/CalculatorInputPanel";
import { CalculatorResultPanel } from "@/components/calculator/CalculatorResultPanel";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { DatasetInput } from "@/components/calculator/DatasetInput";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { InterpretationPanel } from "@/components/calculator/InterpretationPanel";
import { ResetButton } from "@/components/calculator/ResetButton";
import { ResultTable } from "@/components/calculator/ResultTable";

type CalculatorFixtureProps = {
  datasetValue: string;
  datasetError?: string;
  result: string;
  onReset?: () => void;
  showTable?: boolean;
};

/** Non-indexed test fixture for calculator UI primitives. */
export function CalculatorFixture({
  datasetValue,
  datasetError,
  result,
  onReset = () => {},
  showTable = false,
}: CalculatorFixtureProps) {
  return (
    <CalculatorShell title="Fixture Calculator" description="Test fixture only">
      <div className="space-y-6">
        <CalculatorInputPanel description="Enter comma-separated values">
          <DatasetInput
            label="Sample data"
            value={datasetValue}
            onChange={() => {}}
            error={datasetError}
          />
          <ResetButton onReset={onReset} />
        </CalculatorInputPanel>
        <CalculatorResultPanel>
          <p className="text-2xl font-bold">{result}</p>
        </CalculatorResultPanel>
        <FormulaBlock formula="x̄ = Σx / n" />
        <CalculationSteps
          steps={[{ label: "Sum values", detail: "1 + 2 + 3 = 6" }]}
        />
        <InterpretationPanel interpretation="The mean summarizes the center of the dataset." />
        {showTable && (
          <ResultTable
            caption="Sample values"
            columns={[
              { key: "value", header: "Value" },
              { key: "index", header: "Index", align: "right" },
            ]}
            rows={[
              { value: "1", index: 1 },
              { value: "2", index: 2 },
            ]}
          />
        )}
      </div>
    </CalculatorShell>
  );
}
