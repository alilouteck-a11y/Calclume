# Phase 2.3 — Hostinger Static Hosting Deployment

**Domain:** https://calclume.com  
**Output directory:** `out/`  
**Do not upload credentials in this document.**

## Build locally

Requirements:

- Node.js **20+** (project `engines.node` is `>=20`)
- npm

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run build
```

Production files are written to:

```text
out/
```

Upload **only the contents of `out/`** to the hosting document root (or the directory Hostinger maps to the domain). Do not upload the Next.js project source as the live site.

## Hostinger static hosting checklist

1. Create or open a **Static Website** / website hosting product that serves files from a public root.
2. Point the site’s document root at the folder that will receive the export (often `public_html`).
3. Upload/sync the **contents** of `out/` so that:
   - `index.html` is at the domain root
   - `calculators/statistics/mean-absolute-deviation/index.html` resolves under that path
   - `robots.txt` and `sitemap.xml` are at the root
4. Map the custom domain `calclume.com` (and `www` if used) to this site.
5. Enable **HTTPS** (Let’s Encrypt or Hostinger SSL). Canonical URLs already use `https://calclume.com`.
6. Prefer redirecting `www` → apex (or the reverse) consistently; keep one canonical host.
7. Confirm trailing-slash behavior:
   - Site is built with `trailingSlash: true`
   - URLs like `/about/` should resolve without redirect loops
8. Custom 404:
   - Export includes `404.html`
   - Configure Hostinger (or `.htaccess` if Apache-backed) to serve `404.html` for missing paths
9. Caching guidance:
   - Cache hashed `/_next/static/**` assets aggressively (immutable / long TTL)
   - Do **not** cache HTML indefinitely (`index.html`, nested `*/index.html`, `404.html`)
10. After deploy, verify:
    - `https://calclume.com/`
    - `https://calclume.com/calculators/statistics/mean-absolute-deviation/`
    - `https://calclume.com/robots.txt`
    - `https://calclume.com/sitemap.xml`
    - `https://calclume.com/favicon.ico`

## What not to do

- Do not deploy automatically from this repository without explicit authorization
- Do not paste Search Console verification tokens into the repo until the owner provides the real value
- Do not enable analytics, ads, or forms as part of soft launch
- Do not upload `Docs/`, `__tests__/`, or `node_modules/` as the public site

## Rollback

Keep the previous `out/` archive. To roll back, replace the document-root files with the prior export.
