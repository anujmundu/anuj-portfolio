"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Code2, Gauge, Bug, Rocket, RefreshCw, CheckCircle, Terminal, FileCode, Play, Sparkles, ShieldCheck } from "lucide-react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import { playClick } from "@/lib/audio";
import { triggerExplosion } from "@/components/animaster/ParticleExplosion";

export function EngineeringMindset() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      step: "01",
      title: "RESEARCH",
      subtitle: "Problem Formulation & Baseline Establishment",
      statusBadge: "BASELINE VERIFIED",
      icon: Search,
      color: "text-amber-400",
      accentBorder: "border-amber-500/40",
      accentBg: "bg-amber-500/10",
      description: "Understand the fundamental business constraint before writing model code. Review existing literature, inspect data quality distributions, and establish the simplest possible non-machine-learning baseline (heuristics or logistic regression).",
      artifacts: ["data_contract.yaml", "null_distribution.parquet", "heuristic_baseline.py"],
      checkpoints: [
        "Audit class balance and temporal distribution shifts",
        "Define strict quantifiable North Star metrics (e.g. P95 latency vs. recall)",
        "Establish unambiguous test/train isolation contracts"
      ],
      terminal: {
        command: "python -m src.audit.data_contracts --dataset production_v3",
        output: [
          "[INFO] Ingesting 14,200 sample tensors from isolated split...",
          "[AUDIT] Class imbalance ratio: 1:18.4 (Defect vs Normal)",
          "[AUDIT] Kolmogorov-Smirnov distribution drift test: p=0.48 (STABLE)",
          "[BASELINE] Logistic baseline established: ROC-AUC = 0.642",
          "[STATUS] North Star contract verified: Target P95 < 25ms, Recall > 82%"
        ]
      }
    },
    {
      step: "02",
      title: "BUILD",
      subtitle: "Feature Synthesis & Model Architecture",
      statusBadge: "TENSORS SHAPED",
      icon: Code2,
      color: "text-teal-400",
      accentBorder: "border-teal-500/40",
      accentBg: "bg-teal-500/10",
      description: "Write clean, modular, and reproducible Python code. Construct specialized feature engineering pipelines in SQL and Pandas, followed by PyTorch neural network modules or gradient boosted decision trees.",
      artifacts: ["yolo_cbam.py", "feature_store.sql", "random_seed.lock"],
      checkpoints: [
        "Modular PyTorch nn.Module design with explicit tensor shape typing",
        "Deterministic random seeding across all data loaders",
        "Automated unit tests for data transformation routines"
      ],
      terminal: {
        command: "torchrun --nproc_per_node=1 src/models/train.py --arch cbam_casp",
        output: [
          "[TORCH] Initializing CASP-Attention backbone (Parameters: 7.2M)",
          "[SHAPE] Input tensor: torch.Size([32, 3, 640, 640])",
          "[SHAPE] Backbone feature map: torch.Size([32, 512, 20, 20])",
          "[SEED] Deterministic random seed locked: 42 (DataLoader worker=4)",
          "[LOSS] Epoch 40/40 Complete -> CIoU: 0.021, DFL: 0.045, Box: 0.032"
        ]
      }
    },
    {
      step: "03",
      title: "EVALUATE",
      subtitle: "Cross-Validation & Error Attribution",
      statusBadge: "ROC-AUC 91.4%",
      icon: Gauge,
      color: "text-emerald-400",
      accentBorder: "border-emerald-500/40",
      accentBg: "bg-emerald-500/10",
      description: "Never rely on a single aggregate metric like test accuracy. Profile Precision-Recall trade-offs, confusion matrix false positive costs, Brier score probability calibration, and individual feature contributions using TreeSHAP.",
      artifacts: ["confusion_matrix.json", "shap_summary.png", "calibration_curve.svg"],
      checkpoints: [
        "Time-series splits to completely prevent future lookahead leakage",
        "Quantile threshold calibration for operational risk tiers",
        "Per-class slice evaluation to expose hidden blind spots"
      ],
      terminal: {
        command: "pytest tests/eval_benchmarks.py --kfold=5 --stratified",
        output: [
          "[EVAL] Running 5-Fold Stratified Cross-Validation...",
          "[METRIC] Mean Out-of-Sample ROC-AUC: 0.914 ± 0.008",
          "[METRIC] High-Risk Tier Recall @ 0.45 threshold: 84.2%",
          "[SHAP] Top attribution vector: feature_overtime (+0.28 value impact)",
          "[CALIBRATION] Brier score: 0.089 -> Probabilities strictly calibrated"
        ]
      }
    },
    {
      step: "04",
      title: "DEBUG & QUANTIZE",
      subtitle: "Edge Bottlenecks & Anomaly Failure Analysis",
      statusBadge: "INT8 ONNX 14.6MS",
      icon: Bug,
      color: "text-cyan-400",
      accentBorder: "border-cyan-500/40",
      accentBg: "bg-cyan-500/10",
      description: "Profile execution latency using PyTorch Profiler and cProfile. Isolate memory bottlenecks between NumPy arrays and GPU/CPU transfers. Apply post-training INT8 quantization and ONNX graph optimization to compress model binaries.",
      artifacts: ["model_int8.onnx", "onnx_profile.json", "outlier_analysis.md"],
      checkpoints: [
        "Graph pruning and operator fusion via ONNX Runtime",
        "Analyze high-loss outliers to discover annotation ambiguities",
        "Implement graceful fallbacks for out-of-distribution inputs"
      ],
      terminal: {
        command: "python -m src.export.quantize --format int8_onnx --fuse-ops",
        output: [
          "[PROFILER] Baseline FP32 Inference Latency: 48.2ms per frame",
          "[QUANT] Calibrating dynamic activation ranges on 500 calibration frames...",
          "[ONNX] Fusing 112 Conv+BatchNorm+SiLU operators into 34 fused kernels",
          "[RESULT] INT8 ONNX Model Size: 14.2 MB (Compressed from 56.8 MB)",
          "[LATENCY] Post-Quantization Latency: 14.6ms (3.3x Speedup) on x86 CPU"
        ]
      }
    },
    {
      step: "05",
      title: "DEPLOY",
      subtitle: "FastAPI Microservices & Docker Isolation",
      statusBadge: "HEALTH 200 OK",
      icon: Rocket,
      color: "text-blue-400",
      accentBorder: "border-blue-500/40",
      accentBg: "bg-blue-500/10",
      description: "Wrap the verified inference engine into an asynchronous FastAPI endpoint. Package dependencies into multi-stage, non-root Docker containers and configure Redis queues to buffer high-frequency burst traffic.",
      artifacts: ["Dockerfile.nonroot", "docker-compose.yml", "fastapi_app.py"],
      checkpoints: [
        "Multi-stage Docker builds minimizing attack surface & image size",
        "Pydantic schema validation on all incoming payload requests",
        "Health checks and Prometheus latency metric instrumentation"
      ],
      terminal: {
        command: "docker compose up --build -d app_worker inference_cluster",
        output: [
          "[DOCKER] Building multi-stage non-root container image (UID: 10001)...",
          "[UVICORN] Application startup complete. 4 async workers listening on 0.0.0.0:8000",
          "[REDIS] Task broker connected: celery@worker-01 (12 concurrency slots)",
          "[PROMETHEUS] Metrics exporter mounted at /metrics",
          "[HEALTHCHECK] GET /health -> 200 OK (Latency: 1.4ms, CPU: 8.2%)"
        ]
      }
    },
    {
      step: "06",
      title: "ITERATE",
      subtitle: "Telemetry Monitoring & Continuous Feedback",
      statusBadge: "DRIFT < 0.05",
      icon: RefreshCw,
      color: "text-purple-400",
      accentBorder: "border-purple-500/40",
      accentBg: "bg-purple-500/10",
      description: "A system in production requires continuous vigilance. Monitor concept drift, feature distribution drift, and latency degradation under actual production workloads, using logging queues to collect hard failure cases for retrain cycles.",
      artifacts: ["evidently_drift.json", "active_learning_pool/", "retrain_cron.sh"],
      checkpoints: [
        "Automated drift alerts when input features cross statistical thresholds",
        "Curate active-learning candidate pools from ambiguous detections",
        "Scheduled non-breaking model update rollouts"
      ],
      terminal: {
        command: "python -m src.monitor.telemetry_stream --window=24h",
        output: [
          "[STREAM] Ingesting 24-hour production inference logs (86,400 calls)...",
          "[DRIFT] Population Stability Index (PSI): 0.038 -> NO DRIFT",
          "[CONFIDENCE] Mean detection confidence: 0.923 (Threshold: 0.85)",
          "[ACTIVE LEARNING] Captured 14 low-confidence edge frames to review queue",
          "[STATUS] Continuous verification pipeline operational. Zero rollback events."
        ]
      }
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#06070a] overflow-hidden">
      {/* Subtle background circuit depth glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(0,229,255,0.05),transparent_70%)]" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>// 06. HOW I WORK · SYSTEMATIC RIGOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white glow-cyan">
              ENGINEERING LIFECYCLE
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-mono leading-relaxed">
            From raw data to continuous production: the systematic discipline that separates toy prototypes from dependable, production-ready AI software.
          </p>
        </div>

        {/* Interconnected Stepper Pipeline Track */}
        <div className="relative">
          {/* Animated Conduit Line */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-white/[0.06] -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activeStage === idx;

              return (
                <button
                  key={stage.step}
                  onClick={(e) => {
                    playClick();
                    triggerExplosion(e);
                    setActiveStage(idx);
                  }}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer hud-corner relative ${
                    isSelected
                      ? `bg-[#0e1320] border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.25)] ring-1 ring-cyan-400/50`
                      : "bg-[#080b12] border-white/[0.06] hover:border-zinc-700 hover:bg-[#0c1018]"
                  }`}
                  data-cursor="button"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                    <span className="font-bold">PHASE {stage.step}</span>
                    <Icon className={`w-4 h-4 ${stage.color}`} />
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-white uppercase tracking-tight">
                    {stage.title}
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_6px_rgba(0,229,255,0.3)]"
                        : "bg-white/[0.03] text-zinc-500 border-white/[0.06]"
                    }`}>
                      {stage.statusBadge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail & Live Terminal Workbench */}
        <div className="rounded-2xl border border-white/[0.1] bg-[#070910] p-6 sm:p-8 lg:p-10 hud-corner shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Stage Logic, Deliverables, Checkpoints */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-mono font-bold text-zinc-600">
                      {stages[activeStage].step}
                    </span>
                    <span className="h-5 w-[1px] bg-zinc-800" />
                    <span className={`font-mono text-xs uppercase font-bold tracking-wider ${stages[activeStage].color}`}>
                      {stages[activeStage].subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                    {stages[activeStage].title} SPECIFICATION
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed font-sans pt-1">
                    {stages[activeStage].description}
                  </p>
                </div>

                {/* Key Artifacts Produced */}
                <div className="space-y-2">
                  <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
                    REPRODUCIBLE ARTIFACTS GENERATED:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stages[activeStage].artifacts.map((art) => (
                      <span
                        key={art}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.04] text-cyan-300 border border-cyan-500/20 font-mono text-xs"
                      >
                        <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{art}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification Checkpoints */}
                <div className="bg-[#05070c] border border-white/[0.06] rounded-xl p-5 font-mono space-y-3">
                  <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider border-b border-white/[0.06] pb-2 flex items-center justify-between">
                    <span>RIGOR CHECKPOINTS</span>
                    <span className="text-emerald-400 text-[10px] font-semibold">100% COMPLIANT</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-zinc-300">
                    {stages[activeStage].checkpoints.map((cp, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{cp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Live Telemetry Terminal Simulator */}
              <div className="lg:col-span-6 space-y-3 font-mono">
                <div className="rounded-xl border border-white/[0.1] bg-[#04060a] overflow-hidden shadow-2xl hud-corner">
                  {/* Terminal Tab Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#090c14] border-b border-white/[0.08] text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-white font-semibold">stage_{stages[activeStage].step.toLowerCase()}_stdout.log</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>LIVE TELEMETRY</span>
                    </div>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-5 space-y-3 text-xs leading-relaxed overflow-x-auto">
                    {/* Command Prompt */}
                    <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-white/[0.04] pb-2">
                      <span className="text-zinc-500">$</span>
                      <span>{stages[activeStage].terminal.command}</span>
                    </div>

                    {/* Output Lines */}
                    <div className="space-y-1.5 pt-1">
                      {stages[activeStage].terminal.output.map((line, idx) => (
                        <div
                          key={idx}
                          className={`font-mono text-[11px] sm:text-xs ${
                            line.includes("[STATUS]") || line.includes("[RESULT]")
                              ? "text-emerald-400 font-bold"
                              : line.includes("[METRIC]") || line.includes("[SHAP]")
                              ? "text-cyan-300"
                              : line.includes("[TORCH]") || line.includes("[SHAPE]")
                              ? "text-purple-300"
                              : line.includes("[DOCKER]") || line.includes("[UVICORN]")
                              ? "text-amber-300"
                              : "text-zinc-400"
                          }`}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terminal Footer */}
                  <div className="px-4 py-2 bg-[#06080e] border-t border-white/[0.04] flex items-center justify-between text-[10px] text-zinc-500">
                    <span>Process PID: 4892 · Exit Code: 0 (SUCCESS)</span>
                    <span className="text-cyan-400 font-semibold">Deterministic Execution</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Empirical Paradigm Shift Reveal */}
        <div className="flex flex-col items-center justify-center pt-2">
          <TextRevealCard
            text="Intuition & Heuristics // 64% Recall"
            revealText="Empirical Rigor // 93.4% Recall"
            className="w-full max-w-4xl bg-[#080a12] border-white/[0.08] hud-corner shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <TextRevealCardTitle className="font-mono text-cyan-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              DECISION BOUNDARY REVEAL
            </TextRevealCardTitle>
            <TextRevealCardDescription className="text-zinc-400 font-sans text-xs">
              Hover or drag across the boundary to reveal how mathematical cross-validation replaces speculative engineering.
            </TextRevealCardDescription>
          </TextRevealCard>
        </div>
      </div>
    </section>
  );
}
