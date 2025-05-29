import React, { useState } from "react";
import "./FlashcardCard.css";

export default function FlashcardCard({ question, answer }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(f => !f);

  return (
    <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={handleFlip}>
      <div className="flashcard-inner">
        <div className="flashcard-front flex items-center justify-center p-6 text-black font-semibold text-xl leading-snug select-none">
          <span>{question}</span>
        </div>
        <div className="flashcard-back flex items-center justify-center p-6 text-gray-800 font-semibold text-xl leading-snug select-none">
          <span>{answer}</span>
        </div>
      </div>
    </div>
  );
} 