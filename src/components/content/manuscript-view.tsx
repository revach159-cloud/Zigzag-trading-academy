"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type {
  Chapter,
  ManuscriptDocument,
} from "@/lib/content/manuscript/types";
import { RichText } from "@/lib/content/rich-text";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";
import { EduDisclaimer } from "./edu-disclaimer";
import { PdfDownloadCta } from "./pdf-download-cta";
import { EducationalScene } from "@/components/scene/educational-scene";
import { ReadingProgressBar } from "./reading-progress";
import {
  ManuscriptBlocks,
  countManuscriptFormulas,
} from "./manuscript-blocks";
import { EndVisualExperience } from "@/components/end-visuals";

type ManuscriptViewProps = {
  chapter: Chapter;
  document: ManuscriptDocument;
  prev?: Chapter;
  next?: Chapter;
};

export function ManuscriptView({
  chapter,
  document,
  prev,
  next,
}: ManuscriptViewProps) {
  const reduceMotion = useReducedMotion();
  let formulaStart = 1;

  const fade = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

  const endVisual = chapter.endVisual;

  return (
    <article className="book-chapter mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/textbook"
          className="text-sm text-[var(--zz-muted)] hover:text-[var(--zz-cyan)]"
        >
          חזרה לספר ←
        </Link>
        <PdfDownloadCta variant="compact" />
      </div>

      <div className="mt-4">
        <ReadingProgressBar slug={chapter.slug} />
      </div>

      <motion.header
        className="book-chapter-open relative mt-6 overflow-hidden"
        {...fade}
        transition={{ duration: 0.75 }}
      >
        {chapter.scene !== "none" ? (
          <div className="book-scene-stage mb-5 h-48 w-full sm:h-60">
            <EducationalScene
              kind={chapter.scene}
              className="absolute inset-0 h-full w-full"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[var(--zz-void)] via-[var(--zz-void)]/75 to-transparent px-5 pb-5 pt-16">
              <p className="text-xs font-medium tracking-[0.28em] text-[var(--zz-cyan)]">
                {chapter.numberLabelHe}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs font-medium tracking-[0.28em] text-[var(--zz-cyan)]">
            {chapter.numberLabelHe}
          </p>
        )}

        <h1 className="zz-title-chapter mt-1 text-[var(--zz-ink)]">
          {chapter.titleHe}
        </h1>
        <p
          dir="ltr"
          className="ltr-isolate zz-subtitle mt-2 tracking-[0.06em]"
        >
          {chapter.titleEn}
        </p>
        <p className="book-chapter-lede mt-4">
          <RichText text={chapter.summaryHe} />
        </p>
        <div className="mt-3">
          <SimDisclaimer compact />
        </div>
      </motion.header>

      <div className="book-visual-pause" aria-hidden />

      {document.sections.map((section, index) => {
        const start = formulaStart;
        formulaStart += countManuscriptFormulas(section.blocks);
        // Parser labels untitled lead prose as "פתיחה"; hide that synthetic
        // heading so approved manuscripts can open under the chapter H1 only.
        const isLeadProse = section.titleHe === "פתיחה";
        return (
          <section
            key={section.id}
            className={index === 0 ? "mt-6" : "mt-9"}
            id={section.id}
          >
            {index > 0 ? (
              <div className="book-visual-pause mb-5" aria-hidden />
            ) : null}
            {!isLeadProse ? (
              <h2 className="book-section-title">
                <RichText text={section.titleHe} />
              </h2>
            ) : null}
            <div className={isLeadProse ? undefined : "mt-3.5"}>
              <ManuscriptBlocks blocks={section.blocks} formulaStart={start} />
            </div>
          </section>
        );
      })}

      <EndVisualExperience endVisual={endVisual} />

      {next ? (
        <p className="mt-10 text-sm leading-7 text-[var(--zz-muted)]">
          הפרק הבא:{" "}
          <Link
            href={`/textbook/${next.slug}`}
            className="text-[var(--zz-cyan)] hover:underline"
          >
            {next.titleHe}
          </Link>
        </p>
      ) : (
        <p className="mt-10 text-sm leading-7 text-[var(--zz-muted)]">
          כאן מסתיימים אחד־עשר הפרקים. הנספחים (מילון והצהרה) ממתינים מחוץ
          למספור.
        </p>
      )}

      <EduDisclaimer className="mt-8" />

      <nav
        className="mt-10 flex flex-col gap-5 border-t border-[var(--zz-line)] pt-6 sm:flex-row sm:justify-between"
        aria-label="ניווט בין פרקים"
      >
        {prev ? (
          <Link
            href={`/textbook/${prev.slug}`}
            className="group text-sm transition-colors"
          >
            <span className="block text-[11px] font-medium tracking-[0.2em] text-[var(--zz-muted)] uppercase">
              הקודם
            </span>
            <span className="mt-1 block text-xl font-bold text-[var(--zz-ink)] group-hover:text-[var(--zz-cyan)]">
              {prev.titleHe}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/textbook/${next.slug}`}
            className="group text-sm transition-colors sm:text-start"
          >
            <span className="block text-[11px] font-medium tracking-[0.2em] text-[var(--zz-muted)] uppercase">
              הבא
            </span>
            <span className="mt-1 block text-xl font-bold text-[var(--zz-ink)] group-hover:text-[var(--zz-cyan)]">
              {next.titleHe}
            </span>
          </Link>
        ) : (
          <Link
            href="/textbook"
            className="text-sm text-[var(--zz-gold)] hover:underline"
          >
            חזרה לשער הספר ←
          </Link>
        )}
      </nav>
    </article>
  );
}
