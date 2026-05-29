import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

const sizeClasses = {
  default: "max-w-content",
  narrow: "max-w-narrow",
  prose: "max-w-prose",
  full: "max-w-none",
} as const;

export type ContentContainerSize = keyof typeof sizeClasses;

type ContentContainerProps = {
  as?: ElementType;
  size?: ContentContainerSize;
  className?: string;
  children: ReactNode;
};

export function ContentContainer({
  as: Component = "div",
  size = "default",
  className,
  children,
}: ContentContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-gutter",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
