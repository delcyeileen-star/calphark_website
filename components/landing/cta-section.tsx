"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AIIntelligenceFlow } from "@/components/ai-animations/ai-intelligence-flow";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border-2 transition-all duration-1000 overflow-hidden rounded-lg ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            borderImage: "linear-gradient(135deg, #1E5BA8, #7B3FF2, #FF1E8E) 1",
          }}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 opacity-25 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 30, 142, 0.25), transparent 40%)`
            }}
          />
          
          {/* Gradient background - More Calphark colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E5BA8]/15 via-[#0a0a1f] to-[#FF1E8E]/10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#7B3FF2]/10 via-transparent to-[#1E5BA8]/5 opacity-60" />
          
          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left content */}
              <div className="flex-1">
                <h2 className="text-6xl md:text-7xl lg:text-[72px] font-display tracking-tight mb-8 leading-[0.95] bg-clip-text text-transparent bg-gradient-to-r from-[#1E5BA8] via-[#7B3FF2] to-[#FF1E8E]">
                  Transform Your
                  <br />
                  Enterprise Today
                </h2>

                <p className="text-xl text-foreground/70 mb-12 leading-relaxed max-w-xl">
                  Discover how Calphark's AI solutions can enhance your capability, creativity, and performance. Start your innovation journey now.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#1E5BA8] via-[#7B3FF2] to-[#FF1E8E] hover:shadow-xl hover:shadow-[#FF1E8E]/60 hover:scale-105 text-white px-8 h-14 text-base rounded-full group transition-all duration-300"
                  >
                    Schedule Consultation
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    className="h-14 px-8 text-base rounded-full border-2 text-white hover:bg-gradient-to-r hover:from-[#1E5BA8]/20 hover:to-[#FF1E8E]/20 transition-all duration-300"
                    style={{
                      borderImage: "linear-gradient(135deg, #1E5BA8, #FF1E8E) 1",
                    }}
                  >
                    View Our Work
                  </Button>
                </div>

                <p className="text-sm text-foreground/60 mt-8 font-mono">
                  Part of the Calphark AI Innovation Platform
                </p>
              </div>

              {/* Right image - AI Intelligence Flow Animation */}
              <div className="hidden lg:flex items-end justify-center w-[600px] h-[650px] -mr-16 border border-[#FF1E8E]/30 rounded-lg overflow-hidden bg-gradient-to-br from-black via-[#0a0a1f] to-black">
                <AIIntelligenceFlow />
              </div>
            </div>
          </div>

          {/* Decorative corner with gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-gradient-to-br from-[#1E5BA8]/30 to-[#FF1E8E]/30" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-gradient-to-tr from-[#FF1E8E]/30 to-[#1E5BA8]/30" />
        </div>
      </div>
    </section>
  );
}
