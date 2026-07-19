# Scripts And Scanners

This document describes the active repository scripts and scanner expectations.

## Active Commands

- `npm.cmd run build` runs SEO generation, Vite production build, and localized page generation.
- `npm.cmd run generate:seo` generates public SEO assets such as sitemap and robots files.
- `npm.cmd run generate:localized-pages` generates localized HTML entry points under `dist/`.
- `npm.cmd run lint` runs TypeScript checking with `tsc --noEmit`.
- `npm.cmd run scan:localization` checks for likely hard-coded user-visible copy in components.
- `npm.cmd run scan:i18n-architecture` checks for forbidden i18n implementation patterns in components.
- `npm.cmd run scan:component-translation-data` checks component-owned translation data patterns.
- `npm.cmd run scan:routing-types` checks route type safety and route helper usage.
- `npm.cmd run scan:translation-encoding` checks for mojibake and encoding problems.
- `npm.cmd run scan:translation-inheritance` checks translation dictionaries for inheritance and fallback patterns.

## Script Placement

- Reusable maintenance scripts belong in `scripts/`.
- Active scripts should be exposed through a clearly named `package.json` command.
- Do not create one-off fix or audit scripts in the project root.
- Delete temporary scripts after use.
- Archive only historical scripts that are not part of the active toolchain and have real reference value.
- Historical scripts belong in `scripts/archive/` with a short README entry explaining why they are archived.

## Generated Outputs

- Do not hand-edit generated files under `dist/`.
- Do not hand-edit generated SEO outputs when a source script or source data file should be changed instead.
- Regenerate outputs with the relevant `npm.cmd run ...` command.
- Keep generated asset paths and public filenames aligned with SEO and routing docs.

## Scanner Findings

- Treat scanner findings as defects until reviewed.
- Fix findings at the source instead of weakening a scanner.
- If a finding is a valid false positive, document the exact reason in the handoff.
- Do not add broad allowlists for convenience.
- A zero-finding scanner result is not proof that localization is complete. Manually review dynamic arrays, computed properties, state, accessibility attributes, and mock payloads.

## When To Run

- TypeScript or implementation changes: `npm.cmd run lint`.
- Public page, routing, SEO, or generated HTML changes: `npm.cmd run build`.
- Localization or copy changes: all i18n scanners.
- Route source changes: `npm.cmd run scan:routing-types`.
- SEO route or metadata changes: follow `docs/seo-requirements.md`.

## Maintenance

- Keep scanner behavior documented when adding or changing a scanner.
- Prefer precise scanner rules over broad regular expressions that create noisy false positives.
- Keep script names action-oriented and stable because they are referenced by `CODEX.md` and docs in this directory.
- When a script is replaced, update `package.json`, this document, and any relevant area-specific guide in the same change.
