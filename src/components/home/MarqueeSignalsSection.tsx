"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/aceternity/InfiniteMovingCards";
import { Terminal } from "lucide-react";

export function MarqueeSignalsSection() {
  const telemetrySignals = [
    {
      quote: "YOLOv5-CASP validated at 98.2% recall with sustained 40.3 FPS on edge hardware, cutting miss rate by 42%.",
      name: "Medical Diagnostic Benchmark",
      title: "NIH / LIDC-IDRI Dataset Validation",
      tag: "VISION CADx",
    },
    {
      quote: "OmniForge AI Agentic RAG architecture handles multimodal queries in under 350ms P95 with Celery-Redis buffering.",
      name: "Distributed Inference Cluster",
      title: "Kubernetes Microservices Telemetry",
      tag: "AGENTIC RAG",
    },
    {
      quote: "RetainAI predictive attrition pipeline achieves ROC-AUC 0.914 with TreeSHAP factor attributions on out-of-sample data.",
      name: "Workforce Analytics Engine",
      title: "Cross-Validated Scikit-Learn Pipeline",
      tag: "EXPLAINABLE ML",
    },
    {
      quote: "Decoupled PostgreSQL state machine with Redis worker queue prevents dropped tasks across simulated network partitioning.",
      name: "Distributed Task Engine",
      title: "Zero-Data-Loss Reliability Protocol",
      tag: "DISTRIBUTED SYSTEMS",
    },
    {
      quote: "Multi-stage non-root Docker build reduced image footprint to 142MB with sub-second cold starts.",
      name: "Production Container Optimization",
      title: "FastAPI + Docker Security Hardening",
      tag: "DEVOPS / INFRA",
    },
  ];

  return (
    <section className="py-20 border-t border-white/[0.08] relative bg-[#010204] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-cyan-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>PRODUCTION TELEMETRY STREAM</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>STREAMING VERIFIED BENCHMARKS</span>
        </div>
      </div>

      <InfiniteMovingCards items={telemetrySignals} speed="slow" direction="left" />
    </section>
  );
}
