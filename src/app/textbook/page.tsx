import Link from "next/link";
import type { Metadata } from "next";
import { listChapters, chapterCatalog } from "@/lib/content/chapters";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";
import { RichText } from "@/lib/content/rich-text";
import { brand } from "@/lib/design/tokens";
import { PdfDownloadCta } from "@/components/content/pdf-download-cta";
import { EduDisclaimer } from "@/components/content/edu-disclaimer";
import { EducationalScene } from "@/components/scene/educational-scene";
import { TextbookCoverClient } from "@/components/content/textbook-cover-client";

export const metadata: Metadata = {
  title: `${brand.bookTitleHe} — ספר דיגיטלי`,
};

export default function TextbookPage() {
  const chapters = listChapters();

  return (
    <main className="flex-1">
      {/* Full-bleed cinematic cover */}
      <section
        className="book-cover relative isolate min-h-[calc(100vh-7.5rem)] overflow-hidden px-4 py-16 sm:px-8 sm:py-20"
        aria-label="שער הספר"
      >
        <div className="absolute inset-0 -z-10">
          <EducationalScene
            kind="cover"
            className="absolute inset-0 h-full w-full opacity-55"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(3,5,12,0.92) 0%, rgba(3,5,12,0.72) 42%, rgba(3,5,12,0.45) 70%, rgba(3,5,12,0.75) 100%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{
              background:
                "linear-gradient(to top, var(--zz-void), transparent)",
            }}
            aria-hidden
          />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center">
          <p className="zz-subtitle text-[11px] tracking-[0.4em] text-[var(--zz-gold)] uppercase">
            {brand.narrativeConceptEn}
          </p>
          <h1 className="zz-title-hero mt-5 tracking-[0.12em] text-[var(--zz-ink)]">
            {brand.name}
          </h1>
          <p className="mt-4 text-3xl font-bold leading-snug text-[var(--zz-cyan)] sm:text-5xl">
            {brand.bookTitleHe}
          </p>
          <p className="mt-3 text-sm font-medium tracking-[0.06em] text-[var(--zz-gold)]">
            {brand.methodHe}
          </p>
          <p className="mt-8 max-w-xl text-lg font-normal leading-9 text-[var(--zz-muted)] sm:text-xl">
            {brand.taglineHe}
          </p>
          <p
            dir="ltr"
            className="ltr-isolate mt-3 max-w-xl text-sm font-medium text-[var(--zz-muted)]"
          >
            {brand.taglineEn}
          </p>
          <p className="mt-5 max-w-lg text-[0.95rem] font-normal leading-7 text-[var(--zz-muted)]">
            ספר נרטיבי עברי — {chapterCatalog.chapters.length} תחנות מסע, בלי
            חידוני אמריקאי. סימולציה ולימוד בלבד.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={`/textbook/${chapters[0]?.slug ?? "opening-the-journey"}`}
              className="border border-[var(--zz-cyan)]/50 bg-[rgba(46,230,255,0.1)] px-5 py-3 text-sm text-[var(--zz-cyan)] hover:bg-[rgba(46,230,255,0.18)]"
            >
              התחלת המסע
            </Link>
            <a
              href="#toc"
              className="border border-[var(--zz-line)] px-5 py-3 text-sm text-[var(--zz-muted)] hover:text-[var(--zz-ink)]"
            >
              מפת המסע
            </a>
            <Link
              href="/textbook/glossary"
              className="text-sm text-[var(--zz-gold)] hover:underline"
            >
              מילון
            </Link>
            <SimDisclaimer compact />
          </div>

          <div className="mt-10 max-w-md">
            <TextbookCoverClient />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mt-4">
          <PdfDownloadCta />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/method"
            className="text-sm text-[var(--zz-cyan)] hover:underline"
          >
            לדפי השיטה ←
          </Link>
          <Link
            href="/textbook/clear-disclaimer"
            className="text-sm text-[var(--zz-gold)] hover:underline"
          >
            להצהרה הברורה ←
          </Link>
        </div>

        <section className="mt-16 pb-16" id="toc" aria-labelledby="toc-heading">
          <h2
            id="toc-heading"
            className="text-3xl font-bold text-[var(--zz-ink)] sm:text-4xl"
          >
            מפת המסע
          </h2>
          <p className="mt-3 max-w-2xl text-base font-normal leading-8 text-[var(--zz-muted)]">
            שלוש־עשרה תחנות בנרטיב {brand.narrativeConceptHe}. כל תחנה היא פרק
            ספרותי: סיפור, עיקרון, דימוי, דוגמה, פסיכולוגיה ותובנה.
          </p>

          <ol className="mt-10">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <Link
                  href={`/textbook/${chapter.slug}`}
                  className="journey-toc-item group"
                >
                  <span className="journey-toc-num">
                    {String(chapter.number).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.22em] text-[var(--zz-cyan)] uppercase">
                      {chapter.stationHe}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-[var(--zz-ink)] group-hover:text-[var(--zz-cyan)]">
                      {chapter.titleHe}
                    </h3>
                    <p
                      dir="ltr"
                      className="ltr-isolate mt-1 text-sm text-[var(--zz-muted)]"
                    >
                      {chapter.titleEn}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--zz-muted)]">
                      <RichText text={chapter.summaryHe} />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/textbook/glossary" className="journey-toc-item group">
                <span className="journey-toc-num">+</span>
                <div>
                  <p className="text-[11px] tracking-[0.22em] text-[var(--zz-gold)] uppercase">
                    נספח חי
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-[var(--zz-ink)] group-hover:text-[var(--zz-gold)]">
                    מילון מונחים מורחב
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--zz-muted)]">
                    אותם מונחי ליבה כמו בתחנה 11 — בפורמט עיון מהיר.
                  </p>
                </div>
              </Link>
            </li>
          </ol>
        </section>

        <EduDisclaimer className="mb-16" />
      </div>
    </main>
  );
}
