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
        className="flex flex-col gap-12 md:flex-row md:items-stretch md:gap-12"
      >
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
              <h3 className="text-h3 font-medium leading-[1.3] text-primary">
                {item.title}
              </h3>
              <p className="text-body-md leading-normal text-secondary md:leading-[1.5]">
                {item.body}
              </p>
            </article>
          </div>
        ))}
      </ContentRail>
    </SectionShell>
  );
}
