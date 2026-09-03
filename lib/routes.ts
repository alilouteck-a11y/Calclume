import { siteConfig } from "./site-config";
import { getSitemapEligibleCategoryRoutes } from "@/lib/calculator-category-publication";
import { getCategoryBySlug } from "@/lib/calculator-categories";

/** Core public routes — trust, directory, and marketing. Category hubs are derived. */
export const publicRoutes = [
  { path: "/", label: "Home", inPrimaryNav: false, inFooter: false },
  {
    path: "/calculators/",
    label: "Calculators",
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

const staticFooterNavRoutes = publicRoutes.filter((route) => route.inFooter);

/**
 * Footer links: static trust/directory routes plus derived public category hubs.
 * Category membership comes from publication helpers — not a parallel list.
 */
export function getFooterNavRoutes(): readonly { path: string; label: string }[] {
  const categoryLinks = getSitemapEligibleCategoryRoutes().map((route) => {
    const slug = route.replace(/^\/calculators\/|\/$/g, "");
    const category = getCategoryBySlug(slug);
    return { path: route, label: category?.name ?? slug };
  });

  // Insert category links after Calculators for stable, scannable footer order.
  const result: { path: string; label: string }[] = [];
  for (const route of staticFooterNavRoutes) {
    result.push({ path: route.path, label: route.label });
    if (route.path === "/calculators/") {
      result.push(...categoryLinks);
    }
  }
  return result;
}

/** Footer routes including derived public category hubs. */
export const footerNavRoutes = getFooterNavRoutes();

/** Base sitemap paths excluding calculator detail URLs and derived category hubs. */
export const sitemapRoutes = publicRoutes.map((route) => route.path);

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.domain}${normalized}`;
}
