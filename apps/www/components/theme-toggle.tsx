"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"
const key = "calmponent-theme"

/** Runs before paint, so the page never flashes the wrong theme. */
export const themeScript = `try{var d=document.documentElement,t=localStorage.getItem("${key}");d.classList.toggle("dark",t!=="light");var l=JSON.parse(localStorage.getItem("calmponent-look")||"null");if(l){var r=["0px","4px","6px","8px","12px","9999px"][l.shape];if(r)d.style.setProperty("--radius",r);var a={blue:["#2563eb","#2563eb"],violet:["#6d28d9","#8b5cf6"],teal:["#0f766e","#0f766e"],rose:["#be123c","#be123c"]}[l.accent];if(a){d.style.setProperty("--primary",a[0]);d.style.setProperty("--primary-foreground","#ffffff");d.style.setProperty("--ring",a[1])}var f={host:"var(--font-host)",manrope:"var(--font-manrope)",instrument:"var(--font-instrument)",plex:"var(--font-plex)",system:"ui-sans-serif, system-ui, sans-serif",mono:"var(--font-geist-mono)"}[l.font];if(f)d.style.setProperty("--font-geist-sans",f);d.dataset.motion=l.motion===false?"off":"on";if(l.base&&l.base!=="neutral")d.dataset.base=l.base;if(l.stroke&&l.stroke!=="regular")d.dataset.stroke=l.stroke}}catch(e){}`

function Sun() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-3.5"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
    </svg>
  )
}

function Moon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
    >
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  )
}

/** Light and dark, with a highlight that slides between them. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark")
  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    )
  }, [])

  function choose(next: Theme) {
    setTheme(next)
    document.documentElement.classList.toggle("dark", next === "dark")
    try {
      localStorage.setItem(key, next)
    } catch {}
  }

  return (
    <fieldset className="relative flex items-center rounded-lg bg-muted p-0.5">
      <legend className="sr-only">Theme</legend>
      <span
        aria-hidden="true"
        className="absolute top-0.5 left-0.5 size-7 rounded-md bg-background shadow-sm transition-[translate] duration-300 ease-snap motion-reduce:transition-none"
        style={{ translate: theme === "dark" ? "1.75rem 0" : "0 0" }}
      />
      {(["light", "dark"] as const).map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={theme === value}
          aria-label={value === "light" ? "Light theme" : "Dark theme"}
          onClick={() => choose(value)}
          className="relative z-10 flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none transition-colors duration-200 ease-calm hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-pressed:text-foreground"
        >
          {value === "light" ? <Sun /> : <Moon />}
        </button>
      ))}
    </fieldset>
  )
}
