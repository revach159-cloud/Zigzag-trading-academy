"use client";

import type { EndVisual } from "@/lib/content/manuscript/types";
import { PhilosophyCompare } from "./philosophy-compare";
import { ChaseVsPlan } from "./chase-vs-plan";
import { ZigzagHistory } from "./zigzag-history";
import { CapitalAllocation } from "./capital-allocation";
import { LongLadder } from "./long-ladder";
import { AvgEntryCalculator } from "./avg-entry-calculator";
import { QtyCascade75 } from "./qty-cascade-75";
import { LeverageStages } from "./leverage-stages";
import { PortfolioCorrelation } from "./portfolio-correlation";
import { EmotionVsDiscipline } from "./emotion-vs-discipline";
import { JournalToResearch } from "./journal-to-research";
import { HypotheticalAnalytics } from "./hypothetical-analytics";
import { EndVisualShell } from "./shell";

export function EndVisualExperience({ endVisual }: { endVisual: EndVisual }) {
  switch (endVisual.kind) {
    case "none":
      return null;
    case "philosophy-compare":
      return <PhilosophyCompare endVisual={endVisual} />;
    case "chase-vs-plan":
      return <ChaseVsPlan endVisual={endVisual} />;
    case "zigzag-history":
      return <ZigzagHistory endVisual={endVisual} />;
    case "capital-allocation":
      return <CapitalAllocation endVisual={endVisual} />;
    case "long-ladder":
      return <LongLadder endVisual={endVisual} />;
    case "avg-entry-calculator":
      return <AvgEntryCalculator endVisual={endVisual} />;
    case "qty-cascade-75":
      return <QtyCascade75 endVisual={endVisual} />;
    case "leverage-stages":
      return <LeverageStages endVisual={endVisual} />;
    case "portfolio-correlation":
      return <PortfolioCorrelation endVisual={endVisual} />;
    case "emotion-vs-discipline":
      return <EmotionVsDiscipline endVisual={endVisual} />;
    case "journal-to-research":
      return <JournalToResearch endVisual={endVisual} />;
    case "hypothetical-analytics":
      return <HypotheticalAnalytics endVisual={endVisual} />;
    default:
      return (
        <EndVisualShell endVisual={endVisual}>
          <p className="text-sm text-[var(--zz-danger)]">
            סוג המחשה לא מזוהה: {endVisual.kind}
          </p>
        </EndVisualShell>
      );
  }
}
