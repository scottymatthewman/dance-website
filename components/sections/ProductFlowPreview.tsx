"use client";

import { MockupFrame } from "@/components/ui/MockupFrame";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/cn";

const STEPS = COPY.productFlow.steps;

/** Placeholder fills until step screenshots are wired in copy. */
const STEP_PREVIEW_FILLS: readonly string[] = [
  "radial-gradient(140% 120% at 20% 0%, #1e3a4a 0%, #000000 65%)",
  "radial-gradient(140% 120% at 80% 0%, #3d2a4a 0%, #000000 65%)",
  "radial-gradient(140% 120% at 50% 100%, #1a3d32 0%, #000000 65%)",
  "radial-gradient(140% 120% at 50% 50%, #2a2a45 0%, #000000 70%)",
];

type ProductFlowPreviewProps = {
  activeIndex: number;
  className?: string;
};

export function ProductFlowPreview({
  activeIndex,
  className,
}: ProductFlowPreviewProps) {
  const activeStep = STEPS[activeIndex] ?? STEPS[0];

  return (
    <MockupFrame
      variant="feature"
      title={activeStep.eyebrow}
      className={className}
    >
      <div className="absolute inset-0">
        {STEPS.map((step, index) => (
          <div
            key={step.eyebrow}
            aria-hidden={index !== activeIndex}
            className={cn(
              "absolute inset-0 bg-mockup bg-cover bg-center transition-opacity duration-500 ease-out",
              index === activeIndex ? "opacity-100" : "opacity-0",
            )}
            style={{
              backgroundImage: STEP_PREVIEW_FILLS[index] ?? STEP_PREVIEW_FILLS[0],
            }}
          />
        ))}
      </div>
    </MockupFrame>
  );
}
