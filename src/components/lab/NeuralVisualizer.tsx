"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, RotateCcw, Cpu, Sparkles } from "lucide-react";

export function NeuralVisualizer() {
  const [activeInput, setActiveInput] = useState<number | null>(0);
  const [inferring, setInferring] = useState(false);
  const [outputScore, setOutputScore] = useState<number>(0.924);

  // 4 Input nodes, 6 Hidden nodes, 2 Output nodes
  const inputs = [
    { label: "x₀: Bounding IoU", defaultVal: 0.88 },
    { label: "x₁: Edge Contrast", defaultVal: 0.74 },
    { label: "x₂: Motion Velocity", defaultVal: 0.42 },
    { label: "x₃: Feature Norm", defaultVal: 0.95 }
  ];

  const hiddenNodes = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    bias: (Math.sin(i + 1) * 0.5).toFixed(2)
  }));

  const outputs = [
    { label: "ŷ₁: Target Detected (True)", color: "text-emerald-400" },
    { label: "ŷ₀: Background False Alarm", color: "text-zinc-500" }
  ];

  const triggerInference = () => {
    setInferring(true);
    setTimeout(() => {
      setOutputScore(Number((0.89 + Math.random() * 0.08).toFixed(3)));
      setInferring(false);
    }, 600);
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0c0e15] p-6 sm:p-10 font-mono space-y-8">
      {/* Visualizer Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>INTERACTIVE DEEP NEURAL NETWORK VISUALIZER</span>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Hover input nodes or click simulate to observe forward feed-forward tensor activation propagation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerInference}
            disabled={inferring}
            className="flex items-center gap-2 px-4 py-2 rounded bg-cyan-400 text-black text-xs font-bold hover:bg-cyan-300 transition-colors shadow-[0_0_12px_rgba(0,229,255,0.3)] disabled:opacity-50 cursor-pointer"
            data-cursor="button"
          >
            <Play className={`w-3.5 h-3.5 ${inferring ? "animate-spin" : ""}`} />
            <span>{inferring ? "COMPUTING..." : "SIMULATE FORWARD PASS"}</span>
          </button>
        </div>
      </div>

      {/* Network Layers Diagram */}
      <div className="relative py-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Layer 1: Inputs */}
        <div className="space-y-3">
          <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-bold mb-2">
            [INPUT TENSORS: 4-D]
          </div>
          {inputs.map((inp, idx) => {
            const isHovered = activeInput === idx;
            return (
              <div
                key={inp.label}
                onMouseEnter={() => setActiveInput(idx)}
                className={`p-3 rounded border transition-all cursor-pointer text-xs ${
                  isHovered
                    ? "bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                    : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:border-zinc-700"
                }`}
                data-cursor="button"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{inp.label}</span>
                  <span className="text-cyan-400">{inp.defaultVal}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Layer 2: Hidden Dense Layer */}
        <div className="space-y-3">
          <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-bold mb-2">
            [HIDDEN DENSE (GELU): 6 NODES]
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {hiddenNodes.map((node) => (
              <div
                key={node.id}
                className={`p-3 rounded border text-center transition-all ${
                  inferring
                    ? "bg-emerald-500/20 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse"
                    : "bg-white/[0.02] border-white/[0.06] text-zinc-300"
                }`}
              >
                <div className="text-[10px] text-zinc-500">h_{node.id}</div>
                <div className="text-xs font-bold text-white mt-0.5">
                  b: {node.bias}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Layer 3: Softmax Probabilities */}
        <div className="space-y-4">
          <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-bold mb-2">
            [SOFTMAX PROBABILITY]
          </div>
          <div className="p-5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-300 font-bold">{outputs[0].label}</span>
              <span className="text-cyan-300 font-extrabold text-sm">
                {(outputScore * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${outputScore * 100}%` }}
                transition={{ duration: 0.4 }}
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
              />
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Class: High Confidence Detection</span>
              <span className="text-emerald-400">IoU Overlap &gt; 0.75</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-zinc-500 border-t border-white/[0.04] pt-4 flex flex-col sm:flex-row justify-between gap-2">
        <span>Framework: PyTorch Custom nn.Sequential with Cosine Learning Rate Schedule</span>
        <span className="text-cyan-400">Loss: Complete IoU (CIoU) + Binary Cross Entropy</span>
      </div>
    </div>
  );
}
