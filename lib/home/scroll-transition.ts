export type PinnedSectionLayout = {
  offsetInTrack: number;
  holdPx: number;
  postRevealHoldPx?: number;
};

export type TrackScrollLayout = {
  frameHeightPx: number;
  trackHeightPx: number;
  /** Pinned scroll after hero→useCases before the track moves. */
  flowStartHoldPx: number;
  features: PinnedSectionLayout | null;
  statement: PinnedSectionLayout | null;
};

import {
  FLOW_STEP_COUNT,
  FLOW_STEP_HOLD_VH,
} from "@/lib/home/sections";
import { getHomeSectionScrollTop } from "@/lib/home/scroll-positions";

export type ScrollTrackState = {
  /** Vertical offset applied to the in-frame scroll track. */
  trackOffset: number;
  /** 0–1 scroll-driven step progress for the features (flow) section. */
  featuresProgress: number;
  /** 0–1 scroll-driven reveal for the statement section. */
  statementProgress: number;
  /** 0–1 shrink progress after the scroll track reaches its end. */
  scrollReleaseProgress: number;
  totalScrollHeight: number;
};

/** Scroll distance (in vh) to shrink the frame and reveal the footer. */
export const SCROLL_RELEASE_VH = 80;

/** Final frame height as a fraction of the full shell viewport height. */
export const SCROLL_FRAME_MIN_HEIGHT_RATIO = 0.25;

/** Bottom inset for the release footer panel once the footer section is active. */
export const SCROLL_RELEASE_FOOTER_BOTTOM_PX = 16;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function vhToPx(vh: number, viewportHeight: number) {
  return (vh / 100) * viewportHeight;
}

/** Maps segment progress to 0–1 within [start, end]. */
function mapSegmentRange(t: number, start: number, end: number) {
  if (t <= start) return 0;
  if (t >= end) return 1;
  return (t - start) / (end - start);
}

export function getPinnedHoldScrollPx(
  section: PinnedSectionLayout,
  frameHeightPx: number,
) {
  const revealRange = Math.max(section.holdPx - frameHeightPx, 1);
  const postRevealHoldPx = Math.max(section.postRevealHoldPx ?? 0, 0);
  return revealRange + postRevealHoldPx;
}

/** Window scroll Y that aligns a track offset with the top of the scroll frame. */
export function getWindowScrollYForTrackOffset(
  targetOffset: number,
  layout: TrackScrollLayout,
) {
  const { frameHeightPx, flowStartHoldPx, features, statement } = layout;
  let scrollY = targetOffset;

  if (features && targetOffset > features.offsetInTrack) {
    scrollY += getPinnedHoldScrollPx(features, frameHeightPx);
  }

  if (statement && targetOffset > statement.offsetInTrack) {
    scrollY += getPinnedHoldScrollPx(statement, frameHeightPx);
  }

  return flowStartHoldPx + scrollY;
}

function getTrackBottomScrollPx(
  viewportHeight: number,
  layout: TrackScrollLayout,
) {
  const { frameHeightPx, trackHeightPx, flowStartHoldPx, features, statement } =
    layout;
  const baseFlowRange = Math.max(0, trackHeightPx - frameHeightPx);

  const featuresHoldScrollPx = features
    ? getPinnedHoldScrollPx(features, frameHeightPx)
    : 0;

  const statementHoldScrollPx = statement
    ? getPinnedHoldScrollPx(statement, frameHeightPx)
    : 0;

  return (
    flowStartHoldPx +
    baseFlowRange +
    featuresHoldScrollPx +
    statementHoldScrollPx
  );
}

