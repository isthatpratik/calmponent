# 0003: Code reuse

- Status: accepted
- Date: 2026-11-13
- Backlog item: D13

## Context

Calmponent is MIT (see [0002](0002-license.md)) and builds on Base UI (see [0001](0001-primitive-base.md)). We must decide what code we copy from shadcn/ui or other projects.

## Options

### Copy shadcn/ui components

- Good: faster start.
- Bad: shadcn components do not cover every state, so we would rewrite most of them.
- Bad: the result looks like other shadcn clones.
- Bad: we must keep an MIT notice for the copied code.

### Write from scratch, use shadcn/ui as reference only

- Good: every component meets our "every state, every motion has a reason" rule from the start.
- Good: the code base is fully ours. No notice duty for components.
- Bad: more work at the start.

## Decision

Write all components from scratch on Base UI. Read shadcn/ui and other libraries for reference only. Do not copy their component code.

Exception: small generic helpers (for example `cn()`) may be copied. If we copy any third-party MIT code, we add one line for it in a `NOTICE` file. We show no visible credit on the site.

## Consequences

- No `NOTICE` file is needed until we copy a helper.
- We must stay compatible with the shadcn registry format (see D3), not with shadcn component code.
- Contributors must not paste third-party component code into pull requests. We will state this in `CONTRIBUTING.md` later.

## Sources

- [0001](0001-primitive-base.md) and [0002](0002-license.md): accepted decisions that this ADR depends on.
- No new external research. This is a project choice, not a fact check.
