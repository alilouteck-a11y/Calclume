import { siteConfig } from "./site-config";

/** Public routes included in navigation, sitemap, and metadata tests. */
export const publicRoutes = [
  { path: "/", label: "Home", inPrimaryNav: false, inFooter: false },
  {
    path: "/calculators/",
    label: "Calculators",
    inPrimaryNav: true,
    inFooter: true,
  },
  {
    path: "/calculators/statistics/",
    label: "Statistics",
    inPrimaryNav: true,
    inFooter: true,
  },
  {
    path: "/methodology/",
    label: "Methodology",
    inPrimaryNav: true,
    inFooter: true,
  },
  { path: "/about/", label: "About", inPrimaryNav: true, inFooter: true },
  {
    path: "/editorial-policy/",
    label: "Editorial Policy",
    inPrimaryNav: false,
    inFooter: true,
  },
  {
    path: "/sources/",
    label: "Sources",
    inPrimaryNav: false,
    inFooter: true,
  },
  {
    path: "/contact/",
    label: "Contact",
    inPrimaryNav: false,
    inFooter: true,
  },
  {
    path: "/privacy/",
    label: "Privacy",
    inPrimaryNav: false,
    inFooter: true,
  },
  { path: "/terms/", label: "Terms", inPrimaryNav: false, inFooter: true },
] as const;

export type PublicRoute = (typeof publicRoutes)[number];

export const primaryNavRoutes = publicRoutes.filter((route) => route.inPrimaryNav);

export const footerNavRoutes = publicRoutes.filter((route) => route.inFooter);

export const sitemapRoutes = publicRoutes.map((route) => route.path);

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.domain}${normalized}`;
}
