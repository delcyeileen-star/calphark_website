"use client";

import { useEffect, useRef } from "react";

type ElementType = "cube" | "sphere" | "pyramid" | "torus" | "dna" | "neural";

interface Interactive3DElementProps {
  type?: ElementType;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  size?: number;
  className?: string;
}

export function Interactive3DElement({
  type = "sphere",
  primaryColor = "#1E5BA8",
  secondaryColor = "#7B3FF2",
  accentColor = "#FF1E8E",
  size = 100,
  className = "",
}: Interactive3DElementProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const cx = size / 2;
    const cy = size / 2;
    const baseRadius = size * 0.35;

    const renderSphere = () => {
      const mx = (mouseRef.current.x - 0.5) * 20;
      const my = (mouseRef.current.y - 0.5) * 20;

      // Core glow
      const coreGradient = ctx.createRadialGradient(cx + mx, cy + my, 0, cx + mx, cy + my, baseRadius);
      coreGradient.addColorStop(0, accentColor);
      coreGradient.addColorStop(0.4, secondaryColor);
      coreGradient.addColorStop(0.8, primaryColor);
      coreGradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(cx + mx, cy + my, baseRadius + Math.sin(time * 2) * 5, 0, Math.PI * 2);
      ctx.fill();

      // Orbiting rings
      ctx.save();
      ctx.translate(cx + mx, cy + my);
      ctx.rotate(time);
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius * 1.2, baseRadius * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(cx + mx, cy + my);
      ctx.rotate(-time * 0.7);
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius * 1.1, baseRadius * 0.5, Math.PI / 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const renderCube = () => {
      const mx = (mouseRef.current.x - 0.5) * 15;
      const my = (mouseRef.current.y - 0.5) * 15;
      const s = baseRadius * 0.8;
      
      // Simple 3D cube wireframe
      const rotX = time + my * 0.1;
      const rotY = time * 0.7 + mx * 0.1;
      
      const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ];
      
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];
      
      const project = (v: number[]) => {
        let [x, y, z] = v;
        // Rotate Y
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        // Rotate X
        const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        
        const scale = 1 / (3 - z2);
        return [cx + x1 * s * scale + mx, cy + y1 * s * scale + my, z2];
      };
      
      const projected = vertices.map(project);
      
      edges.forEach(([i, j], idx) => {
        const colors = [primaryColor, secondaryColor, accentColor];
        ctx.strokeStyle = colors[idx % 3];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(projected[i][0], projected[i][1]);
        ctx.lineTo(projected[j][0], projected[j][1]);
        ctx.stroke();
      });

      // Vertices glow
      projected.forEach((p, idx) => {
        const colors = [primaryColor, secondaryColor, accentColor];
        ctx.fillStyle = colors[idx % 3];
        ctx.beginPath();
        ctx.arc(p[0], p[1], 3, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const renderPyramid = () => {
      const mx = (mouseRef.current.x - 0.5) * 15;
      const my = (mouseRef.current.y - 0.5) * 15;
      const s = baseRadius * 0.9;
      
      const rotY = time + mx * 0.1;
      
      const vertices = [
        [0, -1, 0], // top
        [-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1] // base
      ];
      
      const edges = [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 2], [2, 3], [3, 4], [4, 1]
      ];
      
      const project = (v: number[]) => {
        let [x, y, z] = v;
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const scale = 1 / (3 - z1);
        return [cx + x1 * s * scale + mx, cy + y * s * scale * 0.8 + my];
      };
      
      const projected = vertices.map(project);
      
      // Fill faces with gradient
      ctx.fillStyle = `${primaryColor}30`;
      ctx.beginPath();
      ctx.moveTo(projected[0][0], projected[0][1]);
      ctx.lineTo(projected[1][0], projected[1][1]);
      ctx.lineTo(projected[2][0], projected[2][1]);
      ctx.closePath();
      ctx.fill();
      
      edges.forEach(([i, j], idx) => {
        const colors = [accentColor, secondaryColor, primaryColor];
        ctx.strokeStyle = colors[idx % 3];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(projected[i][0], projected[i][1]);
        ctx.lineTo(projected[j][0], projected[j][1]);
        ctx.stroke();
      });
    };

    const renderDNA = () => {
      const mx = (mouseRef.current.x - 0.5) * 10;
      const my = (mouseRef.current.y - 0.5) * 10;
      
      const points = 20;
      for (let i = 0; i < points; i++) {
        const t = i / points;
        const y = cy - baseRadius + t * baseRadius * 2 + my;
        const phase = t * Math.PI * 4 + time * 2;
        
        const x1 = cx + Math.cos(phase) * 20 + mx;
        const x2 = cx + Math.cos(phase + Math.PI) * 20 + mx;
        
        // Helix strands
        ctx.fillStyle = i % 2 === 0 ? primaryColor : secondaryColor;
        ctx.beginPath();
        ctx.arc(x1, y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = i % 2 === 0 ? secondaryColor : accentColor;
        ctx.beginPath();
        ctx.arc(x2, y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Connecting bars
        if (i % 3 === 0) {
          ctx.strokeStyle = `${accentColor}60`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }
      }
    };

    const renderNeural = () => {
      const mx = (mouseRef.current.x - 0.5) * 15;
      const my = (mouseRef.current.y - 0.5) * 15;
      
      const nodes: [number, number][] = [];
      const nodeCount = 8;
      
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2 + time * 0.3;
        const radius = baseRadius * (0.5 + Math.sin(time + i) * 0.3);
        nodes.push([
          cx + Math.cos(angle) * radius + mx,
          cy + Math.sin(angle) * radius + my
        ]);
      }
      
      // Central node
      nodes.push([cx + mx, cy + my]);
      
      // Draw connections
      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (i < j) {
            const dist = Math.hypot(node[0] - other[0], node[1] - other[1]);
            if (dist < baseRadius * 1.5) {
              const alpha = 1 - dist / (baseRadius * 1.5);
              ctx.strokeStyle = `${secondaryColor}${Math.floor(alpha * 80).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(node[0], node[1]);
              ctx.lineTo(other[0], other[1]);
              ctx.stroke();
            }
          }
        });
      });
      
      // Draw nodes
      nodes.forEach((node, i) => {
        const colors = [primaryColor, secondaryColor, accentColor];
        const glow = ctx.createRadialGradient(node[0], node[1], 0, node[0], node[1], 10);
        glow.addColorStop(0, colors[i % 3]);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node[0], node[1], 10, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = colors[i % 3];
        ctx.beginPath();
        ctx.arc(node[0], node[1], 4, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const renderTorus = () => {
      const mx = (mouseRef.current.x - 0.5) * 15;
      const my = (mouseRef.current.y - 0.5) * 15;
      
      const R = baseRadius * 0.7;
      const r = baseRadius * 0.25;
      
      for (let u = 0; u < 32; u++) {
        for (let v = 0; v < 16; v++) {
          const uAngle = (u / 32) * Math.PI * 2 + time;
          const vAngle = (v / 16) * Math.PI * 2;
          
          const x = (R + r * Math.cos(vAngle)) * Math.cos(uAngle);
          const y = r * Math.sin(vAngle);
          const z = (R + r * Math.cos(vAngle)) * Math.sin(uAngle);
          
          // Simple rotation
          const rotY = time * 0.5;
          const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
          const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
          
          const scale = 1 / (4 - z1 * 0.5);
          const px = cx + x1 * scale * 50 + mx;
          const py = cy + y * scale * 50 + my;
          
          const alpha = 0.3 + (z1 + 1) * 0.35;
          const colors = [primaryColor, secondaryColor, accentColor];
          ctx.fillStyle = colors[(u + v) % 3];
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      switch (type) {
        case "sphere": renderSphere(); break;
        case "cube": renderCube(); break;
        case "pyramid": renderPyramid(); break;
        case "dna": renderDNA(); break;
        case "neural": renderNeural(); break;
        case "torus": renderTorus(); break;
      }

      time += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [type, primaryColor, secondaryColor, accentColor, size]);

  return (
    <canvas
      ref={canvasRef}
      className={`cursor-pointer ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
