/**
 * Server-only manuscript file loader (node:fs).
 * Catalog helpers live in ./catalog for client-safe imports.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import type {
  AppendixMeta,
  ManuscriptDocument,
} from "./types";
import { parseManuscriptMarkdown } from "./parse-md";
import {
  manuscriptIndex,
  chapterCatalog,
  listChapters,
  getChapterBySlug,
  getAdjacentChapters,
  getReadingProgress,
  listAppendices,
} from "./catalog";

export {
  manuscriptIndex,
  chapterCatalog,
  listChapters,
  getChapterBySlug,
  getAdjacentChapters,
  getReadingProgress,
  listAppendices,
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

const documentCache = new Map<string, ManuscriptDocument>();

function readUnitFile(file: string): string {
  return readFileSync(path.join(CONTENT_ROOT, file), "utf8");
}

export function getManuscriptBySlug(slug: string): ManuscriptDocument | undefined {
  const unit = manuscriptIndex.units.find((item) => item.slug === slug);
  if (!unit) return undefined;
  const cached = documentCache.get(slug);
  if (cached) return cached;
  const doc = parseManuscriptMarkdown(readUnitFile(unit.file));
  const merged: ManuscriptDocument = {
    ...doc,
    slug: unit.slug,
    titleHe: unit.titleHe,
    titleEn: unit.titleEn,
    summaryHe: unit.summaryHe,
    endVisualKind: unit.endVisual.kind,
    endVisualLabelHe: unit.endVisual.labelHe,
    endVisualStatus: unit.endVisual.status,
  };
  documentCache.set(slug, merged);
  return merged;
}

export function getAppendixBySlug(slug: string): {
  meta: AppendixMeta;
  document: ManuscriptDocument;
} | undefined {
  const meta = manuscriptIndex.appendices.find((item) => item.slug === slug);
  if (!meta) return undefined;
  const document = parseManuscriptMarkdown(readUnitFile(meta.file));
  return {
    meta,
    document: {
      ...document,
      slug: meta.slug,
      titleHe: meta.titleHe,
      titleEn: meta.titleEn,
    },
  };
}

export function assertNoForbiddenTerms(text: string): void {
  if (text.includes("מסלול")) {
    throw new Error("Forbidden terminology מסלול found in manuscript text");
  }
}
