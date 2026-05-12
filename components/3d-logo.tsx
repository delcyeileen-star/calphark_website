"use client";

import { useEffect, useRef } from "react";

export function Logo3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create a canvas for 3D rendering
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let rotationX = 0;
    let rotationY = 0;

    const animate = () => {
      rotationX += 0.005;
      rotationY += 0.008;

      ctx.fillStyle = "rgba(6, 6, 20, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      // Draw rotating gradient circles
      const gradient1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 120);
      gradient1.addColorStop(0, "rgba(30, 91, 168, 0.8)");
      gradient1.addColorStop(0.5, "rgba(123, 63, 242, 0.6)");
      gradient1.addColorStop(1, "rgba(255, 30, 142, 0.4)");

      ctx.fillStyle = gradient1;
      ctx.beginPath();
      ctx.arc(0, 0, 120 * Math.cos(rotationX), 0, Math.PI * 2);
      ctx.fill();

      // Draw rotating gradient ring
      const gradient2 = ctx.createLinearGradient(-150, -150, 150, 150);
      gradient2.addColorStop(0, "#1E5BA8");
      gradient2.addColorStop(0.5, "#7B3FF2");
      gradient2.addColorStop(1, "#FF1E8E");

      ctx.strokeStyle = gradient2;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 100 + Math.sin(rotationY) * 20, 0, Math.PI * 2);
      ctx.stroke();

      // Draw inner rotating arc
      ctx.strokeStyle = "rgba(255, 30, 142, 0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 70, rotationY, rotationY + Math.PI);
      ctx.stroke();

      // Draw glowing center
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
      glowGradient.addColorStop(0, "rgba(255, 30, 142, 0.9)");
      glowGradient.addColorStop(1, "rgba(123, 63, 242, 0)");
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.remove();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-32 h-32 perspective filter drop-shadow-2xl hover:drop-shadow-[0_0_40px_rgba(255,30,142,0.6)] transition-all duration-500"
      style={{
        perspective: "1000px",
      }}
    />
  );
}
