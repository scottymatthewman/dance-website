"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import { COPY } from "@/lib/copy";

const [planOverview, phaseTimelines] = COPY.bento.topRow;
const [taskAssignment, budgetTracking, docsCard] = COPY.bento.bottomRow;

const BENTO_CARDS = [
  {
    data: planOverview,
    imagePosition: "right" as const,
    size: "large" as const,
    className: "md:col-span-2 lg:col-span-8",
    subtitleOnNewLine: false,
  },
  {
    data: phaseTimelines,
    imagePosition: "top" as const,
    size: "large" as const,
    className: "lg:col-span-4",
    titleClassName: "max-w-[24rem]",
  },
  {
    data: taskAssignment,
    imagePosition: "top" as const,
    className: "lg:col-span-4 lg:row-start-2",
    titleClassName: "w-full max-w-none",
  },
  {
    data: budgetTracking,
    imagePosition: "top" as const,
    className: "lg:col-span-4 lg:row-start-2",
    titleClassName: "w-full max-w-none",
  },
  {
    data: docsCard,
    imagePosition: "top" as const,
    className: "lg:col-span-4 lg:row-start-2",
    titleClassName: "w-full max-w-none",
  },
];

export function BentoContent() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mx-auto grid min-h-0 w-full max-w-[81.25rem] flex-1 grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
        {BENTO_CARDS.map(
          ({
            data,
            imagePosition,
            size,
            className,
            titleClassName,
            subtitleOnNewLine,
          }) => (
            <BentoCard
              key={data.image}
              title={data.title}
              subtitle={data.subtitle}
              image={data.image}
              tag={data.tag}
              imagePosition={imagePosition}
              size={size}
              className={className}
              titleClassName={titleClassName}
              subtitleOnNewLine={subtitleOnNewLine}
            />
          ),
        )}
      </div>
    </div>
  );
}
