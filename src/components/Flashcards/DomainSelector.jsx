import React from "react";
import { Stethoscope, Scan, Syringe, BrainCircuit } from "lucide-react";

const iconMap = {
  Stethoscope,
  Scan,
  Syringe,
  BrainCircuit
};

export default function DomainSelector({ domains, onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-softWhite/5 rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-2 text-center text-softWhite">Choose a Domain</h2>
      <p className="text-lg font-medium mb-8 text-center text-softWhite/80">Select a subject to start practicing flashcards</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {Object.entries(domains).map(([key, domain]) => {
          const LucideIcon = iconMap[domain.icon];
          return (
            <button
              key={key}
              className="flex items-center gap-3 px-6 py-4 bg-digitalBlue/10 rounded-lg shadow hover:bg-digitalBlue/20 transition-colors text-lg font-semibold justify-center w-full text-softWhite"
              onClick={() => onSelect(key)}
            >
              <span className="text-digitalBlue">
                {LucideIcon && <LucideIcon size={32} strokeWidth={2.2} className="mr-1" />}
              </span>
              <span>{domain.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
} 