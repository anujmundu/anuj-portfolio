"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import {
  Cpu,
  Server,
  LineChart,
  Database,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Code2,
  Terminal,
  Maximize2,
  X,
  Play
} from "lucide-react";
import { playClick, playChirp, playSuccess } from "@/lib/audio";

export interface CompetencyItem {
  name: string;
  tag: string;
  detail: string;
  metric: string;
}

export interface SpecializationCard {
  id: string;
  domainNumber: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "cyan" | "emerald" | "amber" | "purple" | "indigo";
  badge: string;
  glowClass: string;
  bgGradient: string;
  borderClass: string;
  metrics: { label: string; value: string; detail: string }[];
  competencies: CompetencyItem[];
  simulationLabel: string;
  simulationSuccess: string;
  config: {
    y: number;
    rotate: number;
    zIndex: number;
  };
}

const SPECIALIZATION_CARDS: SpecializationCard[] = [
  {
    id: "vision",
    domainNumber: "DOMAIN 01",
    title: "Computer Vision & Edge AI",
    tagline: "High-FPS Object Localization & Spatial Attention",
    icon: Cpu,
    accent: "cyan",
    badge: "14.2MS P95 LATENCY",
    glowClass: "shadow-[0_0_30px_rgba(0,229,255,0.35)]",
    bgGradient: "from-cyan-950/80 via-[#0a121e]/90 to-[#04070d]/95",
    borderClass: "border-cyan-500/40 hover:border-cyan-400",
    metrics: [
      { label: "mAP@50 Metric", value: "94.8%", detail: "Medical & Edge Object Detection" },
      { label: "Inference Latency", value: "14.2 ms", detail: "TensorRT FP16 compiled kernel" },
      { label: "Video Stream FPS", value: "72 FPS", detail: "Continuous RTSP multi-channel stream" }
    ],
    competencies: [
      {
        name: "YOLOv8 & YOLOv5 Architectures",
        tag: "PyTorch 2.5",
        detail: "Anchor-free decoupled head detection with custom multi-scale feature pyramids (FPN).",
        metric: "94.8% mAP"
      },
      {
        name: "CBAM Dual-Attention Mechanism",
        tag: "TensorRT FP16",
        detail: "Channel and spatial attention subnets to prioritize micro-defect anomalies in high-noise scans.",
        metric: "+6.4% Recall"
      },
      {
        name: "OpenCV Hardware Acceleration",
        tag: "CUDA 12.6",
        detail: "GPU-accelerated affine transformations, zero-copy memory buffers, and frame decoders.",
        metric: "72 FPS Stream"
      },
      {
        name: "Grad-CAM Clinical Explainability",
        tag: "Torchvision",
        detail: "Activation gradient mapping providing clinician-interpretable heatmaps for diagnostic trust.",
        metric: "100% Interpretable"
      },
      {
        name: "ONNX Runtime & TensorRT Fusion",
        tag: "Edge Compilation",
        detail: "Layer fusion and INT8 quantization shrinking weights from 168MB to 42MB without accuracy loss.",
        metric: "75% VRAM Reduction"
      }
    ],
    simulationLabel: "TEST REAL-TIME YOLO INFERENCE",
    simulationSuccess: "INFERENCE VERIFIED: Bounding box predicted with 98.4% confidence and IoU=0.912 in 14.2ms [SLA MET]",
    config: {
      y: -15,
      rotate: -12,
      zIndex: 2
    }
  },
  {
    id: "mlops",
    domainNumber: "DOMAIN 02",
    title: "Distributed MLOps & Serving",
    tagline: "High-Throughput Model Orchestration & Mesh",
    icon: Server,
    accent: "emerald",
    badge: "99.99% PRODUCTION SLA",
    glowClass: "shadow-[0_0_30px_rgba(16,185,129,0.35)]",
    bgGradient: "from-emerald-950/80 via-[#081510]/90 to-[#030a06]/95",
    borderClass: "border-emerald-500/40 hover:border-emerald-400",
    metrics: [
      { label: "Throughput Scale", value: "14,200 msg/s", detail: "Redis cluster non-blocking queue" },
      { label: "P95 Response SLA", value: "37.4 ms", detail: "Sub-50ms hard threshold" },
      { label: "Worker Pod Mesh", value: "32 Nodes", detail: "Automated Celery horizontal autoscaling" }
    ],
    competencies: [
      {
        name: "Triton Inference Server",
        tag: "Dynamic Batching",
        detail: "Multi-model concurrent execution with queue time priority and dynamic client batching.",
        metric: "4.8x Throughput"
      },
      {
        name: "Celery & Redis Worker Mesh",
        tag: "Distributed Async",
        detail: "Decoupled worker mesh with Redis backing for zero-drop ingestion under sudden burst spikes.",
        metric: "14.2K msg/sec"
      },
      {
        name: "Docker Cgroups V2 Isolation",
        tag: "Containerization",
        detail: "Strict memory limits preventing noisy-neighbor OOM kills across co-located GPU workers.",
        metric: "Zero OOM Crashes"
      },
      {
        name: "Kubernetes Helm Orchestration",
        tag: "Cloud Native",
        detail: "Automated liveness/readiness probes with zero-downtime blue/green rolling deployments.",
        metric: "99.99% Uptime"
      },
      {
        name: "Prometheus & Evidently Telemetry",
        tag: "Drift Monitoring",
        detail: "Real-time Kolmogorov-Smirnov drift triggers and automated model rollback webhooks.",
        metric: "Sub-second Alerting"
      }
    ],
    simulationLabel: "SIMULATE 10K LOAD INJECTION",
    simulationSuccess: "PIPELINE BUFFER VERIFIED: 10,000 requests processed with zero packet drops and P95=37.4ms [SLA MET]",
    config: {
      y: 15,
      rotate: 6,
      zIndex: 3
    }
  },
  {
    id: "datascience",
    domainNumber: "DOMAIN 03",
    title: "Empirical Data Science & TreeSHAP",
    tagline: "Statistical Modeling, Risk & Explainable AI",
    icon: LineChart,
    accent: "amber",
    badge: "0.914 ROC-AUC",
    glowClass: "shadow-[0_0_30px_rgba(245,158,11,0.35)]",
    bgGradient: "from-amber-950/80 via-[#181106]/90 to-[#0a0703]/95",
    borderClass: "border-amber-500/40 hover:border-amber-400",
    metrics: [
      { label: "Predictive ROC-AUC", value: "0.914", detail: "Customer risk & retention modeling" },
      { label: "SHAP Acceleration", value: "14.7x Speed", detail: "Recursive subtree pruning kernel" },
      { label: "KS Distribution Drift", value: "p = 0.001", detail: "Zero concept divergence verified" }
    ],
    competencies: [
      {
        name: "TreeSHAP Local Attributions",
        tag: "Explainability",
        detail: "Exact Shapley additive feature importance providing mathematical explanations for high-stakes decisions.",
        metric: "14.7x Faster"
      },
      {
        name: "XGBoost & LightGBM Kernels",
        tag: "Gradient Boost",
        detail: "Tree ensemble algorithms tuned via Bayesian hyperparameter optimization and custom loss.",
        metric: "0.914 ROC-AUC"
      },
      {
        name: "Stratified K-Fold Cross Validation",
        tag: "Zero Leakage",
        detail: "Strict temporal train-test isolation preventing lookahead bias on financial & retention datasets.",
        metric: "Zero Data Leak"
      },
      {
        name: "Kolmogorov-Smirnov Drift Testing",
        tag: "Hypothesis Test",
        detail: "Two-sample non-parametric tests continuously auditing feature distribution stability in production.",
        metric: "p=0.001 [STABLE]"
      },
      {
        name: "Automated Data Contracts",
        tag: "Pydantic V2",
        detail: "Strict type boundaries and invariant constraints rejecting corrupt rows before modeling.",
        metric: "100% Clean Data"
      }
    ],
    simulationLabel: "RUN TREESHAP FEATURE AUDIT",
    simulationSuccess: "SHAP AUDIT VERIFIED: Feature attribution calculated across 50K records in 8.4ms [AUDIT PASSED]",
    config: {
      y: -25,
      rotate: -4,
      zIndex: 4
    }
  },
  {
    id: "dataengineering",
    domainNumber: "DOMAIN 04",
    title: "High-Throughput Data Engineering",
    tagline: "Star Schemas, Vectorized SQL & Parquet",
    icon: Database,
    accent: "purple",
    badge: "1.4M TRANSACTION ROWS",
    glowClass: "shadow-[0_0_30px_rgba(168,85,247,0.35)]",
    bgGradient: "from-purple-950/80 via-[#130b1e]/90 to-[#07040d]/95",
    borderClass: "border-purple-500/40 hover:border-purple-400",
    metrics: [
      { label: "SQL Window Latency", value: "12.8 ms", detail: "Analytical aggregation over 1.4M rows" },
      { label: "Throughput Scale", value: "1.4M Events", detail: "Enterprise revenue transaction telemetry" },
      { label: "Zero-Copy Memory", value: "100% Arrow", detail: "SIMD vectorized in-memory cache" }
    ],
    competencies: [
      {
        name: "PostgreSQL Star Schema Design",
        tag: "Data Warehouse",
        detail: "Fact and dimension tables partitioned by calendar time with composite indexes for sub-20ms queries.",
        metric: "12.8ms Query"
      },
      {
        name: "Polars & DuckDB Vectorization",
        tag: "SIMD Engines",
        detail: "Columnar execution engines processing multi-million event cohorts with zero Python GIL overhead.",
        metric: "10x vs Pandas"
      },
      {
        name: "Kafka Event Stream Ingestion",
        tag: "Distributed Log",
        detail: "Partitioned consumer groups with exactly-once delivery guarantees and offset commit management.",
        metric: "1.4M events/s"
      },
      {
        name: "Apache Parquet & Snappy",
        tag: "Columnar Storage",
        detail: "Dictionary encoded compressed storage delivering 80% reduction in disk footprint.",
        metric: "80% Disk Saved"
      },
      {
        name: "Pydantic V2 Invariant Validation",
        tag: "Data Contracts",
        detail: "Rust-backed microsecond schema validation intercepting missing fields and malformed payloads.",
        metric: "Sub-100μs Check"
      }
    ],
    simulationLabel: "EXECUTE VECTORIZED SQL BENCHMARK",
    simulationSuccess: "SQL PIPELINE VERIFIED: 1.4M transaction records aggregated with window functions in 12.8ms [SUCCESS]",
    config: {
      y: 15,
      rotate: 10,
      zIndex: 5
    }
  },
  {
    id: "agents",
    domainNumber: "DOMAIN 05",
    title: "Multi-Agent Cognitive Swarms & LLMs",
    tagline: "Autonomous Reasoning Graphs & Vector RAG",
    icon: Sparkles,
    accent: "indigo",
    badge: "DETERMINISTIC COGNITION",
    glowClass: "shadow-[0_0_30px_rgba(99,102,241,0.35)]",
    bgGradient: "from-indigo-950/80 via-[#0d0f22]/90 to-[#04060d]/95",
    borderClass: "border-indigo-500/40 hover:border-indigo-400",
    metrics: [
      { label: "Vector Similarity", value: "0.942", detail: "HNSW index cosine similarity score" },
      { label: "Stream Throughput", value: "84 tok/s", detail: "Low-latency speculative token decoding" },
      { label: "Hallucination Defense", value: "100%", detail: "Automated critic verification guardrail" }
    ],
    competencies: [
      {
        name: "LangGraph State Machine Graphs",
        tag: "Agentic Swarm",
        detail: "Cyclical agentic reasoning loops with persistent memory checkpoints and dynamic branch routing.",
        metric: "Deterministic Flow"
      },
      {
        name: "Hybrid Vector Search (HNSW + BM25)",
        tag: "RAG Retrieval",
        detail: "Dense neural embeddings combined with sparse BM25 keyword matching for zero-miss retrieval.",
        metric: "0.942 Cosine Sim"
      },
      {
        name: "Context Window Compaction",
        tag: "Prompt Optimization",
        detail: "Semantic token deduplication reducing context costs by 45% while preserving critical reasoning chains.",
        metric: "-45% Token Cost"
      },
      {
        name: "Strict Pydantic JSON Structured Outputs",
        tag: "Contract Schema",
        detail: "Enforces deterministic JSON schemas guaranteeing zero hallucinated fields in enterprise APIs.",
        metric: "100% Schema Valid"
      },
      {
        name: "Self-Reflection & Critic Agents",
        tag: "Cognitive Guardrail",
        detail: "Multi-pass evaluator agent auditing generated outputs against ground-truth source citations.",
        metric: "Zero Hallucination"
      }
    ],
    simulationLabel: "DISPATCH MULTI-AGENT REASONING",
    simulationSuccess: "AGENT SWARM VERIFIED: Router -> Searcher -> Critic validated output with 0.942 similarity in 42ms [PASSED]",
    config: {
      y: -10,
      rotate: -6,
      zIndex: 6
    }
  }
];

