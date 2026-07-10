/**
 * Figma `Plan Mockup` section (1964:8026) — 5 keyframes.
 *
 * Steps 1–4 are "staged" frames: the same 1462×784 canvas zoomed in by
 * STAGE_SCALE (the bar renders at 77.39px there vs 51px on the timeline).
 * We keep every element at timeline scale (bar = 51px) and emulate the zoom
 * with a camera: during steps 1–4 the camera shows a STAGE_VIEW-sized window
 * centered in the canvas, then zooms out to the full canvas in step 5.
 */

import { PROFILES } from "@/lib/profiles";

export const FULL_TIMELINE_WIDTH = 1462;
export const FULL_TIMELINE_HEIGHT = 784;

export const BAR_HEIGHT = 51;
export const TASK_ROW_HEIGHT = 48;

/** Staged frames render the 51px bar at 77.388px → zoom factor */
const STAGE_SCALE = 77.3880615234375 / 51;

export const STAGE_VIEW_WIDTH = FULL_TIMELINE_WIDTH / STAGE_SCALE;
export const STAGE_VIEW_HEIGHT = FULL_TIMELINE_HEIGHT / STAGE_SCALE;
export const STAGE_VIEW_LEFT = (FULL_TIMELINE_WIDTH - STAGE_VIEW_WIDTH) / 2;
export const STAGE_VIEW_TOP = (FULL_TIMELINE_HEIGHT - STAGE_VIEW_HEIGHT) / 2;

/**
 * Hero bar keyframes in world (timeline-scale) coordinates.
 * Values are the staged Figma positions divided by STAGE_SCALE, offset so the
 * staged frame sits centered in the full canvas.
 */
export const STAGE_BAR = {
  /** Step 1–2: narrow bar, centered */
  narrowLeft: STAGE_VIEW_LEFT + 567 / STAGE_SCALE,
  narrowWidth: 329 / STAGE_SCALE,
  /** Step 3–4: expanded bar (symmetric growth around center) */
  wideLeft: STAGE_VIEW_LEFT + 338.703125 / STAGE_SCALE,
  wideWidth: 786.02 / STAGE_SCALE,
  /** Resting vertical position (steps 1–3 keyframes) */
  centerTop: STAGE_VIEW_TOP + 353 / STAGE_SCALE,
  /** How far the bar rises when all tasks are open (step 4 keyframe) */
  raiseDistance: (353 - 210) / STAGE_SCALE,
} as const;

/** Step 5: where the hero bar lands on the timeline */
export const HERO_TIMELINE_TARGET = { left: 35, top: 50, width: 674 } as const;

/** Task list geometry (step 4, converted to world scale) */
export const TASK_LIST_WIDTH = 784.5025024414062 / STAGE_SCALE;

/**
 * Drag chrome (handles + dates) offsets relative to the bar, world scale.
 * `hidden*` values are the tucked-under-the-bar positions from step 5.
 */
export const DRAG_CHROME = {
  handleWidth: 3,
  handleHeight: 28,
  handleTop: 12,
  /** left handle's left edge sits this far left of the bar */
  handleOutsideLeft: 9,
  /** right handle's left edge sits this far right of the bar's right edge */
  handleOutsideRight: 8,
  dateTop: 18,
  /** left date's right edge sits this far left of the bar */
  dateOutsideLeft: 17,
  /** right date's left edge sits this far right of the bar's right edge */
  dateOutsideRight: 19,
  /** hidden-under-bar positions, relative to bar edges */
  hiddenLeftHandleX: 53,
  hiddenRightHandleFromRight: 56,
  hiddenLeftDateX: 17,
  hiddenRightDateFromRight: 42,
} as const;

/** Figma steps 1–5 */
export type PlanAnimationPhase =
  | "intro"
  | "resize"
  | "tasks"
  | "collapsed"
  | "timeline";

export const PHASE_DURATIONS_MS: Record<PlanAnimationPhase, number> = {
  intro: 700,
  resize: 2400,
  tasks: 2600,
  collapsed: 1100,
  timeline: 5200,
};

