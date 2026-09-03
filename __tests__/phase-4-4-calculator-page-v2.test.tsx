import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import MeanAbsoluteDeviationPage from "@/app/calculators/statistics/mean-absolute-deviation/page";
import OutlierIqrPage from "@/app/calculators/statistics/outlier-iqr/page";
import { MeanAbsoluteDeviationCalculator } from "@/components/calculators/mean-absolute-deviation/MeanAbsoluteDeviationCalculator";
import { OutlierIqrCalculator } from "@/components/calculators/outlier-iqr/OutlierIqrCalculator";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { createPageMetadata } from "@/lib/metadata";
import { madCalculatorConfig } from "@/lib/calculators/mean-absolute-deviation-config";
import { outlierIqrCalculatorConfig } from "@/lib/calculators/outlier-iqr-config";
import { getMadSoftwareApplicationSchema } from "@/lib/calculators/mean-absolute-deviation-schema";
import { getOutlierIqrSoftwareApplicationSchema } from "@/lib/calculators/outlier-iqr-structured-data";
import { buildSearchIndex } from "@/lib/calculator-search-index";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import {
  calculateDataset,
  getPrimaryIqrValue,
  getResultPanel,
} from "./outlier-iqr-test-helpers";

const searchIndex = buildSearchIndex();

afterEach(() => {
  cleanup();
});

function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header searchIndex={searchIndex} />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

function expectFollowing(earlier: HTMLElement, later: HTMLElement) {
  expect(
    earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).not.toBe(0);
}

function expectSingleHeading(name: string | RegExp) {
  expect(screen.getAllByRole("heading", { name })).toHaveLength(1);
}

describe("Calculator Page V2 shared architecture", () => {
  it("renders MAD through the V2 shell with one H1 and ordered regions", () => {
    render(<MeanAbsoluteDeviationPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Mean Absolute Deviation Calculator",
      }),
    ).toBeInTheDocument();

    expectSingleHeading("How this calculator works");
    expectSingleHeading("Sources and methodology");
    expectSingleHeading("Related calculators");
    expect(screen.getAllByText(/^Last reviewed:/)).toHaveLength(1);

    const calculator = screen.getByRole("heading", {
      name: "Calculate mean absolute deviation",
    });
    const education = screen.getByRole("heading", {
      name: "What is mean absolute deviation?",
    });
    expectFollowing(calculator, education);
    expect(
      screen.getByText(
        /arithmetic-mean MAD and divides by n/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders Outlier/IQR through the V2 shell with one H1 and ordered regions", () => {
    render(<OutlierIqrPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Outlier and IQR Calculator",
      }),
    ).toBeInTheDocument();

    expectSingleHeading("How this calculator works");
    expectSingleHeading("Sources and methodology");
    expectSingleHeading("Related calculators");
    expect(screen.getAllByText(/^Last reviewed:/)).toHaveLength(1);

    const calculator = screen.getByRole("heading", {
      name: "Calculate outliers and interquartile range",
    });
    const education = screen.getByRole("heading", {
      name: "What is the interquartile range?",
    });
    expectFollowing(calculator, education);
    expect(
      screen.getByText(/Default quartile method is exclusive-halves/i),
    ).toBeInTheDocument();
  });

  it("keeps a single Header and Footer when wrapped in the site shell", () => {
    render(
      <SiteShell>
        <MeanAbsoluteDeviationPage />
      </SiteShell>,
    );

    expect(screen.getAllByRole("banner", { name: "Site" })).toHaveLength(1);
    expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute(
      "href",
      "#main-content",
    );
  });

  it("omits duplicated intro micro-facts and keeps one trust strip", () => {
    render(<MeanAbsoluteDeviationPage />);

    expect(screen.queryByText("Calculations run locally")).not.toBeInTheDocument();
    expect(screen.queryByText("Shows formula and steps")).not.toBeInTheDocument();
    expect(screen.queryByText("No sign-in required")).not.toBeInTheDocument();

    expectSingleHeading("How this calculator works");
    const trust = screen.getByRole("heading", {
      name: "How this calculator works",
    }).parentElement as HTMLElement;
    expect(within(trust).getByText("Local calculation")).toBeInTheDocument();
    expect(within(trust).getByText("Formula and steps shown")).toBeInTheDocument();
    expect(
      within(trust).getByRole("link", { name: "Sources below" }),
    ).toHaveAttribute("href", "#sources");
    expect(
      within(trust).getByRole("link", { name: "Reviewed methodology" }),
    ).toHaveAttribute("href", expect.stringMatching(/\/methodology\/?$/));
  });

  it("shows only published related calculators with navigable routes", () => {
    const mad = render(<MeanAbsoluteDeviationPage />);

    const related = screen.getByRole("heading", { name: "Related calculators" })
      .parentElement as HTMLElement;

    expect(
      within(related).getByRole("link", { name: "Outlier and IQR Calculator" }),
    ).toHaveAttribute("href", expect.stringMatching(/\/outlier-iqr\/?$/));
    expect(
      within(related).getAllByRole("link", {
        name: "Outlier and IQR Calculator",
      }),
    ).toHaveLength(1);
    expect(within(related).queryByText("In preparation")).not.toBeInTheDocument();
    expect(
      within(related).queryByText("Coefficient of Variation Calculator"),
    ).not.toBeInTheDocument();
    expect(
      within(related).queryByText("Standard Error of the Mean Calculator"),
    ).not.toBeInTheDocument();
    expect(
      within(related).queryByText("Critical Value Calculator"),
    ).not.toBeInTheDocument();

    mad.unmount();
    render(<OutlierIqrPage />);

    const outlierRelated = screen.getByRole("heading", {
      name: "Related calculators",
    }).parentElement as HTMLElement;

    expect(
      within(outlierRelated).getByRole("link", {
        name: "Mean Absolute Deviation Calculator",
      }),
    ).toHaveAttribute(
      "href",
      expect.stringMatching(/\/mean-absolute-deviation\/?$/),
    );
    expect(
      within(outlierRelated).getAllByRole("link", {
        name: "Mean Absolute Deviation Calculator",
      }),
    ).toHaveLength(1);
    expect(within(outlierRelated).queryByText("In preparation")).not.toBeInTheDocument();
    expect(
      within(outlierRelated).queryByText("Coefficient of Variation Calculator"),
    ).not.toBeInTheDocument();
  });
});

