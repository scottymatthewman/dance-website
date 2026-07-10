import {
  FULL_DRAFT,
  STEP_0_SUBMIT_PAUSE_MS,
  STEP_DURATIONS_MS,
  TYPING_MS_PER_CHAR,
  type AnimationStep,
} from "@/lib/home/collaborate-mockup/constants";

export type CollaborateMockupViewState = {
  step: AnimationStep;
  draftLength: number;
  /** Progress through the current step, 0–1 */
  stepProgress: number;
};

const STEP_0_DURATION_MS =
  FULL_DRAFT.length * TYPING_MS_PER_CHAR + STEP_0_SUBMIT_PAUSE_MS;

const STEP_SEGMENTS: Array<{ step: AnimationStep; durationMs: number }> = [
  { step: 0, durationMs: STEP_0_DURATION_MS },
  { step: 1, durationMs: STEP_DURATIONS_MS[1] },
  { step: 2, durationMs: STEP_DURATIONS_MS[2] },
  { step: 3, durationMs: STEP_DURATIONS_MS[3] },
  { step: 4, durationMs: STEP_DURATIONS_MS[4] },
  { step: 5, durationMs: STEP_DURATIONS_MS[5] },
];

export function getCollaborateMockupLoopDurationMs(): number {
  return STEP_SEGMENTS.reduce((total, segment) => total + segment.durationMs, 0);
}

function getDraftLengthAtMs(elapsedInStepMs: number): number {
  const typingWindowMs = FULL_DRAFT.length * TYPING_MS_PER_CHAR;
  if (elapsedInStepMs >= typingWindowMs) {
    return FULL_DRAFT.length;
  }

  return Math.min(
    FULL_DRAFT.length,
    Math.floor(elapsedInStepMs / TYPING_MS_PER_CHAR),
  );
}

export function getCollaborateMockupState(
  elapsedMs: number,
  loop = true,
): CollaborateMockupViewState {
  const loopDurationMs = getCollaborateMockupLoopDurationMs();
  const normalizedMs = loop
    ? ((elapsedMs % loopDurationMs) + loopDurationMs) % loopDurationMs
    : Math.min(Math.max(elapsedMs, 0), loopDurationMs);

  let cursor = 0;

  for (const segment of STEP_SEGMENTS) {
    const segmentEnd = cursor + segment.durationMs;
    if (normalizedMs < segmentEnd) {
      const elapsedInStepMs = normalizedMs - cursor;

      return {
        step: segment.step,
        draftLength:
          segment.step === 0
            ? getDraftLengthAtMs(elapsedInStepMs)
            : FULL_DRAFT.length,
        stepProgress: Math.min(
          1,
          segment.durationMs > 0 ? elapsedInStepMs / segment.durationMs : 1,
        ),
      };
    }

    cursor = segmentEnd;
  }

  return {
    step: 5,
    draftLength: FULL_DRAFT.length,
    stepProgress: 1,
  };
}
