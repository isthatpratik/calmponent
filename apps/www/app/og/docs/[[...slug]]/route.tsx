import { notFound } from "next/navigation"
import { ImageResponse } from "next/og"
import { OgCard } from "@/components/og-card"
import { source } from "@/lib/source"

export const dynamic = "force-static"

/** The Open Graph image for one docs page, at /og/docs/<page>. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()
  const component = page.url.startsWith("/docs/components/")
  return new ImageResponse(
    <OgCard
      eyebrow={component ? "React component · Calmponent" : "Calmponent docs"}
      title={page.data.title}
      description={page.data.description ?? ""}
    />,
    { width: 1200, height: 630 },
  )
}

export function generateStaticParams() {
  return source.generateParams()
}
