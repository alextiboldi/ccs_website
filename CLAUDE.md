# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (pnpm-lock.yaml, pnpm-workspace.yaml).

```bash
pnpm dev      # dev server on :3000
pnpm build    # production build
pnpm start    # serve the build
pnpm lint     # eslint (flat config)
```

No test setup exists yet.

## State

Unmodified `create-next-app` scaffold: Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4. Everything lives in `app/` (`layout.tsx`, `page.tsx`, `globals.css`); `page.tsx` is still the starter placeholder and `layout.tsx` metadata still says "Create Next App".

## Conventions worth knowing

- **Tailwind v4** — no `tailwind.config.js`. Theme tokens are declared in `app/globals.css` via `@theme inline`, wired to CSS variables under `:root` with a `prefers-color-scheme: dark` override. Add design tokens there, not in a JS config.
- Fonts come from `next/font/google` (Geist / Geist Mono) in `layout.tsx`, exposed as `--font-geist-sans` / `--font-geist-mono`. Note `globals.css` currently hardcodes `body { font-family: Arial... }`, overriding those variables.
- Import alias `@/*` maps to the repo root.
