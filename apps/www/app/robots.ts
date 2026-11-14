import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

/** Open to every crawler, including AI agents; llms.txt is listed for them. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
