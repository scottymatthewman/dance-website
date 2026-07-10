"use client";

import { ScrollReleaseFooter } from "@/components/home/ScrollReleaseFooter";
import { ScrollTrackSection } from "@/components/home/ScrollTrackSection";
import { BentoContent } from "@/components/home/sections/BentoContent";
import { BenefitsContent } from "@/components/home/sections/BenefitsContent";
import { EmailCaptureBleedContent } from "@/components/home/sections/EmailCaptureBleedContent";
import { FeaturesContent } from "@/components/home/sections/FeaturesContent";
import { HeroContent } from "@/components/home/sections/HeroContent";
import { StatementContent } from "@/components/home/sections/StatementContent";
import { UseCasesContent } from "@/components/home/sections/UseCasesContent";
import {
  useScrollSpacerHeight,
  useScrollTrackState,
  useViewportHeight,
} from "@/hooks/useScrollStageState";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  clearHomeSectionScrollTops,
  setHomeSectionScrollTop,
} from "@/lib/home/scroll-positions";
import {
  getFeaturesHoldPx,
  getSectionHoldVhById,
  getSectionPostRevealHoldVhById,
  HOME_SECTIONS,
  type SectionId,
} from "@/lib/home/sections";
import {
  getScrollReleaseFooterOpacity,
  getScrollReleaseFooterBottomPx,
  getScrollReleaseOffsetPx,
  getTrackTranslateY,
  getWindowScrollYForTrackOffset,
  type TrackScrollLayout,
} from "@/lib/home/scroll-transition";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";

const TRACK_SECTIONS = HOME_SECTIONS;
const TRACK_SECTION_ORDER = TRACK_SECTIONS.map((section) => section.id).join(",");
const STATEMENT_SECTION_SELECTOR = "#section-statement";
const FEATURES_SECTION_SELECTOR = "#section-features";

/** Sections that fill exactly one shell viewport. */
const FILL_VIEWPORT_SECTIONS = new Set<SectionId>([
  "hero",
  "useCases",
  "features",
  "statement",
  "bento",
  "emailCaptureBleed",
]);

const SECTION_CONTENT: Record<
  Exclude<SectionId, "footer" | "features" | "statement" | "emailCapture">,
  ReactNode
> = {
  hero: <HeroContent />,
  benefits: <BenefitsContent />,
  bento: <BentoContent />,
  useCases: <UseCasesContent />,
  emailCaptureBleed: <EmailCaptureBleedContent />,
};

