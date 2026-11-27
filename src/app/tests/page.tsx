import type { Metadata } from "next";
import Link from "next/link";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";

export const metadata: Metadata = {
  title: "מבחני ידע",
};

export default function TestsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)]">
        מבחני ידע
      </h1>
      <p className="mt-4 text-[var(--zz-muted)]">
        ספר LOOKBACK הוא מסע נרטיבי — בלי חידוני אמריקאי. להרהור ולמשמעת השתמשו
        בשאלות ההרהור שבכל תחנה ובדפי השיטה. ציון אינו תעודת מסחר ואינו הבטחת
        תשואה.
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        <li>
          <Link
            href="/textbook/clear-disclaimer"
            className="text-[var(--zz-cyan)] hover:underline"
          >
            תחנה 13 — הצהרה ברורה
          </Link>
        </li>
        <li>
          <Link
            href="/textbook/practical-reference"
            className="text-[var(--zz-cyan)] hover:underline"
          >
            תחנה 12 — מדריך מעשי
          </Link>
        </li>
        <li>
          <Link href="/textbook" className="text-[var(--zz-cyan)] hover:underline">
            מפת מסע LOOKBACK
          </Link>
        </li>
      </ul>
      <div className="mt-6 border border-dashed border-[var(--zz-line)] bg-[var(--zz-panel)]/30 p-8 text-center text-sm text-[var(--zz-muted)]">
        מודול מבחנים מרוכז אינו חלק מספר Lookback הנרטיבי; המסע מחליף חידונים
        בהרהור ובמשמעת LOOKBACK.
        <div className="mt-3">
          <SimDisclaimer compact />
        </div>
      </div>
    </main>
  );
}
