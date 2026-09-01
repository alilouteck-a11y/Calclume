"use client";

import { useMemo, useRef, useState } from "react";
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
import { Button } from "@/components/ui/Button";
import { AccessibleBoxPlot } from "@/components/calculators/outlier-iqr/AccessibleBoxPlot";
import { FenceMultiplierSelector } from "@/components/calculators/outlier-iqr/FenceMultiplierSelector";
import { FenceWhiskerDetails } from "@/components/calculators/outlier-iqr/FenceWhiskerDetails";
import { FiveNumberSummary } from "@/components/calculators/outlier-iqr/FiveNumberSummary";
import { ObservationClassificationTable } from "@/components/calculators/outlier-iqr/ObservationClassificationTable";
import { OutlierIqrResultSummary } from "@/components/calculators/outlier-iqr/OutlierIqrResultSummary";
import { OutlierLists } from "@/components/calculators/outlier-iqr/OutlierList";
import { QuartileMethodSelector } from "@/components/calculators/outlier-iqr/QuartileMethodSelector";
import {
  buildOutlierIqrCopyText,
  buildOutlierIqrInterpretation,
  buildOutlierIqrResultSummary,
  buildOutlierIqrSteps,
  buildOutlierIqrTableRows,
  EMPTY_STATE_MESSAGE,
  outlierIqrCalculatorConfig,
  OUTLIER_IQR_TABLE_ROW_LIMIT,
  STALE_RESULT_NOTICE,
} from "@/lib/calculators/outlier-iqr-config";
import { calculateOutlierIqr } from "@/lib/calculators/outlier-iqr";
import type { DisplayPrecision } from "@/lib/calculators/format-number";
import {
  DEFAULT_FENCE_MULTIPLIER,
  DEFAULT_QUARTILE_METHOD,
  type FenceMultiplier,
  type OutlierIqrResult,
  type QuartileMethod,
} from "@/lib/calculators/outlier-iqr-schema";
import { parseDataset } from "@/lib/calculators/parse-dataset";

type CalculationSnapshot = {
  result: OutlierIqrResult;
  input: string;
  quartileMethod: QuartileMethod;
  fenceMultiplier: FenceMultiplier;
};

function mapCalculationError(error: unknown): string {
  if (error instanceof RangeError) {
    return error.message;
  }

  return "Unable to calculate IQR and outliers. Check your dataset and try again.";
}

