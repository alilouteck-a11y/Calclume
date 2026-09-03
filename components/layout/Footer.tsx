import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getFooterNavRoutes } from "@/lib/routes";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const footerLinks = getFooterNavRoutes();

  return (
    <footer className="mt-auto border-t border-border bg-white">
      <Container className="py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-ink">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted">{siteConfig.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <p className="text-sm font-semibold text-ink">Site</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {footerLinks.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className="text-sm text-muted hover:text-lume-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-sm font-semibold text-ink">Contact</p>
            <p className="mt-3 text-sm text-muted">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-lume-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Calculations run locally
          in your browser; entered data is not transmitted or stored.
        </p>
      </Container>
    </footer>
  );
}
