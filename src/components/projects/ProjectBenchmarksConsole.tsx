"use client";

import React, { useState } from "react";
import { Cpu, CheckCircle2, TrendingUp, Gauge, ArrowUpRight } from "lucide-react";
import { ProjectMetric, CaseStudy } from "@/data/projects";

interface ProjectBenchmarksConsoleProps {
  project: CaseStudy;
}

export function ProjectBenchmarksConsole({ project }: ProjectBenchmarksConsoleProps) {
  const [selectedMetric, setSelectedMetric] = useState<number>(0);

  return (
    <div className="rounded-lg border border-emerald-500/20 bg-[#06080e]/95 p-4 font-mono text-[11px] space-y-4">
      {/* Console Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-zinc-400">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <Gauge className="w-3.5 h-3.5 animate-pulse" />
          <span>EMPIRICAL TELEMETRY & SLA TARGETS</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>100% AUDITED</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {project.metrics.map((metric, idx) => {
          const isSelected = selectedMetric === idx;
          return (
            <div
              key={metric.label}
              onClick={() => setSelectedMetric(idx)}
              className={`p-3 rounded-md border transition-all cursor-pointer ${
                isSelected
                  ? "bg-emerald-500/10 border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.15)] ring-1 ring-emerald-400/20"
                  : "bg-white/[0.02] border-white/[0.05] hover:border-white/15 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between text-[9px] text-zinc-500 uppercase tracking-wider">
                <span>{metric.label}</span>
                {metric.change && (
                  <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5" />
                    {metric.change}
                  </span>
                )}
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {metric.value}
              </div>
              {metric.detail && (
                <div className="text-[10px] text-zinc-400 mt-1 line-clamp-1">
                  {metric.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Production Verification Status Strip */}
      <div className="p-3 rounded-md bg-[#04060a] border border-white/[0.06] space-y-1.5">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-zinc-500">PRIMARY EVALUATION METRIC:</span>
          <span className="text-emerald-400 font-bold">
            {project.evaluation?.primaryMetric || "Sustained Throughput"}
          </span>
        </div>
        {project.evaluation?.resultsSummary && (
          <p className="text-zinc-400 text-xs font-sans leading-relaxed">
            {project.evaluation.resultsSummary}
          </p>
        )}
      </div>
    </div>
  );
}
