import {
  DRAG_DATES,
  FULL_TIMELINE_HEIGHT,
  FULL_TIMELINE_WIDTH,
  HERO_TIMELINE_TARGET,
  PHASE_DURATIONS_MS,
  STAGE_BAR,
  STAGE_VIEW_HEIGHT,
  STAGE_VIEW_LEFT,
  STAGE_VIEW_TOP,
  STAGE_VIEW_WIDTH,
  TASKS_TOTAL_HEIGHT,
  TASK_ROWS,
  TASK_ROW_HEIGHT,
  TIMELINE_PHASES,
  clamp01,
  easeInOutCubic,
  easeOutCubic,
  formatDragDate,
  lerp,
  type PlanAnimationPhase,
} from "@/lib/home/plan-mockup/constants";

export type PlanMockupViewState = {
  phase: PlanAnimationPhase;
  phaseProgress: number;
  /** Fades all content (grid + hero) — used for intro-in and loop-out */
  contentOpacity: number;
  /** Extra upward offset applied to the hero bar during the intro slide */
  introOffsetY: number;
  /** Hero bar in world (1462×784) coordinates; height is always BAR_HEIGHT */
  barLeft: number;
  barTop: number;
  barWidth: number;
  /** Drag handles + dates */
  chromeVisible: boolean;
  chromeOpacity: number;
  /** 0 = beside the bar, 1 = tucked underneath it */
  chromeHideProgress: number;
  leftDate: string;
  rightDate: string;
  /** Per-row open amount, 0–1 (includes the collapse) */
  rowOpenAmounts: number[];
  tasksVisible: boolean;
  /** Timeline grid/header reveal */
  timelineOpacity: number;
  /** Number of non-hero phase bars currently staggered in (0–7) */
  visiblePhaseCount: number;
  /** Camera view rect in world coordinates */
  viewLeft: number;
  viewTop: number;
  viewWidth: number;
  viewHeight: number;
  /** Scene render height — grows past the design height when the final view
   *  is taller than 784 so grid lines keep running to the bottom */
  sceneHeight: number;
};

const PHASE_SEGMENTS = (
  Object.entries(PHASE_DURATIONS_MS) as Array<[PlanAnimationPhase, number]>
).map(([phase, durationMs]) => ({ phase, durationMs }));

const EXTRA_PHASE_COUNT = TIMELINE_PHASES.length - 1;

export function getPlanMockupLoopDurationMs(): number {
  return PHASE_SEGMENTS.reduce((total, segment) => total + segment.durationMs, 0);
}

const STAGE_VIEW = {
  viewLeft: STAGE_VIEW_LEFT,
  viewTop: STAGE_VIEW_TOP,
  viewWidth: STAGE_VIEW_WIDTH,
  viewHeight: STAGE_VIEW_HEIGHT,
};

const WORLD_ASPECT = FULL_TIMELINE_WIDTH / FULL_TIMELINE_HEIGHT;

/**
 * The zoomed-out camera matches the panel's aspect ratio so the timeline
 * fills it exactly — no letterboxing. Taller panels see more grid below the
 * phases (top-anchored); wider panels see extra margin split left/right.
 */
function getFinalView(viewportAspect: number | undefined) {
  const aspect =
    viewportAspect && viewportAspect > 0 ? viewportAspect : WORLD_ASPECT;

  if (aspect < WORLD_ASPECT) {
    return {
      viewLeft: 0,
      viewTop: 0,
      viewWidth: FULL_TIMELINE_WIDTH,
      viewHeight: FULL_TIMELINE_WIDTH / aspect,
    };
  }

  const viewWidth = FULL_TIMELINE_HEIGHT * aspect;
  return {
    viewLeft: (FULL_TIMELINE_WIDTH - viewWidth) / 2,
    viewTop: 0,
    viewWidth,
    viewHeight: FULL_TIMELINE_HEIGHT,
  };
}

/** Row open amounts while the accordion opens (staggered top → bottom) */
function getOpeningRows(phaseProgress: number): number[] {
  const openWindow = 0.78;
  const stagger = openWindow / TASK_ROWS.length;

  return TASK_ROWS.map((_, index) => {
    const start = index * stagger;
    const duration = stagger * 1.6;
    return easeOutCubic(clamp01((phaseProgress - start) / duration));
  });
}

/** Row open amounts while the accordion closes (staggered bottom → top) */
function getClosingRows(phaseProgress: number): number[] {
  const closeWindow = 0.72;
  const stagger = closeWindow / TASK_ROWS.length;
  const lastIndex = TASK_ROWS.length - 1;

  return TASK_ROWS.map((_, index) => {
    const start = (lastIndex - index) * stagger;
    const duration = stagger * 1.8;
    const closeAmount = easeInOutCubic(
      clamp01((phaseProgress - start) / duration),
    );
    return 1 - closeAmount;
  });
}

function getOpenHeight(rowOpenAmounts: number[]): number {
  return rowOpenAmounts.reduce(
    (height, amount) => height + amount * TASK_ROW_HEIGHT,
    0,
  );
}

/** Bar rises as tasks open so the whole group stays visually centered */
function getBarTopForOpenHeight(openHeight: number): number {
  return (
    STAGE_BAR.centerTop -
    (openHeight / TASKS_TOTAL_HEIGHT) * STAGE_BAR.raiseDistance
  );
}

