# Demo And Sandbox Architecture

This document describes the demo scenario pages and the global identity verification sandbox modal.

## Scope

- Demo route behavior starts from the `demo` route in `src/types/routes.ts`.
- The demo list page lives in `src/components/ListDemoPage.tsx`.
- Scenario-specific demo pages live directly in `src/components/demo/`.
- Scenario pages do not live in a nested `src/components/demo/pages/` directory.
- The global sandbox overlay lives in `src/components/IdentityVerificationSandboxModal.tsx`.
- Flow graph behavior lives in `src/components/demo/IdentityFlowGraph.tsx`.
- Summary modal behavior lives in `src/components/demo/DemoSummaryModal.tsx`.

## Translation Layout

- Demo translations must mirror the component structure.
- `src/components/ListDemoPage.tsx` uses `src/translations/ListDemoPageTranslations.ts`.
- `src/components/IdentityVerificationSandboxModal.tsx` uses `src/translations/IdentityVerificationSandboxModalTranslations.ts`.
- `src/components/demo/Foo.tsx` uses `src/translations/demo/FooTranslations.ts`.
- Do not create demo translation helper files, aggregate dictionaries, or scenario-only translation folders that do not map to a component.
- Localized logs, scenario display data, modal text, graph labels, and structured copy belong in the translation file for the component that renders them.

## Scenario Rules

- Each scenario page should be isolated enough to evolve independently.
- Do not add generic scenario runners, shells, or page factories unless the shared abstraction is clearly needed and does not erase scenario-specific behavior.
- Keep only the most common shared UI as separate components, such as `DemoSummaryModal` and `IdentityFlowGraph`.
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

## Naming Rules

- File names must describe the real module role.
- Use `*DemoPage.tsx` for route-level scenario pages.
- Use `*Modal.tsx` for modal overlays, including global modals that can be opened from many pages.
- Do not use broad names that can be confused with scenario pages when the module is actually a global overlay or shared widget.

## Layout Rules

- Keep demo-specific scroll areas contained so scenario panels, logs, modals, and dashboards do not create global scroll jumps.
- Summary modals should use nested flex and overflow containment rather than relying on page-level scroll behavior.
- Terminal-style logs should preserve readable code and protocol literals while localizing human-readable surrounding copy.
- Do not turn demo scenarios or sandbox modals into generic landing pages; they should remain interactive product demonstrations.

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

For route changes, also run:

```powershell
npm.cmd run scan:routing-types
```

Manually test the affected scenarios at representative desktop and mobile widths. Check scenario actions, modal scrolling, graph rendering, language switching, reduced motion behavior, and the browser console.
