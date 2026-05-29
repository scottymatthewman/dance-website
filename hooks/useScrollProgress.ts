"use client";

import { useEffect, useState } from "react";

type ScrollProgressAlign = "top" | "center";

type UseScrollProgressOptions = {
  align?: ScrollProgressAlign;
};

export function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  options: UseScrollProgressOptions = {},
) {
  const { align = "top" } = options;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const scrollable = element.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(1);
        return;
      }

      const pinnedContent = element.firstElementChild;
      const contentHeight =
        pinnedContent instanceof HTMLElement
          ? pinnedContent.offsetHeight
          : element.offsetHeight;
      const startOffset =
        align === "center"
          ? window.innerHeight / 2 - contentHeight / 2
          : 0;
      const scrolled = Math.min(
        Math.max(startOffset - rect.top, 0),
        scrollable,
      );
      setProgress(scrolled / scrollable);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [align, ref]);

  return progress;
}
