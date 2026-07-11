"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MockupFrameProps = {
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Height follows child content (hero timeline mockup). */
  fitContent?: boolean;
};

export function MockupFrame({
  children,
  className,
  innerClassName,
  fitContent = false,
}: MockupFrameProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-[6px] media-inner-stroke",
        fitContent ? null : "h-[min(43.75rem,70dvh)]",
        className,
        innerClassName,
      )}
    >
      {children}
    </div>
  );
}
