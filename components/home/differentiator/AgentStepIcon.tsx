import { cn } from "@/lib/cn";
import type { AgentStepStatus } from "@/lib/home/differentiator-agent-flow/timeline";

function AgentStepSpinner({ className }: { className?: string }) {
  return (
    <img
      src="/icons/AgentStepLoader.svg"
      alt=""
      aria-hidden
      draggable={false}
      className={cn("agent-step-loader size-4 shrink-0", className)}
    />
  );
}

function AgentStepCheckmark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={cn("size-4 shrink-0", className)}>
      <circle cx="8" cy="8" r="8" fill="#137100" />
      <path
        d="M4.75 8.15 6.95 10.35 11.35 5.85"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AgentStepIcon({ status }: { status: AgentStepStatus }) {
  if (status === "hidden") {
    return <span className="size-4 shrink-0" aria-hidden />;
  }

  if (status === "loading") {
    return <AgentStepSpinner />;
  }

  return <AgentStepCheckmark />;
}
