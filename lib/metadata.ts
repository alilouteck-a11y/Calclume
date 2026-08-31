import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import { absoluteUrl } from "./routes";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle =
    path === "/" && title === "Home"
      ? `${siteConfig.name} — ${siteConfig.tagline}`
      : `${title} | ${siteConfig.name}`;

  const ogImages = siteConfig.openGraphImage
    ? [
        {
          url: absoluteUrl(siteConfig.openGraphImage),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ]
    : undefined;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.domain),
    ...(noIndex
      ? {}
      : {
          alternates: {
            canonical,
          },
        }),
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      ...(noIndex ? {} : { url: canonical }),
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      // Use large-image card only when a real OG asset exists.
      card: siteConfig.openGraphImage ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      ...(siteConfig.social.twitter
        ? { site: siteConfig.social.twitter }
        : {}),
      ...(ogImages ? { images: [absoluteUrl(siteConfig.openGraphImage!)] } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const defaultMetadata: Metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});
