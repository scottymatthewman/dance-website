import {
  CURSOR_TARGETS,
  GANTT_PHASES,
  PHASE_DURATIONS_MS,
  clamp01,
  easeInOutCubic,
  easeOutCubic,
  lerp,
  type TimelineMockupPhase,
} from "@/lib/home/differentiator-timeline-mockup/constants";

export type DifferentiatorTimelineViewState = {
  gridOpacity: number;
  barRevealProgress: readonly number[];
  cursorX: number;
  cursorY: number;
  cursorOpacity: number;
  cursorClicking: boolean;
};

const PHASE_SEGMENTS = (
  Object.entries(PHASE_DURATIONS_MS) as Array<[TimelineMockupPhase, number]>
).map(([phase, durationMs]) => ({ phase, durationMs }));

const CURSOR_START = { x: 420, y: 52 };

export function getDifferentiatorTimelineLoopDurationMs(): number {
  return PHASE_SEGMENTS.reduce((total, segment) => total + segment.durationMs, 0);
}

function getBarIndex(phase: TimelineMockupPhase): number | null {
  if (phase === "intro" || phase === "hold") {
    return null;
  }

  return Number(phase.replace("bar", ""));
}

function getCursorForBarStep(
  barIndex: number,
  stepProgress: number,
): { x: number; y: number; clicking: boolean; opacity: number } {
  const target = CURSOR_TARGETS[barIndex];
  const from =
    barIndex === 0
      ? CURSOR_START
      : CURSOR_TARGETS[barIndex - 1];

  const moveEnd = 0.62;
  const clickStart = 0.62;
  const clickPeak = 0.72;

  if (stepProgress <= moveEnd) {
    const moveT = easeInOutCubic(stepProgress / moveEnd);
    return {
      x: lerp(from.x, target.x, moveT),
      y: lerp(from.y, target.y, moveT),
      clicking: false,
      opacity: 1,
    };
  }

  const clickT = clamp01((stepProgress - clickStart) / (1 - clickStart));
  const clicking = clickT < 0.55;

  return {
    x: target.x,
    y: target.y,
    clicking,
    opacity: 1,
  };
}

function getBarRevealProgress(
  barIndex: number,
  animationPhase: TimelineMockupPhase,
  stepProgress: number,
): number {
  const activeBarIndex = getBarIndex(animationPhase);

  if (activeBarIndex === null) {
    return animationPhase === "hold" ? 1 : 0;
  }

  if (barIndex < activeBarIndex) {
    return 1;
  }

  if (barIndex > activeBarIndex) {
    return 0;
  }

  const revealStart = 0.62;
  if (stepProgress <= revealStart) {
    return 0;
  }

  return easeOutCubic(clamp01((stepProgress - revealStart) / (1 - revealStart)));
}

export function getDifferentiatorTimelineState(
  elapsedMs: number,
  loop = true,
): DifferentiatorTimelineViewState {
  const loopDurationMs = getDifferentiatorTimelineLoopDurationMs();
  const normalizedMs = loop
    ? ((elapsedMs % loopDurationMs) + loopDurationMs) % loopDurationMs
    : Math.min(Math.max(elapsedMs, 0), loopDurationMs);

  let cursor = 0;

  for (const segment of PHASE_SEGMENTS) {
    const segmentEnd = cursor + segment.durationMs;
    if (normalizedMs < segmentEnd) {
      const stepProgress =
        segment.durationMs > 0
          ? clamp01((normalizedMs - cursor) / segment.durationMs)
          : 1;

      const barIndex = getBarIndex(segment.phase);
      const gridOpacity =
        segment.phase === "intro"
          ? easeOutCubic(stepProgress)
          : 1;

      if (barIndex === null) {
        return {
          gridOpacity: segment.phase === "hold" ? 1 : gridOpacity,
          barRevealProgress: GANTT_PHASES.map((_, index) =>
            segment.phase === "hold"
              ? 1
              : getBarRevealProgress(index, segment.phase, stepProgress),
          ),
          cursorX: segment.phase === "hold" ? CURSOR_TARGETS.at(-1)!.x : CURSOR_START.x,
          cursorY: segment.phase === "hold" ? CURSOR_TARGETS.at(-1)!.y : CURSOR_START.y,
          cursorOpacity: segment.phase === "intro" ? easeOutCubic(stepProgress) : 1,
          cursorClicking: false,
        };
      }

      const cursorState = getCursorForBarStep(barIndex, stepProgress);

      return {
        gridOpacity: 1,
        barRevealProgress: GANTT_PHASES.map((_, index) =>
          getBarRevealProgress(index, segment.phase, stepProgress),
        ),
        cursorX: cursorState.x,
        cursorY: cursorState.y,
        cursorOpacity: 1,
        cursorClicking: cursorState.clicking,
      };
    }

    cursor = segmentEnd;
  }

  return {
    gridOpacity: 1,
    barRevealProgress: GANTT_PHASES.map(() => 1),
    cursorX: CURSOR_TARGETS.at(-1)!.x,
    cursorY: CURSOR_TARGETS.at(-1)!.y,
    cursorOpacity: 1,
    cursorClicking: false,
  };
}
