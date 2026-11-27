import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAdjacentChapters,
  getChapterBySlug,
  listChapters,
} from "@/lib/content/chapters";
import {
  getAppendixBySlug,
  getManuscriptBySlug,
  listAppendices,
} from "@/lib/content/manuscript/load";
import { ManuscriptView } from "@/components/content/manuscript-view";
import { AppendixView } from "@/components/content/appendix-view";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const units = listChapters().map((chapter) => ({ slug: chapter.slug }));
  const appendices = listAppendices().map((item) => ({ slug: item.slug }));
  return [...units, ...appendices];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (chapter) {
    return {
      title:
        chapter.kind === "opening"
          ? chapter.titleHe
          : `${chapter.numberLabelHe}: ${chapter.titleHe}`,
    };
  }
  const appendix = getAppendixBySlug(slug);
  if (appendix) {
    return { title: appendix.meta.titleHe };
  }
  return { title: "פרק לא נמצא" };
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (chapter) {
    const document = getManuscriptBySlug(slug);
    if (!document) notFound();
    const { prev, next } = getAdjacentChapters(slug);
    return (
      <ManuscriptView
        chapter={chapter}
        document={document}
        prev={prev}
        next={next}
      />
    );
  }

  const appendix = getAppendixBySlug(slug);
  if (appendix) {
    return (
      <AppendixView meta={appendix.meta} document={appendix.document} />
    );
  }

  notFound();
}
