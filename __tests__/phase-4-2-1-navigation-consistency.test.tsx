import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import MeanAbsoluteDeviationPage from "@/app/calculators/statistics/mean-absolute-deviation/page";
import OutlierIqrPage from "@/app/calculators/statistics/outlier-iqr/page";
import CalculatorsPage from "@/app/calculators/page";
import HomePage from "@/app/page";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { buildSearchIndex } from "@/lib/calculator-search-index";
import { primaryNavRoutes } from "@/lib/routes";

const searchIndex = buildSearchIndex();

afterEach(() => {
  cleanup();
});

function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header searchIndex={searchIndex} />
      <div id="main-content">{children}</div>
      <Footer />
    </>
  );
}

function expectPhase42PrimaryNav(container: HTMLElement = document.body) {
  const primary = within(container).getByRole("navigation", { name: "Primary" });
  const labels = within(primary)
    .getAllByRole("link")
    .map((link) => link.textContent?.trim());

  expect(labels).toEqual(primaryNavRoutes.map((route) => route.label));
  expect(labels).toEqual(["Calculators", "Methodology", "About"]);
  expect(within(primary).queryByRole("link", { name: "Statistics" })).not.toBeInTheDocument();
  expect(
    within(container).getAllByRole("button", { name: /search calculators/i }).length,
  ).toBeGreaterThan(0);
  expect(within(container).getAllByRole("banner", { name: "Site" })).toHaveLength(1);
  expect(within(container).getAllByRole("navigation", { name: "Primary" })).toHaveLength(1);
}

describe("Phase 4.2.1 shared header consistency", () => {
  it("uses identical Phase 4.2 primary navigation on MAD and Outlier pages", () => {
    const mad = render(
      <SiteShell>
        <MeanAbsoluteDeviationPage />
      </SiteShell>,
    );
    expectPhase42PrimaryNav();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(
      within(screen.getByRole("navigation", { name: "Breadcrumb" })).getByRole("link", {
        name: "Statistics",
      }),
    ).toBeInTheDocument();
    mad.unmount();

    render(
      <SiteShell>
        <OutlierIqrPage />
      </SiteShell>,
    );
    expectPhase42PrimaryNav();
    expect(
      within(screen.getByRole("navigation", { name: "Breadcrumb" })).getByRole("link", {
        name: "Statistics",
      }),
    ).toBeInTheDocument();
  });

  it("keeps Statistics in footer while excluding it from primary nav on public shells", () => {
    render(
      <SiteShell>
        <HomePage />
      </SiteShell>,
    );

    expectPhase42PrimaryNav();
    expect(
      within(screen.getByRole("contentinfo")).getByRole("link", { name: "Statistics" }),
    ).toBeInTheDocument();
  });

  it("exposes identical mobile drawer destinations from MAD and directory shells", async () => {
    const user = userEvent.setup();

    const mad = render(
      <SiteShell>
        <MeanAbsoluteDeviationPage />
      </SiteShell>,
    );
    await user.click(screen.getByRole("button", { name: /^menu$/i }));
    const madDrawer = screen.getByRole("dialog", { name: /site navigation/i });
    const madLinks = within(madDrawer)
      .getAllByRole("link")
      .map((link) => link.textContent?.trim());
    expect(madLinks).toEqual(["Calculators", "Methodology", "About", "Contact"]);
    expect(within(madDrawer).queryByRole("link", { name: "Statistics" })).not.toBeInTheDocument();
    mad.unmount();

    render(
      <SiteShell>
        <CalculatorsPage />
      </SiteShell>,
    );
    await user.click(screen.getByRole("button", { name: /^menu$/i }));
    const directoryDrawer = screen.getByRole("dialog", { name: /site navigation/i });
    const directoryLinks = within(directoryDrawer)
      .getAllByRole("link")
      .map((link) => link.textContent?.trim());
    expect(directoryLinks).toEqual(madLinks);
  });

  it("initializes directory search without throwing on direct render", async () => {
    const user = userEvent.setup();
    render(
      <SiteShell>
        <CalculatorsPage />
      </SiteShell>,
    );

    expect(screen.getByRole("heading", { name: /^Calculators$/i })).toBeInTheDocument();
    const search = screen.getByRole("combobox", { name: /search calculators/i });
    await user.type(search, "mad");
    expect(search).toHaveValue("mad");
  });
});
