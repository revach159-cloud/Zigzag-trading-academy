import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Rubik } from "next/font/google";
import { AcademyShell } from "@/components/layout/academy-shell";
import { brand } from "@/lib/design/tokens";
import "./globals.css";

/**
 * Rubik — primary Hebrew + Latin system (OFL via next/font).
 * ExtraBold/Bold titles · SemiBold headings · Medium UI · Regular body · Light sparingly.
 */
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

/** Numerals / code only — not body reading */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: brand.fullName,
    template: `%s · ${brand.name}`,
  },
  description: brand.supportHe,
  applicationName: brand.fullName,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${rubik.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AcademyShell>{children}</AcademyShell>
      </body>
    </html>
  );
}
