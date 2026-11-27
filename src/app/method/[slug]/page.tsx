import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MethodPageView } from "@/components/content/method-view";
import {
  getMethodPageBySlug,
  listMethodPages,
} from "@/lib/content/method-pages/catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listMethodPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getMethodPageBySlug(slug);
  if (!page) return { title: "דף שיטה לא נמצא" };
  return { title: page.titleHe };
}

export default async function MethodSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getMethodPageBySlug(slug);
  if (!page) notFound();
  return <MethodPageView page={page} />;
}
