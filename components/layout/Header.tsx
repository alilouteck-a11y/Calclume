"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import {
  CalculatorSearch,
  focusHomeSearchInput,
} from "@/components/search/CalculatorSearch";
import { Container } from "@/components/ui/Container";
import { getBrowseNavigationLink } from "@/lib/calculator-catalog";
import { primaryNavRoutes } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import type { SearchableCalculator } from "@/lib/calculator-search-index";

type HeaderProps = {
  searchIndex: readonly SearchableCalculator[];
};

function normalizePath(path: string): string {
  if (path === "/") {
    return "/";
  }
  return path.endsWith("/") ? path : `${path}/`;
}

function isActiveRoute(activePath: string, href: string): boolean {
  const normalizedActive = normalizePath(activePath);
  const normalizedHref = normalizePath(href);

  if (normalizedHref === "/calculators/") {
    return normalizedActive.startsWith("/calculators");
  }

  return normalizedActive === normalizedHref;
}

export function Header({ searchIndex }: HeaderProps) {
  const pathname = usePathname() ?? "/";
  const activePath = normalizePath(pathname);
  const browseLink = getBrowseNavigationLink();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const searchDesktopRef = useRef<HTMLButtonElement>(null);
  const searchMobileRef = useRef<HTMLButtonElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  const focusSearchTrigger = () => {
    (searchDesktopRef.current ?? searchMobileRef.current)?.focus();
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!searchOpen || !isMobileViewport) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [searchOpen, isMobileViewport]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (searchPanelRef.current?.contains(target)) {
        return;
      }

      if (searchDesktopRef.current?.contains(target)) {
        return;
      }

      if (searchMobileRef.current?.contains(target)) {
        return;
      }

      setSearchOpen(false);
      focusSearchTrigger();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSearchOpen(false);
        focusSearchTrigger();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen]);

  const handleSearchToggle = () => {
    if (activePath === "/" && !isMobileViewport) {
      setSearchOpen(false);
      focusHomeSearchInput();
      return;
    }

    setSearchOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    menuTriggerRef.current?.focus();
  };

  const desktopLinks = [
    ...primaryNavRoutes,
    ...(browseLink ? [{ path: browseLink.href, label: browseLink.label }] : []),
  ];

  return (
    <>
      <header aria-label="Site" className="border-b border-border bg-white">
        <Container>
          <div className="flex min-h-16 items-center justify-between gap-3 py-3">
            <Link
              href="/"
              className="flex min-w-0 flex-col gap-0.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
            >
              <span className="text-lg font-bold tracking-tight text-ink">
                {siteConfig.name}
              </span>
              <span className="hidden text-xs text-muted sm:block">
                {siteConfig.tagline}
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              <nav aria-label="Primary">
                <ul className="flex flex-wrap items-center gap-1">
                  {desktopLinks.map((route) => {
                    const active = isActiveRoute(activePath, route.path);
                    return (
                      <li key={`${route.path}-${route.label}`}>
                        <Link
                          href={route.path}
                          aria-current={active ? "page" : undefined}
                          className={`inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal ${
                            active
                              ? "border-b-2 border-lume-teal font-semibold text-ink"
                              : "text-ink hover:bg-paper hover:text-lume-teal"
                          }`}
                        >
                          {route.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <button
                ref={searchDesktopRef}
                type="button"
                aria-label="Search calculators"
                aria-expanded={searchOpen}
                aria-controls="header-search-panel"
                onClick={handleSearchToggle}
                className="ml-1 inline-flex min-h-11 items-center rounded-md border border-border px-3 py-2 text-sm font-medium text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
              >
                Search
              </button>
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <button
                ref={searchMobileRef}
                type="button"
                aria-label="Search calculators"
                aria-expanded={searchOpen}
                aria-controls="header-search-panel"
                onClick={handleSearchToggle}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
              >
                Search
              </button>
              <button
                ref={menuTriggerRef}
                type="button"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
              >
                Menu
              </button>
            </div>
          </div>

          {searchOpen && (
            <div
              ref={searchPanelRef}
              id="header-search-panel"
              className={`pb-4 ${isMobileViewport ? "" : "relative"}`}
            >
              <CalculatorSearch
                searchIndex={searchIndex}
                variant="header"
                autoFocus
                onClose={() => {
                  setSearchOpen(false);
                  focusSearchTrigger();
                }}
              />
            </div>
          )}
        </Container>

        <noscript>
          <Container>
            <nav aria-label="Site" className="border-t border-border py-3 md:hidden">
              <ul className="space-y-2 text-sm">
                {desktopLinks.map((route) => (
                  <li key={`noscript-${route.path}`}>
                    <Link href={route.path} className="text-lume-teal underline">
                      {route.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/calculators/" className="text-lume-teal underline">
                    Browse calculators (search requires JavaScript)
                  </Link>
                </li>
              </ul>
            </nav>
          </Container>
        </noscript>
      </header>

      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        browseLink={browseLink}
        activePath={activePath}
      />
    </>
  );
}
