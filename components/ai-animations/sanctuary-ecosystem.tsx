'use client';

import { useEffect, useRef } from 'react';

export function SanctuaryEcosystem() {
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
    const particles: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = [];

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random()
      });
    }

    const drawEcosystem = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background with sanctuary gradient
      const bgGradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.5,
        100,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height)
      );
      bgGradient.addColorStop(0, 'rgba(30, 91, 168, 0.08)');
      bgGradient.addColorStop(0.5, 'rgba(123, 63, 242, 0.04)');
      bgGradient.addColorStop(1, 'rgba(10, 10, 25, 0.1)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing particles with sanctuary + AI blend
      particles.forEach((p, idx) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.005;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const wave = Math.sin(time * 0.3 + idx) * 20;

        // Sanctuary element
        ctx.fillStyle = `rgba(30, 91, 168, ${Math.sin(p.life * 2) * 0.4 + 0.2})`;
        ctx.beginPath();
        ctx.arc(p.x + wave, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // AI network glow
        ctx.strokeStyle = `rgba(255, 30, 142, ${Math.sin(p.life * 3) * 0.3 + 0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x + wave, p.y, 5, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            gradient.addColorStop(0, 'rgba(30, 91, 168, 0.2)');
            gradient.addColorStop(0.5, 'rgba(123, 63, 242, 0.15)');
            gradient.addColorStop(1, 'rgba(255, 30, 142, 0.1)');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      time += 0.01;
      animationId = requestAnimationFrame(drawEcosystem);
    };

    drawEcosystem();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
