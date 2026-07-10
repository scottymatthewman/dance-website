import { HOME_SECTIONS } from "@/lib/home/sections";
import { getHomeSectionScrollTop } from "@/lib/home/scroll-positions";
import { getFeaturesStepScrollY } from "@/lib/home/scroll-transition";

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

  window.scrollTo({
    top: getHomeSectionScrollTop(section.id),
    behavior: options?.smooth ? "smooth" : "auto",
  });
}

export function scrollToFeaturesStep(
  stepIndex: number,
  options?: { smooth?: boolean },
) {
  window.scrollTo({
    top: getFeaturesStepScrollY(stepIndex, window.innerHeight),
    behavior: options?.smooth ? "smooth" : "auto",
  });
}

export function scrollToTop(options?: { smooth?: boolean }) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: options?.smooth ? "smooth" : "auto",
  });
}
