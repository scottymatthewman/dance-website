"use client";

import { easeOutCubic } from "@/lib/motion/easing";
import { useEffect, useRef, useState, type RefObject } from "react";

type UseViewportCenterTimedRevealOptions = {
  delayMs?: number;
  durationMs?: number;
  enabled?: boolean;
};

function isElementCenterInViewport(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const center = rect.top + rect.height / 2;
  return center >= 0 && center <= window.innerHeight;
}

export function useViewportCenterTimedReveal({
  delayMs = 1500,
  durationMs = 3200,
  enabled = true,
}: UseViewportCenterTimedRevealOptions = {}): {
  ref: RefObject<HTMLDivElement | null>;
  progress: number;
} {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setProgress(0);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let delayTimer = 0;
    let raf = 0;

    const startAnimation = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;

      delayTimer = window.setTimeout(() => {
        let startTime: number | null = null;

        const tick = (now: number) => {
          if (startTime === null) startTime = now;
          const elapsed = now - startTime;
          const linear = Math.min(1, elapsed / durationMs);
          setProgress(easeOutCubic(linear));
          if (linear < 1) {
            raf = window.requestAnimationFrame(tick);
          }
        };

        raf = window.requestAnimationFrame(tick);
      }, delayMs);
    };

    const checkCenter = () => {
      if (triggeredRef.current) return;
      if (isElementCenterInViewport(node)) {
        startAnimation();
      }
    };

    checkCenter();

    const observer = new IntersectionObserver(() => checkCenter(), {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    observer.observe(node);

    window.addEventListener("scroll", checkCenter, { passive: true });
    window.addEventListener("resize", checkCenter, { passive: true });
    window.visualViewport?.addEventListener("resize", checkCenter);

    return () => {
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", checkCenter);
      window.removeEventListener("resize", checkCenter);
      window.visualViewport?.removeEventListener("resize", checkCenter);
    };
  }, [delayMs, durationMs, enabled]);

  return { ref, progress: enabled ? progress : 0 };
}
