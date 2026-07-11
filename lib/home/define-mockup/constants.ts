export const DEFINE_DESIGN_WIDTH = 960;
export const DEFINE_DESIGN_HEIGHT = 560;

export const ASSETS = {
  event: "/icons/Icon=Events.svg",
  venue: "/icons/Icon=Location.svg",
  catering: "/icons/Icon=Catering.svg",
  speakers: "/icons/Icon=Speaker.svg",
  design: "/icons/Icon=DesignAssets.svg",
} as const;

export type DefineNodeIcon = keyof typeof ASSETS;

export const CORE_NODE = {
  left: 40,
  top: 240,
  width: 250,
  height: 80,
  title: "V2 Launch",
  subtitle: "NYC Tech Week · Jun 8–12",
} as const;

export const PRIMARY_NODE_HEIGHT = 46;
export const CHILD_NODE_HEIGHT = 38;

export type DefinePrimaryNode = {
  id: string;
  icon: DefineNodeIcon;
  label: string;
  left: number;
  top: number;
  width: number;
  /** Connector anchor on the core card (world coords) */
  from: { x: number; y: number };
  /** Connector anchor on this node (world coords) */
  to: { x: number; y: number };
};

/** All primary nodes share a column so the tree reads left → right */
const PRIMARY_COLUMN_LEFT = 396;
const PRIMARY_WIDTH = 180;
const PRIMARY_RIGHT = PRIMARY_COLUMN_LEFT + PRIMARY_WIDTH;
const CORE_ANCHOR = { x: 290, y: 280 } as const;

export const PRIMARY_NODES: readonly DefinePrimaryNode[] = [
  {
    id: "venue",
    icon: "venue",
    label: "Venue",
    left: PRIMARY_COLUMN_LEFT,
    top: 109,
    width: PRIMARY_WIDTH,
    from: CORE_ANCHOR,
    to: { x: PRIMARY_COLUMN_LEFT, y: 132 },
  },
  {
    id: "speakers",
    icon: "speakers",
    label: "Speakers",
    left: PRIMARY_COLUMN_LEFT,
    top: 225,
    width: PRIMARY_WIDTH,
    from: CORE_ANCHOR,
    to: { x: PRIMARY_COLUMN_LEFT, y: 248 },
  },
  {
    id: "catering",
    icon: "catering",
    label: "Catering",
    left: PRIMARY_COLUMN_LEFT,
    top: 315,
    width: PRIMARY_WIDTH,
    from: CORE_ANCHOR,
    to: { x: PRIMARY_COLUMN_LEFT, y: 338 },
  },
  {
    id: "design",
    icon: "design",
    label: "Design assets",
    left: PRIMARY_COLUMN_LEFT,
    top: 405,
    width: PRIMARY_WIDTH,
    from: CORE_ANCHOR,
    to: { x: PRIMARY_COLUMN_LEFT, y: 428 },
  },
] as const;

export type DefineChildNode = {
  id: string;
  parentId: string;
  label: string;
  left: number;
  top: number;
  width: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
};

const CHILD_COLUMN_LEFT = 700;

/** Array order = stagger order (top to bottom, grouped under each parent) */
export const CHILD_NODES: readonly DefineChildNode[] = [
  {
    id: "glasshouse",
    parentId: "venue",
    label: "The Glasshouse",
    left: CHILD_COLUMN_LEFT,
    top: 87,
    width: 172,
    from: { x: PRIMARY_RIGHT, y: 132 },
    to: { x: CHILD_COLUMN_LEFT, y: 106 },
  },
  {
    id: "av-production",
    parentId: "venue",
    label: "AV & production",
    left: CHILD_COLUMN_LEFT,
    top: 139,
    width: 172,
    from: { x: PRIMARY_RIGHT, y: 132 },
    to: { x: CHILD_COLUMN_LEFT, y: 158 },
  },
  {
    id: "keynote",
    parentId: "speakers",
    label: "Keynote: Ana Wu",
    left: CHILD_COLUMN_LEFT,
    top: 203,
    width: 176,
    from: { x: PRIMARY_RIGHT, y: 248 },
    to: { x: CHILD_COLUMN_LEFT, y: 222 },
  },
  {
    id: "panel",
    parentId: "speakers",
    label: "Panel lineup",
    left: CHILD_COLUMN_LEFT,
    top: 255,
    width: 150,
    from: { x: PRIMARY_RIGHT, y: 248 },
    to: { x: CHILD_COLUMN_LEFT, y: 274 },
  },
  {
    id: "vendor-quotes",
    parentId: "catering",
    label: "Vendor quotes",
    left: CHILD_COLUMN_LEFT,
    top: 319,
    width: 160,
    from: { x: PRIMARY_RIGHT, y: 338 },
    to: { x: CHILD_COLUMN_LEFT, y: 338 },
  },
  {
    id: "stage-screens",
    parentId: "design",
    label: "Stage screens",
    left: CHILD_COLUMN_LEFT,
    top: 383,
    width: 160,
    from: { x: PRIMARY_RIGHT, y: 428 },
    to: { x: CHILD_COLUMN_LEFT, y: 402 },
  },
  {
    id: "social-kit",
    parentId: "design",
    label: "Social kit",
    left: CHILD_COLUMN_LEFT,
    top: 435,
    width: 140,
    from: { x: PRIMARY_RIGHT, y: 428 },
    to: { x: CHILD_COLUMN_LEFT, y: 454 },
  },
] as const;

export const PHASE_DURATIONS_MS = {
  intro: 700,
  branches: 2600,
  children: 2400,
  hold: 2000,
} as const;

export type DefineAnimationPhase = keyof typeof PHASE_DURATIONS_MS;

export function easeOutCubic(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
