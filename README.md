# Calmponent

Finished components for shadcn/ui. Every state is designed, every motion has a reason, and people and AI agents can use them correctly.

> Status: planning. There is no code yet. We are making the decisions in [`docs/decisions/`](docs/decisions/README.md) first.

## Why

shadcn/ui gives you the parts, but not the finished behavior. Every team rebuilds loading buttons, field errors, empty lists, success confirmations, and transitions. AI agents make this worse because they usually generate only the "happy path". Calmponent gives you components where these states are already done.

Read the full purpose and principles in [`docs/purpose.md`](docs/purpose.md).

## Decisions so far

| Topic | Decision |
|---|---|
| Primitive base | [Base UI](https://base-ui.com) only for v1. See [ADR 0001](docs/decisions/0001-primitive-base.md). |
| License | MIT. See [ADR 0002](docs/decisions/0002-license.md). |
| Code reuse | Components are written from scratch. See [ADR 0003](docs/decisions/0003-code-reuse.md). |

The full list, with the open decisions, is in the [decision backlog](docs/decisions/README.md).

## Planned install

```bash
npx shadcn@latest add @calmponent/button
```

This is a plan, not a working command yet.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md). During planning, the most useful help is a comment on an open decision.

## License

[MIT](LICENSE) © 2026 Pratik Desai
