import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ImagePlaceholderProps = {
  label?: string;
  className?: string;
  children?: ReactNode;
};

export function ImagePlaceholder({
  label = "Image placeholder",
  className,
  children,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border-2 border-black/30 bg-card",
        className,
      )}
    >
      {children ?? (
        <div className="flex h-full min-h-[inherit] items-center justify-center p-6">
          <span className="text-center text-sm text-muted">{label}</span>
        </div>
      )}
    </div>
  );
}
