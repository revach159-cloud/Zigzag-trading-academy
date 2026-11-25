"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Chapter, ChapterBody } from "@/lib/content/schemas";
import { RichText } from "@/lib/content/rich-text";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";
import { ContentBlocks, countFormulas } from "./content-blocks";
import { EduDisclaimer } from "./edu-disclaimer";
import { PdfDownloadCta } from "./pdf-download-cta";
import { EducationalScene } from "@/components/scene/educational-scene";
import { ReadingProgressBar } from "./reading-progress";

type ChapterViewProps = {
  chapter: Chapter;
  body: ChapterBody;
  prev?: Chapter;
  next?: Chapter;
};

export function ChapterView({ chapter, body, prev, next }: ChapterViewProps) {
  const reduceMotion = useReducedMotion();
  let formulaStart = 1;

  const fade = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

  return (
    <article className="book-chapter mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/textbook"
          className="text-sm text-[var(--zz-muted)] hover:text-[var(--zz-cyan)]"
        >
          חזרה לספר ←
        </Link>
        <PdfDownloadCta variant="compact" />
      </div>

      <div className="mt-6">
        <ReadingProgressBar slug={chapter.slug} />
      </div>

      {/* Editorial station opening — literary, not a website card */}
      <motion.header
        className="book-chapter-open relative mt-10 overflow-hidden"
        {...fade}
        transition={{ duration: 0.75 }}
      >
        {chapter.scene !== "none" ? (
          <div className="book-scene-stage mb-10 h-64 w-full sm:h-80">
            <EducationalScene
              kind={chapter.scene}
              className="absolute inset-0 h-full w-full"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[var(--zz-void)] via-[var(--zz-void)]/75 to-transparent px-5 pb-6 pt-20">
              <p className="text-xs font-medium tracking-[0.28em] text-[var(--zz-cyan)]">
                {chapter.stationHe}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs font-medium tracking-[0.28em] text-[var(--zz-cyan)]">
            {chapter.stationHe}
          </p>
        )}

        <h1 className="zz-title-chapter mt-2 text-[var(--zz-ink)]">
          {chapter.titleHe}
        </h1>
        <p
          dir="ltr"
          className="ltr-isolate mt-3 text-sm font-medium tracking-[0.06em] text-[var(--zz-muted)]"
        >
          {chapter.titleEn}
        </p>
        <p className="book-chapter-lede mt-7 max-w-[38rem]">
          <RichText text={chapter.summaryHe} />
        </p>
        <div className="mt-5">
          <SimDisclaimer compact />
        </div>
      </motion.header>

      <div className="book-visual-pause" aria-hidden />

      <section id="story" className="book-story-section">
        <p className="book-section-eyebrow">סיפור התחנה</p>
        <p className="book-story mt-6">
          <RichText text={body.openingStoryHe} />
        </p>
        <p className="book-principle">
          <RichText text={body.principleHe} />
        </p>
      </section>

      <div className="book-visual-pause" aria-hidden />

      <section id="objectives">
        <h2 className="book-section-title">מה לוקחים מהתחנה</h2>
        <ul className="mt-5 space-y-3 pe-1">
          {body.learningObjectivesHe.map((objective) => (
            <li
              key={objective}
              className="border-r border-[var(--zz-cyan)]/30 pr-4 leading-8 text-[var(--zz-ink)]/95"
            >
              <RichText text={objective} />
            </li>
          ))}
        </ul>
      </section>

      {body.awaitingNotesHe.length > 0 ? (
        <aside className="mt-10 border-r-2 border-[var(--zz-gold)]/50 pr-4">
          <p className="text-sm font-medium text-[var(--zz-gold)]">
            Unresolved / הערות פתוחות
          </p>
          <ul className="mt-2 space-y-2 text-sm leading-7 text-[var(--zz-ink)]/90">
            {body.awaitingNotesHe.map((note) => (
              <li key={note}>
                <RichText text={note} />
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      {body.sections.map((section, index) => {
        const start = formulaStart;
        formulaStart += countFormulas(section.blocks);
        return (
          <section key={section.id} className="mt-14" id={section.id}>
            {index > 0 ? <div className="book-visual-pause mb-10" aria-hidden /> : null}
            <h2 className="book-section-title">{section.titleHe}</h2>
            <div className="mt-5 space-y-5 text-[1.02rem] leading-8">
              <ContentBlocks blocks={section.blocks} formulaStart={start} />
            </div>
          </section>
        );
      })}

      {body.workedExamples.length > 0 ? (
        <section className="mt-16" id="examples">
          <div className="book-visual-pause mb-10" aria-hidden />
          <h2 className="book-section-title">דוגמאות מספריות</h2>
          <div className="mt-6 space-y-8">
            {body.workedExamples.map((example) => (
              <div key={example.id} className="border-r border-[var(--zz-line)] pr-5">
                <h3 className="text-lg font-semibold text-[var(--zz-cyan)]">
                  {example.titleHe}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-8 text-[var(--zz-muted)]">
                  <RichText text={example.setupHe} />
                </p>
                <ol className="mt-4 list-decimal space-y-3 pe-5 text-[0.98rem] leading-8">
                  {example.stepsHe.map((step) => (
                    <li key={step}>
                      <RichText text={step} />
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-[0.98rem] leading-8 text-[var(--zz-ink)]">
                  <span className="text-[var(--zz-gold)]">תוצאה: </span>
                  <RichText text={example.resultHe} />
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {body.scenarios.success.length > 0 || body.scenarios.failure.length > 0 ? (
        <section className="mt-16 space-y-10" id="scenarios">
          <div className="book-visual-pause" aria-hidden />
          {body.scenarios.success.length > 0 ? (
            <div>
              <h2 className="book-section-title text-[var(--zz-cyan)]">
                תרחיש מוצלח
              </h2>
              {body.scenarios.success.map((scenario) => (
                <div key={scenario.id} className="mt-4 space-y-3 leading-8">
                  <h3 className="text-lg text-[var(--zz-ink)]">{scenario.titleHe}</h3>
                  <p className="text-[var(--zz-muted)]">
                    <RichText text={scenario.narrativeHe} />
                  </p>
                  <p>
                    <span className="text-[var(--zz-cyan)]">תוצאה: </span>
                    <RichText text={scenario.outcomeHe} />
                  </p>
                  <p>
                    <span className="text-[var(--zz-gold)]">לקח: </span>
                    <RichText text={scenario.lessonHe} />
                  </p>
                </div>
              ))}
            </div>
          ) : null}
          {body.scenarios.failure.length > 0 ? (
            <div>
              <h2 className="book-section-title text-[var(--zz-danger)]">
                תרחיש כושל
              </h2>
              {body.scenarios.failure.map((scenario) => (
                <div key={scenario.id} className="mt-4 space-y-3 leading-8">
                  <h3 className="text-lg text-[var(--zz-ink)]">{scenario.titleHe}</h3>
                  <p className="text-[var(--zz-muted)]">
                    <RichText text={scenario.narrativeHe} />
                  </p>
                  <p>
                    <span className="text-[var(--zz-danger)]">תוצאה: </span>
                    <RichText text={scenario.outcomeHe} />
                  </p>
                  <p>
                    <span className="text-[var(--zz-gold)]">לקח: </span>
                    <RichText text={scenario.lessonHe} />
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {body.reflections.length > 0 ? (
        <section className="mt-16" id="reflections">
          <div className="book-visual-pause mb-10" aria-hidden />
          <h2 className="book-section-title">שאלות להרהור</h2>
          <ol className="mt-6 list-decimal space-y-5 pe-5 leading-8">
            {body.reflections.map((item) => (
              <li key={item.id}>
                <RichText text={item.promptHe} />
                {item.hintHe ? (
                  <p className="mt-2 text-sm text-[var(--zz-muted)]">
                    רמז: <RichText text={item.hintHe} />
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="book-insight" id="insight">
        <p className="book-section-eyebrow">תובנה לזכור</p>
        <p className="mt-5 text-2xl font-bold leading-[1.55] text-[var(--zz-ink)]">
          <RichText text={body.memorableInsightHe} />
        </p>
      </section>

      <section className="mt-14" id="summary">
        <h2 className="book-section-title">סיכום התחנה</h2>
        <ul className="mt-5 space-y-3">
          {body.chapterSummaryHe.map((item) => (
            <li
              key={item}
              className="border-r border-[var(--zz-gold)]/35 pr-4 leading-8 text-[var(--zz-ink)]/95"
            >
              <RichText text={item} />
            </li>
          ))}
        </ul>
      </section>

      {next ? (
        <p className="mt-14 text-sm leading-7 text-[var(--zz-muted)]">
          המסלול ממשיך אל{" "}
          <Link
            href={`/textbook/${next.slug}`}
            className="text-[var(--zz-cyan)] hover:underline"
          >
            {next.titleHe}
          </Link>
          — אותה שפת Lookback, תחנה אחת קדימה.
        </p>
      ) : (
        <p className="mt-14 text-sm leading-7 text-[var(--zz-muted)]">
          כאן נגמר השער. המצפן נשאר בידיים — בלי הבטחה, עם משמעת.
        </p>
      )}

      <EduDisclaimer className="mt-12" />

      <nav
        className="mt-14 flex flex-col gap-6 border-t border-[var(--zz-line)] pt-8 sm:flex-row sm:justify-between"
        aria-label="ניווט בין תחנות"
      >
        {prev ? (
          <Link
            href={`/textbook/${prev.slug}`}
            className="group text-sm transition-colors"
          >
            <span className="block text-[11px] font-medium tracking-[0.2em] text-[var(--zz-muted)] uppercase">
              התחנה הקודמת
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
              התחנה הבאה
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
            השלמת המסע · חזרה לשער ←
          </Link>
        )}
      </nav>
    </article>
  );
}
