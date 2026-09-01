import { useId } from "react";
import type { DisplayPrecision } from "@/lib/calculators/format-number";
import { formatDisplayNumber } from "@/lib/calculators/format-number";
import { buildBoxPlotSummaryText } from "@/lib/calculators/outlier-iqr-config";
import type { OutlierIqrResult } from "@/lib/calculators/outlier-iqr-schema";

type AccessibleBoxPlotProps = {
  result: OutlierIqrResult;
  decimals: DisplayPrecision;
};

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 140;
const PLOT_LEFT = 48;
const PLOT_RIGHT = 16;
const PLOT_TOP = 24;
const BOX_HEIGHT = 48;

function valueToX(
  value: number,
  domainMin: number,
  domainMax: number,
  plotWidth: number,
): number {
  if (domainMax === domainMin) {
    return PLOT_LEFT + plotWidth / 2;
  }

  return PLOT_LEFT + ((value - domainMin) / (domainMax - domainMin)) * plotWidth;
}

function buildTicks(domainMin: number, domainMax: number): number[] {
  if (domainMax === domainMin) {
    const midpoint = (domainMin + domainMax) / 2;
    return [domainMin, midpoint, domainMax];
  }

  const span = domainMax - domainMin;
  const roughStep = span / 5;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalized = roughStep / magnitude;
  const niceStep =
    normalized <= 1 ? magnitude : normalized <= 2 ? 2 * magnitude : normalized <= 5 ? 5 * magnitude : 10 * magnitude;

  const ticks: number[] = [];
  const start = Math.ceil(domainMin / niceStep) * niceStep;

  for (let tick = start; tick <= domainMax + niceStep * 0.001; tick += niceStep) {
    ticks.push(tick);
  }

  if (ticks.length < 3) {
    return [domainMin, (domainMin + domainMax) / 2, domainMax];
  }

  return ticks;
}

