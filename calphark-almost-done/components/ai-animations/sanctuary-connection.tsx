'use client';

import { useEffect, useRef } from 'react';

export function SanctuaryConnection() {
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

      // Fast-moving corporate developer visualization
      const nodeCount = 6;
      for (let i = 0; i < nodeCount; i++) {
        const angle = (time * 1.5 + (i / nodeCount) * Math.PI * 2);
        const x = canvas.width * 0.5 + Math.cos(angle) * (canvas.width * 0.3);
        const y = canvas.height * 0.5 + Math.sin(angle) * (canvas.height * 0.3);
        const pulse = Math.sin(time * 3 + i) * 0.5 + 0.5;

        // Core node
        ctx.fillStyle = `rgba(30, 91, 168, ${0.7 + pulse * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 12 + pulse * 4, 0, Math.PI * 2);
        ctx.fill();

        // Outer ring
        ctx.strokeStyle = `rgba(255, 30, 142, ${0.5 + pulse * 0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 20 + pulse * 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Fast connecting lines
      for (let i = 0; i < nodeCount; i++) {
        const angle1 = (time * 1.5 + (i / nodeCount) * Math.PI * 2);
        const angle2 = (time * 1.5 + ((i + 1) / nodeCount) * Math.PI * 2);
        
        const x1 = canvas.width * 0.5 + Math.cos(angle1) * (canvas.width * 0.3);
        const y1 = canvas.height * 0.5 + Math.sin(angle1) * (canvas.height * 0.3);
        const x2 = canvas.width * 0.5 + Math.cos(angle2) * (canvas.width * 0.3);
        const y2 = canvas.height * 0.5 + Math.sin(angle2) * (canvas.height * 0.3);

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, 'rgba(30, 91, 168, 0.6)');
        gradient.addColorStop(0.5, 'rgba(123, 63, 242, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 30, 142, 0.4)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Center core
      ctx.fillStyle = 'rgba(123, 63, 242, 0.8)';
      ctx.beginPath();
      ctx.arc(canvas.width * 0.5, canvas.height * 0.5, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 30, 142, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(canvas.width * 0.5, canvas.height * 0.5, 15, 0, Math.PI * 2);
      ctx.stroke();

      time += 0.03;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

