"use client";

import { useEffect, useRef } from "react";

export function NeuralTreeLights() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let synapses: Synapse[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Neural node particles that pulse and move along branch-like paths
    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
      drift: number;
      driftSpeed: number;

      constructor() {
        this.baseX = Math.random() * canvas.width;
        this.baseY = Math.random() * canvas.height;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = Math.random() * 3 + 1;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
        this.drift = Math.random() * Math.PI * 2;
        this.driftSpeed = 0.005 + Math.random() * 0.01;
        
        // Brand colors: blue, purple, pink
        const colors = ["#1E5BA8", "#7B3FF2", "#FF1E8E", "#4B8FD9", "#9B6FF7"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.pulse += this.pulseSpeed;
        this.drift += this.driftSpeed;
        
        // Gentle drifting motion like leaves swaying
        this.x = this.baseX + Math.sin(this.drift) * 15;
        this.y = this.baseY + Math.cos(this.drift * 0.7) * 10;
      }

      draw() {
        const pulseSize = this.size * (1 + Math.sin(this.pulse) * 0.5);
        const alpha = 0.3 + Math.sin(this.pulse) * 0.3;
        
        // Glow effect
        const gradient = ctx!.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, pulseSize * 4
        );
        gradient.addColorStop(0, this.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.5, this.color + "40");
        gradient.addColorStop(1, "transparent");
        
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, pulseSize * 4, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();
        
        // Core bright point
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }
    }

    // Neural connections that pulse with traveling light
    class Synapse {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      progress: number;
      speed: number;
      color: string;
      active: boolean;
      lifespan: number;

      constructor() {
        this.startX = Math.random() * canvas.width;
        this.startY = Math.random() * canvas.height;
        // Create branch-like angles (mostly upward and outward)
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8;
        const length = 50 + Math.random() * 150;
        this.endX = this.startX + Math.cos(angle) * length;
        this.endY = this.startY + Math.sin(angle) * length;
        this.progress = 0;
        this.speed = 0.005 + Math.random() * 0.015;
        this.active = Math.random() > 0.7;
        this.lifespan = 0;
        
        const colors = ["#1E5BA8", "#7B3FF2", "#FF1E8E"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (this.active) {
          this.progress += this.speed;
          if (this.progress > 1) {
            this.progress = 0;
            this.active = Math.random() > 0.5;
          }
        } else {
          this.lifespan++;
          if (this.lifespan > 60 && Math.random() > 0.98) {
            this.active = true;
            this.lifespan = 0;
          }
        }
      }

      draw() {
        if (!this.active) return;
        
        // Draw the branch line (faint)
        ctx!.beginPath();
        ctx!.moveTo(this.startX, this.startY);
        ctx!.lineTo(this.endX, this.endY);
        ctx!.strokeStyle = this.color + "15";
        ctx!.lineWidth = 1;
        ctx!.stroke();
        
        // Draw traveling pulse
        const currentX = this.startX + (this.endX - this.startX) * this.progress;
        const currentY = this.startY + (this.endY - this.startY) * this.progress;
        
        const gradient = ctx!.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, 12
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, this.color + "60");
        gradient.addColorStop(1, "transparent");
        
        ctx!.beginPath();
        ctx!.arc(currentX, currentY, 12, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();
      }
    }

    // Initialize particles and synapses
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    const synapseCount = Math.floor(particleCount * 0.8);

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    for (let i = 0; i < synapseCount; i++) {
      synapses.push(new Synapse());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw synapses (neural pathways)
      synapses.forEach(synapse => {
        synapse.update();
        synapse.draw();
      });

      // Update and draw particles (neural nodes)
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-60"
      aria-hidden="true"
    />
  );
}
