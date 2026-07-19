# CODEX.md

This file is the working guide for coding agents contributing to the Identra website. Its purpose is to keep implementation consistent, prevent regressions in localization, branding, routing, and loading behavior, and require proportionate verification before work is handed back.

## Project overview

- Primary stack: React 19, TypeScript, Vite, Tailwind CSS, `motion`, `lucide-react`, and React Router.
- Application source lives in `src/`.
- UI components and pages live in `src/components/`.
- Translation dictionaries live in `src/translations/`.
- Shared route definitions live in `src/types/routes.ts`.
- Localization uses `useLanguage` from `src/context/LanguageContext.tsx` and the guards in `src/utils/i18nRuntime.ts`.
- Area-specific implementation guides live in `docs/`.
- The supported locales are exactly `en`, `es`, `ja`, `de`, and `vi` unless the product requirements change.
- The current brand is Identra. Do not reintroduce Persona branding, `withpersona`, or `persona_*` assets.

## Working principles

- Read the affected component, its translation file, shared types, and nearby patterns before editing.
- Keep changes narrowly scoped to the request. Do not perform unrelated refactors or redesigns.
- Preserve user-authored changes and work with the current tree. Never revert unrelated work.
- Prefer an existing local pattern or helper over a new abstraction unless the abstraction removes real repeated complexity.
- Preserve existing license and SPDX headers in files that already have them.
- Do not edit generated or dependency directories such as `node_modules/`, `dist/`, `build/`, or `coverage/`.
- Do not commit secrets, access tokens, production identifiers, or real personal data. Use clearly fictional test data in demos.

## Localization requirements

- Every user-visible static string in a component must come from localization. This includes headings, body copy, links, buttons, form labels, placeholders, validation messages, tooltips, modal copy, toasts, table labels, empty states, loading text, image `alt` text, `aria-label`, and screen-reader-only text.
- Put UI copy in a dedicated `src/translations/*Translations.ts` file. Do not place translation dictionaries, multilingual mock articles, or locale-specific labels inside component logic.
- Components should select the active dictionary with `useLanguage` and `getLocalizedRecord`. Use `getLocalizedValue` when a dynamic key needs a runtime missing-value guard.
- Add all five locales in the same change. A locale dictionary must be fully materialized; do not build it as a partial override of another language.
- Vietnamese copy must use correct diacritics and natural phrasing. Non-English locales should not retain English except for approved brand names, API or SDK names, standards, code literals, and genuinely necessary technical terms.
- Use stable semantic keys. Do not use an English sentence as a key and do not hide copy behind `staticText("...")`.
- Keep interpolation variables and their meaning consistent across all locales. Prefer a complete translated sentence with placeholders over concatenating translated fragments.
- Use `Intl.DateTimeFormat`, `Intl.NumberFormat`, or equivalent locale-aware APIs for user-facing dates, numbers, currencies, and percentages.
- Keep protocol fields, JSON keys, identifiers, command names, and executable code unchanged when localization would make the example invalid. Localize the human-readable labels around them.

## Translation type safety

- Give every locale the same statically checked shape. For flat dictionaries, a suitable pattern is `satisfies Record<keyof typeof en, string>` for each non-English dictionary. For nested data, define an explicit shared interface or shape.
- Export the final five-locale collection as an immutable value where practical, for example with `as const` and a checked locale record.
- Do not use `any`, broad unchecked casts, or `Record<string, string>` to silence missing or extra translation keys when the key set is finite.
- Do not mutate translation dictionaries after declaration. Avoid `Object.assign`, locale-filling loops, post-declaration property assignment, and `.push()` calls that construct localized copy at module load time.
- Legacy translation files may still contain mutation or `as any`. Treat those as debt to remove when the file is in scope, not as patterns to copy.

## Forbidden i18n patterns

