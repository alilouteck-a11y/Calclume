import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OutlierIqrCalculator } from "@/components/calculators/outlier-iqr/OutlierIqrCalculator";
import { STALE_RESULT_NOTICE } from "@/lib/calculators/outlier-iqr-config";
import {
  calculateDataset,
  getPrimaryIqrValue,
  getResultPanel,
} from "./outlier-iqr-test-helpers";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("OutlierIqrCalculator initial state", () => {
  it("starts empty with defaults and no result details", () => {
    render(<OutlierIqrCalculator />);

    expect(screen.getByLabelText("Dataset values")).toHaveValue("");
    expect(screen.getByLabelText("Load an example")).toHaveValue("");
    expect(screen.getByLabelText("Quartile method")).toHaveValue(
      "exclusive-halves",
    );
    expect(screen.getByLabelText("Fence multiplier")).toHaveValue("1.5");
    expect(screen.getByLabelText("Decimal places")).toHaveValue("4");
    expect(
      getResultPanel().getByText(
        "Enter a dataset and press Calculate outliers and IQR to see the result.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copy result" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset inputs/i })).toBeDisabled();
    expect(screen.queryByRole("img", { name: /box plot/i })).not.toBeInTheDocument();
    expect(screen.queryByText("Formula", { selector: "figcaption" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Step-by-step calculation" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Observation classification table" }),
    ).not.toBeInTheDocument();
  });
});

describe("OutlierIqrCalculator workflow", () => {
  it("does not calculate until the button is pressed", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await user.type(
      screen.getByLabelText("Dataset values"),
      "2, 4, 6, 8, 10, 12, 14",
    );

    expect(getResultPanel().queryByText("Interquartile range (IQR)")).not.toBeInTheDocument();
  });

  it("calculates the default reference dataset", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "2, 4, 6, 8, 10, 12, 14");

    expect(getPrimaryIqrValue(getResultPanel())).toHaveTextContent("8");
    expect(screen.getByRole("heading", { name: "Five-number summary" })).toBeInTheDocument();
    expect(screen.getByTestId("boxplot-median")).toBeInTheDocument();
  });

  it("loads an example without calculating", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await user.selectOptions(
      screen.getByLabelText("Load an example"),
      "high-outlier",
    );

    expect(screen.getByLabelText("Dataset values")).toHaveValue(
      "1, 2, 3, 4, 5, 6, 7, 8, 9, 100",
    );
    expect(getResultPanel().queryByText("Interquartile range (IQR)")).not.toBeInTheDocument();
  });
});

describe("OutlierIqrCalculator stale result policy", () => {
  it("keeps the last result visible with a notice when inputs change", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "2, 4, 6, 8, 10, 12, 14");
    await user.type(screen.getByLabelText("Dataset values"), "0");

    expect(getPrimaryIqrValue(getResultPanel())).toHaveTextContent("8");
    expect(screen.getByText(STALE_RESULT_NOTICE)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copy result" })).not.toBeInTheDocument();
  });

  it("marks results stale when the quartile method or multiplier changes", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "2, 4, 6, 8, 10, 12, 14");

    await user.selectOptions(
      screen.getByLabelText("Quartile method"),
      "excel-r7",
    );
    expect(screen.getByText(STALE_RESULT_NOTICE)).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Fence multiplier"), "3");
    expect(screen.getByText(STALE_RESULT_NOTICE)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copy result" })).not.toBeInTheDocument();
  });

  it("does not mark results stale when only precision changes", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "2, 4, 6, 8, 10, 12, 14");
    await user.selectOptions(screen.getByLabelText("Decimal places"), "2");

    expect(screen.queryByText(STALE_RESULT_NOTICE)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy result" })).toBeInTheDocument();
  });
});

describe("OutlierIqrCalculator validation", () => {
  it("clears results and shows a field error for invalid tokens", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "2, 4, 6, 8, 10, 12, 14");

    const textarea = screen.getByLabelText("Dataset values");
    await user.clear(textarea);
    await user.type(textarea, "abc");
    await user.click(
      screen.getByRole("button", { name: "Calculate outliers and IQR" }),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(/not a valid number/i);
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAttribute("aria-describedby");
    expect(
      getResultPanel().getByText(
        "Enter a dataset and press Calculate outliers and IQR to see the result.",
      ),
    ).toBeInTheDocument();
    expect(textarea).toHaveFocus();
  });

  it("rejects fewer than four observations via the engine", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "1, 2, 3");

    expect(screen.getByRole("alert")).toHaveTextContent(/at least 4 observations/i);
  });
});

describe("OutlierIqrCalculator result hierarchy", () => {
  it("renders sections in the required order", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await user.selectOptions(
      screen.getByLabelText("Load an example"),
      "high-outlier",
    );
    await user.click(
      screen.getByRole("button", { name: "Calculate outliers and IQR" }),
    );

    const sectionLabels = [
      "Result",
      "Five-number summary",
      "IQR fences and whiskers",
      "Outliers (1)",
      "Formula",
      "Observation classification table",
      "Box plot",
    ];

    function getSectionElement(label: string) {
      if (label === "Formula") {
        return screen.getByText(label, { selector: "figcaption" });
      }

      return screen.getByRole("heading", { name: label });
    }

    for (let index = 1; index < sectionLabels.length; index += 1) {
      const current = getSectionElement(sectionLabels[index]);
      const previous = getSectionElement(sectionLabels[index - 1]);

      expect(
        previous.compareDocumentPosition(current) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });
});
