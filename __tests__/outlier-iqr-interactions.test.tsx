import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OutlierIqrCalculator } from "@/components/calculators/outlier-iqr/OutlierIqrCalculator";
import {
  OUTLIER_IQR_TABLE_ROW_LIMIT,
  STALE_RESULT_NOTICE,
} from "@/lib/calculators/outlier-iqr-config";
import {
  buildNumericDataset,
  calculateDataset,
  getClassificationTableSection,
  getPrimaryIqrValue,
  getResultPanel,
} from "./outlier-iqr-test-helpers";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("OutlierIqrCalculator calculation workflow", () => {
  it("calculates with excel-r7 quartile method", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await user.selectOptions(screen.getByLabelText("Quartile method"), "excel-r7");
    await calculateDataset(user, "10, 12, 14, 15, 19");

    expect(getPrimaryIqrValue(getResultPanel())).toHaveTextContent("3");
    expect(
      within(screen.getByRole("heading", { name: "Five-number summary" }).parentElement as HTMLElement).getByText("12"),
    ).toBeInTheDocument();
  });

  it("calculates with a 3.0× fence multiplier", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await user.selectOptions(screen.getByLabelText("Fence multiplier"), "3");
    await calculateDataset(user, "1, 2, 3, 4, 5, 6, 7, 8, 9, 100");

    expect(screen.getByRole("heading", { name: "Outliers (1)" })).toBeInTheDocument();
    expect(
      within(screen.getByRole("heading", { name: "IQR fences and whiskers" }).parentElement as HTMLElement).getByText(
        "-12",
      ),
    ).toBeInTheDocument();
  });

  it("updates displayed precision without marking the result stale", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "1.5, 2.25, .5, 3.75, 4.0");

    await user.selectOptions(screen.getByLabelText("Decimal places"), "2");
    expect(screen.queryByText(STALE_RESULT_NOTICE)).not.toBeInTheDocument();
    expect(getPrimaryIqrValue(getResultPanel())).toHaveTextContent("2.88");

    await user.selectOptions(screen.getByLabelText("Decimal places"), "6");
    expect(getPrimaryIqrValue(getResultPanel())).toHaveTextContent("2.875");
  });

  it("clears stale state after recalculation", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "2, 4, 6, 8, 10, 12, 14");
    await user.selectOptions(screen.getByLabelText("Fence multiplier"), "3");
    expect(screen.getByText(STALE_RESULT_NOTICE)).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Calculate outliers and IQR" }),
    );

    expect(screen.queryByText(STALE_RESULT_NOTICE)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy result" })).toBeInTheDocument();
  });
});

describe("OutlierIqrCalculator validation and focus", () => {
  it("rejects empty input", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await user.click(
      screen.getByRole("button", { name: "Calculate outliers and IQR" }),
    );

    const textarea = screen.getByLabelText("Dataset values");
    expect(screen.getByRole("alert")).toHaveTextContent(/enter at least one/i);
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveFocus();
  });

  it("rejects more than 1,000 observations", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    fireEvent.change(screen.getByLabelText("Dataset values"), {
      target: { value: buildNumericDataset(1001) },
    });
    await user.click(
      screen.getByRole("button", { name: "Calculate outliers and IQR" }),
    );

    const textarea = screen.getByLabelText("Dataset values");
    expect(screen.getByRole("alert")).toHaveTextContent(/1,000/);
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAttribute("aria-describedby");
    expect(textarea).toHaveFocus();
    expect(textarea).toHaveValue(buildNumericDataset(1001));
  });
});

describe("OutlierIqrCalculator result correctness", () => {
  it("renders fences, whiskers, and five-number summary distinctly", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "1, 2, 3, 4, 5, 6, 7, 8, 9, 100");

    const fenceSection = screen.getByRole("heading", {
      name: "IQR fences and whiskers",
    }).parentElement as HTMLElement;
    const fencePanel = within(fenceSection);

    expect(fencePanel.getByText("Lower fence").nextElementSibling).toHaveTextContent("-4.5");
    expect(fencePanel.getByText("Upper fence").nextElementSibling).toHaveTextContent("15.5");
    expect(fencePanel.getByText("Lower whisker").nextElementSibling).toHaveTextContent("1");
    expect(fencePanel.getByText("Upper whisker").nextElementSibling).toHaveTextContent("9");

    expect(fencePanel.getByText("Lower fence").nextElementSibling).not.toHaveTextContent("1");
    expect(fencePanel.getByText("Upper fence").nextElementSibling).not.toHaveTextContent("9");

    const fiveNumberSection = screen.getByRole("heading", {
      name: "Five-number summary",
    }).parentElement as HTMLElement;
    expect(within(fiveNumberSection).getByText("Data minimum").nextElementSibling).toHaveTextContent("1");
    expect(within(fiveNumberSection).getByText("Data maximum").nextElementSibling).toHaveTextContent("100");
  });

  it("lists lower and upper outliers and shows none when absent", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "1, 10, 11, 12, 13, 14, 15, 16, 17, 18");
    expect(screen.getByText("#1: 1")).toBeInTheDocument();
    expect(screen.getByText("Upper outliers")).toBeInTheDocument();
    expect(screen.getAllByText("None").length).toBeGreaterThanOrEqual(1);

    await calculateDataset(user, "2, 4, 6, 8, 10, 12, 14");
    expect(screen.getByRole("heading", { name: "Outliers (0)" })).toBeInTheDocument();
    expect(screen.getAllByText("None").length).toBeGreaterThanOrEqual(2);
  });

  it("shows duplicate outlier occurrences with separate indices", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 100");

    expect(screen.getByText("#10: 100")).toBeInTheDocument();
    expect(screen.getByText("#11: 100")).toBeInTheDocument();
  });

  it("handles negative, decimal, all-equal, and IQR-zero datasets", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "-10, -5, 0, 5, 10");
    expect(getPrimaryIqrValue(getResultPanel())).toHaveTextContent("15");

    await calculateDataset(user, "1.5, 2.25, .5, 3.75, 4.0");
    expect(getPrimaryIqrValue(getResultPanel())).toHaveTextContent("2.875");

    await calculateDataset(user, "7, 7, 7, 7, 7");
    expect(getPrimaryIqrValue(getResultPanel())).toHaveTextContent("0");
    expect(screen.getByText(/All values equal at 7/)).toBeInTheDocument();

    await calculateDataset(user, "3, 3, 3, 3, 3, 10");
    expect(screen.getByText("#6: 10")).toBeInTheDocument();
  });
});

