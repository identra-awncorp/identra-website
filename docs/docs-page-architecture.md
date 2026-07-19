# Docs Page Architecture

This document describes the implementation rules for the standalone Docs experience. Keep `CODEX.md` focused on general coding rules; put Docs-specific structure here.

## File Naming

- Files under `src/components/docs/` use purpose-first names.
- Tab page wrappers are named `Docs{TabName}Page.tsx`.
- The shared article renderer is `DocsArticleLayout.tsx`.
- Shared types live in `docsModel.ts`.
- Tab navigation config lives in `docsNavigation.ts`.
- Reusable code selectors end with `CodeExplorer`.
- Structured Docs data ends with `Catalog`.

## Tab Behavior

- Docs tab buttons switch between standalone document components.
- Do not make tab buttons behave as in-page anchors unless the product explicitly asks for that behavior.
- Each tab should own one document surface that can be expanded independently over time.

## Menus

- In `DocsArticleLayout`, the left menu lists the main sections of the current document and changes the central content.
- The right menu lists topics inside the active section.
- Do not swap the roles of the left and right menus.
- Long documents should be split into main sections and section topics instead of rendering a single wall of content.

## Article Layout

- The article layout should not render a duplicated document-level `h1` for the active tab by default.
- The top tab navigation already names the document.
- The central content should start with the active section title unless a specific page design requires otherwise.
- The small top label and `main` accessible name should reflect the active document title, not the broad category.

## Content Blocks

- Use `DocBlock` types from `docsModel.ts` for article content.
- Extend `DocBlock` deliberately when a new repeated content shape is needed.
- Keep block rendering in `DocsArticleLayout` unless a block becomes complex enough to deserve its own component.
- SDK and API reference examples should use the shared `CodeBlock` styling through a `CodeExplorer` component.

## Localization

- Docs UI copy belongs in `src/translations/DocsPageTranslations.ts`.
- Docs article content belongs in files under `src/translations/docs/`.
- All Docs copy must exist for `en`, `es`, `ja`, `de`, and `vi`.
- Do not leave English UI labels visible in non-English locales except for approved technical literals.

## Deferred Work

- Deferred Docs implementation notes belong in `BACKLOG.md`.
- Do not put product backlog items in `CODEX.md`.
