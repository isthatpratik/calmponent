# 0006: Releases and versions

- Status: proposed
- Date: 2026-11-13
- Backlog item: D5

## Context

Users copy files, so they do not get updates automatically. We must decide how users find updates and how we mark breaking changes.

## Facts

- The shadcn registry item schema has no `version` field.
- Users can pin a GitHub registry item to a git tag (`#v1.0.0`) or a commit.
- shadcn uses Changesets for its npm packages only.
- Magic UI, coss, and Motion Primitives have no GitHub releases and no git tags.

## Decision (proposed, not final)

1. **Semver for the whole library.** One version number, for example `v0.3.0`. Before v1, minor versions may break.
2. **Git tag and GitHub release** for each version. The tag makes the GitHub registry pin work.
3. **Changelog page** on the docs site, and a `CHANGELOG.md` in the repository. Each entry lists the changed components.
4. **Breaking changes** get a migration note with before and after code.
5. **Changesets** only if we publish an npm package later (D3 says no npm package for v1).

## Consequences

- We do better than the similar libraries, which have no tags or releases. This is a small trust advantage.
- We must write a changelog entry for every release. A pull request checklist item will remind us.

## Sources

Checked on 2026-11-13:

- shadcn-ui/ui `packages/registry/src/registry/schema.ts`: no `version` field on items.
- [shadcn: GitHub registries](https://ui.shadcn.com/docs/registry/github): `#ref` pinning.
- shadcn-ui/ui `RELEASING.md`: Changesets for npm packages.
- `gh api repos/<owner>/<repo>/releases` and `/tags` for magicuidesign/magicui, cosscom/coss, ibelick/motion-primitives: none (checked by a research agent).

Not verified: how coss announces breaking changes (its changelog page was not read).
