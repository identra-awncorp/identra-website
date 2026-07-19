# Routing And Locales

This document describes locale-aware routing for the Identra website.

## Source Of Truth

- Public route values live in `APP_VIEWS` in `src/types/routes.ts`.
- Blog detail route values live in `BLOG_DETAIL_IDS` in `src/types/routes.ts`.
- Locale values live in `SUPPORTED_LOCALES` in `src/types/routes.ts`.
- Route conversion helpers live in `src/types/routes.ts`: `pathToView`, `pathToBlogDetailId`, `viewToPath`, `blogDetailPath`, `localizePath`, and `replacePathLocale`.
- Route state, lazy page imports, and navigation handlers live in `src/App.tsx`.
- Language state and browser language detection live in `src/context/LanguageContext.tsx`.

## URL Shape

- Public canonical URLs are locale-prefixed.
- The landing page uses `/{locale}`.
- Standard pages use `/{locale}/{view}`.
- Blog detail pages use `/{locale}/blog-detail/{encodedBlogDetailId}` through `blogDetailPath`.
- The root `/` entry should route users into a locale-aware URL and should not be treated as the canonical public content URL.
- The default locale is `en` unless product requirements change.

## Route Rules

- Add route values only through `APP_VIEWS` and related typed helpers.
- Do not duplicate route unions in components or bypass route typing with `any`.
- Do not hand-build public URLs when a route helper exists.
- `blog-detail` requires a valid `BLOG_DETAIL_IDS` value. Invalid detail IDs should resolve to the not-found experience.
- Unknown route segments should resolve to the not-found experience instead of silently showing unrelated content.
- Keep direct entry, in-app navigation, and browser back/forward behavior aligned.

## Locale Switching

- Language switching should preserve the current route whenever possible.
- Use `localizePath` or `replacePathLocale` instead of string concatenation.
- When a user enters a path without a locale, route them to the best supported locale based on stored or browser language.
- When changing language from an existing localized page, update both runtime language state and URL locale.
- If the current path cannot be localized safely, fall back to the locale landing page.

## Lazy Loading

- Public pages should follow the existing lazy import and code-splitting pattern in `src/App.tsx`.
- Do not statically import page-only components into the main bundle unless the component is part of the shared shell.
- During standard page navigation, keep Header and Footer mounted and show page-level loading only in the content area.
- Standalone pages such as Docs and Login may use their own full-screen loading behavior.

## Build And Preview

- `npm.cmd run build` generates SEO assets, builds the Vite app, then generates localized HTML pages.
- Localized static pages under `dist/{locale}/.../index.html` must reflect the route source of truth.
- Vite preview behavior should continue to serve direct locale-prefixed URLs correctly.

## Verification

For routing, locale URL, or navigation changes, run:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run scan:routing-types
```

Manually test representative direct URLs:

- `/en`
- `/vi/blog`
- `/de/docs`
- `/ja/blog-detail/blog-1`
- an unknown localized path such as `/es/not-a-route`

Also test language switching, rapid navigation, and browser back/forward behavior.
