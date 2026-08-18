import React from 'react';

export const KolamDivider: React.FC<{ className?: string; light?: boolean }> = ({
  className = '',
  light = false,
}) => {
  const strokeColor = light ? '#C59A27' : '#D4AF37';

  return (
    <div className={`flex items-center justify-center space-x-3 my-8 opacity-80 ${className}`}>
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-amber-500/60" />
      
      {/* Kolam / Rangoli Lotus SVG Motif */}
      <svg
        width="48"
        height="32"
        viewBox="0 0 100 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-amber-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
      >
        <path
          d="M50 4C50 4 35 24 15 28C35 32 45 48 50 60C55 48 65 32 85 28C65 24 50 4 50 4Z"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="32" r="4" fill={strokeColor} />
        <circle cx="30" cy="28" r="2" fill={strokeColor} />
        <circle cx="70" cy="28" r="2" fill={strokeColor} />
        <path
          d="M25 18C32 24 40 28 50 28C60 28 68 24 75 18"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
      </svg>

      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-amber-500/60" />
    </div>
  );
};
