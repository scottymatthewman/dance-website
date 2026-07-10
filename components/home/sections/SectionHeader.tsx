import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionHeaderAlign = "left" | "center";
type SectionHeaderLayout = "stack" | "split";

type SectionHeaderProps = {
  headline: ReactNode;
  subhead?: string;
  eyebrow?: string;
  align?: SectionHeaderAlign;
  layout?: SectionHeaderLayout;
  action?: ReactNode;
  className?: string;
  headlineClassName?: string;
  children?: ReactNode;
};

export function SectionHeader({
  headline,
  subhead,
  eyebrow,
  align = "left",
  layout = "stack",
  action,
  className,
  headlineClassName,
  children,
}: SectionHeaderProps) {
  const isCentered = align === "center";

  const headlineElement =
    typeof headline === "string" ? (
      <h2
        className={cn(
          "text-h2 max-w-headline leading-[1.3] text-primary",
          isCentered && "w-full",
          headlineClassName,
        )}
      >
        {headline}
      </h2>
    ) : (
      headline
    );

  const copyBlock = (
    <div
      className={cn(
        "section-copy max-w-headline",
        isCentered && "mx-auto items-center text-center",
        layout === "split" && action && "min-w-0 flex-1",
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-medium leading-normal text-secondary">
          {eyebrow}
        </p>
      ) : null}
      {headlineElement}
      {subhead ? (
        <p className="text-subhead leading-normal md:leading-[1.5]">
          {subhead}
        </p>
      ) : null}
      {children}
    </div>
  );

  if (layout === "split" && action) {
    return (
      <div
        className={cn(
          "flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-4",
          className,
        )}
      >
        {copyBlock}
        <div className="w-fit shrink-0">{action}</div>
      </div>
    );
  }

  return <div className={cn("w-full", className)}>{copyBlock}</div>;
}

/** @deprecated Use SectionHeader instead. */
export function SectionCopy({
  headline,
  subhead,
  className,
  headlineClassName,
  children,
}: {
  headline: string;
  subhead?: string;
  className?: string;
  headlineClassName?: string;
  children?: ReactNode;
}) {
  return (
    <SectionHeader
      headline={headline}
      subhead={subhead}
      className={className}
      headlineClassName={headlineClassName}
    >
      {children}
    </SectionHeader>
  );
}
