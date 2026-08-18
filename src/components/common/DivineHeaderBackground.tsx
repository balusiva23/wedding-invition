import React from 'react';
import { DivinePairThemeId } from '../../types/wedding';
import { getDivinePairConfig } from '../../data/divineThemesData';

interface DivineHeaderBackgroundProps {
  divinePairId?: DivinePairThemeId;
  showPrabhavali?: boolean;
}

export const DivineHeaderBackground: React.FC<DivineHeaderBackgroundProps> = ({
  divinePairId = 'meenakshi-sundareswarar',
  showPrabhavali = true,
}) => {
  const currentDivine = getDivinePairConfig(divinePairId);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Dynamic Background Radial Aura based on Divine Pair Palette */}
      <div
        className="absolute inset-0 transition-all duration-1000 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${currentDivine.accentColor}33 0%, rgba(20, 5, 10, 0.8) 60%, rgba(10, 2, 5, 0.98) 100%)`,
        }}
      />

      {/* Floating Sacred Golden Particles & Aura Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,215,0,0.18),transparent_50%)] animate-pulse" />

      {/* Ornate South Indian Golden Prabhavali (திருவாச்சி / Golden Sanctum Arch) */}
      {showPrabhavali && (
        <div className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 w-[340px] sm:w-[540px] md:w-[680px] lg:w-[840px] h-[340px] sm:h-[540px] md:h-[680px] lg:h-[780px] opacity-35 transition-all duration-1000">
          <svg
            viewBox="0 0 800 800"
            className="w-full h-full text-amber-400 drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Sacred Flame Crown (Kirtimukha / Prabhavali Flame Rim) */}
            <circle
              cx="400"
              cy="400"
              r="340"
              stroke="url(#prabhavaliGold)"
              strokeWidth="2"
              strokeDasharray="4 6"
              className="animate-[spin_160s_linear_infinite]"
            />
            <circle
              cx="400"
              cy="400"
              r="320"
              stroke="url(#prabhavaliGold)"
              strokeWidth="3.5"
              strokeOpacity="0.8"
            />
            <circle
              cx="400"
              cy="400"
              r="300"
              stroke="url(#prabhavaliGold)"
              strokeWidth="1.5"
              strokeDasharray="8 8"
            />

            {/* Sacred Lotus Petal Ring */}
            <circle
              cx="400"
              cy="400"
              r="270"
              stroke="url(#prabhavaliGold)"
              strokeWidth="2"
              strokeDasharray="12 12"
              className="animate-[spin_120s_linear_infinite_reverse]"
            />

            {/* South Indian Temple Pillars Arch (Makara Thoranam Bases) */}
            <path
              d="M120 750 V450 Q120 180 400 180 Q680 180 680 450 V750"
              stroke="url(#prabhavaliGold)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M140 750 V450 Q140 200 400 200 Q660 200 660 450 V750"
              stroke="url(#prabhavaliGold)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />

            {/* Top Yali / Kirtimukha Crest Jewel */}
            <g transform="translate(400, 180)">
              <circle cx="0" cy="0" r="28" fill="#24060C" stroke="url(#prabhavaliGold)" strokeWidth="3" />
              <path
                d="M-18 -8 Q0 -28 18 -8 Q26 12 0 22 Q-26 12 -18 -8 Z"
                fill="url(#prabhavaliGold)"
                opacity="0.9"
              />
              <circle cx="0" cy="0" r="6" fill="#FFF" className="animate-ping" />
            </g>

            {/* Gradients */}
            <defs>
              <linearGradient id="prabhavaliGold" x1="0" y1="0" x2="800" y2="800" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF8DB" />
                <stop offset="25%" stopColor="#F5D061" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="75%" stopColor="#AA7A1E" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Divine Pair Specific Emblems (Embossed Center Aura Art) */}
      <div className="absolute top-16 sm:top-24 left-1/2 -translate-x-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 flex items-center justify-center opacity-30 pointer-events-none transition-all duration-700">
        {divinePairId === 'meenakshi-sundareswarar' && (
          <div className="relative flex flex-col items-center justify-center animate-pulse">
            {/* Madurai Meenakshi Parrot & Trishul & Lotus Emblem */}
            <svg viewBox="0 0 200 200" className="w-56 h-56 text-amber-300 drop-shadow-[0_0_20px_rgba(230,161,92,0.6)]" fill="currentColor">
              {/* Trishul & Lingam Aura */}
              <path d="M100 20 V160 M85 45 Q70 65 70 85 Q70 105 100 115 Q130 105 130 85 Q130 65 115 45 M100 20 L90 45 H110 Z" stroke="#F5D061" strokeWidth="3" fill="none" />
              <path d="M60 140 Q100 170 140 140 Q100 120 60 140 Z" fill="#D4AF37" opacity="0.6" />
              <circle cx="100" cy="85" r="16" fill="#FDE68A" opacity="0.4" />
              {/* Crescent Moon */}
              <path d="M125 35 Q145 45 135 65 Q130 50 125 35 Z" fill="#FFF8DB" />
            </svg>
          </div>
        )}

        {divinePairId === 'murugan-valli-deivanai' && (
          <div className="relative flex flex-col items-center justify-center animate-pulse">
            {/* Sacred Vel & Radiant Peacock Halo */}
            <svg viewBox="0 0 200 200" className="w-56 h-56 text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]" fill="currentColor">
              {/* Divine Spear / Vel */}
              <path d="M100 10 Q118 45 114 75 Q110 95 103 115 V185 H97 V115 Q90 95 86 75 Q82 45 100 10 Z" fill="#F59E0B" />
              <circle cx="100" cy="55" r="8" fill="#FFF8DB" />
              {/* Peacock Feathers Aura Rim */}
              <circle cx="100" cy="85" r="65" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.7" />
              {/* Om Sacred Glyph */}
              <path d="M70 140 Q85 120 100 140 T130 140" stroke="#FDE68A" strokeWidth="2" fill="none" />
            </svg>
          </div>
        )}

        {divinePairId === 'andal-alagar' && (
          <div className="relative flex flex-col items-center justify-center animate-pulse">
            {/* Srivilliputhur Andal Parrot & Garland & Crown */}
            <svg viewBox="0 0 200 200" className="w-56 h-56 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]" fill="currentColor">
              {/* Andal Kondai & Parrot Outline */}
              <ellipse cx="100" cy="70" rx="35" ry="45" fill="#10B981" opacity="0.3" />
              <circle cx="125" cy="50" r="18" fill="#34D399" opacity="0.5" />
              {/* Garland Loops */}
              <path d="M55 90 Q100 170 145 90 Q100 130 55 90 Z" fill="none" stroke="#F5D061" strokeWidth="4" strokeDasharray="8 4" />
              <path d="M70 95 Q100 150 130 95" fill="none" stroke="#10B981" strokeWidth="3" />
            </svg>
          </div>
        )}

        {divinePairId === 'venkateswara-padmavathi' && (
          <div className="relative flex flex-col items-center justify-center animate-pulse">
            {/* Tirumala Shankha, Chakra & Namam */}
            <svg viewBox="0 0 200 200" className="w-56 h-56 text-sky-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.6)]" fill="currentColor">
              {/* Thiruman / Namam */}
              <path d="M85 30 V110 H92 V45 H108 V110 H115 V30 H105 V85 H95 V30 Z" fill="#FFF" />
              <path d="M97 45 V125 H103 V45 Z" fill="#EF4444" />
              <path d="M85 110 Q100 140 115 110 Z" fill="#FFF" />
              {/* Shankha on Left */}
              <circle cx="45" cy="80" r="22" stroke="#60A5FA" strokeWidth="2.5" fill="none" />
              {/* Sudarshana Chakra on Right */}
              <circle cx="155" cy="80" r="22" stroke="#F5D061" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
            </svg>
          </div>
        )}

        {divinePairId === 'sita-rama' && (
          <div className="relative flex flex-col items-center justify-center animate-pulse">
            {/* Kodanda Bow, Sacred Arrow & Lotus */}
            <svg viewBox="0 0 200 200" className="w-56 h-56 text-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.6)]" fill="currentColor">
              {/* Kodanda Bow */}
              <path d="M50 30 Q120 100 50 170" stroke="#FB923C" strokeWidth="3.5" fill="none" />
              <path d="M50 30 L50 170" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Arrow */}
              <path d="M35 100 H165 M150 90 L165 100 L150 110" stroke="#F5D061" strokeWidth="3" fill="none" />
              {/* Lotus */}
              <circle cx="100" cy="100" r="20" fill="#FB923C" opacity="0.3" />
            </svg>
          </div>
        )}
      </div>

      {/* Traditional Temple Corner Kolam Flourishes */}
      <div className="absolute top-4 left-4 w-20 h-20 opacity-20 border-t-2 border-l-2 border-amber-400/70 rounded-tl-3xl" />
      <div className="absolute top-4 right-4 w-20 h-20 opacity-20 border-t-2 border-r-2 border-amber-400/70 rounded-tr-3xl" />
    </div>
  );
};
