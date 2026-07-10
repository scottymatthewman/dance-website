"use client";

import { EmailCaptureForm } from "@/components/ui/EmailCaptureForm";
import { SectionCopy } from "@/components/home/sections/SectionCopy";
import { COPY } from "@/lib/copy";

export function EmailCaptureContent() {
  const { headline, subhead, image } = COPY.emailCapture;

  return (
    <div className="grid h-full min-h-0 grid-cols-1 md:grid-cols-2">
      <div className="relative min-h-[20rem] overflow-hidden md:min-h-0 md:h-full">
        <img
          src={image}
          alt=""
          decoding="async"
          draggable={false}
          className="size-full object-cover"
        />
      </div>
      <div className="section-inset section-inset--cta flex h-full min-h-0 flex-col justify-center">
        <div className="section-intro">
          <SectionCopy headline={headline} subhead={subhead} />
          <EmailCaptureForm className="w-full max-w-[36rem]" />
        </div>
      </div>
    </div>
  );
}
