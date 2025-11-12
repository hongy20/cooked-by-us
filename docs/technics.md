# ⚡ Next.js Features & Technical Decisions

This section explains the key **Next.js features** and technical decisions behind **Cooked by Us** — a hobby project for managing home-made recipes. It highlights modern practices and choices made to optimize performance, developer experience, and maintainability.

- Use [`src/`](https://nextjs.org/docs/app/api-reference/file-conventions/src-folder) for all application code. Clear separation between source code, configuration, and public assets
- Use the modern [App Router](https://nextjs.org/docs/app) instead of the old Pages Router
- **Runtime**: [Bun](https://bun.com/) used locally for development scripts, faster installs, and bundling
- Choose [Biome](https://biomejs.dev/) instead of ESLint for faster performance and simplified configuration
  - Configure GitHub Action to run Biome for automated code quality checks
- Activate Coding Agents
  - Configure Gemini CLI with a [dedicated context file](https://geminicli.com/docs/get-started/configuration/)
  - Enable the [Next.js MCP Server](https://nextjs.org/docs/app/guides/mcp)
