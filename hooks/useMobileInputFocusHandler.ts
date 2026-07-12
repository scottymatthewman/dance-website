"use client";

import { useCallback, useRef } from "react";
import { isTouchLikeDevice } from "@/lib/device/touch";

const KEYBOARD_OPEN_RATIO = 0.85;
const SETTLE_DELAYS_MS = [0, 50, 150, 350, 550, 700];

let activeCleanup: (() => void) | null = null;

function isKeyboardOpen() {
  const vv = window.visualViewport;
  if (!vv) return false;
  return vv.height < window.innerHeight * KEYBOARD_OPEN_RATIO;
}

function getHeaderScrollPadding() {
  const parsed = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
  return Number.isFinite(parsed) ? parsed : 0;
}

function settleInputInView(element: HTMLElement) {
  const vv = window.visualViewport;
  if (!vv) return;

  const rect = element.getBoundingClientRect();
  const topPadding = getHeaderScrollPadding() + 12;
  const bottomPadding = 12;
  const visibleBottom = vv.height;

  if (rect.top < topPadding) {
    window.scrollTo({
      top: window.scrollY + rect.top - topPadding,
      behavior: "instant",
    });
    return;
  }

  if (rect.bottom > visibleBottom - bottomPadding) {
    window.scrollTo({
      top: window.scrollY + rect.bottom - visibleBottom + bottomPadding,
      behavior: "instant",
    });
  }
}

function scheduleColdFocusSettle(element: HTMLElement) {
  activeCleanup?.();

  const vv = window.visualViewport;
  if (!vv) return;

  let cancelled = false;
  const timers: number[] = [];

  const settle = () => {
    if (cancelled) return;
    settleInputInView(element);
  };

  const onResize = () => {
    requestAnimationFrame(settle);
  };

  vv.addEventListener("resize", onResize);

  for (const delay of SETTLE_DELAYS_MS) {
    timers.push(window.setTimeout(settle, delay));
  }

  const cleanup = () => {
    cancelled = true;
    vv.removeEventListener("resize", onResize);
    for (const id of timers) window.clearTimeout(id);
    if (activeCleanup === cleanup) activeCleanup = null;
  };

  activeCleanup = cleanup;
}

/**
 * On mobile, fixes over-scroll when the keyboard opens on a cold focus
 * (no input focused yet). Warm focus (keyboard already open) is left alone.
 */
export function useMobileInputFocusHandler() {
  const touchScrollYRef = useRef<number | null>(null);

  const onTouchStart = useCallback(() => {
    if (!isTouchLikeDevice()) return;
    touchScrollYRef.current = window.scrollY;
  }, []);

  const onFocus = useCallback((event: React.FocusEvent<HTMLElement>) => {
    if (!isTouchLikeDevice()) return;
    if (isKeyboardOpen()) {
      touchScrollYRef.current = null;
      return;
    }

    const element = event.currentTarget;
    const savedScrollY = touchScrollYRef.current;
    touchScrollYRef.current = null;

    const beginSettle = () => scheduleColdFocusSettle(element);

    // Browser scrolls aggressively on first focus before the keyboard opens.
    // Revert to the pre-tap position, then reposition once the keyboard is up.
    if (savedScrollY !== null) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScrollY, behavior: "instant" });
        requestAnimationFrame(beginSettle);
      });
      return;
    }

    beginSettle();
  }, []);

  return { onFocus, onTouchStart };
}
