"use client";

import { getViewportHeight, isTouchLikeDevice } from "@/lib/device/touch";
import { useEffect, useRef, useState } from "react";

const SCROLL_END_MS = 150;

/**
 * On touch devices, locks viewport height while the user is scrolling so
 * address-bar show/hide does not remap scroll distances mid-gesture.
 */
export function useStableViewportHeight() {
  const [height, setHeight] = useState(1);
  const [frozenHeight, setFrozenHeight] = useState<number | null>(null);
  const scrollEndTimerRef = useRef(0);
  const isFrozenRef = useRef(false);

  useEffect(() => {
    const touchLike = isTouchLikeDevice();

    const commitHeight = (next: number) => {
      setHeight(next);
    };

    const onScrollEnd = () => {
      isFrozenRef.current = false;
      setFrozenHeight(null);
      commitHeight(getViewportHeight());
    };

    const onScroll = () => {
      if (!touchLike) return;

      if (!isFrozenRef.current) {
        isFrozenRef.current = true;
        setFrozenHeight(getViewportHeight());
      }

      window.clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = window.setTimeout(onScrollEnd, SCROLL_END_MS);
    };

    const onResize = () => {
      if (touchLike && isFrozenRef.current) return;
      commitHeight(getViewportHeight());
    };

    commitHeight(getViewportHeight());
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(scrollEndTimerRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

  return {
    height: frozenHeight ?? height,
    isFrozen: frozenHeight !== null,
  };
}
