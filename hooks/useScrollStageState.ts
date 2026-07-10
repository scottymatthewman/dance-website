"use client";

import { useEffect, useState } from "react";
import {
  getScrollSpacerHeight,
  getScrollTrackState,
  type ScrollTrackState,
  type TrackScrollLayout,
} from "@/lib/home/scroll-transition";

const DEFAULT_LAYOUT: TrackScrollLayout = {
  frameHeightPx: 800,
  trackHeightPx: 4000,
  flowStartHoldPx: 0,
  features: null,
  statement: null,
};

export function useScrollTrackState(layout: TrackScrollLayout): ScrollTrackState {
  const [state, setState] = useState<ScrollTrackState>(() =>
    getScrollTrackState(0, 1, DEFAULT_LAYOUT),
  );

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      frameId = 0;
      setState(
        getScrollTrackState(window.scrollY, window.innerHeight, layout),
      );
    };

    const scheduleUpdate = () => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [layout]);

  return state;
}

export function useScrollSpacerHeight(
  totalScrollHeight: number,
  viewportHeight: number,
) {
  const [shellMarginTop, setShellMarginTop] = useState(0);

  useEffect(() => {
    const read = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(
        "--shell-margin-top",
      );
      setShellMarginTop(parseFloat(raw) || 0);
    };

    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, []);

  return getScrollSpacerHeight(
    totalScrollHeight,
    viewportHeight,
    shellMarginTop,
  );
}

export function useViewportHeight() {
  const [height, setHeight] = useState(1);

  useEffect(() => {
    const update = () => setHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return height;
}
