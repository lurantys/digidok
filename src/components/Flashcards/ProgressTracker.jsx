import React from "react";

export default function ProgressTracker({ current, total }) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="w-full max-w-xs mx-auto mb-4">
      <div className="flex justify-between text-sm mb-1 text-softWhite/80">
        <span>Progress</span>
        <span>{current} / {total}</span>
      </div>
      <div className="w-full h-2 bg-softWhite/10 rounded-full overflow-hidden">
        <div
          className="h-2 bg-digitalBlue transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
} 