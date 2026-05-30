"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import { DetectCustomerDetailMockup } from "@/components/sections/DetectCustomerDetailMockup";
import { MeasureChartMockup } from "@/components/sections/MeasureChartMockup";
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

const STEP_IMAGES: readonly (string | null)[] = [
  "/product-flow/monitor-img.png",
  null,
  "/product-flow/act-img.png",
  null,
];

const STEP_MOCKUPS: readonly (ComponentType | null)[] = [
  null,
  DetectCustomerDetailMockup,
  null,
  MeasureChartMockup,
];

type ProductFlowPreviewProps = {
  activeIndex: number;
  className?: string;
  variant?: "inline" | "desktop";
};

export function ProductFlowPreview({
  activeIndex,
  className,
  variant = "inline",
}: ProductFlowPreviewProps) {
  return (
    <MockupFrame
      variant="feature"
      interactive={false}
      className={cn(
        "transform-none border-0 w-full min-h-[28rem]",
        variant === "desktop" &&
          "aspect-[10/11] h-auto max-h-[75svh] min-h-0 w-full",
        className,
      )}
    >
      <div className="absolute inset-0">
        {STEPS.map((step, index) => {
          const imageSrc = STEP_IMAGES[index];
          const StepMockup = STEP_MOCKUPS[index];
          const hasVisual = Boolean(imageSrc || StepMockup);

          return (
            <div
              key={step.eyebrow}
              aria-hidden={index !== activeIndex}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-out",
                index === activeIndex ? "opacity-100" : "opacity-0",
                !hasVisual && "bg-mockup bg-cover bg-center",
              )}
              style={
                hasVisual
                  ? undefined
                  : {
                      backgroundImage:
                        STEP_PREVIEW_FILLS[index] ?? STEP_PREVIEW_FILLS[0],
                    }
              }
            >
              {StepMockup ? <StepMockup /> : null}
              {imageSrc ? (
                <Image
                  alt=""
                  aria-hidden
                  className="object-cover object-top"
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  src={imageSrc}
                  unoptimized
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </MockupFrame>
  );
}
