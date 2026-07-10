"use client";

import dynamic from "next/dynamic";

export const TimelineMockup = dynamic(
  () => import("./TimelineMockup").then((module) => module.TimelineMockup),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="size-full animate-pulse bg-card-inner"
      />
    ),
  },
);
