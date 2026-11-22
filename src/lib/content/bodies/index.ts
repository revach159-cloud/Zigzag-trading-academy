import { chapterBodySchema, type ChapterBody } from "../schemas";
import { chapter01Body } from "./ch-01";
import { chapter02Body } from "./ch-02";
import { chapter03Body } from "./ch-03";
import { chapter04Body } from "./ch-04";
import { chapter05Body } from "./ch-05";
import { chapter06Body } from "./ch-06";
import { chapter07Body } from "./ch-07";
import { chapter08Body } from "./ch-08";
import { chapter09Body } from "./ch-09";
import { chapter10Body } from "./ch-10";
import { chapter11Body } from "./ch-11";
import { chapter12Body } from "./ch-12";

export const chapterBodies: ChapterBody[] = [
  chapter01Body,
  chapter02Body,
  chapter03Body,
  chapter04Body,
  chapter05Body,
  chapter06Body,
  chapter07Body,
  chapter08Body,
  chapter09Body,
  chapter10Body,
  chapter11Body,
  chapter12Body,
].map((body) => chapterBodySchema.parse(body));

export function getChapterBodyBySlug(slug: string): ChapterBody | undefined {
  return chapterBodies.find((body) => body.slug === slug);
}
