# Calmponent: rules for AI agents

This file gives the rules for AI coding agents that work in this repository.

## Project

Calmponent is a shadcn/ui-compatible component library. Every component has every state, every motion has a reason, and people and AI agents can use it correctly. Read [`docs/purpose.md`](docs/purpose.md) before you start.

Current phase: **planning**. The workspace exists (pnpm, Turborepo, Biome), but there are no components yet. The open decisions are in [`docs/decisions/README.md`](docs/decisions/README.md). Do not write code that depends on an open decision.

## How to work

- Do not follow the user blindly. Challenge weak ideas, including your own, and say so plainly.
- Verify claims with real sources (official docs, GitHub, npm data, Reddit, X, blogs). Say what you checked and what you did not check.
- Record each important decision as an ADR in `docs/decisions/`.
- Ask before you download more than about 50 MB, start a long background job, or install tools. The user's network and disk are limited.
- Clean temporary files at the end of a session.

## Design work

- Load the design skills before you choose sections, copy, fonts, spacing, radius, colors, icons, or motion: `landing-page-design` for pages and components, and `stageshow` for any motion, demo, or faux UI.
- Motion rules: every motion has a cause, parts stay mounted and move instead of popping, and loops end where they began.
- The user's taste: full monochrome (black, white, grays) is preferred over a single brand accent. A single accent color on monochrome "still feels AI" to them. Color is for status only. References they like: polar.sh, primora.xyz, unkey.com, dovetail.com, cardcn.dev.
- Avoid the generic "premium dark" gallery look that most component sites use.

## Git and GitHub

- Commit only as the account that owns the repository. The repository-local identity is `Pratik Desai <94686836+isthatpratik@users.noreply.github.com>`. Do not use the work identity (`pratik-desai18`) here. Do not change the global git config.
- Commits, PRs, issues, and docs must read as the user's own work. Do not add `Co-Authored-By` lines, "Generated with" lines, or any AI attribution.
- Do not commit, push, create a GitHub repository, tag, or publish unless the user asks.
- `main` is protected. Work on a branch and open a pull request. Direct pushes to `main` fail.
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).

## Writing

- Use plain, simple English (ASD-STE100-inspired): short sentences, active voice, one idea per sentence, the same term for the same thing.
- Keep code, commands, and quotations exact.
