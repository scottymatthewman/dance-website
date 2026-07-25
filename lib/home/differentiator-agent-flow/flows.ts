import { COPY } from "@/lib/copy";
import { PROFILES } from "@/lib/profiles";

export type AgentFlowId = "budget" | "venue" | "timeline";

export type AgentFlowConfig = {
  id: AgentFlowId;
  steps: readonly string[];
  /** Scroll offsets in rem at the start of each animation step */
  scrollOffsetsRem: readonly [number, number, number, number, number];
  response: {
    budget?: {
      summaryPrefix: string;
      amount: string;
      summarySuffix: string;
      spentAmount: number;
      totalAmount: number;
    };
    venue?: {
      ownerName: string;
      ownerAvatar: string;
      ownerStatement: string;
      actions: readonly string[];
      slackLabel?: string;
    };
    timeline?: {
      intro: string;
      eventName: string;
      summaryInitial: string;
      summaryExtended: string;
    };
  };
};

const { items } = COPY.differentiator;

export const AGENT_FLOWS: readonly AgentFlowConfig[] = [
  {
    id: "budget",
    steps: items[0].danceSteps,
    scrollOffsetsRem: [7.0625, 6.4375, 3.9375, 2.5625, 0],
    response: {
      budget: {
        summaryPrefix: "You're ",
        amount: "$4,000",
        summarySuffix: " under budget with 3 open POs awaiting approval",
        spentAmount: 35800,
        totalAmount: 40000,
      },
    },
  },
  {
    id: "venue",
    steps: [
      items[1].danceSteps[0],
      items[1].danceSteps[1],
      "Pulling the latest vendor thread from Slack",
    ],
    scrollOffsetsRem: [7.0625, 6.4375, 3.9375, 2.4375, 0],
    response: {
      venue: {
        ownerName: PROFILES.Mira.name,
        ownerAvatar: PROFILES.Mira.avatar,
        ownerStatement: "owns venue search.",
        actions: ["Request a status update", "Show most recent progress"],
        slackLabel: "Slack",
      },
    },
  },
  {
    id: "timeline",
    steps: items[2].danceSteps,
    scrollOffsetsRem: [7.0625, 6.4375, 3.9375, 2.5625, 0],
    response: {
      timeline: {
        intro: "Here is the",
        eventName: "Community hackathon",
        summaryInitial:
          "It's got a 12-week timeline drafted with 47 tasks across 4 phases. Ready to review.",
        summaryExtended:
          "It's got a 12-week timeline drafted with 47 tasks across 4 phases. All assigned and ready to work on.",
      },
    },
  },
] as const;

export function getAgentFlowConfig(flowIndex: number): AgentFlowConfig {
  return AGENT_FLOWS[flowIndex] ?? AGENT_FLOWS[0];
}
