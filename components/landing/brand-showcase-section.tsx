"use client";

import { useEffect, useRef, useState } from "react";

// Large interactive 3D Logo component
function InteractiveLogo3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x - 0.5;
      const my = mouseRef.current.y - 0.5;

      // Outer rotating ring with brand gradient
      ctx.save();
      ctx.translate(cx + mx * 30, cy + my * 30);
      ctx.rotate(time * 0.3);
      
      const outerGradient = ctx.createLinearGradient(-200, -200, 200, 200);
      outerGradient.addColorStop(0, "#1E5BA8");
      outerGradient.addColorStop(0.5, "#7B3FF2");
      outerGradient.addColorStop(1, "#FF1E8E");
      
      ctx.strokeStyle = outerGradient;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 180 + Math.sin(time) * 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Middle pulsing ring
      ctx.save();
      ctx.translate(cx + mx * 20, cy + my * 20);
      ctx.rotate(-time * 0.5);
      
      const midGradient = ctx.createLinearGradient(-150, -150, 150, 150);
      midGradient.addColorStop(0, "#FF1E8E");
      midGradient.addColorStop(0.5, "#7B3FF2");
      midGradient.addColorStop(1, "#1E5BA8");
      
      ctx.strokeStyle = midGradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      const midRadius = 140 + Math.sin(time * 1.5) * 15;
      ctx.arc(0, 0, midRadius, time, time + Math.PI * 1.5);
      ctx.stroke();
      ctx.restore();

      // Inner core with radial gradient
      ctx.save();
      ctx.translate(cx + mx * 10, cy + my * 10);
      
      const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
      coreGradient.addColorStop(0, "rgba(255, 30, 142, 0.9)");
      coreGradient.addColorStop(0.4, "rgba(123, 63, 242, 0.6)");
      coreGradient.addColorStop(0.7, "rgba(30, 91, 168, 0.3)");
      coreGradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 100 + Math.sin(time * 2) * 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Orbiting particles
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.8;
        const radius = 120 + Math.sin(time + i) * 20;
        const x = cx + Math.cos(angle) * radius + mx * 15;
        const y = cy + Math.sin(angle) * radius + my * 15;
        
        const colors = ["#1E5BA8", "#7B3FF2", "#FF1E8E"];
        ctx.fillStyle = colors[i % 3];
        ctx.beginPath();
        ctx.arc(x, y, 4 + Math.sin(time * 2 + i) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Neural connection lines
      ctx.strokeStyle = "rgba(123, 63, 242, 0.3)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const angle1 = (i / 6) * Math.PI * 2 + time * 0.3;
        const angle2 = ((i + 2) / 6) * Math.PI * 2 + time * 0.3;
        const r1 = 80 + Math.sin(time + i) * 20;
        const r2 = 160 + Math.cos(time + i) * 20;
        
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle1) * r1 + mx * 10, cy + Math.sin(angle1) * r1 + my * 10);
        ctx.lineTo(cx + Math.cos(angle2) * r2 + mx * 20, cy + Math.sin(angle2) * r2 + my * 20);
        ctx.stroke();
      }

      // Glowing center point
      const glowGradient = ctx.createRadialGradient(cx + mx * 5, cy + my * 5, 0, cx + mx * 5, cy + my * 5, 30);
      glowGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      glowGradient.addColorStop(0.3, "rgba(255, 30, 142, 0.8)");
      glowGradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(cx + mx * 5, cy + my * 5, 30, 0, Math.PI * 2);
      ctx.fill();

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-pointer"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

// Animated tagline text
function AnimatedTagline() {
  const words = ["Intelligence", "Innovation", "Purpose"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block min-w-[200px]">
      {words.map((word, idx) => (
        <span
          key={word}
          className={`absolute left-0 transition-all duration-700 bg-clip-text text-transparent bg-gradient-to-r from-[#1E5BA8] via-[#7B3FF2] to-[#FF1E8E] ${
            idx === currentWord
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-4 blur-sm"
          }`}
        >
          {word}
        </span>
      ))}
      <span className="invisible">{words[0]}</span>
    </span>
  );
}

export function BrandShowcaseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-black via-[#0a0a1f] to-black"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#7B3FF2]/10 blur-[150px]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#1E5BA8]/15 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF1E8E]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* 3D Interactive Logo */}
          <div
            className={`w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <InteractiveLogo3D />
          </div>

          {/* Brand Content */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Logo wordmark */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <img
                src="/calphark-logo.png"
                alt="Calphark"
                className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
              />
              <h2 className="text-5xl lg:text-7xl font-display bg-clip-text text-transparent bg-gradient-to-r from-[#1E5BA8] via-[#7B3FF2] to-[#FF1E8E]">
                CALPHARK
              </h2>
            </div>

            {/* Tagline */}
            <p className="text-2xl lg:text-3xl font-display text-white/90 mb-6">
              Guided by <AnimatedTagline />
            </p>
            <p className="text-lg text-white/60 max-w-md mx-auto lg:mx-0 mb-8">
              Enterprise Custom Software & Product Development. Transforming businesses with intelligent AI solutions.
            </p>

            {/* Service highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {["Custom Software", "AI Solutions", "Product Development", "Digital Innovation"].map((service, idx) => (
                <span
                  key={service}
                  className="px-4 py-2 text-sm font-mono border rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: idx % 3 === 0 ? "#1E5BA8" : idx % 3 === 1 ? "#7B3FF2" : "#FF1E8E",
                    color: idx % 3 === 0 ? "#1E5BA8" : idx % 3 === 1 ? "#7B3FF2" : "#FF1E8E",
                  }}
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
