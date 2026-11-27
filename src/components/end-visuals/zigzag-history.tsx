"use client";

import { useMemo, useState } from "react";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import { zigzagAssumptions } from "@/lib/math/assumptions";
import { d, formatUsd, ladderPrice } from "@/lib/math/decimal";

const REF = 100;

export function ZigzagHistory({ endVisual }: { endVisual: EndVisual }) {
  const levels = useMemo(
    () =>
      Array.from({ length: 6 }, (_, k) => ({
        k,
        price: ladderPrice(REF, k),
      })),
    [],
  );
  const [selected, setSelected] = useState(0);
  const selectedLevel = levels[selected]!;

  const path = levels
    .map((level, i) => {
      const x = 40 + i * 52;
      const y = 30 + i * 18;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <EndVisualShell endVisual={endVisual}>
      <p className="text-sm text-[var(--zz-muted)]">
        סולם{" "}
        <span dir="ltr" className="ltr-isolate font-mono text-[var(--zz-cyan)]">
          {zigzagAssumptions.adverseMoveIntervalPct}%
        </span>{" "}
        ממחיר ייחוס מקורי · הפעלה ב־Touch · לחצו על נקודה לבדיקה
      </p>

      <svg viewBox="0 0 360 160" className="mt-4 h-44 w-full" role="img" aria-label="היסטוריית זיגזג">
        <path d={path} fill="none" stroke="#2EE6FF" strokeWidth="2.5" />
        {levels.map((level, i) => {
          const x = 40 + i * 52;
          const y = 30 + i * 18;
          const active = selected === i;
          return (
            <g key={level.k}>
              <circle
                cx={x}
                cy={y}
                r={active ? 9 : 6}
                fill={active ? "#E0C36A" : "#2EE6FF"}
                className="cursor-pointer"
                onClick={() => setSelected(i)}
                role="button"
                tabIndex={0}
                aria-label={`רמה ${i}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelected(i);
                }}
              />
              <text
                x={x}
                y={y + 22}
                textAnchor="middle"
                fill="#8FA0B8"
                fontSize="10"
                fontFamily="IBM Plex Mono, monospace"
                direction="ltr"
              >
                L{i}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <p>
          רמה נבחרת:{" "}
          <span dir="ltr" className="ltr-isolate font-mono text-[var(--zz-gold)]">
            L{selected}
          </span>
        </p>
        <p>
          מחיר סף:{" "}
          <span dir="ltr" className="ltr-isolate font-mono text-[var(--zz-cyan)]">
            {formatUsd(selectedLevel.price)}
          </span>
        </p>
        <p className="sm:col-span-2 text-[var(--zz-muted)]">
          נוסחה:{" "}
          <span dir="ltr" className="ltr-isolate font-mono">
            P({selected}) = {REF} × 0.9^{selected} = {d(selectedLevel.price).toFixed(2)}
          </span>
        </p>
      </div>
    </EndVisualShell>
  );
}
