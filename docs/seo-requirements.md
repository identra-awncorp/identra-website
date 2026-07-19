# SEO Requirements

This document describes the SEO pipeline for the Identra website. Keep `CODEX.md` focused on general coding rules; put SEO-specific operational rules here.

## Source Of Truth

- Route definitions and locale-aware path helpers live in `src/types/routes.ts`.
- SEO route grouping and localized SEO copy live in `src/translations/SeoTranslations.ts`.
- SEO constants and formatting helpers live in `src/utils/seo.ts`.
- SEO asset generation lives in `scripts/generate-seo-assets.ts`.
- Localized HTML generation lives in `scripts/generate-localized-pages.ts`.
- `VITE_SITE_URL` is the public canonical origin for SEO, sitemap, social previews, and generated localized pages.

## Route Metadata

- Every public route must be represented in both the route source of truth and the SEO source of truth.
- When adding, renaming, or removing a route, update `APP_VIEWS` and path helpers in `src/types/routes.ts`, `SEO_ROUTE_GROUPS`, `routeTitles`, and any relevant `descriptionTemplates` in `src/translations/SeoTranslations.ts`.
- Blog detail pages must use `BLOG_DETAIL_IDS`, `BlogDetailId`, and `blogDetailPath` rather than ad hoc URLs.
- Account-only or private pages such as localized login routes must be `noindex, nofollow` and excluded from indexing in generated robots rules.
- Localized 404 pages must be `noindex, nofollow` and must not emit canonical or alternate links.

## Localized SEO Copy

- All SEO copy must exist for all five locales: `en`, `es`, `ja`, `de`, and `vi`.
- Titles, descriptions, Open Graph image alt text, not-found copy, and blog metadata must be localized naturally.
- Non-English SEO copy must not inherit English text except for approved brand names and technical literals.
- Use `formatSeoTitle` and `formatSeoDescription` from `src/utils/seo.ts` so title and description length limits stay consistent.

## Canonical And Alternate URLs

- Public canonical URLs must be locale-prefixed.
- Use `/{locale}` for the landing page and `/{locale}/{view}` for normal pages.
- Use `blogDetailPath` for blog detail pages.
- The root `/` entry is only a non-indexed default-locale shell, not the canonical public content URL.
- Keep canonical links, `hreflang` alternates for every supported locale, and `x-default` aligned with `SUPPORTED_LOCALES`, `DEFAULT_LOCALE`, `viewToPath`, and `blogDetailPath`.
- Do not hand-build alternate URL lists in components.

## HTML Generation

- `index.html` is the template for generated localized pages.
- Preserve the SEO placeholders and tag shapes expected by `scripts/generate-localized-pages.ts`, including canonical, alternate, robots, Open Graph, Twitter card, and `identra-seo-schema`.
- If a template tag shape changes, update the generator in the same change.
- The production build must generate localized HTML entry points for every public route and locale.
- Each generated page should contain a minimal SEO fallback in `#root` so crawlers and social previews see page-specific content before hydration.

## Social Preview Metadata

- Keep Open Graph and Twitter card metadata in sync: title, description, canonical URL, image URL, image dimensions, and localized image alt text should describe the same page.
- Social preview imagery should remain a production-safe 1200x630 asset.
- The source asset is `src/assets/images/identra-og-social-branded.jpg`.
- `npm.cmd run generate:seo` copies the public social image to `public/social/identra-og.jpg`.

## Structured Data

- JSON-LD must stay valid structured data.
- Generated public pages should include `Organization` plus `WebPage`.
- Blog detail pages should use `BlogPosting` with stable published and modified dates from `src/utils/seo.ts`.

## Generated Outputs

- Do not hand-edit generated SEO outputs such as `public/sitemap.xml`, `public/robots.txt`, or localized files under `dist/`.
- Change the source route data, SEO copy, scripts, or assets, then regenerate outputs.
- `public/sitemap.xml` must include localized route entries and `hreflang` alternates.
- `public/robots.txt` must allow public content, disallow private localized login routes, and point to the canonical sitemap URL.

## Verification

For SEO, route metadata, canonical URL, sitemap, robots, social preview, or localized HTML changes, run:

```powershell
npm.cmd run build
npm.cmd run scan:routing-types
```

Then inspect relevant generated files or snippets:

- `dist/{locale}/.../index.html`
- `public/sitemap.xml`
- `public/robots.txt`

Check canonical URL, `hreflang`, robots, Open Graph, Twitter card, JSON-LD, and sitemap correctness.
