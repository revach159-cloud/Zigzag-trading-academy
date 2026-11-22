import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAdjacentChapters,
  getChapterBySlug,
  listChapters,
} from "@/lib/content/chapters";
import { getChapterBodyBySlug } from "@/lib/content/bodies";
import { ChapterView } from "@/components/content/chapter-view";

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
  const body = getChapterBodyBySlug(slug);
  if (!chapter || !body) notFound();

  const { prev, next } = getAdjacentChapters(slug);

  return (
    <ChapterView chapter={chapter} body={body} prev={prev} next={next} />
  );
}
