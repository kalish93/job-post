import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
// <CHANGE> Import Navigation component to show globally
import { Navigation } from "@/components/shared/navigation"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
// <CHANGE> Add Inter and Poppins for better typography
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ 
  weight: ["400", "500", "600", "700", "800"], 
  subsets: ["latin"],
  variable: "--font-poppins" 
})

export const metadata: Metadata = {
  title: "JobConnect Ethiopia - Find Jobs & Talent",
  description:
    "The leading platform connecting skilled candidates with employers across Ethiopia. Post jobs, find talent, and grow your career.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* <CHANGE> Add font variables for Inter and Poppins */}
      <body className={`font-sans antialiased ${inter.variable} ${poppins.variable}`}>
        {/* <CHANGE> Add Navigation to all pages */}
        <Navigation />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
