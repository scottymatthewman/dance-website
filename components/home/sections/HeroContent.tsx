"use client";

import { useEffect, useState } from "react";
import { MockupFrame } from "@/components/home/MockupFrame";
import { TimelineMockup } from "@/components/home/TimelineMockupLazy";
import { ContentRail } from "@/components/home/sections/ContentRail";
import { SectionShell } from "@/components/home/sections/SectionShell";
import { RevealBlock, RevealWords } from "@/components/motion/RevealWords";
import { CtaButton } from "@/components/ui/CtaButton";
import { COPY } from "@/lib/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTimedRevealProgress } from "@/hooks/useTimedRevealProgress";

const HEADLINE_DURATION_MS = 1000;
const SECONDARY_DURATION_MS = 1000;
const HEADLINE_HANDOFF = 0.6;

export function HeroContent() {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();
  const playIntro = mounted && !reducedMotion;

  useEffect(() => {
    setMounted(true);
  }, []);

  const headlineProgressRaw = useTimedRevealProgress({
    durationMs: HEADLINE_DURATION_MS,
    delayMs: 100,
    easing: "linear",
    enabled: playIntro,
  });
  const headlineProgress = !mounted ? 0 : reducedMotion ? 1 : headlineProgressRaw;

  const [secondaryEnabled, setSecondaryEnabled] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    if (reducedMotion) {
      setSecondaryEnabled(true);
      return;
    }
    if (headlineProgress >= HEADLINE_HANDOFF) {
      setSecondaryEnabled(true);
    }
  }, [headlineProgress, reducedMotion, mounted]);

  const secondaryProgressRaw = useTimedRevealProgress({
    durationMs: SECONDARY_DURATION_MS,
    delayMs: 0,
    easing: "easeOut",
    enabled: secondaryEnabled && playIntro,
  });
  const secondaryProgress = !mounted
    ? 0
    : reducedMotion
      ? 1
      : secondaryProgressRaw;

  return (
    <SectionShell variant="centered" className="overflow-visible">
      <ContentRail
        width="narrow"
        align="center"
        className="flex shrink-0 flex-col items-center gap-6"
      >
        <div className="section-copy w-full items-center">
          <RevealWords
            as="h1"
            lines={[COPY.hero.headline]}
            progress={headlineProgress}
            pace="hero"
            revealBy="word"
            className="whitespace-nowrap font-display text-[clamp(2rem,5vw,3rem)] leading-[1.3] text-primary"
          />
          <RevealBlock
            progress={secondaryProgress}
            timeline="secondary"
            phase="subhead"
            hidden={!secondaryEnabled}
            className="w-full"
          >
            <p className="flex flex-col gap-y-1 text-body-lg leading-normal text-secondary md:leading-[1.5]">
              {COPY.hero.subheadLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </RevealBlock>
        </div>
        <RevealBlock
          progress={secondaryProgress}
          timeline="secondary"
          phase="cta"
          hidden={!secondaryEnabled}
          className="flex w-full justify-center"
        >
          <CtaButton size="section" />
        </RevealBlock>
      </ContentRail>

      <RevealBlock
        progress={secondaryProgress}
        timeline="secondary"
        phase="cta"
        hidden={!secondaryEnabled}
        className="relative mt-6 min-h-0 w-full flex-1 md:mt-8"
      >
        <ContentRail width="content" align="center" className="h-full">
          <MockupFrame bleedBottom className="bg-black">
            <TimelineMockup />
          </MockupFrame>
        </ContentRail>
      </RevealBlock>
    </SectionShell>
  );
}
