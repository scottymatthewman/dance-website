"use client";

import type { ElementType, ReactNode } from "react";
import {
  getCtaProgress,
  getHeroWordProgress,
  getSecondaryCtaProgress,
  getSecondarySubheadProgress,
  getSubheadProgress,
  getSubheadRevealStyle,
  getWordProgress,
  getWordRevealStyle,
} from "@/lib/motion/word-reveal";
import { cn } from "@/lib/cn";

type RevealWordsPace = "default" | "hero";

type RevealWordsProps = {
  words?: string[];
  lines?: readonly string[];
  progress: number;
  pace?: RevealWordsPace;
  as?: ElementType;
  className?: string;
};

const wordProgressGetters = {
  default: getWordProgress,
  hero: getHeroWordProgress,
} as const;

function flattenLines(lines: readonly string[]): string[] {
  return lines.flatMap((line) => line.split(/\s+/).filter(Boolean));
}

export function RevealWords({
  words: wordsProp,
  lines,
  progress,
  pace = "default",
  as: Component = "span",
  className,
}: RevealWordsProps) {
  const getProgress = wordProgressGetters[pace];
  const allWords = wordsProp ?? (lines ? flattenLines(lines) : []);

  if (lines) {
    let wordOffset = 0;
    return (
      <Component className={className}>
        {lines.map((line) => {
          const lineWords = line.split(/\s+/).filter(Boolean);
          const lineElement = (
            <span key={line} className="block">
              {lineWords.map((word, index) => {
                const globalIndex = wordOffset + index;
                const wordProgress = getProgress(
                  progress,
                  globalIndex,
                  allWords.length,
                );
                return (
                  <span
                    key={`${line}-${word}-${index}`}
                    className="inline-block will-change-[transform,filter,opacity]"
                    style={getWordRevealStyle(wordProgress)}
                  >
                    {word}
                    {index < lineWords.length - 1 ? "\u00a0" : null}
                  </span>
                );
              })}
            </span>
          );
          wordOffset += lineWords.length;
          return lineElement;
        })}
      </Component>
    );
  }

  return (
    <Component className={className}>
      {allWords.map((word, index) => {
        const wordProgress = getProgress(progress, index, allWords.length);
        return (
          <span
            key={`${word}-${index}`}
            className="inline-block will-change-[transform,filter,opacity]"
            style={getWordRevealStyle(wordProgress)}
          >
            {word}
            {index < allWords.length - 1 ? "\u00a0" : null}
          </span>
        );
      })}
    </Component>
  );
}

type RevealBlockPhase = "subhead" | "cta";
type RevealBlockTimeline = "default" | "secondary";

type RevealBlockProps = {
  progress: number;
  phase?: RevealBlockPhase;
  timeline?: RevealBlockTimeline;
  hidden?: boolean;
  className?: string;
  children: ReactNode;
};

const phaseProgressGetters = {
  default: {
    subhead: getSubheadProgress,
    cta: getCtaProgress,
  },
  secondary: {
    subhead: getSecondarySubheadProgress,
    cta: getSecondaryCtaProgress,
  },
} as const;

export function RevealBlock({
  progress,
  phase = "subhead",
  timeline = "default",
  hidden = false,
  className,
  children,
}: RevealBlockProps) {
  const revealProgress = hidden ? 0 : phaseProgressGetters[timeline][phase](progress);

  return (
    <div
      className={cn(
        "will-change-[transform,opacity]",
        hidden && "pointer-events-none",
        className,
      )}
      style={getSubheadRevealStyle(revealProgress)}
      aria-hidden={hidden || revealProgress === 0}
    >
      {children}
    </div>
  );
}
