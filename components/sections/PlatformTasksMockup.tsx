"use client";

import Image from "next/image";
import { BoardsMockup } from "@/components/sections/BoardsMockup";
import { SiteIcon, type SiteIconName } from "@/components/ui/SiteIcon";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { id: "new-chat", label: "New Chat", icon: "nav-newchat" },
  { id: "customers", label: "Customers", icon: "nav-customers" },
  { id: "tasks", label: "Tasks", icon: "nav-tasks" },
  { id: "agents", label: "Agents", icon: "nav-agents" },
  { id: "marketplace", label: "Marketplace", icon: "nav-marketplace" },
  { id: "history", label: "History", icon: "nav-history" },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  icon: SiteIconName;
}>;

export function PlatformTasksMockup() {
  return (
    <div className="platform-tasks-mockup flex h-full min-h-0 w-full overflow-hidden bg-[#0f0f0f] text-[#f4f4f4]">
      <aside className="flex w-[14.4%] min-w-[9.5rem] max-w-[16.375rem] shrink-0 flex-col justify-between border-r border-white/[0.06] bg-[#0f0f0f]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-3.5 py-4">
            <SiteIcon className="size-4 text-[#949494]" name="nav-bartoggle" />
            <SiteIcon className="size-4 text-[#949494]" name="nav-chevronleft" />
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
                  <SiteIcon className="size-4" name={item.icon} />
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
            <SiteIcon className="size-4 shrink-0 text-[#d4d4d4]" name="nav-tasks" />
            <span className="whitespace-nowrap text-[0.8125rem] leading-[1.4] tracking-[-0.02em] text-[#d4d4d4]">
              Tasks
            </span>
          </div>
          <SiteIcon className="size-4 shrink-0 text-[#949494]" name="tabBar-add" />
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
              <SiteIcon className="size-3.5 text-[#f4f4f4]" name="chatbox-add" />
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
