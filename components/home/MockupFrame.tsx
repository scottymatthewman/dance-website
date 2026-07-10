"use client";

import type { ReactNode } from "react";
import { CardVisualFrame } from "@/components/ui/CardVisualFrame";
import { cn } from "@/lib/cn";

type MockupFrameProps = {
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Fills a positioned parent and bleeds past its bottom edge (hero). */
  bleedBottom?: boolean;
};

export function MockupFrame({
  children,
  className,
  innerClassName,
  bleedBottom = false,
}: MockupFrameProps) {
  return (
    <CardVisualFrame
      className={cn(
        "flex w-full flex-col",
        bleedBottom
          ? "absolute top-0 left-1/2 h-[calc(100%+12rem)] w-full max-w-[1200px] shrink-0 -translate-x-1/2 md:h-[calc(100%+20rem)]"
          : "h-[min(43.75rem,70dvh)]",
        className,
      )}
      innerClassName={cn("min-h-0 flex-1", innerClassName)}
    >
      {children}
    </CardVisualFrame>
  );
}
