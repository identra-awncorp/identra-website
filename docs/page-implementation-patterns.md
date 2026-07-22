# Page Implementation Patterns

This document describes the normal path for adding or updating public pages in the Identra website.

## Page Sources

- Page components live in `src/components/`.
- Page translation dictionaries live in the matching mirrored path under `src/translations/`.
- Shared route definitions live in `src/types/routes.ts`.
- SEO metadata and route grouping live in `src/translations/SeoTranslations.ts`.
- Shared shell behavior lives in `src/App.tsx`, Header, Footer, and common layout components.

## Adding A Page

1. Add the page component under `src/components/`.
2. Add a dedicated translation file under the mirrored `src/translations/` path.
3. Add the route value to `APP_VIEWS` in `src/types/routes.ts`.
4. Add or update path handling only through the typed route helpers.
5. Add a lazy import and route mapping in `src/App.tsx`.
6. Add navigation links only where the page should be discoverable.
7. Add localized SEO metadata according to `docs/seo-requirements.md`.
8. Add localized image `alt`, accessibility labels, empty states, and loading text.

## Naming And Ownership

- File names must describe the real role of the module, not just the feature area.
- Use `Page` for route-level pages, `Modal` for modal overlays, and specific nouns for shared components.
- Avoid names that can be confused with nearby pages or scenario implementations.
- The matching translation file should follow the component name exactly: `Foo.tsx` -> `FooTranslations.ts`.
- Keep page-specific copy in the matching page translation file. Do not move it into a broad feature-level dictionary.
- Add abstractions only when the abstraction itself is a real shared component or behavior. Do not introduce shell, runner, or factory files just to force unrelated pages into one flow.

## Updating A Page

- Read the target page, its translation file, nearby page implementations, and relevant shared components before editing.
- Preserve the established visual language of the page unless the request explicitly asks for a redesign.
- Keep the Header and Footer behavior consistent with nearby standard pages.
- Keep component state based on stable IDs and derive localized text at render time.
- Keep domain data separate from display copy.
- Use existing UI primitives, icons, animation patterns, and layout conventions before adding new abstractions.

## Content And Data

- Page-specific copy belongs in the page translation file.
- Repeated structured content may live in the translation file when the structure is mostly display content.
- Non-display rules, IDs, thresholds, and product logic may live with the component or a nearby data module.
- Blog and resource detail pages should use stable content IDs rather than URL text or localized titles as identifiers.
- Do not use real personal data, secrets, production credentials, or real customer records in sample content.

## User Experience

- Build the usable page experience first, not a marketing wrapper, unless the requested page is explicitly a landing page.
- Avoid nested cards, decorative wrappers, and unnecessary visual effects.
- Keep text sizing, weight, spacing, and responsive behavior consistent within the page and with nearby pages.
- Cover loading, empty, error, disabled, selected, and success states when the workflow includes them.
- Ensure mobile and desktop layouts do not clip translated text or overlap controls.

## Verification

For page implementation changes, run:

```powershell
npm.cmd run lint
npm.cmd run build
```

For translation or copy changes, also run:

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

For public page SEO changes, also follow `docs/seo-requirements.md`.
