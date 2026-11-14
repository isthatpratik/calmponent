"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

/** A sidebar link with a marker that shows the current page. */
export function NavLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="group/link body-6 relative flex items-center rounded-md py-1.5 pr-2 pl-3 text-muted-foreground outline-none transition-colors duration-200 ease-calm hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:text-foreground"
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-0 h-4 w-px -translate-y-1/2 scale-y-0 bg-foreground transition-[scale] duration-300 ease-calm group-aria-[current=page]/link:scale-y-100"
      />
      {children}
    </Link>
  )
}
