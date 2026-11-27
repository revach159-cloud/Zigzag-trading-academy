import type { EndVisual } from "@/lib/content/manuscript/types";
import type { ReactNode } from "react";

/** Hebrew display titles for end-visual H2s (UI chrome — not manuscript prose). */
const TITLE_HE: Record<string, string> = {
  "philosophy-compare": "הסוחר הרגיל מול סוחר ZIGZAG",
  "chase-vs-plan": "רדיפת מחיר מול תוכנית ניהול מוכנה",
  "zigzag-history": "היסטוריית מחיר בזיגזג לבדיקת עקבות",
  "capital-allocation": "סימולטור תקציב עסקה (הנחות איוריות)",
  "long-ladder": "סולם Long מדורג — חיזוק מתוכנן מול קנייה רגשית",
  "avg-entry-calculator": "מחשבון מחיר כניסה ממוצע",
  "qty-cascade-75": "מפל כמות אחרי מימוש 75%",
  "leverage-stages": "שלבי מינוף ×1 / ×10 / max מאומת",
  "portfolio-correlation": "סיכון תיק במתאם בין פוזיציות",
  "emotion-vs-discipline": "רגש מול משמעת מול אותו מסך",
  "journal-to-research": "יומן מסחר → נתוני מחקר",
  "hypothetical-analytics": "דשבורד אנליטיקה עם תווית HYPOTHETICAL",
};

export function EndVisualShell({
  endVisual,
  children,
  hypothetical = false,
}: {
  endVisual: EndVisual;
  children: ReactNode;
  hypothetical?: boolean;
}) {
  const titleHe = TITLE_HE[endVisual.kind] ?? endVisual.labelHe;

  return (
    <section
      id="end-visual"
      className="end-visual-shell mt-10 px-4 py-8 sm:px-6"
      aria-label={endVisual.labelHe}
      data-end-visual-kind={endVisual.kind}
      data-end-visual-status={endVisual.status}
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-medium tracking-[0.28em] text-[var(--zz-cyan)]">
            {endVisual.labelHe}
          </p>
          {hypothetical ? (
            <span className="hypothetical-badge" dir="ltr">
              HYPOTHETICAL
            </span>
          ) : null}
        </div>
        <h2 className="mt-3 text-2xl font-bold text-[var(--zz-ink)] sm:text-3xl">
          {titleHe}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--zz-muted)]">
          אינטראקטיבי ללימוד בלבד · אינו המלצת מסחר · אינו מבטיח תוצאה
        </p>
        <div className="end-visual-widget">{children}</div>
      </div>
    </section>
  );
}
