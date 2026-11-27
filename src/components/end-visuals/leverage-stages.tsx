"use client";

import { useState } from "react";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import { zigzagAssumptions } from "@/lib/math/assumptions";
import { cn } from "@/lib/utils/cn";

const STAGES = [
  {
    id: "x1",
    label: "×1",
    title: "שלב בסיס",
    points: [
      "תקציב עסקה מצטבר מדורג (51.2 × כניסה)",
      `דוגמה: $${zigzagAssumptions.defaultExampleTradeBudgetUsd} Reject בתיק $10k / $2,560 בתיק $100k`,
      "מעבר ל־×10 לפי תקרת תקציב שלב ×1 — לא לפי הפסד כטריגר",
      "כמות קיימת נשמרת במעבר ×1→×10",
    ],
  },
  {
    id: "x10",
    label: "×10",
    title: "שלב מורחב",
    points: [
      "חיזוק כשההפסד נטו ≥ מרג׳ין רלוונטי",
      "אותו תקציב מדורג נשמר ל־Reject",
      "כשהחיזוק הבא נדחה — מעבר למינוף מקסימלי מאומת בלבד",
      "×10→×1 הוא תהליך נפרד: אחרי מימוש וצמצום גודל, בכפוף למרג׳ין/ביטחונות",
      "מינוף אינו מסיר סיכון פירוק ואינו משחרר collateral אוטומטית",
    ],
  },
  {
    id: "max",
    label: "max",
    title: "מינוף מקסימלי",
    points: [
      "רק מנתוני מכשיר Bybit מאומתים",
      zigzagAssumptions.maxInstrumentLeverage == null
        ? "סטטוס נוכחי: לא מאומת (null) — אין להמציא מספר"
        : `מאומת: ×${zigzagAssumptions.maxInstrumentLeverage}`,
      "תקציב העסקה המדורג נשמר",
      "אין הבטחה למשיכת הון או מניעת פירוק",
    ],
  },
] as const;

export function LeverageStages({ endVisual }: { endVisual: EndVisual }) {
  const [stage, setStage] = useState<(typeof STAGES)[number]["id"]>("x1");
  const current = STAGES.find((s) => s.id === stage)!;

  return (
    <EndVisualShell endVisual={endVisual}>
      <p className="mb-3 text-xs leading-6 text-[var(--zz-muted)]">
        שני תהליכים נפרדים: ×1→×10 (תקציבי) ו־×10→×1 (אחרי מימוש וצמצום) — לא מתג ×1↔×10.
      </p>
      <div className="flex gap-2" role="tablist" aria-label="שלבי מינוף">
        {STAGES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={stage === s.id}
            onClick={() => setStage(s.id)}
            className={cn(
              "flex-1 border px-3 py-2 font-mono text-sm",
              stage === s.id
                ? "border-[var(--zz-gold)] bg-[rgba(201,168,76,0.12)] text-[var(--zz-gold)]"
                : "border-[var(--zz-line)] text-[var(--zz-muted)]",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold">{current.title}</h3>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--zz-muted)]">
          {current.points.map((p) => (
            <li key={p}>· {p}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] text-[var(--zz-muted)]">
        <div className="border border-[var(--zz-emerald)]/40 p-2 text-[var(--zz-emerald)]">
          מרג׳ין ≠ notional
        </div>
        <div className="border border-[var(--zz-cyan)]/40 p-2 text-[var(--zz-cyan)]">
          מינוף ≠ גודל
        </div>
        <div className="border border-[var(--zz-danger)]/40 p-2 text-[var(--zz-danger)]">
          מינוף ≠ ביטוח
        </div>
      </div>
    </EndVisualShell>
  );
}
