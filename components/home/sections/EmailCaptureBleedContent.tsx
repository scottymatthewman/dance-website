"use client";

import { EmailCaptureForm } from "@/components/ui/EmailCaptureForm";
import { SectionHeader } from "@/components/home/sections/SectionHeader";
import { SectionShell } from "@/components/home/sections/SectionShell";
import { COPY } from "@/lib/copy";

export function EmailCaptureBleedContent() {
  const { headline, subhead, image, imageMobile } = COPY.emailCaptureBleed;

  return (
    <SectionShell className="relative h-full min-h-0">
      <picture className="absolute inset-0 block size-full">
        <source media="(min-width: 48rem)" srcSet={image} />
        <img
          src={imageMobile}
          alt=""
          width={1164}
          height={2292}
          decoding="async"
          draggable={false}
          className="size-full object-cover md:object-[66%_50%] lg:object-center"
        />
      </picture>
      <div className="relative flex h-full min-h-0 flex-col items-center justify-start px-[var(--gutter)] py-12 text-center md:items-stretch md:justify-center md:py-16 md:text-left">
        <div className="section-intro w-full max-w-prose">
          <SectionHeader
            headline={headline}
            subhead={subhead}
            headlineClassName="text-white"
            className="[&_.text-subhead]:text-white [&_.section-copy]:mx-auto [&_.section-copy]:items-center [&_.section-copy]:text-center md:[&_.section-copy]:mx-0 md:[&_.section-copy]:items-start md:[&_.section-copy]:text-left"
          />
          <EmailCaptureForm
            variant="overlay"
            inputId="waitlist-email-bleed"
            className="mx-auto w-full max-w-[24rem] md:mx-0"
          />
        </div>
      </div>
    </SectionShell>
  );
}