describe("OutlierIqrCalculator large datasets", () => {
  it("shows all rows for exactly 100 observations", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    fireEvent.change(screen.getByLabelText("Dataset values"), {
      target: { value: buildNumericDataset(100) },
    });
    await user.click(
      screen.getByRole("button", { name: "Calculate outliers and IQR" }),
    );

    expect(within(getClassificationTableSection()).getAllByRole("row")).toHaveLength(101);
    expect(screen.queryByText(/Showing 100 of/)).not.toBeInTheDocument();
  });

  it("expands, collapses, and resets table expansion", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    fireEvent.change(screen.getByLabelText("Dataset values"), {
      target: { value: buildNumericDataset(101) },
    });
    await user.click(
      screen.getByRole("button", { name: "Calculate outliers and IQR" }),
    );

    expect(within(getClassificationTableSection()).getAllByRole("row")).toHaveLength(
      OUTLIER_IQR_TABLE_ROW_LIMIT + 1,
    );

    await user.click(screen.getByRole("button", { name: "Show all 101 rows" }));
    expect(within(getClassificationTableSection()).getAllByRole("row")).toHaveLength(102);

    await user.click(screen.getByRole("button", { name: "Show first 100 rows" }));
    expect(within(getClassificationTableSection()).getAllByRole("row")).toHaveLength(
      OUTLIER_IQR_TABLE_ROW_LIMIT + 1,
    );

    await user.click(screen.getByRole("button", { name: /reset inputs/i }));
    fireEvent.change(screen.getByLabelText("Dataset values"), {
      target: { value: buildNumericDataset(101) },
    });
    await user.click(
      screen.getByRole("button", { name: "Calculate outliers and IQR" }),
    );
    expect(screen.getByRole("button", { name: "Show all 101 rows" })).toBeInTheDocument();
  });

  it("collapses the table after a new calculation while stale", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    fireEvent.change(screen.getByLabelText("Dataset values"), {
      target: { value: buildNumericDataset(101) },
    });
    await user.click(
      screen.getByRole("button", { name: "Calculate outliers and IQR" }),
    );
    await user.click(screen.getByRole("button", { name: "Show all 101 rows" }));

    await user.type(screen.getByLabelText("Dataset values"), " ");
    await user.click(
      screen.getByRole("button", { name: "Calculate outliers and IQR" }),
    );

    expect(within(getClassificationTableSection()).getAllByRole("row")).toHaveLength(
      OUTLIER_IQR_TABLE_ROW_LIMIT + 1,
    );
  });
});

describe("OutlierIqrCalculator clipboard", () => {
  it("includes method, multiplier, fences, whiskers, and precision in copied text", async () => {
    const user = userEvent.setup();
    const writeText = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(undefined);

    render(<OutlierIqrCalculator />);
    await calculateDataset(user, "1, 2, 3, 4, 5, 6, 7, 8, 9, 100");

    await user.selectOptions(screen.getByLabelText("Decimal places"), "2");
    await user.click(screen.getByRole("button", { name: "Copy result" }));

    const copied = writeText.mock.calls[0][0] as string;
    expect(copied).toContain("Count: 10");
    expect(copied).toContain("Quartile method:");
    expect(copied).toContain("Fence multiplier:");
    expect(copied).toContain("Lower fence:");
    expect(copied).toContain("Upper whisker:");
    expect(copied).toContain("Upper outliers:");
    expect(screen.getByRole("status")).toHaveTextContent("Copied to clipboard");
  });

  it("handles clipboard rejection without crashing", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("denied"));

    render(<OutlierIqrCalculator />);
    await calculateDataset(user, "2, 4, 6, 8, 10, 12, 14");

    await user.click(screen.getByRole("button", { name: "Copy result" }));
    expect(screen.queryByText("Copied to clipboard")).not.toBeInTheDocument();
  });
});

describe("OutlierIqrCalculator reset", () => {
  it("restores the exact initial state", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "2, 4, 6, 8, 10, 12, 14");
    await user.selectOptions(screen.getByLabelText("Decimal places"), "2");
    await user.selectOptions(screen.getByLabelText("Fence multiplier"), "3");
    await user.selectOptions(screen.getByLabelText("Quartile method"), "excel-r7");

    await user.click(screen.getByRole("button", { name: /reset inputs/i }));

    expect(screen.getByLabelText("Dataset values")).toHaveValue("");
    expect(screen.getByLabelText("Load an example")).toHaveValue("");
    expect(screen.getByLabelText("Quartile method")).toHaveValue("exclusive-halves");
    expect(screen.getByLabelText("Fence multiplier")).toHaveValue("1.5");
    expect(screen.getByLabelText("Decimal places")).toHaveValue("4");
    expect(
      getResultPanel().getByText(
        "Enter a dataset and press Calculate outliers and IQR to see the result.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /box plot/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset inputs/i })).toBeDisabled();
  });
});
