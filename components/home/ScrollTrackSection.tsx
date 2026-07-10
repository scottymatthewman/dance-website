"use client";

import type { ReactNode, Ref } from "react";
import { cn } from "@/lib/cn";
import {
  getSectionGapAfter,
  getSectionGapColor,
  getSectionInsetClass,
} from "@/lib/home/section-spacing";
import type { HomeSectionConfig } from "@/lib/home/sections";

type ScrollTrackSectionProps = {
  section: HomeSectionConfig;
  nextSection?: HomeSectionConfig;
  children: ReactNode;
  fillViewport?: boolean;
  ref?: Ref<HTMLElement>;
};

const SHELL_SECTION_HEIGHT =
  "calc(100dvh - var(--shell-margin-top) - var(--shell-margin))";

export function ScrollTrackSection({
  section,
  nextSection,
  children,
  fillViewport = false,
  ref,
}: ScrollTrackSectionProps) {
  const insetClass = getSectionInsetClass(section);
  const gapAfter = getSectionGapAfter(section, nextSection);
  const gapColor = getSectionGapColor(section, nextSection);

  return (
    <section
      ref={ref}
      id={`section-${section.id}`}
      className="scroll-track-section relative"
      style={{
        ...(section.backgroundColor
          ? { backgroundColor: section.backgroundColor }
          : null),
      }}
    >
      <div
        className={cn(
          "relative flex flex-col overflow-hidden",
          section.id === "statement" && "scroll-track-section-frame--statement",
        )}
        style={{
          ...(section.sizeToContent
            ? null
            : fillViewport
              ? { height: SHELL_SECTION_HEIGHT }
              : { minHeight: SHELL_SECTION_HEIGHT }),
          ...(section.backgroundColor
            ? { backgroundColor: section.backgroundColor }
            : null),
        }}
      >
        <div className="absolute inset-0" aria-hidden>
          {section.backgroundSrc ? (
            <>
              <img
                src={section.backgroundSrc}
                alt=""
                decoding="async"
                draggable={false}
                className="absolute inset-0 size-full object-cover"
              />
              <div aria-hidden className="section-image-scrim absolute inset-0" />
            </>
          ) : section.backgroundColor ? (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: section.backgroundColor }}
            />
          ) : null}
        </div>
        <div
          className={cn(
            "relative flex h-full min-h-0 w-full flex-col",
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
