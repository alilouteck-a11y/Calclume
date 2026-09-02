import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { CalculatorSearch } from "@/components/search/CalculatorSearch";
import { buildSearchIndex } from "@/lib/calculator-search-index";

const searchIndex = buildSearchIndex();

afterEach(() => {
  cleanup();
});

describe("CalculatorSearch UI", () => {
  it("shows minimum-character guidance for one-character input without no-results", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch searchIndex={searchIndex} variant="hero" />);

    await user.type(screen.getByRole("combobox", { name: /search calculators/i }), "m");

    expect(
      screen.getByText(/type at least 2 characters to search published calculators/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/no calculators match/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("announces result count after debounced valid query", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch searchIndex={searchIndex} variant="hero" />);

    await user.type(screen.getByRole("combobox", { name: /search calculators/i }), "mad");

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/calculator/i);
    });
  });

  it("clears query with clear button", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch searchIndex={searchIndex} variant="hero" />);

    const input = screen.getByRole("combobox", { name: /search calculators/i });
    await user.type(input, "mad");
    await user.click(screen.getByRole("button", { name: /clear search/i }));

    expect(input).toHaveValue("");
  });

  it("links only to published calculator routes", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch searchIndex={searchIndex} variant="hero" />);

    await user.type(screen.getByRole("combobox", { name: /search calculators/i }), "outlier");

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    const links = screen.getAllByRole("option");
    for (const option of links) {
      const anchor = option.querySelector("a");
      expect(anchor?.getAttribute("href")).toMatch(
        /^\/calculators\/statistics\/(mean-absolute-deviation|outlier-iqr)\/?$/,
      );
    }
  });

  it("shows no-results state with directory fallback link", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch searchIndex={searchIndex} variant="hero" />);

    await user.type(
      screen.getByRole("combobox", { name: /search calculators/i }),
      "zzzznotfound",
    );

    await waitFor(() => {
      expect(screen.getByText(/no calculators match/i)).toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: /browse all calculators/i })).toHaveAttribute(
      "href",
      "/calculators",
    );
  });
});
