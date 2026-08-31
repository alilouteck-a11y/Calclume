import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { primaryNavRoutes } from "@/lib/routes";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <header className="border-b border-border bg-white">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="flex flex-col gap-0.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
          >
            <span className="text-lg font-bold tracking-tight text-ink">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs text-muted sm:block">
              {siteConfig.tagline}
            </span>
          </Link>
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
              {primaryNavRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-paper hover:text-lume-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
