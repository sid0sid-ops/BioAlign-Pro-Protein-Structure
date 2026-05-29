# Contributing

Thanks for improving the Protein Structure Workbench.

## Local Development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Start PostgreSQL and Redis with `docker compose up postgres redis`.
4. Run `npm run prisma:generate`.
5. Start the UI with `npm run dev` and the API engine with `npm run dev:api`.

## Standards

- Keep modules domain-oriented and reusable.
- Add typed service responses for every external API integration.
- Validate API inputs with Zod.
- Keep long-running prediction workflows asynchronous and cache provider responses.
- Favor accessible controls, keyboard navigation, and responsive layouts.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` before opening a PR.

## Pull Requests

Include:

- Problem statement.
- Screenshots or recordings for UI changes.
- API examples for backend changes.
- Migration notes for database changes.
- Testing and verification steps.