describe("Calculator Page V2 accessibility", () => {
  it("keeps a valid heading outline and labeled MAD controls", () => {
    render(
      <SiteShell>
        <MeanAbsoluteDeviationPage />
      </SiteShell>,
    );

    const headings = screen.getAllByRole("heading");
    const levels = headings.map((heading) => Number(heading.tagName.replace("H", "")));
    expect(levels[0]).toBe(1);
    expect(Math.min(...levels)).toBe(1);
    expect(levels.some((level) => level === 2)).toBe(true);

    expect(screen.getByLabelText("Dataset values")).toBeInTheDocument();
    expect(screen.getByLabelText("Load an example")).toBeInTheDocument();
    expect(screen.getByLabelText("Decimal places")).toBeInTheDocument();
  });

  it("does not nest interactive elements on related cards", () => {
    render(<MeanAbsoluteDeviationPage />);

    expect(document.querySelector("a a, a button, button a")).toBeNull();
  });

  it("announces MAD results in a polite live region", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    await user.type(screen.getByLabelText("Dataset values"), "12, 15, 14, 10, 19");
    await user.click(screen.getByRole("button", { name: "Calculate MAD" }));

    const liveRegion = getResultPanel().getByText("2.4").closest("[aria-live]");
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(
      getResultPanel().getByText((_, node) => {
        return (
          node?.tagName === "DD" &&
          (node.textContent ?? "").includes("MAD =") &&
          (node.textContent ?? "").includes("2.4")
        );
      }),
    ).toBeInTheDocument();
  });
});

