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
      "תקציב עסקה מצטבר",
      `תקרה ${zigzagAssumptions.perPositionMarginCapUsd}$ Reject`,
      "מעבר ל־×10 לפי תקרת תקציב — לא לפי הפסד כטריגר",
      "כמות קיימת נשמרת במעבר",
    ],
  },
  {
    id: "x10",
    label: "×10",
    title: "שלב מורחב",
    points: [
      "חיזוק כשההפסד נטו ≥ מרג׳ין מוקצה רלוונטי",
      "תקרת מרג׳ין מצטברת $250",
      "כשהחיזוק הבא נדחה — מעבר למינוף מקסימלי מאומת בלבד",
      "מינוף אינו מסיר סיכון פירוק",
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
      "תקרת מרג׳ין $250 נשמרת",
      "אין הבטחה למשיכת הון או מניעת פירוק",
    ],
  },
] as const;

export function LeverageStages({ endVisual }: { endVisual: EndVisual }) {
  const [stage, setStage] = useState<(typeof STAGES)[number]["id"]>("x1");
  const current = STAGES.find((s) => s.id === stage)!;

  return (
    <EndVisualShell endVisual={endVisual}>
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
          תקציב ≠ בטוחה
        </div>
        <div className="border border-[var(--zz-danger)]/40 p-2 text-[var(--zz-danger)]">
          מינוף ≠ ביטוח
        </div>
      </div>
    </EndVisualShell>
  );
}
