/** Default surface radius for forms and nav chrome. */
export const SURFACE_RADIUS_PX = 6;

/** Tailwind classes for common nested radii (parent 6px). */
export const NEST_RADIUS_CLASS = {
  /** 6px parent, 4px gap (e.g. p-1 / pr-1) */
  gap4: "rounded-[2px]",
  /** 6px parent, 2px gap (e.g. p-0.5 / pr-0.5) */
  gap2: "rounded-[4px]",
  /** 6px parent, 8px gap (e.g. p-2) — floored to 0 */
  gap8: "rounded-none",
} as const;

/**
 * Nested border radius: parent radius minus the gap padding between parent
 * inner edge and child outer edge. Use the padding on the relevant side only
 * (e.g. py-0.5 → 2px, not the combined vertical padding).
 */
export function nestRadiusPx(
  parentRadiusPx: number,
  ...gapPaddingPx: number[]
): number {
  const gap = Math.max(...gapPaddingPx);
  return Math.max(0, parentRadiusPx - gap);
}

/** Tailwind arbitrary radius class for a nested child. */
export function nestRadiusClass(
  parentRadiusPx: number,
  ...gapPaddingPx: number[]
): string {
  const px = nestRadiusPx(parentRadiusPx, ...gapPaddingPx);
  if (px === 0) return NEST_RADIUS_CLASS.gap8;
  if (px === 2) return NEST_RADIUS_CLASS.gap4;
  if (px === 4) return NEST_RADIUS_CLASS.gap2;
  return `rounded-[${px}px]`;
}
