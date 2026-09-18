"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Grid, Eye, Cpu, Zap, Activity, Info, Sparkles } from "lucide-react";
import { playClick, playChirp } from "@/lib/audio";

type KernelType = "sobel_h" | "sobel_v" | "laplacian" | "ridge" | "sharpen" | "blur";
type InputPattern = "edge" | "box" | "cross" | "gradient";
type ActivationType = "relu" | "gelu" | "identity";

const KERNELS: Record<KernelType, { name: string; matrix: number[][]; desc: string }> = {
  sobel_h: {
    name: "Sobel Horizontal (dx)",
    matrix: [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
    ],
    desc: "Calculates horizontal spatial gradient; detects vertical structural edges."
  },
  sobel_v: {
    name: "Sobel Vertical (dy)",
    matrix: [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1]
    ],
    desc: "Calculates vertical spatial gradient; highlights horizontal surface transitions."
  },
  laplacian: {
    name: "Laplacian 2nd Derivative",
    matrix: [
      [0, 1, 0],
      [1, -4, 1],
      [0, 1, 0]
    ],
    desc: "Isotropic 2nd-order differential operator for zero-crossing edge localization."
  },
  ridge: {
    name: "Ridge Detection Kernel",
    matrix: [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1]
    ],
    desc: "High-pass spatial frequency mask for isolated defect detection."
  },
  sharpen: {
    name: "Spatial Sharpening",
    matrix: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0]
    ],
    desc: "Emphasizes high-frequency feature contrasts and micro-textures."
  },
  blur: {
    name: "Gaussian Smoothing",
    matrix: [
      [1, 2, 1],
      [2, 4, 2],
      [1, 2, 1]
    ],
    desc: "Low-pass spatial filter; attenuates high-frequency sensor noise."
  }
};

