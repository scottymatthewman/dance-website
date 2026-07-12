"use client";

import { ContentRail } from "@/components/home/sections/ContentRail";
import { SectionHeader } from "@/components/home/sections/SectionHeader";
import { SectionShell } from "@/components/home/sections/SectionShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { COPY } from "@/lib/copy";

const { headline, subhead, promptLabel, othersLabel, danceLabel, footerHeadline, items } =
  COPY.differentiator;

export function DifferentiatorContent() {
  return (
    <SectionShell variant="standard">
      <ContentRail width="content" align="left" className="flex flex-col gap-8">
        <SectionHeader headline={headline} subhead={subhead} />

        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <article
              key={item.prompt}
              className="flex flex-col gap-4 rounded-[6px] bg-[#f5f5f5] p-5 sm:p-8"
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium leading-normal text-secondary">
                  {promptLabel}
                </p>
                <h3 className="text-h3 font-medium leading-snug text-primary">
                  {item.prompt}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                <div className="flex min-w-0 flex-col gap-2 rounded-[4px] bg-white/60 p-4 sm:p-5">
                  <p className="text-sm font-medium leading-normal text-secondary">
                    {othersLabel}
                  </p>
                  <p className="text-body-md leading-normal text-secondary md:leading-[1.5]">
                    &ldquo;{item.others}&rdquo;
                  </p>
                </div>

                <div className="flex min-w-0 flex-col gap-3 rounded-[4px] bg-white p-4 sm:p-5">
                  <p className="text-sm font-medium leading-normal text-primary">
                    {danceLabel}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {item.danceSteps.map((step) => (
                      <li
                        key={step}
                        className="text-body-md leading-normal text-secondary md:leading-[1.5]"
                      >
                        {step}
                      </li>
                    ))}
                  </ul>
                  <p className="text-body-md font-medium leading-normal text-primary md:leading-[1.5]">
                    {item.danceResult}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <h3 className="text-h3 min-w-0 font-medium leading-snug text-primary">
            {footerHeadline}
          </h3>
          <CtaButton size="section" className="w-full shrink-0 sm:w-fit" />
        </div>
      </ContentRail>
    </SectionShell>
  );
}