export function AccessibleBoxPlot({ result, decimals }: AccessibleBoxPlotProps) {
  const titleId = useId();
  const descriptionId = useId();
  const summary = buildBoxPlotSummaryText(result, decimals);
  const fmt = (value: number) => formatDisplayNumber(value, decimals);
  const plotWidth = VIEW_WIDTH - PLOT_LEFT - PLOT_RIGHT;
  const centerY = PLOT_TOP + BOX_HEIGHT / 2;
  const boxTop = centerY - BOX_HEIGHT / 2;
  const boxBottom = centerY + BOX_HEIGHT / 2;
  const { boxPlot } = result;
  const x = (value: number) =>
    valueToX(value, boxPlot.domainMin, boxPlot.domainMax, plotWidth);
  const ticks = buildTicks(boxPlot.domainMin, boxPlot.domainMax);
  const allEqual = result.minimum === result.maximum;

  const q1X = x(boxPlot.q1);
  const q3X = x(boxPlot.q3);
  const medianX = x(boxPlot.median);
  const lowerWhiskerX = x(boxPlot.lowerWhisker);
  const upperWhiskerX = x(boxPlot.upperWhisker);
  const lowerFenceX = x(boxPlot.lowerFence);
  const upperFenceX = x(boxPlot.upperFence);

  return (
    <section aria-labelledby="outlier-iqr-boxplot-heading">
      <h3 id="outlier-iqr-boxplot-heading" className="text-base font-semibold text-ink">
        Box plot
      </h3>
      <p className="mt-1 text-sm text-muted">{summary}</p>
      {allEqual && (
        <p className="mt-1 text-sm text-muted">
          All values equal at {fmt(result.minimum)}.
        </p>
      )}
      <div className="mt-4 overflow-x-auto">
        <svg
          role="img"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="min-w-[320px] w-full max-w-full text-ink"
        >
          <title id={titleId}>Box plot of dataset quartiles and outliers</title>
          <desc id={descriptionId}>{summary}</desc>

          <line
            x1={PLOT_LEFT}
            y1={boxBottom + 12}
            x2={VIEW_WIDTH - PLOT_RIGHT}
            y2={boxBottom + 12}
            stroke="currentColor"
            strokeWidth={1}
            opacity={0.35}
          />

          {ticks.map((tick, index) => {
            const tickX = x(tick);
            return (
              <g key={`tick-${index}-${tick}`}>
                <line
                  x1={tickX}
                  y1={boxBottom + 8}
                  x2={tickX}
                  y2={boxBottom + 16}
                  stroke="currentColor"
                  strokeWidth={1}
                  opacity={0.35}
                />
                <text
                  x={tickX}
                  y={VIEW_HEIGHT - 4}
                  textAnchor="middle"
                  fontSize={11}
                  fill="currentColor"
                >
                  {fmt(tick)}
                </text>
              </g>
            );
          })}

          <line
            x1={lowerFenceX}
            y1={boxTop - 8}
            x2={lowerFenceX}
            y2={boxBottom + 8}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.45}
          />
          <line
            x1={upperFenceX}
            y1={boxTop - 8}
            x2={upperFenceX}
            y2={boxBottom + 8}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.45}
          />

          <line
            x1={lowerWhiskerX}
            y1={centerY}
            x2={q1X}
            y2={centerY}
            stroke="currentColor"
            strokeWidth={2}
          />
          <line
            x1={upperWhiskerX}
            y1={centerY}
            x2={q3X}
            y2={centerY}
            stroke="currentColor"
            strokeWidth={2}
          />
          <line
            x1={lowerWhiskerX}
            y1={boxTop + 8}
            x2={lowerWhiskerX}
            y2={boxBottom - 8}
            stroke="currentColor"
            strokeWidth={2}
          />
          <line
            x1={upperWhiskerX}
            y1={boxTop + 8}
            x2={upperWhiskerX}
            y2={boxBottom - 8}
            stroke="currentColor"
            strokeWidth={2}
          />

          <rect
            x={Math.min(q1X, q3X)}
            y={boxTop}
            width={Math.max(Math.abs(q3X - q1X), 1)}
            height={BOX_HEIGHT}
            fill="currentColor"
            fillOpacity={0.08}
            stroke="currentColor"
            strokeWidth={2}
          />
          <line
            data-testid="boxplot-median"
            x1={medianX}
            y1={boxTop}
            x2={medianX}
            y2={boxBottom}
            stroke="currentColor"
            strokeWidth={3}
          />

          {[...boxPlot.lowerOutliers, ...boxPlot.upperOutliers].map((entry) => (
            <circle
              key={`${entry.index}-${entry.value}`}
              cx={x(entry.value)}
              cy={centerY}
              r={5}
              fill="white"
              stroke="currentColor"
              strokeWidth={2}
              aria-label={`Outlier #${entry.index}: ${fmt(entry.value)}`}
            />
          ))}
        </svg>
      </div>

      <table className="sr-only">
        <caption>Box plot data values</caption>
        <thead>
          <tr>
            <th scope="col">Element</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Lower whisker</th>
            <td>{fmt(result.lowerWhisker)}</td>
          </tr>
          <tr>
            <th scope="row">Q1</th>
            <td>{fmt(result.q1)}</td>
          </tr>
          <tr>
            <th scope="row">Median</th>
            <td>{fmt(result.median)}</td>
          </tr>
          <tr>
            <th scope="row">Q3</th>
            <td>{fmt(result.q3)}</td>
          </tr>
          <tr>
            <th scope="row">Upper whisker</th>
            <td>{fmt(result.upperWhisker)}</td>
          </tr>
          <tr>
            <th scope="row">Lower fence</th>
            <td>{fmt(result.lowerFence)}</td>
          </tr>
          <tr>
            <th scope="row">Upper fence</th>
            <td>{fmt(result.upperFence)}</td>
          </tr>
          <tr>
            <th scope="row">Outlier count</th>
            <td>{result.outlierCount}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
