import type { SectionId } from "@/lib/home/sections";

const scrollTops = new Map<SectionId, number>();

/** Window scroll Y that reveals the section at the top of the scroll frame. */
export function setHomeSectionScrollTop(id: SectionId, top: number) {
  scrollTops.set(id, top);
}

export function getHomeSectionScrollTop(id: SectionId) {
  return scrollTops.get(id) ?? 0;
}

export function clearHomeSectionScrollTops() {
  scrollTops.clear();
}
