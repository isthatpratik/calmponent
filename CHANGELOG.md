# Changelog

All notable changes to Calmponent are listed here. Versions follow [semver](https://semver.org). See [ADR 0006](docs/decisions/0006-releases.md).

## Unreleased

- `tabs`: a pill or underline that slides to the chosen tab, panels that arrive from the side of the choice, disabled tabs, and a loading state.
- Site redesign (ADR 0011): a sticky header with a light and dark switch, a docs shell with the content in an inset panel and previews in wells, page headers with an eyebrow, and a new landing page with live components on a dashed grid whose corner dots show each demo's status, plus a tagline that lights up word by word.
- `timeline`: `TimelineHeader`, `TimelineGroup` for phases, a `proportional` mode with rails as long as each step took and a ghost of the last run, and `TimelineBar` for the whole run at a glance. Phases differ by gray step; color stays for status.
- Docs: showcase sections with a sliding Preview and Code toggle.
- `heatmap`: a monochrome scale fitted to your data by quartiles, a lens on hover, one gliding tooltip, an accessible grid with arrow keys, and loading and empty states.
- `timeline`: done, running, pending, failed, and skipped states. Connectors draw down as steps finish, new icons pop in, and loading and empty states are built in.
- Motion tokens: `ease-snap`, `ease-pop` (a spring with about 4% overshoot), and `ease-fade`.
- Release flash on input, textarea, select, checkbox, radio, and switch: the border brightens while pressed and fades back over 400 ms.
- `switch`: redesigned. Our 8px radius, a 4px thumb radius, a thumb that widens toward the centre when pressed, and a calm breathing pending state instead of a spinner.
- `checkbox` and `radio-group`: the mark and the dot pop in on a spring.
- `field`: the valid check pops in. `select`: the list drifts toward its trigger as it opens, and highlights arrive at once and leave softly. `toast`: the icon pops in when loading turns into a result.

## 0.1.0 (2026-11-14)

Forms core: the first 10 components, each with every state built in.

- `form`: submitting, server field errors, a form error, and success built in. `FormSubmit` and `FormMessage` follow the form's state.
- `field`: `FieldError` now shows server errors from `Form`, and the valid check no longer shows on checkbox, radio, and switch fields.
- `toast`: `toast()`, `toast.success`, `toast.error` with actions, `toast.warning`, and `toast.promise` that turns loading into its result in place. Toasts stack, spread out on hover, and swipe away.
- `select`: an empty state inside the list, invalid and disabled states, a list that scales in from its trigger, and a chevron that turns as it opens.
- `checkbox`: the check draws itself, with indeterminate, invalid, and disabled states.
- `radio-group`: the dot grows in and the previous one shrinks out.
- `switch`: a pending state for async saves. On failure, the thumb slides back and a message explains why.
- `textarea`: grows with its content, a character count that turns amber near the limit and red at it, and calm announcements at 50, 20, and 10 characters left.
- `field`: label, description, and error. Errors grow in and out without layout jumps, a check appears for valid filled values, and async validation is supported.
- `input`: invalid, read only, disabled, and a checking state with an inline spinner.
- `spinner`: the dash ring loader as its own item. `button` and `input` use it.
- Design tokens (ADR 0009): monochrome colors, status colors, Geist, text styles, radius, and the `ease-calm` motion curve. A contrast check runs in CI.
- `button`: loading, success, and error states with a stable width, focus kept while loading, and a live region. Install with `npx shadcn@latest add isthatpratik/calmponent/button`.
- `button`: the fill draws in on hover (scale 0.97), the loader is a dash ring that grows and travels, and the pointer cursor is back. Fixed: the status label and press now animate (Tailwind 4 `scale` and `translate` are separate properties).
- Docs: package manager tabs (npm, pnpm, bun, yarn) that remember your choice, copy buttons on code, "Copy page" as clean Markdown, open in ChatGPT or Claude, share on X, breadcrumbs, heading anchors, and "On this page".
- `tokens` and `theme` registry items, generated from the docs site CSS.

## 0.0.1 (2026-11-14)

The foundation release. There are no UI components yet.

- Project setup: decisions, license, community files, and workspace configuration.
- Docs app (`apps/www`) on Next.js 16 and headless Fumadocs, with placeholder styling.
- First registry item: `utils` (the `cn()` helper). Install with `npx shadcn@latest add isthatpratik/calmponent/utils`.
