"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { FullDanceLogo } from "@/components/ui/FullDanceLogo";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/cn";
import { scrollToHomeSection, scrollToTop } from "@/lib/scroll-to-section";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { NAV_SECTIONS } from "@/lib/home/sections";

const NAV_LINKS = [
  {
    sectionIndex: NAV_SECTIONS.features,
    label: COPY.nav.features,
  },
  {
    sectionIndex: NAV_SECTIONS.useCases,
    label: COPY.nav.useCases,
  },
] as const;

function NavSectionLink({
  sectionIndex,
  children,
  className,
  onNavigate,
}: {
  sectionIndex: number;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      className={cn(
        "rounded-sm px-3 py-1 text-sm font-medium leading-normal text-secondary transition-[color,background-color] hover:bg-hover-overlay hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-section",
        className,
      )}
      onClick={() => {
        scrollToHomeSection(sectionIndex, { smooth: !reducedMotion });
        onNavigate?.();
      }}
    >
      {children}
    </button>
  );
}

function LogoLink({
  children,
  className,
  onNavigate,
}: {
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  return (
    <Link
      href="/"
      className={className}
      onClick={(event) => {
        if (pathname !== "/") return;

        event.preventDefault();
        scrollToTop({ smooth: !reducedMotion });
        onNavigate?.();
      }}
    >
      {children}
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      className="size-5 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {open ? (
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.75"
        />
      ) : (
        <>
          <path d="M5 7H19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
          <path d="M5 12H19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
          <path d="M5 17H19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
        </>
      )}
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }

    function handlePointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  return (
    <header className="header--in-shell-margin pointer-events-none fixed top-0 z-50 flex h-auto w-auto justify-stretch">
      <div ref={headerRef} className="relative h-full w-full">
        <div className="header-bar pointer-events-auto flex h-full w-full items-center justify-between gap-2 border-0 bg-transparent p-1 shadow-none backdrop-blur-none md:gap-1">
          <LogoLink
            className={cn(
              "flex items-center gap-2 rounded-sm px-0 py-0 text-xs font-medium tracking-tight text-primary transition-opacity hover:opacity-80 md:mr-2 md:text-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-section",
            )}
            onNavigate={closeMenu}
          >
            <FullDanceLogo />
          </LogoLink>

          <div className="hidden items-center gap-1 md:flex">
            <nav
              aria-label="Primary"
              className="flex items-center gap-0.5 px-0.5"
            >
              {NAV_LINKS.map((link) => (
                <NavSectionLink
                  key={link.sectionIndex}
                  sectionIndex={link.sectionIndex}
                  className="py-1"
                >
                  {link.label}
                </NavSectionLink>
              ))}
            </nav>
            <CtaButton
              size="sm"
              className="rounded-sm px-2.5 py-1 text-xs md:px-3 md:py-1.5 md:text-sm"
            >
              {COPY.nav.cta}
            </CtaButton>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              aria-controls={menuId}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-6 items-center justify-center rounded-sm text-primary transition-colors hover:bg-hover-overlay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-section md:size-7"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div
            id={menuId}
            className="pointer-events-auto absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-lg border border-border-subtle bg-section/95 p-2 shadow-[var(--shadow-menu)] backdrop-blur-md md:hidden"
          >
            <nav aria-label="Mobile primary" className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavSectionLink
                  key={link.sectionIndex}
                  sectionIndex={link.sectionIndex}
                  className="px-3 py-2.5 text-left text-base"
                  onNavigate={closeMenu}
                >
                  {link.label}
                </NavSectionLink>
              ))}
              <CtaButton
                size="sm"
                className="mt-1 w-full rounded-sm"
                onClick={closeMenu}
              >
                {COPY.nav.cta}
              </CtaButton>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
