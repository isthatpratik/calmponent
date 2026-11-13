import type { Metadata } from "next"
import { notFound } from "next/navigation"
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
      <h1 className="font-semibold text-3xl">{page.data.title}</h1>
      {page.data.description ? (
        <p className="mt-2 text-neutral-600">{page.data.description}</p>
      ) : null}
      <div className="mt-8 space-y-4 leading-7">
        <MDX />
      </div>
    </article>
  )
}
