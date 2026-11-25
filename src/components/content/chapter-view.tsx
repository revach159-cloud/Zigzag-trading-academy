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
  const toc = [
    { id: "story", titleHe: "סיפור התחנה" },
    ...body.sections.map((section) => ({
      id: section.id,
      titleHe: section.titleHe,
    })),
    ...(body.workedExamples.length
      ? [{ id: "examples", titleHe: "דוגמאות מספריות" }]
      : []),
    ...(body.scenarios.success.length || body.scenarios.failure.length
      ? [{ id: "scenarios", titleHe: "תרחישים" }]
      : []),
    ...(body.reflections.length
      ? [{ id: "reflections", titleHe: "שאלות להרהור" }]
      : []),
    { id: "insight", titleHe: "תובנה לזכור" },
    { id: "summary", titleHe: "סיכום התחנה" },
  ];

  const fade = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } };

  return (
    <article className="book-chapter mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
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

      <motion.header
        className="book-chapter-open relative mt-8 overflow-hidden rounded-2xl border border-[var(--zz-line)] bg-[linear-gradient(145deg,rgba(16,26,46,0.92),rgba(7,11,22,0.88))] p-6 sm:p-8"
        {...fade}
        transition={{ duration: 0.55 }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 85% 15%, rgba(46,230,255,0.12), transparent 45%), radial-gradient(ellipse at 10% 90%, rgba(201,168,76,0.1), transparent 40%)",
          }}
          aria-hidden
        />
        <div className="relative">
          <p className="text-xs tracking-[0.28em] text-[var(--zz-cyan)] uppercase">
            {chapter.stationHe}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)] sm:text-4xl">
            {chapter.titleHe}
          </h1>
          <p dir="ltr" className="ltr-isolate mt-2 text-[var(--zz-muted)]">
            {chapter.titleEn}
          </p>
          <p className="mt-4 max-w-2xl leading-8 text-[var(--zz-muted)]">
            <RichText text={chapter.summaryHe} />
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <SimDisclaimer compact />
          </div>
        </div>
      </motion.header>

      {chapter.scene !== "none" ? (
        <div className="mt-8">
          <EducationalScene kind={chapter.scene} />
        </div>
      ) : null}

      <section className="mt-10" id="story">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
          סיפור התחנה
        </h2>
        <p className="mt-4 text-lg leading-9 text-[var(--zz-ink)]/95">
          <RichText text={body.openingStoryHe} />
        </p>
        <p className="mt-4 border-r-2 border-[var(--zz-cyan)]/50 pr-4 text-[var(--zz-cyan)]">
          <RichText text={body.principleHe} />
        </p>
      </section>

      <nav
        className="mt-8 rounded-xl border border-[var(--zz-line)] bg-[rgba(16,26,46,0.45)] p-4 backdrop-blur-sm"
        aria-label="תוכן עניינים לפרק"
      >
        <p className="text-xs tracking-[0.2em] text-[var(--zz-gold)] uppercase">
          בתחנה זו
        </p>
        <ol className="mt-3 space-y-1.5 text-sm">
          {toc.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              <a
                href={`#${item.id}`}
                className="text-[var(--zz-muted)] transition-colors hover:text-[var(--zz-cyan)]"
              >
                <span className="me-2 font-mono text-[10px] text-[var(--zz-gold)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.titleHe}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section className="mt-10" id="objectives">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
          מה לוקחים מהתחנה
        </h2>
        <ul className="mt-4 list-disc space-y-2 pe-5 marker:text-[var(--zz-cyan)]">
          {body.learningObjectivesHe.map((objective) => (
            <li key={objective} className="leading-7 text-[var(--zz-ink)]/95">
              <RichText text={objective} />
            </li>
          ))}
        </ul>
      </section>

      {body.awaitingNotesHe.length > 0 ? (
        <aside className="mt-8 rounded-lg border border-[var(--zz-gold)]/40 bg-[var(--zz-gold-soft)] px-4 py-3">
          <p className="text-sm font-medium text-[var(--zz-gold)]">
            Unresolved / הערות פתוחות
          </p>
          <ul className="mt-2 list-disc space-y-1 pe-5 text-sm text-[var(--zz-ink)]/90">
            {body.awaitingNotesHe.map((note) => (
              <li key={note}>
                <RichText text={note} />
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      {body.sections.map((section) => {
        const start = formulaStart;
        formulaStart += countFormulas(section.blocks);
        return (
          <section key={section.id} className="mt-12" id={section.id}>
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
              {section.titleHe}
            </h2>
            <div className="mt-4">
              <ContentBlocks blocks={section.blocks} formulaStart={start} />
            </div>
          </section>
        );
      })}

      {body.workedExamples.length > 0 ? (
        <section className="mt-12" id="examples">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
            דוגמאות מספריות
          </h2>
          <div className="mt-4 space-y-4">
            {body.workedExamples.map((example) => (
              <div
                key={example.id}
                className="rounded-xl border border-[var(--zz-line)] bg-[rgba(16,26,46,0.5)] p-4 backdrop-blur-sm"
              >
                <h3 className="text-[var(--zz-cyan)]">{example.titleHe}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--zz-muted)]">
                  <RichText text={example.setupHe} />
                </p>
                <ol className="mt-3 list-decimal space-y-2 pe-5 text-sm leading-7">
                  {example.stepsHe.map((step) => (
                    <li key={step}>
                      <RichText text={step} />
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-sm text-[var(--zz-ink)]">
                  <span className="text-[var(--zz-gold)]">תוצאה: </span>
                  <RichText text={example.resultHe} />
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {body.scenarios.success.length > 0 || body.scenarios.failure.length > 0 ? (
        <section className="mt-12 grid gap-4 sm:grid-cols-2" id="scenarios">
          {body.scenarios.success.length > 0 ? (
            <div className="rounded-xl border border-[var(--zz-cyan)]/30 bg-[rgba(46,230,255,0.05)] p-4">
              <h2 className="text-[var(--zz-cyan)]">תרחיש מוצלח</h2>
              {body.scenarios.success.map((scenario) => (
                <div
                  key={scenario.id}
                  className="mt-3 space-y-2 text-sm leading-7"
                >
                  <h3 className="text-[var(--zz-ink)]">{scenario.titleHe}</h3>
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
            <div className="rounded-xl border border-[var(--zz-danger)]/35 bg-[rgba(240,113,120,0.06)] p-4">
              <h2 className="text-[var(--zz-danger)]">תרחיש כושל</h2>
              {body.scenarios.failure.map((scenario) => (
                <div
                  key={scenario.id}
                  className="mt-3 space-y-2 text-sm leading-7"
                >
                  <h3 className="text-[var(--zz-ink)]">{scenario.titleHe}</h3>
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
        <section className="mt-12" id="reflections">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
            שאלות להרהור
          </h2>
          <ol className="mt-4 list-decimal space-y-4 pe-5">
            {body.reflections.map((item) => (
              <li key={item.id} className="leading-7">
                <RichText text={item.promptHe} />
                {item.hintHe ? (
                  <p className="mt-1 text-sm text-[var(--zz-muted)]">
                    רמז: <RichText text={item.hintHe} />
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section
        className="mt-12 rounded-2xl border border-[var(--zz-gold)]/35 bg-[rgba(201,168,76,0.08)] p-6"
        id="insight"
      >
        <p className="text-xs tracking-[0.22em] text-[var(--zz-gold)] uppercase">
          תובנה לזכור
        </p>
        <p className="mt-3 text-lg leading-9 text-[var(--zz-ink)]">
          <RichText text={body.memorableInsightHe} />
        </p>
      </section>

      <section className="mt-12" id="summary">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
          סיכום התחנה
        </h2>
        <ul className="mt-4 list-disc space-y-2 pe-5 marker:text-[var(--zz-gold)]">
          {body.chapterSummaryHe.map((item) => (
            <li key={item} className="leading-7 text-[var(--zz-ink)]/95">
              <RichText text={item} />
            </li>
          ))}
        </ul>
      </section>

      <EduDisclaimer className="mt-12" />

      <nav
        className="mt-14 flex flex-col gap-3 border-t border-[var(--zz-line)] pt-6 sm:flex-row sm:justify-between"
        aria-label="ניווט בין תחנות"
      >
        {prev ? (
          <Link
            href={`/textbook/${prev.slug}`}
            className="rounded-xl border border-[var(--zz-line)] bg-[rgba(16,26,46,0.45)] px-4 py-3 text-sm transition-colors hover:border-[var(--zz-cyan)]/50"
          >
            <span className="block text-xs text-[var(--zz-muted)]">
              התחנה הקודמת
            </span>
            <span className="text-[var(--zz-ink)]">
              {prev.number}. {prev.titleHe}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/textbook/${next.slug}`}
            className="rounded-xl border border-[var(--zz-line)] bg-[rgba(16,26,46,0.45)] px-4 py-3 text-sm transition-colors hover:border-[var(--zz-cyan)]/50 sm:text-start"
          >
            <span className="block text-xs text-[var(--zz-muted)]">
              התחנה הבאה
            </span>
            <span className="text-[var(--zz-ink)]">
              {next.number}. {next.titleHe}
            </span>
          </Link>
        ) : (
          <Link
            href="/textbook"
            className="rounded-xl border border-[var(--zz-gold)]/35 bg-[var(--zz-gold-soft)] px-4 py-3 text-sm text-[var(--zz-gold)]"
          >
            השלמת המסע · חזרה לשער ←
          </Link>
        )}
      </nav>
    </article>
  );
}
