"use client";

import { useMemo, useState } from "react";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";

type Entry = {
  id: string;
  mood: string;
  planFollowed: boolean;
  note: string;
  tag: "demo" | "stress" | "oos";
};

const TAGS = [
  { id: "demo" as const, label: "דמו / נייר" },
  { id: "stress" as const, label: "לחץ לימודי" },
  { id: "oos" as const, label: "OOS / מחוץ לדגימה" },
];

export function JournalToResearch({ endVisual }: { endVisual: EndVisual }) {
  const [mood, setMood] = useState("רגוע");
  const [planFollowed, setPlanFollowed] = useState(true);
  const [note, setNote] = useState("");
  const [tag, setTag] = useState<Entry["tag"]>("demo");
  const [entries, setEntries] = useState<Entry[]>([]);

  const research = useMemo(() => {
    const total = entries.length;
    const followed = entries.filter((e) => e.planFollowed).length;
    const byTag = TAGS.map((t) => ({
      ...t,
      count: entries.filter((e) => e.tag === t.id).length,
    }));
    return { total, followed, byTag };
  }, [entries]);

  function addEntry() {
    if (!note.trim()) return;
    setEntries((prev) => [
      {
        id: `${Date.now()}`,
        mood,
        planFollowed,
        note: note.trim(),
        tag,
      },
      ...prev,
    ]);
    setNote("");
  }

  return (
    <EndVisualShell endVisual={endVisual}>
      <p className="text-sm text-[var(--zz-muted)]">
        יומן מקומי בדפדפן — הופך רשומות לנתוני מחקר לימודיים. אין בקטסט חי, אין
        ביצועי עבר.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-[var(--zz-muted)]">
          הלך רוח
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="mt-1 w-full border border-[var(--zz-line)] bg-[var(--zz-void)] px-2 py-2 text-sm text-[var(--zz-ink)]"
          >
            {["רגוע", "לחוץ", "חמדן", "פחד"].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-[var(--zz-muted)]">
          תג מחקר
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value as Entry["tag"])}
            className="mt-1 w-full border border-[var(--zz-line)] bg-[var(--zz-void)] px-2 py-2 text-sm text-[var(--zz-ink)]"
          >
            {TAGS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={planFollowed}
          onChange={(e) => setPlanFollowed(e.target.checked)}
        />
        פעלתי לפי התוכנית
      </label>

      <label className="mt-3 block text-xs text-[var(--zz-muted)]">
        הערה
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="mt-1 w-full border border-[var(--zz-line)] bg-[var(--zz-void)] px-3 py-2 text-sm text-[var(--zz-ink)]"
          placeholder="מה קרה מול התוכנית?"
        />
      </label>

      <button
        type="button"
        onClick={addEntry}
        className="mt-3 border border-[var(--zz-cyan)]/40 bg-[rgba(46,230,255,0.1)] px-4 py-2 text-sm text-[var(--zz-cyan)]"
      >
        שמור לרשומת מחקר
      </button>

      <div className="mt-5 grid gap-2 text-sm sm:grid-cols-3">
        <div className="border border-[var(--zz-line)] p-3">
          <p className="text-[var(--zz-muted)]">רשומות</p>
          <p className="font-mono text-lg">{research.total}</p>
        </div>
        <div className="border border-[var(--zz-line)] p-3">
          <p className="text-[var(--zz-muted)]">עמידה בתוכנית</p>
          <p className="font-mono text-lg">
            {research.total
              ? `${Math.round((research.followed / research.total) * 100)}%`
              : "—"}
          </p>
        </div>
        <div className="border border-[var(--zz-line)] p-3">
          <p className="text-[var(--zz-muted)]">לפי תג</p>
          <ul className="mt-1 text-xs text-[var(--zz-muted)]">
            {research.byTag.map((t) => (
              <li key={t.id}>
                {t.label}: {t.count}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {entries.length > 0 ? (
        <ul className="mt-4 max-h-48 space-y-2 overflow-y-auto text-sm">
          {entries.map((e) => (
            <li key={e.id} className="border border-[var(--zz-line)] px-3 py-2">
              <span className="text-[var(--zz-gold)]">{e.mood}</span>
              {" · "}
              <span className="text-[var(--zz-muted)]">
                {TAGS.find((t) => t.id === e.tag)?.label}
              </span>
              <p className="mt-1 text-[var(--zz-ink)]">{e.note}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </EndVisualShell>
  );
}
