import { getBreadcrumbItems } from "fumadocs-core/breadcrumb"
import type { Metadata } from "next"
import Link from "next/link"
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

  return (
    <div className="flex gap-12">
      <article className="min-w-0 flex-1">
        {crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="caption-2 mb-4">
            <ol className="flex items-center gap-2 text-muted-foreground">
              {crumbs.map((crumb) => (
                <li
                  key={String(crumb.url ?? crumb.name)}
                  className="flex items-center gap-2"
                >
                  {crumb.url ? (
                    <Link
                      href={crumb.url}
                      className="transition-colors duration-200 ease-calm hover:text-foreground"
                    >
                      {crumb.name}
                    </Link>
                  ) : (
                    <span>{crumb.name}</span>
                  )}
                  <span aria-hidden="true">/</span>
                </li>
              ))}
              <li aria-current="page" className="text-foreground">
                {page.data.title}
              </li>
            </ol>
          </nav>
        ) : null}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="heading-4">{page.data.title}</h1>
          <PageActions
            markdown={toPlainMarkdown(
              `# ${page.data.title}\n\n${page.data.description ?? ""}\n\n${markdown}`,
            )}
            title={page.data.title}
          />
        </div>
        {page.data.description ? (
          <p className="body-3 mt-2 text-muted-foreground">
            {page.data.description}
          </p>
        ) : null}
        <div className="body-3 mt-8 space-y-4">
          <MDX components={mdxComponents} />
        </div>
      </article>
      <aside className="hidden w-48 shrink-0 xl:block">
        <TableOfContents items={page.data.toc} />
      </aside>
    </div>
  )
}
