import type { Metadata } from "next";
import Link from "next/link";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";

export const metadata: Metadata = {
  title: "מעבדת סיכון",
};

export default function RiskLabPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)]">
        מעבדת סיכון
      </h1>
      <p className="mt-4 text-[var(--zz-muted)]">
        לחץ על הקצאת הון, חריגות סף, ומהלכים שליליים — סימולציה חינוכית בלבד.
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        <li>
          <Link
            href="/textbook/risk-management"
            className="text-[var(--zz-cyan)] hover:underline"
          >
            פרק 10 — ניהול סיכונים
          </Link>
        </li>
        <li>
          <Link
            href="/labs/leverage"
            className="text-[var(--zz-cyan)] hover:underline"
          >
            ← למעבדת המינוף
          </Link>
        </li>
      </ul>
      <div className="mt-6">
        <SimDisclaimer compact />
      </div>
    </main>
  );
}
