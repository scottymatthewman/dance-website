"use client";

import {
  CollaborateMockupScaledFrame,
  type CollaborateMockupBackground,
} from "@/components/home/collaborate/CollaborateMockupCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DESIGN_WIDTH } from "@/lib/home/collaborate-mockup/constants";
import {
  getCollaborateMockupLoopDurationMs,
  getCollaborateMockupState,
} from "@/lib/home/collaborate-mockup/timeline";
import { useEffect, useRef, useState, type RefObject } from "react";

const EDGE_PADDING = 32;

function useCollaborateMockupScale(
  containerRef: RefObject<HTMLDivElement | null>,
  deps: unknown[],
) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateScale = () => {
      const { width: containerWidth } = container.getBoundingClientRect();
      const availableWidth = Math.max(0, containerWidth - EDGE_PADDING * 2);
      setScale(Math.min(availableWidth / DESIGN_WIDTH, 1));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, deps);

  return scale;
}

type CollaborateMockupProps = {
  isPlaying?: boolean;
  background?: CollaborateMockupBackground;
  className?: string;
};

export function CollaborateMockup({
  isPlaying = true,
  background = "fill",
  className,
}: CollaborateMockupProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);

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

  const state = getCollaborateMockupState(
    reducedMotion ? getCollaborateMockupLoopDurationMs() : elapsedMs,
    !reducedMotion,
  );

  const scale = useCollaborateMockupScale(containerRef, [isPlaying]);

  return (
    <CollaborateMockupScaledFrame
      animateLayout={!reducedMotion}
      background={background}
      containerRef={containerRef}
      scale={scale}
      state={state}
      className={className}
    />
  );
}
