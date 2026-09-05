# Progress Tracker

Plan projects in phases, break phases into tasks, and track what is actually
finished.

Web application built with Next.js (App Router), React, TypeScript and
Tailwind CSS.

## Status

Segment 1 of Phase 1 is complete: project foundation only. There is no
dashboard, no design system, no domain data, no backend and no database yet.
Those arrive in later segments.

## Requirements

- Node.js 20.9 or newer (see `.nvmrc`, developed against Node 22)
- npm 10 or newer

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app runs at http://localhost:3000

## Scripts

| Script                 | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the development server                    |
| `npm run build`        | Produce the production build                    |
| `npm run start`        | Serve the production build                      |
| `npm run lint`         | Run ESLint                                      |
| `npm run lint:fix`     | Run ESLint and apply fixable changes            |
| `npm run format`       | Format the codebase with Prettier               |
| `npm run format:check` | Fail if anything is unformatted                 |
| `npm run typecheck`    | Type-check without emitting output              |
| `npm run verify`       | Typecheck, lint and format check in one command |

Run `npm run verify` before committing.

## Project structure

```
src/
  app/           Routes, layouts and route-level files only
  components/
    layout/      Application shell: header, sidebar, page frames
    ui/          Presentational primitives with no domain knowledge
  config/        Static application configuration
  features/      Domain modules, one folder per feature
  hooks/         Shared React hooks
  lib/           Framework-agnostic helpers and integrations
  types/         Types shared across more than one layer
```

### Where code belongs

`features/` is the default home for new work. A feature folder owns its own
components, hooks, types and data access, so a feature can be understood, moved
or deleted as a unit.

Promote code out of a feature only when a second feature needs it:

- shared presentational component, no domain knowledge, to `components/ui`
- shared hook to `hooks`
- shared pure helper to `lib`
- type used by more than one layer to `types`

`app/` stays thin. Route files should compose from `features/` and
`components/`, not hold logic themselves.

## Configuration

All environment variables are declared, validated and typed in `src/lib/env.ts`.
Import `env` from that module. Reading `process.env` anywhere else is blocked by
an ESLint rule.

A missing required variable throws at startup with the variable name, rather
than surfacing later as `undefined`.

Variables prefixed `NEXT_PUBLIC_` are inlined into the browser bundle and are
public. Never put a secret behind that prefix. Server-only secrets get no
prefix and are added when the backend exists.

## Conventions

- TypeScript strict mode. No `any` without a written reason.
- Prettier owns formatting. ESLint owns correctness. They do not overlap.
- Tailwind classes are sorted automatically by `prettier-plugin-tailwindcss`.
- Path alias `@/*` maps to `src/*`. Prefer it over deep relative imports.

## Roadmap

Phase 1 frontend foundation, then backend, database, REST API, integration,
testing and deployment. Android and iOS clients follow once the API is stable.
