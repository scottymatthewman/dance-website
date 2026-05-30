import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ProductSurfaceVisualProps = {
  backgroundSrc: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function ProductSurfaceVisual({
  backgroundSrc,
  children,
  className,
  contentClassName,
}: ProductSurfaceVisualProps) {
  return (
    <div
      className={cn(
        "relative h-[20rem] shrink-0 overflow-hidden border-t border-white/10 md:h-[22rem] lg:h-[24rem]",
        className,
      )}
    >
      <Image
        alt=""
        aria-hidden
        className="object-cover object-top"
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        src={backgroundSrc}
        unoptimized
      />
      {children ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-start justify-center",
            contentClassName,
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
