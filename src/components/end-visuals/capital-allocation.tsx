"use client";

import { useMemo, useState } from "react";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import { zigzagAssumptions } from "@/lib/math/assumptions";
import { d, formatUsd } from "@/lib/math/decimal";

/** Illustrative bands from manuscript pedagogy — not max-position guarantees. */
const BANDS = [
  { id: "100k", label: "תיק $100k", capital: 100_000, bandPct: 0.05 },
  { id: "10k", label: "תיק $10k", capital: 10_000, bandPct: 0.5 },
] as const;

export function CapitalAllocation({ endVisual }: { endVisual: EndVisual }) {
  const [bandId, setBandId] = useState<(typeof BANDS)[number]["id"]>("100k");
  const [sliceUsd, setSliceUsd] = useState(250);
  const band = BANDS.find((b) => b.id === bandId)!;
  const cap = zigzagAssumptions.perPositionMarginCapUsd;

  const math = useMemo(() => {
    const bandUsd = d(band.capital).times(band.bandPct).div(100);
    const perTrade = d(Math.min(sliceUsd, cap));
    const parallelIllustrative = perTrade.gt(0)
      ? bandUsd.div(perTrade).floor()
      : d(0);
    const rejected = d(sliceUsd).gt(cap);
    return { bandUsd, perTrade, parallelIllustrative, rejected };
  }, [band, sliceUsd, cap]);

  return (
    <EndVisualShell endVisual={endVisual} hypothetical>
      <p className="text-sm leading-7 text-[var(--zz-muted)]">
        סימולטור תקציב עסקה איורי. תקרת מרג׳ין מאושרת:{" "}
        <span dir="ltr" className="ltr-isolate font-mono text-[var(--zz-gold)]">
          {formatUsd(cap)} Reject
        </span>
        . מספר פוזיציות מקבילות הוא פדגוגיה בלבד — לא הבטחת קיבולת.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {BANDS.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setBandId(b.id)}
            className={
              bandId === b.id
                ? "border border-[var(--zz-cyan)] bg-[rgba(46,230,255,0.12)] px-3 py-1.5 text-xs text-[var(--zz-cyan)]"
                : "border border-[var(--zz-line)] px-3 py-1.5 text-xs text-[var(--zz-muted)]"
            }
          >
            {b.label} · {b.bandPct}%
          </button>
        ))}
      </div>

      <label className="mt-5 block text-sm text-[var(--zz-ink)]">
        תקציב עסקה לפוזיציה (איורי)
        <input
          type="range"
          min={50}
          max={400}
          step={10}
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
          <dt className="text-[var(--zz-muted)]">רצועת תקציב (איורית)</dt>
          <dd dir="ltr" className="ltr-isolate font-mono text-[var(--zz-ink)]">
            {formatUsd(math.bandUsd)}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--zz-muted)]">תקציב אחרי תקרה</dt>
          <dd dir="ltr" className="ltr-isolate font-mono text-[var(--zz-ink)]">
            {formatUsd(math.perTrade)}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--zz-muted)]">קיבולת מקבילה איורית</dt>
          <dd dir="ltr" className="ltr-isolate font-mono text-[var(--zz-gold)]">
            ~{math.parallelIllustrative.toString()}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--zz-muted)]">מדיניות תקרה</dt>
          <dd className={math.rejected ? "text-[var(--zz-danger)]" : "text-[var(--zz-emerald)]"}>
            {math.rejected ? "Reject — חריגה מהתקרה" : "בתוך התקרה המאושרת"}
          </dd>
        </div>
      </dl>
    </EndVisualShell>
  );
}
