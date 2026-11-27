import Link from "next/link";
import type {
  AppendixMeta,
  ManuscriptDocument,
} from "@/lib/content/manuscript/types";
import { EduDisclaimer } from "./edu-disclaimer";
import { ManuscriptBlocks } from "./manuscript-blocks";

export function AppendixView({
  meta,
  document,
}: {
  meta: AppendixMeta;
  document: ManuscriptDocument;
}) {
  return (
    <article className="book-chapter mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/textbook"
        className="text-sm text-[var(--zz-muted)] hover:text-[var(--zz-cyan)]"
      >
        חזרה לספר ←
      </Link>

      <header className="mt-10">
        <p className="text-xs font-medium tracking-[0.28em] text-[var(--zz-gold)]">
          נספח
        </p>
        <h1 className="zz-title-chapter mt-2 text-[var(--zz-ink)]">
          {meta.titleHe}
        </h1>
        <p
          dir="ltr"
          className="ltr-isolate mt-3 text-sm text-[var(--zz-muted)]"
        >
          {meta.titleEn}
        </p>
      </header>

      {document.sections.map((section) => (
        <section key={section.id} className="mt-12" id={section.id}>
          <h2 className="book-section-title">{section.titleHe}</h2>
          <div className="mt-5">
            <ManuscriptBlocks blocks={section.blocks} />
          </div>
        </section>
      ))}

      <EduDisclaimer className="mt-12" />
    </article>
  );
}
