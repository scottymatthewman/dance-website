import type {
  HomeSectionConfig,
  SectionInsetPreset,
} from "@/lib/home/sections";

export const SCROLL_TRACK_BG = "var(--bg-scroll-canvas)";

/**
 * Section intro rhythm for use cases, flow, and email capture.
 * - copyTight (8px): heading → subheading
 * - copyToContent (24px): copy block → primary content
 *
 * Applied via `.section-copy` and `.section-intro` in globals.css.
 */
export const SECTION_INTRO_SPACING = {
  copyTight: "var(--copy-tight)",
  copyToContent: "var(--copy-to-content)",
} as const;

const SECTION_INSET_CLASS: Record<SectionInsetPreset, string> = {
  hero: "section-inset section-inset--hero",
  default: "section-inset section-inset--default",
  viewport: "section-inset section-inset--viewport",
  statement: "section-inset section-inset--statement",
  compact: "section-inset section-inset--compact",
  spacious: "section-inset section-inset--spacious",
  flush: "section-inset section-inset--flush",
};

const DEFAULT_SECTION_INSET: Record<
  HomeSectionConfig["id"],
  SectionInsetPreset
> = {
  hero: "hero",
  useCases: "viewport",
  features: "viewport",
  benefits: "spacious",
  statement: "statement",
  bento: "compact",
  emailCapture: "flush",
  emailCaptureBleed: "flush",
  footer: "default",
};

export function getSectionSurfaceKey(section: HomeSectionConfig): string {
  if (section.backgroundSrc) return `src:${section.backgroundSrc}`;
  if (section.backgroundColor) return `color:${section.backgroundColor}`;
  return "default";
}

export function sectionsShareSurface(
  a: HomeSectionConfig,
  b: HomeSectionConfig,
): boolean {
  return getSectionSurfaceKey(a) === getSectionSurfaceKey(b);
}

export function getSectionInsetPreset(
  section: HomeSectionConfig,
): SectionInsetPreset {
  return section.inset ?? DEFAULT_SECTION_INSET[section.id];
}

export function getSectionInsetClass(section: HomeSectionConfig): string {
  return SECTION_INSET_CLASS[getSectionInsetPreset(section)];
}

/** Scroll-track gap after a section before the next one. */
export function getSectionGapAfter(
  section: HomeSectionConfig,
  nextSection?: HomeSectionConfig,
): string {
  if (!nextSection || section.noGapAfter) return "0px";
  if (sectionsShareSurface(section, nextSection)) {
    return "var(--section-gap-same)";
  }
  return "var(--section-gap)";
}

/** Solid fill for the inter-section gap — matches the incoming section surface. */
export function getSectionGapColor(
  _section: HomeSectionConfig,
  nextSection?: HomeSectionConfig,
): string {
  if (!nextSection) return SCROLL_TRACK_BG;
  return nextSection.backgroundColor ?? SCROLL_TRACK_BG;
}
