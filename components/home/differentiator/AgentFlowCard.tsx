"use client";

import { AgentFlowResponse } from "@/components/home/differentiator/AgentFlowResponse";
import { AgentStepIcon } from "@/components/home/differentiator/AgentStepIcon";
import { cn } from "@/lib/cn";
import {
  AGENT_EMOJI,
  CONTENT_EASE,
  REVEAL_TRANSITION_MS,
  SCROLL_TRANSITION_MS,
} from "@/lib/home/differentiator-agent-flow/constants";
import type { AgentFlowConfig } from "@/lib/home/differentiator-agent-flow/flows";
import {
  getStepStatus,
  type AgentFlowViewState,
} from "@/lib/home/differentiator-agent-flow/timeline";

function AgentStepRow({
  label,
  status,
  animate,
  highlightSlack,
}: {
  label: string;
  status: ReturnType<typeof getStepStatus>;
  animate: boolean;
  highlightSlack?: string;
}) {
  if (status === "hidden") {
    return null;
  }

  const slackIndex = highlightSlack ? label.indexOf(highlightSlack) : -1;
  const beforeSlack = slackIndex >= 0 ? label.slice(0, slackIndex) : label;
  const afterSlack =
    slackIndex >= 0 ? label.slice(slackIndex + highlightSlack!.length) : "";

  return (
    <li
      className={cn(
        "flex items-center gap-2 text-body-md leading-normal text-secondary md:leading-[1.5]",
        animate &&
          "animate-[agent-flow-step-in_500ms_var(--agent-flow-ease)_both]",
      )}
      style={{ ["--agent-flow-ease" as string]: CONTENT_EASE }}
    >
      <AgentStepIcon status={status} />
      <span>
        {slackIndex >= 0 ? (
          <>
            {beforeSlack}
            <span className="font-medium text-[#8500ba] underline decoration-from-font underline-offset-[2px]">
              {highlightSlack}
            </span>
            {afterSlack}
          </>
        ) : (
          label
        )}
      </span>
    </li>
  );
}

type AgentFlowCardProps = {
  flow: AgentFlowConfig;
  state: AgentFlowViewState;
  animate?: boolean;
  className?: string;
};

export function AgentFlowCard({
  flow,
  state,
  animate = true,
  className,
}: AgentFlowCardProps) {
  const slackLabel = flow.response.venue?.slackLabel;

  return (
    <div
      className={cn(
        "relative h-[16.5rem] overflow-hidden md:h-[18.5rem]",
        className,
      )}
      aria-live="polite"
      aria-relevant="additions text"
    >
      <div
        className={cn(
          "flex flex-col gap-6",
          animate && "transition-transform ease-[var(--agent-flow-ease)]",
        )}
        style={{
          transform: `translateY(${state.scrollOffsetRem}rem)`,
          transitionDuration: animate ? `${SCROLL_TRANSITION_MS}ms` : undefined,
          ["--agent-flow-ease" as string]: CONTENT_EASE,
        }}
      >
        <ul className="flex flex-col gap-6">
          {flow.steps.map((step, index) => (
            <AgentStepRow
              key={step}
              label={step}
              status={getStepStatus(index, state.animationStep)}
              animate={animate}
              highlightSlack={
                slackLabel && step.includes(slackLabel) ? slackLabel : undefined
              }
            />
          ))}
        </ul>

        <div
          className={cn(
            "grid",
            animate && "transition-[grid-template-rows] ease-[var(--agent-flow-ease)]",
            state.showAgentResponse ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
          style={{
            transitionDuration: animate ? `${REVEAL_TRANSITION_MS}ms` : undefined,
            ["--agent-flow-ease" as string]: CONTENT_EASE,
          }}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "grid grid-cols-[1rem_minmax(0,1fr)] gap-x-2",
                animate &&
                  "transition-[opacity,transform,filter] ease-[var(--agent-flow-ease)]",
                state.showAgentResponse
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-1 opacity-0 blur-[2px]",
              )}
              style={{
                transitionDuration: animate ? `${REVEAL_TRANSITION_MS}ms` : undefined,
                ["--agent-flow-ease" as string]: CONTENT_EASE,
              }}
            >
              <span
                aria-hidden
                className="col-start-1 row-start-1 flex w-4 shrink-0 items-center self-center text-base leading-none"
              >
                {AGENT_EMOJI}
              </span>
              <AgentFlowResponse flow={flow} state={state} animate={animate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
