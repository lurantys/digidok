import React from "react";

export default function SessionSummary({ cards, results, onRestart, onExit }) {
  const correct = results.filter(r => r.correct).length;
  const incorrect = results.length - correct;
  const missedCards = cards.filter(card =>
    results.find(r => r.id === card.id && !r.correct)
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold mb-2 text-softWhite">Session Complete!</h2>
      <div className="text-lg text-softWhite">
        <span className="text-digitalBlue font-semibold">{correct}</span> correct,
        <span className="text-fuchsiaAccent font-semibold ml-2">{incorrect}</span> need review
      </div>
      {missedCards.length > 0 && (
        <div className="w-full max-w-md bg-fuchsiaAccent/10 rounded-lg p-4 mt-4">
          <h3 className="font-semibold mb-2 text-digitalBlue">Cards to Review:</h3>
          <ul className="list-disc pl-5 text-softWhite/80">
            {missedCards.map(card => (
              <li key={card.id} className="mb-1">{card.question}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-4 mt-4">
        <button
          className="px-5 py-2 rounded bg-digitalBlue text-softWhite font-semibold hover:bg-digitalBlue/80 transition"
          onClick={onRestart}
        >
          Restart Session
        </button>
        <button
          className="px-5 py-2 rounded bg-fuchsiaAccent text-softWhite font-semibold hover:bg-fuchsiaAccent/80 transition"
          onClick={onExit}
        >
          Choose Domain
        </button>
      </div>
    </div>
  );
} 