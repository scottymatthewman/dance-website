"use client";

import { useEffect, useState } from "react";
import { easeOutCubic } from "@/lib/motion/easing";

type EasingMode = "linear" | "easeOut";

type UseTimedRevealProgressOptions = {
  durationMs?: number;
  delayMs?: number;
  easing?: EasingMode;
  enabled?: boolean;
};

export function useTimedRevealProgress({
  durationMs = 3200,
  delayMs = 200,
  easing = "easeOut",
  enabled = true,
}: UseTimedRevealProgressOptions = {}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let raf = 0;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime - delayMs;
      const linear = elapsed <= 0 ? 0 : Math.min(1, elapsed / durationMs);
      const next = easing === "linear" ? linear : easeOutCubic(linear);
      setProgress(next);
      if (linear < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, delayMs, easing, enabled]);

  return enabled ? progress : 0;
}
