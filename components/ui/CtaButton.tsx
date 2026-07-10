"use client";

import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { COPY } from "@/lib/copy";
import { NAV_SECTIONS } from "@/lib/home/sections";
import { scrollToHomeSection } from "@/lib/scroll-to-section";

type CtaButtonProps = Omit<ComponentProps<typeof Button>, "href" | "children" | "onClick"> & {
  children?: ReactNode;
  onClick?: () => void;
};

/** Primary marketing CTA — scrolls to the email capture section. */
export function CtaButton({
  children = COPY.hero.cta,
  onClick,
  ...props
}: CtaButtonProps) {
  const reducedMotion = useReducedMotion();

  return (
    <Button
      onClick={() => {
        scrollToHomeSection(NAV_SECTIONS.emailCapture, { smooth: !reducedMotion });
        onClick?.();
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
