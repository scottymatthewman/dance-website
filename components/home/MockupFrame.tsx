"use client";

import type { ReactNode } from "react";
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
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-[6px] media-inner-stroke",
        bleedBottom
          ? "absolute top-0 left-1/2 h-[calc(100%+12rem)] w-full max-w-content shrink-0 -translate-x-1/2 md:h-[calc(100%+20rem)]"
          : "h-[min(43.75rem,70dvh)]",
        className,
        innerClassName,
      )}
    >
      {children}
    </div>
  );
}
