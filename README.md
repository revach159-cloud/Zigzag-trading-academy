# ZIGZAG TRADING ACADEMY

Independent Hebrew-first (RTL) interactive trading **education** platform for the ZigZag Method — narrative digital book **LOOKBACK · המבט לאחור** (השבחת העסקה).

**Simulation only** — no real trading, deposits, brokerage APIs, or fabricated performance.

## Stack

- Next.js App Router · React · TypeScript strict · Tailwind CSS
- Framer Motion · R3F/Drei (lazy educational 3D with 2D / reduced-motion fallback)
- Zod narrative content schemas · KaTeX (sparse, after story) · Vitest · Playwright PDF

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run test
npm run build
npm run pdf
```

## Product constraints

- Dedicated repository — **not** nested under Polymarket Edge Lab
- Independent Vercel project — no Edge Lab cron schedules in this repo
- Owner-approved methodology in project docs; illustrative $320 pattern ≠ $250 cap

## Routes

| Path | Purpose |
|------|---------|
| `/` | Premium brand-first landing |
| `/method` | ZigZag Method hub |
| `/method/[slug]` | Method pages (overview, reinforcement, leverage, profit) |
| `/textbook` | LOOKBACK cover + 13-station journey map |
| `/textbook/[slug]` | Narrative chapter (story, principle, analogy, example, psychology) |
| `/textbook/glossary` | Extended glossary |
| `/simulator` | Strategy simulator placeholder |
| `/labs/leverage` · `/labs/risk` | Lab stubs |
| `/tests` | Knowledge tests hub (legacy surface; book has no MCQs) |
| `/downloads/zigzag-lookback-final.pdf` | Final same-source A4 RTL LOOKBACK PDF |
| `/downloads/zigzag-academy-textbook.pdf` | Legacy alias (same bytes as final) |
