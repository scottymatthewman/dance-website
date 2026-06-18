# Plan: Content Engine Foundation

Set up the Dance website so **Kaya can learn and run an SEO content engine** — blog, glossary, footer discovery, and a repeatable publishing workflow. Automation (Semrush, AI posting, GSC API, PostHog) comes later; this plan gets the pipes and teaching path in place.

**Goal:** She can publish glossary terms and blog posts, understand SEO basics, and measure manually — without waiting on automation.

**Out of scope for this plan:** Dance product copy/mockups (see `plan-dance-repositioning.md`), Semrush pulls, bulk AI generation, GSC indexing API, LinkedIn syndication.

---

## Principles (from your SEO/AEO conversation)

| Principle | Implementation |
|-----------|----------------|
| SEO first, AEO later | Glossary + keyword-targeted blog posts |
| Blog not in homepage nav | Footer links only; blog links back to `/` |
| Glossary = category signal | Individual term pages, cross-linked from blog |
| Consistent cadence > volume | Workflow supports 3–4 posts/week; no bulk publish tooling |
| SEO voice ≠ thought leadership | Separate folders or tags; don't mix in one template voice |
| Conversion event | "Book a call" click (PostHog in Phase 5) |
| cal.com inline | Embedded booking, not external redirect (Phase 5) |

---

## Current state

| Area | Today |
|------|--------|
| Blog | Does not exist |
| Glossary | Does not exist |
| Content format | No MDX/markdown pipeline |
| Sitemap | Homepage only (`app/sitemap.ts`) |
| Layout | Global `Header` on all routes (`app/layout.tsx`) |
| Footer | Kaya branding + demo CTA only; no content links |
| Analytics | None |
| Cursor content rules | None |

---

## Architecture overview

```
content/
  blog/
    seo/              ← keyword-farming posts (Tesla calendar → Kaya edits)
    thought/          ← optional later; different voice
  glossary/
    event-run-of-show.mdx
    ...

app/
  (marketing)/        ← existing homepage (optional route group)
  (content)/
    layout.tsx        ← minimal chrome: logo → home, Book a call
    blog/
      page.tsx        ← index
      [slug]/page.tsx
    glossary/
      page.tsx        ← A–Z index
      [slug]/page.tsx

lib/
  content.ts          ← read MDX, parse frontmatter, list posts/terms
```

**Why file-based MDX:** Git-native, no CMS login, teaches frontmatter/SEO structure, diffs show exactly what changed. Keystatic or Sanity can come later if she outgrows files.

---

## Phases

### Phase 0 — Decisions (before code)

- [ ] **Who commits:** Kaya opens PRs, Scotty merges — or shared repo access with branch protection off for learning
- [ ] **Author attribution:** Byline on posts? (name, role, date)
- [ ] **Initial glossary list:** 15–25 event-planning terms (she owns list; Scotty sets up pages)
- [ ] **Blog URL structure:** `/blog/[slug]` vs `/blog/seo/[slug]` — recommend flat `/blog/[slug]` with category in frontmatter
- [ ] **Domain:** Same as Dance site (required for sitemap/OG)

**Owner:** Scotty + Kaya

---

### Phase 1 — Content infrastructure (1–2 days)

**Scotty implements:**

| Task | Details |
|------|---------|
| Add MDX dependencies | `@next/mdx` or `next-mdx-remote` + `gray-matter` (pick one; native MDX routes preferred for simplicity) |
| `content/` directory | `blog/`, `glossary/` with example files |
| `lib/content.ts` | `getAllPosts()`, `getPostBySlug()`, `getAllGlossaryTerms()`, sort by date |
| Blog index | `app/(content)/blog/page.tsx` — title, excerpt, date, read time |
| Blog post | `app/(content)/blog/[slug]/page.tsx` — render MDX, metadata from frontmatter |
| Glossary index | `app/(content)/glossary/page.tsx` — alphabetical list with short definitions |
| Glossary term | `app/(content)/glossary/[slug]/page.tsx` |
| Content layout | `app/(content)/layout.tsx` — slim header (logo → `/`), no marketing footer image |
| Expand sitemap | All blog + glossary URLs in `app/sitemap.ts` |
| RSS (optional) | `app/blog/rss.xml/route.ts` for syndication later |

