# Post-Server Issues

This file tracks issues intentionally deferred until the project has a server/API layer available.

## [P3] Centralize Missing Translation Reporting

**Current state**
- `src/utils/i18nRuntime.ts` logs missing translations with `console.error`.
- In development, missing translations throw immediately.
- In production, missing translations return an empty string to avoid falling back to English.

**Why this should wait for the server**
- Production missing-translation events need a durable reporting path.
- A server endpoint can collect `scope`, `key`, `language`, route, and build version so missing copy can be audited instead of disappearing into browser consoles.

**Suggested server-side follow-up**
- Add an endpoint such as `POST /api/i18n/missing`.
- Send missing translation events from `i18nRuntime.ts` in production.
- Deduplicate repeated events on the client and/or server.
- Keep the current development behavior: throw fast, do not fall back to English.

**Acceptance criteria**
- Missing translation in dev mode still throws.
- Missing translation in production does not render English fallback.
- Missing translation in production is reported to the server with enough context to fix the source dictionary.
- `npm.cmd run scan:localization`, `npm.cmd run lint`, and `npm.cmd run build` pass.

## [P2] Move Blog Articles to the API and Complete Structured Article Locales

**Current state**
- The current structured blog articles are stored in a typed client-side registry that mirrors the intended API payload.
- Their listing metadata is available in English, Spanish, Japanese, German, and Vietnamese.
- Their full article content is currently available only in Vietnamese. Opening a structured article from another locale intentionally redirects to its canonical `/vi/blog-detail/{slug}` route.
- Responsive article images and the social sharing image are served from the local `public/blog` directory.

**Why this should wait for the server**
- The final article registry, locale availability, publication metadata, Markdown body, related posts, and asset URLs should come from the content API or CMS.
- The four remaining article translations need a durable server-side source before locale-specific detail routes and SEO pages are published.

**Suggested server-side follow-up**
- Add a localized blog article endpoint keyed by slug and locale.
- Move the static article registry, models, and image URLs into the server/CMS response.
- Add English, Spanish, Japanese, and German bodies for every structured article.
- Remove the Vietnamese-only route override after each translated payload is available.
- Generate canonical, hreflang, sitemap, Open Graph, and structured-data metadata from the server-backed locale availability.

**Acceptance criteria**
- Every locale shown on `BlogPage` opens a matching localized article body.
- Unsupported locale routes do not render a different language under the requested locale.
- Article metadata and images load from the API/CDN without changing the renderer contract.
- Canonical, hreflang, sitemap, Open Graph, and `BlogPosting` data match the article locale and publication metadata.
- `npm.cmd run test`, `npm.cmd run scan:all`, and `npm.cmd run build` pass.
