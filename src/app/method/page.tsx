import type { Metadata } from "next";
import { zigzagAssumptions } from "@/lib/math/assumptions";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";

export const metadata: Metadata = {
  title: "מתודולוגיית ZigZag",
};

export default function MethodPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.25em] text-[var(--zz-gold)] uppercase">
        Method
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)] sm:text-4xl">
        מתודולוגיית ZigZag
      </h1>
      <p className="mt-4 text-[var(--zz-muted)]">
        דפי השיטה יסבירו חיזוקים (
        <span dir="ltr" className="ltr-isolate">
          reinforcement
        </span>
        ), מעברי 1x↔10x, ומימוש רווח — לפי כללים שיאושרו על ידי הבעלים. להלן
        טיוטת ברירות מחדל בלבד.
      </p>
      <div className="mt-3">
        <SimDisclaimer compact />
      </div>

      <dl className="mt-10 space-y-4 border border-[var(--zz-line)] bg-[var(--zz-panel)]/40 p-5 text-sm">
        <div>
          <dt className="text-[var(--zz-cyan)]">סטטוס</dt>
          <dd className="mt-1 font-mono text-[var(--zz-muted)]" dir="ltr">
            {zigzagAssumptions.status}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--zz-cyan)]">מצב גודל Reinforcement</dt>
          <dd className="mt-1 font-mono text-[var(--zz-muted)]" dir="ltr">
            {zigzagAssumptions.reinforcementSizingMode}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--zz-cyan)]">מרווח מהלך שלילי (הצעה)</dt>
          <dd className="mt-1 text-[var(--zz-muted)]">
            {zigzagAssumptions.adverseMoveIntervalPct}% — ממתין לאישור
          </dd>
        </div>
        <div>
          <dt className="text-[var(--zz-cyan)]">מינוף לימודי מרבי (הצעה)</dt>
          <dd className="mt-1 text-[var(--zz-muted)]">
            {zigzagAssumptions.maxEducationalLeverage}x
          </dd>
        </div>
        <div>
          <dt className="text-[var(--zz-cyan)]">מימוש רווח (הצעה)</dt>
          <dd className="mt-1 text-[var(--zz-muted)]">
            {zigzagAssumptions.profitRealizationPct}% — פרשנות קנונית ממתינה
            לאישור
          </dd>
        </div>
      </dl>
    </main>
  );
}
