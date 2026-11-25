import type { Metadata } from "next";
import Link from "next/link";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";

export const metadata: Metadata = {
  title: "מעבדת מינוף ופוזיציה",
};

export default function LeverageLabPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)]">
        מעבדת מינוף ופוזיציה
      </h1>
      <p className="mt-4 text-[var(--zz-muted)]">
        תרגילי 1x מול 10x — פוזיציה נפרדת לעומת שינוי מינוף על קיימת אינם
        שקולים. מנוע התרגיל יבוא אחרי אישור המתודולוגיה.
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        <li>
          <Link
            href="/textbook/traffic-light"
            className="text-[var(--zz-cyan)] hover:underline"
          >
            תחנה 4 — רמזור הניהול
          </Link>
        </li>
        <li>
          <Link
            href="/method/leverage"
            className="text-[var(--zz-cyan)] hover:underline"
          >
            דף שיטה — 1x↔10x
          </Link>
        </li>
        <li>
          <Link href="/labs/risk" className="text-[var(--zz-cyan)] hover:underline">
            למעבדת הסיכון ←
          </Link>
        </li>
      </ul>
      <div className="mt-6">
        <SimDisclaimer compact />
      </div>
    </main>
  );
}
