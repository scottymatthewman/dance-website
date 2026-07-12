"use client";

import { DocumentSection } from "@/components/home/DocumentSection";
import { BentoContent } from "@/components/home/sections/BentoContent";
import { BenefitsContent } from "@/components/home/sections/BenefitsContent";
import { DifferentiatorContent } from "@/components/home/sections/DifferentiatorContent";
import { EmailCaptureBleedContent } from "@/components/home/sections/EmailCaptureBleedContent";
import { FaqContent } from "@/components/home/sections/FaqContent";
import { FeaturesContent } from "@/components/home/sections/FeaturesContent";
import { FooterContent } from "@/components/home/sections/FooterContent";
import { HeroContent } from "@/components/home/sections/HeroContent";
import { StatementContent } from "@/components/home/sections/StatementContent";
import { UseCasesContent } from "@/components/home/sections/UseCasesContent";
import { HOME_SECTIONS } from "@/lib/home/sections";
import type { ReactNode } from "react";

const MOBILE_SECTIONS = HOME_SECTIONS;

const SECTION_CONTENT: Record<
  | "hero"
  | "features"
  | "useCases"
  | "benefits"
  | "bento"
  | "statement"
  | "differentiator"
  | "faq"
  | "emailCaptureBleed",
  ReactNode
> = {
  hero: <HeroContent />,
  features: <FeaturesContent />,
  useCases: <UseCasesContent />,
  benefits: <BenefitsContent />,
  bento: <BentoContent />,
  statement: <StatementContent entryProgress={0} />,
  differentiator: <DifferentiatorContent />,
  faq: <FaqContent />,
  emailCaptureBleed: <EmailCaptureBleedContent />,
};

const SECTION_FRAME_CLASS: Partial<
  Record<(typeof MOBILE_SECTIONS)[number]["id"], string>
> = {
  hero: "mobile-section--shell-height",
  useCases: "mobile-section--shell-height",
  statement: "mobile-section--shell-height",
  emailCaptureBleed: "mobile-section--shell-height",
};

export function MobileHomePage() {
  return (
    <div className="mobile-home bg-scroll-canvas pt-[var(--shell-margin-top)]">
      {MOBILE_SECTIONS.map((section, index) => (
        <DocumentSection
          key={section.id}
          section={section}
          nextSection={MOBILE_SECTIONS[index + 1]}
          frameClassName={SECTION_FRAME_CLASS[section.id]}
        >
          {SECTION_CONTENT[section.id as keyof typeof SECTION_CONTENT]}
        </DocumentSection>
      ))}

      <footer
        id="section-footer"
        className="border-t border-[var(--shell-rail)] bg-section px-0 pb-8 pt-2"
      >
        <FooterContent />
      </footer>
    </div>
  );
}
