/**
 * Turns a page's processed Markdown into clean text for AI tools:
 * install components become commands, live demos are dropped, and
 * heading anchors are removed.
 */
export function toPlainMarkdown(markdown: string): string {
  return (
    markdown
      .replace(
        /<InstallCommand item="([^"]+)" \/>/g,
        "```bash\nnpx shadcn@latest add $1\n```",
      )
      // Showcase sections become a small heading with their description.
      .replace(
        /<Example title="([^"]*)"(?: description="([^"]*)")?[^>]*>[\s\S]*?<\/Example>/g,
        (_, title: string, description?: string) =>
          description ? `### ${title}\n\n${description}` : `### ${title}`,
      )
      .replace(/^[ \t]*<[A-Z][A-Za-z]*\s*\/>\n?\n?/gm, "")
      .replace(/^(#{1,6} .+?) \[#[\w-]+\]$/gm, "$1")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  )
}
