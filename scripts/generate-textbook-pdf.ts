/**
 * Generate A4 Hebrew RTL textbook PDF from the same chapter source modules
 * used by the digital reader — no divergent content copy.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import katex from "katex";
import { chromium } from "playwright";
import { listChapters } from "../src/lib/content/chapters";
import { getChapterBodyBySlug } from "../src/lib/content/bodies";
import { listGlossaryEntries } from "../src/lib/content/glossary";
import { listMethodPages } from "../src/lib/content/method-pages/catalog";
import { brand } from "../src/lib/design/tokens";
import type { ContentBlock } from "../src/lib/content/schemas";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "downloads");
const outFile = path.join(outDir, "zigzag-academy-textbook.pdf");

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Lightweight RichText: backticks → LTR code spans */
function rich(text: string): string {
  return escapeHtml(text).replace(
    /`([^`]+)`/g,
    '<code dir="ltr" class="ltr">$1</code>',
  );
}

function renderFormula(latex: string, number: number, captionHe: string): string {
  const html = katex.renderToString(latex, {
    throwOnError: false,
    displayMode: true,
    strict: "ignore",
  });
  return `<figure class="formula">
    <div class="formula-row">
      <div class="katex-host" dir="ltr">${html}</div>
      <span class="formula-num" dir="ltr">(${number})</span>
    </div>
    <figcaption>נוסחה ${number}. ${rich(captionHe)}</figcaption>
  </figure>`;
}

function renderBlocks(blocks: ContentBlock[], formulaStart: number): {
  html: string;
  next: number;
} {
  let n = formulaStart;
  const parts: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        parts.push(`<p>${rich(block.textHe)}</p>`);
        break;
      case "list":
        parts.push(
          `<ul>${block.itemsHe.map((item) => `<li>${rich(item)}</li>`).join("")}</ul>`,
        );
        break;
      case "formula": {
        const num = n++;
        parts.push(renderFormula(block.latex, num, block.captionHe));
        break;
      }
      case "table":
        parts.push(`<figure class="table-wrap">
          <table>
            <caption>${rich(block.captionHe)}</caption>
            <thead><tr>${block.headersHe.map((h) => `<th>${rich(h)}</th>`).join("")}</tr></thead>
            <tbody>${block.rows
              .map(
                (row) =>
                  `<tr>${row.map((cell) => `<td>${rich(cell)}</td>`).join("")}</tr>`,
              )
              .join("")}</tbody>
          </table>
        </figure>`);
        break;
      case "callout":
        parts.push(`<aside class="callout ${block.tone}">
          <strong>${rich(block.titleHe)}</strong>
          <p>${rich(block.textHe)}</p>
        </aside>`);
        break;
      case "visual":
        parts.push(
          `<p class="visual-cap"><em>איור: ${rich(block.captionHe)}</em></p>`,
        );
        break;
    }
  }
  return { html: parts.join("\n"), next: n };
}

function buildHtml(): string {
  const chapters = listChapters();
  const glossary = listGlossaryEntries();
  const methods = listMethodPages();

  const tocItems = [
    ...chapters.map(
      (ch) =>
        `<li><a href="#ch-${ch.number}">פרק ${ch.number}. ${escapeHtml(ch.titleHe)}</a></li>`,
    ),
    `<li><a href="#glossary">מילון מונחים</a></li>`,
    `<li><a href="#method">דפי השיטה</a></li>`,
  ].join("\n");

  let formulaGlobal = 1;
  const chapterHtml = chapters
    .map((chapter) => {
      const body = getChapterBodyBySlug(chapter.slug);
      if (!body) throw new Error(`Missing body for ${chapter.slug}`);

      const sectionParts: string[] = [];
      for (const section of body.sections) {
        const rendered = renderBlocks(section.blocks, formulaGlobal);
        formulaGlobal = rendered.next;
        sectionParts.push(`<section>
          <h3>${escapeHtml(section.titleHe)}</h3>
          ${rendered.html}
        </section>`);
      }

      const examples = body.workedExamples
        .map(
          (ex) => `<div class="example">
          <h4>${escapeHtml(ex.titleHe)}</h4>
          <p>${rich(ex.setupHe)}</p>
          <ol>${ex.stepsHe.map((s) => `<li>${rich(s)}</li>`).join("")}</ol>
          <p><strong>תוצאה:</strong> ${rich(ex.resultHe)}</p>
        </div>`,
        )
        .join("\n");

      const exercises = body.exercises
        .map(
          (ex, i) =>
            `<li><strong>תרגיל ${i + 1}.</strong> ${rich(ex.promptHe)}${
              ex.hintHe ? ` <em>(רמז: ${rich(ex.hintHe)})</em>` : ""
            }</li>`,
        )
        .join("\n");

      const quiz = body.knowledgeQuestions
        .map(
          (q, i) => `<div class="quiz">
          <p><strong>שאלת ידע ${i + 1}.</strong> ${rich(q.promptHe)}</p>
          <ol type="A">${q.choicesHe.map((c) => `<li>${rich(c)}</li>`).join("")}</ol>
        </div>`,
        )
        .join("\n");

      const summary = body.chapterSummaryHe
        .map((s) => `<li>${rich(s)}</li>`)
        .join("");

      return `<article class="chapter" id="ch-${chapter.number}">
        <header class="chapter-open">
          <p class="eyebrow">Chapter ${chapter.number}</p>
          <h2>פרק ${chapter.number}. ${escapeHtml(chapter.titleHe)}</h2>
          <p class="en" dir="ltr">${escapeHtml(chapter.titleEn)}</p>
          <p>${rich(chapter.summaryHe)}</p>
        </header>
        <h3>מטרות למידה</h3>
        <ul>${body.learningObjectivesHe.map((o) => `<li>${rich(o)}</li>`).join("")}</ul>
        ${sectionParts.join("\n")}
        <h3>דוגמאות מספריות</h3>
        ${examples}
        <h3>תרגילים</h3>
        <ol>${exercises}</ol>
        <h3>שאלות ידע</h3>
        ${quiz}
        <h3>סיכום הפרק</h3>
        <ul>${summary}</ul>
      </article>`;
    })
    .join("\n");

  const glossaryHtml = glossary
    .map(
      (e) => `<div class="gloss">
      <h4>${escapeHtml(e.termHe)} <span dir="ltr" class="en">${escapeHtml(e.termEn)}</span></h4>
      <p>${rich(e.definitionHe)}</p>
    </div>`,
    )
    .join("\n");

  const methodHtml = methods
    .map((page) => {
      let n = formulaGlobal;
      const sections = page.sections
        .map((section) => {
          const rendered = renderBlocks(section.blocks, n);
          n = rendered.next;
          return `<section><h3>${escapeHtml(section.titleHe)}</h3>${rendered.html}</section>`;
        })
        .join("\n");
      formulaGlobal = n;
      return `<article class="chapter">
        <header class="chapter-open">
          <p class="eyebrow">Method</p>
          <h2>${escapeHtml(page.titleHe)}</h2>
          <p class="en" dir="ltr">${escapeHtml(page.titleEn)}</p>
          <p>${rich(page.summaryHe)}</p>
        </header>
        ${sections}
      </article>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(brand.fullName)} — Textbook</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/katex.min.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --ink: #0b1220;
      --muted: #445166;
      --line: #c9d3e2;
      --cyan: #0b6e82;
      --gold: #8a6a1f;
      --panel: #f4f7fb;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: var(--ink);
      font-family: "Heebo", sans-serif;
      font-size: 11pt;
      line-height: 1.65;
      background: white;
    }
    .ltr { unicode-bidi: isolate; direction: ltr; }
    h1, h2, h3, h4 {
      font-family: "Syne", "Heebo", sans-serif;
      page-break-after: avoid;
    }
    a { color: var(--cyan); text-decoration: none; }
    .cover {
      min-height: 90vh;
      padding: 48px 40px;
      border: 2px solid var(--line);
      display: flex;
      flex-direction: column;
      justify-content: center;
      page-break-after: always;
      background: linear-gradient(160deg, #eef6fa, #ffffff 45%, #f7f1e4);
    }
    .cover .brand {
      font-family: "Syne", sans-serif;
      font-size: 42pt;
      letter-spacing: 0.12em;
      margin: 0;
    }
    .cover .sub { color: var(--cyan); font-size: 16pt; margin-top: 8px; }
    .cover .tag { color: var(--gold); margin-top: 24px; }
    .disclaimer {
      margin-top: 40px;
      padding: 16px;
      border: 1px solid var(--line);
      background: var(--panel);
      font-size: 10pt;
    }
    .toc { page-break-after: always; padding: 24px 8px; }
    .toc ol { line-height: 2; }
    .chapter { page-break-before: always; }
    .chapter-open {
      padding: 18px;
      border: 1px solid var(--line);
      background: var(--panel);
      margin-bottom: 18px;
    }
    .eyebrow { color: var(--cyan); letter-spacing: 0.18em; text-transform: uppercase; font-size: 9pt; }
    .en { color: var(--muted); font-size: 10pt; }
    .formula {
      margin: 14px 0;
      padding: 10px 12px;
      border: 1px solid var(--line);
      background: #fafcfe;
      page-break-inside: avoid;
    }
    .formula-row { display: flex; align-items: flex-start; gap: 12px; }
    .katex-host { flex: 1; text-align: center; overflow-x: auto; }
    .formula-num { font-family: "IBM Plex Mono", monospace; color: var(--gold); }
    figcaption { text-align: center; color: var(--muted); font-size: 9.5pt; margin-top: 6px; }
    .table-wrap { margin: 14px 0; page-break-inside: avoid; }
    table { width: 100%; border-collapse: collapse; font-size: 9.5pt; table-layout: fixed; word-wrap: break-word; }
    th, td { border: 1px solid var(--line); padding: 6px 8px; vertical-align: top; text-align: right; }
    th { background: #e8eef6; color: var(--cyan); }
    caption { caption-side: top; text-align: right; color: var(--muted); margin-bottom: 6px; }
    .callout {
      margin: 12px 0;
      padding: 10px 12px;
      border: 1px solid var(--line);
      background: var(--panel);
      page-break-inside: avoid;
    }
    .callout.warning { border-color: #c45b63; background: #fff5f5; }
    .callout.definition { border-color: #0b6e82; }
    .callout.unresolved, .callout.awaiting { border-color: var(--gold); background: #fbf6ea; }
    .example, .quiz, .gloss {
      margin: 10px 0;
      padding: 10px;
      border: 1px solid var(--line);
      page-break-inside: avoid;
    }
    code {
      font-family: "IBM Plex Mono", monospace;
      font-size: 0.92em;
      background: #eef2f7;
      padding: 0 3px;
    }
    @page { size: A4; margin: 18mm 14mm 18mm 14mm; }
  </style>
</head>
<body>
  <section class="cover">
    <p class="eyebrow">Digital Textbook · Simulation only</p>
    <h1 class="brand">${escapeHtml(brand.name)}</h1>
    <p class="sub">Trading Academy</p>
    <p>ספר לימוד עברי מלא — 12 פרקים, דפי שיטה ומילון מונחים.</p>
    <p class="tag">${escapeHtml(brand.taglineHe)}</p>
    <div class="disclaimer">
      <strong>הצהרה חינוכית.</strong>
      תוכן זה ללימוד וסימולציה בלבד (Bybit Linear USDT Perp, Cross, One-Way).
      אין ייעוץ השקעות, מסחר אמיתי או הבטחות תשואה.
      יש להבחין בין margin, notional, collateral ו־liquidation.
    </div>
  </section>

  <nav class="toc" id="toc">
    <h2>תוכן עניינים</h2>
    <ol>${tocItems}</ol>
  </nav>

  ${chapterHtml}

  <section class="chapter" id="glossary">
    <header class="chapter-open">
      <p class="eyebrow">Appendix</p>
      <h2>מילון מונחים</h2>
    </header>
    ${glossaryHtml}
  </section>

  <section class="chapter" id="method">
    <header class="chapter-open">
      <p class="eyebrow">Method pages</p>
      <h2>דפי השיטה</h2>
      <p>אותו מקור כמו בממשק הדיגיטלי — מתודולוגיה מאושרת.</p>
    </header>
    ${methodHtml}
  </section>
</body>
</html>`;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const html = buildHtml();
  const htmlPath = path.join(outDir, "zigzag-academy-textbook.print.html");
  await writeFile(htmlPath, html, "utf8");

  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROME || "/usr/local/bin/google-chrome",
    headless: true,
  });
  try {
    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
    await page.pdf({
      path: outFile,
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="width:100%;font-size:8px;color:#667;padding:0 14mm;display:flex;justify-content:space-between;font-family:Heebo,sans-serif;direction:rtl;">
          <span>ZIGZAG Trading Academy</span>
          <span>סימולציה בלבד</span>
        </div>`,
      footerTemplate: `
        <div style="width:100%;font-size:8px;color:#667;padding:0 14mm;display:flex;justify-content:space-between;font-family:Heebo,sans-serif;direction:rtl;">
          <span>לימוד בלבד · לא מסחר אמיתי</span>
          <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
        </div>`,
      margin: { top: "18mm", bottom: "18mm", left: "14mm", right: "14mm" },
    });
  } finally {
    await browser.close();
  }

  console.log(`Wrote ${outFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
