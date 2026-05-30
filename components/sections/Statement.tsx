"use client";

import { useRef } from "react";
import { PageSection } from "@/components/layout/PageSection";
import { RevealBlock, RevealWords } from "@/components/motion/RevealWords";
import { COPY } from "@/lib/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { mapStatementScrollProgress } from "@/lib/motion/word-reveal";

const SCROLL_RANGE_VH = 2.25;

export function Statement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const rawProgress = useScrollProgress(sectionRef);
  const progress = reducedMotion
    ? 1
    : mapStatementScrollProgress(rawProgress);

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
              : "sticky top-0 flex min-h-svh w-full flex-col items-center justify-center py-section-responsive"
          }
        >
          <div className="w-full max-w-[32rem] px-gutter text-center">
            <RevealWords
              as="h2"
              lines={COPY.statement.headlineLines}
              progress={progress}
              className="text-h2 w-full leading-[1.3] text-primary"
            />
            <RevealBlock progress={progress} className="mt-4 block w-full">
              <p className="text-body-lg block w-full leading-normal text-secondary">
                {COPY.statement.body}
              </p>
            </RevealBlock>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
