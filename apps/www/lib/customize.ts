/**
 * The site customizer: how a visitor previews Calmponent in their own look.
 * Values are written to <html> as CSS variables and data attributes, so
 * every component follows without re-rendering.
 */
export type Accent = "mono" | "blue" | "rose"
export type Font = "geist" | "system" | "mono"

export type Look = {
  accent: Accent
  /** Index into `radiusStops`. */
  shape: number
  font: Font
  motion: boolean
}

export const radiusStops = [
  { label: "Square", value: "0px" },
  { label: "4px", value: "4px" },
  { label: "6px", value: "6px" },
  { label: "8px", value: "8px" },
  { label: "12px", value: "12px" },
  { label: "Pill", value: "9999px" },
]

export const defaultLook: Look = {
  accent: "mono",
  shape: 3,
  font: "geist",
  motion: true,
}

export const accents: Record<
  Accent,
  { label: string; swatch: string; vars?: Record<string, string> }
> = {
  mono: { label: "Monochrome", swatch: "var(--foreground)" },
  // Both keep white text above 4.5:1 in light and dark.
  blue: {
    label: "Blue",
    swatch: "#2563eb",
    vars: {
      "--primary": "#2563eb",
      "--primary-foreground": "#ffffff",
      "--ring": "#2563eb",
    },
  },
  rose: {
    label: "Rose",
    swatch: "#be123c",
    vars: {
      "--primary": "#be123c",
      "--primary-foreground": "#ffffff",
      "--ring": "#be123c",
    },
  },
}

export const fonts: Record<Font, { label: string; stack?: string }> = {
  geist: { label: "Geist" },
  system: { label: "System", stack: "ui-sans-serif, system-ui, sans-serif" },
  mono: { label: "Geist Mono", stack: "var(--font-geist-mono)" },
}

export const storageKey = "calmponent-look"

export function applyLook(look: Look) {
  const root = document.documentElement
  for (const accent of Object.values(accents)) {
    for (const name of Object.keys(accent.vars ?? {}))
      root.style.removeProperty(name)
  }
  for (const [name, value] of Object.entries(accents[look.accent].vars ?? {})) {
    root.style.setProperty(name, value)
  }
  root.style.setProperty("--radius", radiusStops[look.shape]?.value ?? "8px")
  const stack = fonts[look.font].stack
  if (stack) root.style.setProperty("--font-geist-sans", stack)
  else root.style.removeProperty("--font-geist-sans")
  root.dataset.motion = look.motion ? "on" : "off"
}

export function isDefault(look: Look) {
  return (Object.keys(defaultLook) as (keyof Look)[]).every(
    (key) => look[key] === defaultLook[key],
  )
}

/** The CSS a visitor pastes into their own globals.css. */
export function tokensFor(look: Look) {
  const lines = [`  --radius: ${radiusStops[look.shape]?.value ?? "8px"};`]
  for (const [name, value] of Object.entries(accents[look.accent].vars ?? {})) {
    lines.push(`  ${name}: ${value};`)
  }
  const font = fonts[look.font].stack
  const css = `:root,\n.dark {\n${lines.join("\n")}\n}`
  return font
    ? `${css}\n\n/* Font: ${fonts[look.font].label} (${font}) */`
    : css
}

export function encodeLook(look: Look) {
  return btoa(JSON.stringify(look)).replace(/=+$/, "")
}

export function decodeLook(value: string): Look | null {
  try {
    const parsed = JSON.parse(atob(value)) as Partial<Look>
    return { ...defaultLook, ...parsed }
  } catch {
    return null
  }
}
