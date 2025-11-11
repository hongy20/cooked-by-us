# ⚡ Next.js Features & Technical Decisions

This section explains the key **Next.js features** and technical decisions behind **Cooked by Us** — a hobby project for managing home-made recipes. It highlights modern practices and choices made to optimize performance, developer experience, and maintainability.

- Using `src/` for all application code. Clear separation between source code, configuration, and public assets
- Uses the modern [App Router](https://nextjs.org/docs/app) instead of the old Pages Router
- Chose **Biome** instead of ESLint for faster performance and simplified configuration
- **Runtime**: **Bun** used locally for development scripts, faster installs, and bundling
- Configure GitHub Action to run Biome for automated code quality checks
