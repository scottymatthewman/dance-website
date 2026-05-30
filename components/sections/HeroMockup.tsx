"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { SiteIcon, type SiteIconName } from "@/components/ui/SiteIcon";
import { cn } from "@/lib/cn";

type NavItem = {
  id: string;
  label: string;
  icon: SiteIconName;
};

type Suggestion = {
  category: string;
  prompt: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "new-chat", label: "New Chat", icon: "nav-newchat" },
  { id: "customers", label: "Customers", icon: "nav-customers" },
  { id: "tasks", label: "Tasks", icon: "nav-tasks" },
  { id: "agents", label: "Agents", icon: "nav-agents" },
  { id: "marketplace", label: "Marketplace", icon: "nav-marketplace" },
  { id: "history", label: "History", icon: "nav-history" },
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
            <SiteIcon className="size-4 text-[#949494]" name="nav-bartoggle" />
            <SiteIcon className="size-4 text-[#949494]" name="nav-chevronleft" />
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
            <SiteIcon className="size-4 shrink-0 text-[#d4d4d4]" name="tab-writeIcon" />
            <span className="whitespace-nowrap text-[0.8125rem] leading-[1.4] tracking-[-0.02em] text-[#d4d4d4]">
              New Chat
            </span>
          </div>
          <SiteIcon className="size-4 shrink-0 text-[#949494]" name="tabBar-add" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-tl-xl bg-[#141414] px-4 pb-6 pt-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)] sm:px-8 md:px-12 lg:px-16 xl:px-[15%]">
          <div className="flex w-full max-w-[43.625rem] flex-col items-center gap-4 sm:gap-6">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <SiteIcon
                className="h-5 aspect-[19/26] text-[#f4f4f4] sm:h-6"
                name="kya-logo"
              />
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
                    <SiteIcon className="size-4 text-[#949494]" name="chatbox-add" />
                  </IconButton>
                  <IconButton aria-label="Browse sources">
                    <SiteIcon className="size-4 text-[#949494]" name="chatbox-model" />
                  </IconButton>
                </div>
                <button
                  aria-label="Send message"
                  className="hero-mockup-send flex size-8 items-center justify-center rounded-full bg-[#2a2a2a] transition-[background-color,transform] duration-200 ease-out"
                  type="button"
                >
                  <SiteIcon className="size-4 text-[#949494]" name="chatbox-send" />
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
                    <SiteIcon
                      className={cn(
                        "size-4 shrink-0 text-[#828282] transition-[color,transform] duration-200 ease-out",
                        hoveredSuggestion === index &&
                          "translate-x-0.5 -translate-y-0.5 text-[#f4f4f4]",
                      )}
                      name="suggestedprompt-send"
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
  icon: SiteIconName;
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
          "flex size-4 shrink-0 items-center justify-center text-[#949494]",
          active && "text-[#f4f4f4]",
          active && label === "New Chat" && "rounded-full bg-[#333]",
        )}
      >
        <SiteIcon className="size-4" name={icon} />
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