"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  LineChart,
  Cpu,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Zap,
  Activity,
  ShieldCheck,
  Flame,
  Radio,
  Layers,
  Sliders,
  RefreshCw,
  BarChart3,
  Binary,
  Network,
  Sparkles,
  Gauge,
  Workflow,
  Server,
  ChevronRight,
  HardDrive,
  Eye,
  SlidersHorizontal
} from "lucide-react";
import { CAPABILITIES } from "@/data/projects";
import { LampContainer } from "@/components/aceternity/LampEffect";
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/Card3D";
import { Cards as InteractiveDeck } from "@/components/ui/cards";
import { playClick, playChirp, playSuccess } from "@/lib/audio";

export function Capabilities() {
  const [activeId, setActiveId] = useState<string>(CAPABILITIES[0].id);
  const activeCap = CAPABILITIES.find((c) => c.id === activeId) || CAPABILITIES[0];

  // Pillar 01 Interactive State (Data Analytics & Systems)
  const [ingestionLoad, setIngestionLoad] = useState(12500);
  const [entropyLevel, setEntropyLevel] = useState(0.92);
  const [queueLatency, setQueueLatency] = useState(2.8);

  // Pillar 02 Interactive State (Data Science & MLOps)
  const [shapScenario, setShapScenario] = useState<"retention" | "churn">("retention");
  const [ksDriftStatus, setKsDriftStatus] = useState("NOMINAL (p=0.91)");

  // Pillar 03 Interactive State (AI & ML Engineering)
  const [attentionMode, setAttentionMode] = useState<"spatial" | "channel">("spatial");
  const [tensorPrecision, setTensorPrecision] = useState<"FP16" | "INT8">("FP16");

  // Lifecycle Stage Selector
  const [activeStage, setActiveStage] = useState(0);

  // Pipeline simulation trigger
  const [isSimulatingPipeline, setIsSimulatingPipeline] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [pipelineSuccess, setPipelineSuccess] = useState(false);

  const handleSimulateBurst = () => {
    playChirp();
    const newLoad = Math.floor(Math.random() * 20000) + 15000;
    setIngestionLoad(newLoad);
    setQueueLatency(Number((1.8 + Math.random() * 1.5).toFixed(1)));
    setEntropyLevel(Number((0.88 + Math.random() * 0.08).toFixed(2)));
  };

  const handleRunPipelineTest = () => {
    if (isSimulatingPipeline) return;
    playChirp();
    setIsSimulatingPipeline(true);
    setPipelineProgress(0);
    setPipelineSuccess(false);

    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setPipelineProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsSimulatingPipeline(false);
        setPipelineSuccess(true);
        playSuccess();
      }
    }, 180);
  };

  const capabilityIcons = {
    analyze: Database,
    model: LineChart,
    engineer: Cpu
  };

  const lifecycleStages = [
    {
      num: "01",
      title: "INGEST & DISCOVER",
      phase: "Telemetry Data Pipelines",
      color: "text-amber-400",
      borderColor: "border-amber-400/40",
      bgGlow: "bg-amber-500/10",
      tools: "FastAPI · Redis Queue · Pydantic V2 · PostgreSQL",
      safeguard: "Schema validation, null checks, deduplication & Shannon entropy auditing",
      sla: "Sub-4ms Ingestion Latency · Zero-loss Durability"
    },
    {
      num: "02",
      title: "EXPLORE & MINE",
      phase: "Statistical Analysis",
      color: "text-teal-400",
      borderColor: "border-teal-400/40",
      bgGlow: "bg-teal-500/10",
      tools: "Pandas · NumPy · SciPy · Matplotlib · Seaborn",
      safeguard: "Outlier suppression, temporal leakage audits & feature distribution checks",
      sla: "100% Reproducible Seeds · Deterministic Splits"
    },
    {
      num: "03",
      title: "FORMULATE & TRAIN",
      phase: "Deep Learning & MLOps",
      color: "text-emerald-400",
      borderColor: "border-emerald-400/40",
      bgGlow: "bg-emerald-500/10",
      tools: "PyTorch 2.5 · Tabular ResNet · YOLOv5-CASP · Scikit-Learn",
      safeguard: "Stratified 5-Fold cross-validation, early stopping, and focal loss",
      sla: "0.894 ROC-AUC · 94.2% Small Nodule Sensitivity"
    },
    {
      num: "04",
      title: "VALIDATE & AUDIT",
      phase: "Explainability & Red-Teaming",
      color: "text-cyan-400",
      borderColor: "border-cyan-400/40",
      bgGlow: "bg-cyan-500/10",
      tools: "TreeSHAP · Grad-CAM · KS Drift Auditing · PyTest",
      safeguard: "Exact Shapley value attribution & 100% zero-shot prompt injection deflection",
      sla: "Zero False Negatives on Critical Benchmark Vectors"
    },
    {
      num: "05",
      title: "CONTAINERIZE & SERVE",
      phase: "Distributed Microservices",
      color: "text-blue-400",
      borderColor: "border-blue-400/40",
      bgGlow: "bg-blue-500/10",
      tools: "Docker Multi-stage · Celery Workers · Redis · TensorRT",
      safeguard: "Cgroup resource boundaries, non-root user execution & health probes",
      sla: "P95 Latency &lt; 38.4ms · Zero-Copy Serialization"
    },
    {
      num: "06",
      title: "DEPLOY & AUTOSCALE",
      phase: "Cloud Native Production",
      color: "text-purple-400",
      borderColor: "border-purple-400/40",
      bgGlow: "bg-purple-500/10",
      tools: "Kubernetes · Helm Charts · Prometheus · Grafana",
      safeguard: "Rolling zero-downtime updates, liveness/readiness probes & automated failover",
      sla: "99.99% Uptime SLA · MTTR &lt; 2.1s Auto-Recovery"
    }
  ];

  return (
    <section
      id="capabilities"
      className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#020408] overflow-hidden scanline"
    >
      {/* Volumetric Lamp Overhead Illumination */}
      <LampContainer className="py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center space-y-4 relative z-20"
        >
          {/* Mission HUD Radar Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,229,255,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#00e5ff]"></span>
            </span>
            <span>// 02. ARCHITECTURAL CAPABILITIES · UNIFIED DISCIPLINE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white glow-cyan leading-none">
            THE THREE PILLARS
          </h2>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-zinc-300 font-mono leading-relaxed pt-2">
            One unified engineering doctrine. From real-time telemetry pipelines and validated neural modeling
            to distributed, low-latency microservice architectures.
          </p>

          {/* Synchrony Telemetry Ribbon */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-zinc-400">
            <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-cyan-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>3 INTEGRATED TIERS</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ZERO DATA LEAKAGE</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-amber-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>SUB-40MS INFERENCE</span>
            </span>
          </div>
        </motion.div>
      </LampContainer>

      <div className="max-w-7xl mx-auto space-y-20 -mt-16 sm:-mt-20 relative z-20">
        {/* 3 Pillars Grid / High-Tech 3D Perspective Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CAPABILITIES.map((cap) => {
            const Icon = capabilityIcons[cap.id as keyof typeof capabilityIcons] || Database;
            const isSelected = activeId === cap.id;

            const pillarBorderGlow =
              cap.id === "analyze"
                ? "border-amber-500/40 hover:border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.15)]"
                : cap.id === "model"
                ? "border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.15)]"
                : "border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.15)]";

            const pillarAccentText =
              cap.id === "analyze"
                ? "text-amber-400"
                : cap.id === "model"
                ? "text-emerald-400"
                : "text-cyan-400";

            return (
              <div
                key={cap.id}
                onClick={() => {
                  playClick();
                  setActiveId(cap.id);
                }}
                className="w-full cursor-pointer"
              >
                <CardContainer className="w-full">
                  <CardBody
                    className={`group relative rounded-2xl p-7 sm:p-8 border transition-all duration-300 flex flex-col justify-between min-h-[520px] hud-corner w-full ${
                      isSelected
                        ? `bg-[#060914] ${pillarBorderGlow} ring-1 ring-white/20 scale-[1.02]`
                        : "bg-[#04060d]/90 border-white/10 hover:border-white/20 hover:bg-[#060914]"
                    }`}
                  >
                    {/* Top Control Bar */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 font-bold tracking-widest">
                          <span>PILLAR {cap.number} //</span>
                          <span className={pillarAccentText}>{cap.id.toUpperCase()}</span>
                        </div>
                        <div className={`p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] ${pillarAccentText}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase group-hover:text-cyan-300 transition-colors">
                          {cap.name}
                        </h3>
                        <p className={`font-mono text-xs mt-1.5 font-semibold ${pillarAccentText}`}>
                          {cap.subtitle}
                        </p>
                      </div>

                      {/* Narrative Description */}
                      <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                        {cap.description}
                      </p>

                      {/* Live Interactive Component based on Pillar ID */}
                      <div className="pt-2">
                        {/* PILLAR 01: Data Analytics & Queue Ingestion Simulator */}
                        {cap.id === "analyze" && (
                          <div className="p-3.5 rounded-xl bg-[#03050a] border border-amber-500/30 space-y-2.5 font-mono text-xs">
                            <div className="flex items-center justify-between text-[10px] text-zinc-400">
                              <span className="text-amber-400 font-bold flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                ASYNC QUEUE SIMULATOR
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSimulateBurst();
                                }}
                                className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-[9px] font-bold border border-amber-400/40"
                              >
                                BURST LOAD
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div>
                                <span className="text-zinc-500 block">THROUGHPUT:</span>
                                <span className="text-white font-bold text-sm">
                                  {ingestionLoad.toLocaleString()} <span className="text-[9px] text-zinc-500">msg/s</span>
                                </span>
                              </div>
                              <div>
                                <span className="text-zinc-500 block">QUEUE P95:</span>
                                <span className="text-amber-400 font-bold text-sm">
                                  {queueLatency} <span className="text-[9px] text-zinc-500">ms</span>
                                </span>
                              </div>
                            </div>

                            <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-300"
                                style={{ width: `${Math.min(100, (ingestionLoad / 35000) * 100)}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* PILLAR 02: Data Science & TreeSHAP Drift Radar */}
                        {cap.id === "model" && (
                          <div className="p-3.5 rounded-xl bg-[#03050a] border border-emerald-500/30 space-y-2.5 font-mono text-xs">
                            <div className="flex items-center justify-between text-[10px] text-zinc-400">
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <BarChart3 className="w-3 h-3" />
                                TREESHAP EXPLAINABILITY
                              </span>
                              <div className="flex gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playClick();
                                    setShapScenario("retention");
                                  }}
                                  className={`px-1.5 py-0.5 rounded text-[9px] ${
                                    shapScenario === "retention"
                                      ? "bg-emerald-500/30 text-emerald-300 font-bold"
                                      : "text-zinc-500"
                                  }`}
                                >
                                  SET A
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playClick();
                                    setShapScenario("churn");
                                  }}
                                  className={`px-1.5 py-0.5 rounded text-[9px] ${
                                    shapScenario === "churn"
                                      ? "bg-red-500/30 text-red-300 font-bold"
                                      : "text-zinc-500"
                                  }`}
                                >
                                  SET B
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1 text-[10px]">
                              <div className="flex justify-between text-zinc-300">
                                <span>Usage Momentum:</span>
                                <span className={shapScenario === "retention" ? "text-emerald-400" : "text-red-400"}>
                                  {shapScenario === "retention" ? "+0.38 (Protective)" : "-0.44 (Risk)"}
                                </span>
                              </div>
                              <div className="flex justify-between text-zinc-300">
                                <span>Contract Stability:</span>
                                <span className="text-emerald-400">+0.29 (Multi-Year)</span>
                              </div>
                              <div className="flex justify-between text-zinc-500 text-[9px] pt-1 border-t border-white/[0.04]">
                                <span>KS DRIFT AUDIT:</span>
                                <span className="text-emerald-400 font-bold">{ksDriftStatus}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* PILLAR 03: AI Engineering & Attention Layer */}
                        {cap.id === "engineer" && (
                          <div className="p-3.5 rounded-xl bg-[#03050a] border border-cyan-500/30 space-y-2.5 font-mono text-xs">
                            <div className="flex items-center justify-between text-[10px] text-zinc-400">
                              <span className="text-cyan-400 font-bold flex items-center gap-1">
                                <Cpu className="w-3 h-3" />
                                CBAM ATTENTION &amp; TENSORRT
                              </span>
                              <div className="flex gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playClick();
                                    setAttentionMode(attentionMode === "spatial" ? "channel" : "spatial");
                                  }}
                                  className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[9px] font-bold"
                                >
                                  {attentionMode.toUpperCase()}
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div>
                                <span className="text-zinc-500 block">PRECISION:</span>
                                <span className="text-cyan-300 font-bold">FP16 TensorRT</span>
                              </div>
                              <div>
                                <span className="text-zinc-500 block">P95 LATENCY:</span>
                                <span className="text-emerald-400 font-bold">38.4 ms</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[9px] text-zinc-400 pt-1 border-t border-white/[0.04]">
                              <span>K8S POD MESH:</span>
                              <span className="text-emerald-400 font-semibold">5/5 HEALTHY (AUTOSCALE)</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Bottom: Skills & Benchmark Metric */}
                    <div className="pt-6 border-t border-white/[0.08] space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {cap.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded bg-[#070a14] text-[10px] font-mono text-zinc-300 border border-white/[0.08] hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#020408] border border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                        <span className="text-zinc-500">BENCHMARK:</span>
                        <span className="text-white font-bold tracking-tight text-right truncate ml-2">
                          {cap.metric.split("·")[0]}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </CardContainer>
              </div>
            );
          })}
        </div>

        {/* Dynamic Architectural Deep-Dive Inspector for Active Pillar */}
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#060a18] via-[#04060e] to-[#080d24] p-6 sm:p-10 shadow-[0_0_40px_rgba(0,229,255,0.12)] hud-corner relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest">
                  DEEP ARCHITECTURAL TOPOLOGY // PILLAR {activeCap.number}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
                  {activeCap.name} EXECUTION FABRIC
                </h3>
              </div>

              <button
                onClick={handleRunPipelineTest}
                disabled={isSimulatingPipeline}
                className={`px-5 py-2.5 rounded-lg font-mono text-xs font-black tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  isSimulatingPipeline
                    ? "bg-amber-500 text-black animate-pulse"
                    : "bg-gradient-to-r from-cyan-400 to-teal-300 text-black hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] scale-100 hover:scale-[1.02]"
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{isSimulatingPipeline ? `RUNNING TEST (${pipelineProgress}%)...` : "TRIGGER PIPELINE CYCLE"}</span>
              </button>
            </div>

            {/* Pipeline progress bar */}
            {isSimulatingPipeline && (
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>TRANSMITTING TEST PACKETS THROUGH TIERS...</span>
                  <span className="text-cyan-400 font-bold">{pipelineProgress}% VERIFIED</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400"
                    style={{ width: `${pipelineProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* 4-Tier Interactive Pipeline Schematic */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[#03050a] border border-cyan-500/20 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-cyan-400 font-bold">
                  <span>TIER 01</span>
                  <HardDrive className="w-3.5 h-3.5" />
                </div>
                <div className="text-sm font-bold text-white">Ingestion Gateway</div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  FastAPI endpoint parsing JSON/tensors with Pydantic V2 strict schema.
                </p>
                <div className="text-[9px] text-cyan-400 pt-1 font-mono">LATENCY: &lt; 2.1ms</div>
              </div>

              <div className="p-4 rounded-xl bg-[#03050a] border border-cyan-500/20 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-purple-400 font-bold">
                  <span>TIER 02</span>
                  <Network className="w-3.5 h-3.5" />
                </div>
                <div className="text-sm font-bold text-white">Async Worker Mesh</div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Celery workers backed by Redis broker for non-blocking compute scheduling.
                </p>
                <div className="text-[9px] text-purple-400 pt-1 font-mono">BUFFER: 100K MSG CAP</div>
              </div>

              <div className="p-4 rounded-xl bg-[#03050a] border border-cyan-500/20 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                  <span>TIER 03</span>
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div className="text-sm font-bold text-white">Inference Engine</div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  PyTorch neural vision / TreeSHAP calculation / TensorRT quantized weights.
                </p>
                <div className="text-[9px] text-amber-400 pt-1 font-mono">PRECISION: FP16/INT8</div>
              </div>

              <div className="p-4 rounded-xl bg-[#03050a] border border-cyan-500/20 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span>TIER 04</span>
                  <Server className="w-3.5 h-3.5" />
                </div>
                <div className="text-sm font-bold text-white">Cloud Orchestration</div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Kubernetes cluster deployed via Helm with automated health probe failover.
                </p>
                <div className="text-[9px] text-emerald-400 pt-1 font-mono">UPTIME: 99.99% SLA</div>
              </div>
            </div>

            {/* Success Validation Toast */}
            {pipelineSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs font-mono text-emerald-300"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">CYCLE COMPLETED:</span>
                  <span>Payload routed through 4 tiers in 38.4ms with zero memory pressure.</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                  HEALTH 100%
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Interactive Fan Deck for Applied Engineering Specializations */}
        <div className="rounded-2xl border border-white/10 bg-[#050811]/90 backdrop-blur-2xl p-6 sm:p-10 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                INTERACTIVE DECK // 5 SPECIALIZATION DOMAINS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase mt-1">
                Click Cards to Inspect Core Competencies
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-500">[SPRING PHYSICS FAN DECK]</span>
          </div>
          <InteractiveDeck />
        </div>

        {/* Interactive Cyber Lifecycle Circuit Stream */}
        <div className="rounded-2xl border border-white/10 bg-[#050811]/90 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                END-TO-END PIPELINE LIFECYCLE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
                SYSTEM EXECUTION METHODOLOGY
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              CLICK ANY STAGE TO INSPECT SAFEGUARDS &amp; TOOLS
            </span>
          </div>

          {/* Circuit Stages Stream */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {lifecycleStages.map((stage, idx) => {
              const isSelected = activeStage === idx;
              return (
                <button
                  key={stage.num}
                  onClick={() => {
                    playClick();
                    setActiveStage(idx);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? `${stage.bgGlow} ${stage.borderColor} shadow-[0_0_15px_rgba(0,229,255,0.2)] ring-1 ring-cyan-400/40 scale-[1.03]`
                      : "bg-[#04060d] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-mono font-black ${stage.color}`}>
                      {stage.num}
                    </span>
                    <Workflow className={`w-3 h-3 ${isSelected ? stage.color : "text-zinc-600"}`} />
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {stage.title}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-1 truncate">
                    {stage.phase}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detail Inspector */}
          {lifecycleStages[activeStage] && (
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-5 rounded-xl bg-[#03050a] border border-white/[0.08] font-mono text-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
                <span className={`font-bold text-sm ${lifecycleStages[activeStage].color}`}>
                  STAGE {lifecycleStages[activeStage].num} // {lifecycleStages[activeStage].title} ({lifecycleStages[activeStage].phase})
                </span>
                <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 font-semibold self-start sm:self-auto">
                  GUARANTEED SLA: {lifecycleStages[activeStage].sla}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                    TOOLING &amp; RUNTIMES:
                  </span>
                  <p className="text-white font-mono text-[11px] font-semibold">
                    {lifecycleStages[activeStage].tools}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                    AUTOMATED SAFEGUARDS &amp; INTEGRITY:
                  </span>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    {lifecycleStages[activeStage].safeguard}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
