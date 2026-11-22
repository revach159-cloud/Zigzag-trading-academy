import type { ReactNode } from "react";
import { SimDisclaimer } from "./sim-disclaimer";
import { SiteHeader } from "./site-header";

export function AcademyShell({ children }: { children: ReactNode }) {
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
