import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageSectionBackground = "section" | "page" | "transparent";
type PageSectionSpacing = "default" | "compact" | "hero";
type PageSectionVariant = "contained" | "bleed" | "full";

type PageSectionProps = {
  id?: string;
  variant?: PageSectionVariant;
  spacing?: PageSectionSpacing;
  background?: PageSectionBackground;
  className?: string;
  children: ReactNode;
};

const backgroundClasses: Record<PageSectionBackground, string> = {
  section: "bg-section",
  page: "bg-page",
  transparent: "bg-transparent",
};

const spacingClasses: Record<PageSectionSpacing, string> = {
  default: "py-section-responsive",
  compact: "py-section md:py-section-md",
  hero: "py-hero-responsive",
};

const variantClasses: Record<PageSectionVariant, string> = {
  contained: "",
  bleed: "overflow-hidden",
  full: "",
};

export function PageSection({
  id,
  variant = "contained",
  spacing = "default",
  background = "section",
  className,
  children,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        backgroundClasses[background],
        spacingClasses[spacing],
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </section>
  );
}
