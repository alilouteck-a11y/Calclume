"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { footerNavRoutes, primaryNavRoutes } from "@/lib/routes";

type MobileNavDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  browseLink: { label: string; href: string } | null;
  activePath: string;
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

export function MobileNavDrawer({
  isOpen,
  onClose,
  browseLink,
  activePath,
}: MobileNavDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      closeButtonRef.current?.blur();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const drawerLinks = [
    ...primaryNavRoutes.map((route) => ({
      href: route.path,
      label: route.label,
    })),
    ...(browseLink ? [browseLink] : []),
    ...footerNavRoutes
      .filter((route) => route.path === "/contact/")
      .map((route) => ({ href: route.path, label: route.label })),
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="presentation">
      <button
        type="button"
        aria-label="Close menu backdrop"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="absolute right-0 top-0 flex h-full w-full max-w-xs flex-col border-l border-border bg-white shadow-md"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-semibold text-ink">Menu</p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-3 text-sm font-medium text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
          >
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-1">
            {drawerLinks.map((link, index) => {
              const active = isActiveRoute(activePath, link.href);
              return (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onClose}
                    className={`flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal ${
                      active
                        ? "border-l-2 border-lume-teal bg-paper font-semibold text-ink"
                        : "text-ink hover:bg-paper"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
