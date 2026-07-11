"use client";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Header } from "@/components/layout/Header";
import { useIsClient } from "@/hooks/useIsClient";
import { cn } from "@/lib/cn";

type SiteShellProps = {
  children: ReactNode;
  className?: string;
};

function SiteShellRails() {
  const mounted = useIsClient();

  if (!mounted) return null;

  return createPortal(
    <div
      aria-hidden
      className="site-shell-rails site-shell-rails--viewport-pinned pointer-events-none"
    >
      <span className="site-shell-rail site-shell-rail--top" />
      <span className="site-shell-rail site-shell-rail--right" />
      <span className="site-shell-rail site-shell-rail--bottom" />
      <span className="site-shell-rail site-shell-rail--left" />
    </div>,
    document.body,
  );
}

/** Outermost page frame: centered vector rails with margin on all sides. */
export function SiteShell({ children, className }: SiteShellProps) {
  return (
    <div className="site-shell-gutter site-shell-gutter--fixed-horizontal-rails relative">
      <SiteShellRails />
      <Header />
      <div className={cn("site-shell relative min-h-full", className)}>
        {children}
      </div>
    </div>
  );
}
