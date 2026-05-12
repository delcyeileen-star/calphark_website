"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const footerLinks = {
  Solutions: [
    { name: "AI Product Development", href: "#features" },
    { name: "Digital Innovation Frameworks", href: "#how-it-works" },
    { name: "Applied Intelligence Systems", href: "#" },
    { name: "Pricing", href: "#pricing" },
  ],
  Developers: [
    { name: "Documentation", href: "#developers" },
    { name: "AI Platform SDK", href: "#" },
    { name: "API Reference", href: "#developers" },
    { name: "Support", href: "#" },
  ],
  Company: [
    { name: "About Calphark", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#", badge: "Hiring" },
    { name: "Contact", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#security" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "LinkedIn", href: "#" },
];

function AnimatedWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      const colors = ["rgba(30, 91, 168, 0.5)", "rgba(123, 63, 242, 0.4)", "rgba(255, 30, 142, 0.5)"];

      for (let wave = 0; wave < 3; wave++) {
        ctx.strokeStyle = colors[wave];
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
          const y =
            height * 0.5 +
            Math.sin(x * 0.01 + time + wave * 0.5) * 30 +
            Math.sin(x * 0.02 + time * 1.5 + wave) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.02;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export function FooterSection() {
  return (
    <footer className="relative bg-gradient-to-br from-black via-[#0a0a1f] to-black border-t border-[#1E5BA8]/20">
      {/* Panoramic banner image */}
      <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
          alt="Bioluminescent landscape"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient fade to black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        {/* Subtle dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Footer content — black background, white text */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6 group">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img 
                    src="/calphark-logo.png" 
                    alt="Calphark" 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-2xl font-display bg-clip-text text-transparent bg-gradient-to-r from-[#1E5BA8] to-[#FF1E8E]">Calphark</span>
              </a>

              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm">
                Enterprise AI solutions platform. Guided by Intelligence, Driven by Purpose. Transform your business with advanced AI systems.
              </p>

              {/* Contact Information */}
              <div className="mb-8 space-y-2">
                <a 
                  href="mailto:corporate_relations@calphark.com"
                  className="text-sm text-white/70 hover:text-[#FF1E8E] transition-colors flex items-center gap-2"
                >
                  <span className="text-white/40">✉</span>
                  corporate_relations@calphark.com
                </a>
                <p className="text-sm text-white/50">
                  <span className="text-white/70">Phone:</span> <span className="text-white/40">[Contact placeholder]</span>
                </p>
                <p className="text-sm text-white/50">
                  <span className="text-white/70">Address:</span> <span className="text-white/40">[Address placeholder]</span>
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/40 hover:text-[#FF1E8E] transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-white mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-white text-black rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-[#FF1E8E]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; 2025 Calphark. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-white/30">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1E8E] animate-pulse" />
              Systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
