'use client';

import { useEffect, useRef } from 'react';

export function CorporateDataFlow() {
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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fast-moving data particles
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const x = ((time * 3 + i * 50) % (canvas.width + 100)) - 50;
        const y = (canvas.height / particleCount) * i;

        // Calphark color particles
        ctx.fillStyle = `rgba(30, 91, 168, ${0.6 + Math.sin(time * 2 + i) * 0.4})`;
        ctx.fillRect(x, y, 20, 3);

        // Accent glow
        ctx.fillStyle = `rgba(255, 30, 142, ${0.3 + Math.sin(time * 2.5 + i) * 0.2})`;
        ctx.fillRect(x + 5, y - 2, 10, 7);
      }

      // Draw connecting network lines
      ctx.strokeStyle = 'rgba(123, 63, 242, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const startX = (time * 2 + i * 100) % canvas.width;
        const startY = (canvas.height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + 150, startY + 50);
        ctx.stroke();
      }

      time += 0.02;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
