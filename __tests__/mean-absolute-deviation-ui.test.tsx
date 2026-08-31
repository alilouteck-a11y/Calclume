import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MeanAbsoluteDeviationCalculator } from "@/components/calculators/mean-absolute-deviation/MeanAbsoluteDeviationCalculator";
import { MAD_TABLE_ROW_LIMIT } from "@/lib/calculators/mean-absolute-deviation-config";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function getResultPanel() {
  const heading = screen.getByRole("heading", { name: "Result" });
  const panel = heading.nextElementSibling;
  expect(panel).toBeTruthy();
  return within(panel as HTMLElement);
}

async function calculateReferenceDataset(user: ReturnType<typeof userEvent.setup>) {
  const textarea = screen.getByLabelText("Dataset values");
  await user.clear(textarea);
  await user.type(textarea, "12, 15, 14, 10, 19");
  await user.click(screen.getByRole("button", { name: "Calculate MAD" }));
}

describe("MeanAbsoluteDeviationCalculator initial state", () => {
  it("starts empty with no example selected and no result", () => {
    render(<MeanAbsoluteDeviationCalculator />);

    expect(screen.getByLabelText("Dataset values")).toHaveValue("");
    expect(screen.getByLabelText("Load an example")).toHaveValue("");
    expect(
      getResultPanel().getByText(
        "Enter a dataset and press Calculate MAD to see the result.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copy result" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset inputs/i })).toBeDisabled();
  });

  it("shows the example placeholder option", () => {
    render(<MeanAbsoluteDeviationCalculator />);
    expect(
      screen.getByRole("option", { name: "Choose an example" }),
    ).toBeInTheDocument();
  });
});

describe("MeanAbsoluteDeviationCalculator Calculate MAD workflow", () => {
  it("does not calculate until Calculate MAD is pressed", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    await user.type(
      screen.getByLabelText("Dataset values"),
      "12, 15, 14, 10, 19",
    );

    expect(getResultPanel().queryByText("2.4")).not.toBeInTheDocument();
  });

  it("calculates the reference dataset after Calculate MAD", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    await calculateReferenceDataset(user);
    const summary = getResultPanel();

    expect(summary.getByText("2.4")).toBeInTheDocument();
    expect(summary.getByText("14")).toBeInTheDocument();
    expect(summary.getByText("12")).toBeInTheDocument();
    expect(summary.getByText("5")).toBeInTheDocument();
    expect(summary.getByText("10")).toBeInTheDocument();
    expect(summary.getByText("19")).toBeInTheDocument();
    expect(summary.getByText("9")).toBeInTheDocument();
    expect(summary.queryByText(/10 to 19/)).not.toBeInTheDocument();
  });

  it("announces results in a polite live region", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    await calculateReferenceDataset(user);

    const liveRegion = getResultPanel().getByText("2.4").closest("[aria-live]");
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
  });

  it("loads an example into the input without calculating", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    await user.selectOptions(
      screen.getByLabelText("Load an example"),
      "class-scores",
    );

    expect(screen.getByLabelText("Dataset values")).toHaveValue(
      "12, 15, 14, 10, 19",
    );
    expect(getResultPanel().queryByText("2.4")).not.toBeInTheDocument();
  });
});

describe("MeanAbsoluteDeviationCalculator precision selector", () => {
  it("changes displayed precision without recalculating from rounded values", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    await user.type(screen.getByLabelText("Dataset values"), "1, 2, 3, 4, 5");
    await user.click(screen.getByRole("button", { name: "Calculate MAD" }));

    expect(getResultPanel().getByText("1.2")).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Decimal places"), "6");
    expect(getResultPanel().getByText("1.2")).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Decimal places"), "2");
    expect(getResultPanel().getByText("1.2")).toBeInTheDocument();
  });
});

describe("MeanAbsoluteDeviationCalculator copy and reset", () => {
  it("hides copy before calculation and copies full result text after", async () => {
    const user = userEvent.setup();
    const writeText = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(undefined);

    render(<MeanAbsoluteDeviationCalculator />);
    expect(screen.queryByRole("button", { name: "Copy result" })).not.toBeInTheDocument();

    await calculateReferenceDataset(user);

    const copyButton = screen.getByRole("button", { name: "Copy result" });
    await user.click(copyButton);

    expect(writeText).toHaveBeenCalledOnce();
    const copied = writeText.mock.calls[0][0] as string;
    expect(copied).toContain("Dataset: 12, 15, 14, 10, 19");
    expect(copied).toContain("Mean Absolute Deviation (MAD): 2.4");
    expect(copied).toContain("Range: 9");
    expect(screen.getByRole("status")).toHaveTextContent("Copied to clipboard");
  });

  it("resets to the genuine initial state", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    await calculateReferenceDataset(user);
    expect(getResultPanel().getByText("2.4")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /reset inputs/i }));

    expect(screen.getByLabelText("Dataset values")).toHaveValue("");
    expect(screen.getByLabelText("Load an example")).toHaveValue("");
    expect(
      getResultPanel().getByText(
        "Enter a dataset and press Calculate MAD to see the result.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copy result" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset inputs/i })).toBeDisabled();
  });
});

