export const COPY = {
  hero: {
    headline: "Expand your revenue with customer success agents",
    headlineLines: [
      "Expand your revenue with",
      "customer success agents.",
    ],
    subhead:
      "Agents that know your accounts, spot risk and opportunity, and act across your CS stack.",
    cta: "Book a demo",
  },
  statement: {
    headlineLines: ["Scale expansion.", "Not your headcount."],
    body: "More accounts shouldn't mean more QBRs. Dance agents monitor, prioritize, and execute.",
  },
  productFlow: {
    steps: [
      {
        number: "1",
        eyebrow: "Monitor",
        headline: "See every account in one place",
        body: "One view of every account. Usage, support, CRM, conversations. Agents always know what's happening.",
      },
      {
        number: "2",
        eyebrow: "Detect",
        headline: "Spot expansion and risk before it's obvious",
        body: "Agents score every account for churn, upsell, and engagement drops. See what needs attention today, not at the next QBR.",
      },
      {
        number: "3",
        eyebrow: "Act",
        headline: "Take the next best action automatically",
        body: "Nudges, outreach, tasks, playbooks. Agents execute across your tools while your team stays in control.",
      },
      {
        number: "4",
        eyebrow: "Measure",
        headline: "Prove impact on revenue, not activity",
        body: "Track expansion influenced, retention saved, time reclaimed. Every action logged and tied to outcomes.",
      },
    ],
  },
  productSurfaces: {
    headline: "A better way of working.",
    cta: "Book a demo",
    cards: [
      {
        icon: "context" as const,
        title: "Context that finds you",
        body: "Recurring debriefs on what changed. Open tasks, account movement, and work you were mid-flight on.",
        visual: "briefing" as const,
      },
      {
        icon: "slack" as const,
        title: "Chat with agents in Slack",
        body: "Ask about any account in Slack. Get updates, kick off work, and stay in the tool your team already uses.",
        visual: "slack" as const,
      },
      {
        icon: "crm" as const,
        title: "Your CRM, with superpowers",
        body: "Your familiar CRM view. Agents surface risk, draft outreach, and suggest next actions in every record.",
        visual: "crm" as const,
      },
    ],
  },
  integrations: {
    headlineLines: ["Connected and proactive.", "Just like your team."],
    body: "Dance plugs into every channel your team uses. It contributes like anyone else on the team.",
    cta: "Book a demo today",
  },
  testimonial: {
    quote:
      "We've been able to expand our area of impact without growing our team.",
    name: "Maya Swatch",
    role: "Head of CS",
    company: "Dance",
  },
  platform: {
    headline: "One platform for your entire CS stack.",
    headlineAccent: "Agents that work 24/7.",
    pillars: [
      {
        icon: "stack" as const,
        title: "A workspace for customer success",
        body: "Accounts, tasks, and agents in one place. Not another dashboard to check.",
      },
      {
        icon: "agents" as const,
        title: "Agents that work like teammates",
        body: "Assign agents to tasks. They research, draft, follow up, and update your tools. You stay in control.",
      },
      {
        icon: "outcomes" as const,
        title: "Built for revenue outcomes",
        body: "Every action tied to retention, expansion, and book health. Not ticket counts.",
      },
    ],
  },
  platformBento: {
    headline: "One platform for your entire CS stack.",
    headlineAccent: "Agents that work 24/7.",
    cta: "Book a demo",
    topRow: [
      {
        title: "Account monitoring",
        subtitle: "that never misses a signal",
        visual: "monitoring" as const,
      },
      {
        title: "Unified intelligence",
        subtitle: "that connects every data source",
        visual: "intelligence" as const,
      },
    ],
    bottomRow: [
      {
        title: "Playbook automation",
        subtitle: "that executes your best motions",
        visual: "playbooks" as const,
      },
      {
        title: "Risk & expansion",
        subtitle: "without waiting for QBRs",
        visual: "expansion" as const,
      },
      {
        title: "50+ integrations",
        subtitle: "to the tools you already use",
        visual: "integrations" as const,
      },
    ],
  },
  nav: {
    cta: "Book a demo",
  },
} as const;
