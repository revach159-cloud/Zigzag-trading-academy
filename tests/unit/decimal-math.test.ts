import { describe, expect, it } from "vitest";
import { zigzagAssumptions } from "@/lib/math/assumptions";
import {
  averageEntry,
  d,
  ladderPrice,
  qtyCascade,
  remainingAfterClose,
  wouldRejectMargin,
} from "@/lib/math/decimal";

describe("decimal-safe LOOKBACK math", () => {
  it("computes weighted average entry", () => {
    const avg = averageEntry([
      { price: "1.00", qty: "100" },
      { price: "0.90", qty: "100" },
    ]);
    expect(avg?.toFixed(2)).toBe("0.95");
  });

  it("cascades remaining quantity after 75% closes", () => {
    const cascade = qtyCascade(100, 3);
    expect(cascade.map((q) => q.toString())).toEqual([
      "100",
      "25",
      "6.25",
      "1.5625",
    ]);
    expect(remainingAfterClose(100).toString()).toBe("25");
    expect(zigzagAssumptions.profitRealization.pct).toBe(75);
  });

  it("builds 10% adverse ladder from reference", () => {
    expect(ladderPrice(100, 0).toString()).toBe("100");
    expect(ladderPrice(100, 1).toString()).toBe("90");
    expect(ladderPrice(100, 2).toString()).toBe("81");
  });

  it("rejects margin that would exceed $250 cap", () => {
    expect(wouldRejectMargin(200, 40)).toBe(false);
    expect(wouldRejectMargin(200, 60)).toBe(true);
    expect(wouldRejectMargin(240, 20)).toBe(true);
    const patternSum = zigzagAssumptions.illustrativeReinforcementPatternUsd.reduce(
      (acc, n) => acc.plus(n),
      d(0),
    );
    expect(patternSum.toNumber()).toBe(320);
    expect(patternSum.gt(zigzagAssumptions.perPositionMarginCapUsd)).toBe(true);
  });
});
