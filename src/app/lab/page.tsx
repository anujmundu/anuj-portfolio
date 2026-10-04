import React from "react";
import Link from "next/link";
import { ArrowLeft, FlaskConical, Sparkles, Cpu, Activity, Binary, Terminal } from "lucide-react";
import { NeuralVisualizer } from "@/components/lab/NeuralVisualizer";
import { AILabAssistant } from "@/components/lab/AILabAssistant";
import { ThreeNeuralLattice } from "@/components/lab/ThreeNeuralLattice";
import { InteractiveConvolutionPlayground } from "@/components/lab/InteractiveConvolutionPlayground";
import { InteractiveTrainingConvergence } from "@/components/lab/InteractiveTrainingConvergence";
import { InteractiveLabPrototypes } from "@/components/lab/InteractiveLabPrototypes";
import { GenerativeSignalCanvas } from "@/components/lab/GenerativeSignalCanvas";
import { FutureHorizons } from "@/components/lab/FutureHorizons";
import HeroScrollDemo from "@/components/ui/container-scroll-animation-demo";

export const metadata = {
  title: "AI Lab & Experiments | Anuj — AI/ML Engineer",
  description: "Interactive AI playground, deep neural network activation visualizer, 2D convolution kernel engine, and applied machine learning prototypes by Anuj."
};

export default function LabPage() {
  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-300 font-mono py-28 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO MAIN PORTFOLIO</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]">
            <FlaskConical className="w-4 h-4 animate-pulse" />
            <span>LAB STATION // LIVE INFERENCE SANDBOX</span>
          </div>
        </div>

        {/* Enhanced Lab Header with Reactor Core Telemetry */}
        <header className="space-y-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>// EXPERIMENTAL DIGITAL LABORATORY · CLUSTER 04</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white glow-cyan">
              APPLIED AI LAB
            </h1>
            <p className="max-w-3xl text-sm sm:text-base font-sans text-zinc-400 leading-relaxed">
              Where theoretical computer science and deep learning mathematics meet production systems engineering. An interactive cybernetic testbed for live tensor operations, dynamic loss convergence simulations, 3D lattice topological projections, and computational kernels.
            </p>
          </div>

          {/* Telemetry Micro-Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
            <div className="px-3 py-1 rounded border border-white/[0.08] bg-zinc-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-400">FRAMEWORK:</span>
              <span className="text-emerald-300 font-bold">PyTorch 2.5 + CUDA 12.6</span>
            </div>
            <div className="px-3 py-1 rounded border border-white/[0.08] bg-zinc-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-zinc-400">ACCELERATION:</span>
              <span className="text-cyan-300 font-bold">TensorRT 10.4 FP16</span>
            </div>
            <div className="px-3 py-1 rounded border border-white/[0.08] bg-zinc-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-zinc-400">ACTIVE EXPERIMENTS:</span>
              <span className="text-amber-300 font-bold">6 Interactive Modules</span>
            </div>
          </div>
        </header>

        {/* 01. 3D Neural Lattice in Motion */}
        <section className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>01 // 3D TOPOLOGICAL NEURAL LATTICE PROJECTION</span>
          </div>
          <ThreeNeuralLattice />
        </section>

        {/* 02. Interactive 2D Convolution & Kernel Playground */}
        <section className="space-y-4">
          <InteractiveConvolutionPlayground />
        </section>

        {/* 03. Live PyTorch Loss Convergence & Optimizer Sandbox */}
        <section className="space-y-4">
          <InteractiveTrainingConvergence />
        </section>

        {/* 04. Container Scroll Telemetry Screen */}
        <section className="space-y-4">
          <HeroScrollDemo />
        </section>

        {/* 05. Interactive Forward Propagation Tensor Activation Visualizer */}
        <section className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
            <Binary className="w-4 h-4 text-emerald-400" />
            <span>04 // FORWARD PROPAGATION TENSOR ACTIVATION</span>
          </div>
          <NeuralVisualizer />
        </section>

        {/* 06. Contextual AI Lab Assistant */}
        <section className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>05 // CONTEXTUAL SYSTEM ASSISTANT & KNOWLEDGE RETRIEVAL</span>
          </div>
          <AILabAssistant />
        </section>

        {/* 07. Interactive Experimental Micro-Projects Consoles */}
        <section className="space-y-4">
          <InteractiveLabPrototypes />
        </section>

        {/* 08. Generative Tech-Art DSP Spectrogram Canvas */}
        <section className="space-y-4">
          <GenerativeSignalCanvas />
        </section>

        {/* 09. Future Horizons: Agentic AI, Edge Quantization, and Decarbonization */}
        <section className="space-y-4">
          <FutureHorizons />
        </section>

        {/* Footer Navigation */}
        <div className="pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-white text-black font-bold text-xs hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO MAIN PORTFOLIO</span>
          </Link>

          <div className="text-xs text-zinc-500">
            ENGINEERED WITH RIGOR · ANUJ MUNDU // NIT BHOPAL
          </div>
        </div>
      </div>
    </div>
  );
}
