import type { Metadata } from "next";
import Link from "next/link";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";

export const metadata: Metadata = {
  title: "סימולטור אסטרטגיה",
};

export default function SimulatorPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)]">
        סימולטור אסטרטגיית ZigZag
      </h1>
      <p className="mt-4 text-[var(--zz-muted)]">
        שלד בלבד. הסימולטור יבנה על מנוע מתמטי מאושר וסדרות לימודיות — ללא
        ברוקרים, הפקדות, או נתוני ביצועים מבוימים.
      </p>
      <ul className="mt-4 space-y-2 text-sm text-[var(--zz-muted)]">
        <li>
          <Link
            href="/textbook/practical-reference"
            className="text-[var(--zz-cyan)] hover:underline"
          >
            תחנה 12 — מדריך מעשי
          </Link>
        </li>
        <li>
          <Link href="/method" className="text-[var(--zz-cyan)] hover:underline">
            דפי השיטה
          </Link>
        </li>
      </ul>
      <div className="mt-6 border border-dashed border-[var(--zz-line)] bg-[var(--zz-panel)]/30 p-8 text-center text-sm text-[var(--zz-muted)]">
        מנוע הסימולציה יתווסף בשלבים מאוחרים יותר.
        <div className="mt-3">
          <SimDisclaimer compact />
        </div>
      </div>
    </main>
  );
}
