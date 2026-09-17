# Backlog

This file tracks deferred implementation notes that should not be built immediately.

## Deployment and indexing follow-up

- After deploying the SEO prerender changes, rerun `npm.cmd run audit:seo-live` against production and compare Search Console Page Indexing exports and URL Inspection HTML. Local build success is not proof that Google has indexed every page.
- Review direct HTTP routing for nested Dashboard workspaces separately. The September 2026 production audit observed HTTP 404 followed by a valid client preview. Keep Dashboard private/noindex and outside the sitemap.
- Consider normalizing explicit `/index.html` variants to their canonical clean URLs. These alternates are not sitemap entries and already point at the clean canonical.

## Mobile layout findings from the 17/09/2026 SEO audit

- Fix horizontal overflow at 390px on Connect (`en`, `es`, `de`), Business Fraud (`de`), Passive Signals (`ja`), Mobile Driver's License (`de`), Adverse Media (`de`), Age Assurance (`de`), and E-learning (`es`, `de`). These are existing responsive defects with and without JavaScript, not `noindex` or crawl-blocking failures. Do not mask them with global `overflow-x: hidden`; inspect the actual text, tab and layout constraints.
- See `docs/seo-indexability-audit-2026-09-17.md` for measured overflow and the distinction between local changes and production. The separate long-reference-URL overflow in the GDPR/SSI Blog article was fixed without editing article copy.

## Docs

### Copy the visible documentation section as Markdown

Status: Deferred

The Docs `Copy page` action currently copies the page URL. Later, it should copy the documentation content currently visible in the main Docs article area as Markdown.

Recommended scope:

- Copy the active `DocSection` from `DocsArticleLayout`, because the Docs UI shows one section at a time.
- Serialize supported block types to Markdown: paragraphs, subheadings, callouts, lists, cards, tables, code blocks, changelog entries, SDK flow explorers, and API reference stages.
- Prefer copying the code/runtime/language currently selected by the user in SDK explorers. If that becomes too invasive, start with the default visible variant and document the limitation.
- Consider renaming the button copy from `Copy page` to `Copy section` if the behavior copies only the active section.
- Keep success and failure feedback localized across all supported locales.

Suggested verification:

- Test Overview, API Reference, and Changelog because they cover the widest block variety.
- Verify Markdown output for tables, code fences, SDK explorer code, and API reference stages.
- Run `npm.cmd run lint`, `npm.cmd run build`, and the localization scanners after implementation.
