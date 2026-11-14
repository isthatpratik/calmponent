# Changelog

All notable changes to Calmponent are listed here. Versions follow [semver](https://semver.org). See [ADR 0006](docs/decisions/0006-releases.md).

## Unreleased

- `toast`: `toast()`, `toast.success`, `toast.error` with actions, `toast.warning`, and `toast.promise` that turns loading into its result in place. Toasts stack, spread out on hover, and swipe away.
- `select`: an empty state inside the list, invalid and disabled states, a list that scales in from its trigger, and a chevron that turns as it opens.
- `checkbox`: the check draws itself, with indeterminate, invalid, and disabled states.
- `radio-group`: the dot grows in and the previous one shrinks out.
- `switch`: a pending state for async saves. On failure, the thumb slides back and a message explains why.
- `textarea`: grows with its content, a character count that turns amber near the limit and red at it, and calm announcements at 50, 20, and 10 characters left.
- `field`: label, description, and error. Errors grow in and out without layout jumps, a check appears for valid filled values, and async validation is supported.
- `input`: invalid, read only, disabled, and a checking state with an inline spinner.
- `spinner`: the dash ring loader as its own item. `button` and `input` use it.
- Design tokens (ADR 0009): monochrome colors, status colors, Geist, text styles, radius, and the `ease-calm` motion curve. A contrast check runs in CI.
- `button`: loading, success, and error states with a stable width, focus kept while loading, and a live region. Install with `npx shadcn@latest add isthatpratik/calmponent/button`.
- `button`: the fill draws in on hover (scale 0.97), the loader is a dash ring that grows and travels, and the pointer cursor is back. Fixed: the status label and press now animate (Tailwind 4 `scale` and `translate` are separate properties).
- Docs: package manager tabs (npm, pnpm, bun, yarn) that remember your choice, copy buttons on code, "Copy page" as clean Markdown, open in ChatGPT or Claude, share on X, breadcrumbs, heading anchors, and "On this page".
- `tokens` and `theme` registry items, generated from the docs site CSS.

## 0.0.1 (2026-11-14)

The foundation release. There are no UI components yet.

- Project setup: decisions, license, community files, and workspace configuration.
- Docs app (`apps/www`) on Next.js 16 and headless Fumadocs, with placeholder styling.
- First registry item: `utils` (the `cn()` helper). Install with `npx shadcn@latest add isthatpratik/calmponent/utils`.
