"use client";

import { AgentFlowCard } from "@/components/home/differentiator/AgentFlowCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getAgentFlowConfig } from "@/lib/home/differentiator-agent-flow/flows";
import {
  getAgentFlowLoopDurationMs,
  getAgentFlowState,
} from "@/lib/home/differentiator-agent-flow/timeline";
import { useEffect, useRef, useState } from "react";

type AgentFlowMockupProps = {
  flowIndex: number;
  className?: string;
};

export function AgentFlowMockup({ flowIndex, className }: AgentFlowMockupProps) {
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

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
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
