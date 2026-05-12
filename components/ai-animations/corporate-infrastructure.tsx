'use client';

import { useEffect, useRef } from 'react';

export function CorporateInfrastructure() {
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

      // Draw server/infrastructure nodes in a grid
      const cols = 4;
      const rows = 3;
      const cellWidth = canvas.width / (cols + 1);
      const cellHeight = canvas.height / (rows + 1);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = cellWidth * (i + 1);
          const y = cellHeight * (j + 1);
          const pulse = Math.sin(time * 2 + i * 0.5 + j * 0.5) * 0.5 + 0.5;

          // Server node outline
          ctx.strokeStyle = `rgba(30, 91, 168, ${0.5 + pulse * 0.3})`;
          ctx.lineWidth = 2;
          ctx.strokeRect(x - 20, y - 20, 40, 40);

          // Active indicator
          ctx.fillStyle = `rgba(255, 30, 142, ${0.6 + pulse * 0.4})`;
          ctx.fillRect(x - 15, y - 15, 30, 30);

          // Center dot
          ctx.fillStyle = `rgba(123, 63, 242, 1)`;
          ctx.beginPath();
          ctx.arc(x, y, 5 + pulse * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw connection lines between nodes
      for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows; j++) {
          const x1 = cellWidth * (i + 1);
          const y1 = cellHeight * (j + 1);
          const x2 = cellWidth * (i + 2);
          const y2 = cellHeight * (j + 1);

          const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
          gradient.addColorStop(0, 'rgba(30, 91, 168, 0.4)');
          gradient.addColorStop(1, 'rgba(255, 30, 142, 0.2)');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x1 + 20, y1);
          ctx.lineTo(x2 - 20, y2);
          ctx.stroke();
        }
      }

      time += 0.015;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
