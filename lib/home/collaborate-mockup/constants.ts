import { PROFILES } from "@/lib/profiles";

export const DESIGN_WIDTH = 600;

export const ASSETS = {
  avatar: PROFILES.Mira.avatar,
  send: "/icons/Send.svg",
  loader: "/icons/IconLoader.svg",
} as const;

export const USER_NAME = PROFILES.Mira.name;

export const FOUND_HOTEL = "Cultural Center Hotel";

export const USER_MESSAGE = "I found this hotel";

export const AGENT_SIMILAR_OPTIONS_MESSAGE =
  "Sure! Here are some similar options and their contact info…";

export const AGENT_VENUES = [
  {
    name: "Cultural Center Hotel",
    address: "18901 Huxton Road",
    phone: "+353 87 109 8442",
  },
  {
    name: "Catalonia Portal de l'Angel",
    address: "Portal de l'Àngel, 17",
    phone: "+34 93 318 41 41",
  },
  {
    name: "W Barcelona",
    address: "Plaça Rosa dels Vents, Ciutat Vellat",
    phone: "+34 932 95 28 00",
  },
] as const;

export const FOLLOW_UP_OPTIONS = [
  { letter: "A", label: "Go get a price list", muted: false },
  { letter: "B", label: "Remind me to call", muted: false },
  { letter: "C", label: "Other...", muted: true },
] as const;

export const MENTION = "@Agent";
export const REPLY_SUFFIX = " can you find similar options?";
export const FULL_DRAFT = `${MENTION}${REPLY_SUFFIX}`;

/** Collaborate mockup animation steps (draft → reply → typing → hotels → typing → follow-up) */
export type AnimationStep = 0 | 1 | 2 | 3 | 4 | 5;

/** Steps below this stay vertically centered; from this step onward the card is bottom-anchored */
export const BOTTOM_ANCHOR_FROM_STEP = 3 satisfies AnimationStep;

export const LAYOUT_TRANSITION_MS = 650;
export const CONTENT_EXPAND_MS = 600;
export const CONTENT_COLLAPSE_MS = 480;
export const CONTENT_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const TYPING_MS_PER_CHAR = 28;
export const STEP_0_SUBMIT_PAUSE_MS = 350;

export const STEP_DURATIONS_MS: Record<Exclude<AnimationStep, 0>, number> = {
  1: 700,
  2: 1800,
  3: 2400,
  4: 1800,
  5: 3200,
};
