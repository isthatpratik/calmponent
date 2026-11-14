# Changelog

All notable changes to Calmponent are listed here. Versions follow [semver](https://semver.org). See [ADR 0006](docs/decisions/0006-releases.md).

## Unreleased

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
