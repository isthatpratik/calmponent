// Generates the "tokens" and "theme" registry items from apps/www/app/globals.css,
// so the docs site and the registry share one source of truth (ADR 0009).
//
// - tokens: only what Calmponent adds (--success, --warning, ease-calm, text styles).
//   It never changes the user's existing colors.
// - theme: the full Calmponent monochrome palette, for users who want the look.
import { readFileSync, writeFileSync } from "node:fs"

const root = new URL("../", import.meta.url)
const css = readFileSync(new URL("apps/www/app/globals.css", root), "utf8")

function block(selector) {
  const start = css.indexOf(`${selector} {`)
  if (start === -1) throw new Error(`Block ${selector} not found`)
  const body = css.slice(start, css.indexOf("}", start))
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, k, v]) => [
      k,
      v.trim(),
    ]),
  )
}

const light = block(":root")
const dark = block(".dark")
const theme = block("@theme inline")

const utilities = {}
for (const [, name, body] of css.matchAll(/@utility ([\w-]+) \{([^}]*)\}/g)) {
  utilities[`@utility ${name}`] = Object.fromEntries(
    [...body.matchAll(/([\w-]+):\s*([^;]+);/g)].map(([, k, v]) => [
      k,
      v.trim(),
    ]),
  )
}

const pick = (obj, keys) => Object.fromEntries(keys.map((k) => [k, obj[k]]))
const status = ["success", "warning"]

const tokens = {
  name: "tokens",
  type: "registry:item",
  title: "Tokens",
  description:
    "What Calmponent adds to a shadcn theme: success and warning colors, the motion curves, and text styles. Your existing colors stay as they are.",
  cssVars: {
    theme: {
      "color-success": "var(--success)",
      "color-warning": "var(--warning)",
      ...Object.fromEntries(
        Object.entries(theme)
          .filter(([key]) => key.startsWith("ease-"))
          .map(([key, value]) => [key, value.replace(/\s+/g, " ")]),
      ),
    },
    light: pick(light, status),
    dark: pick(dark, status),
  },
  css: utilities,
}

const colorKeys = Object.keys(light).filter((k) => k !== "radius")
const themeItem = {
  name: "theme",
  type: "registry:theme",
  title: "Theme",
  description:
    "The Calmponent look: full monochrome, pure neutral grays, color only for status, and an 8px radius. Replaces your theme colors.",
  registryDependencies: ["isthatpratik/calmponent/tokens"],
  cssVars: {
    theme: { radius: light.radius },
    light: pick(light, colorKeys),
    dark: pick(dark, colorKeys),
  },
}

const registryPath = new URL("registry.json", root)
const registry = JSON.parse(readFileSync(registryPath, "utf8"))
const generated = new Set(["tokens", "theme"])
registry.items = [
  tokens,
  themeItem,
  ...registry.items.filter((item) => !generated.has(item.name)),
]
writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`)
console.log(
  `Synced tokens (${Object.keys(utilities).length} utilities) and theme (${colorKeys.length} colors).`,
)
