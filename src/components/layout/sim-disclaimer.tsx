export function SimDisclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-[11px] tracking-wide text-[var(--zz-muted)]">
        סימולציה בלבד · לא מסחר אמיתי
      </p>
    );
  }

  return (
    <aside
      className="border-b border-[var(--zz-line)] bg-[var(--zz-navy)]/80 px-4 py-2 text-center text-xs text-[var(--zz-muted)] backdrop-blur-sm"
      role="note"
      aria-label="הצהרת סימולציה"
    >
      <span className="text-[var(--zz-gold)]">סימולציה ולימוד בלבד</span>
      {" · "}
      אין מסחר אמיתי, הפקדות, או הבטחות תשואה
      {" · "}
      <span dir="ltr" className="ltr-isolate font-mono text-[10px]">
        Simulation only: not real trading
      </span>
    </aside>
  );
}
