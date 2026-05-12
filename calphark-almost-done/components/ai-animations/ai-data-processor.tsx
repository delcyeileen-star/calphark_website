"use client";

import { useEffect, useRef } from "react";

export function AIDataProcessor() {
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

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      age: number;
      color: string;
    }> = [];

    const createParticle = () => {
      const colors = ["#1E5BA8", "#7B3FF2", "#FF1E8E"];
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 2,
        age: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const animate = () => {
      ctx.fillStyle = "rgba(6, 6, 20, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      // Create new particles
      if (Math.random() > 0.7) {
        createParticle();
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.age += 1;
        p.vy -= 0.1; // Gravity

        const opacity = Math.max(0, 1 - p.age / 100);

        ctx.fillStyle = p.color.replace(")", `, ${opacity})`).replace("rgb", "rgba");
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 + Math.sin(time + p.age * 0.05) * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle trails
        ctx.strokeStyle = p.color.replace(")", `, ${opacity * 0.5})`).replace("rgb", "rgba");
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
        ctx.stroke();

        if (p.age > 100) {
          particles.splice(i, 1);
        }
      }

      // Draw processing nodes
      const nodePositions = [
        { x: canvas.width * 0.25, y: canvas.height * 0.3 },
        { x: canvas.width * 0.5, y: canvas.height * 0.2 },
        { x: canvas.width * 0.75, y: canvas.height * 0.35 },
      ];

      nodePositions.forEach((node, idx) => {
        const scale = 1 + Math.sin(time * 2 + idx) * 0.3;
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20);
        gradient.addColorStop(0, "rgba(255, 30, 142, 0.8)");
        gradient.addColorStop(1, "rgba(123, 63, 242, 0.2)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8 * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(30, 91, 168, ${0.6 + Math.sin(time + idx) * 0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 12 * scale, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw connecting lines
      for (let i = 0; i < nodePositions.length; i++) {
        const from = nodePositions[i];
        const to = nodePositions[(i + 1) % nodePositions.length];

        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, "rgba(30, 91, 168, 0.3)");
        gradient.addColorStop(0.5, "rgba(255, 30, 142, 0.6)");
        gradient.addColorStop(1, "rgba(123, 63, 242, 0.3)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.globalAlpha = 0.5 + Math.sin(time + i) * 0.3;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.setLineDash([]);
      }

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
