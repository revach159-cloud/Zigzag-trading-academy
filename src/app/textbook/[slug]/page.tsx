import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getChapterBySlug, listChapters } from "@/lib/content/chapters";
import { SimDisclaimer } from "@/components/layout/sim-disclaimer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listChapters().map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return { title: "פרק לא נמצא" };
  return { title: `פרק ${chapter.number}: ${chapter.titleHe}` };
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <Link
        href="/textbook"
        className="text-sm text-[var(--zz-muted)] hover:text-[var(--zz-cyan)]"
      >
        ← חזרה לספר הלימוד
      </Link>

      <p className="mt-8 text-xs text-[var(--zz-cyan)]">פרק {chapter.number}</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--zz-ink)]">
        {chapter.titleHe}
      </h1>
      <p dir="ltr" className="ltr-isolate mt-2 text-[var(--zz-muted)]">
        {chapter.titleEn}
      </p>

      <div className="mt-6 space-y-3 border border-[var(--zz-line)] bg-[var(--zz-panel)]/50 p-5">
        <p className="text-sm text-[var(--zz-ink)]">{chapter.summaryHe}</p>
        <p className="text-sm text-[var(--zz-muted)]">
          זהו שלד תוכן (
          <span dir="ltr" className="ltr-isolate font-mono text-xs">
            outline
          </span>
          ) בלבד — לא פרק ספר מלא. תוכן עברי מלא יתווסף בשלב התוכן.
        </p>
        {chapter.awaitingConfirmation ? (
          <p className="text-sm text-[var(--zz-gold)]">
            כללי מתודולוגיה בפרק זה ממתינים לאישור בעלים — אין להמציא נוסחאות.
          </p>
        ) : null}
        <SimDisclaimer compact />
      </div>
    </main>
  );
}
