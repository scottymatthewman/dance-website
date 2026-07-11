/** Tailwind `lg` — desktop scroll-driven layouts start here. */
export const LG_MIN_WIDTH_REM = 64;

export const DESKTOP_LAYOUT_MEDIA_QUERY = `(min-width: ${LG_MIN_WIDTH_REM}rem)`;

/** Below `lg`: normal scroll, carousels, and viewport-triggered reveals. */
export const COMPACT_SCROLL_MEDIA_QUERY = `(max-width: ${LG_MIN_WIDTH_REM - 0.0625}rem)`;
