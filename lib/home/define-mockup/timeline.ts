import {
  CHILD_NODES,
  DEFINE_DESIGN_HEIGHT,
  DEFINE_DESIGN_WIDTH,
  PHASE_DURATIONS_MS,
  PRIMARY_NODES,
  clamp01,
  easeOutCubic,
  type DefineAnimationPhase,
} from "@/lib/home/define-mockup/constants";

export type DefineMockupViewState = {
  phase: DefineAnimationPhase;
  phaseProgress: number;
  /** Core event card pop-in, 0..1 */
  coreProgress: number;
  /** Per primary node reveal, 0..1 (connector + card) */
  branchProgress: number[];
  /** Per child node reveal, 0..1 */
  childProgress: number[];
  viewLeft: number;
  viewTop: number;
  viewWidth: number;
  viewHeight: number;
};

const PHASE_SEGMENTS = (
  Object.entries(PHASE_DURATIONS_MS) as Array<[DefineAnimationPhase, number]>
).map(([phase, durationMs]) => ({ phase, durationMs }));

export function getDefineMockupLoopDurationMs(): number {
  return PHASE_SEGMENTS.reduce(
    (total, segment) => total + segment.durationMs,
    0,
  );
}

function getStaggeredProgress(
  phaseProgress: number,
  index: number,
  count: number,
  window = 0.85,
): number {
  const stagger = window / count;
  const start = index * stagger;
  const duration = stagger * 1.9;
  return easeOutCubic(clamp01((phaseProgress - start) / duration));
}

function getViewport() {
  return {
    viewLeft: 0,
    viewTop: 0,
    viewWidth: DEFINE_DESIGN_WIDTH,
    viewHeight: DEFINE_DESIGN_HEIGHT,
  };
}

function getStateForPhase(
  phase: DefineAnimationPhase,
  phaseProgress: number,
): DefineMockupViewState {
  const coreProgress =
    phase === "intro" ? easeOutCubic(clamp01(phaseProgress / 0.7)) : 1;

  const branchProgress = PRIMARY_NODES.map((_, index) => {
    if (phase === "intro") {
      return 0;
    }
    if (phase === "branches") {
      return getStaggeredProgress(phaseProgress, index, PRIMARY_NODES.length);
    }
    return 1;
  });

  const childProgress = CHILD_NODES.map((_, index) => {
    if (phase === "intro" || phase === "branches") {
      return 0;
    }
    if (phase === "children") {
      return getStaggeredProgress(phaseProgress, index, CHILD_NODES.length);
    }
    return 1;
  });

  return {
    phase,
    phaseProgress,
    coreProgress,
    branchProgress,
    childProgress,
    ...getViewport(),
  };
}

export function getDefineMockupState(
  elapsedMs: number,
  loop = true,
): DefineMockupViewState {
  const loopDurationMs = getDefineMockupLoopDurationMs();
  const normalizedMs = loop
    ? ((elapsedMs % loopDurationMs) + loopDurationMs) % loopDurationMs
    : Math.min(Math.max(elapsedMs, 0), loopDurationMs);

  let cursor = 0;

  for (const segment of PHASE_SEGMENTS) {
    const segmentEnd = cursor + segment.durationMs;
    if (normalizedMs < segmentEnd) {
      const phaseProgress =
        segment.durationMs > 0
          ? (normalizedMs - cursor) / segment.durationMs
          : 1;

      return getStateForPhase(segment.phase, phaseProgress);
    }
    cursor = segmentEnd;
  }

  return getStateForPhase("hold", 1);
}
