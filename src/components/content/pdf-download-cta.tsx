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
    <div className="border-y border-[var(--zz-line)] bg-[linear-gradient(105deg,rgba(46,230,255,0.06),transparent_55%)] py-6">
      <p className="text-[11px] tracking-[0.28em] text-[var(--zz-cyan)] uppercase">
        Print-ready · A4 · Dark cinematic
      </p>
      <h2 className="book-hebrew-display mt-2 text-2xl text-[var(--zz-ink)]">
        הורידו את LOOKBACK כ־PDF
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--zz-muted)]">
        אותו מקור נרטיבי כמו בקורא הדיגיטלי — זהות חזותית כהה, עברית RTL, תחנות
        מסע, תוכן עניינים לחיץ ומספרי עמודים.
      </p>
      <Link
        href={PDF_HREF}
        className="mt-4 inline-flex items-center gap-2 border border-[var(--zz-cyan)]/50 bg-[rgba(46,230,255,0.1)] px-4 py-2.5 text-sm text-[var(--zz-cyan)] transition-colors hover:bg-[rgba(46,230,255,0.18)]"
        prefetch={false}
      >
        <Download size={16} aria-hidden />
        הורדת LOOKBACK (PDF)
      </Link>
    </div>
  );
}