export function Cards() {
  const [activeCard, setActiveCard] = useState<SpecializationCard | null>(null);
  const [activeCompetencyIdx, setActiveCompetencyIdx] = useState<number>(0);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationDone, setSimulationDone] = useState(false);
  const [spacing, setSpacing] = useState(170);

  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive card spacing for mobile vs desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSpacing(55);
      } else if (window.innerWidth < 1024) {
        setSpacing(110);
      } else {
        setSpacing(180);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation: Left/Right arrows cycle cards, ESC closes active card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCard(null);
        setSimulationDone(false);
      }
      if (e.key === "ArrowRight") {
        playClick();
        if (!activeCard) {
          setActiveCard(SPECIALIZATION_CARDS[0]);
        } else {
          const currIdx = SPECIALIZATION_CARDS.findIndex((c) => c.id === activeCard.id);
          const nextIdx = (currIdx + 1) % SPECIALIZATION_CARDS.length;
          setActiveCard(SPECIALIZATION_CARDS[nextIdx]);
          setActiveCompetencyIdx(0);
          setSimulationDone(false);
        }
      }
      if (e.key === "ArrowLeft") {
        playClick();
        if (!activeCard) {
          setActiveCard(SPECIALIZATION_CARDS[SPECIALIZATION_CARDS.length - 1]);
        } else {
          const currIdx = SPECIALIZATION_CARDS.findIndex((c) => c.id === activeCard.id);
          const prevIdx = (currIdx - 1 + SPECIALIZATION_CARDS.length) % SPECIALIZATION_CARDS.length;
          setActiveCard(SPECIALIZATION_CARDS[prevIdx]);
          setActiveCompetencyIdx(0);
          setSimulationDone(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCard]);

  const selectCard = (card: SpecializationCard) => {
    playClick();
    if (activeCard?.id === card.id) {
      setActiveCard(null);
      setSimulationDone(false);
    } else {
      setActiveCard(card);
      setActiveCompetencyIdx(0);
      setSimulationDone(false);
      playChirp();
    }
  };

  const runSimulation = () => {
    playClick();
    setSimulationRunning(true);
    setSimulationDone(false);
    setTimeout(() => {
      setSimulationRunning(false);
      setSimulationDone(true);
      playSuccess();
    }, 450);
  };

  const middle = (SPECIALIZATION_CARDS.length - 1) / 2;

  return (
    <div className="relative w-full py-4 sm:py-8 space-y-8 font-mono select-none">
      {/* Top Domain Quick-Selector Pills */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        {SPECIALIZATION_CARDS.map((card, idx) => {
          const isSelected = activeCard?.id === card.id;
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => selectCard(card)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                isSelected
                  ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-105"
                  : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{card.domainNumber}:</span>
              <span>{card.title.split("&")[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* Spring Physics Interactive Fan Deck Stage */}
      <div
        ref={containerRef}
        className="relative mx-auto flex h-[480px] sm:h-[530px] w-full max-w-5xl items-center justify-center overflow-visible [--card-w:260px] [--card-h:390px] sm:[--card-w:300px] sm:[--card-h:430px]"
      >
        {SPECIALIZATION_CARDS.map((card, index) => {
          const offsetX = (index - middle) * spacing;
          const isActive = activeCard?.id === card.id;
          const isAnyActive = Boolean(activeCard);
          const Icon = card.icon;

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                x: isActive ? 0 : isAnyActive ? offsetX * 0.35 : offsetX,
                y: isActive ? 0 : isAnyActive ? 220 : card.config.y,
                rotate: isActive ? 0 : isAnyActive ? 0.2 * card.config.rotate : card.config.rotate,
                scale: isActive ? 1.06 : isAnyActive ? 0.72 : 1,
                opacity: isAnyActive && !isActive ? 0.35 : 1
              }}
              whileHover={{
                scale: isActive ? 1.06 : isAnyActive ? 0.75 : 1.05,
                y: isActive ? 0 : isAnyActive ? 210 : card.config.y - 15,
                transition: { duration: 0.2 }
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24
              }}
              style={{
                width: "var(--card-w)",
                height: "var(--card-h)",
                marginLeft: "calc(var(--card-w) / -2)",
                marginTop: "calc(var(--card-h) / -2)",
                zIndex: isActive ? 40 : card.config.zIndex
              }}
              onClick={() => selectCard(card)}
              className={cn(
                "absolute top-1/2 left-1/2 rounded-2xl p-5 sm:p-6 cursor-pointer border backdrop-blur-2xl shadow-2xl flex flex-col justify-between overflow-hidden group transition-colors duration-300",
                `bg-gradient-to-br ${card.bgGradient}`,
                card.borderClass,
                isActive ? card.glowClass : "shadow-black/60"
              )}
            >
              {/* Corner HUD accent brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/40 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/40 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/40 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/40 pointer-events-none" />

              {/* Card Header Telemetry */}
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-bold uppercase">
                    {card.domainNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase border border-white/10 bg-black/40 text-cyan-300">
                    {card.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                      {card.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Mini Telemetry Gauges */}
              <div className="grid grid-cols-3 gap-1.5 py-3 border-y border-white/[0.08] bg-black/30 rounded-xl px-2.5 relative z-10">
                {card.metrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[9px] text-zinc-500 uppercase truncate">{m.label.split(" ")[0]}</div>
                    <div className="text-xs sm:text-sm font-extrabold text-white font-mono mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Competencies Preview / CTA */}
              <div className="space-y-2 relative z-10">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                  <span>5 Core Competencies:</span>
                  <span className="text-cyan-400 font-bold group-hover:underline">
                    {isActive ? "INSPECTING" : "CLICK TO EXPAND"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {card.competencies.slice(0, 3).map((comp, ci) => (
                    <span
                      key={ci}
                      className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.04] border border-white/[0.06] text-zinc-300 truncate max-w-[130px]"
                    >
                      {comp.name.split(" ")[0]} {comp.name.split(" ")[1] || ""}
                    </span>
                  ))}
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950/40 text-cyan-300 border border-cyan-500/20 font-bold">
                    +2 MORE
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Active Card Expanded Deep Competency Inspector Modal / Drawer */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-4xl mx-auto rounded-2xl border border-cyan-500/40 bg-[#070b14]/95 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header with Title & Close Button */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <activeCard.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-cyan-400 font-bold tracking-wider">
                      {activeCard.domainNumber} // DEEP INSPECTION
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                      VERIFIED SLA
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5">
                    {activeCard.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => {
                  playClick();
                  setActiveCard(null);
                  setSimulationDone(false);
                }}
                className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
                title="Close Inspector (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeCard.metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40 space-y-1"
                >
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">{m.label}</div>
                  <div className="text-2xl font-black text-cyan-300 font-mono">{m.value}</div>
                  <div className="text-[10px] text-zinc-500">{m.detail}</div>
                </div>
              ))}
            </div>

            {/* Interactive Competency Selector */}
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center justify-between">
                <span>Select Competency to Inspect Implementation:</span>
                <span className="text-[11px] text-cyan-400 font-mono">
                  {activeCompetencyIdx + 1} / {activeCard.competencies.length} ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {activeCard.competencies.map((comp, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playClick();
                      setActiveCompetencyIdx(idx);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer text-xs ${
                      activeCompetencyIdx === idx
                        ? "border-cyan-400 bg-cyan-500/20 text-white font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                        : "border-white/[0.06] bg-black/30 text-zinc-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <div className="text-[10px] text-cyan-400 font-mono font-bold truncate">
                      {comp.tag}
                    </div>
                    <div className="truncate font-semibold mt-0.5">{comp.name.split(" ")[0]}</div>
                  </button>
                ))}
              </div>

              {/* Active Competency Detail Card */}
              {activeCard.competencies[activeCompetencyIdx] && (
                <motion.div
                  key={activeCompetencyIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl border border-cyan-500/30 bg-black/50 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <span>{activeCard.competencies[activeCompetencyIdx].name}</span>
                    </h4>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-mono text-xs font-bold self-start sm:self-auto">
                      Benchmark: {activeCard.competencies[activeCompetencyIdx].metric}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {activeCard.competencies[activeCompetencyIdx].detail}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Live Interactive Benchmark Simulation Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08]">
              <button
                onClick={runSimulation}
                disabled={simulationRunning}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.4)] disabled:opacity-50 cursor-pointer"
              >
                <Play className={`w-3.5 h-3.5 ${simulationRunning ? "animate-spin" : ""}`} />
                <span>{simulationRunning ? "EXECUTING BENCHMARK..." : activeCard.simulationLabel}</span>
              </button>

              <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-2">
                <span>Use ←/→ keys to cycle deck</span>
                <span>·</span>
                <span>ESC to close</span>
              </div>
            </div>

            {/* Simulation Completed Banner */}
            {simulationDone && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 flex items-center justify-between gap-3 text-xs text-emerald-300"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold">{activeCard.simulationSuccess}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold shrink-0">
                  PASSED
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Cards;
