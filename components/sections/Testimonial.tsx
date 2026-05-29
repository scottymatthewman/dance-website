"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { RevealWords } from "@/components/motion/RevealWords";
import { COPY } from "@/lib/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const SCROLL_RANGE_VH = 1.5;

const SECTION_PADDING =
  "pt-[calc(var(--section-y)/2+1.5rem)] pb-[var(--section-y)] md:pt-[calc(var(--section-y-md)/2+1.5rem)] md:pb-[var(--section-y-md)] lg:pt-[calc(var(--section-y-lg)/2)] lg:pb-[var(--section-y-lg)] xl:pt-[calc(var(--section-y-xl)/2)] xl:pb-[var(--section-y-xl)]";

const TESTIMONIAL_PHOTO = {
  src: "/testimonial/headshot.png",
  width: 682,
  height: 1024,
} as const;

const TESTIMONIAL_LOGO = {
  src: "/testimonial/dance-logo.svg",
  width: 354,
  height: 72,
} as const;

export function Testimonial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const rawProgress = useScrollProgress(sectionRef);
  const progress = reducedMotion ? 1 : rawProgress;
  const quoteWords = useMemo(
    () => COPY.testimonial.quote.split(/\s+/).filter(Boolean),
    [],
  );

  return (
    <PageSection variant="contained" background="section" className="!py-0">
      <div
        ref={sectionRef}
        className="relative"
        style={{
          minHeight: reducedMotion
            ? undefined
            : `${100 + SCROLL_RANGE_VH * 100}vh`,
        }}
      >
        <div
          className={
            reducedMotion
              ? SECTION_PADDING
              : `sticky top-0 flex min-h-screen items-center ${SECTION_PADDING}`
          }
        >
          <ContentContainer>
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-stretch lg:justify-center">
              <div className="relative h-[calc(31.25rem*0.6)] w-full max-w-[calc(27.5rem*0.6)] shrink-0 overflow-hidden rounded-lg border border-border-subtle md:h-[calc(31.25rem*0.8)] md:max-w-[calc(27.5rem*0.8)] lg:h-[31.25rem] lg:max-w-[27.5rem]">
                <Image
                  alt={`${COPY.testimonial.name}, ${COPY.testimonial.role}`}
                  className="object-cover object-top"
                  fill
                  sizes="(min-width: 1024px) 440px, (min-width: 768px) 352px, 264px"
                  src={TESTIMONIAL_PHOTO.src}
                  unoptimized
                />
              </div>
              <figure className="flex w-full max-w-[31.125rem] flex-col justify-start gap-9 py-2 lg:min-h-[31.25rem] lg:justify-between lg:gap-0">
                <div className="flex flex-col gap-4">
                  <blockquote className="text-quote leading-[1.3] text-tertiary">
                    <span aria-hidden>&ldquo;</span>
                    <RevealWords
                      as="span"
                      progress={progress}
                      variant="color"
                      words={quoteWords}
                    />
                    <span aria-hidden>&rdquo;</span>
                  </blockquote>
                  <p className="text-attribution leading-normal text-primary">
                    – {COPY.testimonial.name}{" "}
                    <span className="text-secondary">{COPY.testimonial.role}</span>
                  </p>
                </div>
                <figcaption>
                  <Image
                    alt={`${COPY.testimonial.company} logo`}
                    className="h-6 w-auto md:h-8 lg:h-10"
                    height={TESTIMONIAL_LOGO.height}
                    src={TESTIMONIAL_LOGO.src}
                    unoptimized
                    width={TESTIMONIAL_LOGO.width}
                  />
                </figcaption>
              </figure>
            </div>
          </ContentContainer>
        </div>
      </div>
    </PageSection>
  );
}
