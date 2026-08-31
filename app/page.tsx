import { createPageMetadata } from "@/lib/metadata";
import { HeroSection } from "@/components/home/HeroSection";
import { ExamplePanel } from "@/components/home/ExamplePanel";
import { StatisticsPreview } from "@/components/home/StatisticsPreview";
import { WhyCalcLume } from "@/components/home/WhyCalcLume";
import { MethodologyPreview } from "@/components/home/MethodologyPreview";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = createPageMetadata({
  title: "Home",
  description:
    "CalcLume provides clear, transparent calculators that show your answer, the formula, each step, and a plain-language interpretation.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExamplePanel />
      <StatisticsPreview />
      <WhyCalcLume />
      <MethodologyPreview />
      <FinalCta />
    </>
  );
}
