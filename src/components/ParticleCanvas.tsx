import React, { useEffect, useRef } from 'react';
import { ParticleType } from '../types';

interface ParticleCanvasProps {
  type?: ParticleType;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  rotation: number;
  rotSpeed: number;
  type: string;
  color: string;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ type = 'hearts' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const particleSymbols = {
      hearts: ['❤️', '💖', '💕', '💗', '🌸'],
      sakura: ['🌸', '🌺', '🍃', '💮'],
      stars: ['✨', '⭐', '🌟', '💫'],
      sparkles: ['✨', '💖', '💫', '⚡'],
      bubbles: ['🫧', '⚪', '🤍', '💖']
    };

    const symbols = particleSymbols[type] || particleSymbols.hearts;

    const createParticle = (): Particle => {
      const isMobile = window.innerWidth < 768;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 50,
        size: (Math.random() * 12 + (isMobile ? 10 : 14)),
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -(Math.random() * 1.2 + 0.6),
        opacity: Math.random() * 0.7 + 0.3,
        fadeSpeed: Math.random() * 0.003 + 0.001,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        type: symbols[Math.floor(Math.random() * symbols.length)],
        color: ['#f472b6', '#fb7185', '#fda4af', '#f43f5e', '#e11d48'][Math.floor(Math.random() * 5)]
      };
    };

    const count = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < count; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height; // Distribute initially across screen
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        p.opacity -= p.fadeSpeed;

        if (p.opacity <= 0 || p.y < -30) {
          particles[index] = createParticle();
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);

          if (type === 'bubbles') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(251, 207, 232, 0.4)';
            ctx.strokeStyle = 'rgba(244, 114, 182, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.fill();
            ctx.stroke();
          } else {
            ctx.font = `${p.size}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.type, 0, 0);
          }

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
    />
  );
};
