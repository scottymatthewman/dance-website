"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const DEFAULT_COLORS = [
  "#000000",
  "#BADAE7",
  "#FE9B00",
  "#000000",
  "#CDC6D8",
] as const;

type LuminaGradientInstance = {
  dispose: () => void;
  setSpeed: (speed: number) => void;
};

type LuminaGradientInit = (config: {
  container: HTMLElement;
  colors: readonly string[];
  mode: string;
  noiseStrength?: number;
}) => LuminaGradientInstance;

declare global {
  interface Window {
    LuminaGradient?: {
      init: LuminaGradientInit;
    };
  }
}

type LuminaGradientBackgroundProps = {
  className?: string;
  colors?: readonly string[];
  mode?: string;
  noise?: number;
  speed?: number;
};

export function LuminaGradientBackground({
  className,
  colors = DEFAULT_COLORS,
  mode = "mesh",
  noise = 0.17,
  speed = 1,
}: LuminaGradientBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<LuminaGradientInstance | null>(null);

  const dispose = useCallback(() => {
    instanceRef.current?.dispose();
    instanceRef.current = null;
  }, []);

  const initGradient = useCallback(() => {
    if (reducedMotion || !containerRef.current || !window.LuminaGradient) {
      return;
    }

    dispose();
    const instance = window.LuminaGradient.init({
      container: containerRef.current,
      colors,
      mode,
      noiseStrength: noise,
    });
    instance.setSpeed(speed);
    instanceRef.current = instance;
  }, [colors, dispose, mode, noise, reducedMotion, speed]);

  useEffect(() => {
    if (window.LuminaGradient) {
      initGradient();
    }
    return dispose;
  }, [dispose, initGradient]);

  if (reducedMotion) {
    return (
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-[#000000] via-[#BADAE7]/35 to-[#FE9B00]/25",
          className,
        )}
      />
    );
  }

  return (
    <>
      <Script
        src="https://makegradient.com/embed.js"
        strategy="afterInteractive"
        onLoad={initGradient}
      />
      <div
        ref={containerRef}
        aria-hidden
        className={cn("absolute inset-0", className)}
      />
    </>
  );
}
