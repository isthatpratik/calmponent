import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Registry source is plain TypeScript in a workspace package.
  transpilePackages: ["@calmponent/registry"],
  // Every docs page is also available as Markdown at /docs/<page>.md.
  async rewrites() {
    return [
      { source: "/docs.md", destination: "/llms.mdx" },
      { source: "/docs/:path*.md", destination: "/llms.mdx/:path*" },
    ]
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)
