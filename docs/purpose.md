# Purpose and principles

Status: accepted on 2026-11-12. The name "Calmponent" was chosen on the same day.

## Problem

shadcn/ui gives developers the parts, but not the finished behavior. Every team rebuilds the same things: loading buttons, field errors, empty lists, success confirmations, and smooth transitions. AI agents make this worse, because they generate only the "happy path" with no loading, error, or empty states. Many apps look fine in a screenshot but feel unfinished when you use them.

## Purpose

Components that are finished: every state designed, every motion with a reason, and easy for people and AI agents to use correctly.

## For whom

- Developers who build product UIs with React, Tailwind CSS, and shadcn/ui.
- People who build with AI tools such as Claude Code, Cursor, and v0.

## Principles

1. **Every state.** Idle, loading, success, error, empty, and disabled are built in and styled.
2. **Motion with a cause.** Animation shows a change of state. It is never decoration. Reduced motion is built in.
3. **Easy to switch.** The components keep the same names and core props as shadcn/ui, and add more. A team can swap one component at a time.
4. **Its own identity.** A distinct, premium look. Not another generic dark gallery.
5. **Accessible by default.** Keyboard, screen readers, focus, and contrast work without extra setup.
6. **AI-ready, with proof.** A Claude Code skill, prop schemas, "Copy for AI", and published agent test results.

## What it is not

- An effects library or an animated-background library.
- A full design tool.

## Name

"Calmponent" is "calm" + "component". It points to principles 2 and 4: quiet, intentional motion and a calm, premium look.

Checked on 2026-11-12: npm `calmponent`, GitHub `calmponent` and `calmponent-ui`, the shadcn registry name, and `calmponent.dev`, `.ai`, `.io`, `.co`, and `.app` were free. `calmponent.com` is registered by another person (since 2026-01-19). No product or library with this name was found on the web. A trademark search (USPTO, EUIPO) was not done yet.
