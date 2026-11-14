import type { Node } from "fumadocs-core/page-tree"
import type { ReactNode } from "react"
import { MobileNav, type NavSection } from "@/components/mobile-nav"
import { NavLink } from "@/components/nav-link"
import { SiteHeader } from "@/components/site-header"
import { source } from "@/lib/source"

function Section({ label, nodes }: { label: string; nodes: Node[] }) {
  const pages = nodes.filter((node) => node.type === "page")
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between pr-2 pb-1 pl-3">
        <span className="caption-3 text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <span className="caption-5 text-muted-foreground tabular-nums">
          {pages.length}
        </span>
      </div>
      <ul className="flex flex-col">
        {pages.map((node) =>
          node.type === "page" ? (
            <li key={node.url}>
              <NavLink href={node.url}>{node.name}</NavLink>
            </li>
          ) : null,
        )}
      </ul>
    </div>
  )
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  const tree = source.pageTree.children
  const start = tree.filter((node) => node.type === "page")
  const folders = tree.filter((node) => node.type === "folder")
  const pagesOf = (nodes: Node[]) =>
    nodes.flatMap((node) =>
      node.type === "page" ? [{ name: String(node.name), url: node.url }] : [],
    )
  const sections: NavSection[] = [
    { label: "Get started", pages: pagesOf(start) },
    ...folders.flatMap((folder) =>
      folder.type === "folder"
        ? [{ label: String(folder.name), pages: pagesOf(folder.children) }]
        : [],
    ),
  ]

  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 pb-4 sm:px-6 md:flex-row md:gap-6">
        <div className="pt-4 md:hidden">
          <MobileNav sections={sections} />
        </div>
        <aside
          aria-label="Docs"
          className="max-md:hidden md:sticky md:top-14 md:h-[calc(100dvh-3.5rem)] md:w-56 md:shrink-0 md:overflow-y-auto"
        >
          <nav className="flex flex-col gap-8 py-6 md:py-8">
            <Section label="Get started" nodes={start} />
            {folders.map((folder) =>
              folder.type === "folder" ? (
                <Section
                  key={folder.$id ?? String(folder.name)}
                  label={String(folder.name)}
                  nodes={folder.children}
                />
              ) : null,
            )}
          </nav>
        </aside>
        <main
          id="content"
          className="min-w-0 flex-1 rounded-2xl bg-card shadow-[0_1px_2px_rgb(0_0_0/0.4),inset_0_1px_0_rgb(255_255_255/0.04),0_0_0_1px_var(--border)] md:mt-4"
        >
          {children}
        </main>
      </div>
    </>
  )
}
