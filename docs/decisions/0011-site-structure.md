# 0011: Site structure

- Status: accepted
- Date: 2026-11-14
- Backlog item: D7

## Context

The docs site is placeholder styling. It must look as finished as the components: sleek, calm, monochrome, and dark first (ADR 0009). The owner shared references they like: litt.md (component showcase, customizer), interior.dev (docs layout and surfaces), siteplane (on-click flash, elegance), dashboardblocks (live blocks on the landing page, grid lines), polar.sh and primora.xyz (monochrome, rails and hairlines).

## Decision

### Shell

- A sticky top bar: wordmark, Docs and Components links, the version, a light/dark switch, and GitHub.
- Docs: the sidebar sits on the page background. Content sits in an inset panel (`bg-card`, `rounded-2xl`, a hairline ring) with its own padding. Previews inside the panel sit in darker wells (`bg-background` with an inset ring), so components look the way they will in an app.
- Sidebar: small uppercase section labels, a count per section, and a marker on the current page.
- Page header: an eyebrow (section · number), the title, a description held to about 60 characters per line, then the actions (Copy page, menu).
- Component pages: showcase sections (`Example`) with a Preview / Code toggle, then Install, Usage, States, Parts, Accessibility.

### Landing page

1. Hero: the headline with a white-to-gray gradient on the text only, a short subheadline, the install command with copy, and a link to the components.
2. Live components on a dashed grid. Each crossing has a dot with a small gap around it. A dot is a status light for the demo next to it: gray at rest, a pulse while loading, green on success, red on error, then gray again.
3. A tagline section whose words light up one by one on scroll.
4. What is inside: every state, motion with a cause, accessible, AI ready.
5. A final call to action and a footer.

### Rules

- No dead links. Search is not shown until it exists.
- Every motion has a cause. Reduced motion is respected everywhere.

## Consequences

- `apps/www` gets shared site components: header, theme switch, sidebar.
- The landing page uses real Calmponent components, so it doubles as a test of them.
- Search (⌘K), the customizer (#31), and the global state switch (#32) come later.

## Sources

- Owner feedback on 2026-11-14, with the reference sites listed above.
- Measured details of interior.dev, siteplane, and litt.md from browser inspection on 2026-11-14 (surfaces, radii, timings).
