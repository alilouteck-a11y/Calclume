import { absoluteUrl } from "@/lib/routes";
import { outlierIqrCalculatorConfig } from "@/lib/calculators/outlier-iqr-config";

/** SoftwareApplication JSON-LD for the published Outlier and IQR calculator. */
export function getOutlierIqrSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: outlierIqrCalculatorConfig.name,
    url: absoluteUrl(outlierIqrCalculatorConfig.path),
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: outlierIqrCalculatorConfig.description,
  };
}
