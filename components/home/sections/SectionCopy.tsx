import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionCopyProps = {
  headline: string;
  subhead?: string;
  className?: string;
  headlineClassName?: string;
  children?: ReactNode;
};

export function SectionCopy({
  headline,
  subhead,
  className,
  headlineClassName,
  children,
}: SectionCopyProps) {
  return (
    <div className={cn("section-copy max-w-[42rem]", className)}>
      <h2
        className={cn(
          "text-h2 max-w-[42rem] leading-[1.3] text-primary",
          headlineClassName,
        )}
      >
        {headline}
      </h2>
      {subhead ? (
        <p className="text-subhead leading-normal md:leading-[1.5]">
          {subhead}
        </p>
      ) : null}
      {children}
    </div>
  );
}