function getStateForPhase(
  phase: PlanAnimationPhase,
  phaseProgress: number,
  loop: boolean,
  viewportAspect: number | undefined,
): PlanMockupViewState {
  const base: PlanMockupViewState = {
    phase,
    phaseProgress,
    contentOpacity: 1,
    introOffsetY: 0,
    barLeft: STAGE_BAR.narrowLeft,
    barTop: STAGE_BAR.centerTop,
    barWidth: STAGE_BAR.narrowWidth,
    chromeVisible: false,
    chromeOpacity: 0,
    chromeHideProgress: 0,
    leftDate: formatDragDate(DRAG_DATES.leftStartDay),
    rightDate: formatDragDate(DRAG_DATES.rightStartDay),
    rowOpenAmounts: TASK_ROWS.map(() => 0),
    tasksVisible: false,
    timelineOpacity: 0,
    visiblePhaseCount: 0,
    ...STAGE_VIEW,
    sceneHeight: FULL_TIMELINE_HEIGHT,
  };

  if (phase === "intro") {
    const enter = easeOutCubic(phaseProgress);
    return {
      ...base,
      contentOpacity: enter,
      introOffsetY: (1 - enter) * 18,
    };
  }

  if (phase === "resize") {
    const chromeOpacity = easeOutCubic(clamp01(phaseProgress / 0.18));
    const dragProgress = easeInOutCubic(
      clamp01((phaseProgress - 0.24) / (0.88 - 0.24)),
    );

    return {
      ...base,
      barLeft: lerp(STAGE_BAR.narrowLeft, STAGE_BAR.wideLeft, dragProgress),
      barWidth: lerp(STAGE_BAR.narrowWidth, STAGE_BAR.wideWidth, dragProgress),
      chromeVisible: true,
      chromeOpacity,
      leftDate: formatDragDate(
        lerp(DRAG_DATES.leftStartDay, DRAG_DATES.leftEndDay, dragProgress),
      ),
      rightDate: formatDragDate(
        lerp(DRAG_DATES.rightStartDay, DRAG_DATES.rightEndDay, dragProgress),
      ),
    };
  }

  if (phase === "tasks") {
    const rowOpenAmounts = getOpeningRows(phaseProgress);
    const openHeight = getOpenHeight(rowOpenAmounts);

    return {
      ...base,
      barLeft: STAGE_BAR.wideLeft,
      barTop: getBarTopForOpenHeight(openHeight),
      barWidth: STAGE_BAR.wideWidth,
      chromeVisible: true,
      chromeOpacity: 1,
      leftDate: formatDragDate(DRAG_DATES.leftEndDay),
      rightDate: formatDragDate(DRAG_DATES.rightEndDay),
      rowOpenAmounts,
      tasksVisible: true,
    };
  }

  if (phase === "collapsed") {
    const rowOpenAmounts = getClosingRows(phaseProgress);
    const openHeight = getOpenHeight(rowOpenAmounts);
    const chromeHideProgress = easeInOutCubic(
      clamp01((phaseProgress - 0.3) / 0.62),
    );

    return {
      ...base,
      barLeft: STAGE_BAR.wideLeft,
      barTop: getBarTopForOpenHeight(openHeight),
      barWidth: STAGE_BAR.wideWidth,
      chromeVisible: chromeHideProgress < 1,
      chromeOpacity: 1,
      chromeHideProgress,
      leftDate: formatDragDate(DRAG_DATES.leftEndDay),
      rightDate: formatDragDate(DRAG_DATES.rightEndDay),
      rowOpenAmounts,
      tasksVisible: openHeight > 0,
    };
  }

  // phase === "timeline" — motion happens in the first ~55%, then the
  // finished timeline holds on screen before the loop fade
  const zoomProgress = easeInOutCubic(clamp01(phaseProgress / 0.31));
  const timelineOpacity = easeOutCubic(clamp01(phaseProgress / 0.37));

  const phaseStagger = 0.037;
  const staggerStart = 0.29;
  const visiblePhaseCount =
    phaseProgress < staggerStart
      ? 0
      : Math.min(
          EXTRA_PHASE_COUNT,
          Math.floor((phaseProgress - staggerStart) / phaseStagger) + 1,
        );

  const loopFadeStart = 0.95;
  const contentOpacity =
    loop && phaseProgress > loopFadeStart
      ? 1 - (phaseProgress - loopFadeStart) / (1 - loopFadeStart)
      : 1;

  const finalView = getFinalView(viewportAspect);
  const viewTop = lerp(STAGE_VIEW.viewTop, finalView.viewTop, zoomProgress);
  const viewHeight = lerp(
    STAGE_VIEW.viewHeight,
    finalView.viewHeight,
    zoomProgress,
  );

  return {
    ...base,
    contentOpacity,
    barLeft: lerp(STAGE_BAR.wideLeft, HERO_TIMELINE_TARGET.left, zoomProgress),
    barTop: lerp(STAGE_BAR.centerTop, HERO_TIMELINE_TARGET.top, zoomProgress),
    barWidth: lerp(
      STAGE_BAR.wideWidth,
      HERO_TIMELINE_TARGET.width,
      zoomProgress,
    ),
    timelineOpacity,
    visiblePhaseCount,
    viewLeft: lerp(STAGE_VIEW.viewLeft, finalView.viewLeft, zoomProgress),
    viewTop,
    viewWidth: lerp(STAGE_VIEW.viewWidth, finalView.viewWidth, zoomProgress),
    viewHeight,
    sceneHeight: Math.max(FULL_TIMELINE_HEIGHT, viewTop + viewHeight),
  };
}

export function getPlanMockupState(
  elapsedMs: number,
  loop = true,
  viewportAspect?: number,
): PlanMockupViewState {
  const loopDurationMs = getPlanMockupLoopDurationMs();
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

      return getStateForPhase(segment.phase, phaseProgress, loop, viewportAspect);
    }
    cursor = segmentEnd;
  }

  return getStateForPhase("timeline", 1, loop, viewportAspect);
}
