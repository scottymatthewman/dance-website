"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { type HeroMockupTier } from "@/lib/home/hero-mockup-layout";
import { PROFILES } from "@/lib/profiles";

/** Figma frame `Hero Mockup` (2029:15646) */
const DESIGN_WIDTH = 1223;
const DESIGN_HEIGHT = 644;
const DESIGN_ASPECT = DESIGN_WIDTH / DESIGN_HEIGHT;

const ASSETS = {
  logo: "/hero-mockup/timeline/logo.webp",
  avatar: PROFILES.Scott.avatar,
  sidebarToggle: "/hero-mockup/static/sidebar-toggle.svg",
  tabClose: "/hero-mockup/static/tab-close.svg",
  tabAdd: "/hero-mockup/static/tab-add.svg",
  chat: "/hero-mockup/static/top-right-icon.svg",
  search: "/hero-mockup/static/search.svg",
  searchShortcut: "/hero-mockup/static/search-shortcut.svg",
  settings: "/hero-mockup/static/settings.svg",
  arrowLeft: "/hero-mockup/static/arrow-left.svg",
  iconHome: "/hero-mockup/static/icon-home.svg",
  iconCalendar: "/hero-mockup/static/icon-calendar.svg",
  iconEvents: "/hero-mockup/static/icon-ticket.svg",
  iconInbox: "/hero-mockup/static/icon-inbox.svg",
} as const;

const SIDEBAR_WIDTH = 157;

const TIMELINE_COLUMN_COUNT = 9;
const TIMELINE_COLUMN_PITCH = 132.6;

const EVENT_NAME = "Agentic Development Workshop NYC";

type PhaseStatus = "inReview" | "inProgress" | "notStarted";

const STATUS_ICON_COLORS: Record<PhaseStatus, string> = {
  inReview: "#E8963A",
  inProgress: "#02ABFF",
  notStarted: "#999999",
};

/** Vertical "today" marker — sits between completed and upcoming phases */
const TODAY_LINE_X = 400;

const GANTT_BARS: ReadonlyArray<{
  label: string;
  left: number;
  width: number;
  status: PhaseStatus;
}> = [
  { label: "Venue & Logistics", left: 77, width: 362, status: "inReview" },
  { label: "Workshop Curriculum", left: 210, width: 362, status: "inReview" },
  { label: "Speaker Outreach", left: 319, width: 362, status: "inProgress" },
  { label: "Registration Launch", left: 404, width: 362, status: "notStarted" },
  { label: "Agent Demo Setup", left: 529, width: 362, status: "notStarted" },
  { label: "Day-of Operations", left: 577, width: 362, status: "notStarted" },
  { label: "Post-Event Recap", left: 765, width: 162, status: "notStarted" },
];

const SIDEBAR_NAV = [
  { label: "Home", icon: ASSETS.iconHome, active: false },
  { label: "Calendar", icon: ASSETS.iconCalendar, active: false },
  { label: "Events", icon: ASSETS.iconEvents, active: true },
  { label: "Inbox", icon: ASSETS.iconInbox, active: false },
] as const;

function MockupImage({
  className,
  src,
}: {
  className?: string;
  src: string;
}) {
  return (
    <Image
      alt=""
      aria-hidden
      className={className}
      height={32}
      src={src}
      unoptimized
      width={32}
    />
  );
}

