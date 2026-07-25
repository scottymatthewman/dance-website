import {
  HOLD_DURATION_MS,
  STEP_DURATIONS_MS,
  type AgentFlowAnimationStep,
} from "@/lib/home/differentiator-agent-flow/constants";
import type { AgentFlowConfig } from "@/lib/home/differentiator-agent-flow/flows";

export type AgentStepStatus = "hidden" | "loading" | "complete";

export type AgentFlowViewState = {
  animationStep: AgentFlowAnimationStep;
  stepProgress: number;
  scrollOffsetRem: number;
  showAgentResponse: boolean;
  showAgentExtras: boolean;
};

const STEP_SEGMENTS: Array<{ step: AgentFlowAnimationStep; durationMs: number }> =
  [
    { step: 0, durationMs: STEP_DURATIONS_MS[0] },
    { step: 1, durationMs: STEP_DURATIONS_MS[1] },
    { step: 2, durationMs: STEP_DURATIONS_MS[2] },
    { step: 3, durationMs: STEP_DURATIONS_MS[3] },
    { step: 4, durationMs: STEP_DURATIONS_MS[4] },
  ];

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export function getBudgetMeterProgress(state: AgentFlowViewState): number {
  if (!state.showAgentExtras) {
    return 0;
  }

  if (state.animationStep === 4) {
    return easeOutCubic(state.stepProgress);
  }

  return 1;
}

export function getVenueActionRevealProgress(
  state: AgentFlowViewState,
  actionIndex: number,
  actionCount: number,
): number {
  if (!state.showAgentExtras) {
    return 0;
  }

  const segmentSize = 1 / actionCount;
  const segmentStart = actionIndex * segmentSize;
  const localProgress =
    (state.stepProgress - segmentStart) / segmentSize;

  return easeOutCubic(Math.min(1, Math.max(0, localProgress)));
}

function getScrollOffsetRem(
  flow: AgentFlowConfig,
  animationStep: AgentFlowAnimationStep,
  stepProgress: number,
): number {
  const from = flow.scrollOffsetsRem[animationStep];
  const to =
    animationStep < 4
      ? flow.scrollOffsetsRem[(animationStep + 1) as AgentFlowAnimationStep]
      : 0;

  return from + (to - from) * easeOutCubic(stepProgress);
}

export function getAgentFlowLoopDurationMs(): number {
  return (
    STEP_SEGMENTS.reduce((total, segment) => total + segment.durationMs, 0) +
    HOLD_DURATION_MS
  );
}

export function getAgentFlowState(
  flow: AgentFlowConfig,
  elapsedMs: number,
  loop = true,
): AgentFlowViewState {
  const loopDurationMs = getAgentFlowLoopDurationMs();
  const normalizedMs = loop
    ? ((elapsedMs % loopDurationMs) + loopDurationMs) % loopDurationMs
    : Math.min(Math.max(elapsedMs, 0), loopDurationMs);

  let cursor = 0;

  for (const segment of STEP_SEGMENTS) {
    const segmentEnd = cursor + segment.durationMs;
    if (normalizedMs < segmentEnd) {
      const stepProgress = Math.min(
        1,
        segment.durationMs > 0
          ? (normalizedMs - cursor) / segment.durationMs
          : 1,
      );

      return {
        animationStep: segment.step,
        stepProgress,
        scrollOffsetRem: getScrollOffsetRem(flow, segment.step, stepProgress),
        showAgentResponse: segment.step >= 3,
        showAgentExtras: segment.step >= 4,
      };
    }

    cursor = segmentEnd;
  }

  return {
    animationStep: 4,
    stepProgress: 1,
    scrollOffsetRem: 0,
    showAgentResponse: true,
    showAgentExtras: true,
  };
}

export function getVisibleStepCount(animationStep: AgentFlowAnimationStep): number {
  return Math.min(3, animationStep + 1);
}

export function getStepStatus(
  stepIndex: number,
  animationStep: AgentFlowAnimationStep,
): AgentStepStatus {
  const visibleCount = getVisibleStepCount(animationStep);

  if (stepIndex >= visibleCount) {
    return "hidden";
  }

  if (stepIndex === visibleCount - 1 && animationStep < 3) {
    return "loading";
  }

  return "complete";
}
