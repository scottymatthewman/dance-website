"use client";

import { useCallback, useRef } from "react";
import { isTouchLikeDevice } from "@/lib/device/touch";

const KEYBOARD_OPEN_RATIO = 0.85;
const SETTLE_DELAYS_MS = [50, 150, 350, 550];
const VIEWPORT_EDGE_PADDING = 16;
/** Fallback when --mobile-input-scroll-inset is unavailable. */
const MOBILE_INPUT_TOP_INSET_FALLBACK = 120;

let activeCleanup: (() => void) | null = null;

function getMobileInputTopInset() {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--mobile-input-scroll-inset")
    .trim();
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : MOBILE_INPUT_TOP_INSET_FALLBACK;
}

function isKeyboardOpen() {
  const vv = window.visualViewport;
  if (!vv) return false;
  return vv.height < window.innerHeight * KEYBOARD_OPEN_RATIO;
}

function getVisibleBounds() {
  const vv = window.visualViewport;
  if (!vv) {
    return { top: 0, bottom: window.innerHeight };
  }

  return {
    top: vv.offsetTop,
    bottom: vv.offsetTop + vv.height,
  };
}

function settleInputInView(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const { top: visibleTop, bottom: visibleBottom } = getVisibleBounds();
  const minTop = visibleTop + getMobileInputTopInset();
  const maxBottom = visibleBottom - VIEWPORT_EDGE_PADDING;

  if (rect.top < minTop) {
    window.scrollTo({
      top: window.scrollY + rect.top - minTop,
      behavior: "instant",
    });
    return;
  }

  if (rect.bottom > maxBottom) {
    window.scrollTo({
      top: window.scrollY + rect.bottom - maxBottom,
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

  requestAnimationFrame(settle);

  const cleanup = () => {
    cancelled = true;
    vv.removeEventListener("resize", onResize);
    for (const id of timers) window.clearTimeout(id);
    if (activeCleanup === cleanup) activeCleanup = null;
  };

  activeCleanup = cleanup;
  timers.push(window.setTimeout(cleanup, 700));
}

/**
 * On mobile, prevents the cold-focus keyboard jump and keeps inputs below the
 * fixed header. Warm focus (keyboard already open) is left to native behavior.
 */
export function useMobileInputFocusHandler() {
  const coldFocusRef = useRef(false);

  const onTouchStart = useCallback(() => {
    if (!isTouchLikeDevice()) return;
    coldFocusRef.current = !isKeyboardOpen();
  }, []);

  const onTouchEnd = useCallback((event: React.TouchEvent<HTMLElement>) => {
    if (!isTouchLikeDevice() || !coldFocusRef.current) return;

    event.preventDefault();
    const element = event.currentTarget;
    element.focus({ preventScroll: true });
    scheduleColdFocusSettle(element);
    coldFocusRef.current = false;
  }, []);

  const onFocus = useCallback((event: React.FocusEvent<HTMLElement>) => {
    if (!isTouchLikeDevice()) return;
    if (isKeyboardOpen()) return;

    // Keyboard/assistive-tech focus without a preceding touch tap.
    if (coldFocusRef.current) return;

    scheduleColdFocusSettle(event.currentTarget);
  }, []);

  return { onFocus, onTouchStart, onTouchEnd };
}
