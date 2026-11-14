import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import { codeThemes } from "./lib/code-themes"

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    // Exposes each page as Markdown, for "Copy page" and AI tools.
    postprocess: { includeProcessedMarkdown: true },
  },
})

export default defineConfig({
  mdxOptions: {
    // Vercel-style syntax colors, shared with the Example code tabs.
    rehypeCodeOptions: { themes: codeThemes },
  },
})
