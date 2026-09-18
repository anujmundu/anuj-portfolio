"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Cpu, 
  Brain, 
  Eye, 
  Search, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Terminal, 
  Radio, 
  Volume2, 
  VolumeX, 
  Flame, 
  RotateCw, 
  Crosshair, 
  Database, 
  AlertOctagon 
} from "lucide-react";

// ============================================================================
// AUDIO SYNTHESIZER UTILITIES (Web Audio API for real sci-fi feedback)
// ============================================================================
function playHapticBeep(freq = 520, type: OscillatorType = "sine", duration = 0.09, vol = 0.035) {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.6, ctx.currentTime + duration * 0.5);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, ctx.currentTime + duration);

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

function playSwarmBurstSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    [260, 390, 520, 780, 1040].forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx % 2 === 0 ? "sawtooth" : "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.03, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.16);
        } catch {}
      }, idx * 50);
    });
  } catch {}
}

// ============================================================================
// AGENT NODES CONFIGURATION WITH BALANCED TIGHT ORBITAL GEOMETRY
// ============================================================================
interface AgentNode {
  id: string;
  name: string;
  shortName: string;
  role: string;
  tech: string;
  metric: string;
  accentHex: string;
  bgGlow: string;
  icon: React.ElementType;
  position: { x: number; y: number }; // Calibrated coordinates: plenty of margin from edges & terminal bar
  burstOffset: { x: number; y: number }; // Outward radial vector during burst pulse
  payload: string;
  memoryMB: number;
  ops: string;
}

const SWARM_NODES: AgentNode[] = [
  {
    id: "core",
    name: "Synapse Core",
    shortName: "CORE",
    role: "Central Orchestrator & Bus",
    tech: "Ray Distributed + Redis Event Mesh",
    metric: "250 req/s",
    accentHex: "#00e5ff",
    bgGlow: "rgba(0,229,255,0.25)",
    icon: Zap,
    position: { x: 50, y: 43 },
    burstOffset: { x: 0, y: 0 },
    payload: "swarm_orchestrator.dispatch_dag(job_id='sw-901')",
    memoryMB: 512,
    ops: "Central Mesh"
  },
  {
    id: "reasoner",
    name: "Planner Agent",
    shortName: "PLANNER",
    role: "DAG Decomposition & Reasoning",
    tech: "Claude 3.5 + DeepSeek R1",
    metric: "48 tok/s",
    accentHex: "#f59e0b",
    bgGlow: "rgba(245,158,11,0.25)",
    icon: Brain,
    position: { x: 26, y: 20 },
    burstOffset: { x: -16, y: -14 },
    payload: "task_plan = decompose_dag(goal, budget=4)",
    memoryMB: 142,
    ops: "DAG Planner"
  },
  {
    id: "vision",
    name: "Edge ViT Node",
    shortName: "EDGE ViT",
    role: "Spatial Tensor Encoder",
    tech: "YOLOv8 + CBAM Attention",
    metric: "14.6ms P95",
    accentHex: "#00e5ff",
    bgGlow: "rgba(0,229,255,0.25)",
    icon: Eye,
    position: { x: 74, y: 20 },
    burstOffset: { x: 16, y: -14 },
    payload: "tensors = cbam_forward(frame_rgb, int8=True)",
    memoryMB: 88,
    ops: "Tensor ViT"
  },
  {
    id: "retriever",
    name: "Vector Memory",
    shortName: "VECTOR",
    role: "Hybrid Dense-Sparse RAG",
    tech: "pgvector + Milvus (HNSW)",
    metric: "0.02ms Search",
    accentHex: "#a855f7",
    bgGlow: "rgba(168,85,247,0.25)",
    icon: Search,
    position: { x: 24, y: 64 },
    burstOffset: { x: -16, y: 12 },
    payload: "top_k = hnsw_query(vec, k=5, efSearch=64)",
    memoryMB: 310,
    ops: "HNSW Vector"
  },
  {
    id: "guardrail",
    name: "Guard Sentinel",
    shortName: "GUARD",
    role: "Schema & Hallucination Check",
    tech: "Ragas + Pydantic Strict",
    metric: "0.00% Drift",
    accentHex: "#f43f5e",
    bgGlow: "rgba(244,63,94,0.25)",
    icon: ShieldCheck,
    position: { x: 76, y: 64 },
    burstOffset: { x: 16, y: 12 },
    payload: "assert schema.validate_strict(resp.output)",
    memoryMB: 32,
    ops: "Zero Drift"
  },
  {
    id: "quant",
    name: "Quant Engine",
    shortName: "QUANT",
    role: "Operator Fusion (INT8)",
    tech: "ONNX Runtime + TensorRT",
    metric: "34 Kernels",
    accentHex: "#10b981",
    bgGlow: "rgba(16,185,129,0.25)",
    icon: Cpu,
    position: { x: 50, y: 70 }, // Pulled comfortably UP so it sits well above the bottom terminal bar!
    burstOffset: { x: 0, y: 14 },
    payload: "int8_session.run(fused_ops, stream_cuda)",
    memoryMB: 54,
    ops: "Kernel Fusion"
  },
];

