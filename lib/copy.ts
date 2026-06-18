export const COPY = {
  hero: {
    headline: "Event planning that feels as clear as Linear",
    headlineLines: ["Event planning that feels", "as clear as Linear."],
    subhead:
      "One place for every event plan — phases, timelines, budget, and tasks. Assign work to agents or chat to adjust the plan on the fly.",
    cta: "Book a call",
  },
  statement: {
    headlineLines: ["Plan more events.", "Not more spreadsheets."],
    body: "Every phase, deadline, and dollar in one workspace. Dance keeps your team aligned and your agents on task.",
  },
  productFlow: {
    steps: [
      {
        number: "1",
        eyebrow: "Plan",
        headline: "See every event in one place",
        body: "All your event plans in a single view. Timelines, owners, and status — always current, never buried in email threads.",
      },
      {
        number: "2",
        eyebrow: "Phase",
        headline: "Break work into phases with budget and timelines",
        body: "Each phase has its own timeline and budget. See what's due this week and where spend is tracking before it becomes a surprise.",
      },
      {
        number: "3",
        eyebrow: "Task",
        headline: "Assign tasks to your team or your agents",
        body: "Tasks live inside each phase. Assign to a teammate or hand off to an agent — research vendors, draft run-of-show updates, chase confirmations.",
      },
      {
        number: "4",
        eyebrow: "Track",
        headline: "Stay on budget and on schedule",
        body: "Budget per phase and per plan. Timeline health at a glance. Know what's slipping before load-in day.",
      },
    ],
  },
  productSurfaces: {
    headline: "A better way to plan events.",
    cta: "Book a call",
    cards: [
      {
        icon: "context" as const,
        title: "Every plan at a glance",
        body: "Open any event and see phases, open tasks, budget status, and what changed since you last looked.",
        visual: "briefing" as const,
      },
      {
        icon: "slack" as const,
        title: "Chat to adjust the plan",
        body: "Ask an agent to shift timelines, reassign tasks, or draft vendor outreach. Changes stay within your guardrails.",
        visual: "slack" as const,
      },
      {
        icon: "crm" as const,
        title: "Budget and timeline in sync",
        body: "Spend tracked per phase. Dates enforced across the plan. Agents can't push a start date past your end date.",
        visual: "crm" as const,
      },
    ],
  },
  integrations: {
    headlineLines: ["Connected to your event stack.", "Just like your team."],
    taglineLines: [
      "Dance plugs into the tools your team already uses.",
      "Calendar, email, Slack, spreadsheets, and more.",
    ],
    cta: "Book a call",
  },
  testimonial: {
    quote:
      "We finally have one place for every event plan. Our team spends less time chasing updates and more time on the work that matters.",
    name: "Maya Swatch",
    role: "Director of Events",
    company: "Meridian Events",
  },
  platform: {
    headline: "One workspace for every event plan.",
    headlineAccent: "Agents that work within your guardrails.",
    cta: "Book a call",
    pillars: [
      {
        icon: "stack" as const,
        title: "A workspace for event planning",
        body: "Plans, phases, tasks, and budget in one place. Not another spreadsheet to maintain.",
      },
      {
        icon: "agents" as const,
        title: "Agents that work like teammates",
        body: "Assign agents to tasks or chat to adjust the plan. They research, draft, and follow up — you stay in control.",
      },
      {
        icon: "outcomes" as const,
        title: "Built for event teams",
        body: "Guardrails keep plans sane — start dates before end dates, budget caps per phase, dependencies enforced.",
      },
    ],
  },
  platformBento: {
    headline: "One workspace for every event plan.",
    headlineAccent: "Agents that work within your guardrails.",
    cta: "Book a call",
    topRow: [
      {
        title: "Plan overview",
        subtitle: "every event in one view",
        visual: "monitoring" as const,
      },
      {
        title: "Phase timelines",
        subtitle: "with budget per phase",
        visual: "intelligence" as const,
      },
    ],
    bottomRow: [
      {
        title: "Task assignment",
        subtitle: "to people or agents",
        visual: "playbooks" as const,
      },
      {
        title: "Budget tracking",
        subtitle: "without spreadsheet chaos",
        visual: "expansion" as const,
      },
      {
        title: "50+ integrations",
        subtitle: "to the tools you already use",
        visual: "integrations" as const,
      },
    ],
  },
  pricing: {
    headline: "Pricing",
    price: "$50",
    period: "per seat / month",
    body: "Less than the hour you'll save each month.",
    subbody: "No procurement. No committee. Just better event plans.",
    cta: "Book a call",
    features: [
      "Unlimited event plans",
      "Phases, timelines, and budget tracking",
      "Tasks with agent assignment",
      "Agent chat with plan guardrails",
    ],
  },
  nav: {
    cta: "Book a call",
  },
  footer: {
    taglineLines: ["Intelligent event planning", "for teams that move fast."],
    cta: "Book a call",
  },
} as const;
