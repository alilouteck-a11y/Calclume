import { createPageMetadata } from "@/lib/metadata";
import { buildSearchIndex } from "@/lib/calculator-search-index";
import { HomeHeroSearch } from "@/components/home/HomeHeroSearch";
import { HomeFeatured } from "@/components/home/HomeFeatured";
import { HomeCategoryBrowse } from "@/components/home/HomeCategoryBrowse";
import { HomeRecentlyAdded } from "@/components/home/HomeRecentlyAdded";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeTrustStrip } from "@/components/home/HomeTrustStrip";
import { HomeDiscoveryCta } from "@/components/home/HomeDiscoveryCta";

export const metadata = createPageMetadata({
  absoluteTitle: "CalcLume — Clear Calculators That Show the Work",
  title: "Home",
  description:
    "Browse clear, transparent calculators with formulas, steps, and interpretation. Calculations run locally in your browser.",
  path: "/",
});

export default function HomePage() {
  const searchIndex = buildSearchIndex();

  return (
    <>
      <HomeHeroSearch searchIndex={searchIndex} />
      <HomeFeatured />
      <HomeCategoryBrowse />
      <HomeRecentlyAdded />
      <HomeHowItWorks />
      <HomeTrustStrip />
      <HomeDiscoveryCta />
    </>
  );
}
