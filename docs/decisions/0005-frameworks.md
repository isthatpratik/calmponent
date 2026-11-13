# 0005: Frameworks

- Status: accepted
- Date: 2026-11-13
- Backlog item: D4

## Context

Calmponent components are React and Tailwind CSS files. The shadcn CLI installs them into many frameworks. We must decide which frameworks we test, and which React and Tailwind versions we require.

## Facts

- shadcn has install guides for Next.js, Vite, TanStack Start, Laravel, React Router, and Astro.
- `@base-ui/react` 1.9.0 marks its files with `'use client'`. It accepts React 17, 18, and 19. Its `date-fns` peers are optional.
- The shadcn docs app uses Next.js 16, React 19, and Tailwind CSS 4.

## Decision

1. **Tested:** Next.js (App Router) and Vite. Each release runs the test suite in both.
2. **Supported, not tested:** every other framework that the shadcn CLI supports. The docs say this clearly.
3. **Minimum versions:** React 19 and Tailwind CSS 4. We do not support React 17 or 18, because each extra version costs test time.
4. **Server Components:** components that need state or effects start with `'use client'`, like Base UI. Pure display parts stay server-safe.

## Consequences

- Users on React 18 cannot use Calmponent. We must say this on the install page.
- We need two small test apps (Next.js and Vite) in the repository (see D11).

## Sources

Checked on 2026-11-13:

- [shadcn: Installation](https://ui.shadcn.com/docs/installation): the framework guides.
- `npm view @base-ui/react peerDependencies peerDependenciesMeta`: React `^17 || ^18 || ^19`; `date-fns` and `@date-fns/tz` optional.
- unpkg `@base-ui/react@1.9.0` files `dialog/root/DialogRoot.mjs` and `button/Button.mjs`: start with `'use client'` (checked by a research agent, not by me directly).
- shadcn-ui/ui `apps/v4/package.json`: Next.js 16, React 19, Tailwind CSS 4.
