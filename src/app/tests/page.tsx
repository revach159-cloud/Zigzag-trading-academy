import type { Metadata } from "next";
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
        מסחר ולא הבטחת תשואה.
      </p>
      <div className="mt-6 border border-dashed border-[var(--zz-line)] bg-[var(--zz-panel)]/30 p-8 text-center text-sm text-[var(--zz-muted)]">
        מודול המבחנים יתווסף בשלב ייעודי.
        <div className="mt-3">
          <SimDisclaimer compact />
        </div>
      </div>
    </main>
  );
}
