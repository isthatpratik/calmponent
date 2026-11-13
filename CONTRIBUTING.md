# Contributing to Calmponent

Thank you for your interest. Calmponent is in the **planning** phase. There is no code yet, so the best way to help now is to comment on the open decisions.

## Before you start

1. Read [`docs/purpose.md`](docs/purpose.md). It explains what Calmponent is and what it is not.
2. Read the [decision backlog](docs/decisions/README.md). Do not send code that depends on an open decision.
3. For a large change, open an issue first, so that we can agree on the approach.

## Rules for contributions

- **Write your own code.** Do not paste component code from shadcn/ui or other libraries. You may read them for reference. See [ADR 0003](docs/decisions/0003-code-reuse.md).
- **License.** By contributing, you agree that your work is released under the [MIT License](LICENSE).
- **Every state.** A component is not finished until it has idle, loading, success, error, empty, and disabled states where they apply.
- **Motion with a cause.** Every animation shows a change of state, and every animation respects reduced motion.
- **Accessible by default.** Keyboard, screen reader, focus, and contrast must work.

## Decisions

We record each important decision as an ADR (architecture decision record) in [`docs/decisions/`](docs/decisions/):

1. Copy [`0000-template.md`](docs/decisions/0000-template.md) to a new file with the next number.
2. Fill in the context, the options, and the sources that you checked.
3. Open a pull request with the status "proposed".

## Commits and pull requests

- Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`.
- Keep one topic per pull request.
- Fill in the pull request template.

## Development setup

You need Node.js 24 (see `.nvmrc`) and Corepack, which comes with Node.js.

1. Enable Corepack, so that the pinned pnpm version is used:

   ```bash
   corepack enable
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Check formatting and lint:

   ```bash
   pnpm check
   ```

The layout is described in [ADR 0007](docs/decisions/0007-repo-tooling.md). There are no apps or components yet.

## Branches

`main` is protected. Nobody can push to it directly:

1. Create a branch from `main`, for example `feat/button-loading-state`.
2. Push the branch and open a pull request.
3. Resolve all review comments.
4. Squash-merge the pull request.

## Code of conduct

All contributors must follow the [Code of Conduct](CODE_OF_CONDUCT.md).
