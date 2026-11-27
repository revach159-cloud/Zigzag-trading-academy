"use client";

import { useEffect, useState } from "react";
import { getReadingProgress } from "@/lib/content/chapters";
import { reading } from "@/lib/design/tokens";
import {
  loadReaderState,
  markVisited,
  saveScrollPosition,
} from "@/lib/reading/persistence";

export function useChapterProgress(slug?: string) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const state = loadReaderState();
    setCompleted(state.visited);
  }, []);

  useEffect(() => {
    if (!slug) return;
    const next = markVisited(slug);
    setCompleted(next.visited);

    const restore = next.positions[slug];
    if (typeof restore === "number" && restore > 0.05 && restore < 0.95) {
      requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        if (max > 0) window.scrollTo({ top: max * restore, behavior: "auto" });
      });
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        saveScrollPosition(slug, ratio);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return getReadingProgress(completed);
}

/** Marks chapter visited + scroll restore without rendering any chrome. */
export function ChapterVisitTracker({ slug }: { slug: string }) {
  useChapterProgress(slug);
  return null;
}

export function ReadingProgressBar({ slug }: { slug?: string }) {
  const progress = useChapterProgress(slug);

  return (
    <div className="w-full" aria-label={reading.progressLabelHe}>
      <div className="mb-1 flex items-center justify-between text-[11px] text-[var(--zz-muted)]">
        <span>
          {progress.completed}/{progress.total} {reading.progressLabelHe}
        </span>
        <span>{progress.percent}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(168,184,208,0.12)]">
        <div
          className="h-full rounded-full bg-gradient-to-l from-[var(--zz-cyan)] to-[var(--zz-emerald)] transition-[width] duration-500"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
    </div>
  );
}
