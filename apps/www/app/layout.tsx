import { Toaster } from "@calmponent/registry/ui/toast"
import type { Metadata, Viewport } from "next"
import {
  Geist,
  Geist_Mono,
  Host_Grotesk,
  IBM_Plex_Sans,
  Instrument_Sans,
  Manrope,
} from "next/font/google"
import Script from "next/script"
import type { ReactNode } from "react"
import { themeScript } from "@/components/theme-toggle"
import { site, siteUrl } from "@/lib/site"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

// Customizer fonts. Their files download only when a visitor picks one.
const host = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host",
  preload: false,
})
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  preload: false,
})
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  preload: false,
})
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: "%s | Calmponent",
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: "Pratik Desai", url: "https://github.com/isthatpratik" }],
  creator: "Pratik Desai",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${host.variable} ${manrope.variable} ${instrument.variable} ${plex.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies the saved theme and look before the first paint. */}
        <Script id="calmponent-theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
