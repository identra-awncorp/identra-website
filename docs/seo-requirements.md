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
- Account-only or private pages such as localized login and dashboard routes must be `noindex, nofollow`, excluded from the sitemap, and left crawlable so search engines can read the `noindex` directive.
- Localized 404 pages must be `noindex, nofollow` and must not emit canonical or alternate links.
- An unlisted public resource is not private: absence from navigation does not authorize adding `noindex`. Public resource shortcuts may remain outside the sitemap because they redirect, without blocking search indexing.

## Localized SEO Copy

- All SEO copy must exist for all five locales: `en`, `es`, `ja`, `de`, and `vi`.
- Titles, descriptions, Open Graph image alt text, not-found copy, and blog metadata must be localized naturally.
- Non-English SEO copy must not inherit English text except for approved brand names and technical literals.
- Use `formatSeoTitle` and `formatSeoDescription` from `src/utils/seo.ts` so title and description length limits stay consistent.

## Canonical And Alternate URLs

- Public canonical URLs must be locale-prefixed.
- Use `/{locale}` for the landing page and `/{locale}/{view}` for normal pages.
- Use `blogDetailPath` for blog detail pages.
- The root `/` entry is a neutral, crawlable 200 entry with canonical `/en` content. It may use a tiny client-side script to honor a previously saved language choice, but must not be a server redirect. Explicit locale URLs remain directly accessible and indexable.
- Keep canonical links, `hreflang` alternates for every supported locale, and `x-default` aligned with `SUPPORTED_LOCALES`, `DEFAULT_LOCALE`, `viewToPath`, and `blogDetailPath`.
- Do not hand-build alternate URL lists in components.

## HTML Generation

- `index.html` is the template for generated localized pages.
- Preserve the SEO placeholders and tag shapes expected by `scripts/generate-localized-pages.ts`, including canonical, alternate, robots, Open Graph, Twitter card, and `identra-seo-schema`.
- If a template tag shape changes, update the generator in the same change.
- The production build must generate localized HTML entry points for every public route and locale.
- Public marketing and demo pages must contain their actual route content in `#root` before JavaScript runs. `src/entry-seo.tsx` renders the existing React route tree at build time; do not maintain a separate abbreviated marketing copy for crawlers.
- Build the server renderer with `npm run build:seo-renderer` before `generate:localized-pages`. Rendering errors must fail the build instead of silently publishing an incomplete page. The renderer is build-only; deploy `dist/`, not `dist-ssr/`.
- Preserve the dedicated Blog and White Paper static generators and their user-authored content/metadata.
- Keep public FAQ answers and document sections mounted when collapsed. Closed interactive panels must not expose focusable controls; the no-JavaScript document must still expose their content.
- Docs has one canonical URL per locale. Tab query parameters select the UI but do not create separately indexed sample API documentation.
- The initial HTML must place the CSS-only `data-initial-skeleton` before `data-seo-fallback`. The skeleton covers the SEO fallback from the first browser paint and remains visible until React commits its route-aware loading state.
- Keep the initial skeleton's critical styles inline in `index.html`; it must not depend on the JavaScript bundle or generated application stylesheet becoming available.
- Preserve the `noscript` override that hides the initial skeleton when JavaScript is disabled, so the localized SEO fallback remains usable as a no-script document.

## Social Preview Metadata

- Keep Open Graph and Twitter card metadata in sync: title, description, canonical URL, image URL, image dimensions, and localized image alt text should describe the same page.
- Structured blog articles must use `content.vi.title` and `content.vi.description` verbatim for document, Open Graph, Twitter, and structured-data metadata. Do not add separate rewritten SEO title or description fields.
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
- `public/robots.txt` must allow crawlers to read public and `noindex` HTML, and point to the canonical sitemap URL. Do not block a page in `robots.txt` when its `noindex` directive is the mechanism preventing indexing.

## Verification

For SEO, route metadata, canonical URL, sitemap, robots, social preview, or localized HTML changes, run:

```powershell
npm.cmd run build
npm.cmd run scan:routing-types
```

After deployment, run the production audit:

```powershell
npm.cmd run audit:seo-live
```

The live audit fetches every expected URL in the production sitemap and verifies that it returns `200` without redirecting, remains indexable, exposes exactly one self-referencing canonical URL, and contains crawlable fallback content. It also checks hreflang against supported route locales, document language, titles and descriptions (including duplicates within a locale), JSON-LD, and complete prerendered marketing content with no-JavaScript visibility rules. Unexpected sitemap URLs fail validation and are not fetched. The neutral root entry, account `noindex` pages, 404 behavior, `robots.txt`, Blog feed, and critical SEO assets are checked separately.

Search Console may list the permanent `/` to `/en` redirect as “Page with redirect” and account or 404 URLs as “Excluded by noindex”. Those are expected exclusions. “Redirect error” is not expected and must be investigated for a loop, invalid destination, or excessive chain using the affected URL shown in Search Console.

Then inspect relevant generated files or snippets:

- `dist/{locale}/.../index.html`
- `public/sitemap.xml`
- `public/robots.txt`

Check canonical URL, `hreflang`, robots, Open Graph, Twitter card, JSON-LD, and sitemap correctness.
