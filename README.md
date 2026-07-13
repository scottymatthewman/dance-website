# Dance marketing site

Marketing site for [Dance](https://usedance.com) — event planning workspace for teams and event agents.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run knip` | Find unused exports/files |

## Docs

| Doc | Audience |
|-----|----------|
| [`docs/brand-positioning.md`](docs/brand-positioning.md) | Brand voice, audience, messaging |
| [`docs/content-guide.md`](docs/content-guide.md) | Blog and glossary publishing workflow |
| [`docs/design-system.md`](docs/design-system.md) | Layout and typography |
| [`docs/mockup-color-system.md`](docs/mockup-color-system.md) | Product mockup colors |
| [`docs/responsive-system.md`](docs/responsive-system.md) | Breakpoints and responsive behavior |

## Contributing

1. Branch from `main`
2. Open a PR
3. Scotty merges to `main` → Vercel deploys production

For content work, start with `docs/content-guide.md` and `docs/brand-positioning.md`.

## Environment variables

Copy `.env.example` to `.env.local` for local form notifications (Resend). Never commit `.env.local`.
