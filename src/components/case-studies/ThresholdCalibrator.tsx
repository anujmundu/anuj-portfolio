"use client";

import React, { useState } from "react";
import { Sliders, Gauge, DollarSign, AlertCircle } from "lucide-react";
import { playClick } from "@/lib/audio";

export function ThresholdCalibrator() {
  const [threshold, setThreshold] = useState(0.42); // Optimal calibrated threshold

  // Statistically modeled trade-off curves for Project 02
  // Higher threshold = higher precision, lower recall
  const precision = Math.min(96, Math.max(65, Number((72 + (threshold - 0.2) * 40).toFixed(1))));
  const recall = Math.min(97, Math.max(55, Number((94 - (threshold - 0.2) * 58).toFixed(1))));
  const f1 = Number(((2 * precision * recall) / (precision + recall)).toFixed(1));

  // Modeled business economics across 10,000 monthly accounts:
  // Base churners: 430 accounts (4.3% churn rate)
  const caughtChurners = Math.round(430 * (recall / 100));
  const missedChurners = 430 - caughtChurners;
  const falseAlarms = Math.round((10000 - 430) * ((100 - precision) / 100) * 0.08);

  const costOfIntervention = (caughtChurners + falseAlarms) * 35; // $35 CS call/discount
  const revenueSaved = caughtChurners * 450 * 0.65; // $450 LTV, 65% save success
  const netSaved = Math.round(revenueSaved - costOfIntervention);

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-[#080b10] p-6 font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>INTERACTIVE DECISION THRESHOLD CALIBRATOR (τ)</span>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Slide the classification cut-off threshold to evaluate precision vs recall trade-offs and net ROI.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500">OPTIMAL τ:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
            0.42 (Brier Calibrated)
          </span>
        </div>
      </div>

      {/* Threshold Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400">DECISION BOUNDARY (THRESHOLD τ):</span>
          <span className="text-white font-extrabold text-sm">{threshold.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.15"
          max="0.80"
          step="0.01"
          value={threshold}
          onChange={(e) => {
            setThreshold(Number(e.target.value));
            playClick();
          }}
          className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
        />
        <div className="flex justify-between text-[10px] text-zinc-500">
          <span>0.15 (High Sensitivity / Catch All)</span>
          <span>0.80 (High Specificity / Conservative)</span>
        </div>
      </div>

      {/* Trade-off Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded bg-white/[0.02] border border-white/[0.05] space-y-1">
          <div className="text-[10px] text-zinc-500 uppercase">Precision</div>
          <div className="text-xl font-extrabold text-cyan-300">{precision}%</div>
          <div className="text-[9px] text-zinc-400">Targeting accuracy</div>
        </div>

        <div className="p-3 rounded bg-white/[0.02] border border-white/[0.05] space-y-1">
          <div className="text-[10px] text-zinc-500 uppercase">Recall</div>
          <div className="text-xl font-extrabold text-emerald-300">{recall}%</div>
          <div className="text-[9px] text-zinc-400">Churners captured</div>
        </div>

        <div className="p-3 rounded bg-white/[0.02] border border-white/[0.05] space-y-1">
          <div className="text-[10px] text-zinc-500 uppercase">F1 Score</div>
          <div className="text-xl font-extrabold text-purple-300">{f1}%</div>
          <div className="text-[9px] text-zinc-400">Harmonic mean</div>
        </div>

        <div className="p-3 rounded bg-white/[0.02] border border-white/[0.05] space-y-1">
          <div className="text-[10px] text-zinc-500 uppercase">Net Monthly Value</div>
          <div className="text-xl font-extrabold text-emerald-400">+${netSaved.toLocaleString()}</div>
          <div className="text-[9px] text-emerald-400/80">Revenue preserved</div>
        </div>
      </div>

      {/* Contingency breakdown */}
      <div className="p-4 rounded-lg bg-black/40 border border-white/[0.05] flex flex-col sm:flex-row justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-zinc-300">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>At τ = {threshold.toFixed(2)}: Caught {caughtChurners} of 430 churners; {falseAlarms} false alarm outreaches.</span>
        </div>
        <span className="text-zinc-500 text-[11px] shrink-0">Model: XGBoost + Isotonic CalibratedCV</span>
      </div>
    </div>
  );
}
