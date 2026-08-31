import { describe, expect, it } from "vitest";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

describe("createPageMetadata", () => {
  it("sets canonical URL with production domain and trailing slash", () => {
    const metadata = createPageMetadata({
      title: "About",
      description: "About CalcLume",
      path: "/about/",
    });

    expect(metadata.alternates?.canonical).toBe("https://calclume.com/about/");
  });

  it("sets metadataBase to production domain", () => {
    const metadata = createPageMetadata({
      title: "Home",
      description: "CalcLume home",
      path: "/",
    });

    expect(metadata.metadataBase?.toString()).toBe("https://calclume.com/");
  });

  it("includes Open Graph and Twitter metadata", () => {
    const metadata = createPageMetadata({
      title: "Methodology",
      description: "Our methodology",
      path: "/methodology/",
    });

    expect(metadata.openGraph?.url).toBe("https://calclume.com/methodology/");
    expect(metadata.openGraph?.title).toBe("Methodology | CalcLume");
    expect(metadata.openGraph?.description).toBe("Our methodology");
    expect(metadata.twitter).toMatchObject({
      card: siteConfig.openGraphImage ? "summary_large_image" : "summary",
      title: "Methodology | CalcLume",
      description: "Our methodology",
    });
  });

  it("formats homepage title differently from inner pages", () => {
    const home = createPageMetadata({
      title: "Home",
      description: "Home page",
      path: "/",
    });
    const about = createPageMetadata({
      title: "About",
      description: "About page",
      path: "/about/",
    });

    expect(home.title).toContain("Clear calculators that show the work");
    expect(about.title).toBe("About | CalcLume");
  });

  it("marks 404 metadata as noindex", () => {
    const metadata = createPageMetadata({
      title: "Page not found",
      description: "Missing page",
      path: "/404/",
      noIndex: true,
    });

    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.alternates?.canonical).toBeUndefined();
  });

  it("does not embed localhost in production metadata", () => {
    const metadata = createPageMetadata({
      title: "About",
      description: "About CalcLume",
      path: "/about/",
    });

    expect(JSON.stringify(metadata)).not.toMatch(/localhost/i);
  });
});
