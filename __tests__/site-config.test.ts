import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site-config";

describe("siteConfig", () => {
  it("uses the production domain", () => {
    expect(siteConfig.domain).toBe("https://calclume.com");
  });

  it("defines contact email in configuration", () => {
    expect(siteConfig.email).toBe("hello@calclume.com");
  });

  it("does not invent social links", () => {
    expect(siteConfig.social.twitter).toBe("");
    expect(siteConfig.social.github).toBe("");
    expect(siteConfig.social.linkedin).toBe("");
  });

  it("keeps current privacy flags disabled for soft launch", () => {
    expect(siteConfig.privacy.analyticsEnabled).toBe(false);
    expect(siteConfig.privacy.advertisingEnabled).toBe(false);
    expect(siteConfig.privacy.affiliateLinksEnabled).toBe(false);
    expect(siteConfig.privacy.accountsEnabled).toBe(false);
    expect(siteConfig.privacy.calculatorInputsTransmitted).toBe(false);
    expect(siteConfig.privacy.calculatorInputsStored).toBe(false);
    expect(siteConfig.privacy.functionalCookiesSetByApp).toBe(false);
  });
});
