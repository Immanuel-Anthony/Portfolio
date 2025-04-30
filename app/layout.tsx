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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}