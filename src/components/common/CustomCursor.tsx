import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer');
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Outer subtle glow ring */}
      <div
        className="fixed top-0 left-0 rounded-full border border-amber-400/40 transition-transform duration-100 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${position.x - (isPointer ? 20 : 12)}px, ${
            position.y - (isPointer ? 20 : 12)
          }px, 0)`,
          width: isPointer ? '40px' : '24px',
          height: isPointer ? '40px' : '24px',
          backgroundColor: isPointer ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
          boxShadow: isPointer ? '0 0 15px rgba(212, 175, 55, 0.4)' : 'none',
        }}
      />
      {/* Inner tiny dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-amber-300 rounded-full pointer-events-none"
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      />
    </div>
  );
};
