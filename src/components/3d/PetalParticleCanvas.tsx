import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  type: 'jasmine' | 'marigold' | 'rose';
  opacity: number;
}

export const PetalParticleCanvas: React.FC<{ density?: 'low' | 'medium' | 'high' }> = ({
  density = 'medium',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = density === 'low' ? 20 : density === 'high' ? 50 : 35;
    const petals: Petal[] = [];

    const types: ('jasmine' | 'marigold' | 'rose')[] = ['jasmine', 'marigold', 'rose'];

    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 8 + Math.random() * 12,
        speedY: 0.6 + Math.random() * 1.4,
        speedX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: 0.4 + Math.random() * 0.5,
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'jasmine') {
        // Jasmine petal: creamy white with soft yellow hint
        ctx.fillStyle = '#FFFDF2';
        ctx.shadowColor = 'rgba(255, 240, 200, 0.4)';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'marigold') {
        // Marigold petal: golden saffron orange
        ctx.fillStyle = '#E88B12';
        ctx.shadowColor = 'rgba(232, 139, 18, 0.5)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.6, p.size * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Rose petal: deep scarlet maroon
        ctx.fillStyle = '#991B2B';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.7, p.size * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.005) * 0.4;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
    />
  );
};
