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
