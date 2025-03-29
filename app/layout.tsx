import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Developer Portfolio | Spotify Inspired",
  description: "A developer portfolio inspired by Spotify's web interface",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {/* ThemeProvider handles theme changes, suppressHydrationWarning avoids mismatch */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
