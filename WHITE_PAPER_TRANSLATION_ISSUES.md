# White Paper Translation Issues

This file tracks deferred work for official white paper translations.

## [P2] Translate Official White Paper v1.0 Into Remaining Locales

**Current state**
- `public/white-paper/Identra-White-Paper-v1.0.md` is the official Vietnamese source for white paper v1.0.
- `src/translations/WhitePaperPageTranslations.ts` uses the official Vietnamese document body for all locales.
- The white paper UI controls remain localized for `en`, `es`, `ja`, `de`, and `vi`.

**Why this should wait**
- The white paper is official product/company material and should not be treated as final in other languages until translated and reviewed.
- The remaining locales need reviewed translations for `en`, `es`, `ja`, and `de` based on the official Vietnamese v1.0 source.
- The translated document body should preserve the current structured page data and renderer, not introduce runtime Markdown loading.

**Suggested follow-up**
- Produce approved translations for the official white paper body in `en`, `es`, `ja`, and `de`.
- Add separate document content per locale in `src/translations/WhitePaperPageTranslations.ts`.
- Keep stable section IDs and block structure aligned across all locales.
- Update white paper SEO metadata if titles or descriptions need to change after review.

**Acceptance criteria**
- `vi` uses the official Vietnamese white paper v1.0 content.
- `en`, `es`, `ja`, and `de` each display reviewed white paper content in the selected language.
- The page keeps the existing HTML/component rendering frame and does not read Markdown at runtime.
- `npm.cmd run scan:localization`, `npm.cmd run scan:component-translation-data`, `npm.cmd run scan:translation-encoding`, `npm.cmd run scan:translation-inheritance`, `npm.cmd run lint`, and `npm.cmd run build` pass.
