"use client";

import React, { useState } from "react";
import { Play, Code, CheckCircle, Cpu, Zap, Activity, Layers, ArrowRight, ShieldCheck } from "lucide-react";
import { playClick, playChirp, playSuccess } from "@/lib/audio";

export function InteractiveLabPrototypes() {
  // EXP 01 state: Kalman Filter
  const [kalmanStep, setKalmanStep] = useState(0);
  const kalmanSteps = [
    { state: "State: [x=120.4, y=45.2, vx=14.2, vy=-2.1]", cov: "P = diag([0.05, 0.05, 0.2, 0.2])", status: "Camera tracking active (100% visibility)" },
    { state: "Sensor Occlusion: [Camera Frame Drop @ t=200ms]", cov: "Covariance prediction: P = F·P·Fᵀ + Q", status: "Missing observation — invoking state-space prediction" },
    { state: "Interpolated: [x=148.8, y=41.0, vx=14.0, vy=-2.0]", cov: "Residual: ỹ = z - Hx̂ = 0.012", status: "Kalman Gain K calibrated — trajectory smoothly bridged" }
  ];

  // EXP 02 state: TreeSHAP
  const [shapRunning, setShapRunning] = useState(false);
  const [shapDone, setShapDone] = useState(false);

  // EXP 03 state: INT8 Quantization
  const [isQuantized, setIsQuantized] = useState(false);

  const runKalman = () => {
    playClick();
    setKalmanStep((prev) => (prev + 1) % kalmanSteps.length);
    playChirp();
  };

  const runShap = () => {
    playClick();
    setShapRunning(true);
    setShapDone(false);
    setTimeout(() => {
      setShapRunning(false);
      setShapDone(true);
      playSuccess();
    }, 450);
  };

  const toggleQuant = () => {
    playClick();
    setIsQuantized(!isQuantized);
    playChirp();
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
        <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <span>03 // REPOSITORIES & EXPERIMENTAL MICRO-PROJECTS</span>
        </div>
        <span className="text-[11px] text-zinc-500">3 Interactive Production Kernels</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* EXP 01 */}
        <div className="p-6 rounded-xl border border-cyan-500/20 bg-[#090c14] space-y-4 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 font-bold text-[10px]">
                EXP 01
              </span>
              <span className="text-[11px] text-zinc-400">NumPy · State-Space</span>
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">
              Vectorized Kalman Filter Tracker
            </h3>
            <p className="text-xs font-sans text-zinc-400 leading-relaxed">
              Linear discrete-time stochastic estimation to interpolate occluded object centroids through 200ms sensor blackout drops.
            </p>

            {/* Interactive widget */}
            <div className="p-3 rounded bg-black/60 border border-white/[0.06] space-y-1.5 text-[11px]">
              <div className="text-cyan-400 font-semibold">{kalmanSteps[kalmanStep].status}</div>
              <div className="text-zinc-300 font-mono">{kalmanSteps[kalmanStep].state}</div>
              <div className="text-[10px] text-zinc-500">{kalmanSteps[kalmanStep].cov}</div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <button
              onClick={runKalman}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500 text-black font-bold text-[11px] hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3" />
              <span>STEP FILTER ({kalmanStep + 1}/3)</span>
            </button>
            <span className="text-[10px] text-zinc-500">σ² = 0.041</span>
          </div>
        </div>

        {/* EXP 02 */}
        <div className="p-6 rounded-xl border border-emerald-500/20 bg-[#090c14] space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                EXP 02
              </span>
              <span className="text-[11px] text-zinc-400">Cython · TreeSHAP</span>
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">
              TreeSHAP Acceleration Kernel
            </h3>
            <p className="text-xs font-sans text-zinc-400 leading-relaxed">
              Exact Shapley additive feature attribution optimized via recursive subtree pruning over 50,000 tabular instances.
            </p>

            {/* Interactive widget */}
            <div className="p-3 rounded bg-black/60 border border-white/[0.06] space-y-2 text-[11px]">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Naive KernelSHAP:</span>
                <span className="text-red-400 font-bold">124.0 ms</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Optimized TreeSHAP:</span>
                <span className="text-emerald-400 font-bold">8.4 ms</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full transition-all duration-500"
                  style={{ width: shapDone ? "100%" : shapRunning ? "50%" : "20%" }}
                />
              </div>
              <div className="text-[10px] text-zinc-500">
                {shapDone ? "Benchmark: 14.7× Speedup Verified!" : "Click benchmark to profile speedup"}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <button
              onClick={runShap}
              disabled={shapRunning}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-500 text-black font-bold text-[11px] hover:bg-emerald-400 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-3 h-3" />
              <span>{shapRunning ? "PROFILING..." : "BENCHMARK SHAP"}</span>
            </button>
            <span className="text-[10px] text-emerald-400 font-bold">14.7× GAIN</span>
          </div>
        </div>

        {/* EXP 03 */}
        <div className="p-6 rounded-xl border border-purple-500/20 bg-[#090c14] space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-colors shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="px-2 py-0.5 rounded bg-purple-950/40 text-purple-400 border border-purple-500/30 font-bold text-[10px]">
                EXP 03
              </span>
              <span className="text-[11px] text-zinc-400">ONNX · TensorRT</span>
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">
              INT8 Quantization Benchmark
            </h3>
            <p className="text-xs font-sans text-zinc-400 leading-relaxed">
              Post-training asymmetric calibration mapping FP32 tensors to 8-bit integers with minimal accuracy degradation.
            </p>

            {/* Interactive widget */}
            <div className="p-3 rounded bg-black/60 border border-white/[0.06] space-y-2 text-[11px]">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Precision Format:</span>
                <span className={isQuantized ? "text-purple-400 font-bold" : "text-cyan-400 font-bold"}>
                  {isQuantized ? "INT8 Symmetric" : "FP32 Single-Precision"}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>VRAM Footprint:</span>
                <span className="text-white font-bold">{isQuantized ? "42.1 MB (-75%)" : "168.4 MB"}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Inference Latency:</span>
                <span className="text-emerald-400 font-bold">{isQuantized ? "7.8 ms" : "28.4 ms"}</span>
              </div>
              <div className="text-[10px] text-zinc-500">
                Accuracy Delta: {isQuantized ? "-0.14% mAP (Imperceptible)" : "Baseline 100%"}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <button
              onClick={toggleQuant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-purple-500 text-white font-bold text-[11px] hover:bg-purple-400 transition-colors cursor-pointer"
            >
              <Cpu className="w-3 h-3" />
              <span>{isQuantized ? "REVERT TO FP32" : "QUANTIZE TO INT8"}</span>
            </button>
            <span className="text-[10px] text-purple-300 font-bold">-75% RAM</span>
          </div>
        </div>
      </div>

      {/* High-Assurance Architectural Systems & Repositories */}
      <div className="pt-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>04 // HIGH-ASSURANCE SYSTEMS & ARCHITECTURAL BENCHMARKS</span>
          </div>
          <span className="text-[11px] text-zinc-500">Rigorous Test Suites &amp; Clean Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Anuj AI Lab */}
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#070a12] space-y-3 hover:border-cyan-400/40 transition-all group">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                419 TESTS (100% PASS)
              </span>
              <a
                href="https://github.com/anujmundu/anuj-ai-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
              >
                <span>SOURCE REPO</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Anuj AI Lab — Local Agentic Platform
              </h4>
              <p className="text-xs font-sans text-zinc-400 mt-1 leading-relaxed">
                Production-grade local AI engineering platform for agentic RAG, semantic retrieval, conversation memory, and autonomous tool-calling workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px] text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">FastAPI</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">React 19</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">TypeScript 5</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">Ollama</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">ChromaDB</span>
            </div>
          </div>

          {/* RF Signal Classification */}
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#070a12] space-y-3 hover:border-emerald-400/40 transition-all group">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                128 TESTS (100% PASS)
              </span>
              <a
                href="https://github.com/anujmundu/rf-signal-classification-spectrograms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
              >
                <span>SOURCE REPO</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                RF Signal Classification &amp; AMC Suite
              </h4>
              <p className="text-xs font-sans text-zinc-400 mt-1 leading-relaxed">
                Clean Architecture deep learning framework for Automatic Modulation Classification (AMC) across noisy wireless channels (Rayleigh fading &amp; AWGN).
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px] text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">PyTorch</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">SciPy Signal</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">I/Q Spectrograms</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">Ray / Optuna</span>
            </div>
          </div>

          {/* Maritime FuelEU */}
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#070a12] space-y-3 hover:border-purple-400/40 transition-all group">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                HEXAGONAL ARCHITECTURE
              </span>
              <a
                href="https://github.com/anujmundu/Maritime-FuelEU"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
              >
                <span>SOURCE REPO</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                FuelEU Maritime Decarbonization Platform
              </h4>
              <p className="text-xs font-sans text-zinc-400 mt-1 leading-relaxed">
                Full-stack maritime compliance ledger calculating route GHG intensity, Compliance Balance (CB), and Articles 20/21 banking and pooling.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px] text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">TypeScript</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">Node.js</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">PostgreSQL</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">Prisma ORM</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">React</span>
            </div>
          </div>

          {/* Distributed Hyperparameter Tuner */}
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#070a12] space-y-3 hover:border-amber-400/40 transition-all group">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                RABBITMQ + POSTGRESQL
              </span>
              <a
                href="https://github.com/anujmundu/distributed-hyperparameter-tuner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
              >
                <span>SOURCE REPO</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                Distributed Hyperparameter Tuning Framework
              </h4>
              <p className="text-xs font-sans text-zinc-400 mt-1 leading-relaxed">
                Decoupled scheduler-worker architecture distributing intensive hyperparameter trials across worker nodes with durable queues and fault tolerance.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px] text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">RabbitMQ</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">PostgreSQL</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">Docker</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">PyTorch</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">Scikit-Learn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
