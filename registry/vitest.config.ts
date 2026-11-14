import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    // Registry files use the shadcn aliases that users' projects have.
    alias: [
      {
        find: /^@\/components\/ui\//,
        replacement: fileURLToPath(new URL("./ui/", import.meta.url)),
      },
      {
        find: /^@\/lib\//,
        replacement: fileURLToPath(new URL("./lib/", import.meta.url)),
      },
    ],
  },
  test: {
    environment: "happy-dom",
  },
})
