import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Heebo, IBM_Plex_Mono, Syne } from "next/font/google";
import { AcademyShell } from "@/components/layout/academy-shell";
import { brand } from "@/lib/design/tokens";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
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
  description:
    "אקדמיית מסחר ZigZag — לימוד וסימולציה בלבד. Master the System. Understand the Risk.",
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
      className={`${heebo.variable} ${syne.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AcademyShell>{children}</AcademyShell>
      </body>
    </html>
  );
}