describe("MAD Calculator Page V2 regression", () => {
  it("returns MAD 2.4 for the approved fixture", async () => {
    const user = userEvent.setup();
    render(<MeanAbsoluteDeviationCalculator />);

    await user.type(screen.getByLabelText("Dataset values"), "12, 15, 14, 10, 19");
    await user.click(screen.getByRole("button", { name: "Calculate MAD" }));

    const panel = getResultPanel();
    expect(panel.getByText("2.4")).toBeInTheDocument();
    expect(panel.getByText("14")).toBeInTheDocument();
    expect(screen.getByText(/Formula/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Steps" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Deviation table" })).toBeInTheDocument();
  });

  it("preserves MAD metadata, canonical, and SoftwareApplication schema", () => {
    const metadata = createPageMetadata({
      title: "Mean Absolute Deviation Calculator",
      description:
        "Calculate mean absolute deviation (MAD) about the arithmetic mean. Enter a dataset to see the formula, step-by-step working, deviation table, and a clear interpretation—all computed locally in your browser.",
      path: madCalculatorConfig.path,
    });

    expect(metadata.title).toBe("Mean Absolute Deviation Calculator | CalcLume");
    expect(metadata.alternates?.canonical).toBe(
      "https://calclume.com/calculators/statistics/mean-absolute-deviation/",
    );
    expect(metadata.robots).toEqual({ index: true, follow: true });

    const schema = JSON.stringify([
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Calculators", path: "/calculators/" },
        { name: "Statistics", path: "/calculators/statistics/" },
        { name: "Mean Absolute Deviation", path: madCalculatorConfig.path },
      ]),
      getMadSoftwareApplicationSchema(),
    ]);
    expect(schema).toContain("BreadcrumbList");
    expect(schema).toContain("SoftwareApplication");
    expect(schema).not.toMatch(/FAQPage|HowTo|AggregateRating|Review/);
    expect(schema).not.toMatch(/localhost/i);
  });
});

describe("Outlier/IQR Calculator Page V2 regression", () => {
  it("returns the F02 fixture values under default settings", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "1, 2, 3, 4, 5, 6, 7, 8, 9, 100");

    const panel = getResultPanel();
    expect(panel.getByText("1 outlier found")).toBeInTheDocument();
    expect(getPrimaryIqrValue(panel)).toHaveTextContent("5");
    expect(panel.getByText("3")).toBeInTheDocument();
    expect(panel.getByText("5.5")).toBeInTheDocument();
    expect(panel.getByText("8")).toBeInTheDocument();
    expect(panel.getByText("-4.5")).toBeInTheDocument();
    expect(panel.getByText("15.5")).toBeInTheDocument();
    expect(screen.getByText(/#10: 100/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /box plot of dataset quartiles and outliers/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Box plot summary:/).length).toBeGreaterThanOrEqual(1);
  });

  it("keeps compact accessible five-number and fence grids with all values", async () => {
    const user = userEvent.setup();
    render(<OutlierIqrCalculator />);

    await calculateDataset(user, "1, 2, 3, 4, 5, 6, 7, 8, 9, 100");

    const fiveNumber = screen.getByRole("heading", {
      name: "Five-number summary",
    }).parentElement as HTMLElement;
    expect(within(fiveNumber).getByText("Data minimum").nextElementSibling).toHaveTextContent(
      "1",
    );
    expect(within(fiveNumber).getByText("Q1").nextElementSibling).toHaveTextContent("3");
    expect(within(fiveNumber).getByText("Median").nextElementSibling).toHaveTextContent(
      "5.5",
    );
    expect(within(fiveNumber).getByText("Q3").nextElementSibling).toHaveTextContent("8");
    expect(within(fiveNumber).getByText("Data maximum").nextElementSibling).toHaveTextContent(
      "100",
    );
    expect(fiveNumber.querySelector("dl")).not.toBeNull();

    const fences = screen.getByRole("heading", {
      name: "IQR fences and whiskers",
    }).parentElement as HTMLElement;
    expect(within(fences).getByText("Lower fence").nextElementSibling).toHaveTextContent(
      "-4.5",
    );
    expect(within(fences).getByText("Upper fence").nextElementSibling).toHaveTextContent(
      "15.5",
    );
    expect(within(fences).getByText("Lower whisker").nextElementSibling).toHaveTextContent(
      "1",
    );
    expect(within(fences).getByText("Upper whisker").nextElementSibling).toHaveTextContent(
      "9",
    );
    expect(fences.querySelector("dl")).not.toBeNull();
  });

  it("preserves Outlier/IQR metadata, canonical, and SoftwareApplication schema", () => {
    const metadata = createPageMetadata({
      title: "Outlier & IQR Calculator with Box Plot",
      description: outlierIqrCalculatorConfig.description,
      path: outlierIqrCalculatorConfig.path,
    });

    expect(metadata.title).toBe(
      "Outlier & IQR Calculator with Box Plot | CalcLume",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://calclume.com/calculators/statistics/outlier-iqr/",
    );
    expect(metadata.robots).toEqual({ index: true, follow: true });

    const schema = JSON.stringify(getOutlierIqrSoftwareApplicationSchema());
    expect(schema).toContain("SoftwareApplication");
    expect(schema).not.toMatch(/FAQPage|HowTo|AggregateRating|Review/);
    expect(schema).not.toMatch(/localhost/i);
  });
});
