# Kya mockup color system

Reference for **interactive product mockups** on the marketing site (`HeroMockup`, `IntegrationsMockup`, `BoardsMockup`, etc.).

This is separate from the **marketing site palette** in `app/globals.css` (black page, white text, mint accent). Mockups mirror the in-app UI from [Figma — Kya](https://www.figma.com/design/CnIGTzZeYLLu2glXTzZKk5/Kya) in dark mode.

---

## Principles

1. **Dark mode by default** for all product mockups embedded in bento cards and the hero.
2. **Do not recolor brand logos** — Slack, HubSpot, Gmail, etc. keep their native colors; icon tiles may stay `#FFFFFF`.
3. **Use semantic tokens** below rather than one-off hex values when possible.
4. **Prefer subtle borders and shadows** over heavy boxes-in-boxes framing.

---

## Neutral scale (primitives)

Extracted from Figma variables and layer fills on product frames.

| Token | Light (Figma) | Dark (mockups) | Usage |
|---|---|---|---|
| `gray-0` | `#FFFFFF` | — | Logo icon tiles only |
| `gray-1` | `#FCFCFD` | `#141414` | Raised surface / canvas |
| `gray-2` | `#F4F4F4` | `#0F0F0F` | Page / shell background |
| `gray-3` | `#F2F2F2` | `#2A2A2A` | Interactive fills (buttons, chips) |
| `gray-4` | `#EEEEEE` | `#2E2E2E` | Borders, dividers |
| `gray-5` | `#DDDDDD` | `#333333` | Badges, secondary fills |
| `gray-6` | `#868686` | `#6B6B6B` | Placeholder text |
| `gray-7` | `#828282` | `#828282` | Muted / secondary body (works on both) |
| `gray-8` | `#999999` | `#949494` | Tertiary labels |
| `gray-9` | `#272727` | `#D4D4D4` | Secondary emphasis text |
| `gray-10` | `#1A1A1A` | `#F4F4F4` | Primary text |

Figma variable bindings seen in file: `Neutral Colors/Gray 3` → `#F2F2F2`, `Neutral Colors/Gray 7` → `#828282`.

---

## Semantic tokens — dark mockups

These are the values currently used across mockup components.

### Backgrounds

| Token | Value | Used for |
|---|---|---|
| `bg-page` | `#0F0F0F` | Hero shell, sidebar |
| `bg-surface` | `#141414` | Main canvas, tab pills |
| `bg-elevated` | `#1C1C1C` | Cards, inputs, task cards |
| `bg-elevated-hover` | `#202020` | Card hover |
| `bg-elevated-active` | `#222222` | Card / row selected |
| `bg-interactive` | `#2A2A2A` | Send button, action chips |
| `bg-interactive-hover` | `#3A3A3A` | Send button hover |
| `bg-badge` | `#333333` | Nav chip, icon button active |

### Text

| Token | Value | Used for |
|---|---|---|
| `text-primary` | `#F4F4F4` | Headings, card titles, body |
| `text-secondary` | `#D4D4D4` | Tab labels, de-emphasized UI |
| `text-tertiary` | `#949494` | Nav icons, subtitles |
| `text-muted` | `#828282` | Descriptions, suggestion prompts |
| `text-placeholder` | `#6B6B6B` | Input placeholders |
| `text-muted-hover` | `#A8A8A8` | Italic suggestions on hover |
| `text-icon-subtle` | `#C4C4C4` | Inactive action icons on hover |

### Borders

| Token | Value |
|---|---|
| `border-default` | `#2E2E2E` |
| `border-subtle` | `rgba(255, 255, 255, 0.06)` |
| `border-hover` | `rgba(255, 255, 255, 0.15)` |
| `border-active` | `rgba(255, 255, 255, 0.20)` – `0.25` |
| `border-focus` | `rgba(255, 255, 255, 0.35)` |
| `border-divider` | `rgba(255, 255, 255, 0.08)` |

### Shadows

| Token | Value |
|---|---|
| `shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.06)` |
| `shadow-md` | `0 10px 16px rgba(0, 0, 0, 0.06)` |
| `shadow-card` | `0 1px 2px rgba(0, 0, 0, 0.40)` |
| `shadow-focus-ring` | `0 0 0 1px rgba(255, 255, 255, 0.12)` |

### Interactive overlays

| Token | Value |
|---|---|
| `overlay-hover` | `rgba(255, 255, 255, 0.04)` – `0.06` |
| `overlay-active` | `rgba(255, 255, 255, 0.04)` |

---

## Status & accent colors

Keep these for column headers, agent badges, and semantic UI — do not neutralize.

| Token | Value | Usage |
|---|---|---|
| `accent-agent` | `#02ABFF` | Kya agent avatar badge |
| `accent-today` | `#02ABFF` | Today column / open status ring |
| `accent-progress` | `#5D60ED` | In Progress column, half-circle status |
| `accent-progress-gradient-from` | `#5DB1ED` | "N agents at work…" text gradient |
| `accent-progress-gradient-to` | `#5D60ED` | "N agents at work…" text gradient |
| `accent-review` | `#E8963A` | Review column dot |
| `brand-hubspot` | `#FF7A59` | HubSpot icon tile background only |

### Column surface tints (boards)

Subtle top gradients on kanban columns — use low opacity on dark base:

| Column | Tailwind-style gradient |
|---|---|
| Backlog | `from-white/[0.06] to-transparent` |
| Today | `from-[#02abff]/10 to-transparent` |
| In Progress | `from-[#5d60ed]/12 to-transparent` |
| Review | `from-[#e8963a]/10 to-transparent` |

---

## Light mode reference (Figma source)

Use when translating new Figma frames before applying dark tokens.

| Role | Light value |
|---|---|
| Page / sidebar | `#F4F4F4` |
| Surface / canvas | `#FCFCFD` |
| Elevated card | `#FFFFFF` |
| Border | `#EEEEEE` |
| Primary text | `#1A1A1A` |
| Secondary text | `#272727` |
| Muted text | `#828282` |
| Placeholder | `#868686` |
| Count / tertiary | `#999999` |

Light → dark mapping: invert the gray hierarchy (page darkest → elevated lighter; text lightest on dark surfaces).

---

## Copy-paste CSS variables

Optional snippet for new mockup components. Not wired into the site global theme.

```css
:root[data-mockup-theme="dark"] {
  --mockup-bg-page: #0f0f0f;
  --mockup-bg-surface: #141414;
  --mockup-bg-elevated: #1c1c1c;
  --mockup-bg-elevated-hover: #202020;
  --mockup-bg-elevated-active: #222222;
  --mockup-bg-interactive: #2a2a2a;

  --mockup-text-primary: #f4f4f4;
  --mockup-text-secondary: #d4d4d4;
  --mockup-text-tertiary: #949494;
  --mockup-text-muted: #828282;
  --mockup-text-placeholder: #6b6b6b;

  --mockup-border-default: #2e2e2e;
  --mockup-border-subtle: rgba(255, 255, 255, 0.08);
  --mockup-border-hover: rgba(255, 255, 255, 0.15);

  --mockup-accent-agent: #02abff;
  --mockup-accent-progress: #5d60ed;
  --mockup-accent-review: #e8963a;
}
```

---

## Typography (mockups)

From Figma type styles — marketing site uses Geist; mockups approximate Suisse Intl scale:

| Style | Size | Weight | Tracking |
|---|---|---|---|
| Body M / column title | 16px (`text-sm` scaled) | 500 | `-0.02em` |
| Body S / card body | 14px | 400 | `-0.02em` |
| Caption / description | 13px | 400 | `-0.02em` |
| Small caption | 12px | 400 | `-0.02em` |

---

## Components using this system

| Component | Location |
|---|---|
| `HeroMockup` | Hero section |
| `IntegrationsMockup` | Bento — Unified intelligence |
| `BoardsMockup` | Bento — Account monitoring |

When adding a new mockup, match these tokens first. If Figma introduces a new semantic color, add it to this doc before hardcoding in the component.
