"use client"

import { AnchorProvider, TOCItem, type TOCItemType } from "fumadocs-core/toc"

/** "On this page": the current section is marked as you scroll. */
export function TableOfContents({ items }: { items: TOCItemType[] }) {
  if (items.length === 0) return null
  return (
    <AnchorProvider toc={items} single>
      <nav aria-label="On this page" className="sticky top-24">
        <p className="caption-3 mb-3 text-muted-foreground">On this page</p>
        <ul className="body-6 space-y-2 border-border border-l">
          {items.map((item) => (
            <li key={item.url}>
              <TOCItem
                href={item.url}
                style={{ paddingLeft: `${(item.depth - 2) * 12 + 12}px` }}
                className="-ml-px block border-transparent border-l text-muted-foreground transition-colors duration-200 ease-calm hover:text-foreground data-[active=true]:border-foreground data-[active=true]:text-foreground"
              >
                {item.title}
              </TOCItem>
            </li>
          ))}
        </ul>
      </nav>
    </AnchorProvider>
  )
}
