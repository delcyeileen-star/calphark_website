"use client";

import { useEffect, useRef, useState } from "react";
import { AIDataProcessor } from "@/components/ai-animations/ai-data-processor";
import { Logo3D } from "@/components/3d-logo";
import { CloudBrandHover } from "@/components/cloud-brand-hover";
import { Interactive3DElement } from "@/components/ai-animations/interactive-3d-element";

const features = [
  {
    number: "01",
    title: "AI-Driven Product Development",
    description: "Utilize intelligent tools and adaptive systems to create innovative products that leverage cutting-edge AI capabilities.",
    stats: { value: "100+", label: "products built" },
    element3d: "neural" as const,
  },
  {
    number: "02",
    title: "Digital Innovation Frameworks",
    description: "Scalable technology architectures designed for diverse applications, enabling rapid deployment across industries.",
    stats: { value: "50+", label: "framework patterns" },
    element3d: "cube" as const,
  },
  {
    number: "03",
    title: "Applied Intelligence Systems",
    description: "AI-powered decision support models that enhance decision-making and operational efficiency at enterprise scale.",
    stats: { value: "99.9%", label: "accuracy rate" },
    element3d: "sphere" as const,
  },
  {
    number: "04",
    title: "Growth & Strategy Enablement",
    description: "Structured execution frameworks designed to support business growth and strategic transformation initiatives.",
    stats: { value: "200%", label: "avg ROI increase" },
    element3d: "pyramid" as const,
  },
  {
    number: "05",
    title: "Learning & Capability Platforms",
    description: "Modular engagement ecosystems that foster learning, development, and capability advancement within organizations.",
    stats: { value: "10K+", label: "learners trained" },
    element3d: "dna" as const,
  },
  {
    number: "06",
    title: "Cross-Industry Innovation Labs",
    description: "Experimental interdisciplinary builds exploring innovative solutions across different sectors and use cases.",
    stats: { value: "30+", label: "active projects" },
    element3d: "torus" as const,
  },
];

// Floating dot particles visualization
function ParticleVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

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

    // Generate stable particle positions
    const COUNT = 70;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 1.618;
      return {
        bx: ((seed * 127.1) % 1),
        by: ((seed * 311.7) % 1),
        phase: seed * Math.PI * 2,
        speed: 0.4 + (seed % 0.4),
        radius: 1.2 + (seed % 2.2),
      };
    });

    let time = 0;
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        const flowX = Math.sin(time * p.speed * 0.4 + p.phase) * 38;
        const flowY = Math.cos(time * p.speed * 0.3 + p.phase * 0.7) * 24;

        const bx = p.bx * w;
        const by = p.by * h;
        const dx = p.bx - mx;
        const dy = p.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist * 2.8);

        const x = bx + flowX + influence * Math.cos(time + p.phase) * 36;
        const y = by + flowY + influence * Math.sin(time + p.phase) * 36;

        const pulse = Math.sin(time * p.speed + p.phase) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.18 + influence * 0.3;

        ctx.beginPath();
        ctx.arc(x, y, p.radius + pulse * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

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
      className="absolute inset-0 pointer-events-auto"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Cloud brand hover effects */}
      <CloudBrandHover />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* 3D Logo accent - top right */}
        <div className="absolute top-12 right-12 z-30 opacity-20 hover:opacity-40 transition-opacity duration-500 scale-75">
          <Logo3D />
        </div>



        {/* Bento Grid Layout - 6 Services */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, idx) => {
            const colors = [
              { border: "#1E5BA8", glow: "#1E5BA8" },
              { border: "#7B3FF2", glow: "#7B3FF2" },
              { border: "#FF1E8E", glow: "#FF1E8E" },
              { border: "#1E5BA8", glow: "#1E5BA8" },
              { border: "#7B3FF2", glow: "#7B3FF2" },
              { border: "#FF1E8E", glow: "#FF1E8E" },
            ];
            const color = colors[idx % colors.length];
            
            return (
            <div 
              key={idx}
              className={`relative bg-gradient-to-br from-black via-[#0a0a1f] to-black border transition-all duration-700 p-8 lg:p-10 overflow-hidden group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ 
                borderColor: color.border,
                borderWidth: "2px",
                transitionDelay: isVisible ? `${idx * 100}ms` : "0ms",
                boxShadow: activeFeature === idx ? `0 0 30px ${color.glow}40, inset 0 0 20px ${color.glow}20` : "0 0 20px " + color.glow + "20"
              }}
              onMouseEnter={() => setActiveFeature(idx)}
            >
              {/* Gradient background on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${color.border}10 0%, transparent 50%, ${color.glow}10 100%)`
                }}
              />
              
              {/* 3D Interactive Element */}
              <div className="absolute top-4 right-4 opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                <Interactive3DElement
                  type={feature.element3d}
                  primaryColor={color.border}
                  secondaryColor={color.glow}
                  accentColor={idx % 2 === 0 ? "#FF1E8E" : "#1E5BA8"}
                  size={70}
                />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <span 
                  className="inline-block font-mono text-sm font-semibold mb-4"
                  style={{ color: color.border }}
                >
                  {feature.number}
                </span>
                <h3 className="text-xl lg:text-2xl font-display mb-4 group-hover:translate-x-1 transition-transform duration-500 text-white">
                  {feature.title}
                </h3>
                <p className="text-base text-foreground/70 leading-relaxed mb-8">
                  {feature.description}
                </p>
                <div className="pt-4" style={{ borderTop: `1px solid ${color.border}40` }}>
                  <span 
                    className="block text-3xl lg:text-4xl font-display"
                    style={{ color: color.border }}
                  >
                    {feature.stats.value}
                  </span>
                  <span className="block text-xs text-foreground/50 font-mono mt-2">{feature.stats.label}</span>
                </div>
              </div>

              {/* Glow effect on active */}
              {activeFeature === idx && (
                <div 
                  className="absolute inset-0 pointer-events-none ai-pulse"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${color.glow}30, transparent 70%)`
                  }}
                />
              )}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
