import Link from "next/link"
import { Customizer } from "@/components/customizer"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

function GitHub() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  )
}

const links = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components/button", label: "Components" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-border/60 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <Logo />
          <nav aria-label="Main" className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="body-6 rounded-md not-first:max-sm:hidden px-2.5 py-1.5 text-muted-foreground outline-none transition-colors duration-200 ease-calm hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/isthatpratik/calmponent/releases"
            className="caption-4 hidden rounded-md border border-border px-2 py-1 font-mono text-muted-foreground transition-colors duration-200 ease-calm hover:text-foreground sm:block"
          >
            v0.1.0
          </Link>
          <Customizer />
          <ThemeToggle />
          <Link
            href="https://github.com/isthatpratik/calmponent"
            aria-label="Calmponent on GitHub"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors duration-200 ease-calm hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <GitHub />
          </Link>
        </div>
      </div>
    </header>
  )
}
