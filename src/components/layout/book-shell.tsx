"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Bookmark, BookOpen, List, Maximize2, Minimize2, X } from "lucide-react";
import { brand, reading } from "@/lib/design/tokens";
import { cn } from "@/lib/utils/cn";
import {
  loadReaderState,
  toggleBookmark,
  type ReaderState,
} from "@/lib/reading/persistence";
import { SimDisclaimer } from "./sim-disclaimer";

export type BookTocItem = {
  slug: string;
  numberLabelHe: string;
  titleHe: string;
  kind: "opening" | "chapter" | "appendix";
};

type BookShellProps = {
  children: React.ReactNode;
  toc: BookTocItem[];
  totalUnits: number;
};

export function BookShell({ children, toc, totalUnits }: BookShellProps) {
  const pathname = usePathname();
  const [tocOpen, setTocOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [state, setState] = useState<ReaderState>({
    visited: [],
    bookmarks: [],
    positions: {},
    updatedAt: 0,
  });

  const currentSlug = pathname?.startsWith("/textbook/")
    ? pathname.replace("/textbook/", "").split("/")[0]
    : undefined;

  useEffect(() => {
    setState(loadReaderState());
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTocOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onToggleBookmark = useCallback(() => {
    if (!currentSlug) return;
    setState(toggleBookmark(currentSlug));
  }, [currentSlug]);

  const onToggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch {
      setFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const visitedCount = state.visited.filter((slug) =>
    toc.some((item) => item.slug === slug && item.kind !== "appendix"),
  ).length;
  const percent = totalUnits
    ? Math.round((visitedCount / totalUnits) * 100)
    : 0;
  const bookmarked = currentSlug
    ? state.bookmarks.includes(currentSlug)
    : false;

  return (
    <div className="book-shell flex min-h-full flex-1 flex-col bg-[var(--zz-void)] text-[var(--zz-ink)]">
      <SimDisclaimer />
      <header className="sticky top-0 z-50 border-b border-[var(--zz-line)] bg-[rgba(2,4,10,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/textbook"
              className="group flex min-w-0 flex-col leading-none"
              aria-label={brand.bookTitleHe}
            >
              <span className="truncate text-sm font-bold tracking-[0.16em] text-[var(--zz-ink)] group-hover:text-[var(--zz-cyan)]">
                {brand.bookTitleHe}
              </span>
              <span className="mt-0.5 truncate text-[10px] font-medium tracking-[0.12em] text-[var(--zz-gold)]">
                {brand.authorBylineHe}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="hidden items-center gap-2 sm:flex"
              aria-label={reading.progressLabelHe}
            >
              <span className="text-[11px] text-[var(--zz-muted)]">
                {visitedCount}/{totalUnits}
              </span>
              <div className="h-1 w-20 overflow-hidden rounded-full bg-[rgba(168,184,208,0.12)]">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-[var(--zz-cyan)] to-[var(--zz-emerald)] transition-[width] duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {currentSlug ? (
              <button
                type="button"
                onClick={onToggleBookmark}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center border border-[var(--zz-line)] text-[var(--zz-muted)] transition-colors hover:text-[var(--zz-gold)]",
                  bookmarked && "border-[var(--zz-gold)]/50 text-[var(--zz-gold)]",
                )}
                aria-pressed={bookmarked}
                aria-label={bookmarked ? "הסר סימנייה" : "הוסף סימנייה"}
              >
                <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
              </button>
            ) : null}

            <button
              type="button"
              onClick={onToggleFullscreen}
              className="inline-flex h-9 w-9 items-center justify-center border border-[var(--zz-line)] text-[var(--zz-muted)] hover:text-[var(--zz-ink)]"
              aria-label={fullscreen ? "יציאה ממסך מלא" : "מסך מלא"}
            >
              {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              type="button"
              onClick={() => setTocOpen(true)}
              className="inline-flex h-9 items-center gap-2 border border-[var(--zz-cyan)]/35 bg-[rgba(46,230,255,0.08)] px-3 text-xs font-medium text-[var(--zz-cyan)] hover:bg-[rgba(46,230,255,0.14)]"
              aria-expanded={tocOpen}
              aria-controls="book-toc-drawer"
            >
              <List size={14} />
              <span className="hidden sm:inline">תוכן העניינים</span>
            </button>

            <Link
              href="/"
              className="hidden text-[11px] text-[var(--zz-muted)] hover:text-[var(--zz-ink)] md:inline"
            >
              לאקדמיה
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col">{children}</div>

      <footer className="border-t border-[var(--zz-line)] px-4 py-5 text-center text-[11px] text-[var(--zz-muted)]">
        <p className="flex items-center justify-center gap-2">
          <BookOpen size={12} aria-hidden />
          {brand.bookTitleHe} · {brand.authorBylineHe} · סימולציה וחינוך בלבד
        </p>
      </footer>

      {tocOpen ? (
        <div
          className="fixed inset-0 z-[60] flex justify-start"
          role="dialog"
          aria-modal="true"
          aria-label="תוכן העניינים"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            aria-label="סגור תוכן העניינים"
            onClick={() => setTocOpen(false)}
          />
          <aside
            id="book-toc-drawer"
            className="book-toc-drawer relative z-10 flex h-full w-full max-w-md flex-col border-l border-[var(--zz-line)] bg-[var(--zz-abyss)] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--zz-line)] px-4 py-4">
              <div>
                <p className="text-[11px] tracking-[0.22em] text-[var(--zz-gold)]">
                  ZIGZAG · LOOKBACK
                </p>
                <h2 className="mt-1 text-lg font-bold">תוכן העניינים</h2>
              </div>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center border border-[var(--zz-line)] text-[var(--zz-muted)] hover:text-[var(--zz-ink)]"
                onClick={() => setTocOpen(false)}
                aria-label="סגור"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="פרקי הספר">
              <ul className="flex flex-col gap-0.5">
                {toc.map((item) => {
                  const href = `/textbook/${item.slug}`;
                  const active = currentSlug === item.slug;
                  const visited = state.visited.includes(item.slug);
                  const marked = state.bookmarks.includes(item.slug);
                  return (
                    <li key={item.slug}>
                      <Link
                        href={href}
                        onClick={() => setTocOpen(false)}
                        className={cn(
                          "flex items-start gap-3 rounded-sm px-3 py-2.5 transition-colors",
                          active
                            ? "bg-[rgba(46,230,255,0.12)] text-[var(--zz-cyan)]"
                            : "text-[var(--zz-ink)] hover:bg-[rgba(16,26,46,0.8)]",
                        )}
                      >
                        <span className="mt-0.5 w-10 shrink-0 text-[10px] font-medium tracking-[0.08em] text-[var(--zz-gold)]">
                          {item.kind === "opening"
                            ? "פתיחה"
                            : item.kind === "appendix"
                              ? "נספח"
                              : item.numberLabelHe.replace("פרק ", "")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium leading-6">
                            {item.titleHe}
                          </span>
                          <span className="mt-0.5 flex gap-2 text-[10px] text-[var(--zz-muted)]">
                            {visited ? <span>נקרא</span> : null}
                            {marked ? <span>סימנייה</span> : null}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
