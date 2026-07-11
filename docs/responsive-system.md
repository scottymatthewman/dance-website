# Responsive System

Single source of truth for how the homepage adapts across screen sizes.
Every section must be expressible in terms of the primitives below — if a
layout needs a one-off hack, extend the system instead.

## Breakpoints

Mobile-first. Defined in `app/globals.css` (`@theme inline`); `lg`/`xl` are
Tailwind defaults.

| Token | Min width | Target hardware |
| ----- | --------- | --------------- |
| base  | 20rem (320px) | small phones |
| `sm`  | 30rem (480px) | large phones / phablets |
| `md`  | 48rem (768px) | portrait tablets |
| `lg`  | 64rem (1024px) | landscape tablets / laptops |
| `xl`  | 80rem (1280px) | desktops |

Additional media conditions used by the system:

- `(max-width: 29.9375rem)` — sub-`sm` phones: tighter `--gutter` and
  hero insets.
- `(max-height: 40rem) and (max-width: 47.9375rem)` — short mobile
  viewports (landscape phones): compressed hero insets and stacks.
- `(orientation: portrait)` at `md+` — portrait tablets; used by the hero
  mockup to keep its bottom edge clipped (see Hero below).

## Responsive tokens

All defined on `:root` in `app/globals.css` and re-exported through
`@theme inline` as Tailwind utilities (`px-gutter`, `max-w-content`, …).

| Token | base | <30rem | md | lg | xl |
| ----- | ---- | ------ | -- | -- | -- |
| `--gutter` (section inline padding) | 1.5rem | 1rem | 2.5rem | 2.5rem | 4rem |
| `--shell-margin` (rail frame inset) | 0 | 0 | 24px | 40px | 40px |
| `--section-y` | 6rem | 6rem | 8rem (`--section-y-md`) | — | — |
| `--section-y-hero-top` | 4.5rem | 3rem | 5.5rem | — | — |
| `--text-hero` | 3rem | 3rem | 3.5rem | — | — |
| `--text-h2` | 1.75rem | 1.75rem | 2.5rem | — | — |
| `--text-subhead` | 0.9375rem | 0.9375rem | 1.0625rem | — | — |
| `--font-size-button-section` | 0.9375rem | 0.9375rem | 1rem | — | — |

Content rails (fixed at all sizes, always `min(100%, …)` via `w-full`):
`--content-max` 81.25rem · `--content-headline` 42rem · `--content-narrow`
40.625rem · `--content-prose` 36.25rem · `--frame-max` `min(94vw, 82rem)`.

## Layout primitives

1. **Shell** (`SiteShell` + `.site-shell-gutter*`): rail frame around the
   viewport. No side margins below `md`; 24px at `md`, 40px at `lg+`. The
   scroll stage height is always
   `calc(100dvh - var(--shell-margin-top) - var(--shell-margin))` — referred
   to as **shell height** below.
2. **Section height mode** (`HomeSectionConfig` in `lib/home/sections.ts`,
   applied by `ScrollTrackSection`):
   - *fill viewport* (default + listed in `FILL_VIEWPORT_SECTIONS` in
     `ScrollStage`): section is exactly shell height at every breakpoint.
   - `sizeToContent: true`: section height follows content.
   - `sizeToContent + fillViewportLg: true`: content height below `lg`,
     shell height at `lg+` (CSS class `scroll-track-section-frame--fill-lg`).
     Use for grids that need the full frame on desktop but stack on mobile
     (bento).
3. **Inset presets** (`section-spacing.ts` → `.section-inset--*`): horizontal
   `--gutter` plus per-preset vertical padding. Presets already scale via the
   tokens above — don't add per-section padding overrides.
4. **`SectionShell`**: vertical flex + variant alignment. Content decides
   centering per breakpoint with responsive `justify-*` utilities.
5. **`ContentRail`**: width cap + centering. Pick the narrowest rail that
   fits the content (`prose` → `narrow` → `headline` → `content`).

## Per-section layout spec

### Hero (`HeroContent`) — fill viewport
- **Copy** (`narrow` rail, centered): headline clamps
  `clamp(1.75rem, 6.5vw, 3rem)`; subhead + CTA stacked under it.
