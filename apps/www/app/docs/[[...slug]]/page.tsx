import { getBreadcrumbItems } from "fumadocs-core/breadcrumb"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/components/mdx"
import { PageActions } from "@/components/page-actions"
import { TableOfContents } from "@/components/toc"
import { toPlainMarkdown } from "@/lib/markdown"
import { source } from "@/lib/source"

export const dynamicParams = false

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const { slug } = await props.params
  const page = source.getPage(slug)
  if (!page) notFound()
  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export default async function DocPage(props: PageProps<"/docs/[[...slug]]">) {
  const { slug } = await props.params
  const page = source.getPage(slug)
  if (!page) notFound()
  const MDX = page.data.body
  const markdown = await page.data.getText("processed")
  const crumbs = getBreadcrumbItems(page.url, source.pageTree, {
    includePage: false,
  })

  const section =
    crumbs.length > 0 ? String(crumbs[crumbs.length - 1]?.name) : "Docs"
  const siblings = page.url.split("/").slice(0, -1).join("/")
  const number = source
    .getPages()
    .filter((entry) => entry.url.split("/").slice(0, -1).join("/") === siblings)
    .sort((x, y) => x.url.localeCompare(y.url))
    .findIndex((entry) => entry.url === page.url)

  return (
    <div className="flex gap-12 px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
      <article className="min-w-0 flex-1">
        <header className="flex flex-col gap-4 border-border/60 border-b pb-8">
          <span className="caption-5 font-mono text-muted-foreground uppercase tracking-wider">
            {section}
            {number >= 0 ? ` · ${String(number + 1).padStart(2, "0")}` : ""}
          </span>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h1 className="heading-4 text-foreground">{page.data.title}</h1>
            <PageActions
              markdown={toPlainMarkdown(
                `# ${page.data.title}\n\n${page.data.description ?? ""}\n\n${markdown}`,
              )}
              title={page.data.title}
            />
          </div>
          {page.data.description ? (
            <p className="body-3 max-w-[60ch] text-pretty text-muted-foreground">
              {page.data.description}
            </p>
          ) : null}
        </header>
        <div className="body-3 mt-10 flex flex-col gap-6">
          <MDX components={mdxComponents} />
        </div>
      </article>
      <aside className="hidden w-48 shrink-0 xl:block">
        <TableOfContents items={page.data.toc} />
      </aside>
    </div>
  )
}
