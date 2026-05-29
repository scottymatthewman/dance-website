"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type Suggestion = {
  category: string;
  prompt: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "new-chat",
    label: "New Chat",
    icon: <PlusIcon />,
  },
  {
    id: "customers",
    label: "Customers",
    icon: <UsersIcon />,
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: <CheckSquareIcon />,
  },
  {
    id: "agents",
    label: "Agents",
    icon: <BotIcon />,
  },
  {
    id: "marketplace",
    label: "Marketplace",
    icon: <StoreIcon />,
  },
  {
    id: "history",
    label: "History",
    icon: <ClockIcon />,
  },
];

const SUGGESTIONS: Suggestion[] = [
  {
    category: "Accounts",
    prompt: "How healthy is Xero this week?",
  },
  {
    category: "Signals",
    prompt: "What changed across my book in the last 7 days?",
  },
  {
    category: "Playbooks",
    prompt: "How do we handle a stalled onboarding?",
  },
];

export function HeroMockup() {
  const [activeNav, setActiveNav] = useState("new-chat");
  const [inputValue, setInputValue] = useState("");
  const [hoveredSuggestion, setHoveredSuggestion] = useState<number | null>(
    null,
  );

  const handleSuggestionClick = useCallback((prompt: string) => {
    setInputValue(prompt);
  }, []);

  return (
    <div className="hero-mockup flex h-full min-h-0 w-full overflow-hidden bg-[#0f0f0f] text-[#f4f4f4]">
      <aside className="hero-mockup-sidebar flex w-[14.4%] min-w-[9.5rem] max-w-[16.375rem] shrink-0 flex-col justify-between border-r border-white/[0.06] bg-[#0f0f0f]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-3.5 py-4">
            <MenuIcon className="size-4 text-[#949494]" />
            <div className="flex items-center gap-1">
              <ChevronIcon className="size-4 text-[#949494]" />
            </div>
          </div>

          <nav className="flex flex-col gap-px px-2">
            {NAV_ITEMS.map((item) => (
              <NavButton
                key={item.id}
                active={activeNav === item.id}
                icon={item.icon}
                label={item.label}
                onClick={() => setActiveNav(item.id)}
              />
            ))}
          </nav>
        </div>

        <div className="p-2.5">
          <div className="hero-mockup-nav-item flex items-center gap-3 rounded-xl p-1.5">
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
            <SparkleIcon className="size-4 shrink-0" />
            <span className="whitespace-nowrap text-[0.8125rem] leading-[1.4] tracking-[-0.02em] text-[#d4d4d4]">
              New Chat
            </span>
          </div>
          <PlusIcon className="size-4 shrink-0 text-[#949494]" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-tl-xl bg-[#141414] px-4 pb-6 pt-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)] sm:px-8 md:px-12 lg:px-16 xl:px-[15%]">
          <div className="flex w-full max-w-[43.625rem] flex-col items-center gap-4 sm:gap-6">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <SparkleIcon className="size-5 sm:size-6" />
              <h2 className="text-center text-[1.375rem] leading-[1.4] tracking-[-0.02em] sm:text-[1.75rem]">
                <span className="font-normal">Work </span>
                <span className="font-medium">Smarter</span>
              </h2>
            </div>

            <div
              className={cn(
                "hero-mockup-input w-full max-w-[43.625rem] rounded-2xl border border-[#2e2e2e] bg-[#1c1c1c] p-3 shadow-[0_10px_16px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow] duration-200 ease-out focus-within:border-white/35 focus-within:shadow-[0_10px_16px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.12)]",
                inputValue && "border-[#3a3a3a]",
              )}
            >
              <label className="sr-only" htmlFor="hero-mockup-question">
                Ask a question
              </label>
              <textarea
                className="block w-full resize-none bg-transparent px-1 py-1 text-[0.875rem] leading-[1.4] tracking-[-0.02em] text-[#f4f4f4] outline-none placeholder:text-[#6b6b6b]"
                id="hero-mockup-question"
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Ask a question..."
                rows={1}
                value={inputValue}
              />
              <div className="mt-6 flex items-center justify-between sm:mt-8">
                <div className="flex items-center gap-3">
                  <IconButton aria-label="Add attachment">
                    <PlusIcon className="size-4" />
                  </IconButton>
                  <IconButton aria-label="Browse sources">
                    <GlobeIcon className="size-4" />
                  </IconButton>
                </div>
                <button
                  aria-label="Send message"
                  className="hero-mockup-send flex size-8 items-center justify-center rounded-full bg-[#2a2a2a] transition-[background-color,transform] duration-200 ease-out"
                  type="button"
                >
                  <ArrowUpIcon className="size-4" />
                </button>
              </div>
            </div>

            <div className="w-full max-w-[43.625rem] px-2 sm:px-4">
              {SUGGESTIONS.map((suggestion, index) => (
                <div key={suggestion.category}>
                  <button
                    className={cn(
                      "hero-mockup-suggestion group flex w-full items-center gap-3 px-2 py-3 text-left transition-[background-color] duration-200 ease-out sm:gap-6 sm:px-2 sm:py-3",
                      hoveredSuggestion === index && "is-hovered",
                    )}
                    onClick={() => handleSuggestionClick(suggestion.prompt)}
                    onMouseEnter={() => setHoveredSuggestion(index)}
                    onMouseLeave={() => setHoveredSuggestion(null)}
                    type="button"
                  >
                    <span className="w-24 shrink-0 text-[0.8125rem] leading-[1.4] tracking-[-0.02em] sm:w-[9.25rem]">
                      {suggestion.category}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-[0.8125rem] italic leading-[1.4] tracking-[-0.02em] text-[#828282] transition-colors duration-200 ease-out",
                        hoveredSuggestion === index && "text-[#a8a8a8]",
                      )}
                    >
                      {suggestion.prompt}
                    </span>
                    <ArrowUpRightIcon
                      className={cn(
                        "size-4 shrink-0 text-[#828282] transition-[color,transform] duration-200 ease-out",
                        hoveredSuggestion === index &&
                          "translate-x-0.5 -translate-y-0.5 text-[#f4f4f4]",
                      )}
                    />
                  </button>
                  {index < SUGGESTIONS.length - 1 ? (
                    <div className="h-px bg-white/[0.08]" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "hero-mockup-nav-item flex h-8 w-full items-center gap-2 rounded-lg px-2 py-1 text-left transition-[background-color,opacity] duration-200 ease-out",
        active ? "opacity-100" : "opacity-80",
        active && "is-active",
      )}
      onClick={onClick}
      type="button"
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center",
          active && label === "New Chat" && "rounded-full bg-[#333]",
        )}
      >
        {icon}
      </span>
      <span className="truncate text-[0.8125rem] leading-[1.4] tracking-[-0.02em]">
        {label}
      </span>
    </button>
  );
}

function IconButton({
  "aria-label": ariaLabel,
  children,
}: {
  "aria-label": string;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className="hero-mockup-icon-btn flex size-6 items-center justify-center rounded-full transition-[background-color] duration-200 ease-out"
      type="button"
    >
      {children}
    </button>
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

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2v4M21 11h-4M7 11H3M12 16.127V20M7 6l1.465 1.465M17 6l-1.465 1.465M15.625 14.625L17 16M8.464 14.536C6.116 16.536 4.797 19.017 4 22"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle cx="12" cy="11" r="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25" />
      <ellipse cx="8" cy="8" rx="2.5" ry="5.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.5 8h11" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 12V4M8 4l-3 3M8 4l3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 11l6-6M6 5h5v5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}
