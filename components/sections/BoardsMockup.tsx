"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";

type ColumnVariant = "backlog" | "today" | "progress" | "review";

type Task = {
  id: string;
  title: string;
  agentLabel?: string;
};

type BoardColumn = {
  id: string;
  title: string;
  count: number;
  variant: ColumnVariant;
  tasks: Task[];
};

const COLUMNS: BoardColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    count: 16,
    variant: "backlog",
    tasks: [
      {
        id: "b1",
        title:
          "Follow up with the customer to ensure satisfaction with the recent service",
      },
      {
        id: "b2",
        title:
          "Prepare a report on customer feedback for the upcoming team meeting",
      },
      {
        id: "b3",
        title: "Follow-up on customer feedback for product enhancement",
      },
      {
        id: "b4",
        title: "Schedule a meeting to discuss project timelines",
      },
    ],
  },
  {
    id: "today",
    title: "Today",
    count: 3,
    variant: "today",
    tasks: [
      {
        id: "t1",
        title: "Schedule a meeting to discuss project timelines",
      },
      {
        id: "t2",
        title: "Prepare a presentation for the upcoming client pitch",
      },
      {
        id: "t3",
        title: "Review and finalize the project budget estimates",
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    count: 2,
    variant: "progress",
    tasks: [
      {
        id: "p1",
        title: "Schedule a meeting to discuss project timelines",
        agentLabel: "3 agents at work...",
      },
      {
        id: "p2",
        title: "Prepare a presentation for the upcoming client pitch",
        agentLabel: "1 agent at work...",
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    count: 16,
    variant: "review",
    tasks: [
      {
        id: "r1",
        title: "Schedule a meeting to discuss project timelines",
      },
      {
        id: "r2",
        title: "Prepare a presentation for the upcoming client pitch",
      },
      {
        id: "r3",
        title: "Review and finalize the project budget estimates",
      },
      {
        id: "r4",
        title: "Prepare the presentation for stakeholder meeting",
      },
    ],
  },
];

const columnSurface: Record<ColumnVariant, string> = {
  backlog: "from-white/[0.06] to-transparent",
  today: "from-[#02abff]/10 to-transparent",
  progress: "from-[#5d60ed]/12 to-transparent",
  review: "from-[#e8963a]/10 to-transparent",
};

export function BoardsMockup() {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const handleTaskClick = useCallback((id: string) => {
    setActiveTaskId((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="boards-mockup-scroll w-full overflow-x-auto overscroll-x-contain p-3 sm:p-4">
      <div className="flex min-w-max gap-3 sm:gap-4">
        {COLUMNS.map((column) => (
          <section
            key={column.id}
            className={cn(
              "flex w-[13.5rem] shrink-0 flex-col gap-3 rounded-2xl bg-gradient-to-b p-2 sm:w-[14.5rem] sm:gap-4 sm:p-2.5",
              columnSurface[column.variant],
            )}
          >
            <header className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <ColumnStatusIcon variant={column.variant} />
                <h4 className="text-sm font-medium leading-normal tracking-[-0.02em] text-[#f4f4f4]">
                  {column.title}
                </h4>
              </div>
              <span className="text-sm leading-normal tracking-[-0.02em] text-[#828282]">
                {column.count}
              </span>
            </header>

            <div className="flex flex-col gap-2">
              {column.tasks.map((task) => {
                const isActive = activeTaskId === task.id;

                return (
                  <button
                    key={task.id}
                    aria-pressed={isActive}
                    className={cn(
                      "boards-mockup-card flex flex-col overflow-hidden rounded-xl border border-[#2e2e2e] bg-[#1c1c1c] text-left shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-[border-color,background-color,transform] duration-200 ease-out",
                      isActive && "border-white/20 bg-[#222222]",
                    )}
                    onClick={() => handleTaskClick(task.id)}
                    type="button"
                  >
                    <p className="px-3 py-3 text-[0.8125rem] leading-[1.4] tracking-[-0.02em] text-[#f4f4f4] sm:px-4 sm:py-3.5 sm:text-sm">
                      {task.title}
                    </p>
                    <div className="flex items-center justify-between px-2.5 pb-2.5 sm:px-3 sm:pb-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <AssigneeAvatars />
                        {task.agentLabel ? (
                          <span className="truncate bg-gradient-to-r from-[#5db1ed] to-[#5d60ed] bg-clip-text text-[0.6875rem] leading-[1.4] tracking-[-0.02em] text-transparent sm:text-xs">
                            {task.agentLabel}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex shrink-0 items-center gap-3 text-[#828282]">
                        <TaskStatusIcon variant={column.variant} />
                        <MoreIcon className="size-4" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function AssigneeAvatars() {
  return (
    <div className="flex items-center">
      <div className="relative size-5 overflow-hidden rounded-full border border-[#1c1c1c]">
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="20px"
          src="/boards-mockup/avatar.png"
        />
      </div>
      <div className="relative -ml-1.5 flex size-5 items-center justify-center overflow-hidden rounded-full border border-[#1c1c1c] bg-[#02abff]">
        <Image
          alt=""
          className="size-2.5 object-contain"
          height={10}
          src="/boards-mockup/agent-icon.svg"
          width={10}
        />
      </div>
    </div>
  );
}

function ColumnStatusIcon({ variant }: { variant: ColumnVariant }) {
  if (variant === "backlog") {
    return (
      <svg aria-hidden className="size-5 text-[#828282]" viewBox="0 0 20 20">
        <circle
          cx="10"
          cy="10"
          fill="none"
          r="7"
          stroke="currentColor"
          strokeDasharray="2 2"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (variant === "today") {
    return (
      <svg aria-hidden className="size-5 text-[#02abff]" viewBox="0 0 20 20">
        <circle
          cx="10"
          cy="10"
          fill="none"
          r="7"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (variant === "progress") {
    return (
      <svg aria-hidden className="size-5 text-[#5d60ed]" viewBox="0 0 20 20">
        <path
          d="M10 3a7 7 0 0 1 7 7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <circle cx="10" cy="10" fill="currentColor" r="2.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden className="size-5 text-[#e8963a]" viewBox="0 0 20 20">
      <circle cx="10" cy="10" fill="currentColor" r="3.5" />
    </svg>
  );
}

function TaskStatusIcon({ variant }: { variant: ColumnVariant }) {
  if (variant === "backlog") {
    return (
      <svg aria-hidden className="size-4 text-[#828282]" viewBox="0 0 16 16">
        <circle
          cx="8"
          cy="8"
          fill="none"
          r="5.5"
          stroke="currentColor"
          strokeDasharray="2 2"
          strokeWidth="1.25"
        />
      </svg>
    );
  }

  if (variant === "today" || variant === "review") {
    return (
      <svg aria-hidden className="size-4 text-[#02abff]" viewBox="0 0 16 16">
        <circle
          cx="8"
          cy="8"
          fill="none"
          r="5.5"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden className="size-4 text-[#5d60ed]" viewBox="0 0 16 16">
      <path
        d="M8 2.5a5.5 5.5 0 0 1 5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
      <circle cx="8" cy="8" fill="currentColor" r="2" />
    </svg>
  );
}

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <circle cx="3.5" cy="8" r="1" />
      <circle cx="8" cy="8" r="1" />
      <circle cx="12.5" cy="8" r="1" />
    </svg>
  );
}
