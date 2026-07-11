"use client";

import { MockupFrame } from "@/components/home/MockupFrame";
import { TimelineMockup } from "@/components/home/TimelineMockupLazy";
import { ContentRail } from "@/components/home/sections/ContentRail";
import { SectionShell } from "@/components/home/sections/SectionShell";
import { RevealBlock, RevealWords } from "@/components/motion/RevealWords";
import { CtaButton } from "@/components/ui/CtaButton";
import { useIsClient } from "@/hooks/useIsClient";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTimedRevealProgress } from "@/hooks/useTimedRevealProgress";
import { COPY } from "@/lib/copy";

const HEADLINE_DURATION_MS = 1000;
const SECONDARY_DURATION_MS = 1000;
const HEADLINE_HANDOFF = 0.6;

export function HeroContent() {
  const mounted = useIsClient();
  const reducedMotion = useReducedMotion();
  const playIntro = mounted && !reducedMotion;

  const headlineProgressRaw = useTimedRevealProgress({
    durationMs: HEADLINE_DURATION_MS,
    delayMs: 100,
    easing: "linear",
    enabled: playIntro,
  });
  const headlineProgress = !mounted ? 0 : reducedMotion ? 1 : headlineProgressRaw;

  const secondaryEnabled =
    mounted && (reducedMotion || headlineProgress >= HEADLINE_HANDOFF);

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
    <SectionShell variant="centered" className="hero-shell relative">
      <div className="hero-copy-block flex min-h-0 w-full flex-col items-center justify-center">
        <ContentRail
          width="narrow"
          align="center"
          className="relative z-10 flex shrink-0 flex-col items-center gap-6"
        >
          <div className="section-copy w-full items-center">
            <RevealWords
              as="h1"
              lines={[COPY.hero.headline]}
              progress={headlineProgress}
              pace="hero"
              revealBy="word"
              className="text-balance font-display text-[clamp(2.25rem,8vw,3rem)] leading-[1.2] text-primary"
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
      </div>

      <RevealBlock
        progress={secondaryProgress}
        timeline="secondary"
        phase="cta"
        hidden={!secondaryEnabled}
        className="hero-mockup-region relative z-0 w-full shrink-0"
      >
        <div className="hero-mockup-peek">
          <MockupFrame
            fitContent
            className="hero-mockup-frame h-full w-full"
          >
            <TimelineMockup className="w-full" scaleMode="hero-cover" />
          </MockupFrame>
        </div>
      </RevealBlock>
    </SectionShell>
  );
}