export function getScrollTrackState(
  scrollY: number,
  viewportHeight: number,
  layout: TrackScrollLayout,
): ScrollTrackState {
  const { frameHeightPx, trackHeightPx, flowStartHoldPx, features, statement } =
    layout;
  const baseFlowRange = Math.max(0, trackHeightPx - frameHeightPx);
  const trackBottomScrollPx = getTrackBottomScrollPx(viewportHeight, layout);
  const releaseScrollPx = vhToPx(SCROLL_RELEASE_VH, viewportHeight);
  const totalScrollHeight = trackBottomScrollPx + releaseScrollPx;
  const clampedScroll = Math.min(Math.max(scrollY, 0), totalScrollHeight);
  const trackScrollY = Math.min(clampedScroll, trackBottomScrollPx);

  const withRelease = (metrics: {
    trackOffset: number;
    featuresProgress: number;
    statementProgress: number;
  }) => {
    const trackFullyScrolled =
      baseFlowRange <= 0 || metrics.trackOffset >= baseFlowRange - 0.5;
    const scrollReleaseProgress = trackFullyScrolled
      ? clamp01(
          (clampedScroll - trackBottomScrollPx) / Math.max(releaseScrollPx, 1),
        )
      : 0;

    return {
      ...metrics,
      scrollReleaseProgress,
      totalScrollHeight,
    };
  };

  if (trackScrollY < flowStartHoldPx) {
    return withRelease({
      trackOffset: 0,
      featuresProgress: 0,
      statementProgress: 0,
    });
  }

  const adjustedFlowScroll = trackScrollY - flowStartHoldPx;
  let trackOffset = adjustedFlowScroll;
  let featuresProgress = 0;

  if (features) {
    const featuresStart = features.offsetInTrack;
    const featuresHoldScrollPx = getPinnedHoldScrollPx(features, frameHeightPx);

    if (adjustedFlowScroll < featuresStart) {
      return withRelease({
        trackOffset: adjustedFlowScroll,
        featuresProgress: 0,
        statementProgress: 0,
      });
    }

    const scrollIntoFeatures = adjustedFlowScroll - featuresStart;
    if (scrollIntoFeatures < featuresHoldScrollPx) {
      return withRelease({
        trackOffset: featuresStart,
        featuresProgress: clamp01(scrollIntoFeatures / featuresHoldScrollPx),
        statementProgress: 0,
      });
    }

    trackOffset = adjustedFlowScroll - featuresHoldScrollPx;
    featuresProgress = 1;
  }

  if (!statement) {
    return withRelease({
      trackOffset: Math.min(trackOffset, baseFlowRange),
      featuresProgress,
      statementProgress: 0,
    });
  }

  const statementStart = statement.offsetInTrack;
  const revealRange = Math.max(statement.holdPx - frameHeightPx, 1);
  const postRevealHoldPx = Math.max(statement.postRevealHoldPx ?? 0, 0);
  const totalPinnedScroll = revealRange + postRevealHoldPx;

  if (trackOffset < statementStart) {
    return withRelease({
      trackOffset,
      featuresProgress,
      statementProgress: 0,
    });
  }

  const scrollIntoStatement = trackOffset - statementStart;

  if (scrollIntoStatement < revealRange) {
    return withRelease({
      trackOffset: statementStart,
      featuresProgress,
      statementProgress: clamp01(scrollIntoStatement / revealRange),
    });
  }

  if (scrollIntoStatement < totalPinnedScroll) {
    return withRelease({
      trackOffset: statementStart,
      featuresProgress,
      statementProgress: 1,
    });
  }

  const scrollAfterReveal = scrollIntoStatement - totalPinnedScroll;

  return withRelease({
    trackOffset: Math.min(statementStart + scrollAfterReveal, baseFlowRange),
    featuresProgress,
    statementProgress: 1,
  });
}

/** Document spacer height so window.scrollY can reach totalScrollHeight. */
export function getScrollSpacerHeight(
  totalScrollHeight: number,
  viewportHeight: number,
  shellMarginTopPx: number,
) {
  return totalScrollHeight + Math.max(0, viewportHeight - shellMarginTopPx);
}

export function getScrollReleaseOffsetPx(
  frameHeightPx: number,
  progress: number,
) {
  return (
    frameHeightPx *
    (1 - SCROLL_FRAME_MIN_HEIGHT_RATIO) *
    clamp01(progress)
  );
}

/** Keep the track bottom pinned to the frame bottom while the frame shrinks. */
export function getTrackTranslateY(
  trackOffset: number,
  releaseOffsetPx: number,
) {
  return trackOffset + releaseOffsetPx;
}

/** Footer opacity ramps in during the first half of the release scroll. */
export function getScrollReleaseFooterOpacity(progress: number) {
  return mapSegmentRange(clamp01(progress), 0.08, 0.72);
}

/** Pinned scroll distance while the features flow steps advance. */
export function getFeaturesHoldScrollPx(viewportHeight: number) {
  const stepScrollPx = (FLOW_STEP_HOLD_VH / 100) * viewportHeight;
  return FLOW_STEP_COUNT * stepScrollPx;
}

/** Scroll progress (0–1) that centers a flow step within its scroll band. */
export function getFeaturesStepProgress(stepIndex: number) {
  const clamped = Math.min(Math.max(stepIndex, 0), FLOW_STEP_COUNT - 1);
  return (clamped + 0.5) / FLOW_STEP_COUNT;
}

/** Window scroll Y that aligns the features section with a flow step. */
export function getFeaturesStepScrollY(
  stepIndex: number,
  viewportHeight: number,
) {
  const featuresStart = getHomeSectionScrollTop("features");
  const stepProgress = getFeaturesStepProgress(stepIndex);
  const holdScrollPx = getFeaturesHoldScrollPx(viewportHeight);
  return featuresStart + stepProgress * holdScrollPx;
}

export function getScrollReleaseFooterBottomPx(
  shellMarginPx: number,
  progress: number,
) {
  return Math.round(
    lerp(shellMarginPx, SCROLL_RELEASE_FOOTER_BOTTOM_PX, clamp01(progress)),
  );
}
