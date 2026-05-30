import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared horizontal inset for framed headings and cell content. */
export const SITE_FRAME_INSET_X = "px-6 md:px-10 lg:px-12";

type SiteFrameRootProps = {
  children: ReactNode;
  className?: string;
};

/** Continuous side rails shared across all framed sections. */
export function SiteFrameRoot({ children, className }: SiteFrameRootProps) {
  return (
    <div
      className={cn(
        "site-frame-stack relative mx-auto w-full max-w-content border-x border-border-subtle",
        className,
      )}
    >
      {children}
    </div>
  );
}

type SiteFrameSectionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Top horizontal rule */
  ruled?: boolean;
  /** Bottom horizontal rule */
  ruledBottom?: boolean;
};

export function SiteFrameSection({
  as: Component = "div",
  children,
  className,
  ruled = false,
  ruledBottom = false,
}: SiteFrameSectionProps) {
  return (
    <Component
      className={cn(
        ruled && "border-t border-border-subtle",
        ruledBottom && "border-b border-border-subtle",
        className,
      )}
    >
      {children}
    </Component>
  );
}

type SiteFrameInsetProps = {
  children: ReactNode;
  className?: string;
};

export function SiteFrameInset({ children, className }: SiteFrameInsetProps) {
  return (
    <div className={cn(SITE_FRAME_INSET_X, "pb-5", className)}>{children}</div>
  );
}

type SiteFrameCellProps = {
  children: ReactNode;
  className?: string;
};

export function SiteFrameCell({ children, className }: SiteFrameCellProps) {
  return (
    <div
      className={cn(
        SITE_FRAME_INSET_X,
        "py-8 md:py-10 lg:py-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
