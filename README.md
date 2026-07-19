# Identra Website

Identra is a multilingual React website for an identity verification platform. It includes public marketing pages, product and solution pages, a developer Docs experience, resource pages, localized blog details, SEO-ready static HTML output, and an interactive demo sandbox.

This README is the human-friendly entry point for the repository. For detailed implementation rules, see [CODEX.md](CODEX.md) and the focused guides in [docs/](docs/).

## What Is In This App

- Public website pages for Identra products, industries, solutions, company content, resources, and developer documentation.
- Locale-aware routing for five supported languages: `en`, `es`, `ja`, `de`, and `vi`.
- Localized SEO metadata, canonical URLs, `hreflang` alternates, sitemap generation, robots rules, Open Graph, Twitter cards, and JSON-LD.
- Blog and resource pages with separate Blog Detail behavior.
- A standalone Docs page with section navigation, article layouts, code blocks, and localized documentation content.
- An interactive demo sandbox with fictional verification scenarios, flow graphs, summary modals, and dashboard-style demo content.

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS v4
- React Router
- Motion
- Lucide React
- Recharts
- Prism.js

## Quick Start

### Requirements

- Node.js 18 or newer
- npm

### Install

```powershell
npm install
```

### Configure Environment

Copy the example file and adjust values for your environment:

```powershell
Copy-Item .env.example .env
```

Important variables:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public canonical origin used by SEO metadata, sitemap, social previews, and localized static pages. |
| `APP_URL` | Runtime host URL used by applet or hosting environments when needed. |

For local development, `VITE_SITE_URL` can stay pointed at the intended public site. For production SEO output, set it to the real public origin.

### Run The Dev Server

```powershell
npm.cmd run dev
```

The app runs at:

```text
http://localhost:3000
```

### Build

```powershell
npm.cmd run build
```

The build command:

1. Generates SEO assets.
2. Runs the Vite production build.
3. Generates localized HTML entry points under `dist/{locale}/...`.

### Preview A Production Build

```powershell
npm.cmd run preview
```

The Vite preview middleware serves locale-prefixed static entries and localized 404 pages from `dist/`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm.cmd run dev` | Starts the Vite dev server on port `3000`. |
| `npm.cmd run build` | Generates SEO assets, builds the app, and generates localized pages. |
| `npm.cmd run preview` | Serves the production build locally. |
| `npm.cmd run lint` | Runs TypeScript checking with `tsc --noEmit`. |
| `npm.cmd run generate:seo` | Generates SEO assets such as sitemap and robots files. |
| `npm.cmd run generate:localized-pages` | Generates localized HTML entries from the built app. |
| `npm.cmd run scan:localization` | Scans components for likely hard-coded user-visible copy. |
| `npm.cmd run scan:i18n-architecture` | Scans for forbidden i18n implementation patterns. |
| `npm.cmd run scan:component-translation-data` | Scans for component-owned translation data patterns. |
| `npm.cmd run scan:routing-types` | Scans route type safety and route helper usage. |
| `npm.cmd run scan:translation-encoding` | Scans for mojibake and encoding problems. |
| `npm.cmd run scan:translation-inheritance` | Scans translation dictionaries for inheritance and fallback patterns. |

## Project Map

```text
.
|-- CODEX.md                         # General contributor and coding-agent guide
|-- BACKLOG.md                       # Deferred implementation notes
|-- docs/                            # Focused architecture and process guides
|-- public/                          # Public assets generated or served by Vite
|-- scripts/                         # SEO generators, localized page generator, scanners
|-- src/
|   |-- App.tsx                      # Route state, lazy page mapping, shell behavior
|   |-- components/                  # Pages, shared UI, Docs, demo components
|   |-- context/                     # Runtime context such as language state
|   |-- translations/                # Localized UI, page, SEO, and docs content
|   |-- types/routes.ts              # Route and locale source of truth
|   |-- utils/                       # SEO, i18n, and shared helpers
|   `-- assets/                      # Source images and visual assets
|-- index.html                       # SPA HTML template with SEO placeholders
|-- package.json                     # Scripts and dependencies
|-- vite.config.ts                   # Vite config and localized preview behavior
`-- tsconfig.json
```

## Routing And Localization

`src/types/routes.ts` is the source of truth for route values and locale-aware URL helpers.

Public URLs are locale-prefixed:

```text
/en
/vi/blog
/de/docs
/ja/blog-detail/blog-1
```

The root path `/` routes users into a supported locale. Language changes should preserve the current route when possible, for example from `/en/blog` to `/vi/blog`.

Translation dictionaries live in `src/translations/`. All user-visible copy should exist in all five locales. Do not add English fallback, partial locale inheritance, or translated strings stored in long-lived state.

Read more:

- [docs/i18n-architecture.md](docs/i18n-architecture.md)
- [docs/routing-and-locales.md](docs/routing-and-locales.md)

## SEO Pipeline

SEO is built from typed route data, localized SEO copy, and generation scripts.

The current pipeline handles:

- Canonical locale-prefixed URLs
- `hreflang` alternates and `x-default`
- Open Graph and Twitter card metadata
- Localized HTML fallback content before hydration
- Sitemap and robots output
- JSON-LD for public pages and blog posts

Read more:

- [docs/seo-requirements.md](docs/seo-requirements.md)

## Working Guides

Use these documents when changing a focused area:

- [CODEX.md](CODEX.md) for general coding, localization, routing, branding, verification, and handoff rules.
- [docs/i18n-architecture.md](docs/i18n-architecture.md) for translation dictionaries, language behavior, and i18n scanners.
- [docs/routing-and-locales.md](docs/routing-and-locales.md) for locale-prefixed URLs and route helpers.
- [docs/page-implementation-patterns.md](docs/page-implementation-patterns.md) for adding or updating public pages.
- [docs/seo-requirements.md](docs/seo-requirements.md) for SEO metadata and generated SEO output.
- [docs/docs-page-architecture.md](docs/docs-page-architecture.md) for the standalone Docs experience.
- [docs/demo-sandbox-architecture.md](docs/demo-sandbox-architecture.md) for interactive demo scenarios.
- [docs/scripts-and-scanners.md](docs/scripts-and-scanners.md) for scripts, scanners, and generated assets.

## Verification

For TypeScript or UI implementation changes:

```powershell
npm.cmd run lint
npm.cmd run build
```

For localization or copy changes, also run:

```powershell
npm.cmd run scan:localization
npm.cmd run scan:i18n-architecture
npm.cmd run scan:component-translation-data
npm.cmd run scan:translation-encoding
npm.cmd run scan:translation-inheritance
```

For route changes, also run:

```powershell
npm.cmd run scan:routing-types
```

For SEO, Docs, demo, or script-specific work, follow the matching guide in [docs/](docs/).

## Repository Notes

- Do not edit `dist/`, `node_modules/`, or other generated/dependency output directly.
- Do not commit real personal data, secrets, production credentials, or access tokens.
- Keep demo data fictional.
- Put deferred product or implementation notes in `BACKLOG.md`, not in `CODEX.md`.
- Keep project documentation readable for people first; detailed implementation rules should live in focused files under `docs/`.
