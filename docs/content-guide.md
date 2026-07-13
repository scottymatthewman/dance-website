# Content guide

How to publish blog posts and glossary terms on the Dance marketing site. For brand voice and positioning, see [`brand-positioning.md`](brand-positioning.md).

**Workflow:** Open a PR → Scotty reviews → merge to `main` → Vercel deploys production.

---

## Where content lives today

Content is defined in [`lib/content.ts`](../lib/content.ts):

- `BLOG_ARTICLES` — blog index entries (`title`, `slug`)
- `GLOSSARY_TERMS` — glossary entries (`term`, `definition`)

Routes:

| Page | File |
|------|------|
| `/blog` | `app/blog/page.tsx` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` (when added) |
| `/glossary` | `app/glossary/page.tsx` |

The placeholder entries in `lib/content.ts` are stubs — replace them as you publish real content.

---

## Principles

| Principle | Implementation |
|-----------|----------------|
| SEO first | Glossary + keyword-targeted blog posts |
| Blog not in homepage nav | Footer links only; posts link back to `/` |
| Glossary = category signal | Terms on `/glossary`; cross-link from blog posts |
| Consistent cadence > volume | Aim for steady publishing, not bulk dumps |
| SEO voice ≠ thought leadership | Keep educational SEO posts separate from opinion pieces |
| Match brand voice | Follow [`brand-positioning.md`](brand-positioning.md) |

---

## Blog posts

### Adding a post (current setup)

1. Add an entry to `BLOG_ARTICLES` in `lib/content.ts`:

```ts
{ title: "How to Build an Event Run of Show", slug: "event-run-of-show" },
```

2. Create the post page at `app/blog/[slug]/page.tsx` or add a shared article template when MDX is wired up.

3. Use a URL slug that matches the target keyword (lowercase, hyphenated).

### Post checklist

- [ ] Title is clear and includes the target keyword naturally
- [ ] Meta description summarizes the post in one sentence
- [ ] At least one internal link to `/` or `/glossary`
- [ ] Tone matches brand positioning — practitioner-first, not hypey
- [ ] CTA points to waitlist or early access where appropriate

### Recommended frontmatter (when MDX is added)

```yaml
---
title: "How to Build an Event Run of Show"
description: "A practical guide to run-of-show documents for corporate events."
publishedAt: "2026-06-17"
targetKeyword: "event run of show template"
category: seo
---
```

---

## Glossary

### Adding a term

Add an entry to `GLOSSARY_TERMS` in `lib/content.ts`:

```ts
{
  term: "Run of Show",
  definition: "A minute-by-minute schedule of everything happening during an event.",
},
```

### Glossary checklist

- [ ] Definition is one to three sentences — plain language
- [ ] Term matches how event planners actually search for it
- [ ] Related blog posts link to the glossary page where relevant

Start with 15–25 core event-planning terms. Expand over time.

---

## SEO basics

- **One primary keyword per post** — put it in the title, first paragraph, and URL slug
- **Internal linking** — glossary ↔ blog ↔ homepage
- **Sitemap** — `/blog` and `/glossary` are in `app/sitemap.ts`; add new post URLs when individual post routes exist
- **Canonical URLs** — use `SITE.domain` from `lib/constants.ts` for metadata

---

## What not to commit

- `.env.local` or any file with API keys (Resend, etc.)
- AI workflow folders (`.agents/`) — local only
- Font source TTFs in `scripts/font-sources/` — local only

---

## Related docs

- [`brand-positioning.md`](brand-positioning.md) — voice, audience, vocabulary
- [`design-system.md`](design-system.md) — layout if you touch page chrome
- [`responsive-system.md`](responsive-system.md) — breakpoints if layout changes
