# Calmponent

An open-source React UI library for shadcn/ui and Tailwind CSS. Accessible, animated components with loading, success, error, and empty states built in, on Base UI.

> Status: v0.1.0, forms core. The decisions are in [`docs/decisions/`](docs/decisions/README.md).

## Why

shadcn/ui gives you the parts, but not the finished behavior. Every team rebuilds loading buttons, field errors, empty lists, success confirmations, and transitions. AI agents make this worse because they usually generate only the "happy path". Calmponent gives you components where these states are already done.

Read the full purpose and principles in [`docs/purpose.md`](docs/purpose.md).

## Decisions so far

| Topic | Decision |
|---|---|
| Primitive base | [Base UI](https://base-ui.com) only for v1. See [ADR 0001](docs/decisions/0001-primitive-base.md). |
| License | MIT. See [ADR 0002](docs/decisions/0002-license.md). |
| Code reuse | Components are written from scratch. See [ADR 0003](docs/decisions/0003-code-reuse.md). |
| Distribution | shadcn registry under `@calmponent`, no npm package. See [ADR 0004](docs/decisions/0004-distribution.md). |
| Frameworks | Tested on Next.js and Vite. Requires React 19 and Tailwind CSS 4. See [ADR 0005](docs/decisions/0005-frameworks.md). |
| Releases | Semver, git tags, and a changelog. See [ADR 0006](docs/decisions/0006-releases.md). |
| Design | Monochrome, dark first, Geist, 8px radius, one motion curve. See [ADR 0009](docs/decisions/0009-design-system.md). |
| Docs | Fumadocs (headless) on Next.js. See [ADR 0008](docs/decisions/0008-docs-stack.md). |
| Tools | pnpm workspace, Turborepo, Biome, Vitest, Node.js 24. See [ADR 0007](docs/decisions/0007-repo-tooling.md). |

The full list, with the open decisions, is in the [decision backlog](docs/decisions/README.md).

## Install

Add any component with the shadcn CLI:

```bash
npx shadcn@latest add isthatpratik/calmponent/button
```

Components in v0.1.0: `button`, `field`, `input`, `textarea`, `checkbox`, `radio-group`, `switch`, `select`, `form`, and `toast`, plus `spinner`. Each one has every state built in: loading, success, error, empty, and disabled where they apply.

Pin a release with a tag, for example `isthatpratik/calmponent/button#v0.1.0`. The shorter `@calmponent/...` form comes when the docs site is hosted. See [ADR 0004](docs/decisions/0004-distribution.md).

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md). During planning, the most useful help is a comment on an open decision.

## License

[MIT](LICENSE) © 2026 Pratik Desai
