// Checks WCAG 2.2 AA contrast for the design tokens in apps/www/app/globals.css.
// Text pairs need 4.5:1. Input borders and focus rings need 3:1 (1.4.11).
// See docs/decisions/0009-design-system.md.
import { readFileSync } from "node:fs"

const css = readFileSync(
  new URL("../apps/www/app/globals.css", import.meta.url),
  "utf8",
)

function readBlock(selector) {
  const start = css.indexOf(`${selector} {`)
  if (start === -1) throw new Error(`Block ${selector} not found`)
  const body = css.slice(start, css.indexOf("}", start))
  const tokens = {}
  for (const [, name, value] of body.matchAll(
    /--([\w-]+):\s*(#[0-9a-f]{6})/gi,
  )) {
    tokens[name] = value
  }
  return tokens
}

function luminance(hex) {
  const channels = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const text = 4.5
const ui = 3
const pairs = [
  ["foreground", "background", text],
  ["foreground", "card", text],
  ["muted-foreground", "background", text],
  ["muted-foreground", "card", text],
  ["muted-foreground", "muted", text],
  ["muted-foreground", "accent", text],
  ["card-foreground", "card", text],
  ["popover-foreground", "popover", text],
  ["primary-foreground", "primary", text],
  ["secondary-foreground", "secondary", text],
  ["accent-foreground", "accent", text],
  ["destructive", "background", text],
  ["destructive", "card", text],
  ["destructive", "muted", text],
  ["success", "background", text],
  ["success", "card", text],
  ["success", "muted", text],
  ["warning", "background", text],
  ["warning", "card", text],
  ["warning", "muted", text],
  ["sidebar-foreground", "sidebar", text],
  ["input", "background", ui],
  ["input", "card", ui],
  ["input", "muted", ui],
  ["ring", "background", ui],
  ["ring", "card", ui],
]

const light = readBlock(":root")
const themes = { light, dark: { ...light, ...readBlock(".dark") } }

let failures = 0
for (const [theme, tokens] of Object.entries(themes)) {
  for (const [fg, bg, min] of pairs) {
    const value = ratio(tokens[fg], tokens[bg])
    const ok = value >= min
    if (!ok) failures++
    console.log(
      `${ok ? "pass" : "FAIL"}  ${theme.padEnd(5)}  ${value.toFixed(2).padStart(5)} >= ${min}  --${fg} on --${bg}`,
    )
  }
}

if (failures > 0) {
  console.error(`\n${failures} contrast check(s) failed.`)
  process.exit(1)
}
console.log("\nAll contrast checks passed.")
