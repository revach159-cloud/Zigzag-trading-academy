"use client";

import { useState } from "react";
import type { KnowledgeQuestion } from "@/lib/content/schemas";
import { RichText } from "@/lib/content/rich-text";
import { cn } from "@/lib/utils/cn";

export function KnowledgeCheck({
  questions,
}: {
  questions: KnowledgeQuestion[];
}) {
  return (
    <div className="space-y-5">
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          ordinal={index + 1}
        />
      ))}
    </div>
  );
}

function QuestionCard({
  question,
  ordinal,
}: {
  question: KnowledgeQuestion;
  ordinal: number;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const revealed = selected !== null;
  const correct = selected === question.correctIndex;

  return (
    <div className="rounded-sm border border-[var(--zz-line)] bg-[var(--zz-panel)]/35 p-4">
      <p className="text-sm text-[var(--zz-cyan)]">שאלה {ordinal}</p>
      <p className="mt-2 leading-7 text-[var(--zz-ink)]">
        <RichText text={question.promptHe} />
      </p>
      <ul className="mt-3 space-y-2">
        {question.choicesHe.map((choice, index) => {
          const isSelected = selected === index;
          const isCorrectChoice = index === question.correctIndex;
          return (
            <li key={choice}>
              <button
                type="button"
                disabled={revealed}
                onClick={() => setSelected(index)}
                className={cn(
                  "w-full rounded-sm border px-3 py-2 text-start text-sm transition-colors",
                  !revealed &&
                    "border-[var(--zz-line)] hover:border-[var(--zz-cyan)]/50",
                  revealed &&
                    isCorrectChoice &&
                    "border-[var(--zz-cyan)] bg-[rgba(46,230,255,0.1)]",
                  revealed &&
                    isSelected &&
                    !correct &&
                    "border-[var(--zz-danger)] bg-[rgba(240,113,120,0.08)]",
                  revealed &&
                    !isSelected &&
                    !isCorrectChoice &&
                    "border-[var(--zz-line)] opacity-60",
                )}
              >
                <RichText text={choice} />
              </button>
            </li>
          );
        })}
      </ul>
      {revealed ? (
        <p className="mt-3 text-sm leading-7 text-[var(--zz-muted)]">
          <span className={correct ? "text-[var(--zz-cyan)]" : "text-[var(--zz-danger)]"}>
            {correct ? "נכון. " : "לא מדויק. "}
          </span>
          <RichText text={question.explanationHe} />
        </p>
      ) : null}
    </div>
  );
}
