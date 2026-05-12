"use client";

import { useState, useEffect, useRef } from "react";
import { SanctuaryConnection } from "@/components/ai-animations/sanctuary-connection";

const features = [
  { 
    title: "TypeScript native", 
    description: "Full type safety for agent configs and responses."
  },
  { 
    title: "Streaming results", 
    description: "Watch your agents think and act in real-time."
  },
  { 
    title: "Multi-model support", 
    description: "OpenAI, Anthropic, Mistral, or bring your own."
  },
  { 
    title: "Local debugging", 
    description: "Test agents locally before deploying to cloud."
  },
];

export function DevelopersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLSection>(null);

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
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">

      {/* Animation — absolute, bottom-right, behind all content */}
      <div
        className={`absolute bottom-0 right-0 w-[55%] h-[85%] pointer-events-none transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <SanctuaryConnection />
        {/* Fade left edge */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        {/* Fade top edge */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
      </div>

      {/* All text content sits on top */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header — Full width */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#1E5BA8] to-[#FF1E8E] mb-6 animate-pulse">
            <span className="w-8 h-px bg-gradient-to-r from-[#1E5BA8] to-[#FF1E8E]" />
            Developer SDK
          </span>
          <h2 className="text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9]">
            <span className="inline-block hover:text-[#1E5BA8] transition-colors duration-300">Code</span> your agents.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF1E8E] via-[#7B3FF2] to-[#1E5BA8] hover:scale-105 inline-block transition-transform duration-300">Or let them code.</span>
          </h2>
        </div>

        {/* Description + Features — left half only */}
        <div
          className={`max-w-[50%] transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-md">
            A powerful SDK for building, deploying, and orchestrating AI agents. 
            Define behaviors in code or natural language.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 50 + 200}ms` }}
              >
                <h3 className="font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
