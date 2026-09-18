"use client";

import React, { useState } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/Card3D";
import { ArrowUpRight, Cpu, Database, Server, LineChart, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { playClick, playChirp } from "@/lib/audio";

const SPECIALIZATIONS = [
  {
    id: 1,
    domain: "DOMAIN 01",
    title: "AI / ML & Vision",
    icon: Cpu,
    accent: "cyan",
    borderClass: "border-cyan-500/30 hover:border-cyan-400",
    bgClass: "from-cyan-950/40 via-[#0a121e]/80 to-[#04070d]/90",
    badge: "14.2ms P95",
    metric: "94.8% mAP@50",
    competencies: [
      "PyTorch 2.5 & CUDA 12.6",
      "YOLOv8 Object Detection",
      "CBAM Spatial Attention",
      "TensorRT FP16 Quantization",
      "Grad-CAM Heatmap Audits"
    ]
  },
  {
    id: 2,
    domain: "DOMAIN 02",
    title: "Distributed MLOps",
    icon: Server,
    accent: "emerald",
    borderClass: "border-emerald-500/30 hover:border-emerald-400",
    bgClass: "from-emerald-950/40 via-[#081510]/80 to-[#030a06]/90",
    badge: "14.2K msg/s",
    metric: "99.99% SLA",
    competencies: [
      "Triton Inference Serving",
      "Celery Worker Mesh",
      "Docker Cgroups Isolation",
      "Kubernetes Helm Charts",
      "Prometheus Drift Alerts"
    ]
  },
  {
    id: 3,
    domain: "DOMAIN 03",
    title: "Empirical Data Science",
    icon: LineChart,
    accent: "amber",
    borderClass: "border-amber-500/30 hover:border-amber-400",
    bgClass: "from-amber-950/40 via-[#181106]/80 to-[#0a0703]/90",
    badge: "0.914 ROC-AUC",
    metric: "14.7x TreeSHAP",
    competencies: [
      "TreeSHAP Attribution Kernels",
      "XGBoost & LightGBM",
      "Stratified K-Fold Cross-Val",
      "Kolmogorov-Smirnov Testing",
      "Pydantic Invariant Schemas"
    ]
  },
  {
    id: 4,
    domain: "DOMAIN 04",
    title: "Data Engineering",
    icon: Database,
    accent: "purple",
    borderClass: "border-purple-500/30 hover:border-purple-400",
    bgClass: "from-purple-950/40 via-[#130b1e]/80 to-[#07040d]/90",
    badge: "1.4M Transactions",
    metric: "12.8ms Window SQL",
    competencies: [
      "PostgreSQL Star Schemas",
      "Polars Vectorized SIMD",
      "Kafka Distributed Logs",
      "Apache Parquet Compression",
      "FastAPI Async Connection Pools"
    ]
  },
  {
    id: 5,
    domain: "DOMAIN 05",
    title: "Cognitive Swarms & LLMs",
    icon: Sparkles,
    accent: "indigo",
    borderClass: "border-indigo-500/30 hover:border-indigo-400",
    bgClass: "from-indigo-950/40 via-[#0d0f22]/80 to-[#04060d]/90",
    badge: "0.942 Cosine Sim",
    metric: "100% Guardrail Pass",
    competencies: [
      "LangGraph State Graphs",
      "Hybrid Vector RAG (HNSW)",
      "Strict Pydantic JSON Outputs",
      "Multi-Pass Critic Evaluators",
      "Context Window Compaction"
    ]
  }
];

export function SpecializationDeck() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (id: number) => {
    playClick();
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
      playChirp();
    }
  };

  return (
    <section id="specialization" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#04060b] font-mono">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs uppercase tracking-widest mb-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00e5ff]" />
              <span>// 05. SPECIALIZATION DOMAINS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white glow-cyan">
              ENGINEERING COMPETENCY MATRIX
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 max-w-2xl">
              Click any domain card to expand rigorous production competencies, hardware-accelerated tooling, and latency guarantees.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
            <span>[5 DOMAINS ACTIVE]</span>
            <span>·</span>
            <span className="text-cyan-400">100% EMPIRICAL</span>
          </div>
        </div>

        {/* Cards Grid with 3D Perspective */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {SPECIALIZATIONS.map((spec) => {
            const isExpanded = activeId === spec.id;
            const Icon = spec.icon;

            return (
              <CardContainer key={spec.id} className="group w-full h-full">
                <CardBody
                  onClick={() => toggle(spec.id)}
                  className={`relative rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-full bg-gradient-to-br ${spec.bgClass} ${spec.borderClass} ${
                    isExpanded ? "shadow-[0_0_25px_rgba(0,229,255,0.3)] ring-1 ring-cyan-400/50" : "shadow-lg shadow-black/60"
                  }`}
                >
                  {/* Top HUD markers */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span className="font-bold">{spec.domain}</span>
                      <span className="px-2 py-0.5 rounded bg-black/50 border border-white/10 text-cyan-300 text-[9px] font-bold">
                        {spec.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-cyan-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {spec.title}
                      </h3>
                    </div>

                    <div className="text-[11px] text-zinc-400 font-sans border-t border-white/[0.06] pt-2 flex items-center justify-between">
                      <span>Benchmark:</span>
                      <span className="text-emerald-400 font-bold font-mono">{spec.metric}</span>
                    </div>
                  </div>

                  {/* Core competencies preview / expanded view */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                      <span>Core Competencies:</span>
                      <span className="text-cyan-400 font-bold group-hover:underline">
                        {isExpanded ? "COLLAPSE" : "INSPECT"}
                      </span>
                    </div>

                    <AnimatePresence>
                      {isExpanded ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5 text-xs text-zinc-300 pt-1"
                        >
                          {spec.competencies.map((c, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px]">
                              <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                              <span className="truncate">{c}</span>
                            </div>
                          ))}
                        </motion.div>
                      ) : (
                        <div className="space-y-1 text-[11px] text-zinc-400">
                          <p className="truncate">• {spec.competencies[0]}</p>
                          <p className="truncate">• {spec.competencies[1]}</p>
                          <p className="text-[10px] text-cyan-400/80 font-bold pt-1">+3 More Competencies</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SpecializationDeck;
