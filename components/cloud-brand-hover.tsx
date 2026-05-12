'use client';

import { useEffect, useRef, useState } from 'react';

export function CloudBrandHover() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 hover:opacity-30 transition-opacity duration-500"
    >
      {/* Cloud 1 - Blue */}
      <svg
        className="absolute w-96 h-48"
        style={{
          left: `${mousePos.x * 0.3}%`,
          top: `${mousePos.y * 0.2}%`,
          filter: 'drop-shadow(0 0 20px rgba(30, 91, 168, 0.3))',
          transition: 'left 0.5s ease-out, top 0.5s ease-out',
        }}
        viewBox="0 0 200 100"
      >
        <defs>
          <linearGradient id="cloudGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E5BA8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7B3FF2" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M 30 60 Q 20 40 40 30 Q 50 20 60 30 Q 70 15 80 25 Q 90 30 100 25 Q 110 20 120 35 Q 130 40 140 30 Q 150 35 160 50 Q 170 60 160 70 Q 150 80 130 75 Q 120 85 100 85 Q 80 85 70 80 Q 60 85 40 80 Q 25 75 30 60 Z"
          fill="url(#cloudGradient1)"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Cloud 2 - Purple */}
      <svg
        className="absolute w-80 h-40"
        style={{
          right: `${mousePos.x * 0.25}%`,
          bottom: `${mousePos.y * 0.3}%`,
          filter: 'drop-shadow(0 0 20px rgba(123, 63, 242, 0.3))',
          transition: 'right 0.5s ease-out, bottom 0.5s ease-out',
        }}
        viewBox="0 0 200 100"
      >
        <defs>
          <linearGradient id="cloudGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B3FF2" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF1E8E" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M 25 65 Q 15 45 35 35 Q 45 25 55 35 Q 65 18 75 28 Q 85 35 95 28 Q 105 22 115 40 Q 125 45 135 35 Q 145 40 155 55 Q 165 65 155 75 Q 145 85 125 80 Q 115 88 95 88 Q 75 88 65 82 Q 55 88 35 82 Q 22 77 25 65 Z"
          fill="url(#cloudGradient2)"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Cloud 3 - Pink */}
      <svg
        className="absolute w-72 h-36"
        style={{
          left: `${mousePos.x * 0.35}%`,
          bottom: `${mousePos.y * 0.25}%`,
          filter: 'drop-shadow(0 0 20px rgba(255, 30, 142, 0.3))',
          transition: 'left 0.5s ease-out, bottom 0.5s ease-out',
        }}
        viewBox="0 0 200 100"
      >
        <defs>
          <linearGradient id="cloudGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1E8E" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1E5BA8" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M 28 62 Q 18 42 38 32 Q 48 22 58 32 Q 68 16 78 26 Q 88 33 98 26 Q 108 20 118 38 Q 128 43 138 33 Q 148 38 158 52 Q 168 62 158 72 Q 148 82 128 77 Q 118 86 98 86 Q 78 86 68 80 Q 58 86 38 80 Q 25 75 28 62 Z"
          fill="url(#cloudGradient3)"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
