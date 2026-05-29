"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { ProductFlowPreview } from "@/components/sections/ProductFlowPreview";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STEPS = COPY.productFlow.steps;

function getFocusedPanelIndex(panels: HTMLElement[]): number {
  const viewportCenter = window.innerHeight / 2;
  let focusedIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  panels.forEach((panel, index) => {
    const rect = panel.getBoundingClientRect();
    const panelCenter = rect.top + rect.height / 2;
    const distance = Math.abs(panelCenter - viewportCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      focusedIndex = index;
    }
  });

  return focusedIndex;
}

function StepPanel({
  step,
  stepIndex,
  isActive,
  panelRef,
  showMockup,
  magneticScroll,
}: {
  step: (typeof STEPS)[number];
  stepIndex: number;
  isActive: boolean;
  panelRef: (el: HTMLElement | null) => void;
  showMockup: boolean;
  magneticScroll: boolean;
}) {
  const contentVisible = !magneticScroll || isActive;

  return (
    <article
      ref={panelRef}
      className={cn(
        "product-flow-step flex flex-col",
        magneticScroll
          ? "min-h-svh snap-center snap-always justify-center py-section md:py-section-md"
          : "gap-6",
      )}
      aria-current={magneticScroll && isActive ? "step" : undefined}
    >
      <div
        className={cn(
          "flex flex-col gap-6",
          magneticScroll &&
            "transition-[opacity,transform] duration-500 ease-out will-change-[opacity,transform]",
          contentVisible
            ? magneticScroll
              ? "translate-y-0 opacity-100"
              : undefined
            : "pointer-events-none translate-y-6 opacity-0",
        )}
      >
        <div className="flex flex-col gap-3">
          <p className="text-eyebrow font-medium uppercase tracking-[0.2em] text-label">
            {step.eyebrow}
          </p>
          <h2 className="text-h2 max-w-prose leading-[1.3] text-primary">
            {step.headline}
          </h2>
        </div>
        <p className="text-body-lg max-w-prose leading-normal text-secondary">
          {step.body}
        </p>
        {showMockup && contentVisible ? (
          <ProductFlowPreview
            activeIndex={stepIndex}
            className="mt-2 w-full lg:hidden"
          />
        ) : null}
      </div>
    </article>
  );
}

export function ProductFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const magneticScroll = isDesktop && !reducedMotion;

  const updateFocusedPanel = useCallback(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
    if (panels.length === 0) return;
    setActiveIndex(getFocusedPanelIndex(panels));
  }, []);

  useEffect(() => {
    if (!magneticScroll) return;

    updateFocusedPanel();
    window.addEventListener("scroll", updateFocusedPanel, { passive: true });
    window.addEventListener("resize", updateFocusedPanel);
    return () => {
      window.removeEventListener("scroll", updateFocusedPanel);
      window.removeEventListener("resize", updateFocusedPanel);
    };
  }, [magneticScroll, updateFocusedPanel]);

  useEffect(() => {
    if (!magneticScroll) return;
    document.documentElement.classList.add("product-flow-snap-root");
    return () => {
      document.documentElement.classList.remove("product-flow-snap-root");
    };
  }, [magneticScroll]);

  if (reducedMotion) {
    return (
      <section
        className="bg-section py-section md:py-section-md"
        aria-label="Product capabilities"
      >
        <ContentContainer className="flex flex-col gap-stack-lg max-lg:gap-[calc(var(--spacing-stack-lg)+2.25rem)]">
          {STEPS.map((step, index) => (
            <StepPanel
              key={step.eyebrow}
              step={step}
              stepIndex={index}
              isActive
              panelRef={() => {}}
              showMockup
              magneticScroll={false}
            />
          ))}
        </ContentContainer>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "bg-section",
        magneticScroll ? "product-flow-snap" : "py-section md:py-section-md",
      )}
      aria-label="Product capabilities"
    >
      <ContentContainer className="lg:px-gutter">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="relative hidden lg:block">
            <div className="sticky top-0 flex h-svh items-center">
              <ProductFlowPreview
                activeIndex={activeIndex}
                className="w-full"
              />
            </div>
          </div>

          <div
            className={cn(
              !magneticScroll &&
                "flex flex-col gap-stack-lg max-lg:gap-[calc(var(--spacing-stack-lg)+2.25rem)]",
            )}
          >
            {STEPS.map((step, index) => (
              <StepPanel
                key={step.eyebrow}
                step={step}
                stepIndex={index}
                isActive={index === activeIndex}
                panelRef={(el) => {
                  panelRefs.current[index] = el;
                }}
                showMockup
                magneticScroll={magneticScroll}
              />
            ))}
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
