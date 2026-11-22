import { z } from "zod";

export const chapterStatusSchema = z.enum([
  "outline",
  "draft",
  "review",
  "published",
]);

export const chapterSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  number: z.number().int().min(1).max(12),
  titleHe: z.string().min(1),
  titleEn: z.string().min(1),
  summaryHe: z.string().min(1),
  status: chapterStatusSchema,
  awaitingConfirmation: z.boolean().default(false),
});

export const chapterCatalogSchema = z.object({
  version: z.literal(1),
  simulationOnly: z.literal(true),
  chapters: z.array(chapterSchema).length(12),
});

export type Chapter = z.infer<typeof chapterSchema>;
export type ChapterCatalog = z.infer<typeof chapterCatalogSchema>;
export type ChapterStatus = z.infer<typeof chapterStatusSchema>;
