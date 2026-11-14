import Link from "next/link"
import { Logo } from "@/components/logo"

const columns = [
  {
    title: "Docs",
    links: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
    ],
  },
  {
    title: "Components",
    links: [
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/form", label: "Form" },
      { href: "/docs/components/timeline", label: "Timeline" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "https://github.com/isthatpratik/calmponent", label: "GitHub" },
      {
        href: "https://github.com/isthatpratik/calmponent/blob/main/CHANGELOG.md",
        label: "Changelog",
      },
      {
        href: "https://github.com/isthatpratik/calmponent/blob/main/LICENSE",
        label: "License",
      },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="caption-2 max-w-64 text-pretty text-muted-foreground">
            An open-source React UI library for shadcn/ui and Tailwind CSS, with
            every state built in.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-3">
            <span className="caption-3 text-muted-foreground uppercase tracking-wider">
              {column.title}
            </span>
            <ul className="flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="body-6 text-muted-foreground transition-colors duration-200 ease-calm hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 border-border/60 border-t px-6 py-6">
        <span className="caption-5 text-muted-foreground">
          MIT License © 2026 Pratik Desai
        </span>
        <span className="caption-5 font-mono text-muted-foreground">
          v0.1.0
        </span>
      </div>
    </footer>
  )
}
