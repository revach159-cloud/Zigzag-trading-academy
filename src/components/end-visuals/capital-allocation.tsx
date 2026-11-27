"use client";

import { useMemo, useState } from "react";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import {
  initialEntryUsd,
  tradeBudgetUsd,
  zigzagAssumptions,
} from "@/lib/math/assumptions";
import { d, formatUsd } from "@/lib/math/decimal";

/** Portfolio frames from approved scaled budget model. */
const FRAMES = [
  { id: "100k", label: "תיק $100k", capital: 100_000 },
  { id: "10k", label: "תיק $10k", capital: 10_000 },
  { id: "5k", label: "תיק $5k", capital: 5_000 },
] as const;

export function CapitalAllocation({ endVisual }: { endVisual: EndVisual }) {
  const [frameId, setFrameId] = useState<(typeof FRAMES)[number]["id"]>("10k");
  const frame = FRAMES.find((b) => b.id === frameId)!;
  const entry = initialEntryUsd(frame.capital);
  const cap = tradeBudgetUsd(frame.capital);
  const [sliceUsd, setSliceUsd] = useState(cap);

  const math = useMemo(() => {
    const perTrade = d(Math.min(sliceUsd, cap));
    const rejected = d(sliceUsd).gt(cap);
    const layersIllustrative = entry > 0 ? d(cap).div(entry).toFixed(1) : "—";
    return { perTrade, rejected, layersIllustrative };
  }, [sliceUsd, cap, entry]);

  return (
    <EndVisualShell endVisual={endVisual} hypothetical>
      <p className="text-sm leading-7 text-[var(--zz-muted)]">
        סימולטור תקציב עסקה מדורג. כניסה ראשונית לפי גודל תיק; תקציב לפני מינוף־עלייה ={" "}
        <span dir="ltr" className="ltr-isolate font-mono text-[var(--zz-gold)]">
          {zigzagAssumptions.tradeBudgetModel.budgetMultiplier}×
        </span>{" "}
        הכניסה. Reject מול התקציב המדורג — לא תקרת $250 גלובלית. מספר פוזיציות מקבילות הוא
        פדגוגיה בלבד.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {FRAMES.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => {
              setFrameId(b.id);
              setSliceUsd(tradeBudgetUsd(b.capital));
            }}
            className={
              frameId === b.id
                ? "border border-[var(--zz-cyan)] bg-[rgba(46,230,255,0.12)] px-3 py-1.5 text-xs text-[var(--zz-cyan)]"
                : "border border-[var(--zz-line)] px-3 py-1.5 text-xs text-[var(--zz-muted)]"
            }
          >
            {b.label}
          </button>
        ))}
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[var(--zz-muted)]">כניסה ראשונית</dt>
          <dd dir="ltr" className="ltr-isolate font-mono text-[var(--zz-ink)]">
            {formatUsd(entry)}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--zz-muted)]">תקציב העסקה (51.2×)</dt>
          <dd dir="ltr" className="ltr-isolate font-mono text-[var(--zz-gold)]">
            {formatUsd(cap)} Reject
          </dd>
        </div>
      </dl>

      <label className="mt-5 block text-sm text-[var(--zz-ink)]">
        מרג׳ין מצטבר לפוזיציה (איורי)
        <input
          type="range"
          min={Math.max(1, Math.floor(entry))}
          max={Math.ceil(cap * 1.4)}
          step={1}
          value={sliceUsd}
          onChange={(e) => setSliceUsd(Number(e.target.value))}
          className="mt-2 w-full accent-[var(--zz-cyan)]"
        />
        <span dir="ltr" className="ltr-isolate mt-1 block font-mono text-[var(--zz-cyan)]">
          {formatUsd(sliceUsd)}
        </span>
      </label>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[var(--zz-muted)]">תקציב אחרי תקרה</dt>
          <dd dir="ltr" className="ltr-isolate font-mono text-[var(--zz-ink)]">
            {formatUsd(math.perTrade)}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--zz-muted)]">מכפיל לתקציב (איורי)</dt>
          <dd dir="ltr" className="ltr-isolate font-mono text-[var(--zz-gold)]">
            ~{math.layersIllustrative}×
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-[var(--zz-muted)]">מדיניות תקרה</dt>
          <dd
            className={
              math.rejected ? "text-[var(--zz-danger)]" : "text-[var(--zz-emerald)]"
            }
          >
            {math.rejected
              ? "Reject — חריגה מתקציב העסקה המדורג"
              : "בתוך תקציב העסקה המדורג"}
          </dd>
        </div>
      </dl>
    </EndVisualShell>
  );
}
