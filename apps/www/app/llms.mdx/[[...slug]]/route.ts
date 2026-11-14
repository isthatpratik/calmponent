import { notFound } from "next/navigation"
import { toPlainMarkdown } from "@/lib/markdown"
import { source } from "@/lib/source"

export const dynamic = "force-static"

/** One docs page as Markdown. Reached at /docs/<page>.md through a rewrite. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()
  const text = toPlainMarkdown(
    `# ${page.data.title}\n\n${page.data.description ?? ""}\n\n${await page.data.getText("processed")}`,
  )
  return new Response(`${text}\n`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}

export function generateStaticParams() {
  return source.generateParams()
}
