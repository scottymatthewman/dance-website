"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const TEAM_AVATARS = [
  { src: "/hero-mockup/avatar.png", alt: "John Allen" },
  { initials: "M", className: "bg-[#5d60ed]" },
  { initials: "S", className: "bg-[#e8963a]" },
  { initials: "A", className: "bg-[#02abff]" },
  { initials: "R", className: "bg-[#34c759]" },
  { initials: "K", className: "bg-[#333333]" },
] as const;

export function AgentBriefingReportMockup({
  variant = "full",
}: {
  variant?: "full" | "floating";
}) {
  const isFloating = variant === "floating";

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden",
        isFloating
          ? "h-full w-full rounded-lg border border-white/20 bg-[#111] shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
          : "agent-briefing-report-mockup h-full w-full max-w-[43.75rem] rounded-2xl border border-white/20 bg-[#141414] shadow-[0_1px_2px_rgba(0,0,0,0.4)]",
      )}
    >
      <div
        className={cn(
          "min-h-0 flex-1 overflow-hidden",
          !isFloating &&
            "overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <div
          className={cn(
            "flex flex-col",
            isFloating ? "gap-2 px-[1.0625rem] py-[1.1875rem]" : "gap-3 px-4 py-4",
          )}
        >
          <header className="flex items-start justify-between gap-3">
            <h3
              className={cn(
                "font-semibold leading-snug tracking-[-0.02em] text-[#f4f4f4]",
                isFloating
                  ? "text-[0.991875rem] text-[#eaebea]"
                  : "text-[1.0625rem]",
              )}
            >
              {isFloating ? "Config 2026 Report" : "Config 2026 — Plan brief"}
            </h3>
            <ShareButton compact={isFloating} />
          </header>

          <MetaRow
            compact={isFloating}
            label={isFloating ? "Date" : "Period covered"}
            value={isFloating ? "Jun 23–25, 2026" : "May 22–29, 2026"}
          />
          <MetaRow
            compact={isFloating}
            label={isFloating ? "Team members" : "Prepared for"}
            value={
              <div className="flex items-center">
                {TEAM_AVATARS.map((member, index) => (
                  <AvatarStackItem
                    key={index}
                    compact={isFloating}
                    index={index}
                    member={member}
                  />
                ))}
              </div>
            }
          />

          <hr className="border-0 border-t border-white/[0.12]" />

          <ReportSection
            compact={isFloating}
            title={isFloating ? "Plan Snapshot" : "Plan snapshot"}
            metricLabel="Budget"
            metricValue="$142K"
            body="79% of budget allocated across four phases. AV is the tightest phase at 94% spend with quotes still pending. Load-in is 18 days out with no timeline conflicts."
          />

          <ReportSection
            compact={isFloating}
            title="What changed"
            metricLabel="Open tasks"
            metricValue="12"
            body="Three tasks moved to In Progress this week. Catering BEO is due Friday, and two vendor quotes were added to the AV phase backlog."
          >
            <ul
              className={cn(
                "list-disc text-[#d4d4d4]/90",
                isFloating
                  ? "space-y-0 pl-4 text-[0.46875rem] leading-normal"
                  : "space-y-0.5 pl-4 text-[0.6875rem] leading-snug tracking-[-0.02em]",
              )}
            >
              <li>Priority: catering BEO + AV vendor quotes</li>
            </ul>
            <HotLeadActions compact={isFloating} />
            <ul
              className={cn(
                "list-disc text-[#d4d4d4]/90",
                isFloating
                  ? "space-y-0 pl-4 text-[0.46875rem] leading-normal"
                  : "space-y-0.5 pl-4 text-[0.6875rem] leading-snug tracking-[-0.02em]",
              )}
            >
              <li>Open flag: AV phase at 94% of budget</li>
              <li>
                {isFloating
                  ? "Owner: Maya Swatch – last update 2 days"
                  : "Owner: Maya Swatch — last update 2 days ago"}
              </li>
            </ul>
          </ReportSection>

          {!isFloating ? (
            <ReportSection
              title="Recommended actions"
              metricLabel="Timeline health"
              metricValue={
                <>
                  <span className="text-[#87ff9f]">On track</span>
                </>
              }
              body="Assign agent to chase catering signatures before Friday. Schedule AV walkthrough with venue for next Tuesday. Agent will not shift event dates past Jun 23."
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ShareButton({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex shrink-0 items-center gap-1 rounded-full bg-white text-[#111]",
        compact
          ? "px-[0.44125rem] py-[0.275625rem] text-[0.46875rem] font-medium text-[#111]"
          : "rounded-lg px-2.5 py-1.5 text-[0.6875rem] font-medium tracking-[-0.02em] text-white",
        !compact &&
          "bg-gradient-to-b from-[#1991e8] to-[#0052d5] shadow-[inset_0_-1px_0.5px_rgba(0,0,0,0.3),inset_0_1px_0.5px_rgba(255,255,255,0.3)]",
      )}
    >
      Share
      <ChevronRightIcon className={compact ? "size-1.5" : "size-2.5 opacity-90"} />
    </button>
  );
}

function MetaRow({
  compact = false,
  label,
  value,
}: {
  compact?: boolean;
  label: string;
  value: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2",
        compact
          ? "text-[0.44125rem] leading-normal text-[#eaebea]"
          : "text-[0.6875rem] leading-snug tracking-[-0.02em]",
      )}
    >
      <span className={compact ? "opacity-70" : "text-[#828282]"}>{label}</span>
      {typeof value === "string" ? (
        <span className={cn("shrink-0", compact ? "text-[#eaebea]" : "text-[#f4f4f4]")}>
          {value}
        </span>
      ) : (
        value
      )}
    </div>
  );
}

function ReportSection({
  compact = false,
  title,
  metricLabel,
  metricValue,
  body,
  children,
}: {
  compact?: boolean;
  title: string;
  metricLabel: string;
  metricValue: ReactNode;
  body: string;
  children?: ReactNode;
}) {
  return (
    <section className={cn("flex flex-col", compact ? "gap-0.5" : "gap-1")}>
      <div className="flex flex-wrap items-baseline justify-between gap-1.5">
        <h4
          className={cn(
            "font-semibold leading-snug tracking-[-0.02em] text-[#f4f4f4]",
            compact ? "text-[0.661875rem] text-[#eaebea]" : "text-[0.8125rem]",
          )}
        >
          {title}
        </h4>
        <p
          className={cn(
            compact
              ? "text-[0.46875rem] leading-normal text-[#eaebea]"
              : "text-[0.6875rem] leading-snug tracking-[-0.02em]",
          )}
        >
          <span className={compact ? "opacity-60" : "text-[#828282]"}>
            {metricLabel}:{" "}
          </span>
          <span className="font-medium text-[#f4f4f4]">{metricValue}</span>
        </p>
      </div>
      <p
        className={cn(
          "text-[#d4d4d4]/90",
          compact
            ? "text-[0.46875rem] leading-normal opacity-80"
            : "text-[0.6875rem] leading-[1.4] tracking-[-0.02em]",
        )}
      >
        {body}
      </p>
      {children}
    </section>
  );
}

function HotLeadActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("flex flex-col", compact ? "gap-0" : "gap-0.5 py-0.5")}>
      <ul
        className={cn(
          "list-disc pl-4 text-[#d4d4d4]/90",
          compact
            ? "text-[0.46875rem] leading-normal opacity-80"
            : "text-[0.6875rem] leading-snug tracking-[-0.02em]",
        )}
      >
        <li>Hot signal: procurement thread idle 9 days</li>
      </ul>
      <div className="flex flex-wrap items-center gap-1.5 pl-4">
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border border-dashed border-[#87ff9f]/60 bg-[#1c1c1c] font-medium text-[#02abff]",
            compact ? "size-2.5 text-[0.375rem]" : "size-4 text-[0.5625rem]",
          )}
          aria-hidden
        >
          K
        </span>
        <ActionChip compact={compact} label="Draft follow-up" />
        <ActionChip compact={compact} label="Ignore for now" />
      </div>
    </div>
  );
}

