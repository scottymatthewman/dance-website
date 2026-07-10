"use client";

import dynamic from "next/dynamic";

export const CollaborateMockup = dynamic(
  () =>
    import("./CollaborateMockup").then((module) => module.CollaborateMockup),
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
