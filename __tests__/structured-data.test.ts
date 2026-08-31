import { describe, expect, it } from "vitest";
import {
  getBreadcrumbSchema,
  getOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/structured-data";

describe("structured data", () => {
  it("outputs Organization schema", () => {
    const schema = getOrganizationSchema();
    expect(schema["@type"]).toBe("Organization");
    expect(schema.url).toBe("https://calclume.com");
    expect(schema.email).toBe("hello@calclume.com");
  });

  it("outputs WebSite schema", () => {
    const schema = getWebSiteSchema();
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.inLanguage).toBe("en");
  });

  it("outputs BreadcrumbList when items are provided", () => {
    const schema = getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about/" },
    ]);

    expect(schema?.["@type"]).toBe("BreadcrumbList");
    expect(schema?.itemListElement).toHaveLength(2);
    expect(schema?.itemListElement[0].item).toBe("https://calclume.com/");
  });

  it("returns null for empty breadcrumbs", () => {
    expect(getBreadcrumbSchema([])).toBeNull();
  });
});
