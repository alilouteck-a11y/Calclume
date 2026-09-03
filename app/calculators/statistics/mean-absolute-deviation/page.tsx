import { MeanAbsoluteDeviationCalculator } from "@/components/calculators/mean-absolute-deviation/MeanAbsoluteDeviationCalculator";
import { MadEducationalContent } from "@/components/calculators/mean-absolute-deviation/MadEducationalContent";
import { CalculatorEducationNav } from "@/components/calculator-page/CalculatorEducationNav";
import { CalculatorLastReviewed } from "@/components/calculator-page/CalculatorLastReviewed";
import { CalculatorPageIntro } from "@/components/calculator-page/CalculatorPageIntro";
import { CalculatorPageShell } from "@/components/calculator-page/CalculatorPageShell";
import { CalculatorRelatedSection } from "@/components/calculator-page/CalculatorRelatedSection";
import { CalculatorSourcesSection } from "@/components/calculator-page/CalculatorSourcesSection";
import { CalculatorTrustStrip } from "@/components/calculator-page/CalculatorTrustStrip";
import { madCalculatorConfig } from "@/lib/calculators/mean-absolute-deviation-config";
import { getMadSoftwareApplicationSchema } from "@/lib/calculators/mean-absolute-deviation-schema";
import {
  findCalculatorBySlug,
  resolveRelatedCalculators,
} from "@/lib/calculator-catalog";
import { getCategoryById } from "@/lib/calculator-categories";
import { createPageMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Mean Absolute Deviation Calculator",
  description:
    "Calculate mean absolute deviation (MAD) about the arithmetic mean. Enter a dataset to see the formula, step-by-step working, deviation table, and a clear interpretation—all computed locally in your browser.",
  path: madCalculatorConfig.path,
});

const MAD_EDUCATION_NAV = [
  { id: "what-is-mean-absolute-deviation", label: "What is mean absolute deviation?" },
  { id: "mean-absolute-deviation-formula", label: "Mean absolute deviation formula" },
  { id: "how-to-calculate-mad", label: "How to calculate MAD" },
  { id: "complete-worked-example", label: "Complete worked example" },
  {
    id: "mean-absolute-deviation-versus-standard-deviation",
    label: "MAD versus standard deviation",
  },
  { id: "when-mad-is-useful", label: "When MAD is useful" },
  { id: "limitations-and-interpretation", label: "Limitations and interpretation" },
] as const;

export default function MeanAbsoluteDeviationPage() {
  const record = findCalculatorBySlug(madCalculatorConfig.slug);
  const category = getCategoryById("statistics");
  const related = record ? resolveRelatedCalculators(record).slice(0, 4) : [];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators/" },
    { name: "Statistics", path: "/calculators/statistics/" },
    {
      name: "Mean Absolute Deviation",
      path: madCalculatorConfig.path,
    },
  ];

  const softwareSchema = getMadSoftwareApplicationSchema();
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const lastReviewed =
    record?.lastReviewedAt ?? madCalculatorConfig.lastReviewed;

  return (
    <CalculatorPageShell
      structuredData={
        breadcrumbSchema ? [breadcrumbSchema, softwareSchema] : [softwareSchema]
      }
      breadcrumbs={breadcrumbs}
      intro={
        <CalculatorPageIntro
          categoryName={category?.name ?? "Statistics"}
          categoryHref={category?.route ?? "/calculators/statistics/"}
          title={madCalculatorConfig.name}
          description="Compute mean absolute deviation about the arithmetic mean. Enter values, press Calculate MAD, and review the formula, steps, and deviation table."
        />
      }
      trust={
        <CalculatorTrustStrip
          items={[
            { label: "Local calculation" },
            { label: "Formula and steps shown" },
            { label: "Sources below", href: "#sources" },
            { label: "Reviewed methodology", href: "/methodology/" },
          ]}
          methodNote="This calculator reports arithmetic-mean MAD and divides by n. It is not median absolute deviation, and it does not offer an n − 1 sample variant."
        />
      }
      workspace={<MeanAbsoluteDeviationCalculator />}
      educationNav={<CalculatorEducationNav items={MAD_EDUCATION_NAV} />}
      education={<MadEducationalContent />}
      sources={
        <CalculatorSourcesSection sources={madCalculatorConfig.sources}>
          References below were consulted for measures of scale, deviation
          notation, and standard-deviation context.
        </CalculatorSourcesSection>
      }
      related={
        <CalculatorRelatedSection
          calculators={related}
          collectionHref="/calculators/statistics/"
          collectionLabel="Statistics & Data collection"
        />
      }
      lastReviewed={<CalculatorLastReviewed isoDate={lastReviewed} />}
    />
  );
}
