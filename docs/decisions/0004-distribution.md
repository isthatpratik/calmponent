# 0004: Distribution

- Status: accepted
- Date: 2026-11-13
- Backlog item: D3

## Context

Users copy Calmponent components into their projects with the shadcn CLI. We must decide how the CLI finds our components, and whether we also publish an npm package.

## Options

### A. Static namespaced registry on our site

- What: `shadcn build` writes one JSON file per item to `public/r/`. The docs site serves the files. Users add `@calmponent` to `components.json`, or we get listed in the shadcn directory so that no config is needed.
- Good: every similar library does this. Magic UI serves `https://magicui.design/r/{name}`, coss (formerly Origin UI) serves `https://coss.com/ui/r/{name}.json`, and Motion Primitives serves `https://motion-primitives.com/c/{name}.json`.
- Good: free. The files are static.
- Bad: the directory listing needs a pull request to shadcn-ui/ui.

### B. GitHub registry

- What: a `registry.json` at the repository root. Users run `npx shadcn@latest add isthatpratik/calmponent/button`, and can pin a git tag with `#v1.0.0`.
- Good: no hosting. Pinned versions for free.
- Bad: long command. Users see the repository path, not the brand.

### C. npm package

- Good: normal `npm install` and semver.
- Bad: it breaks the copy-paste model. None of the libraries we checked ship their components this way.

## Decision

Use **A and B together**. Do not publish an npm package for v1.

1. The main install is the namespace: `npx shadcn@latest add @calmponent/button`.
2. The same `registry.json` at the repository root also makes the GitHub path work, with tag pinning.
3. We ship one `registry:base` item so that `shadcn init` sets up Base UI for our users.
4. We apply to the shadcn directory after the first release. The directory requires an open-source, flat registry with no `content` in `files`.

Install commands in the docs:

```bash
npx shadcn@latest add @calmponent/button
pnpm dlx shadcn@latest add @calmponent/button
bunx --bun shadcn@latest add @calmponent/button
yarn dlx shadcn@latest add @calmponent/button
```

## Consequences

- The docs site (D8) must serve `/r/*.json`. The hosting choice (D14) must allow static files.
- We must keep the npm name `calmponent` reserved in case we need it later. Reserving it is a separate step for the user.

## Sources

Checked on 2026-11-13:

- [shadcn: Namespaces](https://ui.shadcn.com/docs/registry/namespace): `@namespace/item`, the `registries` map in `components.json`.
- [shadcn: Registry index](https://ui.shadcn.com/docs/registry/registry-index): how to get listed, and the requirements.
- [shadcn: GitHub registries](https://ui.shadcn.com/docs/registry/github): `owner/repo/item#ref` (HTTP 200 checked).
- [shadcn: Getting started](https://ui.shadcn.com/docs/registry/getting-started): `shadcn build` writes to `public/r`.
- `https://ui.shadcn.com/r/registries.json`: 565 listed registries.
- shadcn-ui/ui `apps/v4/content/docs/changelog/2026-07-base-ui-default.mdx`: "Ship a `registry:base` config if you want to pin a specific library."
- shadcn-ui/ui `apps/v4/lib/highlight-code.ts`: the npx, pnpm, bun, and yarn command forms.

Not verified: the exact `style` value that pins Base UI (the `getBase()` code was not read).
