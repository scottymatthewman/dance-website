"use client";

import Image from "next/image";

const PHASE_DETAILS = [
  {
    label: "Timeline",
    value: "Jun 23–25, 2026",
    description: "Load-in Jun 22 · Strike Jun 26",
  },
  {
    label: "Budget",
    value: "$142K of $180K",
    description: "79% allocated · AV phase at risk",
  },
  {
    label: "Owner",
    value: "Maya Swatch",
    description: "Director of Events · 12 open tasks",
  },
  {
    label: "Status",
    value: "On track · 1 flag",
    description: "Catering BEO due Friday",
  },
] as const;

export function DetectCustomerDetailMockup() {
  return (
    <div className="detect-customer-detail-mockup flex h-full min-h-0 w-full flex-col overflow-hidden text-[#f4f4f4]">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-8 sm:py-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-[32rem] flex-col gap-5 sm:gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-[#2e2e2e] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.4)] sm:size-12">
                <Image
                  alt=""
                  className="object-contain p-1.5"
                  fill
                  sizes="48px"
                  src="/product-flow/northwind-logo.png"
                />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-lg font-medium leading-[1.4] tracking-[-0.02em] text-[#f4f4f4] sm:text-xl">
                  Config 2026
                </h3>
                <p className="truncate text-[0.75rem] leading-[1.4] tracking-[-0.02em] text-[#828282] sm:text-[0.8125rem]">
                  Corporate conference · San Francisco
                </p>
              </div>
            </div>
            <span className="hidden shrink-0 rounded-lg bg-[#2a2a2a] px-2.5 py-1 text-[0.6875rem] font-medium leading-[1.4] tracking-[-0.02em] text-[#d4d4d4] shadow-[0_1px_2px_rgba(0,0,0,0.06)] sm:inline-flex">
              View plan
            </span>
          </div>

          <div className="rounded-2xl border border-[#e8963a]/25 bg-[#e8963a]/10 px-4 py-3.5 sm:px-5 sm:py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex min-w-0 items-start gap-2.5">
                <AlertIcon className="mt-0.5 size-4 shrink-0 text-[#e8963a]" />
                <p className="text-[0.8125rem] leading-[1.45] tracking-[-0.02em] text-[#f4f4f4] sm:text-sm">
                  AV phase budget is at 94% with vendor quotes still pending.
                </p>
              </div>
              <button
                className="detect-customer-detail-alert-btn shrink-0 self-start rounded-lg bg-[#e8963a] px-3 py-1.5 text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02em] text-black shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-[background-color,transform] duration-200 ease-out sm:self-center"
                type="button"
              >
                Review budget
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="px-1 text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02em] text-[#949494]">
              Phase details
            </p>
            <div className="overflow-hidden rounded-2xl border border-[#2e2e2e] bg-gradient-to-b from-[#141414] to-black">
              {PHASE_DETAILS.map((detail, index) => (
                <div
                  key={detail.label}
                  className="border-[#2e2e2e] px-4 py-3.5 sm:px-5 sm:py-4"
                  style={{
                    borderTopWidth: index === 0 ? 0 : 1,
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02em] text-[#f4f4f4] sm:text-sm">
                      {detail.label}
                    </p>
                    <p className="text-[0.8125rem] leading-[1.4] tracking-[-0.02em] text-[#d4d4d4] sm:text-sm">
                      {detail.value}
                    </p>
                    <p className="text-[0.75rem] leading-[1.4] tracking-[-0.02em] text-[#828282] sm:text-[0.8125rem]">
                      {detail.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2.5 13.5 13H2.5L8 2.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path
        d="M8 6.5v3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
      <circle cx="8" cy="11.25" fill="currentColor" r="0.65" />
    </svg>
  );
}
