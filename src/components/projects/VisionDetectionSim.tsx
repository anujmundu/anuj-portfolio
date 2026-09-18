"use client";

import React, { useEffect, useRef, useState } from "react";
import { Camera, Scan, Play, Pause, Activity } from "lucide-react";

interface TrackedObject {
  id: number;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  conf: number;
  color: string;
}

export function VisionDetectionSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fps, setFps] = useState(40.3);
  const [activeDetections, setActiveDetections] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 460);
    const height = (canvas.height = 240);

    const objects: TrackedObject[] = [
      { id: 101, label: "CONTAINER", x: 40, y: 60, w: 90, h: 100, vx: 0.8, vy: 0.2, conf: 0.94, color: "#00e5ff" },
      { id: 102, label: "COMPONENT_A", x: 180, y: 110, w: 70, h: 65, vx: -0.6, vy: 0.4, conf: 0.91, color: "#10b981" },
      { id: 103, label: "DEFECT_SCAN", x: 310, y: 50, w: 85, h: 80, vx: 0.4, vy: -0.5, conf: 0.88, color: "#f59e0b" }
    ];

    let lastTime = performance.now();
    let frameCount = 0;

    const render = (time: number) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(Number((39.5 + Math.random() * 1.5).toFixed(1)));
        lastTime = time;
        frameCount = 0;
      }

      ctx.fillStyle = "#07090e";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle camera grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw corner crop markers
      ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
      ctx.lineWidth = 1.5;
      const m = 15;
      const l = 10;
      // Top-left
      ctx.beginPath(); ctx.moveTo(m, m + l); ctx.lineTo(m, m); ctx.lineTo(m + l, m); ctx.stroke();
      // Top-right
      ctx.beginPath(); ctx.moveTo(width - m - l, m); ctx.lineTo(width - m, m); ctx.lineTo(width - m, m + l); ctx.stroke();
      // Bottom-left
      ctx.beginPath(); ctx.moveTo(m, height - m - l); ctx.lineTo(m, height - m); ctx.lineTo(m + l, height - m); ctx.stroke();
      // Bottom-right
      ctx.beginPath(); ctx.moveTo(width - m - l, height - m); ctx.lineTo(width - m, height - m); ctx.lineTo(width - m, height - m - l); ctx.stroke();

      // Update and draw detections
      objects.forEach((obj) => {
        if (isPlaying) {
          obj.x += obj.vx;
          obj.y += obj.vy;

          if (obj.x < 15 || obj.x + obj.w > width - 15) obj.vx *= -1;
          if (obj.y < 15 || obj.y + obj.h > height - 15) obj.vy *= -1;
        }

        // Bounding Box
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);

        // Semi-transparent fill
        ctx.fillStyle = `${obj.color}15`;
        ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

        // Tag banner
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y - 14, obj.w, 14);

        // Label text
        ctx.fillStyle = "#000000";
        ctx.font = "bold 9px monospace";
        ctx.fillText(
          `${obj.label} ${(obj.conf * 100).toFixed(0)}%`,
          obj.x + 3,
          obj.y - 3
        );

        // Center crosshair
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x + obj.w / 2 - 2, obj.y + obj.h / 2 - 2, 4, 4);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <div className="rounded-lg border border-cyan-500/30 bg-[#06080d] p-3 font-mono text-[11px] space-y-2">
      {/* Simulation Header HUD */}
      <div className="flex items-center justify-between text-zinc-400 border-b border-white/[0.06] pb-2">
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
          <Scan className="w-3.5 h-3.5" />
          <span>LIVE RTSP INFERENCE [640×640 INT8]</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {fps} FPS
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:text-white transition-colors"
            title={isPlaying ? "Pause Stream" : "Play Stream"}
          >
            {isPlaying ? <Pause className="w-3 h-3 text-zinc-400" /> : <Play className="w-3 h-3 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative rounded overflow-hidden border border-white/[0.05]">
        <canvas ref={canvasRef} className="w-full h-auto block" />
        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-zinc-400 border border-white/[0.05]">
          P95 LATENCY: 24.8ms
        </div>
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-cyan-300 border border-cyan-400/20">
          NMS IoU: 0.45
        </div>
      </div>
    </div>
  );
}
