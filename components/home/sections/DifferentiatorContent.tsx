"use client";

import { Fragment } from "react";
import { ContentRail } from "@/components/home/sections/ContentRail";
import { SectionHeader } from "@/components/home/sections/SectionHeader";
import { SectionShell } from "@/components/home/sections/SectionShell";
import { AgentFlowMockup } from "@/components/home/differentiator/AgentFlowMockup";
import { CtaButton } from "@/components/ui/CtaButton";
import { COPY } from "@/lib/copy";

const { headline, subhead, promptLabel, othersLabel, danceLabel, footerHeadline, items } =
  COPY.differentiator;

export function DifferentiatorContent() {
  return (
    <SectionShell variant="standard">
      <ContentRail width="content" align="left" className="flex flex-col gap-8">
        <SectionHeader headline={headline} subhead={subhead} />

        <div className="flex flex-col gap-0 rounded-[6px] bg-[#f5f5f5]">
          {items.map((item, index) => (
            <Fragment key={item.prompt}>
              {index > 0 ? (
                <div aria-hidden className="px-5 sm:px-8">
                  <div className="h-px bg-border-subtle" />
                </div>
              ) : null}
              <article className="flex flex-col gap-4 p-5 sm:p-8">
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
                  <AgentFlowMockup
                    flowIndex={index}
                    className="mx-auto w-[70%]"
                  />
                </div>
              </div>
              </article>
            </Fragment>
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