const SWARM_MODES = [
  { id: "swarm", label: "MULTI-AGENT", desc: "Cooperative 5-node DAG task distribution" },
  { id: "vision", label: "EDGE ViT", desc: "Spatial vision tensor scan & INT8 quantization" },
  { id: "rag", label: "CONTEXT RAG", desc: "HNSW 1536-dim vector memory search" },
  { id: "chaos", label: "CHAOS SURGE", desc: "850 req/s stress overload with self-healing" },
];

const TELEMETRY_LOGS = [
  { ts: "05:22:01", tag: "SWARM::DAG", msg: "Decomposed prompt -> 4 concurrent micro-tasks", color: "text-amber-400" },
  { ts: "05:22:02", tag: "VISION::ViT", msg: "YOLO-CBAM spatial attention pass [14.6ms, conf 0.96]", color: "text-cyan-400" },
  { ts: "05:22:02", tag: "QUANT::INT8", msg: "112 ONNX operators fused to 34 hardware kernels", color: "text-emerald-400" },
  { ts: "05:22:03", tag: "VECTOR::HNSW", msg: "Dense cosine similarity top-5 retrieved in 0.02ms", color: "text-purple-400" },
  { ts: "05:22:03", tag: "GUARD::PASS", msg: "Strict Pydantic contract verified (0.00% hallucination)", color: "text-rose-400" },
  { ts: "05:22:04", tag: "SYNAPSE::SYNC", msg: "Distributed state synchronized across 6 worker nodes", color: "text-teal-400" },
];

