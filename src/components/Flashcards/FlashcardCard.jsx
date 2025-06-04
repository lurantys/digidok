import React, { useState } from "react";
import "./FlashcardCard.css";
import { Stethoscope, Scan, Syringe, BrainCircuit } from "lucide-react";

const iconMap = {
  Stethoscope,
  Scan,
  Syringe,
  BrainCircuit
};

export default function FlashcardCard({ question, answer, domainIcon, domainName, progress }) {
  const [flipped, setFlipped] = useState(false);
  const LucideIcon = iconMap[domainIcon];

  const handleFlip = () => setFlipped(f => !f);

  return (
    <div
      className={`flashcard group ${flipped ? "flipped" : ""} transition-transform duration-200 hover:scale-[1.025] active:scale-[0.98]`}
      onClick={handleFlip}
      style={{ width: '100%', maxWidth: 380 }}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front flex flex-col items-center justify-center p-8 bg-softWhite text-slateGray font-semibold text-xl leading-snug select-none relative border border-digitalBlue/20 rounded-2xl shadow-lg">
          <div className="absolute top-4 left-4 flex items-center gap-2 opacity-80">
            {LucideIcon && <LucideIcon size={22} className="text-digitalBlue" />}
            {domainName && <span className="font-medium text-digitalBlue text-sm">{domainName}</span>}
          </div>
          {progress && (
            <div className="absolute top-4 right-4 bg-digitalBlue/10 text-digitalBlue rounded-full px-3 py-1 text-xs font-bold shadow">
              {progress}
            </div>
          )}
          <span className="mt-6 block text-center text-lg sm:text-xl font-semibold leading-snug">{question}</span>
          <span className="mt-2 block text-xs text-slateGray">Click to reveal answer</span>
        </div>
        <div className="flashcard-back flex flex-col items-center justify-center p-8 bg-midnightNavy text-softWhite font-semibold text-xl leading-snug select-none relative border border-digitalBlue/20 rounded-2xl shadow-lg">
          <div className="absolute top-4 left-4 flex items-center gap-2 opacity-80">
            {LucideIcon && <LucideIcon size={22} className="text-digitalBlue" />}
            {domainName && <span className="font-medium text-digitalBlue text-sm">{domainName}</span>}
          </div>
          {progress && (
            <div className="absolute top-4 right-4 bg-digitalBlue/10 text-digitalBlue rounded-full px-3 py-1 text-xs font-bold shadow">
              {progress}
            </div>
          )}
          <span className="mt-6 block text-center text-lg sm:text-xl font-semibold leading-snug">{answer}</span>
          <span className="mt-2 block text-xs text-softWhite/80">Click to go back</span>
        </div>
      </div>
    </div>
  );
} 