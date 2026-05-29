import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BentoCardProps = {
  title: string;
  subtitle: string;
  visual: ReactNode;
  size?: "large" | "medium";
  className?: string;
  titleClassName?: string;
};

export function BentoCard({
  title,
  subtitle,
  visual,
  size = "medium",
  className,
  titleClassName,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-card-inner text-left transition-colors duration-200 hover:border-border-strong",
        size === "large"
          ? "min-h-[29.25rem] max-md:aspect-[343/386] max-lg:aspect-[421/612] lg:min-h-[38.25rem]"
          : "min-h-[22.5rem] max-md:aspect-[343/386] max-lg:aspect-[421/612] lg:min-h-[38.25rem]",
        className,
      )}
    >
      <div className="relative z-10 py-8 pl-6 pr-6 lg:pl-8">
        <h3
          className={cn(
            "max-w-[18.75rem] text-xl font-medium leading-snug text-primary lg:text-2xl",
            titleClassName,
          )}
        >
          {title}{" "}
          <span className="font-normal text-secondary">{subtitle}</span>
        </h3>
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        {visual}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-b from-transparent to-card-inner"
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-r from-transparent to-card-inner"
        />
      </div>
    </div>
  );
}