function ActionChip({
  compact = false,
  label,
}: {
  compact?: boolean;
  label: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-white/10",
        "bg-gradient-to-b from-white/10 to-white/[0.02] text-[#f4f4f4]",
        compact
          ? "rounded px-1 py-0.5 text-[0.385625rem] leading-none"
          : "px-1.5 py-1 text-[0.625rem] leading-none tracking-[-0.02em]",
      )}
    >
      {label}
    </span>
  );
}

function AvatarStackItem({
  compact = false,
  member,
  index,
}: {
  compact?: boolean;
  member: (typeof TEAM_AVATARS)[number];
  index: number;
}) {
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#141414]",
        compact ? "size-[0.7725rem]" : "size-5",
        index > 0 && (compact ? "-ml-1" : "-ml-1.5"),
      )}
      style={{ zIndex: TEAM_AVATARS.length - index }}
    >
      {"src" in member ? (
        <Image
          alt={member.alt}
          className="object-cover"
          fill
          sizes="20px"
          src={member.src}
        />
      ) : (
        <span
          className={cn(
            "flex size-full items-center justify-center text-[0.5625rem] font-medium text-white",
            member.className,
          )}
        >
          {member.initials}
        </span>
      )}
    </span>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 8 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 1.5 6.5 6l-5 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
