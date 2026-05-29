"use client";

import { useEffect, useMemo, useState } from "react";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { RevealBlock, RevealWords } from "@/components/motion/RevealWords";
import { Button } from "@/components/ui/Button";
import { MockupFrame } from "@/components/ui/MockupFrame";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTimedRevealProgress } from "@/hooks/useTimedRevealProgress";

const HEADLINE_DURATION_MS = 2800;
const SECONDARY_DURATION_MS = 1000;
/** Start subhead/CTA when headline is nearly done (not after a dead pause). */
const HEADLINE_HANDOFF = 0.87;

export function Hero() {
  const reducedMotion = useReducedMotion();
  const headlineProgressRaw = useTimedRevealProgress({
    durationMs: HEADLINE_DURATION_MS,
    delayMs: 100,
    easing: "linear",
    enabled: !reducedMotion,
  });
  const headlineProgress = reducedMotion ? 1 : headlineProgressRaw;

  const [secondaryEnabled, setSecondaryEnabled] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setSecondaryEnabled(true);
      return;
    }
    if (headlineProgress >= HEADLINE_HANDOFF) {
      setSecondaryEnabled(true);
    }
  }, [headlineProgress, reducedMotion]);

  const secondaryProgressRaw = useTimedRevealProgress({
    durationMs: SECONDARY_DURATION_MS,
    delayMs: 0,
    easing: "easeOut",
    enabled: secondaryEnabled && !reducedMotion,
  });
  const secondaryProgress = reducedMotion ? 1 : secondaryProgressRaw;

  const words = useMemo(
    () => COPY.hero.headlineLines.join(" ").split(/\s+/),
    [],
  );

  return (
    <PageSection id="demo" variant="full" spacing="hero" background="section">
      <ContentContainer className="flex flex-col gap-stack-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-[41.875rem] flex-col gap-stack-sm">
            <RevealWords
              as="h1"
              words={words}
              progress={headlineProgress}
              pace="hero"
              className="text-hero leading-[1.3] text-primary"
            />
          </div>
          
          <div className="flex flex-col items-end max-w-[24.375rem] gap-stack-sm pt-3">
            <RevealBlock
              progress={secondaryProgress}
              timeline="secondary"
              phase="subhead"
              hidden={!secondaryEnabled}
            >
              <p className="text-body-lg max-w-[24.375rem] leading-normal text-secondary text-right">
                {COPY.hero.subhead}
              </p>
            </RevealBlock>
            <RevealBlock
              progress={secondaryProgress}
              timeline="secondary"
              phase="cta"
              hidden={!secondaryEnabled}
              className="shrink-0"
            >
              <Button href={SITE.demoHref} className="w-full sm:w-auto">
                {COPY.hero.cta}
              </Button>
            </RevealBlock>
          </div>
        </div>
        <MockupFrame variant="hero" title="Product preview" />
      </ContentContainer>
    </PageSection>
  );
}
