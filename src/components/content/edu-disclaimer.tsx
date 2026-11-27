import { RichText } from "@/lib/content/rich-text";

export function EduDisclaimer({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`rounded-lg border border-[var(--zz-line)] bg-[rgba(11,21,40,0.72)] px-4 py-4 text-sm leading-7 text-[var(--zz-muted)] backdrop-blur-sm ${className}`}
      role="note"
      aria-label="הצהרה חינוכית"
    >
      <p className="font-medium text-[var(--zz-gold)]">הצהרה חינוכית</p>
      <p className="mt-2">
        <RichText text="תוכן זה מיועד ללימוד וסימולציה בלבד במודל Bybit Linear USDT Perpetual (Cross, One-Way). אין כאן ייעוץ השקעות, מסחר אמיתי, הפקדות, או הבטחות תשואה." />
      </p>
      <p className="mt-2">
        <RichText text="יש להבחין תמיד בין `margin` מוקצה, `notional`, `collateral` פנוי, ומחיר `liquidation` בבורסה. שינוי מינוף לימודי אינו מבטיח משיכת הון או מניעת פירוק." />
      </p>
    </aside>
  );
}
