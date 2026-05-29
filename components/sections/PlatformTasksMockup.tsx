"use client";

import Image from "next/image";
import { BoardsMockup } from "@/components/sections/BoardsMockup";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { id: "new-chat", label: "New Chat", icon: <PlusIcon /> },
  { id: "customers", label: "Customers", icon: <UsersIcon /> },
  { id: "tasks", label: "Tasks", icon: <CheckSquareIcon /> },
  { id: "agents", label: "Agents", icon: <BotIcon /> },
  { id: "marketplace", label: "Marketplace", icon: <StoreIcon /> },
  { id: "history", label: "History", icon: <ClockIcon /> },
] as const;

export function PlatformTasksMockup() {
  return (
    <div className="platform-tasks-mockup flex h-full min-h-0 w-full overflow-hidden bg-[#0f0f0f] text-[#f4f4f4]">
      <aside className="flex w-[14.4%] min-w-[9.5rem] max-w-[16.375rem] shrink-0 flex-col justify-between border-r border-white/[0.06] bg-[#0f0f0f]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-3.5 py-4">
            <MenuIcon className="size-4 text-[#949494]" />
            <ChevronIcon className="size-4 text-[#949494]" />
          </div>

          <nav aria-label="Product navigation" className="flex flex-col gap-px px-2">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex h-8 items-center gap-2 rounded-lg px-2 py-1",
                  item.id === "tasks" && "bg-white/[0.08]",
                )}
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center text-[#949494]",
                    item.id === "tasks" && "text-[#f4f4f4]",
                  )}
                >
                  {item.icon}
                </span>
                <span
                  className={cn(
                    "truncate text-[0.8125rem] leading-[1.4] tracking-[-0.02em]",
                    item.id === "tasks" ? "text-[#f4f4f4]" : "text-[#949494]",
                  )}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-2.5">
          <div className="flex items-center gap-3 rounded-xl p-1.5">
            <div className="relative size-6 shrink-0 overflow-hidden rounded-full">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="24px"
                src="/hero-mockup/avatar.png"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8125rem] leading-[1.4] tracking-[-0.016em]">
                John Allen
              </p>
              <p className="truncate text-[0.75rem] leading-[1.3] tracking-[-0.02em] text-[#949494]">
                Acme Inc.
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 px-2 py-2 sm:px-3">
          <div className="flex items-center gap-2 rounded-lg bg-[#141414] px-3 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <CheckSquareIcon className="size-4 shrink-0 text-[#d4d4d4]" />
            <span className="whitespace-nowrap text-[0.8125rem] leading-[1.4] tracking-[-0.02em] text-[#d4d4d4]">
              Tasks
            </span>
          </div>
          <PlusIcon className="size-4 shrink-0 text-[#949494]" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col rounded-tl-xl bg-[#141414] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <div className="flex shrink-0 items-center justify-between gap-4 px-6 pb-4 pt-6 sm:px-8 sm:pt-8 lg:px-12">
            <div className="min-w-0">
              <h3 className="text-lg font-medium leading-[1.4] tracking-[-0.02em] text-[#f4f4f4] sm:text-xl">
                Tasks
              </h3>
              <p className="mt-1 text-[0.8125rem] leading-[1.4] tracking-[-0.02em] text-[#828282] sm:text-sm">
                Collaborate with your team and agents.
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-[#2e2e2e] bg-[#1c1c1c] px-3 py-1.5 text-[0.8125rem] leading-[1.4] tracking-[-0.02em] text-[#f4f4f4] shadow-[0_1px_2px_rgba(0,0,0,0.06)] sm:flex">
              <PlusIcon className="size-3.5" />
              Add Task
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden pb-4">
            <BoardsMockup />
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4h12M2 8h12M2 12h12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M2.5 13c0-2.2 1.6-3.5 3.5-3.5S9.5 10.8 9.5 13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
      <path
        d="M10.5 6.5a2 2 0 1 1 0 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
      <path
        d="M12.5 13c0-1.6-1-2.8-2.5-3.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function CheckSquareIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.25"
        width="10"
        x="3"
        y="3"
      />
      <path
        d="M5.5 8l1.8 1.8L10.5 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="7"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.25"
        width="9"
        x="3.5"
        y="4.5"
      />
      <circle cx="6" cy="8" fill="currentColor" r="0.75" />
      <circle cx="10" cy="8" fill="currentColor" r="0.75" />
      <path
        d="M8 2.5v2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function StoreIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 6.5 3.5 3h9l1 3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path
        d="M3 6.5h10v6.5H3z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8 5.5V8l2 1.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}
