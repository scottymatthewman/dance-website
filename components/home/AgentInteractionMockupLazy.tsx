"use client";

import dynamic from "next/dynamic";

export const AgentInteractionMockup = dynamic(
  () =>
    import("./AgentInteractionMockup").then(
      (module) => module.AgentInteractionMockup,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="h-[22rem] w-full max-w-[28rem] animate-pulse rounded-xl bg-card-inner"
      />
    ),
  },
);
