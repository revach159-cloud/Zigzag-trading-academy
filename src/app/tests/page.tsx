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
        מבחני הבנה לפרקים ולשיטה. ציון הוא השלמת לימוד בלבד — לא תעודת מיומנות
        מסחר ולא הבטחת תשואה. שאלות ידע כבר משולבות בסוף כל פרק ובדפי השיטה.
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        <li>
          <Link
            href="/textbook/final-examination"
            className="text-[var(--zz-cyan)] hover:underline"
          >
            פרק 12 — בחינה מסכמת
          </Link>
        </li>
        <li>
          <Link href="/textbook" className="text-[var(--zz-cyan)] hover:underline">
            כל פרקי ספר הלימוד
          </Link>
        </li>
      </ul>
      <div className="mt-6 border border-dashed border-[var(--zz-line)] bg-[var(--zz-panel)]/30 p-8 text-center text-sm text-[var(--zz-muted)]">
        מודול מבחנים מרוכז יתווסף בשלב ייעודי; בינתיים השתמשו בשאלות שבפרקים.
        <div className="mt-3">
          <SimDisclaimer compact />
        </div>
      </div>
    </main>
  );
}
