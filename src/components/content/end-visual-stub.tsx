import type { EndVisual } from "@/lib/content/manuscript/types";

const KIND_HINTS: Record<string, string> = {
  "philosophy-compare": "הסוחר הרגיל מול סוחר ZIGZAG",
  "chase-vs-plan": "רדיפת מחיר מול תוכנית ניהול מוכנה",
  "zigzag-history": "היסטוריית מחיר בזיגזג לבדיקת עקבות",
  "capital-allocation": "סימולטור תקציב עסקה (הנחות איוריות)",
  "long-ladder": "סולם Long מדורג — חיזוק מתוכנן מול קנייה רגשית",
  "avg-entry-calculator": "מחשבון מחיר כניסה ממוצע",
  "qty-cascade-75": "מפל כמות 100→25→6.25→1.5625",
  "leverage-stages": "שלבי מינוף ×1 / ×10 / max מאומת",
  "portfolio-correlation": "סיכון תיק במתאם בין פוזיציות",
  "emotion-vs-discipline": "רגש מול משמעת מול אותו מסך",
  "journal-to-research": "יומן מסחר → נתוני מחקר",
  "hypothetical-analytics": "דשבורד אנליטיקה עם תווית HYPOTHETICAL",
};

export function EndVisualStub({
  endVisual,
}: {
  endVisual: EndVisual;
}) {
  const hint = KIND_HINTS[endVisual.kind] ?? endVisual.concept;
  const incomplete =
    endVisual.status === "stub_incomplete" ||
    endVisual.status === "wired_incomplete";

  return (
    <section
      id="end-visual"
      className="mt-16 border-y border-[var(--zz-line)] bg-[radial-gradient(ellipse_at_50%_0%,rgba(46,230,255,0.08),transparent_55%),rgba(7,11,22,0.45)] px-4 py-10 sm:px-6"
      aria-label={endVisual.labelHe}
    >
      <p className="text-xs font-medium tracking-[0.28em] text-[var(--zz-cyan)]">
        {endVisual.labelHe}
      </p>
      <h2 className="mt-3 text-2xl font-bold text-[var(--zz-ink)]">
        {hint}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--zz-muted)]">
        {endVisual.concept}
      </p>
      <p
        dir="ltr"
        className="ltr-isolate mt-3 text-xs tracking-[0.04em] text-[var(--zz-muted)]"
      >
        slot: {endVisual.slotId} · kind: {endVisual.kind}
      </p>
      {incomplete ? (
        <p className="mt-5 inline-block border border-[var(--zz-gold)]/40 px-3 py-1.5 text-xs font-medium text-[var(--zz-gold)]">
          stub_incomplete — ההמחשה האינטראקטיבית המלאה טרם הושלמה (Phase 6–7)
        </p>
      ) : null}
      <div
        className="mt-8 grid h-40 place-items-center border border-dashed border-[var(--zz-line)] text-sm text-[var(--zz-muted)]"
        aria-hidden
      >
        רכיב אינטראקטיבי · מקום שמור
      </div>
    </section>
  );
}