**Example blog frontmatter:**

```yaml
---
title: "How to Build an Event Run of Show"
description: "A practical guide to run-of-show documents for corporate events."
publishedAt: "2026-06-17"
targetKeyword: "event run of show template"
category: seo
author: "Kaya"
---
```

**Example glossary frontmatter:**

```yaml
---
title: "Run of Show"
description: "A minute-by-minute schedule of everything happening during an event."
targetKeyword: "run of show meaning"
relatedTerms: ["event timeline", "production schedule"]
---
```

**Acceptance criteria:**
- [ ] `npm run dev` → `/blog` and `/glossary` render
- [ ] Example post + term visible
- [ ] Each page has unique `<title>` and meta description from frontmatter
- [ ] Sitemap includes new URLs

---

### Phase 2 — Footer discovery + nav rules (0.5 day)

| Task | Details |
|------|---------|
| Footer links | Add "Blog" and "Glossary" text links/buttons in `components/sections/Footer.tsx` |
| Homepage header | **Do not** add blog/glossary to `components/layout/Header.tsx` |
| Content layout header | Logo links to `/`; optional "Book a call" |
| Blog post footer | "Back to Dance" link to `/` on every post |
| Internal linking component | `<GlossaryTerm slug="..." />` or markdown convention `[[run-of-show]]` |

**Acceptance criteria:**
- [ ] Blog/glossary reachable from homepage footer only
- [ ] Content pages link home; no orphan pages

---

### Phase 3 — Kaya's learning workflow (ongoing — she runs this)

**Week 1 — Glossary first (high SEO value, defines category)**

1. Draft term list in spreadsheet (term, one-line definition, target keyword)
2. Scotty or Kaya adds one `.mdx` file per term under `content/glossary/`
3. Each term: 150–400 words, H1 = term name, link to 1–2 related terms
4. Publish 5 terms → review in Google Search Console (manual URL inspection)

**Week 2 — First blog posts (manual, no AI bulk)**

1. Pick 2 topics from future content calendar (or competitor keyword gap)
2. Write in MDX using template below
3. Link to 2–3 glossary terms per post
4. First-pass edit for voice (see Phase 4 Cursor rule)

**Post template (she copies per article):**

```markdown
---
title: ""
description: ""          # 150–160 chars, includes target keyword
publishedAt: ""
targetKeyword: ""
category: seo
---

<!-- Open with a pain point. No em dashes. -->

## [H2 with keyword variant]

...

## Related terms

- [Term](/glossary/slug)
```

