"use client";

import { MobileHomePage } from "@/components/home/MobileHomePage";
import { ScrollStage } from "@/components/home/ScrollStage";
import { useIsClient } from "@/hooks/useIsClient";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DESKTOP_LAYOUT_MEDIA_QUERY } from "@/lib/device/breakpoints";

/**
 * Below md: native document scroll (no fixed track / spacer / release footer).
 * md+: scroll-stage experience with pinned flow and statement holds.
 */
export function HomePage() {
  const mounted = useIsClient();
  const isDesktopLayout = useMediaQuery(DESKTOP_LAYOUT_MEDIA_QUERY);

  if (!mounted) {
    return <MobileHomePage />;
  }

  if (isDesktopLayout) {
    return <ScrollStage />;
  }

  return <MobileHomePage />;
}