// ============================================================================
// MAIN COMPONENT: COGNITIVE SWARM ORCHESTRATOR
// ============================================================================
export default function CardDemo() {
  const [activeMode, setActiveMode] = useState<"swarm" | "vision" | "rag" | "chaos">("swarm");
  const [selectedNode, setSelectedNode] = useState<AgentNode>(SWARM_NODES[0]);
  const [isBursting, setIsBursting] = useState(false);
  const [burstCount, setBurstCount] = useState(0);
  const [audioMuted, setAudioMuted] = useState(false);
  const [liveJitter, setLiveJitter] = useState<number[]>([14.2, 14.6, 13.9, 15.1, 14.4, 14.8, 14.1]);
  const [activeLogIdx, setActiveLogIdx] = useState(0);

  // Periodic jitter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const base = activeMode === "chaos" ? 32.4 : activeMode === "vision" ? 14.6 : 8.2;
      const jitterVal = +(base + (Math.random() * 2.6 - 1.3)).toFixed(1);
      setLiveJitter((prev) => [...prev.slice(1), jitterVal]);
    }, 1800);
    return () => clearInterval(interval);
  }, [activeMode]);

  // Rotate logs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLogIdx((prev) => (prev + 1) % TELEMETRY_LOGS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleTriggerBurst = () => {
    setIsBursting(true);
    setBurstCount((c) => c + 1);
    if (!audioMuted) playSwarmBurstSound();

    setTimeout(() => {
      setIsBursting(false);
    }, 1500);
  };

  const handleSelectNode = (node: AgentNode) => {
    setSelectedNode(node);
    if (!audioMuted) playHapticBeep(node.id === "core" ? 440 : 680, "sine", 0.08);
  };

  const handleModeChange = (modeId: "swarm" | "vision" | "rag" | "chaos") => {
    setActiveMode(modeId);
    if (!audioMuted) {
      playHapticBeep(modeId === "chaos" ? 300 : modeId === "vision" ? 620 : modeId === "rag" ? 820 : 540, "triangle", 0.12);
    }
  };

  return (
    <Card className="max-w-md w-full bg-[#040711]/95 border-cyan-500/40 shadow-[0_0_60px_rgba(0,229,255,0.18)] backdrop-blur-2xl relative overflow-hidden group">
      {/* Background Holographic Glows */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      {activeMode === "chaos" && (
        <div className="absolute inset-0 bg-red-600/10 pointer-events-none animate-pulse duration-500" />
      )}

      {/* Top HUD Controls & Status Ribbon */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3 font-mono text-[10px]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              activeMode === "chaos" ? "bg-rose-400" : "bg-cyan-400"
            )} />
            <span className={cn(
              "relative inline-flex rounded-full h-2.5 w-2.5",
              activeMode === "chaos" ? "bg-rose-400 shadow-[0_0_8px_#f43f5e]" : "bg-cyan-400 shadow-[0_0_8px_#00e5ff]"
            )} />
          </span>
          <span className={cn(
            "font-black tracking-widest uppercase flex items-center gap-1.5",
            activeMode === "chaos" ? "text-rose-400" : "text-cyan-300"
          )}>
            COGNITIVE SWARM ORCHESTRATOR
            {activeMode === "chaos" && <Flame className="w-3 h-3 text-rose-400 animate-bounce" />}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAudioMuted(!audioMuted)}
            className="p-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-cyan-300 transition-colors cursor-pointer"
            title={audioMuted ? "Unmute Audio Synthesis" : "Mute Audio Synthesis"}
          >
            {audioMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
          </button>
          
          <div className="text-zinc-500 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded border border-white/[0.06]">
            <Radio className={cn("w-3 h-3 animate-pulse", activeMode === "chaos" ? "text-rose-400" : "text-emerald-400")} />
            <span className={cn("font-bold", activeMode === "chaos" ? "text-rose-400" : "text-emerald-400")}>
              {liveJitter[liveJitter.length - 1]}MS
            </span>
          </div>
        </div>
      </div>

      {/* Mode Selector Chips */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 px-1">
          <span className="uppercase tracking-wider font-semibold text-cyan-400">1. SELECT TOPOLOGY MODE:</span>
          <span className="text-[8px] text-zinc-500">{SWARM_MODES.find(m => m.id === activeMode)?.desc}</span>
        </div>
        <div className="grid grid-cols-4 gap-1 p-1 bg-black/70 rounded-lg border border-white/[0.1] font-mono text-[9px]">
          {SWARM_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id as any)}
              className={cn(
                "py-1.5 px-1 rounded text-center transition-all duration-200 cursor-pointer font-bold tracking-tight relative overflow-hidden",
                activeMode === mode.id
                  ? mode.id === "chaos"
                    ? "bg-rose-500/30 text-rose-300 border border-rose-400/70 shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-[1.02]"
                    : "bg-cyan-500/30 text-cyan-300 border border-cyan-400/70 shadow-[0_0_15px_rgba(0,229,255,0.35)] scale-[1.02]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Node Selector Strip (Direct Visibility & Selection of all 6 nodes) */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 px-1">
          <span className="uppercase tracking-wider font-semibold text-emerald-400">2. INSPECT SWARM NODES:</span>
          <span className="text-[8px] text-zinc-500">DRAG NODES • ELASTIC SNAP-BACK TO ORIGIN</span>
        </div>
        <div className="grid grid-cols-6 gap-1 font-mono text-[9px]">
          {SWARM_NODES.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={`strip-${node.id}`}
                onClick={() => handleSelectNode(node)}
                className={cn(
                  "py-1 px-0.5 rounded text-center transition-all duration-200 cursor-pointer font-black tracking-tighter truncate border",
                  isSelected
                    ? "bg-white/15 text-white shadow-md scale-[1.04]"
                    : "bg-black/40 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] border-white/[0.08]"
                )}
                style={{
                  borderColor: isSelected ? node.accentHex : undefined,
                  color: isSelected ? node.accentHex : undefined,
                  boxShadow: isSelected ? `0 0 10px ${node.bgGlow}` : undefined,
                }}
              >
                {node.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Swarm Canvas (Spacious height with calibrated tight orbital geometry) */}
      <div className="h-[22.5rem] bg-[#020409] border border-cyan-500/30 rounded-xl relative overflow-hidden shadow-inner">
        <SwarmLatticeCanvas 
          activeMode={activeMode} 
          selectedNode={selectedNode}
          onSelectNode={handleSelectNode}
          isBursting={isBursting}
          burstCount={burstCount}
          liveJitter={liveJitter}
          activeLog={TELEMETRY_LOGS[activeLogIdx]}
        />
      </div>

      {/* Action Controls: Dispatch Burst Trigger & Snap Re-Align */}
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={handleTriggerBurst}
          disabled={isBursting}
          className={cn(
            "flex-1 py-2.5 px-3 rounded-lg font-mono text-xs font-black tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group/btn",
            isBursting
              ? "bg-cyan-400 text-black shadow-[0_0_30px_rgba(0,229,255,0.8)] scale-[1.02]"
              : activeMode === "chaos"
                ? "bg-gradient-to-r from-rose-500/30 via-red-500/30 to-amber-500/30 text-rose-300 hover:text-white border border-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                : "bg-gradient-to-r from-cyan-500/25 via-teal-500/25 to-purple-500/25 hover:from-cyan-500/35 hover:to-purple-500/35 text-cyan-300 hover:text-white border border-cyan-400/50 hover:border-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.25)]"
          )}
        >
          {isBursting ? (
            <>
              <RotateCw className="w-3.5 h-3.5 animate-spin text-black" />
              <span>SYNAPSE BURST IN FLIGHT...</span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:scale-125 transition-transform" />
              <span>TRIGGER COGNITIVE SWARM BURST</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            handleSelectNode(SWARM_NODES[0]);
            if (!audioMuted) playHapticBeep(880, "triangle", 0.08);
          }}
          className="py-2.5 px-3 rounded-lg font-mono text-[10px] font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer bg-white/[0.04] hover:bg-white/[0.09] text-zinc-300 hover:text-cyan-300 border border-white/[0.1] hover:border-cyan-400/50 shrink-0"
          title="Instant Re-calibrate: Snap nodes to homestead origin"
        >
          <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">ORIGIN SNAP</span>
        </button>
      </div>

      {/* Selected Node Real-time Telemetry & Micro-Inspector */}
      <div className="mt-3 p-2.5 rounded-lg border border-white/[0.08] bg-black/60 font-mono text-xs space-y-1.5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor] animate-ping"
              style={{ backgroundColor: selectedNode.accentHex, color: selectedNode.accentHex }}
            />
            <span className="font-bold text-white uppercase tracking-tight">{selectedNode.name}</span>
            <span className="text-[10px] text-zinc-500 font-normal">[{selectedNode.role}]</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-zinc-400 font-mono">{selectedNode.memoryMB}MB VRAM</span>
            <span 
              className="px-2 py-0.5 rounded text-[10px] font-bold border"
              style={{ 
                backgroundColor: selectedNode.bgGlow, 
                borderColor: `${selectedNode.accentHex}60`,
                color: selectedNode.accentHex 
              }}
            >
              {selectedNode.metric}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span>Runtime: <strong className="text-zinc-200 font-semibold">{selectedNode.tech}</strong></span>
          <span className="text-[9px] text-emerald-400 font-mono">P95 SYNCHRONIZED</span>
        </div>

        <div className="bg-[#020307] px-2.5 py-1.5 rounded border border-white/[0.06] text-[10px] text-zinc-400 truncate flex items-center gap-2 shadow-inner">
          <Terminal className="w-3 h-3 text-cyan-400 shrink-0" />
          <code className="text-cyan-300 font-semibold truncate">{selectedNode.payload}</code>
        </div>
      </div>

      {/* Card Title & Production Architecture Summary */}
      <div className="mt-3.5 space-y-1">
        <CardTitle className="text-white font-extrabold tracking-tight flex items-center justify-between text-base">
          <span>Neural Swarm & Edge Runtime</span>
          <span className="text-xs font-mono text-cyan-400 font-normal">v5.3-OPTIMIZED</span>
        </CardTitle>
        <CardDescription className="text-xs text-zinc-400 font-sans leading-relaxed">
          Distributed task orchestration, sub-15ms INT8 vision inference, and zero-hallucination vector memory serving production workloads.
        </CardDescription>
      </div>

      {/* Live Jitter Sparkline & Footnote */}
      <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">JITTER:</span>
          <div className="flex items-end gap-1 h-3.5">
            {liveJitter.map((val, i) => {
              const h = Math.min(100, Math.max(20, ((val - 10) / 24) * 100));
              return (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={cn(
                    "w-1 rounded-sm transition-all duration-300",
                    activeMode === "chaos" ? "bg-rose-400" : "bg-cyan-400"
                  )}
                />
              );
            })}
          </div>
        </div>

        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
          <Activity className="w-3 h-3" />
          <span>CONCURRENCY: {activeMode === "chaos" ? "850 req/s" : "250 req/s"}</span>
        </span>

        <span className="text-zinc-600">ZERO DRIFT</span>
      </div>
    </Card>
  );
}