- No spread inheritance such as `...en`, `...es`, or a shared object containing English UI literals for non-English locales.
- No runtime fallback to English for a missing locale or key. Missing translations must be visible through type checking, scanners, or the development-mode guard in `i18nRuntime.ts`.
- No `isVi ? data.labelVi : data.labelEn`, `labelEn`/`labelVi` fields, or language-specific condition chains in components.
- No translated strings in long-lived state. Store a stable key, status, or ID and derive the current text during render.
- If state is necessarily derived from localized data, recompute or reset it when `language` changes.
- No copying a translated string into logs, timers, queued events, or cached objects that can survive a language switch. Store structured data and translate at display time.
- Do not suppress a scanner result with an allowlist unless it is demonstrably non-copy, such as a proper noun, technical standard, code sample, or protocol value.

## Branding and assets

- Use `Identra`, `identra`, or `IDENTRA` according to the grammatical casing required by the surrounding text.
- The canonical logo is `src/assets/images/identra-logo.svg`.
- Reuse the canonical logo asset instead of drawing a demo logo with component SVG or CSS shapes.
- Do not add filenames, URLs, storage keys, labels, email domains, or metadata containing the old Persona brand.
- When replacing an asset, search both filenames and source references. Verify that the asset loads in the built application.
- Provide meaningful localized `alt` text for informative images. Use an empty `alt` value for purely decorative images.

## Components and visual behavior

- Preserve the established visual language of the page being changed, including borders, colors, spacing, cards, shadows, responsive behavior, and interaction states.
- Do not turn an operational or product page into a demo-style landing page unless the request explicitly calls for a redesign.
- Avoid nested cards, unnecessary decorative blobs, and excessive visual wrappers.
- Use icons from `lucide-react` when an appropriate icon exists. Icon-only controls need a localized accessible name and a tooltip when their meaning is not obvious.
- Keep controls keyboard-accessible, maintain visible focus states, and use semantic HTML before adding ARIA.
- Cover loading, empty, error, disabled, selected, and success states when they are part of the workflow.
- Ensure text fits its container at mobile and desktop widths. Do not introduce overlapping controls, clipped localized text, or layout shifts caused by dynamic content.
- Respect `prefers-reduced-motion` for nonessential animation. Clean up timers, listeners, observers, and animation contexts on unmount.
- Add comments only when they clarify genuinely complex logic. Do not narrate self-explanatory code.

## Routing, loading, and bundle size

- `src/types/routes.ts` is the source of truth for `AppView`, path conversion, and valid route values. Do not duplicate route unions or bypass them with `any`.
- Add new pages with lazy imports and code splitting following the current `App.tsx` pattern. Avoid static imports that pull page-only code into the main bundle.
- Keep route state and the URL synchronized for direct navigation and browser back/forward behavior.
- During navigation between pages that share the standard shell, keep the Header and Footer mounted and show the page skeleton only in the content area.
- Use a full-screen skeleton only on the initial application load or for standalone pages such as Docs and Login that do not share the standard top navigation.
- Do not render the previous page again between the skeleton and the destination page.
- When changing route transitions, verify direct entry, in-app navigation, repeated rapid clicks, and browser back/forward behavior.

## Area-specific guides

- For localization dictionaries, runtime language handling, translation quality, and i18n scanners, follow `docs/i18n-architecture.md`.
- For locale-prefixed URLs, route helpers, language switching, and direct-entry behavior, follow `docs/routing-and-locales.md`.
- For adding or updating public pages and reusable page patterns, follow `docs/page-implementation-patterns.md`.
- For SEO metadata, canonical URLs, sitemap, robots, social previews, localized HTML, and structured data, follow `docs/seo-requirements.md`.
- For the standalone Docs experience, including file naming, tab behavior, menus, article layout, and docs-specific content blocks, follow `docs/docs-page-architecture.md`.
- For the interactive demo sandbox, scenario pages, flow graph, and summary modal, follow `docs/demo-sandbox-architecture.md`.
- For repository scripts, scanners, generated assets, and script hygiene, follow `docs/scripts-and-scanners.md`.

