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
  number: z.number().int().min(1).max(13),
  titleHe: z.string().min(1),
  titleEn: z.string().min(1),
  summaryHe: z.string().min(1),
  stationHe: z.string().min(1),
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
  status: chapterStatusSchema,
  awaitingConfirmation: z.boolean().optional().default(false),
});

export const chapterCatalogSchema = z.object({
  version: z.literal(2),
  simulationOnly: z.literal(true),
  narrativeId: z.literal("prepared-routes"),
  bookTitleHe: z.string().min(1),
  bookTitleEn: z.string().min(1),
  chapters: z.array(chapterSchema).length(13),
});

export const contentBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("paragraph"),
    textHe: z.string().min(1),
  }),
  z.object({
    type: z.literal("list"),
    itemsHe: z.array(z.string().min(1)).min(1),
  }),
  z.object({
    type: z.literal("formula"),
    id: z.string().min(1),
    latex: z.string().min(1),
    captionHe: z.string().min(1),
    awaitingConfirmation: z.boolean().optional().default(false),
  }),
  z.object({
    type: z.literal("table"),
    id: z.string().min(1),
    captionHe: z.string().min(1),
    headersHe: z.array(z.string().min(1)).min(1),
    rows: z.array(z.array(z.string())).min(1),
    awaitingConfirmation: z.boolean().optional().default(false),
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
    type: z.literal("visual"),
    kind: z.enum([
      "zigzag-swings",
      "position-stack",
      "adverse-ladder",
      "leverage-paths",
      "avg-entry",
      "profit-split",
      "multi-position",
      "risk-bands",
      "traffic-light",
      "return-balance",
      "lookback-path",
    ]),
    captionHe: z.string().min(1),
  }),
]);

export const workedExampleSchema = z.object({
  id: z.string().min(1),
  titleHe: z.string().min(1),
  setupHe: z.string().min(1),
  stepsHe: z.array(z.string().min(1)).min(1),
  resultHe: z.string().min(1),
  awaitingConfirmation: z.boolean().optional().default(false),
});

export const scenarioSchema = z.object({
  id: z.string().min(1),
  titleHe: z.string().min(1),
  narrativeHe: z.string().min(1),
  outcomeHe: z.string().min(1),
  lessonHe: z.string().min(1),
});

export const reflectionSchema = z.object({
  id: z.string().min(1),
  promptHe: z.string().min(1),
  hintHe: z.string().optional(),
});

export const knowledgeQuestionSchema = z.object({
  id: z.string().min(1),
  promptHe: z.string().min(1),
  choicesHe: z.array(z.string().min(1)).min(2),
  correctIndex: z.number().int().min(0),
  explanationHe: z.string().min(1),
});

export const chapterSectionSchema = z.object({
  id: z.string().min(1),
  titleHe: z.string().min(1),
  role: z
    .enum([
      "opening",
      "principle",
      "analogy",
      "trading",
      "psychology",
      "reference",
      "general",
    ])
    .default("general"),
  blocks: z.array(contentBlockSchema).min(1),
});

/** Narrative chapter body — story first, math after intuition; no MCQs. */
export const chapterBodySchema = z.object({
  slug: z.string().min(1),
  openingStoryHe: z.string().min(1),
  principleHe: z.string().min(1),
  memorableInsightHe: z.string().min(1),
  learningObjectivesHe: z.array(z.string().min(1)).min(2),
  sections: z.array(chapterSectionSchema).min(2),
  workedExamples: z.array(workedExampleSchema).default([]),
  scenarios: z
    .object({
      success: z.array(scenarioSchema).default([]),
      failure: z.array(scenarioSchema).default([]),
    })
    .default({ success: [], failure: [] }),
  reflections: z.array(reflectionSchema).default([]),
  chapterSummaryHe: z.array(z.string().min(1)).min(2),
  awaitingNotesHe: z.array(z.string().min(1)).optional().default([]),
});

export const methodPageSchema = z.object({
  slug: z.string().min(1),
  titleHe: z.string().min(1),
  titleEn: z.string().min(1),
  summaryHe: z.string().min(1),
  awaitingConfirmation: z.boolean().optional().default(true),
  sections: z.array(chapterSectionSchema).min(1),
  workedExamples: z.array(workedExampleSchema).min(1),
  scenarios: z.object({
    success: z.array(scenarioSchema).min(1),
    failure: z.array(scenarioSchema).min(1),
  }),
  knowledgeQuestions: z.array(knowledgeQuestionSchema).default([]),
  awaitingNotesHe: z.array(z.string().min(1)).optional().default([]),
});

export const methodCatalogSchema = z.object({
  version: z.literal(1),
  simulationOnly: z.literal(true),
  pages: z.array(methodPageSchema).min(1),
});

/** @deprecated Prefer Chapter from manuscript/types — kept for transitional chapter-view */
export type Chapter = z.infer<typeof chapterSchema>;
/** @deprecated Prefer ChapterCatalog from manuscript/types */
export type ChapterCatalog = z.infer<typeof chapterCatalogSchema>;
export type ChapterStatus = z.infer<typeof chapterStatusSchema>;
export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type ChapterBody = z.infer<typeof chapterBodySchema>;
export type ChapterBodyInput = z.input<typeof chapterBodySchema>;
export type ChapterSection = z.infer<typeof chapterSectionSchema>;
export type WorkedExample = z.infer<typeof workedExampleSchema>;
export type Scenario = z.infer<typeof scenarioSchema>;
export type Reflection = z.infer<typeof reflectionSchema>;
export type KnowledgeQuestion = z.infer<typeof knowledgeQuestionSchema>;
export type MethodPage = z.infer<typeof methodPageSchema>;
export type MethodPageInput = z.input<typeof methodPageSchema>;
export type MethodCatalog = z.infer<typeof methodCatalogSchema>;
export type MethodCatalogInput = z.input<typeof methodCatalogSchema>;

/** @deprecated Use Reflection — kept for transitional imports */
export type Exercise = Reflection;
