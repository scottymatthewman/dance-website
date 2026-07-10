import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Matches PLAN_MOCKUP_ASPECT (1462÷784) — final plan timeline frame. */
const IMAGE_FRAME_PRESETS = {
  flow: {
    className: "aspect-[1462/784] w-full",
    sizes: "(min-width: 768px) 60vw, 100vw",
  },
} as const;

type ImageFramePreset = keyof typeof IMAGE_FRAME_PRESETS;

type ImageFrameProps = {
  src: string | readonly string[];
  activeIndex?: number;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  preset?: ImageFramePreset;
  className?: string;
  innerClassName?: string;
  children?: ReactNode;
};

export function ImageFrame({
  src,
  activeIndex = 0,
  alt = "",
  priority = false,
  sizes,
  preset,
  className,
  innerClassName,
  children,
}: ImageFrameProps) {
  const presetStyles = preset ? IMAGE_FRAME_PRESETS[preset] : null;
  const sources = Array.isArray(src) ? src : [src];
  const resolvedSizes = sizes ?? presetStyles?.sizes ?? "100vw";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[6px]",
        presetStyles?.className,
        className,
        innerClassName,
      )}
    >
      <div className="absolute inset-0">
        {sources.map((imageSrc, index) => (
          <Image
            key={imageSrc}
            src={imageSrc}
            alt={alt}
            aria-hidden={alt === ""}
            fill
            priority={priority && index === 0}
            sizes={resolvedSizes}
            className={cn(
              "object-cover",
              sources.length > 1 &&
                "transition-opacity duration-500 ease-out",
              sources.length > 1 && index === activeIndex
                ? "opacity-100"
                : sources.length > 1
                  ? "opacity-0"
                  : undefined,
            )}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
