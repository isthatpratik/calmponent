# Calmponent design system

The rules every Calmponent component and page follows. The full reasoning is in [ADR 0009](docs/decisions/0009-design-system.md) and [ADR 0011](docs/decisions/0011-site-structure.md). The tokens live in [`apps/www/app/globals.css`](apps/www/app/globals.css).

## Principles

1. **Every state, built in.** Idle, hover, focus, active, disabled, loading, success, error, and empty, wherever they apply.
2. **Motion with a cause.** Something changed, so something moves, then it rests. Parts stay mounted and move instead of popping. Loops end where they began.
3. **Monochrome.** Black, white, and pure neutral grays. Color only for status.
4. **Accessible by default.** Keyboard, visible focus, screen reader announcements, and WCAG 2.2 AA contrast.
5. **Same names as shadcn/ui.** Components read the shadcn CSS variables.

## Color

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#ffffff` | `#000000` | Page |
| `--card` | `#ffffff` | `#181818` | Panels, cards |
| `--muted` | `#f5f5f5` | `#1f1f1f` | Quiet surfaces |
| `--foreground` | `#0a0a0a` | `#fafafa` | Text |
| `--muted-foreground` | `#666666` | `#a3a3a3` | Secondary text |
| `--border` | `#e5e5e5` | `#272727` | Decorative lines |
| `--input` | `#858585` | `#6b6b6b` | Control borders (3:1) |
| `--ring` | `#737373` | `#737373` | Focus rings (3:1) |
| `--success` | `#15803d` | `#4ade80` | Status only |
| `--warning` | `#b45309` | `#fbbf24` | Status only |
| `--destructive` | `#b91c1c` | `#f87171` | Status only |

`pnpm check:contrast` checks 52 pairs in CI. A new color must pass it.

## Type

- Geist for text, Geist Mono for code.
- Text styles (`heading-1` to `heading-6`, `title-1` to `title-5`, `body-1` to `body-6`, `button-lg` to `button-xsm`, `caption-1` to `caption-5`) sit on the Tailwind type scale. Do not use arbitrary font sizes.
- Headings use `tracking-tight`; everything else uses normal tracking.

## Radius

`--radius` is 8px. Controls use `rounded-lg`, cards and popups `rounded-xl` (at most 16px), large panels `rounded-2xl` (at most 20px). Nested shapes: inner radius = outer radius minus the gap. The switch is a full pill.

## Motion

| Curve | Value | Use |
|---|---|---|
| `ease-calm` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default |
| `ease-snap` | `cubic-bezier(0.32, 0.72, 0, 1)` | A thumb or highlight that travels |
| `ease-pop` | spring as `linear()`, ~4% overshoot | A mark that appears |
| `ease-fade` | `cubic-bezier(0.2, 0, 0.6, 1)` | The release flash |

Durations: 200 ms for color and opacity, 300 ms for state changes, 500 ms for layout. Animate `transform`-family properties (`scale`, `translate`, `rotate`) and `opacity`; list them by name in `transition-[...]`, because Tailwind 4 animates them as separate properties. Every motion has a `motion-reduce:` fallback.

## Interaction

- Release flash: while pressed, a control's border brightens at once (`active:duration-0`) and fades back over 400 ms.
- Focus: `focus-visible:ring-2 ring-ring`, offset on filled controls.
- Disabled: 50% opacity and no pointer events. Loading is not disabled-looking.

## Writing

Plain, specific English. Short sentences, active voice. Errors say what failed and what to do next. No exclamation marks.
