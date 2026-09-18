"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Cpu, Database, Server, Shield, Network, Zap } from "lucide-react";
import { ArchitectureNode } from "@/data/projects";

interface ProjectArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  overview?: string;
  accentColor?: string;
}

export function ProjectArchitectureDiagram({
  nodes,
  overview,
  accentColor = "cyan"
}: ProjectArchitectureDiagramProps) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);

  const getIcon = (idx: number, title: string) => {
    const t = title.toLowerCase();
    if (t.includes("api") || t.includes("gateway") || t.includes("security")) {
      return <Shield className="w-3.5 h-3.5 text-cyan-400" />;
    }
    if (t.includes("database") || t.includes("storage") || t.includes("vector")) {
      return <Database className="w-3.5 h-3.5 text-emerald-400" />;
    }
    if (t.includes("worker") || t.includes("mesh") || t.includes("queue") || t.includes("task")) {
      return <Network className="w-3.5 h-3.5 text-purple-400" />;
    }
    if (t.includes("inference") || t.includes("model") || t.includes("core")) {
      return <Cpu className="w-3.5 h-3.5 text-amber-400" />;
    }
    return <Server className="w-3.5 h-3.5 text-cyan-300" />;
  };

  const activeNode = nodes[selectedNodeIndex] || nodes[0];

  return (
    <div className="rounded-lg border border-cyan-500/20 bg-[#06080e]/95 p-4 font-mono text-[11px] space-y-4">
      {/* Top Bar with Status */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          <span>END-TO-END SYSTEM TOPOLOGY</span>
        </div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
          {nodes.length} INTERCONNECTED TIERS
        </div>
      </div>

      {/* Interactive Node Flow Diagram */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative">
        {nodes.map((node, idx) => {
          const isSelected = selectedNodeIndex === idx;
          return (
            <button
              key={node.title}
              onClick={() => setSelectedNodeIndex(idx)}
              className={`relative text-left p-2.5 rounded-md border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-cyan-500/10 border-cyan-400/60 shadow-[0_0_15px_rgba(0,229,255,0.15)] ring-1 ring-cyan-400/30"
                  : "bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              {/* Step counter & Icon */}
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[9px] font-bold ${isSelected ? "text-cyan-400" : "text-zinc-500"}`}>
                  0{idx + 1}
                </span>
                {getIcon(idx, node.title)}
              </div>

              {/* Node Title */}
              <div className={`text-xs font-semibold leading-tight line-clamp-1 ${isSelected ? "text-white" : "text-zinc-300"}`}>
                {node.title}
              </div>

              {/* Technology badge */}
              <div className="text-[9px] text-cyan-400/80 mt-1 truncate">
                {node.tech.split("·")[0]}
              </div>

              {/* Active neon bottom bar */}
              {isSelected && (
                <motion.div
                  layoutId="activeArchitectureIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Node Inspector Console */}
      {activeNode && (
        <div className="p-3.5 rounded-md bg-[#04060a] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-cyan-300">
              TIER 0{selectedNodeIndex + 1} // {activeNode.title.toUpperCase()}
            </span>
            <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
              HIGH AVAILABILITY
            </span>
          </div>

          <p className="text-zinc-400 text-xs leading-relaxed font-sans">
            {activeNode.description}
          </p>

          <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">RUNTIME ENGINE:</span>
            <span className="text-cyan-400 font-bold tracking-wide">
              {activeNode.tech}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
