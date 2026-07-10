"use client";

import { EmailCaptureForm } from "@/components/ui/EmailCaptureForm";
import { SectionHeader } from "@/components/home/sections/SectionHeader";
import { SectionShell } from "@/components/home/sections/SectionShell";
import { COPY } from "@/lib/copy";

export function EmailCaptureContent() {
  const { headline, subhead, image } = COPY.emailCapture;

  return (
    <SectionShell variant="split-media" className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative min-h-[20rem] overflow-hidden md:min-h-0 md:h-full">
        <img
          src={image}
          alt=""
          decoding="async"
          draggable={false}
          className="size-full object-cover"
        />
      </div>
      <div className="section-inset section-inset--default flex h-full min-h-0 flex-col justify-center">
        <div className="section-intro">
          <SectionHeader headline={headline} subhead={subhead} />
          <EmailCaptureForm className="w-full max-w-prose" />
        </div>
      </div>
    </SectionShell>
  );
}
