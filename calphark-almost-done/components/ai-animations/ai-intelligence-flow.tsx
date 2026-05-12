"use client";

import { useEffect, useRef } from "react";

export function AIIntelligenceFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      // Clear with fade
      ctx.fillStyle = "rgba(6, 6, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw multiple orbiting rings with Calphark colors
      const rings = [
        { radius: 40, speed: 2, color: "#1E5BA8", width: 2 },
        { radius: 80, speed: -1.5, color: "#7B3FF2", width: 2 },
        { radius: 120, speed: 1, color: "#FF1E8E", width: 2 },
      ];

      rings.forEach((ring, idx) => {
        const angle = (time * ring.speed + idx * (Math.PI * 2 / 3)) % (Math.PI * 2);

        // Draw ring
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = ring.width;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw orbiting particle
        const x = centerX + Math.cos(angle) * ring.radius;
        const y = centerY + Math.sin(angle) * ring.radius;

        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
        particleGradient.addColorStop(0, ring.color);
        particleGradient.addColorStop(1, ring.color + "00");

        ctx.fillStyle = particleGradient;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow trail
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const prevAngle = angle - 0.2;
        ctx.moveTo(
          centerX + Math.cos(prevAngle) * ring.radius,
          centerY + Math.sin(prevAngle) * ring.radius
        );
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      // Draw central glow
      const centralGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
      centralGradient.addColorStop(0, "rgba(255, 30, 142, 0.8)");
      centralGradient.addColorStop(0.5, "rgba(123, 63, 242, 0.4)");
      centralGradient.addColorStop(1, "rgba(30, 91, 168, 0)");

      ctx.fillStyle = centralGradient;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fill();

      // Draw pulsing center
      ctx.fillStyle = "#FF1E8E";
      ctx.globalAlpha = 0.7 + Math.sin(time * 2) * 0.2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}
