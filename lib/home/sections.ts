import { SCROLL_TRACK_BG } from "@/lib/home/section-spacing";

export type SectionId =
  | "hero"
  | "features"
  | "benefits"
  | "statement"
  | "differentiator"
  | "faq"
  | "bento"
  | "useCases"
  | "emailCapture"
  | "emailCaptureBleed"
  | "footer";

const SECTION_IDS: Record<SectionId, number> = {
  hero: 0,
  features: 1,
  useCases: 2,
  benefits: 3,
  bento: 4,
  statement: 5,
  differentiator: 6,
  faq: 7,
  emailCapture: 8,
  emailCaptureBleed: 8,
  footer: 9,
};

/** Nav targets — indices into the scroll stage section list. */
export const NAV_SECTIONS = {
  useCases: SECTION_IDS.useCases,
  features: SECTION_IDS.bento,
  whyDance: SECTION_IDS.differentiator,
  faq: SECTION_IDS.faq,
  emailCapture: SECTION_IDS.emailCaptureBleed,
} as const;

export type SectionInsetPreset =
  | "hero"
  | "default"
  | "viewport"
  | "statement"
  | "compact"
  | "spacious"
  | "flush";

export type HomeSectionConfig = {
  id: SectionId;
  backgroundSrc?: string;
  backgroundColor?: string;
  backgroundGradient?: {
    from: string;
    to: string;
  };
  /** Content inset preset; defaults per section id in section-spacing.ts. */
  inset?: SectionInsetPreset;
  /** Hold scroll distance in vh for pinned sections. */
  holdVh?: number;
  /** Extra pinned scroll after a section settles (e.g. post-statement reveal). */
  postRevealHoldVh?: number;
  /** Section height follows content instead of filling the shell viewport. */
  sizeToContent?: boolean;
  /** With sizeToContent: still fill the shell viewport at lg+ (CSS-driven). */
  fillViewportLg?: boolean;
  /** Suppress the scroll-track gap before the next section. */
  noGapAfter?: boolean;
};

const DEFAULT_HOLD_VH = 100;

/** Pinned scroll distance per flow step (Define, Plan, Collaborate). */
export const FLOW_STEP_HOLD_VH = 125;
export const FLOW_STEP_COUNT = 3;

/** Total features section height so each flow step gets FLOW_STEP_HOLD_VH of scroll. */
export function getFeaturesHoldPx(
  frameHeightPx: number,
  viewportHeight: number,
): number {
  const stepScrollPx = (FLOW_STEP_HOLD_VH / 100) * viewportHeight;
  return frameHeightPx + FLOW_STEP_COUNT * stepScrollPx;
}

export const HOME_SECTIONS: HomeSectionConfig[] = [
  {
    id: "hero",
    backgroundGradient: { from: "#EDEBEE", to: "#E4EAF0" },
  },
  {
    id: "features",
    backgroundColor: SCROLL_TRACK_BG,
    sizeToContent: true,
    fillViewportLg: true,
  },
  {
    id: "useCases",
    backgroundColor: SCROLL_TRACK_BG,
  },
  {
    id: "benefits",
    backgroundColor: SCROLL_TRACK_BG,
    sizeToContent: true,
  },
  {
    id: "bento",
    backgroundColor: SCROLL_TRACK_BG,
    sizeToContent: true,
    fillViewportLg: true,
  },
  {
    id: "statement",
    backgroundColor: SCROLL_TRACK_BG,
    holdVh: 250,
    postRevealHoldVh: 70,
    noGapAfter: true,
  },
  {
    id: "differentiator",
    backgroundColor: SCROLL_TRACK_BG,
    sizeToContent: true,
    noGapAfter: true,
  },
  {
    id: "faq",
    backgroundColor: SCROLL_TRACK_BG,
    sizeToContent: true,
  },
  {
    id: "emailCaptureBleed",
    backgroundColor: SCROLL_TRACK_BG,
    noGapAfter: true,
  },
];

export function getSectionHoldVhById(id: SectionId): number {
  return HOME_SECTIONS.find((section) => section.id === id)?.holdVh ?? DEFAULT_HOLD_VH;
}

export function getSectionPostRevealHoldVhById(id: SectionId): number {
  return HOME_SECTIONS.find((section) => section.id === id)?.postRevealHoldVh ?? 0;
}
