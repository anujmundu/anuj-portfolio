"use client";

import React, { useEffect, useRef, useState } from "react";
import { Network, Rotate3d, Compass } from "lucide-react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  layer: number; // 0 to 4
  baseRadius: number;
  color: string;
}

export function ThreeNeuralLattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = 640);
    let height = (canvas.height = 360);

    // Camera and 3D rotation angles
    let angleX = 0.2;
    let angleY = 0.4;
    let targetAngleX = 0.2;
    let targetAngleY = 0.4;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Generate 3D Neural Network Architecture: 5 layers (Input, 3 Hidden, Output)
    const layerSizes = [4, 6, 8, 6, 3];
    const nodes: Node3D[] = [];
    const layerColors = ["#f59e0b", "#10b981", "#00e5ff", "#818cf8", "#a855f7"];

    layerSizes.forEach((size, layerIdx) => {
      const layerX = (layerIdx - 2) * 110; // spread along X axis
      for (let i = 0; i < size; i++) {
        const theta = (i / size) * Math.PI * 2;
        const radius = 60 + (i % 2) * 20;
        const layerY = Math.sin(theta) * radius;
        const layerZ = Math.cos(theta) * radius;

        nodes.push({
          x: layerX,
          y: layerY,
          z: layerZ,
          layer: layerIdx,
          baseRadius: layerIdx === 0 || layerIdx === 4 ? 3.5 : 2.5,
          color: layerColors[layerIdx]
        });
      }
    });

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        // Subtle tilt tracking
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;
        targetAngleY = (mouseX / width) * 0.8;
        targetAngleX = -(mouseY / height) * 0.6;
        return;
      }
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      targetAngleY += dx * 0.008;
      targetAngleX += dy * 0.008;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    const fov = 350; // field of view distance

    const render = () => {
      ctx.fillStyle = "#06080d";
      ctx.fillRect(0, 0, width, height);

      // Smooth camera interpolation
      angleX += (targetAngleX - angleX) * 0.08;
      angleY += (targetAngleY - angleY) * 0.08;

      if (autoRotate && !isDragging) {
        targetAngleY += 0.004;
      }

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project 3D nodes into 2D coordinates
      const projected = nodes.map((node) => {
        // Rotate around Y
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // Rotate around X
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        // Perspective projection
        const scale = fov / (fov + z2 + 150);
        const px = width / 2 + x1 * scale;
        const py = height / 2 + y2 * scale;
        const radius = Math.max(1, node.baseRadius * scale);

        return {
          ...node,
          px,
          py,
          scale,
          z2,
          radius
        };
      });

      // Sort by depth (painter's algorithm)
      projected.sort((a, b) => b.z2 - a.z2);

      // Draw Synaptic Connections between adjacent layers
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (let j = 0; j < projected.length; j++) {
          const b = projected[j];
          if (b.layer === a.layer + 1) {
            const dx = a.px - b.px;
            const dy = a.py - b.py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140) {
              const alpha = (1 - dist / 140) * 0.22 * Math.min(a.scale, b.scale);
              ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(a.px, a.py);
              ctx.lineTo(b.px, b.py);
              ctx.stroke();
            }
          }
        }
      }

      // Draw Nodes
      projected.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.px, node.py, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8 * node.scale;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [autoRotate]);

  return (
    <div className="rounded-xl border border-cyan-500/30 bg-[#06080d] p-6 font-mono space-y-4">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Network className="w-4 h-4" />
            <span>SYSTEMS IN MOTION // 3D NEURAL LATTICE SIMULATION</span>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Click and drag or tilt mouse to rotate the multi-layer spatial tensor topology in 3D coordinate space.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded border transition-colors flex items-center gap-1.5 ${
              autoRotate
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40"
                : "bg-white/[0.03] text-zinc-400 border-white/[0.06]"
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>{autoRotate ? "AUTO-ORBIT [ON]" : "AUTO-ORBIT [OFF]"}</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative rounded-lg overflow-hidden border border-white/[0.05] cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="w-full h-auto block" />
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/80 text-[10px] text-zinc-400 border border-white/[0.06] flex items-center gap-2">
          <Compass className="w-3 h-3 text-cyan-400" />
          <span>DRAG TO ROTATE 3D PERSPECTIVE</span>
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/80 text-[10px] text-emerald-400 border border-emerald-500/30">
          5 LAYERS · 27 SYNAPTIC NODES
        </div>
      </div>
    </div>
  );
}
