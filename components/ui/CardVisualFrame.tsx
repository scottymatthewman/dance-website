import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardVisualFrameProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

/** Shared card shell for use-case visuals and product mockups. */
export function CardVisualFrame({
  children,
  className,
  innerClassName,
}: CardVisualFrameProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-subtle bg-card p-1.5",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-md border border-border-strong",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
