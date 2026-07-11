"use client";

import { ContentRail } from "@/components/home/sections/ContentRail";
import { SectionShell } from "@/components/home/sections/SectionShell";
import { RevealBlock, RevealWords } from "@/components/motion/RevealWords";
import { CtaButton } from "@/components/ui/CtaButton";
import { COPY } from "@/lib/copy";
import { DESKTOP_LAYOUT_MEDIA_QUERY } from "@/lib/device/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useViewportCenterTimedReveal } from "@/hooks/useViewportCenterTimedReveal";
import { mapStatementScrollProgress } from "@/lib/motion/word-reveal";

type StatementContentProps = {
  entryProgress: number;
};

export function StatementContent({ entryProgress }: StatementContentProps) {
  const reducedMotion = useReducedMotion();
  const isDesktopLayout = useMediaQuery(DESKTOP_LAYOUT_MEDIA_QUERY);
  const { ref, progress: timedProgress } = useViewportCenterTimedReveal({
    delayMs: 100,
    enabled: !isDesktopLayout && !reducedMotion,
  });

  const progress = reducedMotion
    ? 1
    : isDesktopLayout
      ? mapStatementScrollProgress(entryProgress)
      : timedProgress;

  return (
    <SectionShell variant="centered" className="justify-center">
      <ContentRail
        ref={ref}
        width="narrow"
        align="center"
        className="flex flex-col items-center gap-6"
      >
        <div className="section-copy w-full items-center">
          <RevealWords
            as="h2"
            lines={COPY.statement.headlineLines}
            progress={progress}
            pace="statement"
            className="text-h2 w-full leading-[1.3] text-primary"
          />
          <RevealBlock
            progress={progress}
            timeline="statement"
            className="block w-full"
          >
            <p className="text-subhead block w-full leading-normal md:leading-[1.5]">
              {COPY.statement.body}
            </p>
          </RevealBlock>
        </div>
        <RevealBlock progress={progress} timeline="statement" phase="cta">
          <CtaButton variant="primary" size="section" />
        </RevealBlock>
      </ContentRail>
    </SectionShell>
  );
}
