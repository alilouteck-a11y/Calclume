"use client";

import { useMemo, useState } from "react";
import { CalculationSteps } from "@/components/calculator/CalculationSteps";
import { CalculatorInputPanel } from "@/components/calculator/CalculatorInputPanel";
import { CalculatorNotice } from "@/components/calculator/CalculatorNotice";
import { CalculatorResultPanel } from "@/components/calculator/CalculatorResultPanel";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { CopyResultButton } from "@/components/calculator/CopyResultButton";
import { DatasetInput } from "@/components/calculator/DatasetInput";
import {
  DEFAULT_DISPLAY_PRECISION,
  DisplayPrecisionSelector,
} from "@/components/calculator/DisplayPrecisionSelector";
import { ExampleSelector } from "@/components/calculator/ExampleSelector";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { InterpretationPanel } from "@/components/calculator/InterpretationPanel";
import { ResetButton } from "@/components/calculator/ResetButton";
import { ResultTable } from "@/components/calculator/ResultTable";
import { Button } from "@/components/ui/Button";
import {
  buildMadCopyText,
  buildMadInterpretation,
  buildMadResultSummary,
  buildMadSteps,
  buildMadTableRows,
  MAD_TABLE_ROW_LIMIT,
  madCalculatorConfig,
} from "@/lib/calculators/mean-absolute-deviation-config";
import { calculateMeanAbsoluteDeviation } from "@/lib/calculators/mean-absolute-deviation";
import type { DisplayPrecision } from "@/lib/calculators/format-number";
import { parseDataset } from "@/lib/calculators/parse-dataset";

const EMPTY_STATE_MESSAGE =
  "Enter a dataset and press Calculate MAD to see the result.";

