import type { Node } from "fumadocs-core/page-tree"
import Link from "next/link"
import type { ReactNode } from "react"
import { source } from "@/lib/source"

function TreeNodes({ nodes }: { nodes: Node[] }) {
  return (
    <ul className="space-y-1">
      {nodes.map((node) => {
        if (node.type === "page") {
          return (
            <li key={node.url}>
              <Link href={node.url} className="hover:underline">
                {node.name}
              </Link>
            </li>
          )
        }
        if (node.type === "folder") {
          return (
            <li key={node.$id ?? String(node.name)} className="pt-2">
              <span className="font-medium">{node.name}</span>
              <div className="pl-3">
                <TreeNodes nodes={node.children} />
              </div>
            </li>
          )
        }
        return (
          <li
            key={node.$id ?? String(node.name)}
            className="pt-4 text-neutral-500"
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
    <div className="mx-auto flex max-w-5xl gap-12 px-6 py-12">
      <nav aria-label="Docs" className="w-48 shrink-0 text-sm">
        <Link href="/" className="mb-6 block font-semibold">
          Calmponent
        </Link>
        <TreeNodes nodes={source.pageTree.children} />
      </nav>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
