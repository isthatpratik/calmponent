# Decisions

We make each important decision before we write code. Each decision gets an ADR (architecture decision record) in this folder. Copy [`0000-template.md`](0000-template.md) to start one.

Rules:

- A "proposed" value below is only a starting point. It is not a decision until its ADR status is "accepted" and the user agrees.
- Verify facts with real sources (docs, GitHub, npm data, community posts) before an ADR is accepted. Record the sources in the ADR.
- Do not start code that depends on a decision that is still open.

## Backlog

| # | Decision | Questions to answer | Proposed starting point | Status |
|---|---|---|---|---|
| D1 | License | MIT or MIT-0? What must users keep when they copy code? | Accepted: MIT. See [0002](0002-license.md). | accepted |
| D2 | Primitive base | Radix UI, Base UI, or React Aria? Maintenance, accessibility, shadcn CLI support, migration cost for shadcn users. | Accepted: Base UI only for v1. See [0001](0001-primitive-base.md). | accepted |
| D3 | Distribution | shadcn registry only, or also an npm package? Namespace, registry hosting, support for npm, pnpm, bun, and yarn. | Accepted. See [0004](0004-distribution.md). | accepted |
| D4 | Frameworks | Which frameworks do we support and test? Next.js App Router, Vite, React Router, Astro, TanStack Start. Server Components? | Accepted. See [0005](0005-frameworks.md). | accepted |
| D5 | Releases and versions | Semver for the registry? Git tags, changelog, how users find updates, breaking-change policy. | Accepted. See [0006](0006-releases.md). | accepted |
| D6 | Design system | Colors, themes (light and dark), type, spacing, radius, shadows, motion tokens. How users theme it. | Accepted. See [0009](0009-design-system.md). | accepted |
| D7 | Site structure | Landing page, showcase, blocks, docs, theme tuner, states matrix. Navigation and URLs. | Decide with the `landing-page-design` and `stageshow` skills. | open |
| D8 | Docs stack | Fumadocs, Nextra, or custom on Next.js. Search, MDX, live previews, "Copy for AI". | Accepted: Fumadocs, headless. See [0008](0008-docs-stack.md). | accepted |
| D9 | Quality gates | Accessibility tests, visual regression, bundle size limits, reduced motion checks, browser matrix, CI. | All four gates in CI before v1. | open |
| D10 | AI readiness | `llms.txt`, Claude Code skill, prop JSON schemas, shadcn MCP support, published agent test results. | All of them, with a test that measures agent output. | open |
| D11 | Repo and workflow rules | Monorepo layout, package manager, commit style, branches, approvals. | Accepted. See [0007](0007-repo-tooling.md). | accepted |
| D12 | v1 scope | Which 20 to 25 components and which blocks ship first? | Proposed in [0010](0010-v1-scope.md). | proposed |
| D13 | Code reuse | What do we copy from shadcn/ui or other projects? What notice must we keep? | Accepted: write from scratch, reference only. See [0003](0003-code-reuse.md). | accepted |
| D14 | Hosting and domain | Where does the site run? Which domain? | Free Vercel subdomain first. A domain costs money, so the user decides. | open |

## Accepted

- [Purpose and principles](../purpose.md) (2026-11-12)
- [0001: Primitive base](0001-primitive-base.md), D2 (2026-11-12)
- [0002: License](0002-license.md), D1 (2026-11-12)
- [0003: Code reuse](0003-code-reuse.md), D13 (2026-11-13)
- [0004: Distribution](0004-distribution.md), D3 (2026-11-14)
- [0005: Frameworks](0005-frameworks.md), D4 (2026-11-14)
- [0006: Releases and versions](0006-releases.md), D5 (2026-11-14)
- [0007: Repository layout and tools](0007-repo-tooling.md), D11 (2026-11-14)
- [0008: Docs stack](0008-docs-stack.md), D8 (2026-11-14)
- [0009: Design system](0009-design-system.md), D6 (2026-11-14)
