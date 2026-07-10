# Dance marketing site — layout design system

Reference for **page layout, section structure, typography rhythm, and spacing** on the marketing site. For interactive product mockup colors, see [`mockup-color-system.md`](mockup-color-system.md).

Tokens live in [`app/globals.css`](../app/globals.css). Section shell wiring is in [`lib/home/section-spacing.ts`](../lib/home/section-spacing.ts).

---

## Principles

1. **One content rail** — primary section content aligns to the left gutter and shares a single max width (`--content-max`).
2. **Repeatable section anatomy** — use `SectionShell` + `SectionHeader` + `ContentRail` instead of one-off layout markup.
3. **Documented exceptions** — full-bleed media (carousel, hero mockup) breaks the rail intentionally and is listed below.
4. **Headingless is valid** — some sections (Benefits, Bento) are visual grids without a section intro.

---

## Layout grid

### Shell

| Token | Value | Usage |
|-------|-------|-------|
| `--shell-margin` | `0` → `24px` (md) → `40px` (lg) | Fixed frame inset around scroll stage |
| `--gutter` | `1.5rem` → `2.5rem` (md) → `4rem` (xl) | Horizontal padding inside sections (`.section-inset`) |

The scroll stage frame is pinned inside the shell margins. All section copy left-aligns to the gutter edge.

### Content widths

| Token | Tailwind class | Value | When to use |
|-------|----------------|-------|-------------|
| `--content-max` | `max-w-content` | `81.25rem` | Primary content rail — grids, mockups, feature panels |
| `--content-headline` | `max-w-headline` | `42rem` | h2 + subhead blocks |
| `--content-narrow` | `max-w-narrow` | `40.625rem` | Centered hero/statement copy columns |
| `--content-prose` | `max-w-prose` | `36.25rem` | Forms, narrow UI |

**Rule:** Use token classes, not arbitrary `max-w-[…]` values, in section content.

---

## Type scale

| Class | Token | Size | Font | Usage |
|-------|-------|------|------|-------|
| Hero h1 | `--text-hero` | `3rem` / `3.5rem` (md) | display | Hero headline only (clamp in component) |
| `text-h2` | `--text-h2` | `1.75rem` / `2.5rem` (md) | display | Section headlines |
| `text-h3` | `--text-h3` | `1.25rem` | display | Card titles (Benefits) |
| `text-body-lg` | `--text-body-lg` | `1.125rem` | sans | Hero subhead |
| `text-subhead` | `--text-subhead` | `1.0625rem` | sans | Section subheads (`#555`) |
| `text-body-md` | `--text-body-md` | `1.0625rem` | sans | Body copy in cards, flow steps |

### Type pairings + gaps

Vertical gaps use CSS custom properties:

| Pairing | Gap token | Value | CSS class |
|---------|-----------|-------|-----------|
| h1/h2 → subhead | `--copy-tight` | `0.5rem` (8px) | `.section-copy` |
| Copy block → content | `--copy-to-content` | `1.5rem` (24px) | `.section-intro` |
| Statement/h2 block → CTA | `--stack-md` | `2rem` (32px) | ad hoc `gap-6` in centered sections |

**Line heights:**
- Headings: `leading-[1.3]`
- Body/subhead: `leading-normal` (mobile), `md:leading-[1.5]` (tablet+)

---

## Section archetypes

Implemented by [`SectionShell`](../components/home/sections/SectionShell.tsx):

| Variant | Alignment | Header | Home sections |
|---------|-----------|--------|---------------|
| `centered` | center | optional | Hero, Statement |
| `standard` | left | required | Features, Use Cases |
| `headingless` | left | none | Benefits, Bento |
| `split-media` | left | required | Email capture |

### Home section map

