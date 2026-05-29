"use client";

import { useRef } from "react";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { RevealBlock, RevealWords } from "@/components/motion/RevealWords";
import { COPY } from "@/lib/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const SCROLL_RANGE_VH = 1.5;

export function Statement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const rawProgress = useScrollProgress(sectionRef);
  const progress = reducedMotion ? 1 : rawProgress;

  return (
    <PageSection variant="contained" background="section" className="!py-0">
      <div
        ref={sectionRef}
        className="relative"
        style={{
          minHeight: reducedMotion
            ? undefined
            : `${100 + SCROLL_RANGE_VH * 100}vh`,
        }}
      >
        <div
          className={
            reducedMotion
              ? "py-section-responsive"
              : "sticky top-0 flex min-h-screen items-center py-section-responsive"
          }
        >
          <ContentContainer className="flex flex-col items-center gap-4 text-center">
            <RevealWords
              as="h2"
              lines={COPY.statement.headlineLines}
              progress={progress}
              className="text-h2 w-full max-w-narrow leading-[1.3] text-primary"
            />
            <RevealBlock progress={progress} className="w-full max-w-[40rem]">
              <p className="text-body-lg w-full leading-normal text-secondary">
                {COPY.statement.body}
              </p>
            </RevealBlock>
          </ContentContainer>
        </div>
      </div>
    </PageSection>
  );
}