function InReviewIcon({ color, size = 13 }: { color: string; size?: number }) {
  return (
    <svg aria-hidden fill="none" height={size} viewBox="0 0 18 18" width={size}>
      <path
        d="M15.75 9C15.75 12.728 12.728 15.75 9 15.75C5.27208 15.75 2.25 12.728 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.728 2.25 15.75 5.27208 15.75 9Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function InProgressIcon({ color, size = 13 }: { color: string; size?: number }) {
  return (
    <svg aria-hidden fill="none" height={size} viewBox="0 0 18 18" width={size}>
      <path
        d="M15.75 9C15.75 12.728 12.728 15.75 9 15.75C5.27208 15.75 2.25 12.728 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.728 2.25 15.75 5.27208 15.75 9Z"
        stroke={color}
        strokeDasharray="2.25 3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function NotStartedIcon({ color, size = 13 }: { color: string; size?: number }) {
  return (
    <svg aria-hidden fill="none" height={size} viewBox="0 0 18 18" width={size}>
      <path
        d="M9.00007 2.2575V2.25M9.00007 15.75V15.7575M11.5818 2.77103L11.5846 2.7641M6.41841 15.2365L6.41554 15.2434M13.7704 4.23349L13.7757 4.22819M4.22975 13.7741L4.22445 13.7795M15.2327 6.42221L15.2397 6.41935M2.76732 11.5856L2.76039 11.5885M2.25384 9.00375H2.24634M15.7463 9.00375H15.7538M4.22993 4.23339L4.22463 4.22808M13.7706 13.7741L13.7758 13.7793M2.7676 6.42185L2.76067 6.41898M15.233 11.5852L15.24 11.5881M6.41839 2.771L6.41552 2.76407M11.5817 15.2365L11.5846 15.2434"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function PhaseStatusIcon({ status }: { status: PhaseStatus }) {
  const color = STATUS_ICON_COLORS[status];

  if (status === "inReview") {
    return <InReviewIcon color={color} />;
  }

  if (status === "inProgress") {
    return <InProgressIcon color={color} />;
  }

  return <NotStartedIcon color={color} />;
}

function GanttBar({
  label,
  left,
  width,
  status,
}: {
  label: string;
  left: number;
  width: number;
  status: PhaseStatus;
}) {
  return (
    <div className="relative h-[45px] w-full shrink-0">
      <div
        className="absolute top-1/2 flex -translate-y-1/2 items-center overflow-x-hidden rounded-[4px] border-[0.7px] border-[#eee] bg-white py-[9px] pl-[41px] pr-[7px] shadow-[0_0.7px_2px_rgba(0,0,0,0.1)]"
        style={{ left, width }}
      >
        <div className="absolute left-[9px] top-1/2 size-[13px] -translate-y-1/2">
          <PhaseStatusIcon status={status} />
        </div>
        <span className="whitespace-nowrap font-interface text-[11.3px] leading-[1.35] tracking-[-0.23px] text-[#111]">
          {label}
        </span>
      </div>
    </div>
  );
}

function getHeroCoverLayout(width: number, height: number) {
  const scale = Math.max(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
  return { scale, x: 0, y: 0 };
}

export function TimelineMockup({
  className,
  scaleMode = "width",
  coverTier = "sm",
}: {
  className?: string;
  /** `cover` fills the container; `hero-cover` matches Figma mobile bleed crops. */
  scaleMode?: "width" | "cover" | "hero-cover";
  /** Active Figma tier when `scaleMode` is `hero-cover`. */
  coverTier?: HeroMockupTier;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ scale: 1, x: 0, y: 0 });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateScale = () => {
      const { width, height } = element.getBoundingClientRect();
      const widthScale = width / DESIGN_WIDTH;
      const heightScale = height / DESIGN_HEIGHT;

      if (scaleMode === "hero-cover") {
        setLayout(getHeroCoverLayout(width, height));
        return;
      }

      const scale =
        scaleMode === "cover"
          ? Math.max(widthScale, heightScale)
          : widthScale;
      setLayout({ scale, x: 0, y: 0 });
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(element);
    return () => observer.disconnect();
  }, [scaleMode, coverTier]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden bg-[#fafaf9]",
        scaleMode === "cover" || scaleMode === "hero-cover" ? "h-full" : null,
        className,
      )}
      style={scaleMode === "width" ? { aspectRatio: DESIGN_ASPECT } : undefined}
    >
      <div
        className="absolute left-0 top-0 flex flex-col font-interface antialiased"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `translate(${layout.x}px, ${layout.y}px) scale(${layout.scale})`,
          transformOrigin: "0 0",
        }}
      >
        {/* Top chrome */}
        <div className="flex w-full shrink-0 items-start">
          <div
            className="flex items-center justify-between px-[10px] pt-[10px]"
            style={{ width: SIDEBAR_WIDTH }}
          >
            <div className="flex items-center gap-[9px]">
              <div className="relative size-[29px] shrink-0 overflow-hidden rounded-[6px] border-[0.7px] border-black/10">
                <Image
                  alt=""
                  aria-hidden
                  className="object-cover"
                  fill
                  sizes="29px"
                  src={ASSETS.logo}
                  unoptimized
                />
              </div>
              <span className="whitespace-nowrap text-[10.2px] font-medium leading-none text-black">
                Terrace
              </span>
            </div>
            <MockupImage className="size-[20px]" src={ASSETS.sidebarToggle} />
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-between pb-[2px] pl-[5px] pr-[12px] pt-[12px]">
            <div className="flex items-center gap-[8px]">
              <div className="flex w-[153px] items-center gap-[8px] rounded-[6px] border-[0.77px] border-black/10 bg-white py-[7px] pl-[9px] pr-[6px]">
                <span className="min-w-0 flex-1 truncate text-[10px] font-medium leading-[1.25] text-[#111]">
                  {EVENT_NAME}
                </span>
                <MockupImage className="size-[14px] shrink-0" src={ASSETS.tabClose} />
              </div>
              <MockupImage className="size-[14px] shrink-0" src={ASSETS.tabAdd} />
            </div>
            <MockupImage className="size-[14px] shrink-0" src={ASSETS.chat} />
          </div>
        </div>

        {/* Body */}
        <div className="flex min-h-0 w-full flex-1">
          {/* Sidebar */}
          <aside
            className="flex shrink-0 flex-col justify-between px-[10px] pb-[7.5px] pt-[15px]"
            style={{ width: SIDEBAR_WIDTH }}
          >
            <div className="flex w-full flex-col gap-[7.5px]">
              <div className="flex w-full items-center justify-between rounded-[5px] border-[0.63px] border-black/10 bg-[#fafaf9] p-[5px]">
                <div className="flex min-w-0 flex-1 items-center gap-[5px]">
                  <MockupImage className="size-[13.5px] shrink-0" src={ASSETS.search} />
                  <span className="text-[10.6px] font-medium leading-none text-black opacity-30">
                    Search
                  </span>
                </div>
                <MockupImage
                  className="h-[13.5px] w-[12px] shrink-0"
                  src={ASSETS.searchShortcut}
                />
              </div>

              <div className="flex w-full flex-col gap-[2.5px]">
                {SIDEBAR_NAV.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "flex w-full items-center rounded-[2.5px] p-[5px]",
                      !item.active && "opacity-50",
                    )}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-[7.5px]">
                      <MockupImage className="size-[14px] shrink-0" src={item.icon} />
                      <span className="whitespace-nowrap text-[10.6px] font-medium leading-none text-black">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-[2.5px]">
              <div className="flex w-full items-center p-[5px]">
                <div className="flex min-w-0 flex-1 items-center gap-[7.5px]">
                  <div className="relative size-[11.5px] shrink-0 overflow-hidden rounded-full">
                    <Image
                      alt=""
                      aria-hidden
                      className="object-cover"
                      fill
                      sizes="12px"
                      src={ASSETS.avatar}
                      unoptimized
                    />
                  </div>
                  <span className="whitespace-nowrap text-[8.8px] font-medium leading-none text-black opacity-80">
                    Scotty
                  </span>
                </div>
              </div>
              <div className="flex w-full items-center p-[5px] opacity-80">
                <div className="flex min-w-0 flex-1 items-center gap-[7.5px]">
                  <MockupImage className="size-[11.5px] shrink-0" src={ASSETS.settings} />
                  <span className="whitespace-nowrap text-[8.8px] font-medium leading-none text-black">
                    Settings
                  </span>
                </div>
              </div>
              <div className="flex w-full items-center p-[5px] opacity-40">
                <span className="text-[8.8px] font-medium leading-none text-black">
                  v0.0.0
                </span>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex min-h-0 min-w-0 flex-1 p-[5px]">
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[5px] border-[0.63px] border-black/10 bg-white">
              {/* Page header */}
              <div className="flex shrink-0 items-center border-b-[0.63px] border-[#eee] bg-white px-[12.5px] py-[10px]">
                <div className="flex items-center gap-[8px] rounded-[6px] border-[0.79px] border-[#eee] bg-white px-[9.5px] py-[6px]">
                  <MockupImage className="size-[14px] shrink-0" src={ASSETS.arrowLeft} />
                  <span className="whitespace-nowrap text-[11px] leading-[1.35] tracking-[-0.22px] text-[#111]">
                    {EVENT_NAME}
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative min-h-0 flex-1 overflow-hidden">
                {/* Dashed column separators */}
                {Array.from({ length: TIMELINE_COLUMN_COUNT - 1 }, (_, index) => (
                  <div
                    key={index}
                    aria-hidden
                    className="absolute bottom-0 top-[30px] border-r-[0.7px] border-dashed border-[#eee]"
                    style={{ left: (index + 1) * TIMELINE_COLUMN_PITCH }}
                  />
                ))}

                <div
                  aria-hidden
                  className="absolute bottom-0 top-0 z-[1] w-0 border-l-[1.5px] border-[#FFB144]"
                  style={{ left: TODAY_LINE_X }}
                />

                <div className="absolute inset-0 flex flex-col">
                  <div className="flex h-[30px] shrink-0">
                    {Array.from({ length: TIMELINE_COLUMN_COUNT }, (_, index) => (
                      <div
                        key={index}
                        className="flex shrink-0 items-center justify-center px-[7px] py-[6px]"
                        style={{ width: TIMELINE_COLUMN_PITCH }}
                      >
                        <span className="whitespace-nowrap text-[9.9px] leading-[1.35] tracking-[-0.2px] text-[#666]">
                          Apr 27 - May 3
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col">
                    {GANTT_BARS.map((bar, index) => (
                      <GanttBar
                        key={index}
                        label={bar.label}
                        left={bar.left}
                        status={bar.status}
                        width={bar.width}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex shrink-0 items-center border-t-[0.63px] border-black/10 bg-white py-[7.5px] pl-[12.5px] pr-[5px]">
                <div className="flex flex-col gap-[2.5px]">
                  <div className="relative h-[1.5px] w-[88px] overflow-hidden rounded-full bg-[#ddd]">
                    <div className="absolute left-0 top-0 h-full w-[22px] rounded-full bg-black" />
                  </div>
                  <div className="flex items-center gap-[5px] whitespace-nowrap leading-[1.4]">
                    <span className="text-[9.4px] font-medium text-black">$10,000</span>
                    <span className="text-[10.7px] text-[#999] opacity-40">/</span>
                    <span className="text-[9.4px] font-medium text-black">$40,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
