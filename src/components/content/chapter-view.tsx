import Link from "next/link";
import type { Chapter, ChapterBody } from "@/lib/content/schemas";
import { RichText } from "@/lib/content/rich-text";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";
import { ContentBlocks } from "./content-blocks";
import { KnowledgeCheck } from "./knowledge-check";

type ChapterViewProps = {
  chapter: Chapter;
  body: ChapterBody;
  prev?: Chapter;
  next?: Chapter;
};

export function ChapterView({ chapter, body, prev, next }: ChapterViewProps) {
  return (
    <article className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <Link
        href="/textbook"
        className="text-sm text-[var(--zz-muted)] hover:text-[var(--zz-cyan)]"
      >
        ← חזרה לספר הלימוד
      </Link>

      <header className="mt-8">
        <p className="text-xs text-[var(--zz-cyan)]">פרק {chapter.number}</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)] sm:text-4xl">
          {chapter.titleHe}
        </h1>
        <p dir="ltr" className="ltr-isolate mt-2 text-[var(--zz-muted)]">
          {chapter.titleEn}
        </p>
        <p className="mt-4 leading-8 text-[var(--zz-muted)]">
          <RichText text={chapter.summaryHe} />
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-sm border border-[var(--zz-line)] px-2 py-1 font-mono text-[10px] tracking-wide text-[var(--zz-muted)] uppercase">
            {chapter.status}
          </span>
          {chapter.awaitingConfirmation ? (
            <span className="text-sm text-[var(--zz-gold)]">
              חלקים בפרק ממתינים לאישור מתודולוגיה
            </span>
          ) : null}
          <SimDisclaimer compact />
        </div>
      </header>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
          מטרות למידה
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
        <aside className="mt-8 rounded-sm border border-[var(--zz-gold)]/40 bg-[var(--zz-gold-soft)] px-4 py-3">
          <p className="text-sm font-medium text-[var(--zz-gold)]">
            ממתין לאישור בעלים
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

      {body.sections.map((section) => (
        <section key={section.id} className="mt-12" id={section.id}>
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
            {section.titleHe}
          </h2>
          <div className="mt-4">
            <ContentBlocks blocks={section.blocks} />
          </div>
        </section>
      ))}

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
          דוגמאות מספריות
        </h2>
        <div className="mt-4 space-y-4">
          {body.workedExamples.map((example) => (
            <div
              key={example.id}
              className="rounded-sm border border-[var(--zz-line)] bg-[var(--zz-panel)]/40 p-4"
            >
              <h3 className="text-[var(--zz-cyan)]">{example.titleHe}</h3>
              {example.awaitingConfirmation ? (
                <p className="mt-1 text-xs text-[var(--zz-gold)]">
                  דוגמה לימודית לפי טיוטת הנחות — ממתין לאישור
                </p>
              ) : null}
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

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-sm border border-[var(--zz-cyan)]/30 bg-[rgba(46,230,255,0.05)] p-4">
          <h2 className="text-[var(--zz-cyan)]">תרחיש מוצלח</h2>
          {body.scenarios.success.map((scenario) => (
            <div key={scenario.id} className="mt-3 space-y-2 text-sm leading-7">
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
        <div className="rounded-sm border border-[var(--zz-danger)]/35 bg-[rgba(240,113,120,0.06)] p-4">
          <h2 className="text-[var(--zz-danger)]">תרחיש כושל</h2>
          {body.scenarios.failure.map((scenario) => (
            <div key={scenario.id} className="mt-3 space-y-2 text-sm leading-7">
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
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
          תרגילים
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pe-5">
          {body.exercises.map((exercise) => (
            <li key={exercise.id} className="leading-7">
              <RichText text={exercise.promptHe} />
              {exercise.hintHe ? (
                <p className="mt-1 text-sm text-[var(--zz-muted)]">
                  רמז: <RichText text={exercise.hintHe} />
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
          שאלות ידע
        </h2>
        <div className="mt-4">
          <KnowledgeCheck questions={body.knowledgeQuestions} />
        </div>
      </section>

      <nav
        className="mt-14 flex flex-col gap-3 border-t border-[var(--zz-line)] pt-6 sm:flex-row sm:justify-between"
        aria-label="ניווט בין פרקים"
      >
        {prev ? (
          <Link
            href={`/textbook/${prev.slug}`}
            className="rounded-sm border border-[var(--zz-line)] px-4 py-3 text-sm hover:border-[var(--zz-cyan)]/50"
          >
            <span className="block text-xs text-[var(--zz-muted)]">
              הפרק הקודם
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
            className="rounded-sm border border-[var(--zz-line)] px-4 py-3 text-sm hover:border-[var(--zz-cyan)]/50 sm:text-start"
          >
            <span className="block text-xs text-[var(--zz-muted)]">
              הפרק הבא
            </span>
            <span className="text-[var(--zz-ink)]">
              {next.number}. {next.titleHe}
            </span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
