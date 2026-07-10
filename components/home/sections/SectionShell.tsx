import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionShellVariant =
  | "centered"
  | "standard"
  | "headingless"
  | "split-media";

type SectionShellProps = {
  variant?: SectionShellVariant;
  intro?: boolean;
  className?: string;
  children: ReactNode;
};

const VARIANT_CLASS: Record<SectionShellVariant, string> = {
  centered: "items-center text-center",
  standard: "items-stretch",
  headingless: "items-stretch",
  "split-media": "items-stretch",
};

export function SectionShell({
  variant = "standard",
  intro = false,
  className,
  children,
}: SectionShellProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full flex-col",
        VARIANT_CLASS[variant],
        intro && "section-intro",
        className,
      )}
    >
      {children}
    </div>
  );
}
