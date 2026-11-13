# 0001: Primitive base

- Status: accepted
- Date: 2026-11-12
- Backlog item: D2

## Context

Calmponent is a shadcn/ui-compatible library. Each component needs a headless primitive layer for focus, keyboard, and ARIA behavior. We must choose that layer before we write any component.

Limits: the project has a $0 budget, so we want a layer that is free, MIT-compatible, and actively maintained. Users of shadcn/ui must be able to adopt our components without a large migration.

## Options

### Radix UI (`radix-ui` 1.8.1, MIT)

- Good: mature, and the long-time shadcn/ui default. Most existing shadcn projects use it.
- Good: shadcn/ui says Radix is "not deprecated" and that every shadcn update ships for both Radix and Base UI.
- Bad: several third-party blogs report slower maintenance. We did not verify this on the Radix repository.
- Bad: shadcn/ui no longer makes it the default for new projects (since July 2026).

### Base UI (`@base-ui/react` 1.9.0, MIT)

- Good: the default for new shadcn/ui projects since July 2026. `npx shadcn init` picks it unless the user passes `-b radix`.
- Good: built by the former Radix, Floating UI, and MUI authors, with a team that works on it full time (per secondary sources).
- Good: the API is close to Radix, so a migration is small (InfoQ reports this).
- Bad: younger than Radix. Fewer community examples.
- Bad: React only.

### React Aria Components (`react-aria-components` 1.22.1, Apache-2.0)

- Good: the strongest accessibility and internationalization (34 locale bundles, 13 calendar systems, per secondary sources).
- Good: shadcn/ui added a React Aria base in 2026.
- Bad: a different API from Radix and Base UI, and more verbose.
- Bad: Apache-2.0, not MIT. This adds a notice duty (see D1 and D13).
- Bad: a larger switch for shadcn users.

### Support more than one

- Good: the shadcn registry can pin a base with `registry:base`.
- Bad: we would build and test every component two or three times. This is too much work for v1.

## Decision

Build on **Base UI only** for v1. Do not support Radix or React Aria in v1.

Reasons:

1. Base UI is the shadcn/ui default, so new users get it with no extra flags.
2. It is MIT, like our proposed license.
3. One base keeps the "every component has every state" promise testable.

## Consequences

- Users who stay on Radix cannot use our components without adding Base UI. We must say this clearly in the docs.
- We depend on Base UI releases. We must pin a version range and test on each release.
- We can add a Radix or React Aria build later, if users ask for it.
- Next: confirm this choice with the user, then do D1 (license).

## Sources

Checked on 2026-11-12:

- [shadcn/ui changelog](https://ui.shadcn.com/docs/changelog): July 2026 "Base UI as the Default"; August and October 2026 entries list Base UI, React Aria, and Radix.
- [shadcn/ui: Base UI as the Default](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default): default base, Radix not deprecated, `-b radix` flag, `registry:base`. (Fetched through a summarizer, not read in full.)
- `npm view` for `@base-ui/react`, `radix-ui`, and `react-aria-components`: versions and licenses above.
- [InfoQ: Base UI v1](https://www.infoq.com/news/2026/02/baseui-v1-accessible): easy migration from Radix.

GitHub API, checked 2026-11-12 (commits since 2026-08-12, last three months):

- `mui/base-ui`: 456 commits, last push 2026-11-12, monthly releases (v1.7.0 on 2026-08-04, v1.8.0 on 2026-09-04, v1.9.0 on 2026-10-09), 443 open issues, not archived.
- `radix-ui/primitives`: 69 commits, last push 2026-10-14, 289 open issues, not archived. Radix is alive but about 6 times less active than Base UI.

Not checked: React Aria repository activity. The React Aria locale counts come from third-party blogs only.

## Reversibility

The registry can pin a base with `registry:base`. If users ask for Radix after v1, we add a second build. Users on Base UI do not change anything.
