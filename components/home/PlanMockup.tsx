"use client";

import {
  PlanMockupScaledFrame,
  type PlanMockupBackground,
} from "@/components/home/plan/PlanMockupCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getPlanMockupLoopDurationMs,
  getPlanMockupState,
} from "@/lib/home/plan-mockup/timeline";
import { useEffect, useRef, useState } from "react";

type PlanMockupProps = {
  isPlaying?: boolean;
  background?: PlanMockupBackground;
  className?: string;
};

export function PlanMockup({
  isPlaying = true,
  background = "fill",
  className,
}: PlanMockupProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect();
      setContainerSize({ width, height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !isPlaying) {
      return;
    }

    startRef.current = performance.now();

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

  const viewportAspect =
    containerSize.width > 0 && containerSize.height > 0
      ? containerSize.width / containerSize.height
      : undefined;

  const state = getPlanMockupState(
    reducedMotion ? getPlanMockupLoopDurationMs() : elapsedMs,
    !reducedMotion,
    viewportAspect,
  );

  return (
    <PlanMockupScaledFrame
      background={background}
      className={className}
      containerRef={containerRef}
      containerSize={containerSize}
      state={state}
    />
  );
}
