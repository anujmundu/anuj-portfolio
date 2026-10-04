"use client";

import React from "react";
import { Compass, Sparkles, Cpu, ShieldAlert, Anchor, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function FutureHorizons() {
  const horizons = [
    {
      id: "AGENTIC_MESH",
      title: "Autonomous Agentic RAG & Dynamic Tool-Routing",
      stage: "ACTIVE R&D",
      accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
      borderColor: "border-cyan-500/30",
      textColor: "text-cyan-300",
      description:
        "Developing local autonomous agents capable of self-healing tool execution, iterative syntax error correction, and multi-hop semantic graph traversal via ChromaDB and local Ollama kernels.",
      metrics: ["< 42ms Gateway Routing", "419 Automated Tests", "Zero Cloud Data Leakage"],
      relatedRepo: "https://github.com/anujmundu/anuj-ai-lab"
    },
    {
      id: "EDGE_QUANT",
      title: "Sub-Millisecond Edge Quantization & TensorRT",
      stage: "BENCHMARKED",
      accent: "from-purple-500/20 via-indigo-500/10 to-transparent",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-300",
      description:
        "Converting complex PyTorch convolutional and transformer vision backbones into 8-bit integer (INT8) tensor representations via ONNX Runtime and TensorRT, cutting inference memory by 75%.",
      metrics: ["3.01x Inference Speedup", "-75% VRAM Footprint", "< 0.4% Accuracy Delta"],
      relatedRepo: "https://github.com/anujmundu/image-classification-neural-network"
    },
    {
      id: "MARITIME_DECARB",
      title: "FuelEU Maritime 2025–2050 Decarbonization Engine",
      stage: "SPEC COMPLIANT",
      accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-300",
      description:
        "Building domain-driven clean hexagonal architectures calculating GHG emission intensity limits, dynamic compliance balances, banking/borrowing surpluses, and pooled fleet penalty optimizations.",
      metrics: ["Hexagonal Architecture", "Strict EU 2023/1805 Rules", "Deterministic Financial Models"],
      relatedRepo: "https://github.com/anujmundu/Maritime-FuelEU"
    }
  ];

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
        <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>05 // FUTURE HORIZONS & EMERGING ARCHITECTURES</span>
        </div>
        <span className="text-[11px] text-zinc-500">Autonomous Agents · Edge AI · Regulatory Tech</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {horizons.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-xl border ${item.borderColor} bg-gradient-to-b ${item.accent} to-[#060913] space-y-3 flex flex-col justify-between hover:border-white/40 transition-all duration-200 group`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-full bg-black/60 border ${item.borderColor} ${item.textColor} text-[9px] font-bold`}>
                  {item.stage}
                </span>
                <a
                  href={item.relatedRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white flex items-center gap-1 text-[10px] transition-colors"
                >
                  <span>SOURCE</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {item.title}
              </h4>

              <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">KEY VALIDATION METRICS:</span>
              <div className="flex flex-wrap gap-1">
                {item.metrics.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-black/50 border border-white/[0.08] text-[9px] text-zinc-300"
                  >
                    • {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
