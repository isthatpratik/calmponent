# Changelog

All notable changes to Calmponent are listed here. Versions follow [semver](https://semver.org). See [ADR 0006](docs/decisions/0006-releases.md).

## Unreleased

- Design tokens (ADR 0009): monochrome colors, status colors, Geist, text styles, radius, and the `ease-calm` motion curve. A contrast check runs in CI.

## 0.0.1 (2026-11-14)

The foundation release. There are no UI components yet.

- Project setup: decisions, license, community files, and workspace configuration.
- Docs app (`apps/www`) on Next.js 16 and headless Fumadocs, with placeholder styling.
- First registry item: `utils` (the `cn()` helper). Install with `npx shadcn@latest add isthatpratik/calmponent/utils`.
