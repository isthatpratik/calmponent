"use client"

import { Menu } from "@base-ui/react/menu"
import { Button } from "@calmponent/registry/ui/button"
import { useState } from "react"
import { ArrowUpRightIcon, CaretDownIcon, CopyIcon } from "@/components/icons"

type CopyState = "idle" | "success" | "error"

function aiPrompt(url: string) {
  return `Read ${url} and help me use this Calmponent component in my project.`
}

/**
 * "Copy page" copies the page as Markdown, for AI tools. The menu opens the
 * page in an assistant or shares it on X.
 */
export function PageActions({
  markdown,
  title,
}: {
  markdown: string
  title: string
}) {
  const [status, setStatus] = useState<CopyState>("idle")

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown)
      setStatus("success")
    } catch {
      setStatus("error")
    }
    setTimeout(() => setStatus("idle"), 1600)
  }

  const url = typeof window === "undefined" ? "" : window.location.href
  const links = [
    {
      label: "View as Markdown",
      href:
        typeof window === "undefined" ? "#" : `${window.location.pathname}.md`,
    },
    {
      label: "Open in ChatGPT",
      href: `https://chatgpt.com/?q=${encodeURIComponent(aiPrompt(url))}`,
    },
    {
      label: "Open in Claude",
      href: `https://claude.ai/new?q=${encodeURIComponent(aiPrompt(url))}`,
    },
    {
      label: "Share on X",
      href: `https://x.com/intent/post?text=${encodeURIComponent(`${title} from Calmponent`)}&url=${encodeURIComponent(url)}`,
    },
  ]

  return (
    <div className="flex shrink-0 items-center">
      <Button
        variant="outline"
        size="sm"
        status={status}
        statusText={{ success: "Copied", error: "Copy failed" }}
        onClick={copy}
        className="rounded-r-none"
      >
        <CopyIcon />
        Copy page
      </Button>
      <Menu.Root>
        <Menu.Trigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="More page actions"
              className="-ml-px rounded-l-none"
            />
          }
        >
          <CaretDownIcon />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={6} align="end" className="z-50">
            <Menu.Popup className="min-w-48 origin-(--transform-origin) rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-none transition-[opacity,scale] duration-200 ease-calm data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:data-[ending-style]:scale-100 motion-reduce:data-[starting-style]:scale-100">
              {links.map((link) => (
                <Menu.LinkItem
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="body-5 flex cursor-pointer items-center justify-between gap-6 rounded-lg px-2.5 py-1.5 text-muted-foreground outline-none transition-colors duration-200 ease-calm data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
                >
                  {link.label}
                  <ArrowUpRightIcon className="size-3.5" />
                </Menu.LinkItem>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  )
}
