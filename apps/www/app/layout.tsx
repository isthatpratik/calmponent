import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Calmponent",
    template: "%s | Calmponent",
  },
  description:
    "Finished components for shadcn/ui. Every state designed, every motion with a reason.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-950 antialiased">{children}</body>
    </html>
  )
}