const INPUT_PATTERNS: Record<InputPattern, { name: string; matrix: number[][] }> = {
  edge: {
    name: "Sharp Vertical Edge",
    matrix: [
      [0.1, 0.1, 0.1, 0.9, 0.9, 0.9, 0.9],
      [0.1, 0.1, 0.1, 0.9, 0.9, 0.9, 0.9],
      [0.1, 0.1, 0.1, 0.9, 0.9, 0.9, 0.9],
      [0.1, 0.1, 0.1, 0.9, 0.9, 0.9, 0.9],
      [0.1, 0.1, 0.1, 0.9, 0.9, 0.9, 0.9],
      [0.1, 0.1, 0.1, 0.9, 0.9, 0.9, 0.9],
      [0.1, 0.1, 0.1, 0.9, 0.9, 0.9, 0.9]
    ]
  },
  box: {
    name: "Bounding Box Defect",
    matrix: [
      [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
      [0.1, 0.8, 0.8, 0.8, 0.8, 0.8, 0.1],
      [0.1, 0.8, 0.2, 0.2, 0.2, 0.8, 0.1],
      [0.1, 0.8, 0.2, 0.9, 0.2, 0.8, 0.1],
      [0.1, 0.8, 0.2, 0.2, 0.2, 0.8, 0.1],
      [0.1, 0.8, 0.8, 0.8, 0.8, 0.8, 0.1],
      [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
    ]
  },
  cross: {
    name: "Central Feature Cross",
    matrix: [
      [0.1, 0.1, 0.1, 0.9, 0.1, 0.1, 0.1],
      [0.1, 0.1, 0.1, 0.9, 0.1, 0.1, 0.1],
      [0.1, 0.1, 0.1, 0.9, 0.1, 0.1, 0.1],
      [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
      [0.1, 0.1, 0.1, 0.9, 0.1, 0.1, 0.1],
      [0.1, 0.1, 0.1, 0.9, 0.1, 0.1, 0.1],
      [0.1, 0.1, 0.1, 0.9, 0.1, 0.1, 0.1]
    ]
  },
  gradient: {
    name: "Diagonal Ramp",
    matrix: [
      [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
      [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
      [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0],
      [0.6, 0.7, 0.8, 0.9, 1.0, 1.0, 1.0],
      [0.7, 0.8, 0.9, 1.0, 1.0, 1.0, 1.0]
    ]
  }
};

export function InteractiveConvolutionPlayground() {
  const [selectedKernel, setSelectedKernel] = useState<KernelType>("sobel_h");
  const [selectedInput, setSelectedInput] = useState<InputPattern>("edge");
  const [activation, setActivation] = useState<ActivationType>("relu");
  const [hoveredOutputCell, setHoveredOutputCell] = useState<{ r: number; c: number } | null>(null);

  const inputMatrix = INPUT_PATTERNS[selectedInput].matrix;
  const kernel = KERNELS[selectedKernel];

  // Compute 2D Convolution Output: size = (7 - 3 + 1) = 5x5
  const outputMatrix = useMemo(() => {
    const out: number[][] = [];
    const kMat = kernel.matrix;
    const isBlur = selectedKernel === "blur";
    const normalizer = isBlur ? 16 : 1;

    for (let r = 0; r <= inputMatrix.length - 3; r++) {
      const row: number[] = [];
      for (let c = 0; c <= inputMatrix[0].length - 3; c++) {
        let sum = 0;
        for (let kr = 0; kr < 3; kr++) {
          for (let kc = 0; kc < 3; kc++) {
            sum += inputMatrix[r + kr][c + kc] * kMat[kr][kc];
          }
        }
        let val = sum / normalizer;

        // Apply activation
        if (activation === "relu") {
          val = Math.max(0, val);
        } else if (activation === "gelu") {
          val = 0.5 * val * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (val + 0.044715 * Math.pow(val, 3))));
        }

        row.push(Number(val.toFixed(2)));
      }
      out.push(row);
    }
    return out;
  }, [inputMatrix, kernel, selectedKernel, activation]);

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#080b12] p-6 sm:p-8 font-mono space-y-8 relative overflow-hidden shadow-2xl">
      {/* Header telemetry */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>01 // INTERACTIVE CONVOLUTION & KERNEL ENGINE</span>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1 max-w-xl">
            Real-time 2D spatial cross-correlation testbed. Select an input signal tensor and convolution kernel to inspect feature map activations and receptive field projections.
          </p>
        </div>

        {/* Telemetry pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-xs text-cyan-300 self-start lg:self-auto">
          <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>OUTPUT RESOLUTION: 5×5 TENSOR</span>
        </div>
      </div>

      {/* Control Switches */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Input Signal Selector */}
        <div className="space-y-2">
          <label className="text-zinc-400 uppercase tracking-wider text-[11px] font-bold flex items-center gap-1.5">
            <Grid className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Input Signal (7×7)</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {(Object.keys(INPUT_PATTERNS) as InputPattern[]).map((patternKey) => (
              <button
                key={patternKey}
                onClick={() => {
                  playClick();
                  setSelectedInput(patternKey);
                }}
                className={`px-2.5 py-1.5 rounded border text-left transition-all cursor-pointer truncate ${
                  selectedInput === patternKey
                    ? "border-amber-400 bg-amber-500/10 text-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                    : "border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {INPUT_PATTERNS[patternKey].name}
              </button>
            ))}
          </div>
        </div>

        {/* 3x3 Kernel Selector */}
        <div className="space-y-2">
          <label className="text-zinc-400 uppercase tracking-wider text-[11px] font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>2. 3×3 Conv Kernel</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {(Object.keys(KERNELS) as KernelType[]).map((kKey) => (
              <button
                key={kKey}
                onClick={() => {
                  playClick();
                  setSelectedKernel(kKey);
                }}
                className={`px-2.5 py-1.5 rounded border text-left transition-all cursor-pointer truncate ${
                  selectedKernel === kKey
                    ? "border-cyan-400 bg-cyan-500/10 text-cyan-300 font-bold shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                    : "border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {KERNELS[kKey].name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Non-linear Activation Selector */}
        <div className="space-y-2">
          <label className="text-zinc-400 uppercase tracking-wider text-[11px] font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Non-Linear Activation σ(z)</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(["relu", "gelu", "identity"] as ActivationType[]).map((actKey) => (
              <button
                key={actKey}
                onClick={() => {
                  playClick();
                  setActivation(actKey);
                }}
                className={`px-2 py-1.5 rounded border text-center uppercase transition-all cursor-pointer ${
                  activation === actKey
                    ? "border-emerald-400 bg-emerald-500/10 text-emerald-300 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    : "border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {actKey}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-zinc-500 pt-1">
            {activation === "relu" ? "ReLU: f(x) = max(0, x)" : activation === "gelu" ? "GeLU: Smooth Gaussian probabilistic gating" : "Linear: Identity pass through"}
          </p>
        </div>
      </div>

      {/* Visualizer Computation Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Input Tensor Grid (7x7) */}
        <div className="lg:col-span-4 p-4 rounded-xl border border-white/[0.06] bg-zinc-950/60 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-400 font-bold">Input Tensor I (7×7)</span>
            <span className="text-[10px] text-zinc-500">Values: 0.0 - 1.0</span>
          </div>

          <div className="grid grid-cols-7 gap-1 p-1 bg-black/40 rounded border border-white/[0.04]">
            {inputMatrix.map((row, rIdx) =>
              row.map((val, cIdx) => {
                // Check if this cell is inside hovered receptive field
                const inReceptiveField =
                  hoveredOutputCell &&
                  rIdx >= hoveredOutputCell.r &&
                  rIdx <= hoveredOutputCell.r + 2 &&
                  cIdx >= hoveredOutputCell.c &&
                  cIdx <= hoveredOutputCell.c + 2;

                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`aspect-square rounded flex items-center justify-center text-[9px] transition-all ${
                      inReceptiveField
                        ? "border border-cyan-400 bg-cyan-400/40 text-white font-bold scale-105"
                        : "border border-white/[0.03] text-zinc-400"
                    }`}
                    style={{
                      backgroundColor: inReceptiveField
                        ? undefined
                        : `rgba(245, 158, 11, ${Math.max(0.08, val * 0.7)})`
                    }}
                  >
                    {val.toFixed(1)}
                  </div>
                );
              })
            )}
          </div>
          <p className="text-[10px] text-zinc-500">
            {hoveredOutputCell ? (
              <span className="text-cyan-400 font-bold">● Active 3×3 Receptive Field highlighted in cyan</span>
            ) : (
              "Hover any output cell on the right to project its 3×3 receptive field."
            )}
          </p>
        </div>

        {/* 3x3 Kernel Matrix Display */}
        <div className="lg:col-span-3 p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10 space-y-3 text-center">
          <div className="flex items-center justify-between text-xs">
            <span className="text-cyan-400 font-bold">Kernel K (3×3)</span>
            <span className="text-[10px] text-cyan-300">W(m,n)</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-2 bg-black/50 rounded border border-cyan-500/30 max-w-[160px] mx-auto">
            {kernel.matrix.map((kRow, krIdx) =>
              kRow.map((kVal, kcIdx) => (
                <div
                  key={`${krIdx}-${kcIdx}`}
                  className={`aspect-square rounded flex items-center justify-center text-xs font-bold ${
                    kVal > 0
                      ? "text-emerald-400 bg-emerald-950/40 border border-emerald-500/30"
                      : kVal < 0
                      ? "text-red-400 bg-red-950/40 border border-red-500/30"
                      : "text-zinc-500 bg-zinc-900 border border-zinc-800"
                  }`}
                >
                  {kVal}
                </div>
              ))
            )}
          </div>
          <p className="text-[11px] text-zinc-400 font-sans leading-tight">
            {kernel.desc}
          </p>
        </div>

        {/* Output Feature Map Tensor (5x5) */}
        <div className="lg:col-span-5 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-bold">Activated Feature Map (5×5)</span>
            <span className="text-[10px] text-emerald-300">σ(I * K)</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 p-2 bg-black/60 rounded border border-emerald-500/20">
            {outputMatrix.map((oRow, orIdx) =>
              oRow.map((oVal, ocIdx) => {
                const isHovered = hoveredOutputCell?.r === orIdx && hoveredOutputCell?.c === ocIdx;
                const normalized = Math.min(1, Math.max(0, oVal / 2.5));

                return (
                  <div
                    key={`${orIdx}-${ocIdx}`}
                    onMouseEnter={() => {
                      playChirp();
                      setHoveredOutputCell({ r: orIdx, c: ocIdx });
                    }}
                    onMouseLeave={() => setHoveredOutputCell(null)}
                    className={`aspect-square rounded flex flex-col items-center justify-center text-[10px] font-bold cursor-crosshair transition-all ${
                      isHovered
                        ? "border-2 border-white scale-110 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10"
                        : "border border-white/[0.08]"
                    }`}
                    style={{
                      backgroundColor: `rgba(16, 185, 129, ${Math.max(0.12, normalized)})`,
                      color: normalized > 0.4 ? "#ffffff" : "#6ee7b7"
                    }}
                  >
                    <span>{oVal}</span>
                  </div>
                );
              })
            )}
          </div>

          <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-1">
            <span>Hover cell to view receptive field</span>
            <span className="text-emerald-400 font-bold">60 FPS Real-time Math</span>
          </div>
        </div>
      </div>
    </div>
  );
}
