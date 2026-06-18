# Plan: Dance Product Repositioning

Reposition the marketing site from **Kya (customer success agents)** to **Dance (intelligent event planning)** — Linear for event planning, with agent coworkers on top.

**Goal:** A credible wedge landing page for event teams. Lead with planning and quality of life; agents and guardrails as the differentiator. Enterprise ROI story comes later.

**Out of scope for this plan:** Blog/glossary (see `plan-content-engine.md`), PostHog, cal.com embed, automation pipelines.

---

## Current state

| Area | Today |
|------|--------|
| Brand | `Kya` @ `kyahq.com` in `lib/constants.ts` |
| Copy | CS/revenue agents in `lib/copy.ts` |
| CTA | "Book a demo" → `#demo` anchor |
| Homepage | Hero → Statement → Platform → Product flow → Surfaces → Testimonial → Integrations → Footer |
| Mockups | CS-specific (Customers, CRM, account monitoring, Slack agents) |
| Pricing | None |
| Testimonial | Already references company name "Dance" |

**Strength:** Copy is centralized; layout and motion system are reusable.  
**Risk:** Product mockups tell the wrong story until updated or replaced.

---

## Messaging framework

### Headline territory
- Primary: one place for every event plan
- Secondary: phases, timelines, budget, tasks — intuitive for humans
- Differentiator: assign tasks to agents or chat to adjust the plan; agents operate within guardrails

### Wedge positioning (copy guardrails)
- Sell planning + QoL now, not enterprise ROI
- Price anchor: **$50/month per seat**
- Justification line: saves ~1 hr/month at ~$47/hr — low enough to bypass procurement
- CTA language: **"Book a call"** (aligns with future conversion tracking)

### Product flow mapping (Monitor → Measure → Dance)

| Current step | Dance equivalent |
|--------------|------------------|
| Monitor | **Plan** — see every event in one place |
| Detect | **Phase** — timelines and budget per phase |
| Act | **Task** — work within each phase; assign to people or agents |
| Measure | **Track** — budget and timeline health across the plan |

### Platform pillars (replace CS stack)

1. **A workspace for event planning** — plans, phases, tasks in one place
2. **Agents that work like teammates** — assign tasks, chat to adjust; guardrails enforced
3. **Built for event teams** — start date before end date, budget caps, phase dependencies (examples in copy)

---

## Phases

### Phase 0 — Decisions (before code)

- [ ] **Domain:** Confirm production URL (`https://usedance.com`)
- [ ] **Logo/assets:** Dance lockup vs interim text logo; footer hero images (currently Kaya-branded PNGs)
- [ ] **Mockup strategy:** Choose one:
  - **A.** Copy-only pass — relabel existing mockups (fastest, slightly dishonest)
  - **B.** Prototype screenshots — swap static images from half-baked product (best for wedge sales)
  - **C.** New React mockups — event planning UI in existing mockup components (most work, most control)
- [ ] **Testimonial:** Keep Maya/Dance quote, rewrite for event planning, or replace with placeholder

**Owner:** Scotty (+ design input if needed)

---

### Phase 1 — Rebrand shell (1–2 days)

Minimal code changes; site reads as Dance even if mockups lag.

| Task | Files |
|------|--------|
| Update site name, domain, CTA href placeholder | `lib/constants.ts` |
| Rewrite all marketing copy | `lib/copy.ts` |
| Update default metadata / OG | `lib/metadata.ts` |
| Rename package (optional) | `package.json` |
| Swap logo icon reference if new asset | `components/ui/SiteIcon.tsx`, `public/icons/`, `public/testimonial/dance-logo.svg` |
| Update footer tagline + CTA | `lib/copy.ts`, `components/sections/Footer.tsx` |
| Header logo + label | `components/layout/Header.tsx` |

**Acceptance criteria:**
- [ ] No user-visible "Kya" or CS-agent language on homepage
- [ ] Hero + statement communicate event planning wedge
- [ ] All CTAs say "Book a call" (href can stay `#demo` until cal.com)
- [ ] `npm run build` passes

---

### Phase 2 — New homepage sections (1 day)

| Task | Notes |
|------|--------|
| **Pricing section** | New component, e.g. `components/sections/Pricing.tsx` — $50/seat, procurement bypass line, CTA |
| **Insert on homepage** | After Platform or before Footer in `app/page.tsx` |
| **Optional: MVP feature list** | Bulleted scope: phases/timelines, budget per phase/plan, tasks, agent layer, guardrails |

