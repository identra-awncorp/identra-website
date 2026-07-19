# Demo Sandbox Architecture

This document describes the interactive demo sandbox and scenario-specific demo pages.

## Scope

- Demo route behavior starts from the `demo` route in `src/types/routes.ts`.
- Demo page composition lives in `src/components/DemoPage.tsx`.
- Scenario components live in `src/components/demo/`.
- Demo copy and scenario data live in `src/translations/Demo*` files and `src/translations/demoLocalization.ts`.
- Flow graph behavior lives in `src/components/demo/IdentityFlowGraph.tsx`.
- Summary modal behavior lives in `src/components/demo/DemoSummaryModal.tsx`.
- Global trends dashboard behavior lives in `src/components/demo/DemoGlobalTrendsDashboard.tsx`.

## Scenario Rules

- Keep scenario IDs, step IDs, status IDs, and graph node IDs stable.
- Translate labels, descriptions, log messages, and accessible names at render time.
- Do not store translated strings in long-lived state. Store stable keys and derive display text from the active locale.
- Use clearly fictional people, companies, transactions, documents, and risk signals.
- Do not include real personal data, secrets, credentials, access tokens, or production identifiers.
- Preserve keyboard access and visible focus states for scenario actions.

## Flow And State

- Demo steps should be deterministic enough for repeatable QA.
- Status changes should use stable status keys rather than localized strings.
- Timers, animations, and simulated processing should clean up on unmount.
- When the language changes, visible labels and logs should update without replaying unsafe side effects.
- Graph node and edge semantics should remain stable across locales.

## Layout Rules

- Keep demo-specific scroll areas contained so scenario panels, logs, modals, and dashboards do not create global scroll jumps.
- Summary modals should use nested flex and overflow containment rather than relying on page-level scroll behavior.
- Terminal-style logs should preserve readable code and protocol literals while localizing human-readable surrounding copy.
- Do not turn the demo sandbox into a generic landing page; it should remain an interactive product demonstration.

## Localization

- Demo UI copy belongs in the relevant `Demo*Translations.ts` file.
- Shared demo localization helpers belong in `src/translations/demoLocalization.ts`.
- All demo copy must exist for `en`, `es`, `ja`, `de`, and `vi`.
- Non-English demo pages should not leak English labels except for approved technical literals.

## Verification

For demo changes, run:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run scan:localization
npm.cmd run scan:i18n-architecture
npm.cmd run scan:component-translation-data
npm.cmd run scan:translation-encoding
npm.cmd run scan:translation-inheritance
```

Manually test the affected scenarios at representative desktop and mobile widths. Check scenario actions, modal scrolling, graph rendering, language switching, reduced motion behavior, and the browser console.
