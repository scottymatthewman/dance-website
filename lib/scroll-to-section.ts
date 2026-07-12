import { COMPACT_SCROLL_MEDIA_QUERY } from "@/lib/device/breakpoints";
import { isTouchLikeDevice } from "@/lib/device/touch";
import { HOME_SECTIONS } from "@/lib/home/sections";
import { getHomeSectionScrollTop } from "@/lib/home/scroll-positions";
import { getFeaturesStepScrollY } from "@/lib/home/scroll-transition";

function resolveScrollBehavior(options?: { smooth?: boolean }) {
  return options?.smooth && !isTouchLikeDevice() ? "smooth" : "auto";
}

function scrollToSectionElement(
  sectionId: string,
  options?: { smooth?: boolean },
) {
  const element = document.getElementById(`section-${sectionId}`);
  if (!element) return;

  element.scrollIntoView({
    behavior: resolveScrollBehavior(options),
    block: "start",
  });
}

function isCompactScrollLayout() {
  return window.matchMedia(COMPACT_SCROLL_MEDIA_QUERY).matches;
}

export function scrollToHomeSection(
  sectionIndex: number,
  options?: { smooth?: boolean },
) {
  const section = HOME_SECTIONS[sectionIndex];
  if (!section) return;

  if (sectionIndex === 0) {
    scrollToTop(options);
    return;
  }

  if (isCompactScrollLayout()) {
    scrollToSectionElement(section.id, options);
    return;
  }

  window.scrollTo({
    top: getHomeSectionScrollTop(section.id),
    behavior: resolveScrollBehavior(options),
  });
}

export function scrollToFeaturesStep(
  stepIndex: number,
  options?: { smooth?: boolean },
) {
  if (isCompactScrollLayout()) {
    scrollToSectionElement("features", options);
    return;
  }

  window.scrollTo({
    top: getFeaturesStepScrollY(stepIndex, window.innerHeight),
    behavior: resolveScrollBehavior(options),
  });
}

export function scrollToTop(options?: { smooth?: boolean }) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: resolveScrollBehavior(options),
  });
}
