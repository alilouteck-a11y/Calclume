import { OutlierIqrCalculator } from "@/components/calculators/outlier-iqr/OutlierIqrCalculator";
import { OutlierIqrEducationalContent } from "@/components/calculators/outlier-iqr/OutlierIqrEducationalContent";
import { CalculatorEducationNav } from "@/components/calculator-page/CalculatorEducationNav";
import { CalculatorLastReviewed } from "@/components/calculator-page/CalculatorLastReviewed";
import { CalculatorPageIntro } from "@/components/calculator-page/CalculatorPageIntro";
import { CalculatorPageShell } from "@/components/calculator-page/CalculatorPageShell";
import { CalculatorRelatedSection } from "@/components/calculator-page/CalculatorRelatedSection";
import { CalculatorSourcesSection } from "@/components/calculator-page/CalculatorSourcesSection";
import { CalculatorTrustStrip } from "@/components/calculator-page/CalculatorTrustStrip";
import { outlierIqrCalculatorConfig } from "@/lib/calculators/outlier-iqr-config";
import { getOutlierIqrSoftwareApplicationSchema } from "@/lib/calculators/outlier-iqr-structured-data";
import {
  findCalculatorBySlug,
  resolveRelatedCalculators,
} from "@/lib/calculator-catalog";
import { getCategoryById } from "@/lib/calculator-categories";
import { createPageMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Outlier & IQR Calculator with Box Plot",
  description: outlierIqrCalculatorConfig.description,
  path: outlierIqrCalculatorConfig.path,
});

const OUTLIER_EDUCATION_NAV = [
  { id: "what-is-the-interquartile-range", label: "What is the interquartile range?" },
  { id: "what-is-an-outlier", label: "What is an outlier?" },
  { id: "iqr-formula", label: "IQR formula" },
  { id: "how-iqr-fences-work", label: "How IQR fences work" },
  { id: "how-to-calculate-iqr-and-outliers", label: "How to calculate IQR and outliers" },
  { id: "worked-example", label: "Worked example" },
  { id: "five-number-summary-explained", label: "Five-number summary explained" },
  { id: "how-to-read-the-box-plot", label: "How to read the box plot" },
  { id: "why-quartile-methods-can-disagree", label: "Why quartile methods can disagree" },
  { id: "iqr-versus-mean-absolute-deviation", label: "IQR versus MAD" },
  { id: "iqr-versus-standard-deviation", label: "IQR versus standard deviation" },
  { id: "when-iqr-is-useful", label: "When IQR is useful" },
  { id: "limitations", label: "Limitations" },
] as const;

export default function OutlierIqrPage() {
  const record = findCalculatorBySlug(outlierIqrCalculatorConfig.slug);
  const category = getCategoryById("statistics");
  const related = record ? resolveRelatedCalculators(record).slice(0, 4) : [];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators/" },
    { name: "Statistics", path: "/calculators/statistics/" },
    {
      name: "Outlier and IQR",
      path: outlierIqrCalculatorConfig.path,
    },
  ];

  const softwareSchema = getOutlierIqrSoftwareApplicationSchema();
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const lastReviewed =
    record?.lastReviewedAt ?? outlierIqrCalculatorConfig.lastReviewed;

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
          title={outlierIqrCalculatorConfig.name}
          description="Compute quartiles, interquartile range, Tukey fences, whiskers, and flagged outliers. Choose a quartile method and fence multiplier, then review the five-number summary, steps, classification table, and accessible box plot."
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
          methodNote="Default quartile method is exclusive-halves; Excel INC / R7 is available. Fence multipliers are 1.5× (default) and 3.0×. Values exactly on a fence are not outliers. Outliers are identified, never automatically deleted."
        />
      }
      workspace={<OutlierIqrCalculator />}
      educationNav={<CalculatorEducationNav items={OUTLIER_EDUCATION_NAV} />}
      education={<OutlierIqrEducationalContent />}
      sources={
        <CalculatorSourcesSection sources={outlierIqrCalculatorConfig.sources}>
          References below support IQR, Tukey-style fences, box-plot
          interpretation, and quartile-method transparency.
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
