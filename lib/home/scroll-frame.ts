import {
  getScrollReleaseOffsetPx,
  getScrollReleaseFooterBottomPx,
  getTrackTranslateY,
  type ScrollTrackState,
  type TrackScrollLayout,
} from "@/lib/home/scroll-transition";
import type { RefObject } from "react";

type ScrollTrackFrameRefs = {
  trackRef: RefObject<HTMLElement | null>;
  frameRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
};

/** Apply scroll-track transform directly to avoid a React commit between scroll and paint. */
export function applyScrollTrackFrame(
  state: ScrollTrackState,
  layout: TrackScrollLayout,
  refs: ScrollTrackFrameRefs,
) {
  const releaseProgress = refs.reducedMotion
    ? state.scrollReleaseProgress > 0
      ? 1
      : 0
    : state.scrollReleaseProgress;

  const releaseOffsetPx = Math.round(
    getScrollReleaseOffsetPx(layout.frameHeightPx, releaseProgress),
  );
  const trackTranslateY = Math.round(
    getTrackTranslateY(state.trackOffset, releaseOffsetPx),
  );

  const track = refs.trackRef.current;
  if (track) {
    track.style.transform = `translate3d(0, -${trackTranslateY}px, 0)`;
  }

  const frame = refs.frameRef.current;
  if (frame) {
    frame.style.bottom = `calc(var(--shell-margin) + ${releaseOffsetPx}px)`;
  }

  const root = document.documentElement;
  const shellMargin =
    parseFloat(getComputedStyle(root).getPropertyValue("--shell-margin")) || 0;
  const footerBottomPx = getScrollReleaseFooterBottomPx(
    shellMargin,
    releaseProgress,
  );

  root.style.setProperty("--scroll-release-offset", `${releaseOffsetPx}px`);
  root.style.setProperty("--scroll-release-progress", String(releaseProgress));
  root.style.setProperty(
    "--scroll-release-footer-bottom",
    `${footerBottomPx}px`,
  );

  return { releaseProgress, releaseOffsetPx, trackTranslateY };
}
