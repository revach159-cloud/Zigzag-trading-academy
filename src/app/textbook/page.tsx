import Link from "next/link";
import type { Metadata } from "next";
import {
  listChapters,
  chapterCatalog,
  listAppendices,
} from "@/lib/content/chapters";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";
import { RichText } from "@/lib/content/rich-text";
import { brand } from "@/lib/design/tokens";
import { PdfDownloadCta } from "@/components/content/pdf-download-cta";
import { EduDisclaimer } from "@/components/content/edu-disclaimer";
import { CoverScene } from "@/components/scene/cover-scene";
import { TextbookCoverClient } from "@/components/content/textbook-cover-client";

export const metadata: Metadata = {
  title: `${brand.bookTitleHe} — ספר דיגיטלי`,
};

export default function TextbookPage() {
  const chapters = listChapters();
  const appendices = listAppendices();

  return (
    <main className="flex-1">
      <section
        className="book-cover relative isolate min-h-[100svh] overflow-hidden px-4 py-16 sm:px-8 sm:py-20"
        aria-label="שער הספר"
      >
        <div className="absolute inset-0 -z-10">
          <CoverScene className="absolute inset-0 h-full w-full" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(2,4,10,0.88) 0%, rgba(2,4,10,0.55) 38%, rgba(2,4,10,0.35) 62%, rgba(2,4,10,0.72) 100%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-48"
            style={{
              background:
                "linear-gradient(to top, var(--zz-void), transparent)",
            }}
            aria-hidden
          />
        </div>

        <div className="relative mx-auto flex min-h-[78vh] w-full max-w-6xl flex-col justify-center">
          <p className="zz-subtitle text-[11px] tracking-[0.4em] text-[var(--zz-silver)] uppercase">
            {brand.narrativeConceptEn}
          </p>
          <h1 className="zz-title-hero mt-5 tracking-[0.08em] text-[var(--zz-ink)]">
            ZIGZAG · LOOKBACK
          </h1>
          <p className="mt-4 text-xl font-semibold tracking-[0.06em] text-[var(--zz-gold)] sm:text-2xl">
            {brand.methodHe}
          </p>
          <p className="mt-6 text-lg font-medium tracking-[0.04em] text-[var(--zz-silver)] sm:text-xl">
            {brand.authorBylineHe}
          </p>
          <p className="mt-8 max-w-xl text-lg font-normal leading-9 text-[var(--zz-muted)] sm:text-xl">
            {brand.taglineHe}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={`/textbook/${chapters[0]?.slug ?? "opening"}`}
              className="cover-cta px-6 py-3.5 text-sm font-semibold tracking-[0.04em]"
            >
              {brand.ctaStartReadingHe}
            </Link>
            <a
              href="#toc"
              className="border border-[var(--zz-line)] px-5 py-3.5 text-sm text-[var(--zz-muted)] hover:text-[var(--zz-ink)]"
            >
              תוכן העניינים
            </a>
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
            href="/textbook/appendix-glossary"
            className="text-sm text-[var(--zz-cyan)] hover:underline"
          >
            מילון ←
          </Link>
          <Link
            href="/textbook/appendix-disclaimer"
            className="text-sm text-[var(--zz-gold)] hover:underline"
          >
            להצהרה הברורה ←
          </Link>
        </div>

        <section className="mt-16 pb-16" id="toc" aria-labelledby="toc-heading">
          <h2 id="toc-heading" className="journey-toc-heading">
            תוכן העניינים
          </h2>
          <p className="journey-toc-lede">
            {chapterCatalog.chapters.length} יחידות ב־{brand.bookTitleHe}: פרק
            פתיחה ואחריו פרקים 1–11.
          </p>

          <ol className="journey-toc mt-10">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <Link
                  href={`/textbook/${chapter.slug}`}
                  className="journey-toc-item group"
                >
                  <span className="journey-toc-num" aria-hidden="true">
                    {chapter.kind === "opening"
                      ? "00"
                      : String(chapter.order).padStart(2, "0")}
                  </span>
                  <div className="journey-toc-body">
                    <p className="journey-toc-label">{chapter.numberLabelHe}</p>
                    <h3 className="journey-toc-title">{chapter.titleHe}</h3>
                    <p dir="ltr" className="ltr-isolate journey-toc-en">
                      {chapter.titleEn}
                    </p>
                    <p className="journey-toc-summary">
                      <RichText text={chapter.summaryHe} />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
            {appendices.map((appendix) => (
              <li key={appendix.id}>
                <Link
                  href={`/textbook/${appendix.slug}`}
                  className="journey-toc-item journey-toc-item--appendix group"
                >
                  <span className="journey-toc-num" aria-hidden="true">
                    +
                  </span>
                  <div className="journey-toc-body">
                    <p className="journey-toc-label journey-toc-label--appendix">
                      נספח
                    </p>
                    <h3 className="journey-toc-title">{appendix.titleHe}</h3>
                    <p dir="ltr" className="ltr-isolate journey-toc-en">
                      {appendix.titleEn}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <EduDisclaimer className="mb-16" />
      </div>
    </main>
  );
}
