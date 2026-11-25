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
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <section
        className="book-cover relative overflow-hidden rounded-3xl border border-[var(--zz-line)] px-6 py-14 sm:px-12 sm:py-20"
        aria-label="שער הספר"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(46,230,255,0.18), transparent 42%), radial-gradient(ellipse at 85% 30%, rgba(201,168,76,0.12), transparent 40%), linear-gradient(160deg, #03050c 0%, #0a1224 45%, #070b16 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(46,230,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(46,230,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to top, black, transparent)",
          }}
          aria-hidden
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.35em] text-[var(--zz-gold)] uppercase">
              {brand.narrativeConceptEn} · {brand.narrativeConceptHe}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-[0.08em] text-[var(--zz-ink)] sm:text-6xl">
              {brand.name}
            </h1>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--zz-cyan)] sm:text-3xl">
              {brand.bookTitleHe}
            </p>
            <p className="mt-2 text-sm text-[var(--zz-gold)]">
              {brand.methodHe} · {brand.methodEn}
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--zz-muted)] sm:text-lg">
              {brand.taglineHe}
            </p>
            <p
              dir="ltr"
              className="ltr-isolate mt-2 max-w-xl text-sm text-[var(--zz-muted)]"
            >
              {brand.taglineEn}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--zz-muted)]">
              ספר נרטיבי עברי — {chapterCatalog.chapters.length} תחנות מסע, בלי
              חידוני אמריקאי. סימולציה ולימוד בלבד.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#toc"
                className="rounded-lg border border-[var(--zz-cyan)]/45 bg-[rgba(46,230,255,0.12)] px-4 py-2.5 text-sm text-[var(--zz-cyan)] hover:bg-[rgba(46,230,255,0.2)]"
              >
                לתוכן העניינים
              </a>
              <Link
                href={`/textbook/${chapters[0]?.slug ?? "opening-the-journey"}`}
                className="rounded-lg border border-[var(--zz-gold)]/40 bg-[rgba(201,168,76,0.12)] px-4 py-2.5 text-sm text-[var(--zz-gold)] hover:bg-[rgba(201,168,76,0.2)]"
              >
                התחלת המסע
              </Link>
              <Link
                href="/textbook/glossary"
                className="rounded-lg border border-[var(--zz-line)] px-4 py-2.5 text-sm text-[var(--zz-muted)] hover:text-[var(--zz-ink)]"
              >
                מילון מונחים
              </Link>
              <SimDisclaimer compact />
            </div>
            <div className="mt-8 max-w-md">
              <TextbookCoverClient />
            </div>
          </div>

          <EducationalScene kind="cover" className="relative h-64 w-full overflow-hidden rounded-2xl border border-[var(--zz-line)] sm:h-80" />
        </div>
      </section>

      <div className="mt-10">
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

      <section className="mt-12" id="toc" aria-labelledby="toc-heading">
        <h2
          id="toc-heading"
          className="font-[family-name:var(--font-display)] text-2xl text-[var(--zz-ink)]"
        >
          מפת המסע
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--zz-muted)]">
          שלוש־עשרה תחנות בנרטיב {brand.narrativeConceptHe}. כל תחנה: סיפור,
          עיקרון, דימוי, דוגמה, פסיכולוגיה ותובנה.
        </p>

        <ol className="mt-8 space-y-3">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <Link
                href={`/textbook/${chapter.slug}`}
                className="group flex flex-col gap-2 rounded-xl border border-[var(--zz-line)] bg-[rgba(16,26,46,0.45)] px-4 py-4 backdrop-blur-sm transition-colors hover:border-[var(--zz-cyan)]/50 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <p className="text-xs text-[var(--zz-cyan)]">
                    {chapter.stationHe}
                  </p>
                  <h3 className="mt-1 text-lg text-[var(--zz-ink)] group-hover:text-[var(--zz-cyan)]">
                    {chapter.titleHe}
                  </h3>
                  <p
                    dir="ltr"
                    className="ltr-isolate mt-1 text-sm text-[var(--zz-muted)]"
                  >
                    {chapter.titleEn}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--zz-muted)]">
                    <RichText text={chapter.summaryHe} />
                  </p>
                </div>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/textbook/glossary"
              className="group flex flex-col gap-2 rounded-xl border border-[var(--zz-gold)]/30 bg-[rgba(201,168,76,0.06)] px-4 py-4 transition-colors hover:border-[var(--zz-gold)]/55 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <p className="text-xs text-[var(--zz-gold)]">נספח חי</p>
                <h3 className="mt-1 text-lg text-[var(--zz-ink)] group-hover:text-[var(--zz-gold)]">
                  מילון מונחים מורחב
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--zz-muted)]">
                  אותם מונחי ליבה כמו בתחנה 11 — בפורמט עיון מהיר.
                </p>
              </div>
            </Link>
          </li>
        </ol>
      </section>

      <EduDisclaimer className="mt-12" />
    </main>
  );
}
