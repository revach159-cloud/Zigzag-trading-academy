import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Orbitron, Rubik } from "next/font/google";
import { AcademyShell } from "@/components/layout/academy-shell";
import { brand } from "@/lib/design/tokens";
import { listAppendices, listChapters } from "@/lib/content/manuscript/catalog";
import type { BookTocItem } from "@/components/layout/book-shell";
import "./globals.css";

/**
 * Rubik — primary Hebrew + Latin system (OFL via next/font).
 * ExtraBold/Bold titles · SemiBold headings · Medium UI · Regular body · Light sparingly.
 * Black (900) reserved for TOC display titles.
 */
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

/**
 * Orbitron — geometric ExtraBold/Black for TOC chapter numerals only (Latin digits).
 * Hebrew reading stays on Rubik.
 */
const orbitron = Orbitron({
  variable: "--font-toc-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
  preload: false,
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

function buildBookToc(): { toc: BookTocItem[]; unitCount: number } {
  const chapters = listChapters();
  const appendices = listAppendices();
  const toc: BookTocItem[] = [
    ...chapters.map((chapter) => ({
      slug: chapter.slug,
      numberLabelHe: chapter.numberLabelHe,
      titleHe: chapter.titleHe,
      kind: chapter.kind as "opening" | "chapter",
    })),
    ...appendices.map((appendix) => ({
      slug: appendix.slug,
      numberLabelHe: "נספח",
      titleHe: appendix.titleHe,
      kind: "appendix" as const,
    })),
  ];
  return { toc, unitCount: chapters.length };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { toc, unitCount } = buildBookToc();

  return (
    <html
      lang="he"
      dir="rtl"
      className={`${rubik.variable} ${orbitron.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <AcademyShell bookToc={toc} bookUnitCount={unitCount}>
          {children}
        </AcademyShell>
      </body>
    </html>
  );
}
