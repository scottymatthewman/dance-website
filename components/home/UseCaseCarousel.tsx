"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { UseCaseInterestForm } from "@/components/home/UseCaseInterestForm";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { COPY } from "@/lib/copy";

const USE_CASE_ITEMS = COPY.useCases.items;
const USE_CASE_CTA = COPY.useCases.ctaCard;

function UseCaseCard({
  item,
  priority = false,
}: {
  item: (typeof USE_CASE_ITEMS)[number];
  priority?: boolean;
}) {
  return (
    <article className="w-[min(28.125rem,85vw)] shrink-0 snap-start">
      <ImageFrame
        src={item.image}
        alt={`${item.title} event use case`}
        priority={priority}
        unoptimized
        sizes="(min-width: 1024px) 450px, 85vw"
        className="w-full"
        innerClassName="h-[min(30rem,calc(100dvh-14rem))]"
      >
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-4 sm:p-6">
          <p className="text-xl font-normal leading-normal text-white">
            {item.title}
          </p>
          <p className="text-[0.9375rem] leading-normal text-[#DDDDDD]">
            {item.body}
          </p>
        </div>
      </ImageFrame>
    </article>
  );
}

function UseCaseCtaCard() {
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error" | "rateLimited"
  >("idle");

  return (
    <article className="w-[min(28.125rem,85vw)] shrink-0 snap-start">
      <div className="relative h-[min(30rem,calc(100dvh-14rem))] w-full overflow-hidden rounded-[6px] media-inner-stroke">
        <div className="flex h-full flex-col items-center justify-center gap-5 bg-[#edebe9] p-4 text-center sm:p-6">
          {showForm ? (
            <UseCaseInterestForm
              title={formStatus !== "success" ? USE_CASE_CTA.title : undefined}
              onStatusChange={setFormStatus}
            />
          ) : (
            <>
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg font-medium leading-normal text-primary">
                  {USE_CASE_CTA.title}
                </p>
                <p className="max-w-[14.75rem] text-[0.9375rem] leading-normal text-[#555555]">
                  {USE_CASE_CTA.body}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  posthog.capture("use_case_interest_form_opened");
                  setShowForm(true);
                }}
              >
                {USE_CASE_CTA.cta}
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export function UseCaseCarousel() {
  return (
    <div
      className="use-case-carousel -mx-[var(--gutter)] snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-pl-[var(--gutter)] px-[var(--gutter)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Event use cases"
    >
      <div className="flex w-max gap-2 pb-1">
        {USE_CASE_ITEMS.map((item, index) => (
          <UseCaseCard key={item.id} item={item} priority={index === 0} />
        ))}
        <UseCaseCtaCard />
      </div>
    </div>
  );
}
