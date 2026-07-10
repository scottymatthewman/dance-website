import type { SectionId } from "@/lib/home/sections";

const scrollTops = new Map<SectionId, number>();

export function setHomeSectionScrollTop(id: SectionId, top: number) {
  scrollTops.set(id, top);
}

export function getHomeSectionScrollTop(id: SectionId) {
  return scrollTops.get(id) ?? 0;
}

export function clearHomeSectionScrollTops() {
  scrollTops.clear();
}
