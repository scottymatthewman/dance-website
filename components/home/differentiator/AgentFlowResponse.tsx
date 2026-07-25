import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  CONTENT_EASE,
  REVEAL_TRANSITION_MS,
} from "@/lib/home/differentiator-agent-flow/constants";
import type { AgentFlowConfig } from "@/lib/home/differentiator-agent-flow/flows";
import {
  getBudgetMeterProgress,
  getVenueActionRevealProgress,
  type AgentFlowViewState,
} from "@/lib/home/differentiator-agent-flow/timeline";

function formatCurrency(amount: number): string {
  return `$${Math.round(amount).toLocaleString("en-US")}`;
}

function CollapsibleBlock({
  open,
  animate,
  children,
  className,
}: {
  open: boolean;
  animate: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid",
        animate && "transition-[grid-template-rows] ease-[var(--agent-flow-ease)]",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        className,
      )}
      style={{
        transitionDuration: animate ? `${REVEAL_TRANSITION_MS}ms` : undefined,
        ["--agent-flow-ease" as string]: CONTENT_EASE,
      }}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            animate &&
              "transition-[opacity,transform,filter] ease-[var(--agent-flow-ease)]",
            open
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-1 opacity-0 blur-[2px]",
          )}
          style={{
            transitionDuration: animate ? `${REVEAL_TRANSITION_MS}ms` : undefined,
            ["--agent-flow-ease" as string]: CONTENT_EASE,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-[#999]">
      <path
        d="M6 4.5 10 8 6 11.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BudgetResponse({
  flow,
  state,
  animate,
}: {
  flow: AgentFlowConfig;
  state: AgentFlowViewState;
  animate: boolean;
}) {
  const budget = flow.response.budget;
  if (!budget) {
    return null;
  }

  const meterProgress = animate
    ? getBudgetMeterProgress(state)
    : state.showAgentExtras
      ? 1
      : 0;
  const spentValue = budget.spentAmount * meterProgress;
  const spendProgress = spentValue / budget.totalAmount;

  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-body-md leading-normal text-primary md:leading-[1.5]">
        {budget.summaryPrefix}
        <span className="font-semibold text-[#137100]">{budget.amount}</span>
        {budget.summarySuffix}
      </p>

      <CollapsibleBlock open={state.showAgentExtras} animate={animate}>
        <div className="pt-1.5">
          <div className="rounded-[6px] border border-[#eee] bg-white/60 p-2.5 shadow-[0_6px_10px_rgba(0,0,0,0.04)] backdrop-blur-[1.6px]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] leading-[1.4] tracking-[-0.02em] text-primary">
                Total Spend
              </span>
              <span className="text-[10px] font-medium leading-[1.4] tracking-[-0.02em] text-primary">
                <span>{formatCurrency(spentValue)}</span>
                <span className="opacity-40"> / </span>
                <span className="opacity-40">
                  {formatCurrency(budget.totalAmount)}
                </span>
              </span>
            </div>
            <div className="mt-1.5 h-[2.9rem] overflow-hidden rounded-[3px] bg-[#f5f5f5]">
              <div
                className="h-full rounded-[3px] bg-[#dea8ff]"
                style={{ width: `${spendProgress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CollapsibleBlock>
    </div>
  );
}

function VenueResponse({
  flow,
  state,
  animate,
}: {
  flow: AgentFlowConfig;
  state: AgentFlowViewState;
  animate: boolean;
}) {
  const venue = flow.response.venue;
  if (!venue) {
    return null;
  }

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#eee] px-2 py-1">
          <img
            src={venue.ownerAvatar}
            alt=""
            className="size-4 shrink-0 rounded-full object-cover"
            draggable={false}
          />
          <span className="text-body-md leading-normal text-primary md:leading-[1.5]">
            {venue.ownerName}
          </span>
        </span>
        <span className="text-body-md leading-normal text-primary md:leading-[1.5]">
          {venue.ownerStatement}
        </span>
      </div>

      <CollapsibleBlock open={state.showAgentExtras} animate={animate}>
        <div className="flex flex-col pt-1.5 [&>*+*]:mt-1">
          {venue.actions.map((action, index) => {
            const revealProgress = animate
              ? getVenueActionRevealProgress(
                  state,
                  index,
                  venue.actions.length,
                )
              : state.showAgentExtras
                ? 1
                : 0;

            return (
              <CollapsibleBlock
                key={action}
                open={revealProgress > 0}
                animate={animate}
                spacing={false}
              >
                <div
                  className="flex items-center gap-0.5"
                  style={{
                    opacity: revealProgress,
                    transform: `translateY(${(1 - revealProgress) * 4}px)`,
                    filter: `blur(${(1 - revealProgress) * 2}px)`,
                  }}
                >
                  <span className="inline-flex rounded-[4px] border border-[#eee] bg-[#eee] py-1 pl-3 pr-2 text-body-md leading-normal text-primary md:leading-[1.5]">
                    {action}
                  </span>
                  <ChevronIcon />
                </div>
              </CollapsibleBlock>
            );
          })}
        </div>
      </CollapsibleBlock>
    </div>
  );
}

function TimelineResponse({
  flow,
  state,
  animate,
}: {
  flow: AgentFlowConfig;
  state: AgentFlowViewState;
  animate: boolean;
}) {
  const timeline = flow.response.timeline;
  if (!timeline) {
    return null;
  }

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-body-md leading-normal text-primary md:leading-[1.5]">
          {timeline.intro}
        </span>
        <span className="inline-flex rounded-[6px] border border-[rgba(0,142,231,0.4)] bg-[#e9f6ff] px-2 py-0.5 text-[13px] leading-[1.4] tracking-[-0.02em] text-[#008ee7]">
          {timeline.eventName}
        </span>
      </div>

      <p
        className={cn(
          "text-body-md leading-normal text-primary md:leading-[1.5]",
          animate && "transition-opacity duration-500 ease-out",
        )}
      >
        {state.showAgentExtras ? timeline.summaryExtended : timeline.summaryInitial}
      </p>
    </div>
  );
}

export function AgentFlowResponse({
  flow,
  state,
  animate,
}: {
  flow: AgentFlowConfig;
  state: AgentFlowViewState;
  animate: boolean;
}) {
  return (
    <div className="min-w-0 flex-1">
      {flow.id === "budget" ? (
        <BudgetResponse flow={flow} state={state} animate={animate} />
      ) : null}
      {flow.id === "venue" ? (
        <VenueResponse flow={flow} state={state} animate={animate} />
      ) : null}
      {flow.id === "timeline" ? (
        <TimelineResponse flow={flow} state={state} animate={animate} />
      ) : null}
    </div>
  );
}