| Section | Shell | Header | Content rail | Inset preset |
|---------|-------|--------|--------------|--------------|
| Hero | `centered` | custom h1 reveal | `narrow` (copy), `content` (mockup) | `hero` |
| Features | `standard` + `justify-center` | `SectionHeader` split + CTA | `content` | `viewport` |
| Use Cases | `standard` + inner `section-intro` | `SectionHeader` | full width (carousel bleeds) | `viewport` |
| Benefits | `headingless` | — | `content` | `spacious` |
| Bento | `headingless` | — | `content` | `compact` |
| Statement | `centered` | custom h2 reveal | `narrow` | `statement` |
| Email | `split-media` | `SectionHeader` | `prose` (form) | `flush` (outer) + `default` (copy column) |

---

## Inset presets

Applied by [`ScrollTrackSection`](../components/home/ScrollTrackSection.tsx) via [`lib/home/section-spacing.ts`](../lib/home/section-spacing.ts). Horizontal gutter is always `padding-inline: var(--gutter)`.

| Preset | Vertical padding | Sections |
|--------|-----------------|----------|
| `hero` | `--section-y-hero-top` / `--section-y-hero-bottom` | hero |
| `viewport` | `--stack-md` (2rem) | features, useCases — fill-viewport sections that need maximum content area |
| `default` | `--section-y` → `--section-y-md` at md | statement bottom, email copy column, footer |
| `spacious` | `--section-y` → `--section-y-lg` at md | benefits |
| `compact` | `--stack-sm` (1rem) | bento |
| `flush` | `0` | email capture outer shell |
| `statement` | `--stack-md` top, `--section-y` bottom | statement |

Inter-section gaps: `--section-gap` (2rem) between different surfaces, `--section-gap-same` (4rem) between same-surface sections.

---

## Macro-components

### `ContentRail`

[`components/home/sections/ContentRail.tsx`](../components/home/sections/ContentRail.tsx)

Enforces max width. No horizontal padding — gutter comes from the section inset.

```tsx
<ContentRail width="content" align="center">
  {children}
</ContentRail>
```

### `SectionHeader`

[`components/home/sections/SectionHeader.tsx`](../components/home/sections/SectionHeader.tsx)

```tsx
// Standard intro
<SectionHeader headline="Built for…" subhead="Get closer to…" />

// Features-style split with CTA
<SectionHeader
  layout="split"
  headline="One place to execute, together."
  action={<CtaButton size="section" />}
/>

// Future eyebrow (optional)
<SectionHeader eyebrow="Features" headline="…" subhead="…" />
```

`SectionCopy` is deprecated — import `SectionHeader` instead.

### `SectionShell`

[`components/home/sections/SectionShell.tsx`](../components/home/sections/SectionShell.tsx)

```tsx
<SectionShell variant="standard" intro>
  <SectionHeader headline="…" subhead="…" />
  <UseCaseCarousel />
</SectionShell>
```

Set `intro` when the shell has a header + primary content block (applies `.section-intro` gap).

---

## Bleed exceptions

These intentionally break the content rail. Do not "fix" them to align without design intent.

| Pattern | Where | How |
|---------|-------|-----|
| Carousel bleed | Use Cases | `-mx-[var(--gutter)]` + `scroll-pl-[var(--gutter)]` on carousel |
| Hero mockup bleed | Hero | `MockupFrame bleedBottom` extends below section bottom |
| Flow mockup aspect | Features | `ImageFrame preset="flow"` uses `aspect-[1462/784]` (`PLAN_MOCKUP_ASPECT`) — matches plan timeline final frame |
| Split image | Email | Left column is full-bleed; copy column uses `section-inset` |
| Bento grid | Bento | Grid fills `max-w-content` rail; cards use internal layout |

---

## Adding a new section

1. Pick a `SectionShell` variant from the table above.
2. Add section config to [`lib/home/sections.ts`](../lib/home/sections.ts) with an inset preset.
3. Use `SectionHeader` unless the section is `headingless`.
4. Wrap primary content in `ContentRail` with the appropriate width token.
5. If media must bleed, document the exception in this file.
