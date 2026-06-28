# Identra Homepage

Identra Homepage is a React and Vite website for presenting Identra's SSI identity platform, product pages, documentation, guides, blog content, legal pages, and technical specifications.

The project is built as a client-side single page app with SEO-friendly routes handled by the frontend router and deployment rewrites.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4 via `@tailwindcss/vite`
- Lucide React icons
- Motion is present in dependencies for existing UI interactions

Project conventions prefer:

- Tailwind CSS utilities for styling
- Shared components and patterns for consistent subpage design
- GSAP for new animation work, according to `codex.md`
- The visual rules documented in `design.md`

## Getting Started

### Prerequisites

- Node.js
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

The dev server runs on:

```text
http://localhost:3000
```

### Type Check

```bash
npm run lint
```

This runs `tsc --noEmit`.

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Environment Variables

An `.env.example` file exists because the project started from an AI Studio template.

At the moment, the frontend source does not require a runtime environment variable to run locally. If future server-side or AI features are added, copy `.env.example` to `.env.local` and fill in the required values.

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

## Project Structure

```text
.
|-- public/
|   |-- _redirects
|   |-- robots.txt
|   |-- site.webmanifest
|   `-- identra-social-preview.png
|-- src/
|   |-- assets/
|   |   `-- images/
|   |-- components/
|   |   |-- BlogSubpage.tsx
|   |   |-- BlogDetailSubpage.tsx
|   |   |-- DocumentSubpage.tsx
|   |   |-- GuideSubpage.tsx
|   |   |-- Navbar.tsx
|   |   `-- ...
|   |-- data/
|   |   |-- blogAcademicContent.ts
|   |   |-- blogContent.ts
|   |   `-- blogEducationArticle.ts
|   |-- App.tsx
|   |-- index.css
|   |-- main.tsx
|   `-- navigation.ts
|-- codex.md
|-- design.md
|-- package.json
|-- tsconfig.json
|-- vercel.json
`-- vite.config.ts
```

## Key Areas

### Routing

Routes and path helpers live in:

```text
src/navigation.ts
```

The app uses clean paths such as `/blog`, `/documentation`, `/guides`, and `/technical-specifications`. `vercel.json` rewrites all non-file routes back to `index.html` for SPA routing.

### Blog Content

Blog article data is stored under:

```text
src/data/
```

`src/data/blogContent.ts` exports the blog database used by the blog list and article detail pages. Long-form academic content is currently split between `blogAcademicContent.ts` and focused article modules such as `blogEducationArticle.ts`.

### SDK Documentation

Illustrative SDK flows and reference examples live in:

```text
src/identraSdkCatalog.ts
src/identraSdkReference.ts
src/components/DocumentSubpage.tsx
src/components/GuideSubpage.tsx
```

These examples are product documentation content, not production SDK packages.

### Design System

Design tokens, colors, typography, spacing, and scrollbar rules are documented in:

```text
design.md
```

Before making UI changes, read `design.md` and reuse existing visual patterns where possible.

### Development Rules

Project-specific coding rules are documented in:

```text
codex.md
```

Important rules include:

- Read `design.md` and `codex.md` before code changes.
- Prefer reusable components and shared patterns.
- Use Tailwind CSS for styling.
- Use GSAP for new animations.
- Run TypeScript checks and a production build after edits.

## Deployment

The project can be deployed as a static Vite build.

For Vercel, `vercel.json` includes a rewrite so direct visits to SPA routes work:

```json
{
  "rewrites": [
    {
      "source": "/((?!.*\\\\.).*)",
      "destination": "/index.html"
    }
  ]
}
```

For Netlify or other static hosts, keep an equivalent fallback to `index.html`. The repository also includes `public/_redirects`.

## Recommended Workflow

1. Read `codex.md` and `design.md`.
2. Inspect existing components before creating new ones.
3. Make scoped changes using Tailwind utilities and existing patterns.
4. Run:

```bash
npm run lint
npm run build
```

5. For UI changes, verify the affected page in light and dark mode and at relevant breakpoints.

## License

See `LICENSE`.
