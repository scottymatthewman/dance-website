export const COPY = {
  hero: {
    headline: "The smartest way to plan events.",
    subheadLines: [
      "Collaborate with your teammates and event agents",
      "to stay aligned and under budget.",
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
        body: "What used to be agreed upon in Zooms and emails can now be visually configured.\n\nOutline the key event properties and scope to create a single source of truth from day one.",
      },
      {
        eyebrow: "Plan",
        body: "Google docs and Notions get lost and outdated quickly.\n\nGenerate live timelines with phases, tasks, assignees, and a clear view of task priority.",
      },
      {
        eyebrow: "Collaborate",
        body: "Wasted time and double work comes from disparate, disconnected communications.\n\nMaintain a clear view of statuses and work alongside your teammates and agents to move the event forward.",
      },
    ],
  },
  useCases: {
    headline: "Built for the events you want to run.",
    subhead:
      "Get closer to the original vision and stay aligned the whole way.",
    items: [
      {
        id: "community-event",
        title: "Community Events",
        body: "Deepen relationships with users and ambassadors through smooth, creative activations.",
        image: "/use-cases/community.webp",
      },
      {
        id: "executive-dinner",
        title: "Executive Dinners",
        body: "Close and grow relationships with key prospects with focused and curated meals.",
        image: "/use-cases/dinner.webp",
      },
      {
        id: "tradeshow",
        title: "Tradeshows",
        body: "Sequence and assign tasks like booth design, brand assets, and sales team prep, easily.",
        image: "/use-cases/tradeshows.webp",
      },
      {
        id: "happy-hours",
        title: "Happy Hours",
        body: "Keep venue, catering, and guest list details in one place so casual team gatherings happen seamlessly.",
        image: "/use-cases/happy-hours.webp",
      },
      {
        id: "conference",
        title: "Conferences",
        body: "Organize large scale efforts and streamline vendor communication to host top-tier industry experiences.",
        image: "/use-cases/conference.webp",
      },
      {
        id: "offsites",
        title: "Offsites",
        body: "Align travel, agendas, and activities so your team gets meaningful time together—not another logistics fire drill.",
        image: "/use-cases/offsite.jpg",
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
    useCases: "Use Cases",
    features: "Features",
    whyDance: "Why Dance",
    faq: "FAQ",
    cta: "Get early access",
  },
  differentiator: {
    headline: "What makes Dance different?",
    subhead:
      "Most tools store tasks or give generic advice. Dance lives in your event plan and takes real action.",
    promptLabel: "When you ask",
    othersLabel: "Spreadsheets & docs",
    danceLabel: "Dance",
    footerHeadline: "Give your AI the right tools",
    items: [
      {
        prompt: "Where does our budget stand for the Q3 conference?",
        others:
          "Export your budget sheet, cross-reference invoices in email, and manually update totals in a shared doc…",
        danceSteps: [
          "Pulling live budget line items",
          "Flagging overages against approved spend",
          "Surfacing open vendor contracts",
        ],
        danceResult:
          "You're $4,200 under budget with 3 open POs awaiting approval.",
      },
      {
        prompt: "Who owns venue research for the exec dinner?",
        others:
          "Search your channels for \"venue\" and check if anyone replied to the thread from last Tuesday…",
        danceSteps: [
          "Checking task assignments across the plan",
          "Reviewing venue shortlist status",
          "Pulling the latest vendor thread",
        ],
        danceResult:
          "Sarah owns venue research. 2 of 5 options confirmed, tasting scheduled Thursday.",
      },
      {
        prompt: "Turn this brief into a timeline.",
        others:
          "Start with a blank doc, break the brief into phases, assign owners, and build a checklist from scratch…",
        danceSteps: [
          "Parsing event properties from the brief",
          "Generating a phased timeline with owners",
          "Setting default task priorities",
        ],
        danceResult:
          "12-week timeline drafted with 47 tasks across 4 phases. Ready to review.",
      },
    ],
  },
  faq: {
    headline: "FAQ",
    subhead: "Common questions about Dance and how it works for event teams.",
    items: [
      {
        question: "What is Dance?",
        answer:
          "Dance is an event planning workspace where your team and event agents collaborate on one live picture — scope, timeline, budget, and status — instead of scattered docs and threads.",
      },
      {
        question: "How do event agents work?",
        answer:
          "Agents handle repetitive coordination: drafting follow-ups, updating statuses, surfacing blockers, and pulling context from your connected tools. You stay in control; they do the busywork.",
      },
      {
        question: "Who is Dance for?",
        answer:
          "Marketing, field, and ops teams running conferences, dinners, offsites, tradeshows, and community events — anywhere alignment and follow-through matter.",
      },
      {
        question: "How is Dance different from Notion or Asana?",
        answer:
          "Those tools store tasks. Dance is built for events: templates, live plans, budget tracking, and agents that understand event context and take action across your stack.",
      },
      {
        question: "Which tools does Dance connect to?",
        answer:
          "Dance works alongside the tools you already use — email, calendar, docs, spreadsheets, and more — so context flows in without re-entering data.",
      },
      {
        question: "Can my whole team use one event plan?",
        answer:
          "Yes. One source of truth for scope, timeline, owners, and status keeps everyone aligned from kickoff through show day.",
      },
      {
        question: "Is our event data secure?",
        answer:
          "Dance only uses what's needed to get the job done. Sensitive work data stays within your workspace with permissions you control.",
      },
      {
        question: "When can we get access?",
        answer:
          "Join the waitlist below. Early access opens in waves — waitlist members get first notice.",
      },
    ],
  },
  emailCapture: {
    headline: "Unlock event agents for your team.",
    subhead: "Join the waitlist and get notified the moment we launch.",
    placeholder: "name@email.com",
    button: "Get in early",
    loading: "Submitting…",
    success: "You're on the list. We'll be in touch soon.",
    error: "Please enter a valid email address.",
  },
  emailCaptureBleed: {
    headline: "Unlock event agents for your team.",
    subhead: "Get notified the moment we launch.",
    image: "/home/email-capture-bg-2.webp",
    imageMobile: "/home/email-capture-bg-mobile.webp",
  },
  bento: {
    topRow: [
      {
        title: "Pass off mundane, repetitive tasks",
        subtitle: "to your team's event agent.",
        image: "/bento-mockup/Agents-Graphic.webp",
        tag: { label: "Agents", icon: "/bento-mockup/agents/tag-at.svg" },
      },
      {
        title: "Work where you work.",
        subtitle: "Bring your tools with you.",
        image: "/bento-mockup/Integrations-Graphic.webp",
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
        image: "/bento-mockup/Templates-Graphic.webp",
        tag: { label: "Templates", icon: "/bento-mockup/templates/tag-bento.svg" },
      },
      {
        title: "Never over-spend.",
        subtitle: "Know where every dollar is going.",
        image: "/bento-mockup/Budget-Graphic.webp",
        tag: {
          label: "Budget Tracking",
          icon: "/bento-mockup/budget/receipt.svg",
        },
      },
      {
        title: "Contracts, receipts, internal write-ups.",
        subtitle: "Always on-hand.",
        image: "/bento-mockup/Docs-Graphic.webp",
        tag: { label: "Docs", icon: "/bento-mockup/docs/tag-icon.svg" },
      },
    ],
  },
  content: {
    blog: {
      title: "Blog",
      headline: "How we think about events.",
      description: "How we think about events.",
      year: "2026",
    },
    glossary: {
      title: "Glossary",
      headline: "Glossary",
      description: "Terms we use across our work.",
    },
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
