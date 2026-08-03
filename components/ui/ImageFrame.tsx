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
  /** Served below `mobileBreakpoint` when set. Uses a native `<picture>` to avoid WebP transcoding. */
  mobileSrc?: string;
  mobileBreakpoint?: string;
  activeIndex?: number;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  unoptimized?: boolean;
  preset?: ImageFramePreset;
  className?: string;
  innerClassName?: string;
  children?: ReactNode;
};

export function ImageFrame({
  src,
  mobileSrc,
  mobileBreakpoint = "(min-width: 1024px)",
  activeIndex = 0,
  alt = "",
  width = 1444,
  height = 676,
  priority = false,
  sizes,
  unoptimized = false,
  preset,
  className,
  innerClassName,
  children,
}: ImageFrameProps) {
  const presetStyles = preset ? IMAGE_FRAME_PRESETS[preset] : null;
  const sources = Array.isArray(src) ? src : [src];
  const resolvedSizes = sizes ?? presetStyles?.sizes ?? "100vw";
  const desktopSrc = sources[activeIndex] ?? sources[0];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[6px] media-inner-stroke",
        presetStyles?.className,
        className,
        innerClassName,
      )}
    >
      <div className="absolute inset-0">
        {mobileSrc ? (
          <picture className="block size-full">
            <source media={mobileBreakpoint} srcSet={desktopSrc} />
            <img
              src={mobileSrc}
              alt={alt}
              width={width}
              height={height}
              aria-hidden={alt === "" ? true : undefined}
              decoding={priority ? "sync" : "async"}
              fetchPriority={priority ? "high" : undefined}
              draggable={false}
              className="size-full object-cover"
            />
          </picture>
        ) : (
          sources.map((imageSrc, index) => (
            <Image
              key={imageSrc}
              src={imageSrc}
              alt={alt}
              aria-hidden={alt === "" ? true : undefined}
              fill
              priority={priority && index === 0}
              sizes={resolvedSizes}
              unoptimized={unoptimized || preset === "flow"}
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
          ))
        )}
      </div>
      {children}
    </div>
  );
}
