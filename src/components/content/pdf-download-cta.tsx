import Link from "next/link";
import { Download } from "lucide-react";

const PDF_HREF = "/downloads/zigzag-academy-textbook.pdf";

export function PdfDownloadCta({
  variant = "banner",
}: {
  variant?: "banner" | "compact";
}) {
  if (variant === "compact") {
    return (
      <Link
        href={PDF_HREF}
        className="inline-flex items-center gap-2 rounded-lg border border-[var(--zz-gold)]/40 bg-[var(--zz-gold-soft)] px-3 py-2 text-sm text-[var(--zz-gold)] transition-colors hover:border-[var(--zz-gold)] hover:text-[var(--zz-ink)]"
        prefetch={false}
      >
        <Download size={16} aria-hidden />
        הורדת PDF
      </Link>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--zz-cyan)]/25 bg-[rgba(16,26,46,0.65)] p-5 shadow-[0_0_40px_rgba(46,230,255,0.06)] backdrop-blur-md">
      <p className="text-xs tracking-[0.2em] text-[var(--zz-cyan)] uppercase">
        Print-ready · A4
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--zz-ink)]">
        הורידו את LOOKBACK כ־PDF
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--zz-muted)]">
        אותו מקור נרטיבי כמו בקורא הדיגיטלי — עברית RTL, תחנות מסע, תוכן עניינים
        לחיץ, מספרי עמודים וכותרות/תחתיות. מוכן להדפסה ב־A4.
      </p>
      <Link
        href={PDF_HREF}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--zz-cyan)]/50 bg-[rgba(46,230,255,0.12)] px-4 py-2.5 text-sm text-[var(--zz-cyan)] transition-colors hover:bg-[rgba(46,230,255,0.2)] hover:text-[var(--zz-ink)]"
        prefetch={false}
      >
        <Download size={16} aria-hidden />
        הורדת LOOKBACK (PDF)
      </Link>
    </div>
  );
}
