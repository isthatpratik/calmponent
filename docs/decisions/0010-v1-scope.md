# 0010: v1 scope

- Status: accepted
- Date: 2026-11-14
- Backlog item: D12

## Context

Calmponent's promise is finished states (purpose principle 1). v1 must prove that promise on the components that teams rebuild most often. It must also keep the shadcn/ui names (principle 3), so a team can swap one component at a time.

Facts checked on 2026-11-14:

- `@base-ui/react` 1.9.0 exports 37 primitives, including `button`, `field`, `form`, `input`, `select`, `combobox`, `checkbox`, `radio-group`, `switch`, `toast`, `dialog`, `alert-dialog`, `popover`, `tooltip`, `menu`, `tabs`, `avatar`, and `progress`. It has no textarea, table, skeleton, or badge primitive.
- The shadcn/ui registry lists 65 `registry:ui` items.

## Selection rules

1. **State-rich first.** A component is in v1 if it has at least three states beyond idle that teams usually forget (loading, success, error, empty, or disabled).
2. **shadcn name.** Every v1 component has the same name as a shadcn/ui component.
3. **Base UI where it exists.** Plain HTML only where Base UI has no primitive.
4. **Prefer fewer, finished components.** 24 finished components beat 60 half-finished ones.

## Decision

24 components, shipped in three releases.

### v0.1.0: Forms core (10)

| Component | Base UI | States beyond idle |
|---|---|---|
| `button` | `button` | hover, active, focus, disabled, loading, success, error |
| `field` | `field` | description, invalid with message, valid, disabled, required |
| `input` | `input` | focus, invalid, disabled, read only, loading (async check) |
| `textarea` | `field` (plain textarea) | focus, invalid, disabled, character count, near limit |
| `checkbox` | `checkbox` | checked, indeterminate, invalid, disabled |
| `radio-group` | `radio-group` | selected, invalid, disabled item |
| `switch` | `switch` | on, pending (async), failed (reverts with message), disabled |
| `select` | `select` | open, selected, empty list, invalid, disabled |
| `form` | `form` | submitting, server error, field errors, success |
| `toast` | `toast` | success, error with retry, loading to result, stacked |

### v0.2.0: Overlays and menus (7)

| Component | Base UI | States beyond idle |
|---|---|---|
| `combobox` | `combobox` | searching, no results, async loading, load error |
| `dialog` | `dialog` | open, close with unsaved changes |
| `alert-dialog` | `alert-dialog` | confirming (async), action failed |
| `popover` | `popover` | open, anchored, closes on outside press |
| `tooltip` | `tooltip` | delay, instant for groups, disabled trigger |
| `dropdown-menu` | `menu` | open, item disabled, item pending, destructive item |
| `tabs` | `tabs` | active, disabled tab, panel loading |

### v0.3.0: Feedback and data (7)

| Component | Base UI | States beyond idle |
|---|---|---|
| `alert` | none | info, success, warning, destructive, dismissible |
| `progress` | `progress` | indeterminate, determinate, complete, failed |
| `skeleton` | none | shaped to the real layout, reduced motion |
| `empty` | none | first use, no results, error with retry |
| `badge` | none | neutral, success, warning, destructive |
| `avatar` | `avatar` | loading, image failed with fallback |
| `table` | none | loading (skeleton rows), empty, error with retry, sorted |

### v1.0.0

All 24 components pass the quality gates (D9), and the docs show every state of every component. Three blocks prove the components work together: a sign-in form, a settings form, and a data table with loading, empty, and error states.

## Definition of done for each component

1. Every state in its table is built and styled with the ADR 0009 tokens.
2. Every motion has a cause, uses `ease-calm`, and becomes a fade with reduced motion.
3. Keyboard, screen reader, and focus work.
4. Tests cover each state.
5. A docs page shows a states matrix: every state side by side.
6. A registry item installs it with `shadcn add`.

## Not in v1

Card, accordion, sheet, drawer, command, calendar, chart, sidebar, carousel, input-otp, slider, and the rest of the shadcn list. They have fewer forgotten states, or they are large enough to need their own milestone. We add them after v1 if users ask.

## Consequences

- We create one GitHub milestone per release, with one issue per component.
- `button` comes first, because the other components use it.
- Phosphor icons are added with the first component that needs an icon.

## Sources

- `https://unpkg.com/@base-ui/react@1.9.0/package.json`: the `exports` list.
- `https://ui.shadcn.com/r/index.json`: 65 `registry:ui` items.
- [docs/purpose.md](../purpose.md): principles 1 and 3.
