"use client"

import { Tabs } from "@base-ui/react/tabs"
import { useSyncExternalStore } from "react"
import { CopyButton } from "@/components/copy-button"

const managers = ["npm", "pnpm", "bun", "yarn"] as const
type Manager = (typeof managers)[number]

const runners: Record<Manager, string> = {
  npm: "npx shadcn@latest add",
  pnpm: "pnpm dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
}

// One choice for every install block on the site, remembered across visits.
const key = "calmponent-package-manager"
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

function read(): Manager {
  const value = localStorage.getItem(key)
  return managers.includes(value as Manager) ? (value as Manager) : "npm"
}

function write(value: Manager) {
  localStorage.setItem(key, value)
  for (const listener of listeners) listener()
}

export function InstallCommand({ item }: { item: string }) {
  const manager = useSyncExternalStore(subscribe, read, () => "npm" as Manager)
  const command = `${runners[manager]} ${item}`

  return (
    <Tabs.Root
      value={manager}
      onValueChange={(value) => write(value as Manager)}
      className="well overflow-hidden"
    >
      <div className="flex items-center justify-between border-border border-b px-2">
        <Tabs.List
          aria-label="Package manager"
          className="relative flex gap-1 py-1.5"
        >
          {managers.map((name) => (
            <Tabs.Tab
              key={name}
              value={name}
              className="caption-1 relative z-10 cursor-pointer rounded-md px-2 py-1 text-muted-foreground outline-none transition-colors duration-200 ease-calm hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[active]:text-foreground"
            >
              {name}
            </Tabs.Tab>
          ))}
          {/* The highlight slides to the chosen tab instead of jumping. */}
          <Tabs.Indicator className="absolute top-1/2 left-0 h-7 w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-1/2 rounded-md bg-accent transition-[translate,width] duration-300 ease-calm motion-reduce:transition-none" />
        </Tabs.List>
        <CopyButton label="Copy install command" value={command} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm">
        <code>{command}</code>
      </pre>
    </Tabs.Root>
  )
}
