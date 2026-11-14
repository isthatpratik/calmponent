/**
 * The public URL of the site. Hosting is open decision D14, so it comes from
 * NEXT_PUBLIC_SITE_URL and falls back to localhost until a domain is chosen.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "")

export const site = {
  name: "Calmponent",
  description:
    "Finished components for shadcn/ui. Every state designed, every motion with a reason, built on Base UI.",
  repo: "https://github.com/isthatpratik/calmponent",
}
