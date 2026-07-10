"use client";

import { UseCaseCarousel } from "@/components/home/UseCaseCarousel";
import { SectionCopy } from "@/components/home/sections/SectionCopy";
import { COPY } from "@/lib/copy";

export function UseCasesContent() {
  const { headline, subhead } = COPY.useCases;

  return (
    <div className="flex h-full min-h-0 flex-col justify-center">
      <div className="section-intro w-full">
        <SectionCopy headline={headline} subhead={subhead} />
        <UseCaseCarousel />
      </div>
    </div>
  );
}
