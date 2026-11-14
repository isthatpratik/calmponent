"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

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
      className="text-muted-foreground transition-colors duration-200 ease-calm hover:text-foreground aria-[current=page]:text-foreground"
    >
      {children}
    </Link>
  )
}
