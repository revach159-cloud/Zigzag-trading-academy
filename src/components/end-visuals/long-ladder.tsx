"use client";

import { useMemo, useState } from "react";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import { zigzagAssumptions } from "@/lib/math/assumptions";
import { d, formatUsd, ladderPrice, wouldRejectMargin } from "@/lib/math/decimal";
import { cn } from "@/lib/utils/cn";

const REF = 1.0;
const PATTERN = zigzagAssumptions.illustrativeReinforcementPatternUsd;

export function LongLadder({ endVisual }: { endVisual: EndVisual }) {
  const [mode, setMode] = useState<"planned" | "emotional">("planned");
  const [active, setActive] = useState(0);

  const rows = useMemo(() => {
    let cumulative = d(0);
    return PATTERN.map((alloc, i) => {
      const price = ladderPrice(REF, i);
      const nextReject = wouldRejectMargin(cumulative, alloc);
      const accepted = !nextReject;
      if (accepted) cumulative = cumulative.plus(alloc);
      return {
        i,
        alloc,
        price,
        accepted,
        cumulative: cumulative.toNumber(),
      };
    });
  }, []);

  return (
    <EndVisualShell endVisual={endVisual}>
      <div className="flex gap-2">
        {(
          [
            ["planned", "חיזוק מתוכנן"],
            ["emotional", "קנייה רגשית"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={cn(
              "flex-1 border px-3 py-2 text-sm",
              mode === id
                ? "border-[var(--zz-cyan)] text-[var(--zz-cyan)]"
                : "border-[var(--zz-line)] text-[var(--zz-muted)]",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-[var(--zz-muted)]">
        {mode === "planned"
          ? "סולם Long מ־מחיר ייחוס · Touch · דילוגים מתועדים · תקרת $250 Reject."
          : "קנייה רגשית מתעלמת מרמות ומכפילה בלי תיעוד — מסוכן פדגוגית."}
      </p>

      <ol className="mt-4 space-y-2">
        {rows.map((row) => (
          <li key={row.i}>
            <button
              type="button"
              onClick={() => setActive(row.i)}
              className={cn(
                "flex w-full items-center justify-between gap-3 border px-3 py-2 text-start text-sm",
                active === row.i
                  ? "border-[var(--zz-gold)]/50 bg-[rgba(201,168,76,0.08)]"
                  : "border-[var(--zz-line)]",
                mode === "emotional" && "opacity-70",
              )}
            >
              <span>
                L{row.i} ·{" "}
                <span dir="ltr" className="ltr-isolate font-mono">
                  {formatUsd(row.price, 4)}
                </span>
              </span>
              <span dir="ltr" className="ltr-isolate font-mono text-[var(--zz-muted)]">
                +{formatUsd(row.alloc, 0)}
              </span>
              <span
                className={
                  mode === "planned"
                    ? row.accepted
                      ? "text-[var(--zz-emerald)]"
                      : "text-[var(--zz-danger)]"
                    : "text-[var(--zz-danger)]"
                }
              >
                {mode === "emotional"
                  ? "דחף"
                  : row.accepted
                    ? "מתוכנן"
                    : "Reject"}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs leading-6 text-[var(--zz-gold)]">
        דפוס הכפלה איורי מסתכם ב־$320 — תחת הכללים המאושרים, חיזוק שחורג מ־$250
        נדחה (Reject). אין לערבב את האיור עם התקרה.
      </p>
    </EndVisualShell>
  );
}
