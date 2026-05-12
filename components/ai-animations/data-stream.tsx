'use client';

import React, { useEffect, useState } from 'react';

export function DataStream() {
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; left: number; duration: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full data-particle"
          style={{
            left: `${particle.left}%`,
            bottom: '-10px',
            background: `linear-gradient(to top, #FF1E8E, #7B3FF2, #1E5BA8)`,
            '--duration': `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