- **Timeline mockup** (Figma Terrace-Projects frames): a normal-flow region
  *below* the copy — it must never overlap the copy.
  - **Below `md`**: grid shell (`1fr` copy + `50%` mockup row); copy is centered
    in the upper row. Hero inset drops right padding (moved to `.hero-copy-block`
    so copy stays centered); mockup region is half the shell height, anchored to
    the section bottom, bleeds to the right edge only, left-top aligned. Frame:
    top + left stroke, top-left radius only. Cancels hero bottom inset.
  - **`md+`**: copy stacked above a flex-growing region; centered peek fills
    the region to the section bottom with top-aligned `hero-cover` scaling —
    bottom is intentionally clipped. Frame: top + left + right stroke, both top
    corner radii, no bottom border. Must never overlap the copy block.

### Features / flow (`FeaturesContent`) — fill viewport, pinned scroll
- Below `md`: heading → tabs → mockup → full-width CTA (`h-10`).
- At `md+`: split header (headline + CTA), tabs column fixed at 17.5625rem
  beside the mockup panel. Panel keeps `aspect-[1462/784]`.

### Use cases (`UseCasesContent`) — fill viewport
- Header + horizontal carousel; card size and gutter handled inside
  `UseCaseCarousel` (peek of the next card at every width).

### Benefits (`BenefitsContent`) — size to content
- 3 cards: stacked column below `lg`, equal-width row at `lg+` (three cards
  side by side get too cramped on portrait tablets).
- Card padding: `p-5` base → `p-8` at `sm+`.

### Bento (`BentoContent`) — size to content + fill viewport at `lg`
- Grid: 1 column base → 70% width centered `sm`–`md` → 2 columns `md` (hero card
  spans both) → 12 columns × 2 equal rows `lg+`.
- At `lg+` the section is shell height, rows are `minmax(0, 1fr)`, and card
  images flex to fill — this is what gives the images their height on
  desktop. Never re-introduce fixed image heights at `lg+`.
- Below `lg`, top-positioned card images use `aspect-[3/2]` (same ratio as the
  `md` two-column layout); right-positioned hero image uses `aspect-[3/2]` when
  stacked below `md`. Images also keep a floor: `min-h-[9.5rem]` base,
  `min-h-[11rem]` `sm+`; cards keep `min-h-[10–14rem]` by size.

### Statement (`StatementContent`) — fill viewport, pinned reveal
- `narrow` rail, centered both axes. Type scales via `--text-h2`.

### Email capture bleed (`EmailCaptureBleedContent`) — fill viewport
- Full-bleed image; copy in `prose` rail. Form caps at 24rem.
- **Below `md`**: mobile image (`email-capture-bg-mobile.jpg`); copy
  center-justified, anchored to the top of the section.
- **`md+`**: desktop image; copy left-aligned, vertically centered.

### Footer — released after the scroll track ends
- Fixed panel revealed by the scroll-release; spacing driven by
  `--shell-margin` tokens only.

## Rules of thumb

1. Never let two layers share vertical space via absolute positioning when
   one of them is text — use normal flow so overlap is impossible (this is
   what broke the hero).
2. Fixed-aspect media in a "peek" composition must be sized from *width* so
   the clipped edge always exceeds the frame (`min(vh, vw)` region heights +
   orientation overrides).
3. Prefer token changes (`--gutter`, `--section-y*`) over per-component
   media queries; add a breakpoint column to the token table if a new value
   is needed.
4. **Tailwind v4 gotcha:** in `@layer utilities`, a custom class wrapped in a
   top-level `@media` block gets tree-shaken. Nest the media query *inside*
   the class rule instead (see `.scroll-track-section-frame--fill-lg`).

## Verifying changes

```bash
npm run dev            # in one terminal
node scripts/screenshot-sections.mjs /tmp/dance-shots
```

Captures every section at 390, 480, 768, 1024, 1440, and 1920px wide
(scroll-jacking offsets are computed automatically, including the pinned
features/statement holds). Review the PNGs before and after any layout
change.
