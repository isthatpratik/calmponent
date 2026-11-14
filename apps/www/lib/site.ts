/**
 * The public URL of the site. Hosting is open decision D14, so it comes from
 * NEXT_PUBLIC_SITE_URL and falls back to localhost until a domain is chosen.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "")

export const site = {
  name: "Calmponent",
  title: "Calmponent: React UI library for shadcn/ui and Tailwind CSS",
  description:
    "Calmponent is an open-source React UI library for shadcn/ui and Tailwind CSS. Accessible, animated components with loading, success, error, and empty states built in, on Base UI.",
  keywords: [
    "React UI library",
    "React component library",
    "shadcn/ui components",
    "Tailwind CSS components",
    "Base UI",
    "accessible React components",
    "animated React components",
    "Next.js components",
    "form components",
    "open source UI library",
  ],
  repo: "https://github.com/isthatpratik/calmponent",
}
