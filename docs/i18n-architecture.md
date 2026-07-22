# I18n Architecture

This document describes how localization is organized across the Identra website. Keep `CODEX.md` focused on general rules; put localization-specific implementation detail here.

## Source Of Truth

- Supported locales live in `SUPPORTED_LOCALES` in `src/types/routes.ts`.
- The default locale lives in `DEFAULT_LOCALE` in `src/types/routes.ts`.
- Runtime language state comes from `useLanguage` in `src/context/LanguageContext.tsx`.
- Runtime dictionary guards live in `src/utils/i18nRuntime.ts`.
- User-visible UI copy lives in `src/translations/*Translations.ts`.
- Docs article content lives in `src/translations/docs/`.

## Translation File Layout

- `src/translations/` must mirror `src/components/`.
- A component at `src/components/Foo.tsx` must use `src/translations/FooTranslations.ts`.
- A component at `src/components/demo/Foo.tsx` must use `src/translations/demo/FooTranslations.ts`.
- Create a translation subdirectory only when the matching component subdirectory exists.
- Do not create translation directories that do not mirror component directories, such as scenario-only or data-only folders.
- Do not create helper files inside `src/translations/` that do not map to a component. Shared runtime guards belong in `src/utils/i18nRuntime.ts`; tiny formatting helpers should stay inside the owning component or translation module.
- Do not create aggregate dictionaries named by technical concern or domain grouping when no matching component exists, such as `DemoComponentTranslations`, `DemoFlowLogTranslations`, or `DemoFlowUiTranslations`.
- A translation file may include all user-visible copy owned by its matching component, including labels, logs, modal copy, scenario display data, and localized structured content.

## Dictionary Rules

- Every user-visible static string must come from a translation file.
- Add or update all five locales in the same change: `en`, `es`, `ja`, `de`, and `vi`.
- Do not use English inheritance, partial locale overrides, runtime English fallback, or post-declaration dictionary mutation.
- Keep translation keys semantic and stable. Do not use an English sentence as the key.
- Use one checked shape for every locale. Prefer explicit interfaces for nested data and `satisfies` for finite flat dictionaries.
- Keep dictionaries immutable where practical with `as const` and checked locale records.

## Component Rules

- Components should call `useLanguage`, then select data with `getLocalizedRecord`.
- Use `getLocalizedValue` only when a dynamic key needs a runtime missing-value guard.
- Store stable IDs, statuses, and keys in state. Derive translated text during render.
- If state is derived from localized data, recompute or reset it when `language` changes.
- Do not cache translated strings in timers, logs, queues, long-lived objects, or module-level variables.
- Keep translation dictionaries out of component logic. Component files should not own multilingual copy arrays.

## Translation Quality

- Vietnamese copy must sound natural, use correct diacritics, and avoid word-by-word phrasing.
- Non-English locales should not retain English unless the text is a brand name, SDK/API name, protocol field, code literal, standard, or necessary technical term.
- Do not translate JSON keys, command names, identifiers, SDK method names, API paths, or executable examples when translation would make them invalid.
- Use complete translated sentences with placeholders rather than concatenating translated fragments.
- Use `Intl.DateTimeFormat`, `Intl.NumberFormat`, or equivalent locale-aware APIs for user-facing dates, numbers, currencies, and percentages.
- Keep files UTF-8 encoded and fix mojibake at the source.

## Accessibility Copy

- `aria-label`, `title`, tooltips, screen-reader-only text, image `alt`, empty states, loading states, and validation messages are localization scope.
- The accessible name should describe the active page, tab, or action, not an implementation detail or copied heading from another section.
- Icon-only controls need localized accessible names.

## Verification

For localization, UI copy, accessibility label, or translation data changes, run:

```powershell
npm.cmd run lint
npm.cmd run scan:localization
npm.cmd run scan:i18n-architecture
npm.cmd run scan:component-translation-data
npm.cmd run scan:translation-encoding
npm.cmd run scan:translation-inheritance
```

When changing route-aware language behavior, also run:

```powershell
npm.cmd run scan:routing-types
```
