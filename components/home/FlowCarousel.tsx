"use client";

import { CollaborateMockup } from "@/components/home/CollaborateMockupLazy";
import { DefineMockup } from "@/components/home/DefineMockupLazy";
import { PlanMockup } from "@/components/home/PlanMockupLazy";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { COPY } from "@/lib/copy";

const STEPS = COPY.features.steps;

const FLOW_BACKGROUNDS = [
  "/flow/Define-bg.jpg",
  "/flow/Plan-bg.jpg",
  "/flow/Collaborate-bg.jpg",
] as const;

const FLOW_MOCKUPS = [DefineMockup, PlanMockup, CollaborateMockup] as const;

const FLOW_CARD_WIDTH = "w-[min(28.125rem,85vw)]";

function FlowStepCard({
  step,
  index,
  priority = false,
}: {
  step: (typeof STEPS)[number];
  index: number;
  priority?: boolean;
}) {
  const Mockup = FLOW_MOCKUPS[index];

  return (
    <article className={`${FLOW_CARD_WIDTH} shrink-0 snap-start self-stretch`}>
      <div className="flex h-full flex-col gap-3 rounded-[6px] bg-[#f5f5f5] p-3">
        <div className="flex shrink-0 flex-col gap-2">
          <h3 className="text-xl leading-6 text-primary">{step.eyebrow}</h3>
          <p className="whitespace-pre-line text-[0.9375rem] leading-normal text-secondary">
            {step.body}
          </p>
        </div>
        <ImageFrame
          src={FLOW_BACKGROUNDS[index]}
          priority={priority}
          sizes="(min-width: 1024px) 450px, 85vw"
          className="min-h-[10rem] w-full flex-1"
        >
          <Mockup isPlaying background="image" className="absolute inset-0" />
        </ImageFrame>
      </div>
    </article>
  );
}

export function FlowCarousel() {
  return (
    <div
      className="flow-carousel -mx-[var(--gutter)] snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-pl-[var(--gutter)] px-[var(--gutter)] touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Product flow"
    >
      <div className="flex w-max items-stretch gap-2 pb-1">
        {STEPS.map((step, index) => (
          <FlowStepCard
            key={step.eyebrow}
            step={step}
            index={index}
            priority={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
