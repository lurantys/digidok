import React from "react";

export default function AssessmentButtons({ onCorrect, onIncorrect }) {
  return (
    <div className="flex gap-6 mt-4">
      <button
        className="px-6 py-3 rounded-lg bg-digitalBlue text-softWhite font-semibold text-lg shadow hover:bg-digitalBlue/80 active:scale-95 transition-all"
        onClick={onCorrect}
      >
        Got it right
      </button>
      <button
        className="px-6 py-3 rounded-lg bg-fuchsiaAccent text-softWhite font-semibold text-lg shadow hover:bg-fuchsiaAccent/80 active:scale-95 transition-all"
        onClick={onIncorrect}
      >
        Need to review
      </button>
    </div>
  );
} 