"use client";

import dynamic from "next/dynamic";

export const DefineMockup = dynamic(
  () => import("./DefineMockup").then((module) => module.DefineMockup),
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
