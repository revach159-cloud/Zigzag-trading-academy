"use client";

import { useMemo, useState } from "react";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import { zigzagAssumptions } from "@/lib/math/assumptions";
import { d, formatUsd } from "@/lib/math/decimal";

type Position = { id: string; name: string; budget: number; corr: number };

const CAP = zigzagAssumptions.defaultExampleTradeBudgetUsd; // $10k example = $256

const SEED: Position[] = [
  { id: "a", name: "BTC-ish", budget: 120, corr: 1 },
  { id: "b", name: "ETH-ish", budget: 100, corr: 0.85 },
  { id: "c", name: "SOL-ish", budget: 80, corr: 0.7 },
];

export function PortfolioCorrelation({ endVisual }: { endVisual: EndVisual }) {
  const [positions, setPositions] = useState(SEED);
  const [shock, setShock] = useState(10);

  const risk = useMemo(() => {
    const naive = positions.reduce((acc, p) => acc.plus(p.budget), d(0));
    const stressed = positions.reduce(
      (acc, p) => acc.plus(d(p.budget).times(p.corr).times(shock).div(100)),
      d(0),
    );
    return { naive, stressed };
  }, [positions, shock]);

  return (
    <EndVisualShell endVisual={endVisual} hypothetical>
      <p className="text-sm leading-7 text-[var(--zz-muted)]">
        הדגמת סיכון תיק במתאם — שמות איוריים בלבד. תקציב לכל פוזיציה כפוף לתקציב מדורג
        (דוגמת תיק $10k:{" "}
        <span dir="ltr" className="ltr-isolate font-mono">
          ${CAP}
        </span>{" "}
        Reject). אין זה תיק אמיתי.
      </p>

      <label className="mt-4 block text-sm">
        הלם מחיר איורי ({shock}%)
        <input
          type="range"
          min={5}
          max={25}
          value={shock}
          onChange={(e) => setShock(Number(e.target.value))}
          className="mt-2 w-full accent-[var(--zz-danger)]"
        />
      </label>

      <ul className="mt-4 space-y-3">
        {positions.map((p, idx) => (
          <li
            key={p.id}
            className="grid gap-2 border border-[var(--zz-line)] p-3 sm:grid-cols-[1fr_auto_auto]"
          >
            <span className="font-medium">{p.name}</span>
            <label className="text-xs text-[var(--zz-muted)]">
              תקציב
              <input
                type="range"
                min={20}
                max={CAP}
                step={4}
                value={p.budget}
                onChange={(e) => {
                  const budget = Number(e.target.value);
                  setPositions((prev) =>
                    prev.map((row, i) => (i === idx ? { ...row, budget } : row)),
                  );
                }}
                className="mt-1 block w-28 accent-[var(--zz-cyan)]"
              />
              <span dir="ltr" className="ltr-isolate font-mono">
                {formatUsd(p.budget, 0)}
              </span>
            </label>
            <label className="text-xs text-[var(--zz-muted)]">
              מתאם
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(p.corr * 100)}
                onChange={(e) => {
                  const corr = Number(e.target.value) / 100;
                  setPositions((prev) =>
                    prev.map((row, i) => (i === idx ? { ...row, corr } : row)),
                  );
                }}
                className="mt-1 block w-28 accent-[var(--zz-gold)]"
              />
              <span dir="ltr" className="ltr-isolate font-mono">
                {p.corr.toFixed(2)}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[var(--zz-muted)]">סכום תקציבים (נאיבי)</dt>
          <dd dir="ltr" className="ltr-isolate font-mono text-[var(--zz-ink)]">
            {formatUsd(risk.naive, 0)}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--zz-muted)]">לחץ מתואם איורי</dt>
          <dd dir="ltr" className="ltr-isolate font-mono text-[var(--zz-danger)]">
            {formatUsd(risk.stressed, 2)}
          </dd>
        </div>
      </dl>
    </EndVisualShell>
  );
}
