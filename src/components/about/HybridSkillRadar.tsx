"use client";

import React, { useState } from "react";
import { Cpu, Server, Layout, LineChart, CheckCircle2, ArrowRight } from "lucide-react";
import { playClick, playChirp } from "@/lib/audio";

interface Quadrant {
  id: string;
  title: string;
  short: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  icon: React.ElementType;
  skills: string[];
  hybridOverlap: {
    title: string;
    description: string;
    exampleProject: string;
  };
}

export function HybridSkillRadar() {
  const [activeQuadId, setActiveQuadId] = useState<string>("ML");

  const quadrants: Quadrant[] = [
    {
      id: "ML",
      title: "01 // APPLIED DEEP LEARNING & DSP",
      short: "MACHINE LEARNING",
      color: "text-cyan-400",
      borderColor: "border-cyan-500/40",
      bgGradient: "from-cyan-950/30 via-[#060a16] to-[#040711]",
      icon: Cpu,
      skills: ["PyTorch 2.5", "YOLOv5-CASP", "CBAM & ASPP Attention", "ONNX Quantization", "STFT Spectrograms"],
      hybridOverlap: {
        title: "Synthesis with Ergonomic UI/UX",
        description: "Bridges deep tensor inference with dark-mode clinical radiologist HUDs, sub-40ms bounding box rendering, and Grad-CAM explainability overlays.",
        exampleProject: "PulmoScan CADx Suite"
      }
    },
    {
      id: "SYSTEMS",
      title: "02 // DISTRIBUTED SYSTEMS & BACKEND",
      short: "CLOUD BACKEND",
      color: "text-emerald-400",
      borderColor: "border-emerald-500/40",
      bgGradient: "from-emerald-950/30 via-[#060a16] to-[#040711]",
      icon: Server,
      skills: ["FastAPI AsyncIO", "Docker Containers", "RabbitMQ Task Queues", "Hexagonal Architecture", "PostgreSQL"],
      hybridOverlap: {
        title: "Synthesis with ML Pipelines",
        description: "Decouples heavy GPU/CPU model inference from the HTTP request loop using distributed task queues with zero main-thread blocking.",
        exampleProject: "OmniForge Multimodal AI"
      }
    },
    {
      id: "UIUX",
      title: "03 // ERGONOMIC HUMAN-IN-THE-LOOP UX",
      short: "TACTILE FRONTEND",
      color: "text-purple-400",
      borderColor: "border-purple-500/40",
      bgGradient: "from-purple-950/30 via-[#060a16] to-[#040711]",
      icon: Layout,
      skills: ["Next.js 15 (App Router)", "TypeScript 5", "Tailwind CSS", "HTML5 Canvas Shaders", "Web Audio API"],
      hybridOverlap: {
        title: "Synthesis with Mission-Critical SecOps",
        description: "Designs tactile, high-density cyber terminals that combat analyst alert fatigue during multi-file financial or security triage.",
        exampleProject: "AutoRecon Enterprise"
      }
    },
    {
      id: "QUANT",
      title: "04 // QUANTITATIVE BI & DATA SCIENCE",
      short: "DATA ANALYTICS",
      color: "text-amber-400",
      borderColor: "border-amber-500/40",
      bgGradient: "from-amber-950/30 via-[#060a16] to-[#040711]",
      icon: LineChart,
      skills: ["DuckDB Columnar OLAP", "SciPy SLSQP", "TreeSHAP Attribution", "Levenshtein Fuzzy Match", "Plotly"],
      hybridOverlap: {
        title: "Synthesis with In-Memory Storage",
        description: "Replaces slow cloud warehouses with embedded vectorized columnar engines aggregating 541k+ rows in <1.2 seconds.",
        exampleProject: "PulseMetrics Copilot"
      }
    }
  ];

  const activeQuad = quadrants.find((q) => q.id === activeQuadId) || quadrants[0];

  const handleSelect = (id: string) => {
    playClick();
    setActiveQuadId(id);
    playChirp();
  };

  return (
    <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#050713] space-y-6 font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
        <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>CROSS-DISCIPLINE ENGINEERING NEXUS // HYBRID SKILL SYNTHESIS</span>
        </div>
        <span className="text-[11px] text-zinc-500">Full-Vertical Engineering Architecture</span>
      </div>

      {/* 4-Quadrant Selector Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quadrants.map((q) => {
          const Icon = q.icon;
          const isSelected = q.id === activeQuadId;
          return (
            <button
              key={q.id}
              onClick={() => handleSelect(q.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? `bg-gradient-to-b ${q.bgGradient} ${q.borderColor} shadow-[0_0_20px_rgba(0,0,0,0.8)] scale-[1.02]`
                  : "bg-black/40 border-white/[0.06] hover:bg-white/[0.03] text-zinc-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isSelected ? q.color : "text-zinc-500"}`} />
                {isSelected && (
                  <span className={`px-1.5 py-0.2 rounded text-[8px] font-bold border ${q.borderColor} ${q.color}`}>
                    ACTIVE
                  </span>
                )}
              </div>
              <div>
                <span className={`font-black text-xs block ${isSelected ? "text-white" : "text-zinc-300"}`}>
                  {q.short}
                </span>
                <span className="text-[9px] text-zinc-500 block mt-0.5 font-sans">
                  {q.skills.slice(0, 2).join(" · ")}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Quadrant Deep Dive Card */}
      <div className={`p-5 rounded-xl border ${activeQuad.borderColor} bg-gradient-to-br ${activeQuad.bgGradient} space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
          <h4 className={`text-sm font-extrabold ${activeQuad.color} tracking-wide`}>
            {activeQuad.title}
          </h4>
          <span className="text-[10px] text-zinc-400">
            FLAGSHIP EVIDENCE: <strong className="text-white">{activeQuad.hybridOverlap.exampleProject}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-bold">
              VERIFIED TECHNICAL SKILLS:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeQuad.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-black/60 border border-white/[0.08] text-zinc-200 text-[10px]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 p-3 rounded-lg bg-black/50 border border-white/[0.06]">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-bold">
              CROSS-DISCIPLINE MULTIPLIER:
            </span>
            <div className="text-xs font-bold text-white">
              {activeQuad.hybridOverlap.title}
            </div>
            <p className="text-xs font-sans text-zinc-300 leading-relaxed">
              {activeQuad.hybridOverlap.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
