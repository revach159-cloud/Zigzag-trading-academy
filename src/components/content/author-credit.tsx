import { brand } from "@/lib/design/tokens";

type AuthorCreditProps = {
  className?: string;
  /** Cover: slightly larger; inline: compact beneath titles */
  size?: "cover" | "inline";
};

/**
 * Exact author credit for Lookback covers — no invented titles.
 */
export function AuthorCredit({
  className = "",
  size = "cover",
}: AuthorCreditProps) {
  const nameClass =
    size === "cover"
      ? "text-lg font-medium tracking-[0.04em] text-[var(--zz-gold)] sm:text-xl"
      : "text-base font-medium tracking-[0.03em] text-[var(--zz-gold)]";
  const creditClass =
    size === "cover"
      ? "mt-1.5 text-sm font-normal tracking-[0.02em] text-[var(--zz-cyan)]/85 sm:text-[0.95rem]"
      : "mt-1 text-xs font-normal text-[var(--zz-cyan)]/80";

  return (
    <div className={`book-author-credit ${className}`} dir="rtl">
      <p className={nameClass}>{brand.authorHe}</p>
      <p className={creditClass}>{brand.authorCreditHe}</p>
    </div>
  );
}
