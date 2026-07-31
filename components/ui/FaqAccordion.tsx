"use client";

import { cn } from "@/lib/cn";
import { useId, useState } from "react";
import posthog from "posthog-js";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: readonly FaqItem[];
  className?: string;
};

const ACCORDION_PANEL_TRANSITION =
  "transition-[grid-template-rows] duration-300 ease-out";
const ACCORDION_CONTENT_TRANSITION =
  "transition-[opacity,filter] duration-300 ease-out";
const ACCORDION_CHEVRON_TRANSITION = "transition-transform duration-300 ease-out";

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("w-full divide-y divide-[#eee]", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  const opening = !isOpen;
                  setOpenIndex(opening ? index : null);
                  if (opening) {
                    posthog.capture("faq_item_expanded", {
                      question: item.question,
                      index,
                    });
                  }
                }}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-section"
              >
                <span className="text-h3 font-medium leading-snug text-primary">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "shrink-0 text-xl leading-none text-secondary",
                    ACCORDION_CHEVRON_TRANSITION,
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={cn(
                "grid",
                ACCORDION_PANEL_TRANSITION,
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "pb-5",
                    ACCORDION_CONTENT_TRANSITION,
                    isOpen ? "opacity-100 blur-0" : "opacity-0 blur-[2px]",
                  )}
                >
                  <p className="text-body-md leading-normal text-secondary md:leading-[1.5]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
