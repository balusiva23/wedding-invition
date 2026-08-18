import React, { useState } from 'react';
import { audioService } from '../../services/audioService';

export const TempleBell: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isSwinging, setIsSwinging] = useState(false);

  const ringBell = () => {
    setIsSwinging(true);
    audioService.playTempleBellSound();
    setTimeout(() => setIsSwinging(false), 2400);
  };

  return (
    <div
      onClick={ringBell}
      className={`group relative flex flex-col items-center cursor-pointer select-none transition-transform hover:scale-105 ${className}`}
      title="Click to ring the temple bell for divine blessings"
    >
      {/* Hanging Brass Chain */}
      <div className="w-[3px] h-10 bg-gradient-to-b from-amber-600 via-amber-400 to-amber-600 rounded-full shadow-sm" />

      {/* Bell Body */}
      <div
        className={`relative flex flex-col items-center origin-top transition-transform duration-700 ease-out ${
          isSwinging ? 'animate-[wiggle_0.4s_ease-in-out_infinite_alternate]' : 'group-hover:rotate-6'
        }`}
      >
        {/* Top Dome */}
        <div className="w-8 h-6 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 rounded-t-full border border-amber-300/40 shadow-lg" />
        {/* Bell Flared Rim */}
        <div className="w-11 h-4 -mt-1 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded-b-lg border-t border-amber-200/50 shadow-md flex items-center justify-center">
          {/* Clapper tip */}
          <div className="w-2.5 h-3.5 bg-amber-800 rounded-full translate-y-2 border border-amber-400/40 shadow" />
        </div>
      </div>

      {/* Touch / Click Hint */}
      <span className="mt-4 text-[10px] tracking-widest uppercase font-serif text-amber-300/80 bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
        Ring Bell 🔔
      </span>
    </div>
  );
};
