"use client";

import { ContentRail } from "@/components/home/sections/ContentRail";
import { SectionHeader } from "@/components/home/sections/SectionHeader";
import { SectionShell } from "@/components/home/sections/SectionShell";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { COPY } from "@/lib/copy";

export function FaqContent() {
  const { headline, subhead, items } = COPY.faq;

  return (
    <SectionShell variant="standard">
      <ContentRail
        width="content"
        align="left"
        className="flex flex-col gap-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-20"
      >
        <div className="min-w-0 lg:col-span-1 [&_.section-copy]:lg:max-w-none [&_h2]:lg:max-w-none">
          <SectionHeader headline={headline} subhead={subhead} />
        </div>
        <FaqAccordion items={items} className="min-w-0 lg:col-span-3" />
      </ContentRail>
    </SectionShell>
  );
}
