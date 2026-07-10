"use client";

import { FooterContent } from "@/components/home/sections/FooterContent";

type ScrollReleaseFooterProps = {
  opacity: number;
};

export function ScrollReleaseFooter({ opacity }: ScrollReleaseFooterProps) {
  const visible = opacity > 0.01;

  return (
    <aside
      aria-label="Site footer"
      className="scroll-release-footer fixed z-[2] flex flex-col overflow-hidden"
      data-visible={visible ? "true" : "false"}
      style={{
        opacity,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <FooterContent />
    </aside>
  );
}
