"use client";

import { useEffect, useRef, useState } from "react";
import { AIDataProcessor } from "@/components/ai-animations/ai-data-processor";
import { Interactive3DElement } from "@/components/ai-animations/interactive-3d-element";

const steps = [
  {
    number: "01",
    title: "Assess",
    subtitle: "Your Needs",
    description: "We analyze your enterprise challenges, goals, and existing infrastructure to design the optimal AI solution architecture.",
    element3d: "neural" as const,
    code: `// Calphark Assessment Framework
const assessment = {
  challenges: ['process', 'efficiency'],
  goals: ['transformation', 'growth'],
  timeline: 'Q2 2025',
  investment: 'flexible'
}`,
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Solution",
    description: "Our team creates a customized implementation roadmap with intelligent systems tailored to your specific business needs.",
    element3d: "cube" as const,
    code: `// Calphark Solution Design
const solution = {
  framework: 'AI-Driven',
  modules: ['intelligence', 'capability'],
  deployment: 'phased',
  support: '24/7'
}`,
  },
  {
    number: "03",
    title: "Deploy",
    subtitle: "& Scale",
    description: "We implement, monitor, and continuously optimize your AI systems to deliver measurable ROI and sustained performance growth.",
    element3d: "sphere" as const,
    code: `// Calphark Deployment
const deployment = {
  phase: 1,
  metrics: ['roi', 'efficiency'],
  monitoring: 'real-time',
  optimization: 'continuous'
}`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header — titre + image cerisier */}
        <div className="relative mb-0 lg:mb-0 grid lg:grid-cols-2 gap-4 lg:gap-12 items-end">
          {/* Titre colonne gauche */}
          <div className="overflow-hidden pb-0 lg:pb-32">
            <div className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-8">
                <span className="w-12 h-px bg-gradient-to-r from-[#1E5BA8] to-[#FF1E8E]" />
                Our Methodology
              </span>
            </div>
            
            <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.85] transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}>
              <span className="block">Assess.</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#1E5BA8] to-[#7B3FF2]">Design.</span>
              <span className="block text-white/40">Deploy.</span>
            </h2>
          </div>

          {/* Image - AI Data Processor Visualization */}
          <div className={`relative h-[320px] lg:h-[640px] overflow-hidden transition-all duration-1000 delay-200 border border-[#7B3FF2]/40 rounded-lg ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <AIDataProcessor />
            {/* Fade on left edge */}
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.09_0.01_260)]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Horizontal Steps Layout */}
        <div className="grid lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`relative text-left p-8 lg:p-12 border transition-all duration-500 ${
                activeStep === index 
                  ? "bg-[#000000] border-white/60" 
                  : "bg-[#000000] border-white/25 hover:border-white/50"
              }`}
            >
              {/* 3D Interactive Element */}
              <div className={`absolute top-4 right-4 transition-opacity duration-500 ${activeStep === index ? "opacity-80" : "opacity-30"}`}>
                <Interactive3DElement
                  type={step.element3d}
                  primaryColor={index === 0 ? "#1E5BA8" : index === 1 ? "#7B3FF2" : "#FF1E8E"}
                  secondaryColor="#7B3FF2"
                  accentColor={index === 0 ? "#FF1E8E" : index === 1 ? "#1E5BA8" : "#7B3FF2"}
                  size={60}
                />
              </div>
              
              {/* Step number with animated line */}
              <div className="flex items-center gap-4 mb-8">
                <span className={`text-4xl font-display transition-colors duration-300 ${
                  activeStep === index ? (index === 0 ? "text-[#1E5BA8]" : index === 1 ? "text-[#7B3FF2]" : "text-[#FF1E8E]") : "text-white/20"
                }`}>
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-white/10 overflow-hidden">
                  {activeStep === index && (
                    <div className={`h-full ${index === 0 ? "bg-[#1E5BA8]" : index === 1 ? "bg-[#7B3FF2]" : "bg-[#FF1E8E]"}/50 animate-progress`} />
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl lg:text-4xl font-display mb-2">
                {step.title}
              </h3>
              <span className="text-xl text-white/40 font-display block mb-6">
                {step.subtitle}
              </span>

              {/* Description */}
              <p className={`text-white/60 leading-relaxed transition-opacity duration-300 ${
                activeStep === index ? "opacity-100" : "opacity-60"
              }`}>
                {step.description}
              </p>

              {/* Active indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E5BA8] to-[#FF1E8E] transition-transform duration-500 origin-left ${
                activeStep === index ? "scale-x-100" : "scale-x-0"
              }`} />
            </button>
          ))}
        </div>

        {/* Code Preview - Large terminal */}
        
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 6s linear forwards;
        }
      `}</style>
    </section>
  );
}
