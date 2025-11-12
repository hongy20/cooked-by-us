# Project: Cooked by Us

## Project Context

- **Project Type**: Next.js
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Version**: 16
- **Source Root**: All source code lives under the `src/` directory.

## General Behavior

- Use Next.js 16 App Router conventions (server-first, cache-aware).
- Prefer **server components** unless client interactivity is required.
- Use **server actions** for mutations and form submissions.
- Apply **persistent caching** for data reads when suitable.
- Enforce a clear **Data Access Layer (DAL)** between server logic and UI:
  - All database or external API interactions must go through `src/lib/data/` or a similar DAL module.
  - No direct DB or API calls inside server or client components.
- Validate inputs with **Zod** for all server actions or API routes.
- Keep code modular, strongly typed, and consistent with Next.js conventions.

## Code Style & Tooling

- Use **Biome** for linting and code formatting (not ESLint or Prettier).
- Adhere to Biome configuration in `biome.json` or `package.json`.
- Prefer **functional React components**.
- Use **Tailwind CSS** for styling.
- Keep imports organized and use **path aliases** like `@/lib`, `@/components`, `@/app`, etc.
- Use **JSDoc** for non-trivial utility functions.

## File Structure Guidance

All application code should live under `src/`.

```
src/
├── app/ # Next.js App Router pages and layouts (server-first)
├── components/ # Reusable UI components
├── lib/
│ ├── data/ # Data Access Layer (DAL): all DB and API logic lives here
│ └── utils/ # Shared helpers and utilities
├── styles/ # Global or shared styles
└── public/ # Static assets
```

## Regarding Dependencies

- Avoid introducing new external dependencies unless absolutely necessary.
- If a new dependency is required, please state the reason and ensure it aligns with project conventions.
