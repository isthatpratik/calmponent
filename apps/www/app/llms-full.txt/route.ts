import { toPlainMarkdown } from "@/lib/markdown"
import { site } from "@/lib/site"
import { source } from "@/lib/source"

export const dynamic = "force-static"

/** Every docs page as clean Markdown, in one file. */
export async function GET() {
  const pages = source.getPages().sort((a, b) => a.url.localeCompare(b.url))
  const parts = await Promise.all(
    pages.map(async (page) =>
      toPlainMarkdown(
        `# ${page.data.title}\n\n${page.data.description ?? ""}\n\n${await page.data.getText("processed")}`,
      ),
    ),
  )
  const body = [`# ${site.name}\n\n> ${site.description}`, ...parts].join(
    "\n\n---\n\n",
  )
  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
