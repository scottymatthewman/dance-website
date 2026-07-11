"use client";

import { applyScrollTrackFrame } from "@/lib/home/scroll-frame";
import {
  getScrollSpacerHeight,
  getScrollTrackState,
  type ScrollTrackState,
  type TrackScrollLayout,
} from "@/lib/home/scroll-transition";
import { getViewportHeight } from "@/lib/device/touch";
import { useEffect, useRef, useState, type RefObject } from "react";

const DEFAULT_LAYOUT: TrackScrollLayout = {
  frameHeightPx: 800,
  trackHeightPx: 4000,
  flowStartHoldPx: 0,
  features: null,
  statement: null,
};

type ScrollTrackFrameRefs = {
  trackRef: RefObject<HTMLElement | null>;
  frameRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
};

export function useScrollTrackState(
  layout: TrackScrollLayout,
  frameRefs?: ScrollTrackFrameRefs,
) {
  const [state, setState] = useState<ScrollTrackState>(() =>
    getScrollTrackState(0, 1, DEFAULT_LAYOUT),
  );
  const layoutRef = useRef(layout);
  const frameRefsRef = useRef(frameRefs);

  layoutRef.current = layout;
  frameRefsRef.current = frameRefs;

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      frameId = 0;
      const viewportHeight = getViewportHeight();
      const nextState = getScrollTrackState(
        window.scrollY,
        viewportHeight,
        layoutRef.current,
      );

      const refs = frameRefsRef.current;
      if (refs) {
        applyScrollTrackFrame(nextState, layoutRef.current, refs);
      }

      setState(nextState);
    };

    const scheduleUpdate = () => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.visualViewport?.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleUpdate);
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
    const update = () => setHeight(getViewportHeight());
    update();
    window.addEventListener("resize", update, { passive: true });
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return height;
}
