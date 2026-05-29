import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-stack-sm",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className="text-h2 leading-[1.3] text-primary">
        {title}
      </div>
      {description ? (
        <p
          className={cn(
            "text-body-lg max-w-prose leading-normal text-secondary",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
