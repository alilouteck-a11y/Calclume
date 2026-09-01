import { fireEvent, screen, within } from "@testing-library/react";
import type userEvent from "@testing-library/user-event";

export function getResultPanel() {
  const heading = screen.getByRole("heading", { name: "Result" });
  const panel = heading.nextElementSibling;
  if (!panel) {
    throw new Error("Result panel not found.");
  }

  return within(panel as HTMLElement);
}

export function getPrimaryIqrValue(panel: ReturnType<typeof within>) {
  const label = panel.getByText("Interquartile range (IQR)");
  const value = label.parentElement?.querySelector("dd");
  if (!value) {
    throw new Error("Primary IQR value not found.");
  }

  return value as HTMLElement;
}

export function getClassificationTableSection() {
  return screen.getByRole("heading", {
    name: "Observation classification table",
  }).parentElement as HTMLElement;
}

export function buildNumericDataset(count: number) {
  return Array.from({ length: count }, (_, index) => String(index + 1)).join(", ");
}

export async function calculateDataset(
  user: ReturnType<typeof userEvent.setup>,
  input: string,
) {
  const textarea = screen.getByLabelText("Dataset values");
  fireEvent.change(textarea, { target: { value: input } });
  await user.click(
    screen.getByRole("button", { name: "Calculate outliers and IQR" }),
  );
}
