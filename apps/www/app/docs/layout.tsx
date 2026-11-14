import type { Node } from "fumadocs-core/page-tree"
import Link from "next/link"
import type { ReactNode } from "react"
import { NavLink } from "@/components/nav-link"
import { source } from "@/lib/source"

function TreeNodes({ nodes }: { nodes: Node[] }) {
  return (
    <ul className="space-y-1">
      {nodes.map((node) => {
        if (node.type === "page") {
          return (
            <li key={node.url}>
              <NavLink href={node.url}>{node.name}</NavLink>
            </li>
          )
        }
        if (node.type === "folder") {
          return (
            <li key={node.$id ?? String(node.name)} className="pt-2">
              <span className="title-4">{node.name}</span>
              <div className="pl-3">
                <TreeNodes nodes={node.children} />
              </div>
            </li>
          )
        }
        return (
          <li
            key={node.$id ?? String(node.name)}
            className="caption-3 pt-4 text-muted-foreground"
          >
            {node.name}
          </li>
        )
      })}
    </ul>
  )
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:gap-12">
      <nav aria-label="Docs" className="body-6 w-full shrink-0 md:w-48">
        <Link href="/" className="title-3 mb-6 block">
          Calmponent
        </Link>
        <TreeNodes nodes={source.pageTree.children} />
      </nav>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
