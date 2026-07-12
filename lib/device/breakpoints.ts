/** Tailwind `md` — shell side margins and scroll-driven homepage layout start here. */
export const MD_MIN_WIDTH_REM = 48;

export const DESKTOP_LAYOUT_MEDIA_QUERY = `(min-width: ${MD_MIN_WIDTH_REM}rem)`;

/** Below `md`: native document scroll, carousels, and viewport-triggered reveals. */
export const COMPACT_SCROLL_MEDIA_QUERY = `(max-width: ${MD_MIN_WIDTH_REM - 0.0625}rem)`;
