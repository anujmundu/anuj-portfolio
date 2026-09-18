"use client";

import React, { useState } from "react";
import { BentoGrid } from "@/components/aceternity/BentoGrid";
import { BentoCard } from "@/components/aceternity/BentoCard";
import { ParticleBackground } from "@/components/aceternity/ParticleBackground";
import { Cpu, Database, Network, ShieldCheck, Zap, Terminal, Activity, Layers } from "lucide-react";

export function SystemBentoSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const items = [
    {
      title: "Agentic Multi-Modal Pipelines",
      description: "Distributed task routing, LangGraph orchestrations, and context-aware RAG pipelines built to synthesize high-dimensional telemetry.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-gradient-to-br from-cyan-950/40 via-cyan-900/10 to-transparent border border-cyan-500/20 p-4 font-mono text-[11px] text-zinc-400 flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              ROUTING ENGINE
            </span>
            <span className="text-zinc-600">v3.4-active</span>
          </div>
          <div className="space-y-1">
            <div className="text-white font-semibold flex items-center justify-between">
              <span>RAG Context Latency</span>
              <span className="text-cyan-400">18.4ms</span>
            </div>
            <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 w-[85%]" />
            </div>
          </div>
        </div>
      ),
      className: "md:col-span-2",
      icon: <Network className="h-4 w-4 text-cyan-400" />,
      badge: "DISTRIBUTED RAG",
        metrics: { latency: "18.4ms", throughput: "120 req/s", errorRate: "0.2%" },
      glowColor: "cyan" as const,
    },
    {
      title: "Edge Computer Vision",
      description: "INT8 TensorRT & ONNX Quantization running at sustained 40+ FPS on edge CPUs without dedicated GPU dependencies.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-gradient-to-br from-emerald-950/40 via-emerald-900/10 to-transparent border border-emerald-500/20 p-4 font-mono text-[11px] flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-400 font-bold">
            <span>INT8 QUANTIZED</span>
            <span>40.3 FPS</span>
          </div>
          <div className="text-xs text-zinc-400">
            YOLOv5-CASP + CBAM Attention Backbone
          </div>
        </div>
      ),
      className: "md:col-span-1",
      icon: <Cpu className="h-4 w-4 text-emerald-400" />,
      badge: "CV INFERENCE",
        metrics: { latency: "16.2ms", throughput: "150 req/s", errorRate: "0.1%" },
      glowColor: "emerald" as const,
    },
    {
      title: "Statistical Rigor & Attribution",
      description: "SHAP waterfall value attribution vectors, Kolmogorov-Smirnov distribution drift testing, and zero target lookahead leakage.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-gradient-to-br from-purple-950/40 via-purple-900/10 to-transparent border border-purple-500/20 p-4 font-mono text-[11px] flex-col justify-between">
          <div className="text-purple-400 font-bold flex items-center justify-between">
            <span>TREESHAP ATTRIBUTION</span>
            <span className="text-zinc-400">ROC-AUC 91.4%</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-1.5 rounded bg-white/[0.03] text-[9px] text-zinc-300">OverTime: +0.28</div>
            <div className="p-1.5 rounded bg-white/[0.03] text-[9px] text-zinc-300">StockOpt: -0.19</div>
            <div className="p-1.5 rounded bg-white/[0.03] text-[9px] text-zinc-300">Distance: +0.14</div>
          </div>
        </div>
      ),
      className: "md:col-span-1",
      icon: <Activity className="h-4 w-4 text-purple-400" />,
      badge: "EXPLAINABILITY",
        metrics: { latency: "22.0ms", throughput: "100 req/s", errorRate: "0.3%" },
      glowColor: "purple" as const,
    },
    {
      title: "Resilient Microservices Architecture",
      description: "FastAPI endpoints containerized with non-root Docker images, protected by Celery-Redis buffering queues and PostgreSQL state persistence.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-gradient-to-br from-amber-950/40 via-amber-900/10 to-transparent border border-amber-500/20 p-4 font-mono text-[11px] flex-col justify-between">
          <div className="flex items-center justify-between text-amber-400 font-bold">
            <span>DOCKER + K8S HELM</span>
            <span>99.99% HEALTH</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Celery Workers Active:</span>
            <span className="text-white font-bold">12 Nodes</span>
          </div>
        </div>
      ),
      className: "md:col-span-2",
      icon: <Terminal className="h-4 w-4 text-amber-400" />,
      badge: "MICROSERVICES",
        metrics: { latency: "19.5ms", throughput: "130 req/s", errorRate: "0.15%" },
      glowColor: "amber" as const,
    },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#020408] overflow-visible">
        <div className="absolute inset-0 -z-10"><ParticleBackground /></div>
       <div className="max-w-7xl mx-auto space-y-12 pl-12 pr-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00e5ff]" />
              <span>// 04. ARCHITECTURAL BENTO MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white glow-cyan">
              SYSTEM CAPABILITY BENTO
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-mono leading-relaxed">
            A modular view of production competencies across high-throughput data pipelines, machine vision inference, and fault-tolerant backend services.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid>
          {items.map((item, i) => (
            <BentoCard
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
              badge={item.badge}
              glowColor={item.glowColor}
              metrics={item.metrics}
              isExpanded={expandedIndex === i}
              onExpand={() => handleExpand(i)}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
