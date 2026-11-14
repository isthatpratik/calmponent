"use client"

import { Dialog } from "@base-ui/react/dialog"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export type NavSection = {
  label: string
  pages: { name: string; url: string }[]
}

/**
 * The docs navigation on small screens: a full-height panel whose links
 * rise into place one after another, capped at 400 ms in total.
 */
export function MobileNav({ sections }: { sections: NavSection[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const current = sections
    .flatMap((section) => section.pages)
    .find((page) => page.url === pathname)
  let index = 0

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="body-5 flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-foreground shadow-[inset_0_0_0_1px_var(--border)] outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="flex items-center gap-2">
          <span className="caption-3 text-muted-foreground uppercase tracking-wider">
            Menu
          </span>
          <span>{current?.name ?? "Docs"}</span>
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="size-4 text-muted-foreground"
        >
          <path d="M5 8h14M5 16h14" />
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity duration-300 ease-calm data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-x-0 top-0 bottom-0 z-50 flex flex-col overflow-y-auto bg-background/95 px-6 pt-5 pb-10 outline-none backdrop-blur-xl transition-[opacity,translate] duration-300 ease-calm data-[ending-style]:-translate-y-2 data-[ending-style]:opacity-0 data-[starting-style]:-translate-y-2 data-[starting-style]:opacity-0 motion-reduce:data-[ending-style]:translate-y-0 motion-reduce:data-[starting-style]:translate-y-0">
          <div className="flex items-center justify-between pb-6">
            <Dialog.Title className="title-3">Docs</Dialog.Title>
            <Dialog.Close
              aria-label="Close menu"
              className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors duration-200 ease-calm hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="size-4"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </Dialog.Close>
          </div>
          <nav aria-label="Docs" className="flex flex-col gap-8">
            {sections.map((section) => (
              <div key={section.label} className="flex flex-col gap-1">
                <span className="caption-3 pb-1 text-muted-foreground uppercase tracking-wider">
                  {section.label}
                </span>
                {section.pages.map((page) => {
                  const delay = Math.min(400, index++ * 60)
                  return (
                    <Link
                      key={page.url}
                      href={page.url}
                      onClick={() => setOpen(false)}
                      aria-current={page.url === pathname ? "page" : undefined}
                      style={{ transitionDelay: `${delay}ms` }}
                      className="title-2 rounded-md py-2 text-muted-foreground outline-none transition-[opacity,translate,color] duration-500 ease-calm starting:translate-y-6 starting:opacity-0 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:text-foreground motion-reduce:starting:translate-y-0"
                    >
                      {page.name}
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
