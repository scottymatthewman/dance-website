export const COPY = {
  hero: {
    headline: "Expand your revenue with customer success agents",
    headlineLines: [
      "Expand your revenue with",
      "customer success agents.",
    ],
    subhead:
      "Agents that know your accounts, spot risk and opportunity, and take the next best action across your CS stack.",
    cta: "Book a demo",
  },
  statement: {
    headlineLines: ["Scale expansion.", "Not your headcount."],
    body: "More accounts means more QBRs, more spreadsheets, more reactive firefighting. Dance gives CS teams agents that monitor, prioritize, and execute, so growth doesn't depend on hiring faster.",
  },
  productFlow: {
    steps: [
      {
        number: "1",
        eyebrow: "Monitor",
        headline: "See every account in one place",
        body: "Dance unifies product usage, support history, CRM data, and conversation signals into a single identity-resolved view — so agents always know what's happening.",
      },
      {
        number: "2",
        eyebrow: "Detect",
        headline: "Spot expansion and risk before it's obvious",
        body: "Agents continuously score accounts for churn risk, upsell potential, and engagement drops — surfacing what needs attention today, not at the next QBR.",
      },
      {
        number: "3",
        eyebrow: "Act",
        headline: "Take the next best action automatically",
        body: "From nudges and outreach to internal tasks and playbook steps — agents execute across your tools while your team stays in control.",
      },
      {
        number: "4",
        eyebrow: "Measure",
        headline: "Prove impact on revenue, not activity",
        body: "Track expansion influenced, retention saved, and time reclaimed. Every agent action is logged, reviewable, and tied to outcomes.",
      },
    ],
  },
  workflowCards: {
    headline: "Work the way your team already does",
    cta: "Get a demo",
    cards: [
      {
        title: "Your accessible coworker",
        body: "Ask Dance in Slack for account health, usage trends, or renewal status — and get answers pulled from PostHog, your CRM, and billing data. No dashboards to dig through, no waiting on RevOps.",
        preview:
          "Slack conversation preview — export from Figma when ready.",
      },
      {
        title: "Morning brief, already done",
        body: "Start every day with a prioritized account brief: who's at risk, who's ready to expand, and what changed overnight. Your team opens one summary instead of ten tabs.",
        preview:
          "Today's account brief · 12 accounts need attention · 3 expansion signals · 2 renewals in 30 days",
      },
      {
        title: "Answers without the ticket",
        body: "CSMs get instant answers about any account — last login, support history, contract terms, champion changes — without filing internal requests or pinging three people on Slack.",
        preview:
          "What's Acme Corp's current ARR and last QBR sentiment? → structured answer in seconds.",
      },
    ],
  },
  integrations: {
    headlineLines: ["Connected and proactive.", "Just like your team."],
    body: "Dance integrates with all your communication channels so it can contribute like the rest of your team.",
    cta: "Book a demo today",
  },
  testimonial: {
    quote:
      "We've been able to expand our area of impact without growing our team.",
    name: "Maya Swatch",
    role: "Head of CS",
    company: "Profound",
  },
  platformBento: {
    headline: "One platform for your entire CS stack.",
    headlineAccent: "Agents that work 24/7.",
    cta: "Get a demo",
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
    cta: "Get a demo",
  },
} as const;
