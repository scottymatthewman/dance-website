"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { RevealBlock, RevealWords } from "@/components/motion/RevealWords";
import { Button } from "@/components/ui/Button";
import { HeroMockup } from "@/components/sections/HeroMockup";
import { MockupFrame } from "@/components/ui/MockupFrame";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTimedRevealProgress } from "@/hooks/useTimedRevealProgress";

const MOBILE_HERO_MOCKUP_SRC = "/hero/mobile-hero.png";

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
    <PageSection
      id="demo"
      variant="full"
      spacing="hero"
      background="section"
      className="relative overflow-hidden max-md:flex max-md:min-h-svh max-md:flex-col"
    >
      <div aria-hidden="true" className="hero-bg pointer-events-none absolute inset-0" />
      <ContentContainer className="relative z-10 flex flex-col gap-stack-lg max-md:min-h-0 max-md:flex-1 max-md:gap-6">
        <div className="max-md:mx-auto max-md:flex max-md:w-full max-md:max-w-[85vw] max-md:flex-1 max-md:flex-col md:contents">
          <div className="flex shrink-0 flex-col items-center gap-4 max-md:gap-6 md:items-start lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="flex w-full max-w-[41.875rem] flex-col items-center gap-stack-sm md:items-start">
              <RevealWords
                as="h1"
                words={words}
                progress={headlineProgress}
                pace="hero"
                className="text-center text-hero leading-[1.3] text-primary md:text-left"
              />
            </div>

            <div className="flex w-full max-w-[41.875rem] flex-col items-center gap-6 md:items-start lg:max-w-[24.375rem] lg:items-end lg:gap-stack-sm lg:pt-3">
              <RevealBlock
                progress={secondaryProgress}
                timeline="secondary"
                phase="subhead"
                hidden={!secondaryEnabled}
              >
                <p className="max-w-[24.375rem] text-center text-base leading-normal text-secondary md:max-w-none md:text-left lg:max-w-[24.375rem] lg:text-right">
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
                <Button href={SITE.demoHref} size="default">
                  {COPY.hero.cta}
                </Button>
              </RevealBlock>
            </div>
          </div>

          <div
            aria-hidden
            className="hero-mobile-mockup-slot max-md:relative max-md:mt-9 max-md:min-h-0 max-md:flex-1 max-md:overflow-visible md:hidden"
          >
            <Image
              alt=""
              className="hero-mobile-mockup-image max-md:pointer-events-none max-md:absolute max-md:top-0 max-md:left-0 max-md:max-w-none"
              height={1512}
              priority
              sizes="100vw"
              src={MOBILE_HERO_MOCKUP_SRC}
              width={1459}
            />
          </div>
        </div>
        <div className="hidden md:block">
          <MockupFrame variant="hero">
            <HeroMockup />
          </MockupFrame>
        </div>
      </ContentContainer>
    </PageSection>
  );
}
