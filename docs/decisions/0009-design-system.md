# 0009: Design system

- Status: accepted
- Date: 2026-11-14
- Backlog item: D6

## Context

Calmponent needs one set of design tokens: colors, type, radius, and motion. Components read these tokens, so the user can retheme everything from one place. The user's taste: full monochrome, color for status only, no generic "premium dark" gallery look. References: polar.sh, primora.xyz, unkey.com, dovetail.com, cardcn.dev.

## Decision

### Token names

Components use the shadcn/ui CSS variable names (`--background`, `--foreground`, `--card`, `--muted`, `--border`, `--input`, `--ring`, `--primary`, `--destructive`, and the rest). A user's existing shadcn theme then works with Calmponent (principle 3). We add two status tokens that shadcn does not have: `--success` and `--warning`.

### Theme

- **Dark first.** The site opens in dark mode. Light mode exists with the same tokens.
- **Pure neutral grays**, no tint. Dark surfaces: `#000000`, `#181818`, `#1F1F1F`, `#272727`, `#313131`.
- **Color only for status:** destructive (red), success (green), warning (amber). No brand accent. The primary color is white in dark mode and near-black in light mode.
- **Depth from gray steps only.** No glows, no gradient backgrounds, no colored shadows. This keeps dark mode away from the generic gallery look.

### Contrast (WCAG 2.2 AA)

Every text pair passes 4.5:1, and every input border and focus ring passes 3:1. Checked with a script on 2026-11-14. Four light-mode values were changed because they failed:

| Token (light) | Failed | Used | Ratio |
|---|---|---|---|
| `--muted-foreground` on `--muted` | `#737373` (4.35) | `#666666` | 5.27 |
| `--success` on white | `#16A34A` (3.30) | `#15803D` | 5.02 |
| `--warning` on white | `#D97706` (3.19) | `#B45309` | 5.02 |
| `--ring` on white | `#A3A3A3` (2.52) | `#737373` | 4.74 |
| `--destructive` on `--muted` | `#DC2626` (4.4) | `#B91C1C` | see check |

Input borders: `#6B6B6B` on `#181818` (3.33) in dark mode, `#858585` on `#F5F5F5` (3.38) in light mode. Decorative borders (`--border`) are not required to meet 3:1.

### Type

- **Geist** for text and **Geist Mono** for code, loaded with `next/font/google`. The user chose Geist because it is familiar and reads well. shadcn/ui, Vercel, and React Bits also use it, so Calmponent's identity must come from its states and motion, not from its font.
- Text styles: Heading 1 to 6, Title 1 to 5, Body 1 to 6, Button, and Caption, each on a Tailwind type-scale step. They exist as utilities: `heading-1`, `body-6`, `caption-3`, and so on.
- **Tracking:** headings use `-0.025em` (`tracking-tight`). Body, buttons, and captions use `0`. Tight tracking on small text makes it harder to read.

### Radius

`--radius: 0.5rem` (8px). Buttons and inputs use `rounded-lg` (8px), cards use `rounded-xl` (12px).

The scale is additive: `sm` = radius − 4px, `md` = radius − 2px, `lg` = radius, `xl` = radius + 4px, `2xl` = radius + 8px. shadcn/ui now multiplies instead (`xl` = radius × 1.4 = 11.2px), which lands off the Tailwind scale. The additive scale is still derived from `--radius`, so a user can retheme it with one value. Nested shapes follow the formula: inner radius = outer radius minus the gap, when the gap is under 32px.

### Motion

- One curve: `--ease-calm: cubic-bezier(0.22, 1, 0.36, 1)` (utility `ease-calm`). Never the browser defaults `ease`, `linear`, or `ease-in-out`.
- Durations: 200 ms for color and opacity, 300 ms for state changes inside a component, 500 ms for layout and position. Use Tailwind's `duration-200`, `duration-300`, and `duration-500`. Tailwind has no theme namespace for durations.
- Animate only `transform` and `opacity`.
- With `prefers-reduced-motion`, movement becomes a plain opacity change.
- Every motion has a cause. Parts stay mounted and move instead of popping in.

### Icons

Phosphor (`@phosphor-icons/react`). Not Lucide, not Material.

## Consequences

- The tokens live in `apps/www/app/globals.css` for now. When the first component ships, they also ship as a `registry:style` item, so `shadcn add` installs them.
- Light mode needs a theme switch on the site (D7).
- Every new color must pass the contrast check before it is added.

## Sources

- Live CSS of ui.shadcn.com, vercel.com, and reactbits.dev (Geist), checked 2026-11-14.
- WCAG 2.2: 1.4.3 Contrast (Minimum) and 1.4.11 Non-text Contrast.
- [shadcn/ui theming](https://ui.shadcn.com/docs/theming): the CSS variable names and the multiplied radius scale.
- [Tailwind CSS theme variables](https://tailwindcss.com/docs/theme): `--ease-*` creates `ease-*` utilities; there is no duration namespace.
