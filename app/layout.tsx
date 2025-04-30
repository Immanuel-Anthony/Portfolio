// app/layout.tsx

// First, export metadata from the server component part
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Portfolio | Spotify Inspired",
  description: "A developer portfolio inspired by Spotify's web interface",
};

// Import fonts at the server level
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Then create a client component wrapper
import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
<<<<<<< HEAD
        <ClientLayout>{children}</ClientLayout>
=======

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PlayerProvider> {/* ✅ Wrap everything inside PlayerProvider */}
            {children}  {/* Pages load here */}
            <PlayerBar /> {/* ✅ Now the player persists across page changes */}
          </PlayerProvider>
        </ThemeProvider>
>>>>>>> 10d2de8fc05645403113187536ac3dcdef4e1728
      </body>
    </html>
  );
}