export const siteConfig = {
  name: "CalcLume",
  tagline: "Clear calculators that show the work.",
  domain: "https://calclume.com",
  description:
    "Accurate, transparent calculators that show your answer, the formula, each step, and a plain-language interpretation.",
  email: "hello@calclume.com",
  locale: "en",
  social: {
    twitter: "",
    github: "",
    linkedin: "",
  },
  /** Current production privacy posture — keep in sync with /privacy/. */
  privacy: {
    analyticsEnabled: false,
    advertisingEnabled: false,
    affiliateLinksEnabled: false,
    accountsEnabled: false,
    calculatorInputsTransmitted: false,
    calculatorInputsStored: false,
    functionalCookiesSetByApp: false,
  },
  /**
   * Social preview image status for static export.
   * When an asset is added under public/, set path to that file (e.g. "/og-default.png").
   */
  openGraphImage: null as string | null,
} as const;

export type SiteConfig = typeof siteConfig;
