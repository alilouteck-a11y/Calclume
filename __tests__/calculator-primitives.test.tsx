import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CalculatorFixture } from "./fixtures/calculator-primitives";

afterEach(() => {
  cleanup();
});

describe("calculator primitives accessibility", () => {
  it("associates dataset input with label and error", () => {
    render(
      <CalculatorFixture
        datasetValue=""
        datasetError="Enter at least two values"
        result=""
      />,
    );

    expect(screen.getByLabelText("Sample data")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter at least two values",
    );
  });

  it("announces results in a live region", () => {
    render(<CalculatorFixture datasetValue="1, 2, 3" result="2" />);

    const liveRegion = screen.getByText("2").closest("[aria-live]");
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
  });

  it("renders formula and steps with semantic structure", () => {
    render(<CalculatorFixture datasetValue="1, 2, 3" result="2" />);

    expect(screen.getByText("x̄ = Σx / n")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Steps" })).toBeInTheDocument();
    expect(screen.getByText(/Step 1:/)).toBeInTheDocument();
  });

  it("supports keyboard interaction on reset button", async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();

    render(
      <CalculatorFixture datasetValue="1, 2, 3" result="2" onReset={onReset} />,
    );

    const resetButton = screen.getByRole("button", { name: /reset inputs/i });
    resetButton.focus();
    await user.keyboard("{Enter}");
    expect(onReset).toHaveBeenCalledOnce();
  });

  it("renders accessible result table with caption", () => {
    render(<CalculatorFixture datasetValue="1, 2, 3" result="2" showTable />);

    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
