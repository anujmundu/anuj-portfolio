"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Play, FastForward, RotateCcw, TrendingDown, CheckCircle2, ShieldCheck } from "lucide-react";
import { playClick, playChirp, playSuccess } from "@/lib/audio";

interface EpochData {
  epoch: number;
  loss: number;
  valAcc: number;
  gradNorm: number;
}

const INITIAL_DATA: EpochData[] = [
  { epoch: 1, loss: 1.84, valAcc: 48.2, gradNorm: 3.42 },
  { epoch: 2, loss: 1.12, valAcc: 68.5, gradNorm: 1.85 },
  { epoch: 3, loss: 0.64, valAcc: 83.1, gradNorm: 0.94 }
];

export function InteractiveTrainingConvergence() {
  const [history, setHistory] = useState<EpochData[]>(INITIAL_DATA);
  const [optimizer, setOptimizer] = useState<"AdamW" | "Lion" | "SGD">("AdamW");
  const [lossFn, setLossFn] = useState<"Cross-Entropy" | "Focal Loss" | "InfoNCE">("Focal Loss");
  const [isTraining, setIsTraining] = useState(false);
  const [converged, setConverged] = useState(false);

  const currentStep = history[history.length - 1];

  const runSingleEpoch = () => {
    if (history.length >= 10) return;
    playClick();
    const nextEpoch = history.length + 1;
    const prev = currentStep;

    const decayFactor = optimizer === "Lion" ? 0.42 : optimizer === "AdamW" ? 0.52 : 0.65;
    const nextLoss = Number(Math.max(0.04, prev.loss * decayFactor - 0.01).toFixed(3));
    const nextAcc = Number(Math.min(99.6, prev.valAcc + (100 - prev.valAcc) * (1 - decayFactor) * 0.9).toFixed(1));
    const nextGrad = Number(Math.max(0.02, prev.gradNorm * 0.55).toFixed(2));

    setHistory((prevH) => [
      ...prevH,
      { epoch: nextEpoch, loss: nextLoss, valAcc: nextAcc, gradNorm: nextGrad }
    ]);

    if (nextLoss <= 0.08 || nextEpoch >= 8) {
      setConverged(true);
      playSuccess();
    } else {
      playChirp();
    }
  };

  const autoTrain = () => {
    setIsTraining(true);
    let count = 0;
    const maxSteps = 7;

    const interval = setInterval(() => {
      count++;
      setHistory((prevH) => {
        if (prevH.length >= 10) {
          clearInterval(interval);
          setIsTraining(false);
          setConverged(true);
          playSuccess();
          return prevH;
        }

        const last = prevH[prevH.length - 1];
        const nextEpoch = prevH.length + 1;
        const decayFactor = optimizer === "Lion" ? 0.38 : 0.48;
        const nextLoss = Number(Math.max(0.035, last.loss * decayFactor).toFixed(3));
        const nextAcc = Number(Math.min(99.5, last.valAcc + (100 - last.valAcc) * 0.55).toFixed(1));
        const nextGrad = Number(Math.max(0.01, last.gradNorm * 0.5).toFixed(2));

        playChirp();
        return [
          ...prevH,
          { epoch: nextEpoch, loss: nextLoss, valAcc: nextAcc, gradNorm: nextGrad }
        ];
      });

      if (count >= maxSteps) {
        clearInterval(interval);
        setIsTraining(false);
        setConverged(true);
        playSuccess();
      }
    }, 280);
  };

  const resetWeights = () => {
    playClick();
    setHistory(INITIAL_DATA);
    setConverged(false);
    setIsTraining(false);
  };

  // SVG Chart Calculations
  const chartWidth = 500;
  const chartHeight = 160;
  const maxEpoch = 10;
  const maxLoss = 2.0;

  const pointsLoss = history
    .map((d) => {
      const x = ((d.epoch - 1) / (maxEpoch - 1)) * (chartWidth - 40) + 20;
      const y = chartHeight - 25 - (d.loss / maxLoss) * (chartHeight - 45);
      return `${x},${y}`;
    })
    .join(" ");

  const pointsAcc = history
    .map((d) => {
      const x = ((d.epoch - 1) / (maxEpoch - 1)) * (chartWidth - 40) + 20;
      const y = chartHeight - 25 - (d.valAcc / 100) * (chartHeight - 45);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-[#080b12] p-6 sm:p-8 font-mono space-y-8 relative overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>02 // LIVE LOSS CONVERGENCE & OPTIMIZER TESTBED</span>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1 max-w-xl">
            Simulate PyTorch gradient descent dynamics under varied optimizer kernels and objective penalty criteria. Step through epochs to observe asymptotic loss descent and accuracy saturation.
          </p>
        </div>

        {/* Status chip */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-xs text-emerald-300 self-start lg:self-auto">
          {converged ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>OPTIMUM CONVERGENCE REACHED</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>STEP {currentStep.epoch} / 10 ACTIVE</span>
            </>
          )}
        </div>
      </div>

      {/* Controls Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Optimizer selection */}
        <div className="space-y-2">
          <label className="text-zinc-400 uppercase tracking-wider text-[11px] font-bold">
            Optimizer Algorithm
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(["AdamW", "Lion", "SGD"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  playClick();
                  setOptimizer(opt);
                }}
                className={`px-2 py-1.5 rounded border text-center font-bold transition-all cursor-pointer ${
                  optimizer === opt
                    ? "border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    : "border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-zinc-500 pt-1">
            {optimizer === "Lion" ? "EvoLved Sign Momentum (AutoML)" : optimizer === "AdamW" ? "Decoupled Weight Decay Adam" : "Classic SGD + Nesterov (0.9)"}
          </p>
        </div>

        {/* Loss Function selection */}
        <div className="space-y-2">
          <label className="text-zinc-400 uppercase tracking-wider text-[11px] font-bold">
            Loss Criterion L(θ)
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(["Cross-Entropy", "Focal Loss", "InfoNCE"] as const).map((fn) => (
              <button
                key={fn}
                onClick={() => {
                  playClick();
                  setLossFn(fn);
                }}
                className={`px-1.5 py-1.5 rounded border text-center text-[11px] font-bold transition-all cursor-pointer truncate ${
                  lossFn === fn
                    ? "border-cyan-400 bg-cyan-500/10 text-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                    : "border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {fn}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-zinc-500 pt-1">
            {lossFn === "Focal Loss" ? "Down-weights easy negatives (γ=2.0)" : lossFn === "InfoNCE" ? "Self-supervised contrastive anchor" : "Multinomial Logistic + 0.1 label smooth"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <label className="text-zinc-400 uppercase tracking-wider text-[11px] font-bold">
            Training Dispatch
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={runSingleEpoch}
              disabled={isTraining || history.length >= 10}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors shadow-[0_0_12px_rgba(16,185,129,0.3)] disabled:opacity-40 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>STEP 1 EPOCH</span>
            </button>

            <button
              onClick={autoTrain}
              disabled={isTraining || converged}
              className="px-3 py-2 rounded border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-400 hover:text-black font-bold text-xs transition-colors disabled:opacity-40 cursor-pointer"
              title="Auto-train until convergence"
            >
              <FastForward className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={resetWeights}
              className="px-2.5 py-2 rounded border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
              title="Reset weights to initial state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Telemetry Dashboard & Live SVG Convergence Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Dynamic SVG Plot */}
        <div className="lg:col-span-8 p-4 rounded-xl border border-white/[0.06] bg-zinc-950/70 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span className="w-2.5 h-0.5 bg-amber-400 inline-block" />
                Training Loss: {currentStep.loss}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" />
                Val Accuracy: {currentStep.valAcc}%
              </span>
            </div>
            <span className="text-zinc-500 text-[10px]">Max Epoch: 10</span>
          </div>

          <div className="relative w-full h-[160px] bg-black/50 rounded border border-white/[0.04] overflow-hidden p-2">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
            >
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
                <line
                  key={i}
                  x1="20"
                  y1={chartHeight - 25 - p * (chartHeight - 45)}
                  x2={chartWidth - 20}
                  y2={chartHeight - 25 - p * (chartHeight - 45)}
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="3 3"
                />
              ))}

              {/* Loss Curve (Amber) */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsLoss}
              />

              {/* Accuracy Curve (Emerald) */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsAcc}
              />

              {/* Points */}
              {history.map((d, idx) => {
                const x = ((d.epoch - 1) / (maxEpoch - 1)) * (chartWidth - 40) + 20;
                const yLoss = chartHeight - 25 - (d.loss / maxLoss) * (chartHeight - 45);
                const yAcc = chartHeight - 25 - (d.valAcc / 100) * (chartHeight - 45);
                return (
                  <g key={idx}>
                    <circle cx={x} cy={yLoss} r="3.5" fill="#f59e0b" />
                    <circle cx={x} cy={yAcc} r="3.5" fill="#10b981" />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
            <span>Epoch 1 (Cold Start)</span>
            <span>Epoch 5 (Inflection)</span>
            <span>Epoch 10 (Convergence)</span>
          </div>
        </div>

        {/* Numerical Gauges */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-3 font-mono">
          <div className="p-3 rounded-xl border border-white/[0.06] bg-zinc-950/60">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Training Loss</div>
            <div className="text-xl font-extrabold text-amber-400 mt-1">{currentStep.loss}</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Asymptotic L2 bound</div>
          </div>

          <div className="p-3 rounded-xl border border-white/[0.06] bg-zinc-950/60">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Val Accuracy</div>
            <div className="text-xl font-extrabold text-emerald-400 mt-1">{currentStep.valAcc}%</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Hold-out test set</div>
          </div>

          <div className="p-3 rounded-xl border border-white/[0.06] bg-zinc-950/60">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Gradient ||g||</div>
            <div className="text-lg font-bold text-cyan-400 mt-1">{currentStep.gradNorm}</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Clipping threshold: 1.0</div>
          </div>

          <div className="p-3 rounded-xl border border-white/[0.06] bg-zinc-950/60">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">LR Schedule</div>
            <div className="text-lg font-bold text-purple-400 mt-1">Cosine</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Warmup: 300 steps</div>
          </div>
        </div>
      </div>

      {converged && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/20 flex items-center justify-between gap-4 text-xs font-mono text-emerald-300"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>MODEL CONVERGENCE VALIDATED: Model reached 99%+ accuracy with gradient norm &lt; 0.05. Ready for TensorRT export!</span>
          </div>
          <button
            onClick={resetWeights}
            className="px-3 py-1 rounded bg-emerald-500 text-black font-bold text-[11px] hover:bg-emerald-400 transition-colors cursor-pointer shrink-0"
          >
            RE-RUN TEST
          </button>
        </motion.div>
      )}
    </div>
  );
}
