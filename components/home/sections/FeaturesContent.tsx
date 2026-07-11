"use client";

import { FlowCarousel } from "@/components/home/FlowCarousel";
import { CollaborateMockup } from "@/components/home/CollaborateMockupLazy";
import { DefineMockup } from "@/components/home/DefineMockupLazy";
import { PlanMockup } from "@/components/home/PlanMockupLazy";
import { ContentRail } from "@/components/home/sections/ContentRail";
import { SectionHeader } from "@/components/home/sections/SectionHeader";
import { SectionShell } from "@/components/home/sections/SectionShell";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { CtaButton } from "@/components/ui/CtaButton";
import { cn } from "@/lib/cn";
import { COPY } from "@/lib/copy";
import { DESKTOP_LAYOUT_MEDIA_QUERY } from "@/lib/device/breakpoints";
import { FLOW_STEP_COUNT } from "@/lib/home/sections";
import { scrollToFeaturesStep } from "@/lib/scroll-to-section";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useState } from "react";

const STEPS = COPY.features.steps;

const FLOW_BACKGROUNDS = [
  "/flow/Define-bg.jpg",
  "/flow/Plan-bg.jpg",
  "/flow/Collaborate-bg.jpg",
] as const;

const DEFINE_STEP_INDEX = 0;
const PLAN_STEP_INDEX = 1;
const COLLABORATE_STEP_INDEX = 2;

type FlowStep = (typeof STEPS)[number];

function getScrollStep(stepProgress: number) {
  return Math.min(
    FLOW_STEP_COUNT - 1,
    Math.floor(stepProgress * FLOW_STEP_COUNT),
  );
}

function FlowStepTab({
  step,
  index,
  isActive,
  onSelect,
}: {
  step: FlowStep;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      id={`flow-step-${index}`}
      aria-controls="flow-mockup-panel"
      onClick={onSelect}
      className={cn(
        "flex w-full flex-col gap-2 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-section",
        "transition-opacity duration-300 ease-out",
        isActive
          ? "cursor-default opacity-100"
          : "cursor-pointer opacity-40 hover:opacity-70",
      )}
    >
      <span
        className={cn(
          "text-primary transition-[font-size,line-height] duration-300 ease-out",
          isActive ? "text-xl leading-7 md:text-2xl md:leading-8" : "text-lg leading-6",
        )}
      >
        {step.eyebrow}
      </span>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <span
            aria-hidden={!isActive}
            className={cn(
              "block whitespace-pre-line text-body-md leading-normal text-secondary transition-opacity duration-300 ease-out md:leading-[1.5]",
              isActive ? "opacity-100" : "opacity-0",
            )}
          >
            {step.body}
          </span>
        </div>
      </div>
    </button>
  );
}

type FeaturesContentProps = {
  stepProgress?: number;
};

export function FeaturesContent({ stepProgress = 0 }: FeaturesContentProps) {
  const reducedMotion = useReducedMotion();
  const isDesktopLayout = useMediaQuery(DESKTOP_LAYOUT_MEDIA_QUERY);
  const scrollStep = reducedMotion ? 0 : getScrollStep(stepProgress);
  const [overrideStep, setOverrideStep] = useState<number | null>(null);

  const effectiveOverride =
    overrideStep !== null && overrideStep !== scrollStep ? overrideStep : null;
  const activeStep = effectiveOverride ?? scrollStep;

  const handleStepSelect = (index: number) => {
    if (index === activeStep) return;

    setOverrideStep(index);
    if (!reducedMotion && isDesktopLayout) {
      scrollToFeaturesStep(index, { smooth: true });
    }
  };

  return (
    <SectionShell variant="standard" className="min-h-0 justify-center">
      <ContentRail
        width="content"
        align="center"
        className="section-intro w-full shrink-0"
      >
        {isDesktopLayout ? (
          <>
            <SectionHeader
              layout="split"
              headline={COPY.mockup.headline}
              action={
                <CtaButton
                  size="section"
                  className="hidden w-fit shrink-0 md:inline-flex"
                />
              }
            />

            <div className="flex w-full min-h-0 flex-col gap-4 md:flex-row md:items-stretch md:gap-8">
              <div
                role="tablist"
                aria-label="Product flow"
                className="flex shrink-0 flex-col gap-3 md:w-[17.5625rem] md:gap-4"
              >
                {STEPS.map((step, index) => (
                  <FlowStepTab
                    key={step.eyebrow}
                    step={step}
                    index={index}
                    isActive={index === activeStep}
                    onSelect={() => handleStepSelect(index)}
                  />
                ))}
              </div>

              <div
                id="flow-mockup-panel"
                role="tabpanel"
                aria-labelledby={`flow-step-${activeStep}`}
                className="flex min-h-0 w-full min-w-0 flex-1 flex-col"
              >
                <ImageFrame
                  preset="flow"
                  src={FLOW_BACKGROUNDS}
                  activeIndex={activeStep}
                  priority
                >
                  {activeStep === DEFINE_STEP_INDEX ? (
                    <DefineMockup
                      isPlaying
                      background="image"
                      className="absolute inset-0"
                    />
                  ) : null}
                  {activeStep === PLAN_STEP_INDEX ? (
                    <PlanMockup
                      isPlaying
                      background="image"
                      className="absolute inset-0"
                    />
                  ) : null}
                  {activeStep === COLLABORATE_STEP_INDEX ? (
                    <CollaborateMockup
                      isPlaying
                      background="image"
                      className="absolute inset-0"
                    />
                  ) : null}
                </ImageFrame>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <SectionHeader
                layout="split"
                headline={COPY.mockup.headline}
                action={
                  <CtaButton
                    size="section"
                    className="hidden w-fit shrink-0 md:inline-flex"
                  />
                }
              />
              <FlowCarousel />
            </div>
            <CtaButton size="section" className="h-10 w-full md:hidden" />
          </>
        )}
      </ContentRail>
    </SectionShell>
  );
}
