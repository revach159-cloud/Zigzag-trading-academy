"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SimDisclaimer } from "./sim-disclaimer";
import { SiteHeader } from "./site-header";
import { BookShell, type BookTocItem } from "./book-shell";

type AcademyShellProps = {
  children: ReactNode;
  bookToc: BookTocItem[];
  bookUnitCount: number;
};

export function AcademyShell({
  children,
  bookToc,
  bookUnitCount,
}: AcademyShellProps) {
  const pathname = usePathname();
  const isBookRoute = pathname === "/textbook" || pathname?.startsWith("/textbook/");

  if (isBookRoute) {
    return (
      <BookShell toc={bookToc} totalUnits={bookUnitCount}>
        {children}
      </BookShell>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[var(--zz-void)] text-[var(--zz-ink)]">
      <SimDisclaimer />
      <SiteHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <footer className="border-t border-[var(--zz-line)] px-4 py-6 text-center text-xs text-[var(--zz-muted)]">
        <p>ZIGZAG TRADING ACADEMY · מוצר עצמאי · סימולציה בלבד</p>
        <p className="mt-1">
          אין קשר ל־Polymarket Edge Lab · אין מסחר אמיתי או ביצועי עבר מבוימים
        </p>
      </footer>
    </div>
  );
}
