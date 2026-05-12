"use client";

import { useEffect, useRef, useState } from "react";
import { Linkedin, Youtube, Instagram, MessageCircle } from "lucide-react";

export function SocialMediaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const socialPlatforms = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      followers: "5K+",
      description: "Enterprise insights",
      url: "https://linkedin.com/company/calphark",
      color: "#0A66C2",
      colorLight: "#0A66C220",
    },
    {
      name: "YouTube",
      icon: Youtube,
      followers: "2.3K",
      description: "AI tutorials & demos",
      url: "https://youtube.com/@calphark",
      color: "#FF0000",
      colorLight: "#FF000020",
    },
    {
      name: "Instagram",
      icon: Instagram,
      followers: "3.8K",
      description: "Behind the scenes",
      url: "https://instagram.com/calphark",
      color: "#E4405F",
      colorLight: "#E4405F20",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      followers: "Contact",
      description: "Business support",
      url: "https://wa.me/1234567890",
      color: "#25D366",
      colorLight: "#25D36620",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-br from-black via-[#0a0a1f] to-black border-t border-[#1E5BA8]/20"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#1E5BA8] to-[#FF1E8E] mb-6 animate-pulse">
            <span className="w-12 h-px bg-gradient-to-r from-[#1E5BA8] to-[#FF1E8E]" />
            Follow Our Community
            <span className="w-12 h-px bg-gradient-to-r from-[#FF1E8E] to-[#1E5BA8]" />
          </span>

          <h2
            className={`text-5xl md:text-6xl lg:text-7xl font-display tracking-tight mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Connect with
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1E5BA8] via-[#7B3FF2] to-[#FF1E8E]">
              Calphark
            </span>
          </h2>

          <p className={`text-lg text-foreground/60 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            Stay updated with the latest in enterprise AI innovation. Join our community across all platforms.
          </p>
        </div>

        {/* Social Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {socialPlatforms.map((platform, idx) => {
            const IconComponent = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group overflow-hidden rounded-lg border-2 transition-all duration-700 hover:shadow-2xl ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  borderColor: platform.color,
                  transitionDelay: isVisible ? `${idx * 100}ms` : "0ms",
                  boxShadow: `0 0 20px ${platform.color}30`,
                }}
              >
                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${platform.colorLight} 0%, transparent 100%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col items-center text-center h-full justify-between">
                  {/* Icon */}
                  <div
                    className="mb-6 p-4 rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: platform.colorLight }}
                  >
                    <IconComponent
                      className="w-8 h-8 transition-colors duration-300"
                      style={{ color: platform.color }}
                    />
                  </div>

                  {/* Platform Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-display mb-2 text-white">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-4">
                      {platform.description}
                    </p>
                  </div>

                  {/* Followers */}
                  <div className="mt-6 pt-6 border-t border-foreground/10 w-full">
                    <p
                      className="text-2xl font-display transition-colors duration-300"
                      style={{ color: platform.color }}
                    >
                      {platform.followers}
                    </p>
                    <p className="text-xs text-foreground/50 mt-1">Followers</p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${platform.color}20, transparent 70%)`,
                  }}
                />
              </a>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-foreground/60 mb-8">
            Not on social media? Contact us directly at
            <br />
            <a
              href="mailto:corporate_relations@calphark.com"
              className="text-[#FF1E8E] hover:text-[#FF1E8E]/80 transition-colors duration-300 font-semibold"
            >
              corporate_relations@calphark.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