export function OutlierIqrCalculator() {
  const datasetInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState("");
  const [selectedExampleId, setSelectedExampleId] = useState("");
  const [quartileMethod, setQuartileMethod] =
    useState<QuartileMethod>(DEFAULT_QUARTILE_METHOD);
  const [fenceMultiplier, setFenceMultiplier] = useState<FenceMultiplier>(
    DEFAULT_FENCE_MULTIPLIER,
  );
  const [decimalPlaces, setDecimalPlaces] = useState<DisplayPrecision>(
    DEFAULT_DISPLAY_PRECISION,
  );
  const [snapshot, setSnapshot] = useState<CalculationSnapshot | null>(null);
  const [validationError, setValidationError] = useState<string | undefined>();
  const [tableExpanded, setTableExpanded] = useState(false);
  const [copyResetKey, setCopyResetKey] = useState(0);

  const isStale =
    snapshot !== null &&
    (snapshot.input !== input ||
      snapshot.quartileMethod !== quartileMethod ||
      snapshot.fenceMultiplier !== fenceMultiplier);

  const displayResult = snapshot?.result ?? null;

  const summary = useMemo(
    () =>
      displayResult
        ? buildOutlierIqrResultSummary(displayResult, decimalPlaces)
        : null,
    [displayResult, decimalPlaces],
  );

  const tableRows = useMemo(() => {
    if (!displayResult) {
      return [];
    }

    const allRows = buildOutlierIqrTableRows(displayResult, decimalPlaces);

    if (displayResult.count <= OUTLIER_IQR_TABLE_ROW_LIMIT || tableExpanded) {
      return allRows;
    }

    return allRows.slice(0, OUTLIER_IQR_TABLE_ROW_LIMIT);
  }, [displayResult, decimalPlaces, tableExpanded]);

  const canReset =
    input !== "" ||
    selectedExampleId !== "" ||
    snapshot !== null ||
    validationError !== undefined ||
    tableExpanded ||
    quartileMethod !== DEFAULT_QUARTILE_METHOD ||
    fenceMultiplier !== DEFAULT_FENCE_MULTIPLIER ||
    decimalPlaces !== DEFAULT_DISPLAY_PRECISION;

  function focusDatasetInput() {
    datasetInputRef.current?.focus();
  }

  function handleCalculate() {
    const parsed = parseDataset(input);

    if (!parsed.ok) {
      setValidationError(parsed.error);
      setSnapshot(null);
      setTableExpanded(false);
      focusDatasetInput();
      return;
    }

    try {
      const result = calculateOutlierIqr(parsed.values, {
        quartileMethod,
        fenceMultiplier,
      });

      setValidationError(undefined);
      setSnapshot({
        result,
        input,
        quartileMethod,
        fenceMultiplier,
      });
      setTableExpanded(false);
    } catch (error) {
      setValidationError(mapCalculationError(error));
      setSnapshot(null);
      setTableExpanded(false);
      focusDatasetInput();
    }
  }

  function handleReset() {
    setInput("");
    setSelectedExampleId("");
    setQuartileMethod(DEFAULT_QUARTILE_METHOD);
    setFenceMultiplier(DEFAULT_FENCE_MULTIPLIER);
    setDecimalPlaces(DEFAULT_DISPLAY_PRECISION);
    setSnapshot(null);
    setValidationError(undefined);
    setTableExpanded(false);
    setCopyResetKey((key) => key + 1);
  }

  function handleInputChange(value: string) {
    setInput(value);
    setSelectedExampleId("");
    setValidationError(undefined);
  }

  function handleExampleChange(exampleId: string) {
    setSelectedExampleId(exampleId);

    if (!exampleId) {
      setInput("");
      setSnapshot(null);
      setValidationError(undefined);
      setTableExpanded(false);
      return;
    }

    const example = outlierIqrCalculatorConfig.examples.find(
      (item) => item.id === exampleId,
    );

    if (example) {
      setInput(example.input);
      setSnapshot(null);
      setValidationError(undefined);
      setTableExpanded(false);
    }
  }

  function toggleTableExpansion() {
    setTableExpanded((expanded) => !expanded);
  }

  const showCopy = displayResult !== null && !isStale;

  return (
    <CalculatorShell
      title="Calculate outliers and interquartile range"
      description="Enter numeric values to compute quartiles, IQR, Tukey fences, and outliers. Calculations run locally in your browser."
    >
      <div className="space-y-6">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
          <CalculatorInputPanel description="Separate values with commas, spaces, semicolons, or line breaks.">
            <ExampleSelector
              label="Load an example"
              description="Select a dataset with a known correct result."
              placeholder={{ id: "", label: "Choose an example" }}
              options={outlierIqrCalculatorConfig.examples.map((example) => ({
                id: example.id,
                label: example.label,
                description: example.description,
              }))}
              value={selectedExampleId}
              onChange={handleExampleChange}
            />
            <DatasetInput
              label="Dataset values"
              description="Enter at least 4 and at most 1,000 observations. Accepted separators: commas, spaces, semicolons, or line breaks."
              value={input}
              onChange={handleInputChange}
              error={validationError}
              placeholder="e.g. 2, 4, 6, 8, 10, 12, 14"
              textareaRef={datasetInputRef}
            />
            <QuartileMethodSelector
              value={quartileMethod}
              onChange={setQuartileMethod}
            />
            <FenceMultiplierSelector
              value={fenceMultiplier}
              onChange={setFenceMultiplier}
            />
            <DisplayPrecisionSelector
              value={decimalPlaces}
              onChange={setDecimalPlaces}
            />
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleCalculate}>Calculate outliers and IQR</Button>
              <ResetButton disabled={!canReset} onReset={handleReset} />
              {showCopy && displayResult && snapshot && (
                <CopyResultButton
                  key={copyResetKey}
                  value={buildOutlierIqrCopyText(
                    displayResult,
                    snapshot.input,
                    decimalPlaces,
                  )}
                />
              )}
            </div>
          </CalculatorInputPanel>

          <CalculatorResultPanel>
            {summary ? (
              <>
                {isStale && (
                  <p
                    role="status"
                    className="mb-4 rounded-md border border-border bg-paper px-3 py-2 text-sm text-muted"
                  >
                    {STALE_RESULT_NOTICE}
                  </p>
                )}
                <OutlierIqrResultSummary fields={summary} />
              </>
            ) : (
              <p className="text-sm text-muted">{EMPTY_STATE_MESSAGE}</p>
            )}
          </CalculatorResultPanel>
        </div>

        {displayResult && (
          <>
            <FiveNumberSummary result={displayResult} decimals={decimalPlaces} />
            <FenceWhiskerDetails
              result={displayResult}
              decimals={decimalPlaces}
            />
            <OutlierLists
              lowerOutliers={displayResult.lowerOutliers}
              upperOutliers={displayResult.upperOutliers}
              outlierCount={displayResult.outlierCount}
              decimals={decimalPlaces}
            />
            <FormulaBlock
              label="Formula"
              formula={outlierIqrCalculatorConfig.formula.combined}
            />
            <CalculationSteps
              title="Step-by-step calculation"
              steps={buildOutlierIqrSteps(displayResult, decimalPlaces)}
            />
            <ObservationClassificationTable
              rows={tableRows}
              totalCount={displayResult.count}
              rowLimit={OUTLIER_IQR_TABLE_ROW_LIMIT}
              expanded={tableExpanded}
              onToggleExpansion={toggleTableExpansion}
            />
            <AccessibleBoxPlot result={displayResult} decimals={decimalPlaces} />
            <InterpretationPanel
              interpretation={buildOutlierIqrInterpretation(
                displayResult,
                decimalPlaces,
              )}
            />
          </>
        )}

        <CalculatorNotice title="About this calculation">
          This calculator flags observations outside Tukey-style fences using your
          selected quartile method and fence multiplier. Outliers are reported for
          review only—nothing is removed automatically.{" "}
          {outlierIqrCalculatorConfig.rounding.note}
        </CalculatorNotice>
      </div>
    </CalculatorShell>
  );
}
