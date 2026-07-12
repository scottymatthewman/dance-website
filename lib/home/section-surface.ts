import type { HomeSectionConfig } from "@/lib/home/sections";

export function sectionBackgroundStyle(section: HomeSectionConfig) {
  if (section.backgroundGradient) {
    return {
      backgroundImage: `linear-gradient(180deg, ${section.backgroundGradient.from} 0%, ${section.backgroundGradient.to} 100%)`,
    };
  }

  if (section.backgroundColor) {
    return { backgroundColor: section.backgroundColor };
  }

  return null;
}
