import { defineConfig, defineDocs } from "fumadocs-mdx/config"

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    // Exposes each page as Markdown, for "Copy page" and AI tools.
    postprocess: { includeProcessedMarkdown: true },
  },
})

export default defineConfig()