describe("MeanAbsoluteDeviationCalculator validation", () => {
  it("clears stale results after an invalid Calculate MAD attempt", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    await calculateReferenceDataset(user);
    expect(getResultPanel().getByText("2.4")).toBeInTheDocument();

    const textarea = screen.getByLabelText("Dataset values");
    await user.clear(textarea);
    await user.type(textarea, "abc");
    await user.click(screen.getByRole("button", { name: "Calculate MAD" }));

    expect(screen.getByRole("alert")).toHaveTextContent(/not a valid number/i);
    expect(
      getResultPanel().getByText(
        "Enter a dataset and press Calculate MAD to see the result.",
      ),
    ).toBeInTheDocument();
    expect(getResultPanel().queryByText("2.4")).not.toBeInTheDocument();
  });
});

describe("MeanAbsoluteDeviationCalculator large table behavior", () => {
  function buildDataset(count: number) {
    return Array.from({ length: count }, (_, index) => String(index + 1)).join(
      ", ",
    );
  }

  it(`renders all rows when count is ${MAD_TABLE_ROW_LIMIT}`, async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    fireEvent.change(screen.getByLabelText("Dataset values"), {
      target: { value: buildDataset(MAD_TABLE_ROW_LIMIT) },
    });
    await user.click(screen.getByRole("button", { name: "Calculate MAD" }));

    expect(screen.getAllByRole("row")).toHaveLength(MAD_TABLE_ROW_LIMIT + 1);
    expect(
      screen.queryByRole("button", { name: /show all/i }),
    ).not.toBeInTheDocument();
  });

  it("collapses tables beyond 100 rows and expands on demand", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    fireEvent.change(screen.getByLabelText("Dataset values"), {
      target: { value: buildDataset(101) },
    });
    await user.click(screen.getByRole("button", { name: "Calculate MAD" }));

    expect(screen.getAllByRole("row")).toHaveLength(MAD_TABLE_ROW_LIMIT + 1);
    expect(
      screen.getByText("Showing 100 of 101 observations"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show all 101 rows" }));
    expect(screen.getAllByRole("row")).toHaveLength(102);

    await user.click(
      screen.getByRole("button", { name: "Show first 100 rows" }),
    );
    expect(screen.getAllByRole("row")).toHaveLength(MAD_TABLE_ROW_LIMIT + 1);
  });

  it("resets table expansion after reset and new calculation", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    fireEvent.change(screen.getByLabelText("Dataset values"), {
      target: { value: buildDataset(101) },
    });
    await user.click(screen.getByRole("button", { name: "Calculate MAD" }));
    await user.click(screen.getByRole("button", { name: "Show all 101 rows" }));
    expect(screen.getAllByRole("row")).toHaveLength(102);

    await user.click(screen.getByRole("button", { name: /reset inputs/i }));
    fireEvent.change(screen.getByLabelText("Dataset values"), {
      target: { value: buildDataset(101) },
    });
    await user.click(screen.getByRole("button", { name: "Calculate MAD" }));

    expect(screen.getAllByRole("row")).toHaveLength(MAD_TABLE_ROW_LIMIT + 1);
    expect(
      screen.getByRole("button", { name: "Show all 101 rows" }),
    ).toBeInTheDocument();
  });

  it("supports 1,000 observations in collapsed mode", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    fireEvent.change(screen.getByLabelText("Dataset values"), {
      target: { value: buildDataset(1000) },
    });
    await user.click(screen.getByRole("button", { name: "Calculate MAD" }));

    expect(screen.getAllByRole("row")).toHaveLength(MAD_TABLE_ROW_LIMIT + 1);
    expect(
      screen.getByText("Showing 100 of 1000 observations"),
    ).toBeInTheDocument();
    expect(
      within(getResultPanel().getByText("Count").closest("div") as HTMLElement).getByText(
        "1000",
      ),
    ).toBeInTheDocument();
  });
});
