<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

For interactive product mockups (`*Mockup.tsx`), use the dark-mode palette in [`docs/mockup-color-system.md`](docs/mockup-color-system.md). Do not recolor brand logos.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

`dance-website` is a frontend-only Next.js 16 / React 19 marketing site. There is no backend, database, env vars, or external services — running the dev server is all that's needed to work on it end to end.

- Package manager is **npm** (`package-lock.json`); the startup update script already runs `npm install`.
- Scripts are in `package.json`: `npm run dev` (dev server on port 3000, uses `--webpack`), `npm run dev:turbo` (Turbopack), `npm run build`, `npm run start`, `npm run lint`.
- There is no automated test suite; validate changes via `npm run build` and manual browser checks at `http://localhost:3000`.
- Note: `npm run lint` currently reports pre-existing violations (`react-hooks/set-state-in-effect` in `components/sections/Hero.tsx` and `hooks/useTimedRevealProgress.ts`, plus an unused-var warning). These predate any new work — don't attribute them to your changes.
