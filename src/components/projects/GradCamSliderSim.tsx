"use client";

import React, { useState } from "react";
import { Eye, Layers, AlertCircle } from "lucide-react";

export function GradCamSliderSim() {
  const [blend, setBlend] = useState(65); // 0 to 100% heatmap opacity

  return (
    <div className="rounded-lg border border-purple-500/30 bg-[#06080d] p-3 font-mono text-[11px] space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-zinc-400">
        <div className="flex items-center gap-1.5 text-purple-400 font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>GRAD-CAM LOCALIZATION HEATMAP</span>
        </div>
        <div className="text-zinc-500 text-[10px]">
          FOCAL LOSS // RESNET-50
        </div>
      </div>

      {/* Surface Graphic Simulation */}
      <div className="relative h-44 rounded overflow-hidden border border-white/[0.05] bg-[#0c0f17]">
        {/* Synthetic Raw Metal Surface Texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black opacity-90">
          {/* Simulated Fracture Lines */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="30" y1="120" x2="420" y2="120" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="6 6" />
            <path
              d="M 170 80 Q 195 95 210 88 T 245 105 T 270 95"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="drop-shadow(0 0 2px rgba(0,0,0,0.8))"
            />
            <path
              d="M 210 88 L 225 72"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Grad-CAM Attention Heatmap Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-150"
          style={{ opacity: blend / 100 }}
        >
          <div className="absolute top-10 left-36 w-36 h-28 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-cyan-400 blur-xl opacity-80 mix-blend-screen" />
          <div className="absolute top-14 left-44 w-20 h-16 rounded-full bg-red-500 blur-md opacity-90 mix-blend-color-dodge" />
        </div>

        {/* HUD Overlay Tags */}
        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/75 text-[9px] text-zinc-300 border border-white/[0.06] flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-red-400" />
          <span>MICRO-CRACK: (x: 218, y: 92)</span>
        </div>

        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[9px] text-purple-300 border border-purple-400/20 font-bold">
          CONFIDENCE: 98.2%
        </div>
      </div>

      {/* Heatmap Opacity Blend Slider */}
      <div className="flex items-center justify-between gap-3 pt-1 text-[10px]">
        <span className="text-zinc-500 flex items-center gap-1 shrink-0">
          <Eye className="w-3 h-3 text-cyan-400" />
          <span>HEATMAP BLEND: {blend}%</span>
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={blend}
          onChange={(e) => setBlend(Number(e.target.value))}
          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
        />
      </div>
    </div>
  );
}