export function ScrollStage() {
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [frameHeightPx, setFrameHeightPx] = useState(800);
  const [trackHeightPx, setTrackHeightPx] = useState(3200);
  const [statementOffsetInTrack, setStatementOffsetInTrack] = useState(0);
  const [featuresOffsetInTrack, setFeaturesOffsetInTrack] = useState(0);
  const [trackLayoutReady, setTrackLayoutReady] = useState(false);
  const releaseProgressRef = useRef(0);

  const viewportHeight = useViewportHeight();
  const reducedMotion = useReducedMotion();
  const featuresHoldPx = useMemo(
    () => getFeaturesHoldPx(frameHeightPx, viewportHeight),
    [frameHeightPx, viewportHeight],
  );
  const statementHoldPx = useMemo(
    () => (getSectionHoldVhById("statement") / 100) * viewportHeight,
    [viewportHeight],
  );
  const statementPostRevealHoldPx = useMemo(
    () =>
      (getSectionPostRevealHoldVhById("statement") / 100) * viewportHeight,
    [viewportHeight],
  );

  const trackLayout = useMemo<TrackScrollLayout>(
    () => ({
      frameHeightPx,
      trackHeightPx,
      flowStartHoldPx: 0,
      features: trackLayoutReady
        ? {
            offsetInTrack: featuresOffsetInTrack,
            holdPx: featuresHoldPx,
          }
        : null,
      statement: trackLayoutReady
        ? {
            offsetInTrack: statementOffsetInTrack,
            holdPx: statementHoldPx,
            postRevealHoldPx: statementPostRevealHoldPx,
          }
        : null,
    }),
    [
      frameHeightPx,
      trackHeightPx,
      featuresHoldPx,
      featuresOffsetInTrack,
      statementHoldPx,
      statementPostRevealHoldPx,
      statementOffsetInTrack,
      trackLayoutReady,
    ],
  );

  const scrollState = useScrollTrackState(trackLayout);
  const spacerHeight = useScrollSpacerHeight(
    scrollState.totalScrollHeight,
    viewportHeight,
  );
  const releaseProgress = reducedMotion
    ? scrollState.scrollReleaseProgress > 0
      ? 1
      : 0
    : scrollState.scrollReleaseProgress;
  const releaseOffsetPx = Math.round(
    getScrollReleaseOffsetPx(frameHeightPx, releaseProgress),
  );
  const trackTranslateY = Math.round(
    getTrackTranslateY(scrollState.trackOffset, releaseOffsetPx),
  );
  const footerOpacity = getScrollReleaseFooterOpacity(releaseProgress);
  const featuresScrollProgress = reducedMotion
    ? 1
    : scrollState.featuresProgress;
  const statementScrollProgress = reducedMotion
    ? 1
    : scrollState.statementProgress;

  // Tall document spacer + browser scroll restoration lands mid-track on refresh.
  useLayoutEffect(() => {
    const { history } = window;
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    const resetScroll = () => {
      window.scrollTo(0, 0);
    };

    resetScroll();
    const rafId = window.requestAnimationFrame(resetScroll);

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) resetScroll();
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pageshow", onPageShow);
      history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    releaseProgressRef.current = releaseProgress;

    const root = document.documentElement;
    const shellMargin =
      parseFloat(getComputedStyle(root).getPropertyValue("--shell-margin")) || 0;
    const footerBottomPx = getScrollReleaseFooterBottomPx(
      shellMargin,
      releaseProgress,
    );

    root.style.setProperty("--scroll-release-offset", `${releaseOffsetPx}px`);
    root.style.setProperty(
      "--scroll-release-progress",
      String(releaseProgress),
    );
    root.style.setProperty(
      "--scroll-release-footer-bottom",
      `${footerBottomPx}px`,
    );

    return () => {
      root.style.setProperty("--scroll-release-offset", "0px");
      root.style.setProperty("--scroll-release-progress", "0");
      root.style.removeProperty("--scroll-release-footer-bottom");
    };
  }, [releaseOffsetPx, releaseProgress]);

  useLayoutEffect(() => {
    if (releaseProgress > 0) return;

    const frame = frameRef.current;
    if (!frame) return;

    setFrameHeightPx(frame.clientHeight);
  }, [releaseProgress, viewportHeight]);

  useEffect(() => {
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!frame || !track) return;

    const measureTrack = () => {
      const trackHeight = track.scrollHeight;
      const frameHeight = frame.clientHeight;

      const featuresElement = track.querySelector<HTMLElement>(
        FEATURES_SECTION_SELECTOR,
      );
      const statementElement = track.querySelector<HTMLElement>(
        STATEMENT_SECTION_SELECTOR,
      );
      const featuresOffset = featuresElement?.offsetTop ?? 0;
      const statementOffset = statementElement?.offsetTop ?? 0;

      const scrollLayout: TrackScrollLayout = {
        frameHeightPx: frameHeight,
        trackHeightPx: trackHeight,
        flowStartHoldPx: 0,
        features: featuresElement
          ? {
              offsetInTrack: featuresOffset,
              holdPx: getFeaturesHoldPx(frameHeight, viewportHeight),
            }
          : null,
        statement: statementElement
          ? {
              offsetInTrack: statementOffset,
              holdPx: statementHoldPx,
              postRevealHoldPx: statementPostRevealHoldPx,
            }
          : null,
      };

      TRACK_SECTIONS.forEach((section, index) => {
        const element = sectionRefs.current[index];
        const offsetInTrack = element?.offsetTop ?? 0;
        setHomeSectionScrollTop(
          section.id,
          getWindowScrollYForTrackOffset(offsetInTrack, scrollLayout),
        );
      });

      setTrackHeightPx(trackHeight);
      setFeaturesOffsetInTrack(featuresOffset);
      setStatementOffsetInTrack(statementOffset);
      setTrackLayoutReady(Boolean(featuresElement && statementElement));

      if (releaseProgressRef.current <= 0) {
        setFrameHeightPx(frame.clientHeight);
      }
    };

    measureTrack();

    const observer = new ResizeObserver(measureTrack);
    observer.observe(track);
    for (const section of sectionRefs.current) {
      if (section) observer.observe(section);
    }

    window.addEventListener("resize", measureTrack, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureTrack);
      clearHomeSectionScrollTops();
    };
  }, [
    TRACK_SECTION_ORDER,
    viewportHeight,
    featuresHoldPx,
    statementHoldPx,
    statementPostRevealHoldPx,
  ]);

  return (
    <>
      <div
        ref={frameRef}
        className="scroll-stage fixed z-0 overflow-hidden"
        style={{
          top: "var(--shell-margin-top)",
          right: "var(--shell-margin)",
          bottom: `calc(var(--shell-margin) + ${releaseOffsetPx}px)`,
          left: "var(--shell-margin)",
        }}
      >
        <div
          ref={trackRef}
          className="scroll-track relative z-0 will-change-transform"
          style={{
            transform: `translate3d(0, -${trackTranslateY}px, 0)`,
          }}
        >
          {TRACK_SECTIONS.map((section, index) => (
            <ScrollTrackSection
              key={section.id}
              ref={(node) => {
                sectionRefs.current[index] = node;
              }}
              section={section}
              nextSection={TRACK_SECTIONS[index + 1]}
              fillViewport={FILL_VIEWPORT_SECTIONS.has(section.id)}
            >
              {section.id === "statement" ? (
                <StatementContent entryProgress={statementScrollProgress} />
              ) : section.id === "features" ? (
                <FeaturesContent stepProgress={featuresScrollProgress} />
              ) : (
                SECTION_CONTENT[section.id as keyof typeof SECTION_CONTENT]
              )}
            </ScrollTrackSection>
          ))}
        </div>
      </div>

      <ScrollReleaseFooter opacity={footerOpacity} />

      <div
        aria-hidden
        className="pointer-events-none relative z-10"
        style={{ height: spacerHeight }}
      />
    </>
  );
}
