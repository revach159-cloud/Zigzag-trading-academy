# ZIGZAG TRADING ACADEMY

Independent Hebrew-first (RTL) interactive trading **education** platform for the ZigZag Method.

**Simulation only** — no real trading, deposits, brokerage APIs, or fabricated performance.

## Stack

- Next.js App Router · React · TypeScript strict · Tailwind CSS
- Framer Motion · R3F/Drei (lazy 3D with 2D / reduced-motion fallback)
- Zod content schemas · KaTeX formulas · Vitest

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run test
npm run build
```

## Product constraints

- Dedicated repository — **not** nested under Polymarket Edge Lab
- Independent Vercel project — no Edge Lab cron schedules in this repo
- Methodology math defaults are drafts awaiting owner confirmation

## Routes

| Path | Purpose |
|------|---------|
| `/` | Premium brand-first landing |
| `/method` | ZigZag Method hub |
| `/method/[slug]` | Method pages (overview, reinforcement, leverage, profit) |
| `/textbook` | 12-chapter Hebrew textbook index |
| `/textbook/[slug]` | Full chapter bodies (objectives, formulas, scenarios, exercises, quizzes) |
| `/simulator` | Strategy simulator placeholder (+ curriculum links) |
| `/labs/leverage` · `/labs/risk` | Lab stubs (+ curriculum links) |
| `/tests` | Knowledge tests hub (+ chapter 12 link) |
