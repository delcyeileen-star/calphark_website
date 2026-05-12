"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  effect?: "gradient" | "glow" | "typewriter" | "shimmer" | "wave" | "glitch";
  delay?: number;
  duration?: number;
}

export function AnimatedText({
  text,
  className = "",
  effect = "gradient",
  delay = 0,
  duration = 1000,
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (effect === "gradient") {
    return (
      <span
        ref={ref}
        className={`bg-clip-text text-transparent bg-gradient-to-r from-[#1E5BA8] via-[#7B3FF2] to-[#FF1E8E] bg-[length:200%_auto] animate-gradient-flow ${className}`}
        style={{
          animation: isVisible ? `gradient-flow 3s ease infinite` : "none",
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${duration}ms ease`,
        }}
      >
        {text}
      </span>
    );
  }

  if (effect === "glow") {
    return (
      <span
        ref={ref}
        className={`relative ${className}`}
        style={{
          textShadow: isVisible
            ? "0 0 20px rgba(255, 30, 142, 0.5), 0 0 40px rgba(123, 63, 242, 0.3), 0 0 60px rgba(30, 91, 168, 0.2)"
            : "none",
          opacity: isVisible ? 1 : 0,
          transition: `all ${duration}ms ease`,
        }}
      >
        {text}
      </span>
    );
  }

  if (effect === "typewriter") {
    const [displayText, setDisplayText] = useState("");
    
    useEffect(() => {
      if (!isVisible) return;
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, duration / text.length);
      return () => clearInterval(interval);
    }, [isVisible, text, duration]);

    return (
      <span ref={ref} className={className}>
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    );
  }

  if (effect === "shimmer") {
    return (
      <span
        ref={ref}
        className={`relative inline-block ${className}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${duration}ms ease`,
        }}
      >
        {text}
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{
            animation: isVisible ? "shimmer 2s infinite" : "none",
            backgroundSize: "200% 100%",
          }}
        />
      </span>
    );
  }

  if (effect === "wave") {
    return (
      <span ref={ref} className={className}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              animation: isVisible ? `wave 1s ease-in-out infinite` : "none",
              animationDelay: `${i * 0.05}s`,
              opacity: isVisible ? 1 : 0,
              transition: `opacity ${duration}ms ease`,
              transitionDelay: `${i * 50}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  }

  if (effect === "glitch") {
    const [glitchText, setGlitchText] = useState(text);
    
    useEffect(() => {
      if (!isVisible) return;
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      const interval = setInterval(() => {
        const shouldGlitch = Math.random() > 0.9;
        if (shouldGlitch) {
          const glitched = text
            .split("")
            .map((char, i) =>
              Math.random() > 0.85 ? chars[Math.floor(Math.random() * chars.length)] : char
            )
            .join("");
          setGlitchText(glitched);
          setTimeout(() => setGlitchText(text), 50);
        }
      }, 100);
      return () => clearInterval(interval);
    }, [isVisible, text]);

    return (
      <span
        ref={ref}
        className={`relative ${className}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${duration}ms ease`,
        }}
      >
        <span className="relative z-10">{glitchText}</span>
        <span
          className="absolute inset-0 text-[#FF1E8E] z-0"
          style={{
            clipPath: "inset(20% 0 40% 0)",
            transform: "translateX(-2px)",
            opacity: 0.7,
          }}
        >
          {glitchText}
        </span>
        <span
          className="absolute inset-0 text-[#1E5BA8] z-0"
          style={{
            clipPath: "inset(60% 0 10% 0)",
            transform: "translateX(2px)",
            opacity: 0.7,
          }}
        >
          {glitchText}
        </span>
      </span>
    );
  }

  return <span className={className}>{text}</span>;
}

// Gradient heading component for consistent brand styling
export function GradientHeading({
  children,
  className = "",
  animate = true,
}: {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}) {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-[#1E5BA8] via-[#7B3FF2] to-[#FF1E8E] ${
        animate ? "bg-[length:200%_auto] animate-gradient-x" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}

// Glowing text component
export function GlowText({
  children,
  className = "",
  color = "pink",
}: {
  children: React.ReactNode;
  className?: string;
  color?: "blue" | "purple" | "pink";
}) {
  const colors = {
    blue: { text: "#1E5BA8", glow: "rgba(30, 91, 168, 0.5)" },
    purple: { text: "#7B3FF2", glow: "rgba(123, 63, 242, 0.5)" },
    pink: { text: "#FF1E8E", glow: "rgba(255, 30, 142, 0.5)" },
  };

  return (
    <span
      className={className}
      style={{
        color: colors[color].text,
        textShadow: `0 0 20px ${colors[color].glow}, 0 0 40px ${colors[color].glow}`,
      }}
    >
      {children}
    </span>
  );
}
