import type {
  HomeSectionConfig,
  SectionInsetPreset,
} from "@/lib/home/sections";

export const SCROLL_TRACK_BG = "var(--bg-scroll-canvas)";

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
  differentiator: "spacious",
  faq: "spacious",
  bento: "compact",
  emailCapture: "flush",
  emailCaptureBleed: "flush",
  footer: "default",
};

function getSectionSurfaceKey(section: HomeSectionConfig): string {
  if (section.backgroundSrc) return `src:${section.backgroundSrc}`;
  if (section.backgroundGradient) {
    return `gradient:${section.backgroundGradient.from}:${section.backgroundGradient.to}`;
  }
  if (section.backgroundColor) return `color:${section.backgroundColor}`;
  return "default";
}

function sectionsShareSurface(
  a: HomeSectionConfig,
  b: HomeSectionConfig,
): boolean {
  return getSectionSurfaceKey(a) === getSectionSurfaceKey(b);
}

function getSectionInsetPreset(
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
