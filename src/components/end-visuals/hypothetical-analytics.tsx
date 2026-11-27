"use client";

import { useState } from "react";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import { cn } from "@/lib/utils/cn";

/** Explicitly fictional sample metrics — never claim as live performance. */
const SCENARIOS = [
  {
    id: "a",
    label: "תרחיש A",
    winRate: "42%",
    profitFactor: "1.15",
    drawdown: "18%",
    expectancy: "0.08R",
    recovery: "1.4",
  },
  {
    id: "b",
    label: "תרחיש B",
    winRate: "51%",
    profitFactor: "0.95",
    drawdown: "27%",
    expectancy: "-0.03R",
    recovery: "0.7",
  },
  {
    id: "c",
    label: "תרחיש C",
    winRate: "38%",
    profitFactor: "1.40",
    drawdown: "22%",
    expectancy: "0.12R",
    recovery: "1.9",
  },
] as const;

export function HypotheticalAnalytics({ endVisual }: { endVisual: EndVisual }) {
  const [id, setId] = useState<(typeof SCENARIOS)[number]["id"]>("a");
  const scenario = SCENARIOS.find((s) => s.id === id)!;

  return (
    <EndVisualShell endVisual={endVisual} hypothetical>
      <p className="text-sm leading-7 text-[var(--zz-muted)]">
        דשבורד קריאה בלבד. כל המספרים מסומנים{" "}
        <span className="hypothetical-badge" dir="ltr">
          HYPOTHETICAL
        </span>{" "}
        — אינם תוצאות אמיתיות, אינם הבטחת רווח, ואינם Win Rate מובטח.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setId(s.id)}
            className={cn(
              "border px-3 py-1.5 text-xs",
              id === s.id
                ? "border-[var(--zz-gold)] text-[var(--zz-gold)]"
                : "border-[var(--zz-line)] text-[var(--zz-muted)]",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(
          [
            ["Win Rate", scenario.winRate],
            ["Profit Factor", scenario.profitFactor],
            ["Drawdown", scenario.drawdown],
            ["Expectancy", scenario.expectancy],
            ["Recovery Factor", scenario.recovery],
          ] as const
        ).map(([label, value]) => (
          <div
            key={label}
            className="border border-[var(--zz-line)] bg-[rgba(2,4,10,0.5)] p-4"
          >
            <p className="flex items-center justify-between text-[11px] text-[var(--zz-muted)]">
              <span>{label}</span>
              <span className="hypothetical-badge !px-1.5 !py-0.5 !text-[0.55rem]" dir="ltr">
                HYPOTHETICAL
              </span>
            </p>
            <p
              dir="ltr"
              className="ltr-isolate mt-2 font-mono text-2xl text-[var(--zz-ink)]"
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-6 text-[var(--zz-gold)]">
        השוו בין תרחישים כדי לתרגל קריאה ביקורתית — לא כדי לבחור «השיטה
        המנצחת». מדדים בלי הקשר של דגימה, עלויות ו־OOS מטעים.
      </p>
    </EndVisualShell>
  );
}
