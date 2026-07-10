"use client";

import {
  GridPixels,
  RotatingPixels,
  SlidingPixels,
} from "@/components/home/PixelLoops";
import { COPY } from "@/lib/copy";
import type { ReactNode } from "react";

const BENEFIT_ITEMS = COPY.benefits.items;

const BENEFIT_ICONS: ReactNode[] = [
  <RotatingPixels key="rotating" />,
  <SlidingPixels key="sliding" />,
  <GridPixels key="grid" />,
];

export function BenefitsContent() {
  return (
    <div className="relative mx-auto flex w-full max-w-[75rem] flex-col gap-12 md:flex-row md:items-stretch md:gap-12">
      {BENEFIT_ITEMS.map((item, index) => (
        <div key={item.title} className="contents">
          {index > 0 ? (
            <div
              aria-hidden
              className="hidden w-px shrink-0 self-stretch bg-border-subtle md:block"
            />
          ) : null}
          <article className="flex min-w-0 flex-1 flex-col gap-2">
            {BENEFIT_ICONS[index]}
            <h3 className="text-[1.25rem] font-medium leading-[1.3] text-primary">
              {item.title}
            </h3>
            <p className="text-[0.9375rem] leading-normal text-secondary md:leading-[1.5]">
              {item.body}
            </p>
          </article>
        </div>
      ))}
    </div>
  );
}
