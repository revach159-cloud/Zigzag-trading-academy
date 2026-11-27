"use client";

import { useMemo, useState } from "react";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import { averageEntry, d, formatQty, formatUsd } from "@/lib/math/decimal";

type Fill = { price: string; qty: string };

const DEFAULTS: Fill[] = [
  { price: "1.00", qty: "100" },
  { price: "0.90", qty: "100" },
  { price: "0.81", qty: "100" },
];

export function AvgEntryCalculator({ endVisual }: { endVisual: EndVisual }) {
  const [fills, setFills] = useState<Fill[]>(DEFAULTS);

  const result = useMemo(() => {
    const parsed = fills
      .map((f) => ({ price: d(f.price || 0), qty: d(f.qty || 0) }))
      .filter((f) => f.qty.gt(0) && f.price.gt(0));
    const avg = averageEntry(parsed);
    const totalQty = parsed.reduce((acc, f) => acc.plus(f.qty), d(0));
    return { avg, totalQty, count: parsed.length };
  }, [fills]);

  function update(index: number, key: keyof Fill, value: string) {
    setFills((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  }

  return (
    <EndVisualShell endVisual={endVisual}>
      <p className="text-sm text-[var(--zz-muted)]">
        ממוצע כניסה משוקלל בכמות · Decimal-safe · שיפור מחיר ממוצע אינו מבטל סיכון
        או פירוק.
      </p>

      <div className="mt-4 space-y-3">
        {fills.map((fill, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <label className="text-xs text-[var(--zz-muted)]">
              מחיר #{i + 1}
              <input
                dir="ltr"
                inputMode="decimal"
                value={fill.price}
                onChange={(e) => update(i, "price", e.target.value)}
                className="ltr-isolate mt-1 w-full border border-[var(--zz-line)] bg-[var(--zz-void)] px-2 py-2 font-mono text-sm text-[var(--zz-ink)]"
              />
            </label>
            <label className="text-xs text-[var(--zz-muted)]">
              כמות #{i + 1}
              <input
                dir="ltr"
                inputMode="decimal"
                value={fill.qty}
                onChange={(e) => update(i, "qty", e.target.value)}
                className="ltr-isolate mt-1 w-full border border-[var(--zz-line)] bg-[var(--zz-void)] px-2 py-2 font-mono text-sm text-[var(--zz-ink)]"
              />
            </label>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-3 text-xs text-[var(--zz-cyan)] hover:underline"
        onClick={() =>
          setFills((prev) => [...prev, { price: "0.70", qty: "50" }])
        }
      >
        + הוסף מילוי
      </button>

      <div className="mt-5 border border-[var(--zz-gold)]/30 bg-[rgba(201,168,76,0.06)] p-4">
        <p className="text-sm text-[var(--zz-muted)]">מחיר כניסה ממוצע</p>
        <p
          dir="ltr"
          className="ltr-isolate mt-1 font-mono text-2xl text-[var(--zz-gold)]"
        >
          {result.avg ? formatUsd(result.avg, 6) : "—"}
        </p>
        <p className="mt-2 text-xs text-[var(--zz-muted)]">
          סה״כ כמות:{" "}
          <span dir="ltr" className="ltr-isolate font-mono">
            {formatQty(result.totalQty)}
          </span>{" "}
          · מילויים: {result.count}
        </p>
      </div>
    </EndVisualShell>
  );
}