export function MeanAbsoluteDeviationCalculator() {
  const [input, setInput] = useState("");
  const [selectedExampleId, setSelectedExampleId] = useState("");
  const [calculatedResult, setCalculatedResult] = useState<
    ReturnType<typeof calculateMeanAbsoluteDeviation> | null
  >(null);
  const [calculatedInput, setCalculatedInput] = useState("");
  const [validationError, setValidationError] = useState<string | undefined>();
  const [decimalPlaces, setDecimalPlaces] = useState<DisplayPrecision>(
    DEFAULT_DISPLAY_PRECISION,
  );
  const [tableExpanded, setTableExpanded] = useState(false);
  const [copyResetKey, setCopyResetKey] = useState(0);

  const summary = useMemo(
    () =>
      calculatedResult
        ? buildMadResultSummary(calculatedResult, decimalPlaces)
        : null,
    [calculatedResult, decimalPlaces],
  );

  const tableRows = useMemo(() => {
    if (!calculatedResult) {
      return [];
    }

    const allRows = buildMadTableRows(calculatedResult, decimalPlaces);

    if (
      calculatedResult.count <= MAD_TABLE_ROW_LIMIT ||
      tableExpanded
    ) {
      return allRows;
    }

    return allRows.slice(0, MAD_TABLE_ROW_LIMIT);
  }, [calculatedResult, decimalPlaces, tableExpanded]);

  const canReset =
    input !== "" ||
    selectedExampleId !== "" ||
    calculatedResult !== null ||
    validationError !== undefined ||
    tableExpanded;

  function handleCalculate() {
    const parsed = parseDataset(input);

    if (!parsed.ok) {
      setValidationError(parsed.error);
      setCalculatedResult(null);
      setCalculatedInput("");
      setTableExpanded(false);
      return;
    }

    setValidationError(undefined);
    setCalculatedResult(calculateMeanAbsoluteDeviation(parsed.values));
    setCalculatedInput(input);
    setTableExpanded(false);
  }

  function handleReset() {
    setInput("");
    setSelectedExampleId("");
    setCalculatedResult(null);
    setCalculatedInput("");
    setValidationError(undefined);
    setTableExpanded(false);
    setCopyResetKey((key) => key + 1);
  }

  function handleInputChange(value: string) {
    setInput(value);
    setSelectedExampleId("");
  }

  function handleExampleChange(exampleId: string) {
    setSelectedExampleId(exampleId);

    if (!exampleId) {
      setInput("");
      setCalculatedResult(null);
      setCalculatedInput("");
      setValidationError(undefined);
      setTableExpanded(false);
      return;
    }

    const example = madCalculatorConfig.examples.find(
      (item) => item.id === exampleId,
    );

    if (example) {
      setInput(example.input);
      setCalculatedResult(null);
      setCalculatedInput("");
      setValidationError(undefined);
      setTableExpanded(false);
    }
  }

  function toggleTableExpansion() {
    setTableExpanded((expanded) => !expanded);
  }

  return (
    <CalculatorShell
      title="Calculate mean absolute deviation"
      description="Enter numeric values to compute MAD about the arithmetic mean. Calculations run locally in your browser."
    >
      <div className="space-y-6">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
          <CalculatorInputPanel description="Separate values with commas, spaces, semicolons, or line breaks.">
            <ExampleSelector
              label="Load an example"
              description="Select a dataset with a known correct result."
              placeholder={{ id: "", label: "Choose an example" }}
              options={madCalculatorConfig.examples.map((example) => ({
                id: example.id,
                label: example.label,
                description: example.description,
              }))}
              value={selectedExampleId}
              onChange={handleExampleChange}
            />
            <DatasetInput
              label="Dataset values"
              description="This calculator computes mean absolute deviation about the arithmetic mean and divides the sum of absolute deviations by the number of observations, n."
              value={input}
              onChange={handleInputChange}
              error={validationError}
              placeholder="e.g. 12, 15, 14, 10, 19"
            />
            <DisplayPrecisionSelector
              value={decimalPlaces}
              onChange={setDecimalPlaces}
            />
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleCalculate}>Calculate MAD</Button>
              <ResetButton disabled={!canReset} onReset={handleReset} />
              {calculatedResult && (
                <CopyResultButton
                  key={copyResetKey}
                  value={buildMadCopyText(
                    calculatedResult,
                    calculatedInput,
                    decimalPlaces,
                  )}
                />
              )}
            </div>
          </CalculatorInputPanel>

          <CalculatorResultPanel>
            {summary ? (
              <dl>
                <div className="border-b border-border pb-3">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {summary[0].label}
                  </dt>
                  <dd className="mt-1 break-words font-bold text-ink [font-size:var(--text-result-primary)] [line-height:var(--text-result-primary-line-height)]">
                    MAD = <span>{summary[0].value}</span>
                  </dd>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {summary.slice(1).map((field) => (
                    <div key={field.label}>
                      <dt className="text-sm text-muted">{field.label}</dt>
                      <dd
                        className={`mt-0.5 text-sm font-medium text-ink ${field.mono ? "font-mono" : ""}`}
                      >
                        {field.value}
                      </dd>
                    </div>
                  ))}
                </div>
              </dl>
            ) : (
              <p className="text-sm text-muted">{EMPTY_STATE_MESSAGE}</p>
            )}
          </CalculatorResultPanel>
        </div>

        {calculatedResult && (
          <>
            <FormulaBlock
              label="Formula"
              formula={madCalculatorConfig.formula.combined}
            />
            <CalculationSteps
              steps={buildMadSteps(calculatedResult, decimalPlaces)}
            />
            <section aria-labelledby="mad-deviation-table-heading">
              <h3
                id="mad-deviation-table-heading"
                className="text-base font-semibold text-ink"
              >
                Deviation table
              </h3>
              {calculatedResult.count > MAD_TABLE_ROW_LIMIT && (
                <p className="mt-1 text-sm text-muted">
                  {tableExpanded
                    ? `Showing all ${calculatedResult.count} observations.`
                    : `Showing ${MAD_TABLE_ROW_LIMIT} of ${calculatedResult.count} observations`}
                </p>
              )}
              <div className="mt-4 overflow-x-auto">
                <ResultTable
                  caption="Absolute deviations for each value"
                  columns={[
                    { key: "index", header: "#", align: "right" },
                    { key: "value", header: "xᵢ", align: "right" },
                    {
                      key: "signedDeviation",
                      header: "xᵢ − x̄",
                      align: "right",
                    },
                    {
                      key: "absoluteDeviation",
                      header: "|xᵢ − x̄|",
                      align: "right",
                    },
                  ]}
                  rows={tableRows}
                />
              </div>
              {calculatedResult.count > MAD_TABLE_ROW_LIMIT && (
                <button
                  type="button"
                  onClick={toggleTableExpansion}
                  className="mt-3 inline-flex min-h-11 items-center rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
                >
                  {tableExpanded
                    ? "Show first 100 rows"
                    : `Show all ${calculatedResult.count} rows`}
                </button>
              )}
            </section>
            <InterpretationPanel
              interpretation={buildMadInterpretation(
                calculatedResult,
                decimalPlaces,
              )}
            />
          </>
        )}

        <CalculatorNotice title="About this calculation">
          This calculator computes mean absolute deviation about the arithmetic
          mean and divides the sum of absolute deviations by the number of
          observations, n. It is not median absolute deviation or mean absolute
          percentage error. There is no n − 1 sample option in this calculator.{" "}
          {madCalculatorConfig.rounding.note}
        </CalculatorNotice>
      </div>
    </CalculatorShell>
  );
}
