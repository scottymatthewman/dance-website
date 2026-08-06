"use client";

import { AgentFlowCard } from "@/components/home/differentiator/AgentFlowCard";
import { DifferentiatorTimelineMockup } from "@/components/home/differentiator/DifferentiatorTimelineMockup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { getAgentFlowConfig } from "@/lib/home/differentiator-agent-flow/flows";
import {
  getAgentFlowLoopDurationMs,
  getAgentFlowState,
} from "@/lib/home/differentiator-agent-flow/timeline";
import { useEffect, useRef, useState } from "react";

type AgentFlowMockupProps = {
  flowIndex: number;
  className?: string;
  fullBleed?: boolean;
};

export function AgentFlowMockup({
  flowIndex,
  className,
  fullBleed = false,
}: AgentFlowMockupProps) {
  const reducedMotion = useReducedMotion();
  const flow = getAgentFlowConfig(flowIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (flow.id === "timeline") {
      return;
    }

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
  }, [flow.id, isPlaying, reducedMotion]);

  if (flow.id === "timeline") {
    return (
      <div ref={containerRef} className={cn("h-full", className)}>
        <DifferentiatorTimelineMockup fullBleed={fullBleed} isPlaying={isPlaying} />
      </div>
    );
  }

  const state = getAgentFlowState(
    flow,
    reducedMotion ? getAgentFlowLoopDurationMs() - 1 : elapsedMs,
    !reducedMotion,
  );

  return (
    <div ref={containerRef} className={className}>
      <AgentFlowCard flow={flow} state={state} animate={!reducedMotion} />
    </div>
  );
}
