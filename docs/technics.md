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
- Authenticate with [Better Auth](https://www.better-auth.com/docs/integrations/next)
  - Configure Better Auth instance with [installation](https://www.better-auth.com/docs/installation)
  - Configure [Google](https://www.better-auth.com/docs/authentication/google) for Social Sign-on
  - Configure [Mongo Database](https://www.mongodb.com/) with [mongoose](https://mongoosejs.com/)
  - Restrict login to [selected accounts](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/errors/signup_disabled.mdx) only
- Use [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- Use [Dynamic Routes](https://nextjs.org/docs/app/getting-started/project-structure#dynamic-routes)
- Use [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- Use Next.js built-in [Link component](https://nextjs.org/docs/app/getting-started/linking-and-navigating) for prefetching and client-side navigation between routes
- Setup [Proxy](https://nextjs.org/docs/app/getting-started/proxy) to redirect anonymous visitors from accessing protected pages
- Prevent client-side execution of server-only code with module [server-only](https://nextjs.org/docs/app/guides/data-security#preventing-client-side-execution-of-server-only-code)
- Handle [redirects](https://nextjs.org/docs/app/guides/redirecting) in proxy, client components and server components
