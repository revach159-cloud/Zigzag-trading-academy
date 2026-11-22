"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/design/tokens";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const fade = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative isolate flex min-h-[calc(100vh-7.5rem)] flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <HeroVisual />
        <div className="absolute inset-0 bg-gradient-to-l from-[var(--zz-void)] via-[var(--zz-void)]/75 to-[var(--zz-void)]/35" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,var(--zz-void)_100%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 sm:py-20">
        <motion.p
          className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[0.2em] text-[var(--zz-ink)] sm:text-5xl md:text-6xl lg:text-7xl"
          {...fade}
          transition={{ duration: 0.7 }}
        >
          {brand.name}
        </motion.p>

        <motion.p
          className="mt-3 text-xs tracking-[0.35em] text-[var(--zz-gold)] uppercase sm:text-sm"
          {...fade}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.08 }}
        >
          Trading Academy
        </motion.p>

        <motion.h1
          className="mt-8 max-w-xl font-[family-name:var(--font-display)] text-2xl font-medium leading-snug text-[var(--zz-ink)] sm:text-3xl md:text-4xl"
          {...fade}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.16 }}
        >
          <span dir="ltr" className="ltr-isolate">
            {brand.taglineEn}
          </span>
          <span className="mt-2 block text-lg text-[var(--zz-muted)] sm:text-xl">
            {brand.taglineHe}
          </span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-lg text-base leading-relaxed text-[var(--zz-muted)] sm:text-lg"
          {...fade}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.24 }}
        >
          {brand.supportHe}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          {...fade}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.32 }}
        >
          <Button href="/textbook" size="lg">
            התחל בספר הלימוד
          </Button>
          <Button href="/method" variant="secondary" size="lg">
            הכר את השיטה
          </Button>
        </motion.div>

        <motion.p
          className="mt-6 text-xs text-[var(--zz-muted)]"
          {...fade}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.4 }}
        >
          סימולציה בלבד · לא מסחר אמיתי · ללא סטטיסטיקות ביצועים מבוימות
        </motion.p>
      </div>
    </section>
  );
}
