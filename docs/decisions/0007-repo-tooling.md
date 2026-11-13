# 0007: Repository layout and tools

- Status: proposed
- Date: 2026-11-13
- Backlog item: D11

## Context

We need a repository layout and a tool set before the first line of code. The user has limited disk and network, so fewer tools are better.

## What similar projects use

| | shadcn/ui | Magic UI | coss (formerly Origin UI) | Motion Primitives |
|---|---|---|---|---|
| Package manager | pnpm workspace | pnpm workspace | bun | npm |
| Turborepo | yes | yes | yes | no |
| Lint and format | ESLint + Prettier | ESLint + Prettier | Biome | ESLint + Prettier |
| Tests | Vitest | none found | bun test | none |

## Decision (proposed, not final)

1. **pnpm workspace** (pnpm 12, pinned with the `packageManager` field). It saves disk space, which matters for the user.
2. **Turborepo** for task caching across the workspace.
3. **Layout:**

   ```text
   apps/www/          docs site, also serves the registry at /r
   apps/test-next/    Next.js test app (D4)
   apps/test-vite/    Vite test app (D4)
   registry/          component source files
   registry.json      registry index (D3)
   docs/              decisions and purpose
   ```

4. **Node.js 24 LTS** in `.nvmrc`. Node 26 is the newest LTS line, but we did not check hosting support for it.
5. **Biome** for lint and format. One tool instead of two. Risk: its Tailwind class sorting may be weaker than `prettier-plugin-tailwindcss`. We did not measure this.
6. **Vitest** for unit tests. The other quality gates are D9.
7. **Supply-chain guard:** set `minimumReleaseAge: 2880` in `pnpm-workspace.yaml`, like shadcn/ui. pnpm then skips package versions younger than 2 days.
8. **Branches:** `main` is protected. Work happens in short branches and pull requests. Commits use Conventional Commits.

## Consequences

- `CONTRIBUTING.md` gets a real setup section after this ADR is accepted.
- Dependabot can be added once `package.json` exists.

## Sources

Checked on 2026-11-13:

- Root files of shadcn-ui/ui, magicuidesign/magicui, cosscom/coss, ibelick/motion-primitives via `gh api repos/<repo>/contents` (checked by a research agent).
- shadcn-ui/ui `pnpm-workspace.yaml`: `minimumReleaseAge: 2880`.
- `npm view pnpm version`: 12.18.0. `npm view turbo version`: 2.11.11. `npm view @biomejs/biome version`: 2.6.7.
- [Node.js release index](https://nodejs.org/dist/index.json): v26 "Lithium", v24 "Krypton", and v22 "Jod" are LTS.
