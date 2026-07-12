import type { HomeSectionConfig } from "@/lib/home/sections";

export const HERO_BACKGROUND_GRADIENT = {
  from: "#EDEBEE",
  to: "#E4EAF0",
} as const;

export function gradientBackgroundStyle(gradient: {
  from: string;
  to: string;
}) {
  return {
    backgroundImage: `linear-gradient(180deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
  };
}

export function sectionBackgroundStyle(section: HomeSectionConfig) {
  if (section.backgroundGradient) {
    return gradientBackgroundStyle(section.backgroundGradient);
  }

  if (section.backgroundColor) {
    return { backgroundColor: section.backgroundColor };
  }

  return null;
}
