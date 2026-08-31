# Phase 1 SEO Architecture

**Status:** Locked for Phase 1  
**Production URL:** https://calclume.com

## Metadata strategy

Every public route exports unique metadata via `createPageMetadata()`:

- Unique title and description per page
- `metadataBase`: `https://calclume.com`
- Canonical URLs with trailing slashes
- Open Graph and X/Twitter metadata

## Sitemap

`app/sitemap.ts` generates entries for implemented public routes only. Calculator detail pages are excluded (none exist in Phase 1).

## Robots

`app/robots.ts` allows all user agents and references `https://calclume.com/sitemap.xml`.

## Structured data

### Implemented

- Organization (site-wide)
- WebSite (site-wide)
- BreadcrumbList (where valid hierarchy exists)

### Explicitly excluded

- Review, rating, FAQ, and SoftwareApplication schema (before real calculators)

## SEO prohibitions

- No keywords meta tag
- No auto-generated SEO paragraphs
- No indexable search/filter URLs
- No fabricated statistics in copy
- No indexable placeholder calculator pages

## Canonical URL convention

All canonical URLs: `https://calclume.com/[path-with-trailing-slash]`
