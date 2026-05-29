"use client";

import { useEffect, useState } from "react";

export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
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
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      setProgress(scrolled / scrollable);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}
