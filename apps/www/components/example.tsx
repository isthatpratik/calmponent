"use client"

import { Tabs } from "@base-ui/react/tabs"
import type { ReactNode } from "react"
import { CopyButton } from "@/components/copy-button"

/**
 * A showcase section: a title, and a Preview / Code toggle whose highlight
 * slides between the two.
 */
export function Example({
  title,
  description,
  code,
  children,
}: {
  title: string
  description?: string
  code?: string
  children: ReactNode
}) {
  return (
    <Tabs.Root defaultValue="preview" className="not-prose flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="title-3 text-foreground">{title}</span>
          {description ? (
            <span className="caption-2 text-muted-foreground">
              {description}
            </span>
          ) : null}
        </div>
        {code ? (
          <Tabs.List className="relative flex gap-1 rounded-lg bg-muted p-1">
            {["preview", "code"].map((value) => (
              <Tabs.Tab
                key={value}
                value={value}
                className="caption-1 relative z-10 cursor-pointer rounded-md px-2.5 py-1 text-muted-foreground capitalize outline-none transition-colors duration-200 ease-calm hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[active]:text-foreground"
              >
                {value}
              </Tabs.Tab>
            ))}
            <Tabs.Indicator className="absolute top-1/2 left-0 h-[calc(100%-0.5rem)] w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-1/2 rounded-md bg-background shadow-sm transition-[translate,width] duration-300 ease-snap motion-reduce:transition-none" />
          </Tabs.List>
        ) : null}
      </div>
      <Tabs.Panel
        value="preview"
        className="rounded-xl border border-border bg-card p-6 outline-none sm:p-10"
      >
        {children}
      </Tabs.Panel>
      {code ? (
        <Tabs.Panel value="code" className="relative outline-none">
          <pre className="max-h-[32rem] overflow-auto rounded-xl border border-border bg-card p-4 pr-12 font-mono text-sm">
            <code>{code.trim()}</code>
          </pre>
          <CopyButton
            label="Copy code"
            value={code.trim()}
            className="absolute top-2.5 right-2.5"
          />
        </Tabs.Panel>
      ) : null}
    </Tabs.Root>
  )
}
