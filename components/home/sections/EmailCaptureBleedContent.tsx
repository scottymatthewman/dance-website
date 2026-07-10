"use client";

import { EmailCaptureForm } from "@/components/ui/EmailCaptureForm";
import { SectionHeader } from "@/components/home/sections/SectionHeader";
import { SectionShell } from "@/components/home/sections/SectionShell";
import { COPY } from "@/lib/copy";

export function EmailCaptureBleedContent() {
  const { headline, subhead, image } = COPY.emailCaptureBleed;

  return (
    <SectionShell className="relative h-full min-h-0">
      <img
        src={image}
        alt=""
        decoding="async"
        draggable={false}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="relative flex h-full min-h-0 flex-col justify-center px-[var(--gutter)] py-12 md:py-16">
        <div className="section-intro w-full max-w-prose">
          <SectionHeader
            headline={headline}
            subhead={subhead}
            headlineClassName="text-white"
            className="[&_.text-subhead]:text-white"
          />
          <EmailCaptureForm
            variant="overlay"
            inputId="waitlist-email-bleed"
            className="w-full max-w-[24rem]"
          />
        </div>
      </div>
    </SectionShell>
  );
}
