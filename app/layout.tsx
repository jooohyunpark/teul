import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/site/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://teul.joohyun.dev"),
  title: "Teul — an opinionated grid system for React and Tailwind",
  description:
    "A copy-paste 12-column grid for React and Tailwind. Type-safe, responsive, zero dependencies.",
  openGraph: {
    title: "Teul — an opinionated grid system for React and Tailwind",
    description:
      "A copy-paste 12-column grid for React and Tailwind. Type-safe, responsive, zero dependencies.",
    url: "https://teul.joohyun.dev",
    siteName: "Teul",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Teul — an opinionated grid system for React and Tailwind",
    description:
      "A copy-paste 12-column grid for React and Tailwind. Type-safe, responsive, zero dependencies.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
