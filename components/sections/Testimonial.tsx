"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { SiteFrameCell, SiteFrameSection } from "@/components/layout/SiteFrame";
import { RevealWords } from "@/components/motion/RevealWords";
import { COPY } from "@/lib/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { mapTestimonialScrollProgress } from "@/lib/motion/word-reveal";

const SCROLL_RANGE_VH = 1.5;

const SECTION_PADDING =
  "pt-[calc(var(--section-y)/8+0.375rem)] pb-[var(--section-y)] md:pt-[calc(var(--section-y-md)/8+0.375rem)] md:pb-[var(--section-y-md)] lg:pt-[calc(var(--section-y-lg)/8)] lg:pb-[var(--section-y-lg)] xl:pt-[calc(var(--section-y-xl)/8)] xl:pb-[var(--section-y-xl)]";

const TESTIMONIAL_PHOTO = {
  src: "/testimonial/headshot.png",
  width: 682,
  height: 1024,
} as const;

const TESTIMONIAL_LOGO = {
  src: "/product-flow/northwind-logo.png",
  width: 200,
  height: 48,
} as const;

export function Testimonial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const rawProgress = useScrollProgress(sectionRef);
  const progress = reducedMotion ? 1 : mapTestimonialScrollProgress(rawProgress);
  const quoteWords = useMemo(
    () => COPY.testimonial.quote.split(/\s+/).filter(Boolean),
    [],
  );

  return (
    <div
      ref={sectionRef}
      className="relative bg-section"
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
            : `sticky top-0 flex min-h-screen w-full items-center ${SECTION_PADDING}`
        }
      >
        <SiteFrameSection ruled ruledBottom className="w-full">
          <div className="grid grid-cols-1 gap-9 md:grid-cols-2 md:max-lg:items-stretch md:gap-0 md:divide-x md:divide-border-subtle">
            <SiteFrameCell className="flex items-center justify-start max-sm:!pt-[3.25rem] md:justify-center md:!py-16 lg:!py-16 xl:!py-20">
              <div className="relative aspect-[11/16] w-[60%] max-w-[27.5rem] overflow-hidden rounded-lg border border-border-subtle md:w-full">
                <Image
                  alt={`${COPY.testimonial.name}, ${COPY.testimonial.role}`}
                  className="object-cover object-top"
                  fill
                  sizes="(min-width: 1024px) 440px, (min-width: 768px) 50vw, 60vw"
                  src={TESTIMONIAL_PHOTO.src}
                  unoptimized
                />
              </div>
            </SiteFrameCell>
            <SiteFrameCell className="flex flex-col justify-center max-sm:!pt-4 md:!py-16 md:max-lg:h-full md:max-lg:justify-start lg:justify-center lg:!py-16 xl:!py-20">
              <figure className="flex w-full flex-col justify-start gap-9 py-2 md:max-lg:h-full md:max-lg:justify-between md:max-lg:gap-0 lg:min-h-[20rem] lg:justify-between lg:gap-0">
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
            </SiteFrameCell>
          </div>
        </SiteFrameSection>
      </div>
    </div>
  );
}
