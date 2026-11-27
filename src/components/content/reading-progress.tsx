"use client";

import { useEffect, useState } from "react";
import { getReadingProgress } from "@/lib/content/chapters";

const STORAGE_KEY = "zz-lookback-progress-v2";

export function useChapterProgress(slug?: string) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as string[]) : [];
      setCompleted(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCompleted([]);
    }
  }, []);

  useEffect(() => {
    if (!slug) return;
    setCompleted((prev) => {
      if (prev.includes(slug)) return prev;
      const next = [...prev, slug];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, [slug]);

  return getReadingProgress(completed);
}

export function ReadingProgressBar({ slug }: { slug?: string }) {
  const progress = useChapterProgress(slug);

  return (
    <div className="w-full" aria-label="התקדמות קריאה">
      <div className="mb-1 flex items-center justify-between text-[11px] text-[var(--zz-muted)]">
        <span>
          {progress.completed}/{progress.total} תחנות
        </span>
        <span>{progress.percent}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(125,211,252,0.12)]">
        <div
          className="h-full rounded-full bg-gradient-to-l from-[var(--zz-cyan)] to-[var(--zz-electric)] transition-[width] duration-500"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
    </div>
  );
}
