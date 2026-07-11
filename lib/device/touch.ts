/** Coarse pointer without hover — phones/tablets in portrait, etc. */
export function isTouchLikeDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

/** Visible layout viewport; stable relative to browser chrome on mobile. */
export function getViewportHeight() {
  if (typeof window === "undefined") return 1;
  return window.visualViewport?.height ?? window.innerHeight;
}
