"use client";

import {
  GridPixels,
  RotatingPixels,
  SlidingPixels,
} from "@/components/home/PixelLoops";
import { ContentRail } from "@/components/home/sections/ContentRail";
import { SectionShell } from "@/components/home/sections/SectionShell";
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
    <SectionShell variant="headingless">
      <ContentRail
        width="content"
        align="center"
        className="flex flex-col gap-[6px] lg:flex-row lg:items-stretch"
      >
        {BENEFIT_ITEMS.map((item, index) => (
          <article
            key={item.title}
            className="flex min-w-0 flex-1 flex-row items-start gap-3 rounded-[6px] bg-[#f5f5f5] p-5 sm:gap-4 sm:p-8"
          >
            <div className="shrink-0">{BENEFIT_ICONS[index]}</div>
            <div className="flex min-w-0 flex-col gap-2">
              <h3 className="text-h3 flex h-7 items-center font-medium leading-none text-primary">
                {item.title}
              </h3>
              <p className="text-body-md leading-normal text-secondary lg:leading-[1.5]">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </ContentRail>
    </SectionShell>
  );
}
