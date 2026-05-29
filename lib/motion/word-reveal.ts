import { smootherstep, smoothstep } from "@/lib/motion/easing";

export const WORDS_END_PROGRESS = 0.82;
export const SUBHEAD_START_PROGRESS = 0.78;
/** Subhead finishes here; CTA begins immediately after. */
export const CTA_START_PROGRESS = 0.9;

/** Scroll-driven sections (e.g. Statement). */
export function getWordProgress(
  progress: number,
  wordIndex: number,
  wordCount: number,
): number {
  const wordSpan = WORDS_END_PROGRESS / wordCount;
  const start = wordIndex * wordSpan;
  const end = start + wordSpan * 1.2;
  const linear = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return smootherstep(linear);
}

/** Hero headline — uses linear 0→1 progress; one word at a time, slow fades. */
export function getHeroWordProgress(
  progress: number,
  wordIndex: number,
  wordCount: number,
): number {
  const wordSpan = 1 / wordCount;
  const start = wordIndex * wordSpan * 0.8;
  const end = start + wordSpan * 1.55;
  const linear = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return smootherstep(linear);
}

/** Subhead + CTA after headline — progress is 0→1 over their own eased window. */
export function getSecondarySubheadProgress(progress: number): number {
  if (progress <= 0) return 0;
  if (progress >= 0.58) return 1;
  return smoothstep(progress / 0.58);
}

export function getSecondaryCtaProgress(progress: number): number {
  if (progress <= 0.58) return 0;
  return smoothstep((progress - 0.58) / 0.42);
}

function getSegmentProgress(
  progress: number,
  start: number,
): number {
  if (progress <= start) return 0;
  const linear = Math.min(1, (progress - start) / (1 - start));
  return smoothstep(linear);
}

export function getSubheadProgress(progress: number): number {
  if (progress <= SUBHEAD_START_PROGRESS) return 0;
  if (progress >= CTA_START_PROGRESS) return 1;
  const linear =
    (progress - SUBHEAD_START_PROGRESS) /
    (CTA_START_PROGRESS - SUBHEAD_START_PROGRESS);
  return smoothstep(linear);
}

export function getCtaProgress(progress: number): number {
  return getSegmentProgress(progress, CTA_START_PROGRESS);
}

export function getWordRevealStyle(wordProgress: number) {
  const blur = (1 - wordProgress) * 8;
  const y = (1 - wordProgress) * 12;

  return {
    opacity: wordProgress,
    filter: `blur(${blur}px)`,
    transform: `translateY(${y}px)`,
  } as const;
}

export function getWordColorRevealStyle(wordProgress: number) {
  const tertiaryWeight = (1 - wordProgress) * 100;
  const primaryWeight = wordProgress * 100;

  return {
    color: `color-mix(in srgb, var(--text-tertiary) ${tertiaryWeight}%, var(--text-primary) ${primaryWeight}%)`,
  } as const;
}

export function getSubheadRevealStyle(revealProgress: number) {
  return {
    opacity: revealProgress,
    transform: `translateY(${(1 - revealProgress) * 12}px)`,
  } as const;
}
