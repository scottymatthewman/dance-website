"use client";

import { UseCaseCarousel } from "@/components/home/UseCaseCarousel";
import { SectionHeader } from "@/components/home/sections/SectionHeader";
import { SectionShell } from "@/components/home/sections/SectionShell";
import { COPY } from "@/lib/copy";

export function UseCasesContent() {
  const { headline, subhead } = COPY.useCases;

  return (
    <SectionShell variant="standard" className="justify-center">
      <div className="section-intro w-full shrink-0">
        <SectionHeader headline={headline} subhead={subhead} />
        <UseCaseCarousel />
      </div>
    </SectionShell>
  );
}
