import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BentoMockupTagProps = {
  icon?: ReactNode;
  iconSrc?: string;
  label: string;
  className?: string;
};

export function BentoMockupTag({
  icon,
  iconSrc,
  label,
  className,
}: BentoMockupTagProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[8px] border border-[#dea8ff]/80 bg-[#f7e6ff]/70 py-1 pl-2 pr-2.5 backdrop-blur-sm",
        className,
      )}
    >
      {icon ??
        (iconSrc ? (
          <img src={iconSrc} alt="" className="size-4 shrink-0" draggable={false} />
        ) : null)}
      <span className="whitespace-nowrap text-xs font-medium leading-[1.4] tracking-[-0.24px] text-[#360057]">
        {label}
      </span>
    </div>
  );
}
