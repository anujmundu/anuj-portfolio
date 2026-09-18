"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { BarChart2, ShieldAlert, Sparkles, UserCheck } from "lucide-react";

interface ShapFeature {
  feature: string;
  impact: number; // positive increases churn risk, negative decreases
  value: string;
}

export function ShapWaterfallSim() {
  const [profile, setProfile] = useState<"high-risk" | "low-risk">("high-risk");

  const highRiskFeatures: ShapFeature[] = [
    { feature: "Support Escalations (30d)", impact: 0.32, value: "4 unresolved" },
    { feature: "Session Frequency Drop", impact: 0.24, value: "-48% vs avg" },
    { feature: "Payment Retry Failures", impact: 0.16, value: "2 occurrences" },
    { feature: "Account Age (Tenure)", impact: -0.08, value: "14 months" },
    { feature: "Contract Tier (Annual)", impact: -0.12, value: "Committed" }
  ];

  const lowRiskFeatures: ShapFeature[] = [
    { feature: "Contract Tier (Multi-Year)", impact: -0.34, value: "24-mo contract" },
    { feature: "Feature Adoption Breadth", impact: -0.26, value: "8 core tools" },
    { feature: "Active Daily Seats", impact: -0.18, value: "94% utilization" },
    { feature: "Payment Retries", impact: 0.04, value: "0 failures" },
    { feature: "Support Escalations", impact: 0.06, value: "1 minor ticket" }
  ];

  const currentFeatures = profile === "high-risk" ? highRiskFeatures : lowRiskFeatures;
  const baseValue = 0.15; // baseline population churn rate
  const totalImpact = currentFeatures.reduce((acc, f) => acc + f.impact, 0);
  const finalProbability = Math.max(0.02, Math.min(0.98, baseValue + totalImpact));

  return (
    <div className="rounded-lg border border-emerald-500/30 bg-[#06080d] p-4 font-mono text-[11px] space-y-3">
      {/* Header & Profile Switcher */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-zinc-400">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <BarChart2 className="w-3.5 h-3.5" />
          <span>SHAPLEY VALUE ATTRIBUTION ENGINE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setProfile("high-risk")}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
              profile === "high-risk"
                ? "bg-red-500/20 text-red-300 border border-red-500/40 font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            ACCOUNT A (HIGH RISK)
          </button>
          <button
            onClick={() => setProfile("low-risk")}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
              profile === "low-risk"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            ACCOUNT B (RETAINED)
          </button>
        </div>
      </div>

      {/* Probability Result Pill */}
      <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/[0.05]">
        <div className="flex items-center gap-2">
          {profile === "high-risk" ? (
            <ShieldAlert className="w-4 h-4 text-red-400" />
          ) : (
            <UserCheck className="w-4 h-4 text-emerald-400" />
          )}
          <span className="text-zinc-300">
            PREDICTED CHURN HAZARD:
          </span>
        </div>
        <span
          className={`text-sm font-extrabold ${
            profile === "high-risk" ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {(finalProbability * 100).toFixed(1)}%
        </span>
      </div>

      {/* SHAP Waterfall Bars */}
      <div className="space-y-1.5 pt-1">
        {currentFeatures.map((f, i) => {
          const isPositive = f.impact > 0;
          const barWidth = Math.abs(f.impact) * 220;

          return (
            <div key={f.feature} className="space-y-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-zinc-300">{f.feature}</span>
                <span className="text-zinc-500">[{f.value}]</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className={`h-full rounded-full ${
                      isPositive
                        ? "bg-gradient-to-r from-red-500 to-amber-500"
                        : "bg-gradient-to-r from-emerald-500 to-teal-400"
                    }`}
                  />
                </div>
                <span
                  className={`w-12 text-right font-bold text-[10px] ${
                    isPositive ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {(f.impact * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[9px] text-zinc-500">
        <span>Model: XGBoost CalibratedClassifierCV</span>
        <span className="text-emerald-400">TreeSHAP Exact Solution</span>
      </div>
    </div>
  );
}
