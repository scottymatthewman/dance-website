export const COPY = {
  hero: {
    headline: "The smartest way to plan events.",
    subheadLines: [
      "Collaborate with your teammates and event agents to stay aligned and under budget.",
    ],
    cta: "Get early access",
  },
  statement: {
    headlineLines: ["Design events.", "Not spreadsheets."],
    body: "Dance provides a singular workspace for event teams to move fast. Templates, plan generation, live statuses, and agents that take action open up your team to do the creative strategy work to put on world-class events.",
  },
  mockup: {
    headline: "One place to execute, together.",
    body: "Outline the key event properties and scope to create a single source of truth from day one.",
  },
  benefits: {
    items: [
      {
        icon: "/benefits/icon-time-flies.svg",
        title: "Save hours and headache",
        body: "Inefficiencies stack up quickly. Searching for documents, messages, and decisions require teams to spend many more hours than necessary.",
      },
      {
        icon: "/benefits/icon-code-lines.svg",
        title: "Alignment as insurance",
        body: "Lack of clarity leads to dropping responsibilities, missed tasks, and misunderstanding. Alignment across the team leads to smooth activation.",
      },
      {
        icon: "/benefits/icon-computer-use.svg",
        title: "Make room for creativity",
        body: "Agents allow teams to buy time so they can strategize at a higher level, get creative, and plan events that truly move the needle.",
      },
    ],
  },
  features: {
    headline: "Build and execute on a clear picture",
    steps: [
      {
        eyebrow: "Define",
        body: "What used to be agreed upon in Zooms and emails can now be visually configured. Outline the key event properties and scope to create a single source of truth from day one.",
      },
      {
        eyebrow: "Plan",
        body: "Google docs and Notions get lost and outdated quickly. Generate live timelines with phases, tasks, assignees, and a clear view of task priority.",
      },
      {
        eyebrow: "Collaborate",
        body: "Wasted time and double work comes from disparate, disconnected communications. Maintain a clear view of statuses and work alongside your teammates and agents to move the event forward.",
      },
    ],
  },
  useCases: {
    headline: "Built for the events you want to run.",
    subhead:
      "Get closer to the original vision and stay aligned the whole way.",
    items: [
      {
        id: "executive-dinner",
        title: "Executive Dinners",
        body: "Close and grow relationships with key prospects with focused and curated meals.",
        image: "/use-cases/executive-dinners.png",
      },
      {
        id: "tradeshow",
        title: "Tradeshows",
        body: "Sequence and assign tasks like booth design, brand assets, and sales team prep, easily.",
        image: "/use-cases/tradeshows.png",
      },
      {
        id: "conference",
        title: "Conferences",
        body: "Organize large scale efforts and streamline vendor communication to host top-tier industry experiences.",
        image: "/use-cases/conferences.png",
      },
      {
        id: "community-event",
        title: "Community Events",
        body: "Deepen relationships with users and ambassadors through smooth, creative activations.",
        image: "/use-cases/community-events.png",
      },
      {
        id: "offsites",
        title: "Offsites",
        body: "Close and grow relationships with key prospects with focused and curated meals.",
        image: "/use-cases/offsites.jpg",
      },
    ],
    ctaCard: {
      title: "Tell us what you're planning",
      body: "We'd love to hear what you and your team are working on.",
      cta: "Let us know",
      form: {
        emailPlaceholder: "name@email.com",
        eventsPlaceholder: "What kind of events do you work on?",
        submit: "Submit",
        loading: "Submitting…",
        successTitle: "Thank you!",
        successBody: "We'll be in touch soon.",
        error: "Something went wrong. Please try again.",
        invalidEmail: "Please enter a valid email address.",
        invalidEvents: "Tell us what kind of events you work on.",
        rateLimited:
          "You've reached the maximum number of submissions from this device.",
      },
    },
  },
  nav: {
    features: "Features",
    useCases: "Use Cases",
    cta: "Get early access",
  },
  emailCapture: {
    headline: "Unlock event agents for your team.",
    subhead: "Join the waitlist and get notified the moment we launch.",
    image: "/home/email-capture-bg.jpg",
    placeholder: "name@email.com",
    button: "Get in early",
    loading: "Submitting…",
    success: "You're on the list. We'll be in touch soon.",
    error: "Please enter a valid email address.",
  },
  bento: {
    topRow: [
      {
        title: "Pass off mundane, repetitive tasks",
        subtitle: "to your team's event agent.",
        image: "/bento-mockup/Agents-Graphic.png",
        tag: { label: "Agents", icon: "/bento-mockup/agents/tag-at.svg" },
      },
      {
        title: "Work where you work.",
        subtitle: "Bring your tools with you.",
        image: "/bento-mockup/Integrations-Graphic.png",
        tag: {
          label: "Integrations + MCP",
          icon: "/bento-mockup/integrations/mcp-icon.svg",
        },
      },
    ],
    bottomRow: [
      {
        title: "Never start from step 1 again.",
        subtitle: "Prompt a plan or use a template.",
        image: "/bento-mockup/Templates-Graphic.png",
        tag: { label: "Templates", icon: "/bento-mockup/templates/tag-bento.svg" },
      },
      {
        title: "Never over-spend.",
        subtitle: "Know where every dollar is going.",
        image: "/bento-mockup/Budget-Graphic.png",
        tag: {
          label: "Budget Tracking",
          icon: "/bento-mockup/budget/receipt.svg",
        },
      },
      {
        title: "Contracts, receipts, internal write-ups.",
        subtitle: "Always on-hand.",
        image: "/bento-mockup/Docs-Graphic.png",
        tag: { label: "Docs", icon: "/bento-mockup/docs/tag-icon.svg" },
      },
    ],
  },
  footer: {
    label: "Get early access",
    waitlistButton: "Join waitlist",
    paragraphs: [
      "The more digital our lives become, the more we value physical presence. In-person events are about to matter more than ever before, serving as the essential spaces for true human connection and collaboration. Planning these experiences, however, remains notoriously difficult, as teams are already spread thin trying to make sure things go as intended. Organizers spend almost all their time managing endless details and coordination, leaving very little room for creativity, which ultimately hurts team morale and forces teams to standardize efforts into predictable experiences.",
      "We started Dance to change that by helping teams offload the heavy burden of tracking those endless details, allowing organizers to redirect their energy toward high-level strategy that drives actual business growth. Our event agents make the entire process much easier for planners, while a platform built for alignment acts as insurance for events running as intended. Having Dance take care of the chores that gate creativity ultimately allows you to protect your bottom line while building unforgettable experiences.",
    ],
  },
} as const;
