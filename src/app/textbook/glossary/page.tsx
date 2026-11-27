import Link from "next/link";
import type { Metadata } from "next";
import { listGlossaryEntries } from "@/lib/content/glossary";
import { RichText } from "@/lib/content/rich-text";
import { EduDisclaimer } from "@/components/content/edu-disclaimer";
import { PdfDownloadCta } from "@/components/content/pdf-download-cta";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";

export const metadata: Metadata = {
  title: "מילון מונחים",
};

export default function GlossaryPage() {
  const entries = listGlossaryEntries();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/textbook"
          className="text-sm text-[var(--zz-muted)] hover:text-[var(--zz-cyan)]"
        >
          חזרה לספר הלימוד →
        </Link>
        <PdfDownloadCta variant="compact" />
      </div>

      <header className="mt-8">
        <p className="text-xs tracking-[0.25em] text-[var(--zz-gold)] uppercase">
          Glossary
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)]">
          מילון מונחים
        </h1>
        <p className="mt-3 leading-8 text-[var(--zz-muted)]">
          הגדרות לימודיות עקביות לשיטת ZigZag. הדגש על הבחנה בין מרג&apos;ין,
          notional, collateral ו־liquidation.
        </p>
        <div className="mt-3">
          <SimDisclaimer compact />
        </div>
      </header>

      <dl className="mt-10 space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            id={entry.id}
            className="rounded-xl border border-[var(--zz-line)] bg-[rgba(16,26,46,0.45)] px-4 py-4 backdrop-blur-sm"
          >
            <dt className="text-[var(--zz-cyan)]">
              {entry.termHe}
              <span
                dir="ltr"
                className="ltr-isolate ms-2 text-sm text-[var(--zz-muted)]"
              >
                {entry.termEn}
              </span>
            </dt>
            <dd className="mt-2 text-sm leading-7 text-[var(--zz-ink)]/90">
              <RichText text={entry.definitionHe} />
            </dd>
          </div>
        ))}
      </dl>

      <EduDisclaimer className="mt-12" />
    </main>
  );
}