export const ASSETS = {
  inProgress: "/icons/Icon=InProgress.svg",
  inReview: "/icons/Icon=InReview.svg",
  notStarted: "/icons/Icon=NotStarted.svg",
  urgencyHigh: "/icons/Icon=UrgencyHigh.svg",
  urgencyMed: "/icons/Icon=UrgencyMed.svg",
  urgencyLow: "/icons/Icon=UrgencyLow.svg",
} as const;

export type GanttBarIcon = "inProgress" | "notStarted";
export type TaskStatusIcon = "inReview" | "inProgress" | "notStarted";
export type TaskUrgency = "high" | "med" | "low";

export const TASK_ROWS = [
  {
    status: "inReview" as const,
    urgency: "high" as const,
    label: "Find hotel",
    assignee: PROFILES.Ash.name,
    avatar: PROFILES.Ash.avatar,
    date: "Jun 9",
  },
  {
    status: "inProgress" as const,
    urgency: "med" as const,
    label: "Book venue walkthrough",
    assignee: PROFILES.Scott.name,
    avatar: PROFILES.Scott.avatar,
    date: "Jun 12",
  },
  {
    status: "inProgress" as const,
    urgency: "med" as const,
    label: "Confirm catering order",
    assignee: PROFILES.Tessa.name,
    avatar: PROFILES.Tessa.avatar,
    date: "Jun 16",
  },
  {
    status: "notStarted" as const,
    urgency: "med" as const,
    label: "Reserve AV equipment",
    assignee: PROFILES.Scott.name,
    avatar: PROFILES.Scott.avatar,
    date: "Jun 19",
  },
  {
    status: "notStarted" as const,
    urgency: "low" as const,
    label: "Arrange airport shuttles",
    assignee: PROFILES.Scott.name,
    avatar: PROFILES.Scott.avatar,
    date: "Jun 27",
  },
] as const;

export const TASKS_TOTAL_HEIGHT = TASK_ROWS.length * TASK_ROW_HEIGHT;

export const TIMELINE_WEEKS = [
  "Jun 1 - Jun 7",
  "Jun 8 - Jun 14",
  "Jun 15 - Jun 21",
  "Jun 22 - Jun 28",
  "Jun 29 - Jul 5",
  "Jul 5 - Jul 11",
  "Jul 12 - Jul 18",
  "Jul 19 - Jul 25",
  "Jul 26 - Aug 1",
  "Aug 2 - Aug 8",
] as const;

export const TIMELINE_COLUMNS = [
  147.62, 149.215, 149.215, 149.215, 149.215, 149.215, 149.215, 149.215,
  147.62, 147.62,
] as const;

export const TIMELINE_HEADER_HEIGHT = 32;

/** Timeline phase bars — `top` is absolute within the 1462×784 frame */
export const TIMELINE_PHASES = [
  { label: "Logistics Planning", left: 35, top: 50, width: 674, icon: "inProgress" },
  { label: "Marketing Material", left: 83, top: 119, width: 246, icon: "notStarted" },
  { label: "Speaker Recruitment", left: 148, top: 188, width: 289, icon: "notStarted" },
  { label: "Signage + Badge Design", left: 297, top: 257, width: 289, icon: "notStarted" },
  { label: "Announcement", left: 521, top: 326, width: 153, icon: "notStarted" },
  { label: "RSVP Window", left: 674, top: 395, width: 289, icon: "notStarted" },
  { label: "Travel Expense Reimbursement", left: 1038, top: 464, width: 289, icon: "notStarted" },
  { label: "Activation", left: 1192, top: 533, width: 186, icon: "notStarted" },
] as const;

export const CURRENT_DATE_LINE_X = 131;

/** Status icon stroke colors — Figma Plan mockup + mockup-color-system */
export const STATUS_ICON_COLORS = {
  inReview: "#E8963A",
  inProgress: "#02ABFF",
  notStarted: "#999999",
} as const satisfies Record<TaskStatusIcon | GanttBarIcon, string>;

/** Drag dates: day 1–30 render as June, 31 renders as Jul 1 */
export function formatDragDate(day: number): string {
  const clamped = Math.round(Math.min(31, Math.max(1, day)));
  return clamped >= 31 ? "Jul 1" : `Jun ${clamped}`;
}

export const DRAG_DATES = {
  leftStartDay: 8,
  leftEndDay: 1,
  rightStartDay: 22,
  rightEndDay: 31,
} as const;

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