## Code and data quality

- Keep component props, state, route values, tabs, filters, and translation data explicitly typed. Use narrow unions and type guards instead of `as any`.
- Separate domain data from display copy. IDs, thresholds, statuses, and rules can live with logic; their human-readable labels belong in translations.
- Do not mutate imported constants or shared module data at runtime.
- Use structured parsing and serialization for JSON or other structured formats instead of ad hoc string manipulation.
- Do not store sensitive identity, document, contact, or risk data in browser storage unless the product explicitly requires it and the security model has been approved.
- Avoid logging personal data or secrets to the browser console. Development diagnostics should identify the failing key or scope, not expose user data.
- Keep files UTF-8 encoded. Fix mojibake at the source; do not compensate by embedding corrupted replacement text.

## Scripts and repository hygiene

- Do not create one-off fix or audit scripts in the project root.
- Put reusable scanners and maintenance scripts in `scripts/` and expose them through a clearly named `package.json` command.
- Delete truly temporary scripts after use. Archive a script only when it has historical value and is not part of the active toolchain.
- Do not hand-edit build output. Regenerate it with the project command when needed.
- Put deferred implementation notes in `BACKLOG.md`. Do not mix product backlog items into this agent working guide.
- Avoid dependency additions for behavior already covered by the platform or existing dependencies. If a dependency is necessary, explain its purpose and keep the lockfile consistent.

## Required verification

Run checks in proportion to the files changed. For TypeScript or UI implementation changes, run:

```powershell
npm.cmd run lint
npm.cmd run build
```

For localization or UI-copy changes, also run:

```powershell
npm.cmd run scan:localization
npm.cmd run scan:i18n-architecture
npm.cmd run scan:component-translation-data
npm.cmd run scan:translation-encoding
npm.cmd run scan:translation-inheritance
```

For routing changes, also run:

```powershell
npm.cmd run scan:routing-types
```

For area-specific work such as SEO or the standalone Docs experience, also follow the verification notes in the relevant `docs/` guide.

For brand or logo changes, also search the source tree and tracked project files:

```powershell
rg -n --hidden --glob '!node_modules/**' --glob '!dist/**' --glob '!build/**' --glob '!coverage/**' --glob '!.git/**' "(?i)\bpersona\b|withpersona|persona_|persona-logo" .
```

- A scanner reporting zero findings is necessary but not proof of complete localization. Manually review dynamic arrays, computed properties, mock payloads, accessibility attributes, and text stored in state.
- Treat scanner findings as defects until reviewed. If a finding is a valid false positive, document the exact reason in the handoff rather than weakening the scanner broadly.
- For visual or navigation changes, test at representative mobile and desktop widths and inspect the browser console for runtime errors and missing-translation diagnostics.
- If a required command cannot be run, state that clearly in the final handoff with the reason and remaining risk.

## Completion checklist

- No new user-visible static copy remains in component logic.
- Every new or changed translation key exists in all five locales with appropriate language quality.
- No English inheritance, runtime English fallback, dictionary mutation, mojibake, or untranslated Vietnamese copy was introduced.
- No translated string is retained across a language change through state, caches, timers, or logs.
- No old Persona branding or demo logo remains in the changed scope.
- Route typing and lazy-loading behavior remain intact when routes are affected.
- Area-specific guide requirements are satisfied when SEO, Docs, or another documented subsystem is affected.
- Accessibility labels and non-happy-path UI states are covered.
- Relevant scanners, TypeScript checking, and the production build pass.
- The final handoff names any legitimate false positives, checks not run, and residual risks.

## When uncertain

- Inspect the existing implementation and its nearest well-maintained neighbor before choosing a pattern.
- Fix scanner findings at their source instead of masking them.
- Distinguish product copy from technical literals deliberately; do not assume English-looking text is automatically exempt from localization.
- Ask for clarification only when the available choices would materially change product behavior, content meaning, security, or visual direction.
