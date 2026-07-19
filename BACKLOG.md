# Backlog

This file tracks deferred implementation notes that should not be built immediately.

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
