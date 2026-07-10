"use client";

import { DanceLogo } from "@/components/ui/DanceLogo";
import { EmailCaptureForm } from "@/components/ui/EmailCaptureForm";
import { COPY } from "@/lib/copy";

export function FooterContent() {
  return (
    <div className="flex h-full min-h-0 flex-col justify-between px-[calc(var(--gutter)/2)] pt-6 md:px-6">
      <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0 space-y-4">
          <p className="text-sm font-medium leading-normal text-primary">
            {COPY.footer.label}
          </p>
          <EmailCaptureForm
            className="w-full max-w-[24rem]"
            inputId="footer-waitlist-email"
            buttonLabel={COPY.footer.waitlistButton}
          />
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {COPY.footer.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-left text-[14px] font-normal leading-normal text-secondary"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="flex w-full shrink-0 justify-center pt-6">
        <DanceLogo className="shrink-0 text-[#BBBBBB]" />
      </div>
    </div>
  );
}
