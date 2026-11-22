import Link from "next/link";
import type { Metadata } from "next";
import { listChapters } from "@/lib/content/chapters";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";

export const metadata: Metadata = {
  title: "ספר לימוד — 12 פרקים",
};

export default function TextbookPage() {
  const chapters = listChapters();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.25em] text-[var(--zz-gold)] uppercase">
        Curriculum Outline
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)] sm:text-4xl">
        ספר לימוד — 12 פרקים
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--zz-muted)]">
        ארכיטקטורת התוכן בלבד. כל פרק מסומן כ־
        <span dir="ltr" className="ltr-isolate font-mono text-xs">
          outline
        </span>
        — אין כאן ספר לימוד מלא. פרקים שממתינים לאישור מתודולוגיה מסומנים במפורש.
      </p>
      <div className="mt-3">
        <SimDisclaimer compact />
      </div>

      <ol className="mt-10 space-y-3">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link
              href={`/textbook/${chapter.slug}`}
              className="group flex flex-col gap-2 border border-[var(--zz-line)] bg-[var(--zz-panel)]/40 px-4 py-4 transition-colors hover:border-[var(--zz-cyan)]/50 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <p className="text-xs text-[var(--zz-cyan)]">
                  פרק {chapter.number}
                  {chapter.awaitingConfirmation ? (
                    <span className="ms-2 text-[var(--zz-gold)]">
                      · ממתין לאישור
                    </span>
                  ) : null}
                </p>
                <h2 className="mt-1 text-lg text-[var(--zz-ink)] group-hover:text-[var(--zz-cyan)]">
                  {chapter.titleHe}
                </h2>
                <p
                  dir="ltr"
                  className="ltr-isolate mt-1 text-sm text-[var(--zz-muted)]"
                >
                  {chapter.titleEn}
                </p>
                <p className="mt-2 text-sm text-[var(--zz-muted)]">
                  {chapter.summaryHe}
                </p>
              </div>
              <span className="shrink-0 self-start rounded-sm border border-[var(--zz-line)] px-2 py-1 font-mono text-[10px] tracking-wide text-[var(--zz-muted)] uppercase">
                {chapter.status}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
