import Link from "next/link";
import type { Metadata } from "next";
import { listChapters } from "@/lib/content/chapters";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";
import { RichText } from "@/lib/content/rich-text";
import { brand } from "@/lib/design/tokens";
import { PdfDownloadCta } from "@/components/content/pdf-download-cta";
import { EduDisclaimer } from "@/components/content/edu-disclaimer";

export const metadata: Metadata = {
  title: "ספר לימוד דיגיטלי — 12 פרקים",
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
              "radial-gradient(ellipse at 20% 20%, rgba(46,230,255,0.16), transparent 42%), radial-gradient(ellipse at 85% 30%, rgba(201,168,76,0.14), transparent 40%), linear-gradient(160deg, #070b16 0%, #0b1528 45%, #03050c 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(46,230,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(46,230,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to top, black, transparent)",
          }}
          aria-hidden
        />
        <div className="relative max-w-3xl">
          <p className="text-xs tracking-[0.35em] text-[var(--zz-gold)] uppercase">
            Digital Textbook
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-[0.12em] text-[var(--zz-ink)] sm:text-6xl">
            {brand.name}
          </h1>
          <p className="mt-2 font-[family-name:var(--font-display)] text-lg text-[var(--zz-cyan)] sm:text-2xl">
            Trading Academy
          </p>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--zz-muted)] sm:text-lg">
            ספר לימוד עברי מלא למתודולוגיית ZigZag — 12 פרקים, דפי שיטה, מילון,
            בחינה מסכמת ו־PDF להדפסה. סימולציה ולימוד בלבד.
          </p>
          <p className="mt-3 text-sm text-[var(--zz-gold)]">{brand.taglineHe}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#toc"
              className="rounded-lg border border-[var(--zz-cyan)]/45 bg-[rgba(46,230,255,0.12)] px-4 py-2.5 text-sm text-[var(--zz-cyan)] hover:bg-[rgba(46,230,255,0.2)]"
            >
              לתוכן העניינים
            </a>
            <Link
              href="/textbook/glossary"
              className="rounded-lg border border-[var(--zz-line)] px-4 py-2.5 text-sm text-[var(--zz-muted)] hover:text-[var(--zz-ink)]"
            >
              מילון מונחים
            </Link>
            <SimDisclaimer compact />
          </div>
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
          href="/textbook/final-examination"
          className="text-sm text-[var(--zz-gold)] hover:underline"
        >
          לבחינה המסכמת ←
        </Link>
      </div>

      <section className="mt-12" id="toc" aria-labelledby="toc-heading">
        <h2
          id="toc-heading"
          className="font-[family-name:var(--font-display)] text-2xl text-[var(--zz-ink)]"
        >
          תוכן עניינים
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--zz-muted)]">
          ניווט ישיר לכל פרק. המתודולוגיה תואמת לאישור הבעלים — ללא ביצועי עבר
          מבוימים.
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
                    פרק {chapter.number}
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
                <span className="shrink-0 self-start rounded-md border border-[var(--zz-line)] px-2 py-1 font-mono text-[10px] tracking-wide text-[var(--zz-muted)] uppercase">
                  {chapter.status}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/textbook/glossary"
              className="group flex flex-col gap-2 rounded-xl border border-[var(--zz-gold)]/30 bg-[rgba(201,168,76,0.06)] px-4 py-4 transition-colors hover:border-[var(--zz-gold)]/55 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <p className="text-xs text-[var(--zz-gold)]">נספח</p>
                <h3 className="mt-1 text-lg text-[var(--zz-ink)] group-hover:text-[var(--zz-gold)]">
                  מילון מונחים
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--zz-muted)]">
                  Margin, notional, collateral, liquidation ועוד — הגדרות
                  לימודיות עקביות.
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
