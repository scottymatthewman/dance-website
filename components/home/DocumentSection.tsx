"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  getSectionGapAfter,
  getSectionGapColor,
  getSectionInsetClass,
} from "@/lib/home/section-spacing";
import type { HomeSectionConfig } from "@/lib/home/sections";
import { sectionBackgroundStyle } from "@/lib/home/section-surface";
import { publicAssetUrl } from "@/lib/home/public-assets";

type DocumentSectionProps = {
  section: HomeSectionConfig;
  nextSection?: HomeSectionConfig;
  children: ReactNode;
  frameClassName?: string;
};

export function DocumentSection({
  section,
  nextSection,
  children,
  frameClassName,
}: DocumentSectionProps) {
  const insetClass = getSectionInsetClass(section);
  const gapAfter = getSectionGapAfter(section, nextSection);
  const gapColor = getSectionGapColor(section, nextSection);
  const backgroundStyle = sectionBackgroundStyle(section);
  const fillsShellViewport = frameClassName?.includes(
    "mobile-section--shell-height",
  );

  return (
    <section
      id={`section-${section.id}`}
      className="document-section relative scroll-mt-[var(--shell-margin-top)]"
      style={backgroundStyle ?? undefined}
    >
      <div
        className={cn(
          "relative flex flex-col overflow-hidden",
          section.id === "statement" && "scroll-track-section-frame--statement",
          section.id === "faq" && "scroll-track-section-frame--faq",
          frameClassName,
        )}
        style={backgroundStyle ?? undefined}
      >
        <div className="absolute inset-0" aria-hidden>
          {section.backgroundSrc ? (
            <img
              src={publicAssetUrl(section.backgroundSrc)}
              alt=""
              decoding="async"
              draggable={false}
              className="absolute inset-0 size-full object-cover"
            />
          ) : backgroundStyle ? (
            <div className="absolute inset-0" style={backgroundStyle} />
          ) : null}
        </div>
        <div
          className={cn(
            "relative flex w-full flex-col",
            fillsShellViewport && "h-full min-h-0",
            insetClass,
          )}
        >
          {children}
        </div>
      </div>
      {nextSection && gapAfter !== "0px" ? (
        <div
          aria-hidden
          className="scroll-section-gap shrink-0"
          style={{
            height: gapAfter,
            backgroundColor: gapColor,
          }}
        />
      ) : null}
    </section>
  );
}
