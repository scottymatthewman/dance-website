"use client";

import dynamic from "next/dynamic";

export const PlanMockup = dynamic(
  () => import("./PlanMockup").then((module) => module.PlanMockup),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="absolute inset-0 animate-pulse bg-white/20"
      />
    ),
  },
);
