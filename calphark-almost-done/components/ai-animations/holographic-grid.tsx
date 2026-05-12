'use client';

import React from 'react';

export function HolographicGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top layer - main grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gridGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E5BA8" />
            <stop offset="50%" stopColor="#7B3FF2" />
            <stop offset="100%" stopColor="#FF1E8E" />
          </linearGradient>
        </defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#gridGradient1)" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Middle layer - subtle depth grid */}
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gridGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1E8E" />
            <stop offset="100%" stopColor="#1E5BA8" />
          </linearGradient>
        </defs>
        <pattern id="grid2" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="url(#gridGradient2)" strokeWidth="0.25" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid2)" />
      </svg>

      {/* Accent radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  );
}