**Copy draft (starting point):**

```
Pricing
$50 / seat / month

Less than the hour you'll save each month.
No procurement. No committee. Just better event plans.

[Book a call]
```

**Acceptance criteria:**
- [ ] Pricing visible without scrolling past fold on desktop (or clearly linked from hero — pick one)
- [ ] Wedge justification present in one sentence

---

### Phase 3 — Product narrative alignment (2–4 days)

Align sections with MVP scope without full mockup rebuild.

| Section | Work |
|---------|------|
| `ProductFlow` | Rewrite steps in `lib/copy.ts`; optionally rename eyebrow labels in component if hardcoded |
| `PlatformPillars` | Event planning pillars (see framework above) |
| `ProductSurfaces` | Three cards: e.g. plan overview, agent task assignment, budget/timeline view |
| `Integrations` | Reframe for event stack (calendar, email, Slack, spreadsheets, vendor tools) — tile grid may stay generic |
| `Testimonial` | Event-planning quote; keep Dance as company if authentic |

**Acceptance criteria:**
- [ ] Product flow tells plan → phase → task → track story
- [ ] No CRM/account/churn language remains

---

### Phase 4 — Mockups & visuals (variable — largest effort)

Depends on Phase 0 strategy.

#### If strategy B (prototype screenshots)
- Export screens from prototype: plan list, phase timeline, task board, agent chat, budget view
- Replace images in `public/hero/`, `public/product-flow/`, mockup components
- Update `HeroMockup`, `ProductFlowPreview`, etc. to use new assets

#### If strategy C (React mockups)
Priority components to rework:

| Component | Dance direction |
|-----------|-----------------|
| `PlatformTasksMockup.tsx` | Nav: Plans, Phases, Tasks, Agents (drop Customers/Marketplace) |
| `BoardsMockup.tsx` | Phase columns or timeline lanes |
| `HeroMockup.tsx` | Plan dashboard preview |
| `ProductFlow/*` mockups | One visual per flow step |
| `AgentBriefingReportMockup.tsx` | Agent suggesting plan adjustment within guardrails |
| `IntegrationsMockup.tsx` | Event-relevant tool names |

Reference: `docs/mockup-color-system.md` for dark mockup palette.

**Acceptance criteria:**
- [ ] Hero mockup reads as event planning at a glance
- [ ] At least one mockup shows agent + guardrail (e.g. rejected invalid dates)

---

### Phase 5 — Polish & launch prep (0.5–1 day)

| Task | Files |
|------|--------|
| Favicon | `app/favicon.ico` |
| Footer background images | `public/footer/` — replace Kaya art or simplify to solid section bg |
| Sitemap domain | `app/sitemap.ts`, `app/robots.ts` |
| OG image | Add when brand asset ready |
| Lint + build | `npm run lint`, `npm run build` |

**Acceptance criteria:**
- [ ] Staging deploy matches chosen domain metadata
- [ ] Lighthouse / basic mobile check on hero + pricing

---

## File reference (quick index)

```
lib/constants.ts      — SITE.name, domain, booking href
lib/copy.ts           — all marketing strings
lib/metadata.ts       — SEO defaults
app/page.tsx          — section order
components/sections/  — Hero, Statement, Platform*, ProductFlow, Pricing (new), Footer
public/               — logos, hero, footer art, product screenshots
```

---

## Suggested order of execution

```
Phase 0 (decisions)
    ↓
Phase 1 (rebrand shell) ──→ deployable wedge copy
    ↓
Phase 2 (pricing)       ──→ can run parallel with Phase 1
    ↓
Phase 3 (section copy)  ──→ coherent story without new art
    ↓
Phase 4 (mockups)       ──→ when prototype screenshots or design ready
    ↓
Phase 5 (launch prep)
```

Phases 1–3 unblock sales conversations. Phase 4 is when the site feels "real."

---

## Dependencies

| Dependency | Blocks |
|------------|--------|
| Domain decision | Production metadata, sitemap |
| Dance logo/lockup | Header, footer, favicon |
| Prototype screenshots | Phase 4 strategy B |
| cal.com URL | `SITE.demoHref` final value (can follow in content-engine plan) |

---

## Success metrics (manual, pre-PostHog)

- Event team contacts say the page matches what you're building
- "Book a call" clicks (track manually until PostHog)
- No confusion between Dance (product) and Kya (legacy brand)
