"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";

type Integration = {
  id: string;
  name: string;
  description: string;
  icon?: string;
  iconNode?: React.ReactNode;
  iconClassName?: string;
  iconBg?: string;
  iconBorder?: boolean;
};

const INTEGRATIONS: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Monitor, reply, escalate",
    icon: "/integrations-mockup/slack.svg",
    iconBg: "#ffffff",
    iconBorder: true,
  },
  {
    id: "teams",
    name: "Teams",
    description: "Monitor, reply, escalate",
    icon: "/integrations-mockup/teams.png",
    iconClassName: "h-6 w-auto max-w-[2rem] object-contain sm:h-7 sm:max-w-[2.25rem]",
    iconBg: "#ffffff",
    iconBorder: true,
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Triage, draft, log",
    icon: "/integrations-mockup/gmail.svg",
    iconBg: "#ffffff",
    iconBorder: true,
  },
  {
    id: "outlook-email",
    name: "Outlook Email",
    description: "Triage, draft, log",
    icon: "/integrations-mockup/outlook-email.png",
    iconClassName: "size-6 object-contain sm:size-7",
    iconBorder: true,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Plan, defend, reschedule",
    iconNode: <GoogleCalendarIcon className="size-6 sm:size-7" />,
    iconBg: "#ffffff",
    iconBorder: true,
  },
  {
    id: "outlook-calendar",
    name: "Outlook Calendar",
    description: "Plan, defend, reschedule",
    icon: "/integrations-mockup/outlook-calendar.png",
    iconBorder: true,
  },
  {
    id: "granola",
    name: "Granola",
    description: "Plan, defend, reschedule",
    icon: "/integrations-mockup/granola.png",
    iconClassName: "size-full object-cover",
    iconBorder: true,
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Plan, defend, reschedule",
    icon: "/integrations-mockup/zoom.png",
    iconClassName: "size-full object-cover",
    iconBorder: true,
  },
  {
    id: "hubspot",
    name: "Hubspot",
    description: "Update, forecast, follow up",
    icon: "/integrations-mockup/hubspot-icon.svg",
    iconClassName: "size-6 object-contain sm:size-7",
    iconBg: "#ff7a59",
    iconBorder: true,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Log, update, commit",
    icon: "/integrations-mockup/salesforce.svg",
    iconBg: "#ffffff",
    iconBorder: true,
  },
];

export function IntegrationsMockup() {
  const [activeId, setActiveId] = useState<string | null>("slack");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="grid w-full max-w-[26rem] grid-cols-2 gap-1.5 p-3 text-[#f4f4f4] sm:max-w-[28rem] sm:gap-2 sm:p-4">
      {INTEGRATIONS.map((integration) => {
        const isActive = activeId === integration.id;
        const isHovered = hoveredId === integration.id;

        return (
          <button
            key={integration.id}
            aria-pressed={isActive}
            className={cn(
              "integrations-mockup-card flex min-h-[4.25rem] items-center gap-2.5 rounded-xl border border-[#2e2e2e] bg-[#1c1c1c] p-2.5 text-left transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out sm:min-h-[4.75rem] sm:gap-3 sm:p-3",
              isActive &&
                "border-white/25 bg-[#222222] shadow-[0_1px_2px_rgba(0,0,0,0.4)]",
              isHovered && !isActive && "border-white/15 bg-[#202020]",
            )}
            onClick={() => handleToggle(integration.id)}
            onMouseEnter={() => setHoveredId(integration.id)}
            onMouseLeave={() => setHoveredId(null)}
            type="button"
          >
            <div
              className={cn(
                "relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[0.625rem] sm:size-10",
                integration.iconBorder && "border border-[#2e2e2e]",
              )}
              style={{
                backgroundColor: integration.iconBg ?? "transparent",
              }}
            >
              {integration.iconNode ??
                (integration.icon ? (
                  <Image
                    alt=""
                    className={cn(
                      "object-contain",
                      integration.iconClassName ?? "size-6 object-contain sm:size-7",
                    )}
                    height={28}
                    src={integration.icon}
                    width={28}
                  />
                ) : null)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02em] sm:text-sm">
                {integration.name}
              </p>
              <p className="truncate text-[0.6875rem] leading-[1.4] tracking-[-0.02em] text-[#828282] sm:text-[0.75rem]">
                {integration.description}
              </p>
            </div>

            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-md bg-[#2a2a2a] text-[#949494] transition-[background-color,color,transform] duration-200 ease-out sm:size-6",
                isActive && "bg-[#333333] text-[#f4f4f4]",
                isHovered && !isActive && "text-[#c4c4c4]",
              )}
            >
              <PlusIcon className="size-3 sm:size-3.5" />
            </span>
          </button>
        );
      })}
    </div>
  );
}

function GoogleCalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 2v2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H8V2H6z" fill="#fff" />
      <path d="M4 6h16v14H4V6z" fill="#fff" />
      <path d="M4 6h8v7H4V6z" fill="#1a73e8" />
      <path d="M12 6h8v7h-8V6z" fill="#ea4335" />
      <path d="M4 13h8v7H4v-7z" fill="#fbbc04" />
      <path d="M12 13h8v7h-8v-7z" fill="#34a853" />
      <path
        d="M8.5 11.5h1.2v-1.2H8.5v1.2zm0 2.4h1.2v-1.2H8.5v1.2zm2.4-2.4h1.2v-1.2h-1.2v1.2zm0 2.4h1.2v-1.2h-1.2v1.2z"
        fill="#fff"
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
        d="M8 3.5v9M3.5 8h9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}
