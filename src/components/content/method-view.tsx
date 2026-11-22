import Link from "next/link";
import type { MethodPage } from "@/lib/content/schemas";
import { listMethodPages } from "@/lib/content/method-pages/catalog";
import { RichText } from "@/lib/content/rich-text";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";
import { ContentBlocks } from "./content-blocks";
import { KnowledgeCheck } from "./knowledge-check";

export function MethodHub() {
  const pages = listMethodPages();
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.25em] text-[var(--zz-gold)] uppercase">
        Method
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)] sm:text-4xl">
        מתודולוגיית ZigZag
      </h1>
      <p className="mt-4 leading-8 text-[var(--zz-muted)]">
        <RichText text="דפי השיטה מסבירים `reinforcement`, מעברי 1x↔10x ומימוש רווח לפי טיוטות התכנית. אין ביצועי עבר ואין כללים מומצאים מעבר למסומן." />
      </p>
      <div className="mt-3">
        <SimDisclaimer compact />
      </div>

      <ol className="mt-10 space-y-3">
        {pages.map((page, index) => (
          <li key={page.slug}>
            <Link
              href={`/method/${page.slug}`}
              className="group block border border-[var(--zz-line)] bg-[var(--zz-panel)]/40 px-4 py-4 transition-colors hover:border-[var(--zz-cyan)]/50"
            >
              <p className="text-xs text-[var(--zz-cyan)]">
                {index + 1}. {page.titleEn}
                {page.awaitingConfirmation ? (
                  <span className="ms-2 text-[var(--zz-gold)]">
                    · ממתין לאישור
                  </span>
                ) : null}
              </p>
              <h2 className="mt-1 text-lg text-[var(--zz-ink)] group-hover:text-[var(--zz-cyan)]">
                {page.titleHe}
              </h2>
              <p className="mt-2 text-sm text-[var(--zz-muted)]">
                <RichText text={page.summaryHe} />
              </p>
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-sm text-[var(--zz-muted)]">
        להמשך לימוד מובנה עברו ל־
        <Link href="/textbook" className="text-[var(--zz-cyan)] hover:underline">
          ספר הלימוד בן 12 הפרקים
        </Link>
        .
      </p>
    </main>
  );
}

export function MethodPageView({ page }: { page: MethodPage }) {
  const pages = listMethodPages();
  const index = pages.findIndex((item) => item.slug === page.slug);
  const prev = index > 0 ? pages[index - 1] : undefined;
  const next = index < pages.length - 1 ? pages[index + 1] : undefined;

  return (
    <article className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <Link
        href="/method"
        className="text-sm text-[var(--zz-muted)] hover:text-[var(--zz-cyan)]"
      >
        ← חזרה לשיטה
      </Link>

      <header className="mt-8">
        <p className="text-xs tracking-[0.2em] text-[var(--zz-gold)] uppercase">
          Method · {page.titleEn}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)]">
          {page.titleHe}
        </h1>
        <p className="mt-3 leading-8 text-[var(--zz-muted)]">
          <RichText text={page.summaryHe} />
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {page.awaitingConfirmation ? (
            <span className="text-sm text-[var(--zz-gold)]">
              טיוטת מתודולוגיה · ממתין לאישור
            </span>
          ) : null}
          <SimDisclaimer compact />
        </div>
      </header>

      {page.awaitingNotesHe.length > 0 ? (
        <aside className="mt-8 rounded-sm border border-[var(--zz-gold)]/40 bg-[var(--zz-gold-soft)] px-4 py-3">
          <p className="text-sm font-medium text-[var(--zz-gold)]">
            ממתין לאישור בעלים
          </p>
          <ul className="mt-2 list-disc space-y-1 pe-5 text-sm">
            {page.awaitingNotesHe.map((note) => (
              <li key={note}>
                <RichText text={note} />
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      {page.sections.map((section) => (
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
          דוגמה מספרית
        </h2>
        <div className="mt-4 space-y-4">
          {page.workedExamples.map((example) => (
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
              <p className="mt-3 text-sm">
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
          {page.scenarios.success.map((scenario) => (
            <div key={scenario.id} className="mt-3 space-y-2 text-sm leading-7">
              <h3>{scenario.titleHe}</h3>
              <p className="text-[var(--zz-muted)]">
                <RichText text={scenario.narrativeHe} />
              </p>
              <p>
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
          {page.scenarios.failure.map((scenario) => (
            <div key={scenario.id} className="mt-3 space-y-2 text-sm leading-7">
              <h3>{scenario.titleHe}</h3>
              <p className="text-[var(--zz-muted)]">
                <RichText text={scenario.narrativeHe} />
              </p>
              <p>
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
          שאלות ידע
        </h2>
        <div className="mt-4">
          <KnowledgeCheck questions={page.knowledgeQuestions} />
        </div>
      </section>

      <nav className="mt-14 flex flex-col gap-3 border-t border-[var(--zz-line)] pt-6 sm:flex-row sm:justify-between">
        {prev ? (
          <Link
            href={`/method/${prev.slug}`}
            className="rounded-sm border border-[var(--zz-line)] px-4 py-3 text-sm hover:border-[var(--zz-cyan)]/50"
          >
            <span className="block text-xs text-[var(--zz-muted)]">הקודם</span>
            {prev.titleHe}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/method/${next.slug}`}
            className="rounded-sm border border-[var(--zz-line)] px-4 py-3 text-sm hover:border-[var(--zz-cyan)]/50"
          >
            <span className="block text-xs text-[var(--zz-muted)]">הבא</span>
            {next.titleHe}
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
