export type AgentFlowAnimationStep = 0 | 1 | 2 | 3 | 4;

export const STEP_DURATIONS_MS: Record<AgentFlowAnimationStep, number> = {
  0: 900,
  1: 900,
  2: 900,
  3: 1100,
  4: 1200,
};

export const HOLD_DURATION_MS = 2500;

export const CONTENT_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const SCROLL_TRANSITION_MS = 650;
export const REVEAL_TRANSITION_MS = 500;

export const AGENT_EMOJI = "👾";
