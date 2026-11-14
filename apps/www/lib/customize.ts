/**
 * The site customizer: how a visitor previews Calmponent in their own look.
 * Values are written to <html> as CSS variables and data attributes, so
 * every component follows without re-rendering.
 */
import { bases } from "@/lib/customize-bases"

export type Accent = "mono" | "blue" | "violet" | "teal" | "rose"
export type Base = "neutral" | "zinc" | "stone" | "slate"
export type Stroke = "thin" | "regular" | "bold"
export type Font =
  | "geist"
  | "host"
  | "manrope"
  | "instrument"
  | "plex"
  | "system"
  | "mono"

export type Look = {
  base: Base
  accent: Accent
  stroke: Stroke
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
  base: "neutral",
  accent: "mono",
  stroke: "regular",
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
  violet: {
    label: "Violet",
    swatch: "#6d28d9",
    // The ring is lighter than the fill, so it keeps 3:1 on black too.
    vars: {
      "--primary": "#6d28d9",
      "--primary-foreground": "#ffffff",
      "--ring": "#8b5cf6",
    },
  },
  teal: {
    label: "Teal",
    swatch: "#0f766e",
    vars: {
      "--primary": "#0f766e",
      "--primary-foreground": "#ffffff",
      "--ring": "#0f766e",
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

export const baseLabels: Record<Base, string> = {
  neutral: "Neutral",
  zinc: "Zinc",
  stone: "Stone",
  slate: "Slate",
}

export const strokes: Record<Stroke, { label: string; width: string }> = {
  thin: { label: "Thin", width: "1.5" },
  regular: { label: "Regular", width: "2" },
  bold: { label: "Bold", width: "2.5" },
}

export const fonts: Record<Font, { label: string; stack?: string }> = {
  geist: { label: "Geist" },
  host: { label: "Host Grotesk", stack: "var(--font-host)" },
  manrope: { label: "Manrope", stack: "var(--font-manrope)" },
  instrument: { label: "Instrument Sans", stack: "var(--font-instrument)" },
  plex: { label: "IBM Plex Sans", stack: "var(--font-plex)" },
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
  if (look.base === "neutral") delete root.dataset.base
  else root.dataset.base = look.base
  if (look.stroke === "regular") delete root.dataset.stroke
  else root.dataset.stroke = look.stroke
}

export function isDefault(look: Look) {
  return (Object.keys(defaultLook) as (keyof Look)[]).every(
    (key) => look[key] === defaultLook[key],
  )
}

/** The CSS a visitor pastes into their own globals.css. */
export function tokensFor(look: Look) {
  const lines = [`  --radius: ${radiusStops[look.shape]?.value ?? "8px"};`]
  const base = look.base === "neutral" ? null : bases[look.base]
  const vars = (mode: "light" | "dark") =>
    Object.entries(base ? base[mode] : {})
      .filter(([name]) => !accents[look.accent].vars?.[`--${name}`])
      .map(([name, value]) => `  --${name}: ${value};`)
  for (const [name, value] of Object.entries(accents[look.accent].vars ?? {})) {
    lines.push(`  ${name}: ${value};`)
  }
  const font = fonts[look.font].stack
  const shared = `:root,\n.dark {\n${lines.join("\n")}\n}`
  const css = base
    ? `${shared}\n\n:root {\n${vars("light").join("\n")}\n}\n\n.dark {\n${vars("dark").join("\n")}\n}`
    : shared
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
