/** Below-md layout breakpoint (grid shell + edge bleed). Scaling uses hero-cover at all sizes. */
export const HERO_MOCKUP_COVER_QUERY = "(max-width: 47.9375rem)";

export type HeroMockupTier = "subSm" | "sm" | "md";

/** Figma frame widths used to scale placement offsets. */
export const HERO_MOCKUP_TIER_QUERY: Record<HeroMockupTier, string> = {
  subSm: "(max-width: 29.9375rem)",
  sm: "(min-width: 30rem) and (max-width: 47.9375rem)",
  md: "(min-width: 48rem) and (max-width: 63.9375rem)",
};

/**
 * Figma hero mockup container specs (Terrace-Projects).
 * 390 → 2049:2202 · 480 → 2057:1363 · 768 → 2057:1609
 *
 * `left` / `top` — inner mockup wrapper offset inside the clip container.
 * `panelWidth` / `panelHeight` — scaled app panel size in the Figma frame.
 */
export const HERO_MOCKUP_FIGMA: Record<
  HeroMockupTier,
  {
    frameWidth: number;
    left: number;
    top: number;
    panelWidth: number;
    panelHeight: number;
    regionMinHeight: string;
    peekTop: string;
  }
> = {
  subSm: {
    frameWidth: 390,
    left: 28,
    top: 20,
    panelWidth: 836,
    panelHeight: 440,
    regionMinHeight: "23.375rem",
    peekTop: "0",
  },
  sm: {
    frameWidth: 480,
    left: 67.39,
    top: 16,
    panelWidth: 911.607,
    panelHeight: 479.941,
    regionMinHeight: "27.375rem",
    peekTop: "0",
  },
  md: {
    frameWidth: 768,
    left: 67.39,
    top: 16,
    panelWidth: 911.607,
    panelHeight: 479.941,
    regionMinHeight: "27.375rem",
    peekTop: "0",
  },
};

/** Resolve the active hero mockup tier from viewport width. */
export function getHeroMockupTier(width: number): HeroMockupTier {
  if (width < 480) return "subSm";
  if (width < 768) return "sm";
  return "md";
}
