/** Compact Gantt for the differentiator "brief → timeline" animation. */

export const DESIGN_WIDTH = 480;
export const DESIGN_HEIGHT = 260;

export const BAR_HEIGHT = 30;
export const HEADER_HEIGHT = 26;

export const TIMELINE_WEEKS = [
  "Week 1",
  "Week 2",
  "Week 3",
  "Week 4",
  "Week 5",
] as const;

export const COLUMN_WIDTH = DESIGN_WIDTH / TIMELINE_WEEKS.length;

/** Inset from column edges so bars align to week grid lines */
const BAR_INSET = 8;

function barForWeeks(startWeek: number, endWeek: number) {
  const left = (startWeek - 1) * COLUMN_WIDTH + BAR_INSET;
  const right = endWeek * COLUMN_WIDTH - BAR_INSET;
  return { left, width: right - left };
}

export type GanttBarIcon = "inProgress" | "notStarted";

/** Bar positions match the Generic AI phase list in copy (5-week plan) */
export const GANTT_PHASES = [
  {
    label: "Kickoff & scope",
    weeks: "Week 1",
    icon: "inProgress" as const,
    top: 40,
    ...barForWeeks(1, 1),
  },
  {
    label: "Logistics",
    weeks: "Weeks 2–3",
    icon: "notStarted" as const,
    top: 82,
    ...barForWeeks(2, 3),
  },
  {
    label: "Content & programming",
    weeks: "Weeks 3–4",
    icon: "notStarted" as const,
    top: 124,
    ...barForWeeks(3, 4),
  },
  {
    label: "Registration & comms",
    weeks: "Week 4",
    icon: "notStarted" as const,
    top: 166,
    ...barForWeeks(4, 4),
  },
  {
    label: "Day-of operations",
    weeks: "Week 5",
    icon: "notStarted" as const,
    top: 208,
    ...barForWeeks(5, 5),
  },
] as const;

/** Where the agent cursor clicks to create each bar (bottom-left corner) */
export const CURSOR_TARGETS = GANTT_PHASES.map((phase) => ({
  x: phase.left,
  y: phase.top + BAR_HEIGHT,
}));

export const STATUS_ICON_COLORS = {
  inProgress: "#02ABFF",
  notStarted: "#999999",
} as const satisfies Record<GanttBarIcon, string>;

export const AGENT_CURSOR = {
  src: "/icons/AgentCursor.png",
  label: "Agent",
  color: "#6D28D9",
} as const;

export type TimelineMockupPhase = "intro" | "bar0" | "bar1" | "bar2" | "bar3" | "bar4" | "hold";

export const PHASE_DURATIONS_MS: Record<TimelineMockupPhase, number> = {
  intro: 500,
  bar0: 850,
  bar1: 850,
  bar2: 850,
  bar3: 850,
  bar4: 850,
  hold: 2200,
};

export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
