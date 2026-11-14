import { ImageResponse } from "next/og"
import { OgCard } from "@/components/og-card"

export const alt = "Calmponent, the React UI library with every state built in"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Open-source React UI library"
      title="The React UI library with every state built in"
      description="Accessible, animated components for shadcn/ui and Tailwind CSS, built on Base UI."
    />,
    size,
  )
}
