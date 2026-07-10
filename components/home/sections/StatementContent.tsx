"use client";

import { RevealBlock, RevealWords } from "@/components/motion/RevealWords";
import { CtaButton } from "@/components/ui/CtaButton";
import { COPY } from "@/lib/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { mapStatementScrollProgress } from "@/lib/motion/word-reveal";

type StatementContentProps = {
  entryProgress: number;
};

export function StatementContent({ entryProgress }: StatementContentProps) {
  const reducedMotion = useReducedMotion();
  const progress = reducedMotion
    ? 1
    : mapStatementScrollProgress(entryProgress);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex w-full max-w-[40.625rem] flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
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
      </div>
    </div>
  );
}
