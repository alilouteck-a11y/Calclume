import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AccessibleBoxPlot } from "@/components/calculators/outlier-iqr/AccessibleBoxPlot";
import { calculateOutlierIqr } from "@/lib/calculators/outlier-iqr";

afterEach(() => {
  cleanup();
});

function getSvgCoordinates(container: HTMLElement) {
  const svg = container.querySelector("svg");
  expect(svg).toBeTruthy();

  const values: number[] = [];
  for (const element of svg!.querySelectorAll("[x1], [x2], [cx]")) {
    for (const attribute of ["x1", "x2", "cx"]) {
      const raw = element.getAttribute(attribute);
      if (raw !== null) {
        values.push(Number(raw));
      }
    }
  }

  return values;
}

describe("AccessibleBoxPlot", () => {
  it("exposes an accessible figure name and textual summary", () => {
    const result = calculateOutlierIqr([1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
    const { container } = render(<AccessibleBoxPlot result={result} decimals={4} />);

    expect(
      screen.getByRole("img", { name: /box plot of dataset quartiles and outliers/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Box plot summary:/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/lower whisker 1/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/upper whisker 9/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/1 outlier\(s\) flagged/).length).toBeGreaterThanOrEqual(1);

    const fallbackTable = container.querySelector("table.sr-only");
    expect(fallbackTable).toBeTruthy();
    expect(within(fallbackTable as HTMLElement).getByText("Lower fence")).toBeInTheDocument();
    expect(within(fallbackTable as HTMLElement).getByText("Outlier count")).toBeInTheDocument();
  });

  it("uses engine-provided domain and finite SVG coordinates", () => {
    const result = calculateOutlierIqr([2, 4, 6, 8, 10, 12, 14]);
    const { container } = render(<AccessibleBoxPlot result={result} decimals={4} />);

    expect(result.boxPlot.domainMin).toBeLessThan(result.minimum);
    expect(result.boxPlot.domainMax).toBeGreaterThan(result.maximum);

    for (const coordinate of getSvgCoordinates(container)) {
      expect(Number.isFinite(coordinate)).toBe(true);
    }
  });

  it("renders a zero-span all-equal dataset without NaN coordinates", () => {
    const result = calculateOutlierIqr([7, 7, 7, 7, 7]);
    const { container } = render(<AccessibleBoxPlot result={result} decimals={4} />);

    expect(screen.getByText(/All values equal at 7/)).toBeInTheDocument();
    for (const coordinate of getSvgCoordinates(container)) {
      expect(Number.isFinite(coordinate)).toBe(true);
    }
  });

  it("renders negative and decimal datasets", () => {
    const negative = calculateOutlierIqr([-10, -5, 0, 5, 10]);
    const { rerender, container } = render(
      <AccessibleBoxPlot result={negative} decimals={4} />,
    );

    expect(screen.getAllByText(/Box plot summary:/).length).toBeGreaterThanOrEqual(1);
    for (const coordinate of getSvgCoordinates(container)) {
      expect(Number.isFinite(coordinate)).toBe(true);
    }

    const decimal = calculateOutlierIqr([1.5, 2.25, 0.5, 3.75, 4]);
    rerender(<AccessibleBoxPlot result={decimal} decimals={2} />);
    expect(screen.getAllByText(/Q3 3\.88/).length).toBeGreaterThanOrEqual(1);
  });

  it("uses stable unique identities for duplicate outlier markers", () => {
    const result = calculateOutlierIqr([1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 100]);
    const { container } = render(<AccessibleBoxPlot result={result} decimals={4} />);

    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(2);
    expect(circles[0]?.getAttribute("aria-label")).toBe("Outlier #10: 100");
    expect(circles[1]?.getAttribute("aria-label")).toBe("Outlier #11: 100");
    expect(circles[0]?.getAttribute("cx")).toBe(circles[1]?.getAttribute("cx"));
  });

  it("distinguishes median with a test hook and does not rely on color alone", () => {
    const result = calculateOutlierIqr([1, 2, 3, 4, 5, 6, 7, 8, 9, 100]);
    const { container } = render(<AccessibleBoxPlot result={result} decimals={4} />);

    expect(screen.getByTestId("boxplot-median")).toBeInTheDocument();
    expect(container.querySelector("circle")).toBeTruthy();
    expect(container.querySelector('[stroke-dasharray="4 3"]')).toBeTruthy();
  });

  it("limits visible tick labels to display precision", () => {
    const result = calculateOutlierIqr([1.5, 2.25, 0.5, 3.75, 4]);
    render(<AccessibleBoxPlot result={result} decimals={2} />);

    const svgText = screen.getByRole("img").querySelectorAll("text");
    const labels = Array.from(svgText).map((node) => node.textContent ?? "");
    expect(labels.some((label) => /\.\d{3,}/.test(label))).toBe(false);
  });
});
