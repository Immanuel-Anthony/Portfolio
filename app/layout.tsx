import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { PlayerProvider } from "@/components/PlayerProvider"; // ✅ Import PlayerProvider
import { PlayerBar } from "@/components/player-bar"; // ✅ Import PlayerBar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Developer Portfolio | Spotify Inspired",
  description: "A developer portfolio inspired by Spotify's web interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PlayerProvider> {/* ✅ Wrap everything inside PlayerProvider */}
            {children}  {/* Pages load here */}
            <PlayerBar /> {/* ✅ Now the player persists across page changes */}
          </PlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
