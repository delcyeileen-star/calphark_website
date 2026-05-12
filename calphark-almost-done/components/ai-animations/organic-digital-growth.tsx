'use client';

import { useEffect, useRef } from 'react';

export function OrganicDigitalGrowth() {
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

    const drawGrowth = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Base sanctuary gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(30, 91, 168, 0.05)');
      gradient.addColorStop(0.5, 'rgba(123, 63, 242, 0.03)');
      gradient.addColorStop(1, 'rgba(255, 30, 142, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw organic growth vines with AI nodes
      for (let vine = 0; vine < 4; vine++) {
        const startX = (canvas.width / 5) * (vine + 1);
        const startY = canvas.height * 0.8;

        ctx.strokeStyle = `rgba(30, 91, 168, ${0.4 + Math.sin(time * 0.4 + vine) * 0.2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);

        for (let i = 0; i < 20; i++) {
          const x = startX + Math.sin(time * 0.5 + i * 0.5 + vine) * 20;
          const y = startY - (i * canvas.height * 0.04);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // AI nodes along the vine
        for (let i = 0; i < 10; i++) {
          const x = startX + Math.sin(time * 0.5 + i * 0.5 + vine) * 20;
          const y = startY - (i * canvas.height * 0.08);

          // Inner sanctuary sphere
          ctx.fillStyle = `rgba(30, 91, 168, ${0.6 + Math.sin(time * 0.6 + i + vine) * 0.3})`;
          ctx.beginPath();
          ctx.arc(x, y, 4 + Math.sin(time * 0.7 + i) * 2, 0, Math.PI * 2);
          ctx.fill();

          // Outer AI glow
          ctx.strokeStyle = `rgba(255, 30, 142, ${0.5 + Math.sin(time * 0.5 + i + vine) * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, 8 + Math.sin(time * 0.8 + i) * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      time += 0.01;
      animationId = requestAnimationFrame(drawGrowth);
    };

    drawGrowth();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
