import Decimal from "decimal.js";
import { zigzagAssumptions } from "./assumptions";

type DecimalValue = string | number | Decimal;

Decimal.set({ precision: 28, rounding: Decimal.ROUND_HALF_UP });

export { Decimal };

export function d(value: DecimalValue): Decimal {
  return new Decimal(value);
}

/** Weighted average entry: Σ(price×qty) / Σ(qty). Floor qty policy is separate. */
export function averageEntry(
  fills: ReadonlyArray<{ price: DecimalValue; qty: DecimalValue }>,
): Decimal | null {
  let notional = d(0);
  let qty = d(0);
  for (const fill of fills) {
    const q = d(fill.qty);
    if (q.lte(0)) continue;
    notional = notional.plus(d(fill.price).times(q));
    qty = qty.plus(q);
  }
  if (qty.lte(0)) return null;
  return notional.div(qty);
}

/** Remaining quantity after closing `pct` of open qty (default 75%). */
export function remainingAfterClose(
  openQty: DecimalValue,
  closePct = zigzagAssumptions.profitRealization.pct,
): Decimal {
  const remainingFraction = d(100).minus(closePct).div(100);
  return d(openQty).times(remainingFraction);
}

/** Cascade remaining qty: start → after each 75% close. */
export function qtyCascade(
  startQty: DecimalValue,
  steps: number,
  closePct = zigzagAssumptions.profitRealization.pct,
): Decimal[] {
  const out: Decimal[] = [d(startQty)];
  let current = d(startQty);
  for (let i = 0; i < steps; i += 1) {
    current = remainingAfterClose(current, closePct);
    out.push(current);
  }
  return out;
}

/** Ladder price at level k: P(k) = P(0) × (1 − interval)^k for long adverse. */
export function ladderPrice(
  reference: DecimalValue,
  level: number,
  intervalPct = zigzagAssumptions.adverseMoveIntervalPct,
): Decimal {
  const factor = d(1).minus(d(intervalPct).div(100));
  return d(reference).times(factor.pow(level));
}

/**
 * Cap check for cumulative margin vs portfolio-scaled trade-budget Reject.
 * Default ceiling is the $10k example budget ($256); pass tradeBudgetUsd(p)
 * for other portfolios. Returns whether next allocation would be rejected.
 */
export function wouldRejectMargin(
  cumulativeUsd: DecimalValue,
  nextUsd: DecimalValue,
  capUsd: DecimalValue = zigzagAssumptions.defaultExampleTradeBudgetUsd,
): boolean {
  return d(cumulativeUsd).plus(nextUsd).gt(capUsd);
}

/** Format for LTR financial display. */
export function formatUsd(value: DecimalValue, digits = 2): string {
  return `$${d(value).toFixed(digits)}`;
}

export function formatQty(value: DecimalValue, digits = 4): string {
  const n = d(value);
  const fixed = n.toFixed(digits);
  return fixed.replace(/\.?0+$/, "") || "0";
}
