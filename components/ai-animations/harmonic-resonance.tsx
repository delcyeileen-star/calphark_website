'use client';

import { useEffect, useRef } from 'react';

export function HarmonicResonance() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId: number;
    let time = 0;

    const drawResonance = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sanctuary sanctuary radial gradient
      const radGradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 50,
        canvas.width * 0.5, canvas.height * 0.5, Math.max(canvas.width, canvas.height)
      );
      radGradient.addColorStop(0, 'rgba(255, 30, 142, 0.15)');
      radGradient.addColorStop(0.5, 'rgba(123, 63, 242, 0.08)');
      radGradient.addColorStop(1, 'rgba(30, 91, 168, 0.1)');
      ctx.fillStyle = radGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.5;

      // Draw harmonic resonance rings
      for (let ring = 0; ring < 6; ring++) {
        const radius = 30 + ring * 40 + Math.sin(time * 0.4 - ring * 0.5) * 15;
        const opacity = Math.sin(time * 0.5 - ring * 0.3) * 0.4 + 0.3;

        // Sanctuary ring (organic feel)
        ctx.strokeStyle = `rgba(30, 91, 168, ${opacity * 0.7})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // AI harmonic ring (digital)
        ctx.strokeStyle = `rgba(255, 30, 142, ${opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw nodes at harmonic points
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.2;
        const distance = 120 + Math.sin(time * 0.3 + i) * 40;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        // Sanctuary core
        ctx.fillStyle = `rgba(30, 91, 168, ${0.6 + Math.sin(time * 0.6 + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        // AI resonance glow
        ctx.strokeStyle = `rgba(255, 30, 142, ${0.7 + Math.sin(time * 0.5 + i) * 0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.stroke();
      }

      time += 0.01;
      animationId = requestAnimationFrame(drawResonance);
    };

    drawResonance();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