**Cadence target:** 3–4 posts per work week once rhythm established; vary publish times (don't batch 12 at once).

**What she learns:**
- Frontmatter → Google snippet
- Glossary as topical authority
- Internal linking
- GSC: indexing, queries, impressions
- Editing AI drafts for voice (not publishing raw)

**Owner:** Kaya (content); Scotty (unblock on MDX/git questions)

---

### Phase 4 — Cursor content style rule (0.5 day)

**Scotty creates** `.cursor/rules/content-style.mdc` (or `AGENTS.md` section):

Suggested rules (adjust with Kaya after first edits):

- No em dashes
- Open with a concrete pain point, not a definition
- Short paragraphs; H2 every 200–300 words
- Write for event planners, not SEO robots (but include `targetKeyword` naturally once in H1/H2/first paragraph)
- Avoid rigid corporate deadpan (learned from LinkedIn experiment)
- SEO posts: actionable, template-adjacent, keyword in title + meta
- Thought leadership (if added later): different opener style — mark `category: thought`

**Acceptance criteria:**
- [ ] Kaya runs one draft through Cursor with rule; output needs fewer edits than without

---

### Phase 5 — Conversion & measurement (Scotty — after first posts live)

Not required for her to *learn*, but completes the engine:

| Task | Tool |
|------|------|
| Embed cal.com inline | Replace `#demo` / new `/book` page or modal; capture form data on-site |
| PostHog install | `posthog-js` in root layout; UTM params preserved |
| Conversion event | `book_call_clicked` on all "Book a call" buttons |
| Blog UTM convention | `?utm_source=blog&utm_medium=organic&utm_campaign={slug}` on in-post CTAs |
| GSC property | Verify domain; manual "Request indexing" until API automation |

**Deferred automation (Tesla / Scotty later):**

- Semrush competitor keyword export → content calendar CSV
- AI draft generation from calendar row
- GSC indexing API after each publish
- Scheduled publish via GitHub Action or CMS

---

### Phase 6 — Content calendar handoff (process, not code)

When blog + glossary exist, Tesla's pipeline plugs in:

```
Competitors (Semrush)
    → keyword list
    → 6-week calendar (topic, description, target keyword)
    → rows become draft MDX files or PRs
    → Kaya first-pass edit (voice)
    → merge + manual GSC inspect
    → PostHog UTM review weekly
```

**Calendar file (optional):** `content/calendar.csv` or `content/calendar.md` in repo — no generator needed initially.

---

## Role split

| Who | Owns |
|-----|------|
| **Scotty** | Phases 1–2, 4–5 (infra, footer, Cursor rule, PostHog, cal.com) |
| **Kaya** | Phase 3 (glossary, posts, edits, GSC monitoring, cadence) |
| **Tesla** | Phase 6 (competitor research, Semrush, calendar generation) — after foundation live |

---

## Suggested order of execution

```
Phase 0 (decisions)
    ↓
Phase 1 (MDX routes + sitemap)     ← Scotty
    ↓
Phase 2 (footer links)             ← Scotty — can merge with Phase 1
    ↓
Phase 4 (Cursor rule)              ← Scotty — early so Kaya's first drafts benefit
    ↓
Phase 3 (glossary → blog)          ← Kaya starts learning
    ↓
Phase 5 (cal.com + PostHog)          ← Scotty when ready to measure
    ↓
Phase 6 (calendar automation)      ← Tesla + Scotty
```

**Parallel with Dance rebrand:** Content infra does not depend on mockup work. Update `SITE.name` / domain once when Dance Phase 0 decisions land.

---

## Starter glossary terms (seed list for Kaya)

Use as Phase 3 checklist — trim or expand:

- Run of show
- Event timeline / production schedule
- Event budget template
- Vendor management
- Event kickoff
- Load-in / load-out
- Rehearsal schedule
- Event debrief
- Stakeholder alignment
- Event ROI (define lightly — wedge is QoL not enterprise ROI)
- Hybrid event planning
- AV production
- Catering BEO (banquet event order)
- Event staffing plan
- Contingency planning

---

## Acceptance criteria (foundation "done")

- [ ] Kaya can add a glossary term by creating one MDX file and merging
- [ ] Kaya can publish a blog post with frontmatter without Scotty
- [ ] Blog/glossary in sitemap; footer links work; homepage nav unchanged
- [ ] Cursor content rule exists and is used on at least one post
- [ ] At least 5 glossary terms + 2 blog posts live on staging/production
- [ ] GSC property verified; at least one URL manually indexed

---

## Files to create (checklist for implementation)

```
content/blog/.gitkeep
content/glossary/.gitkeep
content/blog/_example-post.mdx
content/glossary/_example-term.mdx
lib/content.ts
app/(content)/layout.tsx
app/(content)/blog/page.tsx
app/(content)/blog/[slug]/page.tsx
app/(content)/glossary/page.tsx
app/(content)/glossary/[slug]/page.tsx
.cursor/rules/content-style.mdc
docs/content-workflow.md          ← optional 1-pager for Kaya (how to add a post)
```

Update existing:

```
app/sitemap.ts
components/sections/Footer.tsx
app/layout.tsx                    ← may split marketing vs content route groups
package.json                      ← MDX deps
```
