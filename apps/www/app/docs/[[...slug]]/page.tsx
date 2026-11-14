import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/components/mdx"
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

  return (
    <article className="max-w-none">
      <h1 className="heading-4">{page.data.title}</h1>
      {page.data.description ? (
        <p className="body-3 mt-2 text-muted-foreground">
          {page.data.description}
        </p>
      ) : null}
      <div className="body-3 mt-8 space-y-4">
        <MDX components={mdxComponents} />
      </div>
    </article>
  )
}
