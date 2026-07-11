import { cn } from "@/lib/cn";
import type { ReactNode, Ref } from "react";

type ContentRailWidth = "content" | "headline" | "narrow" | "prose";
type ContentRailAlign = "left" | "center";

const WIDTH_CLASS: Record<ContentRailWidth, string> = {
  content: "max-w-content",
  headline: "max-w-headline",
  narrow: "max-w-narrow",
  prose: "max-w-prose",
};

type ContentRailProps = {
  width?: ContentRailWidth;
  align?: ContentRailAlign;
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
};

export function ContentRail({
  width = "content",
  align = "left",
  className,
  children,
  ref,
}: ContentRailProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        WIDTH_CLASS[width],
        align === "center" && "mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}
