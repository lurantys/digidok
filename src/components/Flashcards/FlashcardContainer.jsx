import React, { useState } from "react";
import { flashcardDomains } from "../../data/flashcardData";
import { useFlashcards } from "../../hooks/useFlashcards";
import DomainSelector from "./DomainSelector";
import FlashcardCard from "./FlashcardCard";
import ProgressTracker from "./ProgressTracker";
import AssessmentButtons from "./AssessmentButtons";
import SessionSummary from "./SessionSummary";

export default function FlashcardContainer() {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const {
    cards,
    current,
    results,
    sessionActive,
    markResult,
    restart,
    setSessionActive
  } = useFlashcards(selectedDomain, 50);

  if (!selectedDomain) {
    return <DomainSelector domains={flashcardDomains} onSelect={key => setSelectedDomain(flashcardDomains[key])} />;
  }

  const domainIcon = selectedDomain.icon;
  const domainName = selectedDomain.name;
  const progress = cards.length > 0 ? `${current + 1} / ${cards.length}` : null;

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold mb-8 text-center text-softWhite">AI in Healthcare Flashcards</h1>
      {(!sessionActive || current >= cards.length) ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
          <SessionSummary
            cards={cards}
            results={results}
            onRestart={restart}
            onExit={() => setSelectedDomain(null)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
          <div className="w-full max-w-md flex flex-col items-center gap-8">
            <ProgressTracker current={current + 1} total={cards.length} />
            <FlashcardCard
              question={cards[current].question}
              answer={cards[current].answer}
              domainIcon={domainIcon}
              domainName={domainName}
              progress={progress}
            />
            <AssessmentButtons onCorrect={() => markResult(true)} onIncorrect={() => markResult(false)} />
          </div>
        </div>
      )}
    </div>
  );
} 