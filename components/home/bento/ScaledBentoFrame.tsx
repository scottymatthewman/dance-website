"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Enable overlay via ?mockup-overlay=1 or NEXT_PUBLIC_MOCKUP_OVERLAY=1 during iteration. */
export function useMockupOverlayEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fromEnv = process.env.NEXT_PUBLIC_MOCKUP_OVERLAY === "1";
    const fromQuery =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("mockup-overlay");
    setEnabled(fromEnv || fromQuery);
  }, []);

  return enabled;
}

type ScaledBentoFrameProps = {
  designWidth: number;
  designHeight: number;
  referenceSrc?: string;
  /** Force overlay on/off; when undefined, uses iteration toggle. */
  showReferenceOverlay?: boolean;
  className?: string;
  children: ReactNode;
};

export function ScaledBentoFrame({
  designWidth,
  designHeight,
  referenceSrc,
  showReferenceOverlay,
  className,
  children,
}: ScaledBentoFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayFromToggle = useMockupOverlayEnabled();
  const showOverlay =
    showReferenceOverlay ?? (overlayFromToggle && Boolean(referenceSrc));
  const [layout, setLayout] = useState({ scale: 1, x: 0, y: 0 });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateScale = () => {
      const { width, height } = element.getBoundingClientRect();
      const scale = Math.min(width / designWidth, height / designHeight);
      setLayout({
        scale,
        x: (width - designWidth * scale) / 2,
        y: (height - designHeight * scale) / 2,
      });
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(element);
    return () => observer.disconnect();
  }, [designWidth, designHeight]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "bento-mockup-surface relative h-full min-h-[8rem] w-full overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: designWidth,
          height: designHeight,
          transform: `translate(${layout.x}px, ${layout.y}px) scale(${layout.scale})`,
          transformOrigin: "0 0",
        }}
      >
        {children}
        {showOverlay && referenceSrc ? (
          <Image
            src={referenceSrc}
            alt=""
            aria-hidden
            fill
            className="pointer-events-none object-contain opacity-50"
            sizes={`${designWidth}px`}
            quality={100}
            unoptimized
          />
        ) : null}
      </div>
    </div>
  );
}
