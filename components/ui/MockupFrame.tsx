"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MockupFrameProps = {
  variant?: "hero" | "feature";
  title?: string;
  className?: string;
  children?: ReactNode;
};

const variantClasses = {
  hero: "aspect-[1201/710] rounded-xl bg-page",
  feature: "min-h-[28rem] rounded-l-lg bg-mockup lg:min-h-[34.9375rem]",
} as const;

export function MockupFrame({
  variant = "hero",
  title,
  className,
  children,
}: MockupFrameProps) {
  return (
    <div
      className={cn(
        "mockup-hover relative overflow-hidden border border-border-subtle",
        variantClasses[variant],
        className,
      )}
    >
      {title ? (
        <div className="absolute left-4 top-4 z-10 rounded-full border border-border-subtle bg-card-inner/80 px-3 py-1 text-sm text-secondary backdrop-blur-sm">
          {title}
        </div>
      ) : null}
      {children ?? (
        <div className="flex h-full min-h-[inherit] items-center justify-center p-8">
          <div className="rounded-lg border border-dashed border-border-strong px-6 py-4 text-center text-sm text-muted">
            Product preview placeholder
          </div>
        </div>
      )}
    </div>
  );
}
