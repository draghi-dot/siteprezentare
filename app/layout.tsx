import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Stephanie Design | Graphic Designer Portfolio",
  description:
    "Portofoliul Stephaniei - Graphic Designer specializat în branding, logo design, print și materiale digitale. Transformăm idei în artă vizuală.",
  keywords: ["graphic designer", "branding", "logo design", "portofoliu", "design grafic", "România"],
  generator: 'v0.app',
  icons: {
    icon: '/logo.gif',
    shortcut: '/logo.gif',
    apple: '/logo.gif',
  },
  openGraph: {
    title: "Stephanie Design | Graphic Designer Portfolio",
    description: "Portofoliul Stephaniei - Graphic Designer specializat în branding, logo design, print și materiale digitale.",
    url: "https://stephdesign4u.vercel.app",
    siteName: "Stephanie Design",
    images: [
      {
        url: '/logo.gif',
        width: 1200,
        height: 630,
        alt: 'Stephanie Design Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Stephanie Design | Graphic Designer Portfolio",
    description: "Portofoliul Stephaniei - Graphic Designer specializat în branding, logo design, print și materiale digitale.",
    images: ['/logo.gif'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
