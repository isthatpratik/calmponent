import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Registry source is plain TypeScript in a workspace package.
  transpilePackages: ["@calmponent/registry"],
}

const withMDX = createMDX()

export default withMDX(nextConfig)
