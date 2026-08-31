import { absoluteUrl } from "@/lib/routes";
import { madCalculatorConfig } from "@/lib/calculators/mean-absolute-deviation-config";

/** SoftwareApplication JSON-LD for the published MAD calculator. */
export function getMadSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: madCalculatorConfig.name,
    url: absoluteUrl(madCalculatorConfig.path),
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: madCalculatorConfig.description,
  };
}
