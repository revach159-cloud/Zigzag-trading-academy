"use client";

import { useMemo, useState } from "react";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import { zigzagAssumptions } from "@/lib/math/assumptions";
import { formatQty, qtyCascade } from "@/lib/math/decimal";

export function QtyCascade75({ endVisual }: { endVisual: EndVisual }) {
  const [steps, setSteps] = useState(3);
  const cascade = useMemo(() => qtyCascade(100, steps), [steps]);
  const closePct = zigzagAssumptions.profitRealization.pct;

  return (
    <EndVisualShell endVisual={endVisual}>
      <p className="text-sm text-[var(--zz-muted)]">
        מימוש ידני חוזר של {closePct}% מהכמות הנותרת · נשאר{" "}
        {zigzagAssumptions.profitRealization.remainingPct}% בכל שלב.
      </p>

      <label className="mt-4 block text-sm">
        מספר מימושים
        <input
          type="range"
          min={1}
          max={5}
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
          className="mt-2 w-full accent-[var(--zz-cyan)]"
        />
      </label>

      <div
        dir="ltr"
        className="ltr-isolate mt-5 flex flex-wrap items-end gap-3"
      >
        {cascade.map((qty, i) => {
          const height = Math.max(12, qty.toNumber() * 0.9);
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className="w-12 bg-gradient-to-t from-[rgba(46,230,255,0.15)] to-[rgba(46,230,255,0.55)]"
                style={{ height }}
                aria-hidden
              />
              <span className="font-mono text-xs text-[var(--zz-ink)]">
                {formatQty(qty)}
              </span>
              <span className="text-[10px] text-[var(--zz-muted)]" dir="rtl">
                {i === 0 ? "התחלה" : `אחרי #${i}`}
              </span>
            </div>
          );
        })}
      </div>

      <p
        dir="ltr"
        className="ltr-isolate mt-5 font-mono text-sm text-[var(--zz-gold)]"
      >
        {cascade.map((q) => formatQty(q)).join(" → ")}
      </p>
    </EndVisualShell>
  );
}
