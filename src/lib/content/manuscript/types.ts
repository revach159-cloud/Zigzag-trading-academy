import { z } from "zod";

export const endVisualStatusSchema = z.enum([
  "stub_incomplete",
  "wired_incomplete",
  "complete",
]);

export const endVisualSchema = z.object({
  kind: z.string().min(1),
  slotId: z.string().min(1),
  labelHe: z.string().min(1),
  concept: z.string().min(1),
  status: endVisualStatusSchema,
});

export const manuscriptUnitMetaSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  order: z.number().int().min(0).max(11),
  kind: z.enum(["opening", "chapter"]),
  numberLabelHe: z.string().min(1),
  titleHe: z.string().min(1),
  titleEn: z.string().min(1),
  summaryHe: z.string().min(1),
  file: z.string().min(1),
  scene: z
    .enum([
      "cover",
      "zigzag",
      "improvement",
      "traffic-light",
      "realize-75",
      "return-balance",
      "none",
    ])
    .default("none"),
  endVisual: endVisualSchema,
});

export const appendixMetaSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  kind: z.literal("appendix"),
  titleHe: z.string().min(1),
  titleEn: z.string().min(1),
  file: z.string().min(1),
});

export const manuscriptIndexSchema = z.object({
  version: z.literal(3),
  simulationOnly: z.literal(true),
  narrativeId: z.literal("lookback-manuscript"),
  bookTitleHe: z.string().min(1),
  bookTitleEn: z.string().min(1),
  methodHe: z.string().min(1),
  authorHe: z.string().min(1),
  units: z.array(manuscriptUnitMetaSchema).length(12),
  appendices: z.array(appendixMetaSchema).min(1),
});

export const manuscriptBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), textHe: z.string().min(1) }),
  z.object({
    type: z.literal("list"),
    itemsHe: z.array(z.string().min(1)).min(1),
  }),
  z.object({
    type: z.literal("ordered-list"),
    itemsHe: z.array(z.string().min(1)).min(1),
  }),
  z.object({
    type: z.literal("callout"),
    tone: z.enum([
      "note",
      "warning",
      "awaiting",
      "sim",
      "definition",
      "unresolved",
      "insight",
    ]),
    titleHe: z.string().min(1),
    textHe: z.string().min(1),
  }),
  z.object({
    type: z.literal("table"),
    id: z.string().min(1),
    captionHe: z.string().optional(),
    headersHe: z.array(z.string().min(1)).min(1),
    rows: z.array(z.array(z.string())).min(1),
  }),
  z.object({
    type: z.literal("formula"),
    id: z.string().min(1),
    latex: z.string().min(1),
    captionHe: z.string().optional(),
  }),
  z.object({
    type: z.literal("blockquote"),
    textHe: z.string().min(1),
  }),
]);

export const manuscriptSectionSchema = z.object({
  id: z.string().min(1),
  titleHe: z.string().min(1),
  blocks: z.array(manuscriptBlockSchema).min(1),
});

export const manuscriptDocumentSchema = z.object({
  slug: z.string().min(1),
  titleHe: z.string().min(1),
  titleEn: z.string().min(1),
  summaryHe: z.string().min(1),
  endVisualKind: z.string().min(1),
  endVisualLabelHe: z.string().min(1),
  endVisualStatus: endVisualStatusSchema,
  sections: z.array(manuscriptSectionSchema).min(1),
});

export type EndVisual = z.infer<typeof endVisualSchema>;
export type ManuscriptUnitMeta = z.infer<typeof manuscriptUnitMetaSchema>;
export type AppendixMeta = z.infer<typeof appendixMetaSchema>;
export type ManuscriptIndex = z.infer<typeof manuscriptIndexSchema>;
export type ManuscriptBlock = z.infer<typeof manuscriptBlockSchema>;
export type ManuscriptSection = z.infer<typeof manuscriptSectionSchema>;
export type ManuscriptDocument = z.infer<typeof manuscriptDocumentSchema>;

/** Reader-facing chapter shape (Opening + Ch1–11). */
export type Chapter = ManuscriptUnitMeta & {
  number: number;
  stationHe: string;
  status: "published";
  awaitingConfirmation: false;
};

export type ChapterCatalog = {
  version: 3;
  simulationOnly: true;
  narrativeId: "lookback-manuscript";
  bookTitleHe: string;
  bookTitleEn: string;
  chapters: Chapter[];
};
