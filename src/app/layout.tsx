import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Frank_Ruhl_Libre,
  Heebo,
  IBM_Plex_Mono,
  Outfit,
  Rubik,
} from "next/font/google";
import { AcademyShell } from "@/components/layout/academy-shell";
import { brand } from "@/lib/design/tokens";
import "./globals.css";

/** Body: Rubik — Hebrew + Latin, OFL */
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

/** Secondary Hebrew UI */
const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

/**
 * Distinctive Hebrew display — Frank Ruhl Libre (OFL).
 * Literary editorial presence for chapter openings; pairs with Outfit for Latin brand.
 */
const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

/** Display / brand Latin — Outfit (OFL) */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
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
      className={`${rubik.variable} ${heebo.variable} ${frankRuhl.variable} ${outfit.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AcademyShell>{children}</AcademyShell>
      </body>
    </html>
  );
}
