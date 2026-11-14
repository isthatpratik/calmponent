import { site, siteUrl } from "@/lib/site"
import { source } from "@/lib/source"

export const dynamic = "force-static"

/** An index of the docs for AI tools, following the llms.txt proposal. */
export function GET() {
  const pages = source.getPages().sort((a, b) => a.url.localeCompare(b.url))
  const groups = new Map<string, string[]>()
  for (const page of pages) {
    const group = page.url.startsWith("/docs/components/")
      ? "Components"
      : "Docs"
    const line = `- [${page.data.title}](${siteUrl}${page.url}.md): ${page.data.description ?? ""}`
    groups.set(group, [...(groups.get(group) ?? []), line])
  }
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Install any component with the shadcn CLI, for example `npx shadcn@latest add isthatpratik/calmponent/button`. Components keep the shadcn/ui names. Every page below is available as Markdown.",
    "",
    ...[...groups].flatMap(([group, lines]) => [
      `## ${group}`,
      "",
      ...lines,
      "",
    ]),
    "## Optional",
    "",
    `- [Full docs in one file](${siteUrl}/llms-full.txt)`,
    `- [Source code](${site.repo})`,
    "",
  ].join("\n")
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
