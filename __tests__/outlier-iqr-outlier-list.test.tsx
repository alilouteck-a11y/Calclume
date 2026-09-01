import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { OutlierLists } from "@/components/calculators/outlier-iqr/OutlierList";
import { OUTLIER_LIST_DISPLAY_LIMIT } from "@/lib/calculators/outlier-iqr-config";
import type { OutlierIqrOutlierEntry } from "@/lib/calculators/outlier-iqr-schema";

afterEach(() => {
  cleanup();
});

function buildOutlierEntries(count: number, value = 100): OutlierIqrOutlierEntry[] {
  return Array.from({ length: count }, (_, index) => ({
    index: index + 1,
    value,
  }));
}

describe("OutlierLists expansion", () => {
  it(`shows the first ${OUTLIER_LIST_DISPLAY_LIMIT} outliers with expand and collapse controls`, async () => {
    const user = userEvent.setup();
    const upperOutliers = buildOutlierEntries(25);

    render(
      <OutlierLists
        lowerOutliers={[]}
        upperOutliers={upperOutliers}
        outlierCount={25}
        decimals={4}
      />,
    );

    const upperList = screen.getByRole("heading", { name: /Upper outliers \(25\)/ })
      .parentElement as HTMLElement;
    expect(within(upperList).getAllByRole("listitem")).toHaveLength(
      OUTLIER_LIST_DISPLAY_LIMIT,
    );
    expect(screen.getByRole("button", { name: "Show 5 more" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show 5 more" }));
    expect(within(upperList).getAllByRole("listitem")).toHaveLength(25);

    await user.click(
      screen.getByRole("button", { name: `Show first ${OUTLIER_LIST_DISPLAY_LIMIT}` }),
    );
    expect(within(upperList).getAllByRole("listitem")).toHaveLength(
      OUTLIER_LIST_DISPLAY_LIMIT,
    );
  });

  it("keeps duplicate outlier occurrences visible when expanded", async () => {
    const user = userEvent.setup();
    const upperOutliers: OutlierIqrOutlierEntry[] = [
      ...buildOutlierEntries(OUTLIER_LIST_DISPLAY_LIMIT, 100),
      { index: 21, value: 100 },
      { index: 22, value: 100 },
      { index: 23, value: 100 },
      { index: 24, value: 100 },
      { index: 25, value: 100 },
    ];

    render(
      <OutlierLists
        lowerOutliers={[]}
        upperOutliers={upperOutliers}
        outlierCount={25}
        decimals={4}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Show 5 more" }));

    expect(screen.getByText("#21: 100")).toBeInTheDocument();
    expect(screen.getByText("#25: 100")).toBeInTheDocument();
    expect(screen.getAllByText(/#.+: 100/)).toHaveLength(25);
  });
});
