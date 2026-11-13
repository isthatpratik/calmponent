# 0008: Docs stack

- Status: accepted
- Date: 2026-11-14
- Backlog item: D8

## Context

The docs site shows every component, every state, and the install commands. It also serves the registry at `/r/*.json` (ADR 0004). It must support MDX, search, live previews, and "Copy for AI" (D10). The budget is $0. Principle 4 says Calmponent must have its own look, not a generic docs theme.

## Options

### Fumadocs (`fumadocs-core` 16.19.0, `fumadocs-mdx` 15.x)

- Good: shadcn/ui and Magic UI both build their sites with it.
- Good: very active. The repository was pushed on 2026-11-13 and has 1 open issue.
- Good: headless core. We can use `fumadocs-core` and `fumadocs-mdx` and write our own UI, as Magic UI does. A ready UI (`fumadocs-ui`) also exists, and shadcn/ui uses it.
- Good: built-in search and helpers for `llms.txt` and page text for AI.
- Bad: frequent major versions. We must follow its upgrades.

### Nextra (`nextra` 4.6.1)

- Good: simple, and well known.
- Bad: the last npm release was on 2025-12-04. The repository was last pushed on 2026-07-31 and has 321 open issues.
- Bad: theme-first. A custom look means fighting the theme.

### Custom Next.js site with MDX

- Good: full control.
- Bad: we would rebuild search, the page tree, the table of contents, and AI text export ourselves.

## Decision

Use **Fumadocs, headless**: `fumadocs-core` and `fumadocs-mdx` on Next.js, with our own UI components. Do not use `fumadocs-ui`, so that the site does not look like every other docs site.

## Consequences

- The docs app lives in `apps/www` (ADR 0007) and also serves `/r/*.json`.
- We build the layout, sidebar, and table of contents ourselves. Their visual design waits for D6 and D7. Until then, they use neutral placeholder styling.
- Dependabot groups `fumadocs*` updates, as shadcn/ui does, because the packages must move together.

## Sources

Checked on 2026-11-14:

- `shadcn-ui/ui` `apps/v4/package.json`: `fumadocs-core` 16.10.5, `fumadocs-mdx` 15.0.12, `fumadocs-ui` 16.10.5, `next` 16.4.2.
- `magicuidesign/magicui` `apps/www/package.json`: `fumadocs-core` ^16.19.0, `fumadocs-mdx` ^15.6.0, no `fumadocs-ui`.
- GitHub API: `fuma-nama/fumadocs` 13.6k stars, pushed 2026-11-13, 1 open issue. `shuding/nextra` 14.0k stars, pushed 2026-07-31, 321 open issues.
- `npm view`: `fumadocs-core` 16.19.0 (modified 2026-11-11), `nextra` 4.6.1 (modified 2025-12-04).

Not checked: the docs stack of coss (its `apps/ui/package.json` path did not exist).
