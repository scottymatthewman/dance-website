"use client";

import {
  DefineMockupScaledFrame,
  type DefineMockupBackground,
} from "@/components/home/define/DefineMockupCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getDefineMockupLoopDurationMs,
  getDefineMockupState,
} from "@/lib/home/define-mockup/timeline";
import { useEffect, useRef, useState } from "react";

type DefineMockupProps = {
  isPlaying?: boolean;
  background?: DefineMockupBackground;
  className?: string;
};

export function DefineMockup({
  isPlaying = true,
  background = "fill",
  className,
}: DefineMockupProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setElapsedMs(getDefineMockupLoopDurationMs());
      return;
    }

    if (!isPlaying) {
      return;
    }

    startRef.current = performance.now();
    setElapsedMs(0);

    let frame = 0;
    const tick = (now: number) => {
      if (startRef.current === null) {
        return;
      }

      setElapsedMs(now - startRef.current);
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isPlaying, reducedMotion]);

  const state = getDefineMockupState(
    reducedMotion ? getDefineMockupLoopDurationMs() : elapsedMs,
    !reducedMotion,
  );

  return (
    <DefineMockupScaledFrame
      background={background}
      className={className}
      containerRef={containerRef}
      state={state}
    />
  );
}