// ============================================================================
// SWARM LATTICE CANVAS: TIGHT ORBITAL CENTERING & FULL COMPONENT VISIBILITY
// ============================================================================
function SwarmLatticeCanvas({
  activeMode,
  selectedNode,
  onSelectNode,
  isBursting,
  burstCount,
  liveJitter,
  activeLog,
}: {
  activeMode: "swarm" | "vision" | "rag" | "chaos";
  selectedNode: AgentNode;
  onSelectNode: (node: AgentNode) => void;
  isBursting: boolean;
  burstCount: number;
  liveJitter: number[];
  activeLog: { ts: string; tag: string; msg: string; color: string };
}) {
  const satelliteNodes = SWARM_NODES.filter(n => n.id !== "core");
  const coreNode = SWARM_NODES.find(n => n.id === "core")!;

  return (
    <div className="relative w-full h-full p-2.5 flex flex-col justify-between select-none">
      {/* Background Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 229, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: "22px 22px"
        }}
      />

      {/* ===================================================================== */}
      {/* MODE 1: MULTI-AGENT SWARM TOPOLOGY (Centered Synaptic Conduits)       */}
      {/* ===================================================================== */}
      {activeMode === "swarm" && (
        <>
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Concentric Radar Rings Centered on Synapse Core (x: 50%, y: 43%) */}
            <circle cx="50%" cy="43%" r="34" fill="none" stroke="rgba(0, 229, 255, 0.16)" strokeDasharray="3 3" />
            <circle cx="50%" cy="43%" r="66" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="4 4" />
            <circle cx="50%" cy="43%" r="96" fill="none" stroke="rgba(0, 229, 255, 0.07)" strokeDasharray="6 6" />

            {/* Radial Synaptic Cables from Core to Satellite Nodes */}
            {satelliteNodes.map((node, idx) => {
              const isSelected = selectedNode.id === node.id || selectedNode.id === "core";
              return (
                <g key={`cable-${node.id}`}>
                  <line
                    x1="50%"
                    y1="43%"
                    x2={`${node.position.x}%`}
                    y2={`${node.position.y}%`}
                    stroke={isSelected ? node.accentHex : "rgba(255, 255, 255, 0.18)"}
                    strokeWidth={isSelected || isBursting ? "2.5" : "1.2"}
                    strokeDasharray={isSelected ? "4 2" : "2 3"}
                    filter={isSelected || isBursting ? "url(#laserGlow)" : undefined}
                    className={isSelected || isBursting ? "animate-pulse" : ""}
                  />

                  {/* Traveling Laser Pulse Forward */}
                  <motion.circle
                    r={isSelected || isBursting ? "4" : "2.5"}
                    fill={node.accentHex}
                    initial={{ cx: "50%", cy: "43%" }}
                    animate={{
                      cx: ["50%", `${node.position.x}%`, "50%"],
                      cy: ["43%", `${node.position.y}%`, "43%"],
                      scale: isBursting ? [1, 2.2, 1] : [1, 1.4, 1],
                    }}
                    transition={{
                      duration: isBursting ? 0.7 : isSelected ? 1.6 : 3 + idx * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </g>
              );
            })}

            {/* Inter-Node Cohesion Mesh */}
            {satelliteNodes.map((node, i) => {
              const nextNode = satelliteNodes[(i + 1) % satelliteNodes.length];
              return (
                <line
                  key={`peer-${node.id}-${nextNode.id}`}
                  x1={`${node.position.x}%`}
                  y1={`${node.position.y}%`}
                  x2={`${nextNode.position.x}%`}
                  y2={`${nextNode.position.y}%`}
                  stroke="rgba(0, 229, 255, 0.12)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
              );
            })}
          </svg>

          {/* Floating Micro-Task Indicators */}
          <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded bg-black/80 border border-amber-400/40 text-[8px] font-mono text-amber-300 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>DAG: 4 PARALLEL TASKS DISPATCHED</span>
          </div>
        </>
      )}

      {/* ===================================================================== */}
      {/* MODE 2: EDGE ViT SPATIAL VISION TENSOR SCANNER                         */}
      {/* ===================================================================== */}
      {activeMode === "vision" && (
        <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
          {/* Spatial Grid Scan Cells */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-3 opacity-25">
            {[...Array(36)].map((_, i) => (
              <motion.div
                key={`grid-cell-${i}`}
                initial={{ opacity: 0.2 }}
                animate={{
                  opacity: [0.15, (i === 14 || i === 15 || i === 20 || i === 21) ? 0.8 : 0.2, 0.15],
                  backgroundColor: (i === 14 || i === 15 || i === 20 || i === 21) ? "rgba(0,229,255,0.4)" : "rgba(255,255,255,0.02)",
                }}
                transition={{ duration: 1.6, repeat: Infinity, delay: (i % 6) * 0.1 }}
                className="border border-cyan-400/30 rounded-sm"
              />
            ))}
          </div>

          {/* Moving Laser Sweep Line */}
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "85%", "0%"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00e5ff] z-20"
          />

          {/* Vision Target Bounding Box */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[34%] top-[28%] w-32 h-26 border-2 border-cyan-400 rounded-lg bg-cyan-500/10 shadow-[0_0_25px_rgba(0,229,255,0.5)] z-20 flex flex-col justify-between p-1.5 font-mono text-[8px]"
          >
            <div className="flex items-center justify-between text-cyan-300 font-bold">
              <span className="flex items-center gap-1">
                <Crosshair className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span>ROI #01</span>
              </span>
              <span className="text-emerald-400">96.4% CONF</span>
            </div>
            <div className="text-[7px] text-zinc-300 bg-black/70 px-1 py-0.5 rounded border border-cyan-400/30">
              CBAM SPATIAL ATTENTION: 14.6MS INT8
            </div>
          </motion.div>

          {/* Vision HUD Overlay Badges */}
          <div className="flex justify-between items-start z-30 font-mono text-[9px]">
            <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 font-bold">
              SCAN: CHEST CT 512x512
            </span>
            <span className="px-2 py-0.5 rounded bg-black/80 border border-white/20 text-zinc-300">
              ViT-B/16: 196 TOKENS
            </span>
          </div>

          <div className="flex justify-between items-end z-30 font-mono text-[8px] text-zinc-400 mb-8">
            <span>TENSOR: INT8 TENSORRT</span>
            <span className="text-emerald-400 font-bold">FPS: 68.4 LIVE</span>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 3: CONTEXT RAG VECTOR KNOWLEDGE GRAPH                            */}
      {/* ===================================================================== */}
      {activeMode === "rag" && (
        <div className="absolute inset-0 pointer-events-none p-3">
          <svg className="absolute inset-0 w-full h-full">
            {/* Vector Space Coordinate Grid Centered at y: 43% */}
            <circle cx="50%" cy="43%" r="48" fill="none" stroke="rgba(168, 85, 247, 0.2)" strokeDasharray="3 3" />
            <circle cx="50%" cy="43%" r="86" fill="none" stroke="rgba(168, 85, 247, 0.15)" strokeDasharray="4 4" />

            {/* Radar Scan Vector Sweep */}
            <motion.line
              x1="50%"
              y1="43%"
              x2="85%"
              y2="20%"
              stroke="#a855f7"
              strokeWidth="2"
              filter="url(#laserGlow)"
              animate={{
                x2: ["85%", "75%", "25%", "20%", "85%"],
                y2: ["20%", "75%", "70%", "25%", "20%"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Simulated Vector Embedding Points */}
            {[
              { x: 32, y: 32, label: "Chunk #01", sim: "0.942" },
              { x: 68, y: 28, label: "Chunk #02", sim: "0.918" },
              { x: 38, y: 62, label: "Chunk #03", sim: "0.892" },
              { x: 72, y: 62, label: "Chunk #04", sim: "0.865" },
              { x: 28, y: 48, label: "Chunk #05", sim: "0.844" },
            ].map((pt, i) => (
              <g key={`vec-${i}`}>
                <line x1="50%" y1="43%" x2={`${pt.x}%`} y2={`${pt.y}%`} stroke="rgba(168, 85, 247, 0.25)" strokeDasharray="2 2" />
                <circle cx={`${pt.x}%`} cy={`${pt.y}%`} r="3.5" fill="#a855f7" className="animate-ping" />
                <circle cx={`${pt.x}%`} cy={`${pt.y}%`} r="2.5" fill="#ffffff" />
              </g>
            ))}
          </svg>

          {/* RAG Query Telemetry Badge */}
          <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded bg-purple-950/80 border border-purple-400/50 text-[8px] font-mono text-purple-300 font-bold flex items-center gap-1">
            <Database className="w-3 h-3 text-purple-400" />
            <span>HNSW 1536-DIM EMBEDDING SPACE • TOP-K=5</span>
          </div>

          <div className="absolute bottom-11 right-2 z-20 px-2 py-0.5 rounded bg-black/80 border border-purple-400/30 text-[8px] font-mono text-purple-300 font-bold">
            COSINE SIM: 0.942 [RETRIEVAL: 0.02MS]
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 4: CHAOS SURGE OVERLOAD (High Voltage Anomaly & Self Healing)    */}
      {/* ===================================================================== */}
      {activeMode === "chaos" && (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full">
            {/* Chaotic lightning lines */}
            <motion.line
              x1="50%"
              y1="43%"
              x2="26%"
              y2="20%"
              stroke="#f43f5e"
              strokeWidth="3"
              strokeDasharray="6 2"
              className="animate-pulse"
            />
            <motion.line
              x1="50%"
              y1="43%"
              x2="74%"
              y2="20%"
              stroke="#f43f5e"
              strokeWidth="1.5"
              strokeDasharray="2 4"
            />
            {/* Auto-Healing Bypass Green Laser */}
            <motion.line
              x1="26%"
              y1="20%"
              x2="76%"
              y2="64%"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              className="animate-pulse"
            />
          </svg>

          {/* Chaos Warning HUD Banner */}
          <div className="absolute top-2 left-2 right-2 z-20 px-2 py-1 rounded bg-rose-950/90 border border-rose-500 text-[9px] font-mono text-rose-200 font-bold flex items-center justify-between shadow-lg">
            <span className="flex items-center gap-1">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
              <span>LOAD SURGE: 850 REQ/S DETECTED</span>
            </span>
            <span className="text-emerald-400 font-black">SELF-HEALING: ACTIVE</span>
          </div>

          <div className="absolute bottom-11 left-2 z-20 px-2 py-0.5 rounded bg-black/90 border border-emerald-500/50 text-[8px] font-mono text-emerald-300">
            AUTO-REROUTE: WORKER #2 DROP -&gt; WORKER #5 SUCCESS
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SATELLITE AGENT NODES (Tightly Calibrated, Perfectly Inset & Clickable) */}
      {/* ===================================================================== */}
      {satelliteNodes.map((node, idx) => {
        const Icon = node.icon;
        const isSelected = selectedNode.id === node.id;

        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: `${node.position.x}%`,
              top: `${node.position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            className="z-30 pointer-events-auto"
          >
            <motion.div
              drag
              dragSnapToOrigin={true}
              dragElastic={0.25}
              dragConstraints={{ left: -28, right: 28, top: -28, bottom: 28 }}
              dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
              whileDrag={{ scale: 1.18, cursor: "grabbing", zIndex: 50 }}
              onClick={() => onSelectNode(node)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              animate={
                isBursting
                  ? {
                      x: [0, node.burstOffset.x, node.burstOffset.x * 1.12, 0],
                      y: [0, node.burstOffset.y, node.burstOffset.y * 1.12, 0],
                      scale: [1, 1.18, 1.1, 1],
                    }
                  : activeMode === "chaos"
                    ? {
                        x: [0, (idx % 2 === 0 ? -2 : 2), (idx % 2 === 0 ? 1 : -1), 0],
                        y: [0, (idx % 2 === 0 ? 2 : -2), (idx % 2 === 0 ? -1 : 1), 0],
                        scale: 1,
                      }
                    : { x: 0, y: 0, scale: 1 }
              }
              transition={
                isBursting
                  ? { duration: 1.1, times: [0, 0.35, 0.65, 1], ease: [0.2, 1, 0.3, 1] }
                  : activeMode === "chaos"
                    ? { duration: 0.3, repeat: Infinity, ease: "linear" }
                    : { type: "spring", stiffness: 400, damping: 25 }
              }
              className={cn(
                "cursor-grab active:cursor-grabbing w-[76px] py-1.5 px-1 rounded-xl border flex flex-col items-center justify-center transition-colors duration-200 backdrop-blur-xl shadow-xl select-none origin-center",
                isSelected
                  ? "ring-2 ring-cyan-400 bg-[#091024] shadow-[0_0_25px_rgba(0,229,255,0.6)]"
                  : "border-white/15 bg-[#070b18]/95 hover:border-cyan-400/80 hover:bg-[#0c152c]"
              )}
            >
              <div className="relative">
                <Icon 
                  className="w-4 h-4 transition-colors"
                  style={{ color: isSelected ? node.accentHex : "#f4f4f5" }}
                />
                <span 
                  className={cn(
                    "absolute -top-1 -right-1 w-2 h-2 rounded-full",
                    isSelected ? "animate-ping" : ""
                  )}
                  style={{ backgroundColor: node.accentHex }}
                />
              </div>
              
              <span className="text-[9px] font-mono font-black text-white mt-0.5 whitespace-nowrap px-0.5">
                {node.shortName}
              </span>
              <span 
                className="text-[7px] font-mono font-bold uppercase tracking-tight"
                style={{ color: node.accentHex }}
              >
                {node.metric}
              </span>
            </motion.div>
          </div>
        );
      })}

      {/* ===================================================================== */}
      {/* CENTRAL SYNAPSE CORE (Centerpiece at x: 50%, y: 43%)                  */}
      {/* ===================================================================== */}
      <div 
        style={{
          position: "absolute",
          left: "50%",
          top: "43%",
          transform: "translate(-50%, -50%)",
        }}
        className="z-30 flex flex-col items-center justify-center select-none pointer-events-auto"
      >
        <motion.div
          drag
          dragSnapToOrigin={true}
          dragElastic={0.2}
          dragConstraints={{ left: -16, right: 16, top: -16, bottom: 16 }}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
          whileDrag={{ scale: 1.15, cursor: "grabbing", zIndex: 50 }}
          onClick={() => onSelectNode(coreNode)}
          animate={
            isBursting
              ? { scale: [1, 1.25, 0.95, 1], rotate: [0, -8, 8, 0] }
              : { scale: 1, rotate: 0 }
          }
          transition={
            isBursting
              ? { duration: 0.85, times: [0, 0.3, 0.6, 1], ease: [0.16, 1, 0.3, 1] }
              : { type: "spring", stiffness: 400, damping: 25 }
          }
          className="flex flex-col items-center justify-center cursor-grab active:cursor-grabbing group/core"
        >
          <div className="relative flex items-center justify-center">
            {/* Animated concentric gyro-rings */}
            <div className="absolute w-18 h-18 rounded-full bg-cyan-500/15 animate-ping duration-1000 pointer-events-none" />
            <div 
              className="absolute w-18 h-18 rounded-full border border-cyan-400/50 animate-spin pointer-events-none" 
              style={{ animationDuration: isBursting ? "1.5s" : "8s" }} 
            />
            <div 
              className="absolute w-22 h-22 rounded-full border border-purple-400/30 animate-spin pointer-events-none" 
              style={{ animationDuration: "12s", animationDirection: "reverse" }} 
            />

            {/* Central Core Disk */}
            <div 
              className={cn(
                "w-13 h-13 rounded-full bg-[#081022] border-2 flex items-center justify-center transition-all duration-300",
                selectedNode.id === "core"
                  ? "border-cyan-300 ring-4 ring-cyan-400/40 shadow-[0_0_35px_#00e5ff]"
                  : isBursting 
                    ? "border-white bg-cyan-400 shadow-[0_0_40px_#00e5ff]"
                    : activeMode === "chaos"
                      ? "border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.7)]"
                      : "border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.7)] group-hover/core:border-white"
              )}
            >
              <Zap className={cn(
                "w-5 h-5 transition-all",
                isBursting 
                  ? "text-black scale-125" 
                  : activeMode === "chaos" 
                    ? "text-rose-300 animate-pulse" 
                    : "text-cyan-300 animate-pulse"
              )} />
            </div>
          </div>
          
          <div className={cn(
            "mt-1 px-2 py-0.5 rounded text-[8px] font-mono font-black uppercase tracking-widest border transition-colors",
            selectedNode.id === "core"
              ? "bg-cyan-400 text-black border-cyan-300 font-extrabold shadow-[0_0_12px_#00e5ff]"
              : activeMode === "chaos"
                ? "bg-rose-950/90 border-rose-400/60 text-rose-300"
                : "bg-black/90 border-cyan-400/50 text-cyan-300"
          )}>
            {isBursting ? "BURST ACTIVE" : "SYNAPSE CORE"}
          </div>
        </motion.div>
      </div>

      {/* Central Shockwave Pulse on Burst Trigger */}
      <AnimatePresence>
        {isBursting && (
          <motion.div
            key={`burst-${burstCount}`}
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-2 border-cyan-400 bg-cyan-500/20 pointer-events-none shadow-[0_0_50px_rgba(0,229,255,0.9)]"
          />
        )}
      </AnimatePresence>

      {/* Mini Dynamic Telemetry Terminal HUD at Canvas Base (Fully isolated below Quant!) */}
      <div className="mt-auto z-30 bg-black/95 border border-white/[0.12] rounded-md px-2.5 py-1.5 font-mono text-[10px] flex items-center justify-between shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-hidden">
          <Terminal className="w-3 h-3 text-cyan-400 shrink-0 animate-pulse" />
          <span className="text-zinc-500 text-[9px] shrink-0">[{activeLog.ts}]</span>
          <span className={cn("font-bold text-[9px] shrink-0", activeLog.color)}>
            {activeLog.tag}
          </span>
          <span className="text-zinc-200 text-[9px] truncate">
            {activeLog.msg}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[9px] text-zinc-400 font-mono font-bold">ONLINE</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SIGNATURE ACETERNITY SPARKLES ENGINE
// ============================================================================
export const Sparkles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(16)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.5, 0],
          }}
          transition={{
            duration: random() * 2 + 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-cyan-300 shadow-[0_0_8px_#00e5ff]"
        />
      ))}
    </div>
  );
};

// ============================================================================
// ACETERNITY CARD BUILDING BLOCKS (Preserved API Contract)
// ============================================================================
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto p-6 rounded-2xl border border-white/[0.08] bg-[#070a14] shadow-[0_4px_24px_rgba(0,0,0,0.5)] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-base font-bold text-white py-1",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-xs font-normal text-zinc-400 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = false,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-[15rem] md:h-[18rem] rounded-xl z-40 relative",
        className,
        showGradient &&
          "[mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

export const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-12 w-12 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/[0.08]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.15)_inset]`,
        className
      )}
    >
      {children}
    </div>
  );
};

// ============================================================================
// BRAND LOGOS (Preserved for compatibility)
// ============================================================================
export const ClaudeLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <rect fill="#CC9B7A" width="512" height="512" rx="104.187" ry="105.042" />
      <path
        fill="#1F1F1E"
        fillRule="nonzero"
        d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z"
      />
    </svg>
  );
};

export const OpenAILogo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.153 11.46a6.888 6.888 0 0 0-.608-5.73 7.117 7.117 0 0 0-3.29-2.93 7.238 7.238 0 0 0-4.41-.454 7.065 7.065 0 0 0-2.41-1.742A7.15 7.15 0 0 0 12.514 0a7.216 7.216 0 0 0-4.217 1.346 7.061 7.061 0 0 0-2.603 3.539 7.12 7.12 0 0 0-2.734 1.188A7.012 7.012 0 0 0 .966 8.268a6.979 6.979 0 0 0 .88 8.273 6.89 6.89 0 0 0 .607 5.729 7.117 7.117 0 0 0 3.29 2.93 7.238 7.238 0 0 0 4.41.454 7.061 7.061 0 0 0 2.409 1.742c.92.404 1.916.61 2.923.604a7.215 7.215 0 0 0 4.22-1.345 7.06 7.06 0 0 0 2.605-3.543 7.116 7.116 0 0 0 2.734-1.187 7.01 7.01 0 0 0 1.993-2.196 6.978 6.978 0 0 0-.884-8.27Zm-10.61 14.71c-1.412 0-2.505-.428-3.46-1.215.043-.023.119-.064.168-.094l5.65-3.22a.911.911 0 0 0 .464-.793v-7.86l2.389 1.36a.087.087 0 0 1 .046.065v6.508c0 2.952-2.491 5.248-5.257 5.248ZM4.062 21.354a5.17 5.17 0 0 1-.635-3.516c.042.025.115.07.168.1l5.65 3.22a.928.928 0 0 0 .928 0l6.898-3.93v2.72a.083.083 0 0 1-.034.072l-5.711 3.255a5.386 5.386 0 0 1-4.035.522 5.315 5.315 0 0 1-3.23-2.443ZM2.573 9.184a5.283 5.283 0 0 1 2.768-2.301V13.515a.895.895 0 0 0 .464.793l6.897 3.93-2.388 1.36a.087.087 0 0 1-.08.008L4.52 16.349a5.262 5.262 0 0 1-2.475-3.185 5.192 5.192 0 0 1 .527-3.98Zm19.623 4.506-6.898-3.93 2.388-1.36a.087.087 0 0 1 .08-.008l5.713 3.255a5.28 5.28 0 0 1 2.054 2.118 5.19 5.19 0 0 1-.488 5.608 5.314 5.314 0 0 1-2.39 1.742v-6.633a.896.896 0 0 0-.459-.792Zm2.377-3.533a7.973 7.973 0 0 0-.168-.099l-5.65-3.22a.93em 0 0 0-.928 0l-6.898 3.93V8.046a.083.083 0 0 1 .034-.072l5.712-3.251a5.375 5.375 0 0 1 5.698.241 5.262 5.262 0 0 1 1.865 2.28c.39.92.506 1.93.335 2.913ZM9.631 15.009l-2.39-1.36a.083.083 0 0 1-.046-.065V7.075c.001-.997.29-1.973.832-2.814a5.297 5.297 0 0 1 2.231-1.935 5.382 5.382 0 0 1 5.659.72 4.89 4.89 0 0 0-.168.093l-5.65 3.22a.913.913 0 0 0-.465.793l-.003 7.857Zm1.297-2.76L14 10.5l3.072 1.75v3.5L14 17.499l-3.072-1.75v-3.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GeminiLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
        fill="#1BA1E3"
      />
    </svg>
  );
};

export const MetaIconOutline = ({ className }: { className?: string }) => {
  return (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 287.56 191"
      className={className}
    >
      <path
        fill="#0081fb"
        d="M31.06,126c0,11,2.41,19.41,5.56,24.51A19,19,0,0,0,53.19,160c8.1,0,15.51-2,29.79-21.76,11.44-15.83,24.92-38,34-52l15.36-23.6c10.67-16.39,23-34.61,37.18-47C181.07,5.6,193.54,0,206.09,0c21.07,0,41.14,12.21,56.5,35.11,16.81,25.08,25,56.67,25,89.27,0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191V160c17.63,0,22-16.2,22-34.74,0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16c-18.2,32.27-22.81,39.62-31.91,51.75C84.74,183,71.12,191,53.19,191c-21.27,0-34.72-9.21-43-23.09C3.34,156.6,0,141.76,0,124.85Z"
      />
    </svg>
  );
};
