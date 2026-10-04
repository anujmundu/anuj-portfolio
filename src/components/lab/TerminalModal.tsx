"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  X, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Cpu, 
  Activity, 
  Play, 
  RotateCcw,
  Briefcase,
  Award,
  FileText,
  CheckCircle2,
  Send,
  HelpCircle,
  Layers,
  ExternalLink,
  Zap,
  Globe
} from "lucide-react";
import { playClick, playChirp, playSuccess, toggleSound, isSoundEnabled } from "@/lib/audio";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

const AVAILABLE_COMMANDS = [
  "help",
  "whoami",
  "pitch",
  "skills",
  "stack",
  "projects",
  "project 1",
  "project 2",
  "project 3",
  "project 4",
  "experience",
  "career",
  "metrics",
  "stats",
  "resume",
  "interview",
  "interview 1",
  "interview 2",
  "interview 3",
  "interview 4",
  "academics",
  "education",
  "roles",
  "neofetch",
  "benchmark",
  "train",
  "msg",
  "contact",
  "socials",
  "matrix",
  "crt",
  "audio",
  "clear",
  "exit"
];

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [input, setInput] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [isMatrixRunning, setIsMatrixRunning] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: "init",
      output: (
        <div className="space-y-3 text-zinc-300">
          <div className="font-mono text-cyan-400 font-bold leading-tight text-[11px] sm:text-xs whitespace-pre select-none">
{`   _   _  _ _   _   _   __  __ _   _ _  _ ___  _   _ 
  /_\ | \| | | | | | | |  \/  | | | | \| |   \| | | |
 / _ \| .\` | |_| |_| | | |\/| | |_| | .\` | |) | |_| |
/_/ \_\_|\_|\___/\___/  |_|  |_|\___/|_|\_|___/ \___/ `}
          </div>
          <div className="p-3.5 rounded-xl border border-cyan-500/25 bg-gradient-to-r from-cyan-950/30 via-[#070b16] to-[#04060c] space-y-2 font-mono">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-2">
              <span className="text-white font-extrabold tracking-wider text-xs sm:text-sm">
                ANUJ MUNDU // PERSONAL BRANDING &amp; ARCHITECTURE SHOWCASE
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold tracking-wide">
                STATUS: AVAILABLE FOR HIGH-IMPACT ROLES
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-300">
              <div>
                <span className="text-zinc-500 block text-[9px] uppercase">CORE DISCIPLINES</span>
                <span className="text-cyan-300 font-bold">AI/ML Engineering · Distributed MLOps · Data Science</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[9px] uppercase">ACADEMIC CREDENTIALS</span>
                <span className="text-white font-bold">MCA @ MANIT Bhopal (NIT, 2023–2026)</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[9px] uppercase">LATENCY &amp; THROUGHPUT</span>
                <span className="text-emerald-300 font-bold">24.8ms P95 · 70.98 FPS · Zero False Positives</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[9px] uppercase">DIRECT INBOX DISPATCH</span>
                <span className="text-amber-300 font-bold">anujmark.edwin.ame@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="p-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs text-zinc-300 flex flex-wrap items-center justify-between gap-2">
            <span>
              Type <span className="text-cyan-300 font-bold bg-cyan-500/15 px-1 py-0.5 rounded">help</span> or <span className="text-cyan-300 font-bold bg-cyan-500/15 px-1 py-0.5 rounded">pitch</span> to start, or click the quick action chips below.
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              Fast Dispatch: type 'msg &lt;your note&gt;' to send straight to Anuj
            </span>
          </div>
        </div>
      )
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSoundActive(isSoundEnabled());
      setTimeout(() => inputRef.current?.focus(), 120);
    } else {
      setIsMatrixRunning(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isMatrixRunning]);

  // Matrix Digital Rain Effect Canvas
  useEffect(() => {
    if (!isMatrixRunning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 700;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const chars = "0101010101ANUJAIENGINEERINGPYTORCHYOLOTENSORRT0123456789$#@%&*";
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50;
    }

    let animationFrameId: number;
    const renderMatrix = () => {
      ctx.fillStyle = "rgba(7, 8, 10, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00e5ff";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillStyle = Math.random() > 0.85 ? "#ffffff" : "#10b981";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(renderMatrix);
    };

    renderMatrix();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMatrixRunning]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playClick();

    // Tab autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (!current) return;
      const match = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(current));
      if (match) {
        setInput(match);
      }
      return;
    }

    // Command History UP
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      return;
    }

    // Command History DOWN
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
      return;
    }

    // Execute on Enter
    if (e.key === "Enter") {
      const cleanCmd = input.trim();
      executeCommand(cleanCmd);
      if (cleanCmd) {
        setCommandHistory((prev) => [...prev, cleanCmd]);
        setHistoryIndex(-1);
      }
      setInput("");
    }
  };

  const executeCommand = (rawCmd: string) => {
    if (!rawCmd) return;
    const cmd = rawCmd.trim().toLowerCase();
    playChirp();

    if (cmd === "clear" || cmd === "cls") {
      setHistory([]);
      return;
    }

    if (cmd === "exit" || cmd === "quit") {
      onClose();
      return;
    }

    if (cmd === "crt") {
      setCrtEnabled((prev) => !prev);
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: <p className="text-cyan-400">CRT Monitor Shader: {!crtEnabled ? "ENABLED" : "DISABLED"}</p>
        }
      ]);
      return;
    }

    if (cmd === "audio") {
      const newState = toggleSound();
      setSoundActive(newState);
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: <p className="text-cyan-400">Web Audio Synthesizer: {newState ? "ONLINE (Tactile audio enabled)" : "OFFLINE (Muted)"}</p>
        }
      ]);
      return;
    }

    if (cmd === "matrix") {
      setIsMatrixRunning(true);
      playSuccess();
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: (
            <div className="space-y-1 text-emerald-400">
              <p className="font-bold">Streaming Matrix Neural Buffer initialized...</p>
              <p className="text-xs text-zinc-400">Click [STOP MATRIX] on the overlay to return to normal terminal console.</p>
            </div>
          )
        }
      ]);
      return;
    }

    if (cmd.startsWith("msg ") || cmd.startsWith("message ") || cmd.startsWith("send ") || cmd.startsWith("email ")) {
      const msgContent = rawCmd.trim().replace(/^(msg|message|send|email)\s+/i, "").trim();
      let msgOutput: React.ReactNode;
      if (!msgContent) {
        msgOutput = <p className="text-amber-400">Usage: msg &lt;your message or contact info&gt; — dispatches packet directly to Anuj's Gmail inbox.</p>;
      } else {
        fetch("https://formsubmit.co/ajax/anujmark.edwin.ame@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            message: msgContent,
            _subject: `⚡ Hacker Terminal Direct Dispatch: ${msgContent.slice(0, 40)}...`,
            _template: "table",
            _captcha: "false"
          })
        }).catch(() => {});
        playSuccess();
        msgOutput = (
          <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <span>✓ PACKET TRANSMITTED DIRECTLY TO ANUJ'S GMAIL INBOX (STATUS 200 OK)</span>
            </p>
            <p className="text-zinc-300">
              Payload delivered to <span className="text-cyan-300 font-bold">anujmark.edwin.ame@gmail.com</span>: "{msgContent}"
            </p>
            <p className="text-[11px] text-zinc-500">SLA: Anuj reviews terminal dispatches in &lt; 12 hours.</p>
          </div>
        );
      }
      setHistory((prev) => [...prev, { command: rawCmd.trim(), output: msgOutput }]);
      return;
    }

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-3 text-zinc-300 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1.5">
              <span className="text-cyan-400 font-bold tracking-wider">[ ANUJ MUNDU // TERMINAL ROUTINES ]</span>
              <span className="text-[10px] text-zinc-500">v5.4.0-ml-prod</span>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-cyan-300 font-bold text-[11px] block mb-1 uppercase tracking-wider">// 01. PERSONAL BRANDING &amp; PROFILES</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                  <div><span className="text-emerald-400 font-bold inline-block w-28">whoami</span> <span className="text-zinc-400">Core thesis &amp; engineering profile</span></div>
                  <div><span className="text-emerald-400 font-bold inline-block w-28">pitch</span> <span className="text-zinc-400">Executive pitch: Why hire Anuj</span></div>
                  <div><span className="text-emerald-400 font-bold inline-block w-28">skills / stack</span> <span className="text-zinc-400">Technical matrix &amp; production stacks</span></div>
                  <div><span className="text-emerald-400 font-bold inline-block w-28">projects</span> <span className="text-zinc-400">Flagship architectures (run 'project 1')</span></div>
                  <div><span className="text-emerald-400 font-bold inline-block w-28">experience</span> <span className="text-zinc-400">Chronological trajectory &amp; research</span></div>
                  <div><span className="text-emerald-400 font-bold inline-block w-28">metrics</span> <span className="text-zinc-400">Verified latency, ROC-AUC &amp; FPS</span></div>
                  <div><span className="text-emerald-400 font-bold inline-block w-28">academics</span> <span className="text-zinc-400">MANIT Bhopal (NIT) MCA &amp; research</span></div>
                  <div><span className="text-emerald-400 font-bold inline-block w-28">resume</span> <span className="text-zinc-400">Executive resume card &amp; link</span></div>
                </div>
              </div>

              <div>
                <span className="text-purple-300 font-bold text-[11px] block mb-1 uppercase tracking-wider">// 02. INTERACTIVE TECHNICAL INTERVIEW AUDIT</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                  <div><span className="text-purple-400 font-bold inline-block w-28">interview</span> <span className="text-zinc-400">Launch technical interview QA portal</span></div>
                  <div><span className="text-purple-400 font-bold inline-block w-28">interview 1-4</span> <span className="text-zinc-400">Answers to key architectural questions</span></div>
                </div>
              </div>

              <div>
                <span className="text-amber-300 font-bold text-[11px] block mb-1 uppercase tracking-wider">// 03. LIVE DIAGNOSTIC SIMULATIONS</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                  <div><span className="text-amber-400 font-bold inline-block w-28">benchmark</span> <span className="text-zinc-400">Simulate 10K RPS latency stress audit</span></div>
                  <div><span className="text-amber-400 font-bold inline-block w-28">train</span> <span className="text-zinc-400">PyTorch training loop + TensorRT export</span></div>
                  <div><span className="text-amber-400 font-bold inline-block w-28">matrix</span> <span className="text-zinc-400">Interactive digital stream rain</span></div>
                </div>
              </div>

              <div>
                <span className="text-emerald-300 font-bold text-[11px] block mb-1 uppercase tracking-wider">// 04. DIRECT INBOX DISPATCH &amp; SYSTEM</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                  <div><span className="text-cyan-400 font-bold inline-block w-28">msg &lt;text&gt;</span> <span className="text-zinc-400">Send direct message to Anuj's Gmail</span></div>
                  <div><span className="text-cyan-400 font-bold inline-block w-28">contact / socials</span> <span className="text-zinc-400">Verified links to GitHub, LinkedIn</span></div>
                  <div><span className="text-cyan-400 font-bold inline-block w-28">neofetch</span> <span className="text-zinc-400">Host specifications &amp; runtime</span></div>
                  <div><span className="text-cyan-400 font-bold inline-block w-28">crt / audio / clear</span> <span className="text-zinc-400">Terminal display &amp; controls</span></div>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case "whoami":
      case "about":
        output = (
          <div className="text-zinc-300 space-y-2 p-3.5 rounded-xl border border-cyan-500/25 bg-[#060914] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
              <span className="text-cyan-400 font-bold text-sm">ANUJ MUNDU // CLEARANCE DOSSIER</span>
              <span className="text-emerald-400 text-[10px]">VERIFIED ENGINEER</span>
            </div>
            <p className="text-emerald-400 font-semibold">
              CORE THESIS: "I bridge empirical mathematical modeling with sub-40ms deterministic production systems."
            </p>
            <p className="text-zinc-300 leading-relaxed font-sans text-xs">
              AI/ML Systems Engineer &amp; Data Scientist graduating with a Master of Computer Applications (MCA) from <span className="text-white font-bold font-mono">MANIT Bhopal (NIT)</span>. Specialized in deploying medical-grade Computer Vision pipelines (YOLOv5-CASP), training tabular risk models with TreeSHAP explainability, and architecting asynchronous Celery worker meshes over Redis brokers.
            </p>
            <div className="pt-1 flex flex-wrap gap-2 text-[10px]">
              <span className="px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">PyTorch 2.5.1</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">TensorRT 10.4</span>
              <span className="px-2 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-500/30">FastAPI + Celery</span>
              <span className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30">TreeSHAP &amp; XGBoost</span>
              <span className="px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-500/30">PostgreSQL Star Schema</span>
            </div>
          </div>
        );
        break;

      case "pitch":
      case "hire":
      case "why":
        output = (
          <div className="space-y-2.5 p-4 rounded-xl border border-cyan-500/30 bg-[#060a16] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
              <span className="text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                EXECUTIVE PITCH: WHY HIRE ANUJ MUNDU
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                OPEN FOR HIGH-IMPACT ROLES
              </span>
            </div>
            <div className="space-y-2 text-zinc-300 pt-1">
              <div>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <span className="text-cyan-400">1.</span> PRODUCTION LATENCY DISCIPLINE
                </span>
                <p className="text-zinc-400 text-[11px] pl-4 pt-0.5 font-sans">
                  I don't leave models in experimental notebooks. I quantize them to FP16/INT8 with TensorRT, serve them with Triton &amp; FastAPI at sub-40ms P95 latency, and decouple heavy tasks using Celery worker meshes to guarantee zero UI blocking.
                </p>
              </div>
              <div>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <span className="text-emerald-400">2.</span> EMPIRICAL MATHEMATICAL RIGOR
                </span>
                <p className="text-zinc-400 text-[11px] pl-4 pt-0.5 font-sans">
                  Zero data leakage, zero ungrounded claims. Every project is audited with out-of-sample temporal splits, TreeSHAP feature interactions, and Kolmogorov-Smirnov drift testing. In medical CAD, my architecture achieved 0% false positives on 755 test nodules.
                </p>
              </div>
              <div>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <span className="text-purple-400">3.</span> FULL-LIFECYCLE SYSTEMS OWNERSHIP
                </span>
                <p className="text-zinc-400 text-[11px] pl-4 pt-0.5 font-sans">
                  From writing raw SQL star schemas and optimizing window functions to custom neural network layers in PyTorch, Docker multi-stage builds, and Kubernetes manifests—I own the system from data ingestion to user inference.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px]">
              <span className="text-zinc-400">Want to connect directly?</span>
              <span className="text-cyan-300 font-bold cursor-pointer underline hover:text-white" onClick={() => executeCommand("contact")}>
                Run 'contact' or type 'msg &lt;your note&gt;'
              </span>
            </div>
          </div>
        );
        break;

      case "skills":
      case "stack":
        output = (
          <div className="text-zinc-300 space-y-2.5 p-3.5 rounded-xl border border-white/[0.1] bg-[#060812] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
              <span className="text-cyan-400 font-bold tracking-wider">[ PRODUCTION ENGINEERING STACK &amp; PROFICIENCIES ]</span>
              <span className="text-zinc-500 text-[10px]">AUDITED 2026</span>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-cyan-300 font-bold block text-[11px] uppercase">⚡ AI &amp; COMPUTER VISION</span>
                <p className="text-zinc-400 text-[11px]">PyTorch 2.5.1, Torchvision, YOLOv5/v8, ResNet-50, CBAM Dual Attention, Hugging Face, OpenCV 4.9, CUDA 12.6, TorchScript</p>
              </div>
              <div>
                <span className="text-emerald-300 font-bold block text-[11px] uppercase">🚀 INFERENCE &amp; ACCELERATION</span>
                <p className="text-zinc-400 text-[11px]">TensorRT 10.4, Triton Inference Server, ONNX Runtime, FP16/INT8 Quantization, Zero-Copy Tensors, Batch Engine Optimization</p>
              </div>
              <div>
                <span className="text-purple-300 font-bold block text-[11px] uppercase">🌐 DISTRIBUTED BACKENDS &amp; MLOPS</span>
                <p className="text-zinc-400 text-[11px]">FastAPI (Async REST), Celery Workers, Redis Broker &amp; Cache, Docker, Kubernetes, Helm Charts, GitHub Actions CI/CD</p>
              </div>
              <div>
                <span className="text-amber-300 font-bold block text-[11px] uppercase">📊 DATA SCIENCE &amp; EXPLAINABILITY</span>
                <p className="text-zinc-400 text-[11px]">PostgreSQL Star Schemas, Window Functions, Pandas, NumPy, Polars, Scikit-Learn, XGBoost, LightGBM, TreeSHAP, KS-Drift</p>
              </div>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="text-zinc-300 space-y-2.5 p-3.5 rounded-xl border border-white/[0.1] bg-[#060812] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
              <span className="text-cyan-400 font-bold tracking-wider">[ FLAGSHIP ARCHITECTURAL CASE STUDIES ]</span>
              <span className="text-cyan-300 text-[10px]">RUN 'project 1-4' FOR DOSSIER</span>
            </div>
            <div className="space-y-2">
              <div className="border-l-2 border-cyan-400 pl-2.5 cursor-pointer hover:bg-white/[0.02] p-1 rounded" onClick={() => executeCommand("project 1")}>
                <div className="flex items-center justify-between text-white font-bold">
                  <span>01. Real-Time Edge Computer Vision &amp; Detection (YOLOv5-CASP)</span>
                  <span className="text-cyan-300 text-[10px]">24.8ms P95 · 70.9 FPS</span>
                </div>
                <p className="text-zinc-400 text-[11px]">PyTorch · CBAM Attention · ASPP Multi-Scale · TensorRT FP16 · 0% False Positives</p>
              </div>

              <div className="border-l-2 border-emerald-400 pl-2.5 cursor-pointer hover:bg-white/[0.02] p-1 rounded" onClick={() => executeCommand("project 2")}>
                <div className="flex items-center justify-between text-white font-bold">
                  <span>02. Customer Retention &amp; Predictive Risk Modeling Platform</span>
                  <span className="text-emerald-300 text-[10px]">0.914 ROC-AUC</span>
                </div>
                <p className="text-zinc-400 text-[11px]">SQL · Pandas · Scikit-Learn · XGBoost · TreeSHAP · Kolmogorov-Smirnov Drift</p>
              </div>

              <div className="border-l-2 border-purple-400 pl-2.5 cursor-pointer hover:bg-white/[0.02] p-1 rounded" onClick={() => executeCommand("project 3")}>
                <div className="flex items-center justify-between text-white font-bold">
                  <span>03. Industrial Surface Defect Anomaly Classifier</span>
                  <span className="text-purple-300 text-[10px]">97.3% Precision · Sub-40ms</span>
                </div>
                <p className="text-zinc-400 text-[11px]">PyTorch · ResNet-50 · CBAM Dual Attention · Celery · Redis Queue Worker Mesh</p>
              </div>

              <div className="border-l-2 border-amber-400 pl-2.5 cursor-pointer hover:bg-white/[0.02] p-1 rounded" onClick={() => executeCommand("project 4")}>
                <div className="flex items-center justify-between text-white font-bold">
                  <span>04. Enterprise Revenue Analytics &amp; Cohort KPI Platform</span>
                  <span className="text-amber-300 text-[10px]">1.4M Events · Sub-sec SQL</span>
                </div>
                <p className="text-zinc-400 text-[11px]">PostgreSQL Star Schema · Window Functions · Polars · Executive Retention Dashboard</p>
              </div>
            </div>
            <div className="text-[10px] text-zinc-500 pt-1 border-t border-white/[0.06]">
              Tip: Click any project above or type 'project 1' to view architectural schematics.
            </div>
          </div>
        );
        break;

      case "project 1":
      case "casestudy 1":
      case "cat 01":
        output = (
          <div className="space-y-2 p-3.5 rounded-xl border border-cyan-500/30 bg-[#060914] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1.5">
              <span className="text-cyan-300 font-bold text-sm">01. REAL-TIME EDGE VISION &amp; DETECTION (YOLOv5-CASP)</span>
              <span className="text-emerald-400 text-[10px]">SOTA MEDICAL CADx</span>
            </div>
            <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              Engineered an attention-enhanced pulmonary nodule detection architecture combining CBAM, ASPP dilated convolutions ($d=[1,3,5,7]$), and CoT3 contextual self-attention. Achieved a zero false positive rate on 755 test lesions with 24.8ms P95 latency and 70.98 FPS throughput on consumer edge GPUs.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">P95 LATENCY</span>
                <span className="text-cyan-400 font-bold">24.8 ms</span>
              </div>
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">mAP@0.5</span>
                <span className="text-emerald-400 font-bold">0.809 SOTA</span>
              </div>
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">FALSE ALARMS</span>
                <span className="text-purple-400 font-bold">0 FP (0.00%)</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 pt-1">
              Stack: PyTorch 2.5.1 · CUDA 12.1 · OpenCV · TensorRT · FastAPI · Streamlit PACS Workstation
            </p>
          </div>
        );
        break;

      case "project 2":
      case "casestudy 2":
      case "cat 02":
        output = (
          <div className="space-y-2 p-3.5 rounded-xl border border-emerald-500/30 bg-[#060914] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-1.5">
              <span className="text-emerald-300 font-bold text-sm">02. CUSTOMER RETENTION &amp; PREDICTIVE RISK MODELING</span>
              <span className="text-emerald-400 text-[10px]">0.914 ROC-AUC</span>
            </div>
            <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              Designed a production customer churn scoring platform with Bayesian hyperparameter tuning, TreeSHAP marginal attribution to eliminate black-box opacity, and automated Kolmogorov-Smirnov distribution drift monitoring.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">DISCRIMINATION</span>
                <span className="text-emerald-400 font-bold">0.914 ROC-AUC</span>
              </div>
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">EXPLAINABILITY</span>
                <span className="text-cyan-400 font-bold">TreeSHAP Values</span>
              </div>
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">DRIFT AUDIT</span>
                <span className="text-purple-400 font-bold">KS-Test p &gt; 0.05</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 pt-1">
              Stack: SQL · Pandas · Scikit-Learn · XGBoost · LightGBM · TreeSHAP · FastAPI
            </p>
          </div>
        );
        break;

      case "project 3":
      case "casestudy 3":
      case "cat 03":
        output = (
          <div className="space-y-2 p-3.5 rounded-xl border border-purple-500/30 bg-[#060914] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-1.5">
              <span className="text-purple-300 font-bold text-sm">03. INDUSTRIAL SURFACE DEFECT ANOMALY CLASSIFIER</span>
              <span className="text-purple-400 text-[10px]">97.3% PRECISION</span>
            </div>
            <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              Industrial vision defect classification system leveraging ResNet-50 augmented with Channel &amp; Spatial attention mechanisms. Powered by a decoupled background Celery worker mesh over a Redis broker to absorb production conveyor-belt bursts without frame drops.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">PRECISION</span>
                <span className="text-purple-400 font-bold">97.3% Precision</span>
              </div>
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">WORKER MESH</span>
                <span className="text-cyan-400 font-bold">Celery + Redis</span>
              </div>
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">PROCESSING</span>
                <span className="text-emerald-400 font-bold">&lt; 40ms Async</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 pt-1">
              Stack: PyTorch 2.5 · ResNet-50 · CBAM · Celery · Redis · Docker · FastAPI
            </p>
          </div>
        );
        break;

      case "project 4":
      case "casestudy 4":
      case "cat 04":
        output = (
          <div className="space-y-2 p-3.5 rounded-xl border border-amber-500/30 bg-[#060914] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
              <span className="text-amber-300 font-bold text-sm">04. ENTERPRISE REVENUE &amp; COHORT KPI PLATFORM</span>
              <span className="text-amber-400 text-[10px]">1.4M EVENTS</span>
            </div>
            <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              High-throughput revenue analytics pipeline handling 1.4M transactional events using an optimized PostgreSQL Star Schema, composite indexes, and complex window functions to deliver sub-second multi-cohort analytics.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">SCALE</span>
                <span className="text-amber-400 font-bold">1.4M Rows</span>
              </div>
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">QUERY SPEED</span>
                <span className="text-cyan-400 font-bold">&lt; 280ms SQL</span>
              </div>
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px]">SCHEMA</span>
                <span className="text-emerald-400 font-bold">Star Schema</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 pt-1">
              Stack: PostgreSQL 16 · SQL Window Functions · Polars · Pandas · FastAPI
            </p>
          </div>
        );
        break;

      case "experience":
      case "career":
      case "timeline":
        output = (
          <div className="space-y-3 p-4 rounded-xl border border-white/[0.1] bg-[#060810] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
              <span className="text-cyan-400 font-bold tracking-wider">[ PROFESSIONAL &amp; ACADEMIC TRAJECTORY ]</span>
              <span className="text-zinc-500 text-[10px]">ANUJ MUNDU</span>
            </div>
            <div className="space-y-2.5">
              <div className="border-l-2 border-cyan-400 pl-3 space-y-0.5">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>MCA — Master of Computer Applications</span>
                  <span className="text-cyan-300 text-[10px]">2023 — 2026</span>
                </div>
                <p className="text-emerald-400 text-[11px]">MANIT Bhopal (Maulana Azad National Institute of Technology)</p>
                <p className="text-zinc-400 text-[11px] font-sans">
                  Specialization in Deep Learning architectures, Medical CADx systems, and distributed queuing. Co-authored official thesis on YOLOv5-CASP with MANIT faculty.
                </p>
              </div>
              <div className="border-l-2 border-emerald-400 pl-3 space-y-0.5">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>AI/ML Systems Engineer &amp; Open-Source Architect</span>
                  <span className="text-emerald-300 text-[10px]">2023 — PRESENT</span>
                </div>
                <p className="text-zinc-400 text-[11px] font-sans">
                  Engineered 15 production repositories spanning Edge Vision, Predictive Risk Modeling, Distributed MLOps, and Real-Time ETL Pipelines.
                </p>
              </div>
              <div className="border-l-2 border-purple-400 pl-3 space-y-0.5">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>B.Sc (Hons) Computer Science</span>
                  <span className="text-purple-300 text-[10px]">2020 — 2023</span>
                </div>
                <p className="text-zinc-400 text-[11px]">Guru Ghasidas Vishwavidyalaya (Central University) · CGPA: 8.86</p>
                <p className="text-zinc-400 text-[11px] font-sans">
                  Rigorous foundational training in Data Structures, Algorithms, Discrete Mathematics, Relational Database Internals, and Computer Architecture.
                </p>
              </div>
            </div>
          </div>
        );
        break;

      case "metrics":
      case "stats":
        output = (
          <div className="space-y-2.5 p-3.5 rounded-xl border border-white/[0.1] bg-[#060810] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
              <span className="text-cyan-400 font-bold tracking-wider">[ VERIFIED PRODUCTION METRICS ]</span>
              <span className="text-emerald-400 text-[10px]">AUDITED TELEMETRY</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px] uppercase">P95 LATENCY</span>
                <div className="text-cyan-400 text-base font-extrabold">24.8 ms</div>
                <p className="text-zinc-500 text-[10px]">Edge YOLOv5 Inference</p>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px] uppercase">DISCRIMINATION</span>
                <div className="text-emerald-400 text-base font-extrabold">0.914</div>
                <p className="text-zinc-500 text-[10px]">XGBoost Tabular ROC-AUC</p>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px] uppercase">FALSE ALARMS</span>
                <div className="text-purple-400 text-base font-extrabold">0.00%</div>
                <p className="text-zinc-500 text-[10px]">Zero FP on 755 Test Nodule Scans</p>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
                <span className="text-zinc-500 block text-[9px] uppercase">TEST COVERAGE</span>
                <div className="text-amber-400 text-base font-extrabold">100%</div>
                <p className="text-zinc-500 text-[10px]">Automated PyTest Pass</p>
              </div>
            </div>
          </div>
        );
        break;

      case "interview":
        output = (
          <div className="space-y-2.5 p-3.5 rounded-xl border border-purple-500/30 bg-[#070914] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-1.5">
              <span className="text-purple-300 font-bold tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                INTERACTIVE TECHNICAL INTERVIEW AUDIT
              </span>
              <span className="text-[10px] text-zinc-500">TYPE 'interview 1-4' TO AUDIT</span>
            </div>
            <p className="text-zinc-300 text-[11px] font-sans">
              Select any core engineering question to audit Anuj's technical response and architectural mindset:
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:border-purple-400/50" onClick={() => executeCommand("interview 1")}>
                <span className="text-purple-300 font-bold">Q1:</span> "How do you achieve sub-40ms P95 latency for deep learning models in production?"
              </div>
              <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:border-purple-400/50" onClick={() => executeCommand("interview 2")}>
                <span className="text-purple-300 font-bold">Q2:</span> "How do you prevent data leakage and detect feature drift in tabular ML?"
              </div>
              <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:border-purple-400/50" onClick={() => executeCommand("interview 3")}>
                <span className="text-purple-300 font-bold">Q3:</span> "Why do you use Celery and Redis rather than synchronous FastAPI background tasks?"
              </div>
              <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:border-purple-400/50" onClick={() => executeCommand("interview 4")}>
                <span className="text-purple-300 font-bold">Q4:</span> "How do you ensure reproducibility and zero alert fatigue in medical vision systems?"
              </div>
            </div>
          </div>
        );
        break;

      case "interview 1":
        output = (
          <div className="space-y-2 p-3.5 rounded-xl border border-cyan-500/30 bg-[#060914] text-xs font-mono">
            <div className="text-cyan-300 font-bold">Q1: How do you achieve sub-40ms P95 latency in production?</div>
            <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              "First, I profile the entire inference graph to eliminate Python overhead. In PyTorch, I export weights to ONNX with constant folding and compile to a TensorRT execution engine with FP16/INT8 calibration, which executes parallel GPU kernel fusions. Second, for network serving, I use uvloop-backed FastAPI with Pydantic V2 zero-copy validation and serve through Triton Inference Server with dynamic batching. In my edge vision benchmark, this reduced P95 latency from 88ms down to 24.8ms while streaming at 70.98 FPS."
            </p>
          </div>
        );
        break;

      case "interview 2":
        output = (
          <div className="space-y-2 p-3.5 rounded-xl border border-emerald-500/30 bg-[#060914] text-xs font-mono">
            <div className="text-emerald-300 font-bold">Q2: How do you prevent data leakage and detect feature drift?</div>
            <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              "Data leakage often occurs when feature scalers or target encodings fit on the entire dataset prior to cross-validation. I strictly encapsulate all feature transformations inside Scikit-Learn Pipelines fitted strictly on training folds, and evaluate models using temporal out-of-time test partitions. In production, I deploy automated two-sample Kolmogorov-Smirnov (KS) tests and Population Stability Index (PSI) to compare live feature distributions against baseline training distributions, alerting if drift p-value drops below 0.05."
            </p>
          </div>
        );
        break;

      case "interview 3":
        output = (
          <div className="space-y-2 p-3.5 rounded-xl border border-purple-500/30 bg-[#060914] text-xs font-mono">
            <div className="text-purple-300 font-bold">Q3: Why Celery + Redis instead of synchronous background tasks?</div>
            <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              "FastAPI's built-in BackgroundTasks run inside the same asyncio process. Heavy CPU or GPU tensor computations block the event loop, causing request timeouts for other concurrent users. Furthermore, in-memory tasks are lost if a pod crashes. With Celery and a Redis broker, CPU-bound inference is offloaded to a decoupled worker mesh that auto-scales independently, supports retry policies, dead-letter queues, and survives container restarts with zero packet loss."
            </p>
          </div>
        );
        break;

      case "interview 4":
        output = (
          <div className="space-y-2 p-3.5 rounded-xl border border-amber-500/30 bg-[#060914] text-xs font-mono">
            <div className="text-amber-300 font-bold">Q4: How do you ensure reproducibility and zero alert fatigue?</div>
            <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              "In clinical Computer-Aided Detection (CAD), false positives cause alert fatigue, leading radiologists to distrust the system. In YOLOv5-CASP, I integrated CBAM attention with ASPP multi-scale receptive fields to distinguish true lesions from vessel junctions. I calibrated detection confidence thresholds against multicenter hospital datasets (NIH ChestX-ray 14, X-Nodule), maintaining a 0% false alarm rate on 755 test nodules while preserving 97.7% sensitivity."
            </p>
          </div>
        );
        break;

      case "resume":
        output = (
          <div className="space-y-2.5 p-3.5 rounded-xl border border-amber-500/30 bg-[#070912] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                ANUJ MUNDU // EXECUTIVE RESUME SUMMARY
              </span>
              <a
                href="/resume"
                target="_blank"
                rel="noreferrer"
                className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-400 hover:text-black transition-all flex items-center gap-1 text-[10px]"
              >
                <span>OPEN FULL RESUME</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <p className="text-zinc-300 text-[11px]">
              AI/ML Engineer · Data Scientist · Backend Systems Architect
            </p>
            <div className="space-y-1 text-zinc-400 text-[11px]">
              <p>• <span className="text-white font-bold">Education:</span> MCA @ MANIT Bhopal (2023-2026) | B.Sc CS @ GGV (CGPA: 8.86)</p>
              <p>• <span className="text-white font-bold">Key Skills:</span> PyTorch, TensorRT, Triton, FastAPI, Celery, Redis, PostgreSQL, Kubernetes</p>
              <p>• <span className="text-white font-bold">Direct Email:</span> <span className="text-amber-300">anujmark.edwin.ame@gmail.com</span></p>
            </div>
          </div>
        );
        break;

      case "academics":
      case "education":
        output = (
          <div className="space-y-2 p-3.5 rounded-xl border border-emerald-500/30 bg-[#060912] text-xs font-mono">
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-1.5">
              <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                ACADEMIC CREDENTIALS &amp; RESEARCH THESIS
              </span>
              <span className="text-[10px] text-zinc-500">NATIONAL INSTITUTE OF TECHNOLOGY</span>
            </div>
            <div className="space-y-2 text-zinc-300 text-[11px]">
              <div>
                <span className="text-white font-bold">Master of Computer Applications (MCA)</span> — MANIT Bhopal (2023–2026)
                <p className="text-zinc-400 font-sans mt-0.5">
                  Thesis: "Automated Multi-Modal Pulmonary Nodule Detection using YOLOv5-CASP with Channel &amp; Spatial Attention". Co-authored with Dr. Ghanshyam Singh Thakur and Dr. Sanjivani Joshi.
                </p>
              </div>
              <div className="border-t border-white/[0.06] pt-1.5">
                <span className="text-white font-bold">B.Sc (Hons) Computer Science</span> — Guru Ghasidas Vishwavidyalaya (2020–2023)
                <p className="text-zinc-400 font-sans mt-0.5">
                  Graduated with CGPA 8.86. First Class with Distinction. Core coursework in Algorithms, Discrete Mathematics, and Database Systems.
                </p>
              </div>
            </div>
          </div>
        );
        break;

      case "roles":
        output = (
          <div className="text-zinc-300 space-y-1.5 p-3 rounded-xl border border-white/[0.1] bg-[#060810] text-xs font-mono">
            <p className="text-cyan-400 font-bold">[ TARGET ENGINEERING ROLES &amp; FIT ]</p>
            <p>• <span className="text-white font-bold">AI / Machine Learning Engineer</span> — Model architecture, quantization (TensorRT), Triton model serving, inference pipelines</p>
            <p>• <span className="text-white font-bold">Data Scientist</span> — Predictive risk modeling, statistical inference, Bayesian optimization, TreeSHAP explainability</p>
            <p>• <span className="text-white font-bold">Backend &amp; MLOps Systems Engineer</span> — Asynchronous FastAPI gateways, Celery worker meshes, Redis brokers, Kubernetes manifests</p>
            <p>• <span className="text-white font-bold">Computer Vision Engineer</span> — Real-time edge object detection, attention mechanisms (CBAM), anomaly classification</p>
          </div>
        );
        break;

      case "neofetch":
      case "fastfetch":
        playSuccess();
        output = (
          <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl bg-[#060914] border border-cyan-500/25 text-xs font-mono">
            <div className="text-cyan-400 font-bold leading-tight select-none font-mono">
{`  ┌───────────┐
  │  [AI/ML]  │
  │  ┌─────┐  │
  │  │  ▲  │  │
  │  └─────┘  │
  │   GPU-01  │
  └───────────┘`}
            </div>
            <div className="space-y-1 text-zinc-300 flex-1">
              <p><span className="text-cyan-400 font-bold">USER:</span> anuj @ titan-cluster-01</p>
              <p><span className="text-cyan-400 font-bold">ROLE:</span> AI/ML Systems Engineer &amp; Data Scientist</p>
              <p><span className="text-cyan-400 font-bold">EDUCATION:</span> MCA @ MANIT Bhopal (National Institute of Technology)</p>
              <p><span className="text-cyan-400 font-bold">ACCELERATOR:</span> NVIDIA GeForce RTX 4090 (24,576 MiB VRAM)</p>
              <p><span className="text-cyan-400 font-bold">INFERENCE ENGINE:</span> TensorRT 10.4 + Triton Inference Server</p>
              <p><span className="text-cyan-400 font-bold">MESSAGE BROKER:</span> Redis Cluster + Celery Distributed Mesh</p>
              <p><span className="text-cyan-400 font-bold">CONTAINER MESH:</span> Kubernetes 1.31 / Docker Swarm (Cgroups V2)</p>
              <p><span className="text-cyan-400 font-bold">STATUS:</span> Open for High-Impact Opportunities</p>
              <div className="pt-1.5 flex gap-1">
                <span className="w-3 h-3 bg-red-500 rounded-sm inline-block" />
                <span className="w-3 h-3 bg-amber-500 rounded-sm inline-block" />
                <span className="w-3 h-3 bg-emerald-500 rounded-sm inline-block" />
                <span className="w-3 h-3 bg-cyan-500 rounded-sm inline-block" />
                <span className="w-3 h-3 bg-blue-500 rounded-sm inline-block" />
                <span className="w-3 h-3 bg-purple-500 rounded-sm inline-block" />
              </div>
            </div>
          </div>
        );
        break;

      case "benchmark":
      case "stress":
        playSuccess();
        output = (
          <div className="space-y-2 p-3 rounded-xl bg-zinc-950/80 border border-amber-500/30 text-xs font-mono">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span>LOAD INJECTION ROUTINE: 10,000 REQ/SEC</span>
              <span className="text-emerald-400">PASSED [100%]</span>
            </div>
            <div className="space-y-1 text-zinc-300">
              <p>Warming up async connection pool (uvloop + Redis 7.2)...</p>
              <p className="text-emerald-400">Target Ingestion: [████████████████████] 10,000 / 10,000 RPS</p>
              <p>P50 Latency: <span className="text-cyan-400 font-bold">18.2 ms</span></p>
              <p>P95 Latency: <span className="text-cyan-400 font-bold">37.4 ms</span> (SLA Target: &lt;50 ms)</p>
              <p>P99 Latency: <span className="text-cyan-400 font-bold">48.9 ms</span></p>
              <p>Packet Drop Rate: <span className="text-emerald-400 font-bold">0.0000% (Zero loss across 50,000 packets)</span></p>
              <p className="text-[11px] text-zinc-500">Benchmark signed by Automated Prometheus Exporter.</p>
            </div>
          </div>
        );
        break;

      case "train":
        playSuccess();
        output = (
          <div className="space-y-2 p-3 rounded-xl bg-zinc-950/80 border border-emerald-500/30 text-xs font-mono">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>PYTORCH DEEP TRAINING LOOP (ResNet50 + CBAM Attention)</span>
              <span>CONVERGED</span>
            </div>
            <div className="space-y-1 text-zinc-300">
              <p>Epoch 1/5: [=========&gt;...................] Loss: 0.7412 | LR: 1e-4 | Val_Acc: 74.2%</p>
              <p>Epoch 2/5: [==============&gt;..............] Loss: 0.4109 | LR: 3e-4 | Val_Acc: 88.5%</p>
              <p>Epoch 3/5: [====================&gt;.........] Loss: 0.2284 | LR: 2e-4 | Val_Acc: 94.1%</p>
              <p>Epoch 4/5: [==========================&gt;...] Loss: 0.1205 | LR: 5e-5 | Val_Acc: 96.8%</p>
              <p className="text-emerald-400 font-bold">Epoch 5/5: [==============================] Loss: 0.0612 | LR: 1e-5 | Val_Acc: 98.9%</p>
              <div className="p-1.5 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 mt-2">
                STATUS: Model compiled with TensorRT FP16 quantization. Checkpoint saved to /weights/best.onnx (42.1 MB).
              </div>
            </div>
          </div>
        );
        break;

      case "contact":
      case "socials":
      case "links":
        output = (
          <div className="text-zinc-300 space-y-1.5 p-3.5 rounded-xl border border-cyan-500/30 bg-[#060812] text-xs font-mono">
            <p className="text-cyan-400 font-bold">[ DIRECT COMMUNICATIONS &amp; SOCIALS ]</p>
            <p>GitHub: <a href="https://github.com/anujmundu" target="_blank" rel="noreferrer" className="text-emerald-400 underline hover:text-white">github.com/anujmundu</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/anujmundu" target="_blank" rel="noreferrer" className="text-cyan-400 underline hover:text-white">linkedin.com/in/anujmundu</a></p>
            <p>Direct Gmail: <span className="text-amber-300 font-bold">anujmark.edwin.ame@gmail.com</span></p>
            <p className="text-emerald-300 pt-1">⚡ Fast Terminal Dispatch: type <span className="text-white font-bold bg-white/[0.1] px-1 rounded">msg &lt;your note&gt;</span> to send directly to Anuj's inbox!</p>
            <p className="text-[11px] text-zinc-500">Location: Bhopal, India · Open for Global Remote &amp; Relocation</p>
          </div>
        );
        break;

      case "sudo":
      case "sudo rm -rf /*":
      case "rm":
        playChirp();
        output = (
          <div className="p-2.5 rounded-lg border border-red-500/40 bg-red-950/30 text-red-300 text-xs font-mono">
            <p className="font-bold">🚨 SECURITY ALERT: ACCESS_DENIED_HONEYPOT_TRIGGERED</p>
            <p className="text-[11px] text-zinc-300 mt-1 font-sans">
              Nice try! But Anuj's infrastructure executes within immutable Linux read-only cgroups with automated self-healing K8s replica pods. Zero damage incurred 🛡️
            </p>
          </div>
        );
        break;

      default:
        output = (
          <p className="text-red-400 text-xs font-mono">
            zsh: command not found: "{cmd}". Type <span className="text-white font-bold underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> or <span className="text-cyan-300 underline cursor-pointer" onClick={() => executeCommand("pitch")}>pitch</span> to view system routines.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`w-full ${
              isFullscreen ? "max-w-[96vw] h-[92vh]" : "max-w-3xl h-[560px]"
            } bg-[#07090e] border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-950/40 overflow-hidden font-mono text-sm flex flex-col relative transition-all duration-300`}
          >
            {/* CRT Screen Scanline Overlay Effect */}
            {crtEnabled && (
              <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
            )}

            {/* Matrix Rain Canvas Overlay */}
            {isMatrixRunning && (
              <div className="absolute inset-0 z-10 bg-[#07080a]">
                <canvas ref={canvasRef} className="w-full h-full block" />
                <button
                  onClick={() => setIsMatrixRunning(false)}
                  className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                >
                  [ STOP MATRIX STREAM ]
                </button>
              </div>
            )}

            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#0c0f18] border-b border-cyan-500/20 shrink-0">
              {/* Left Mac/Linux Window Dots */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
                  title="Close Terminal"
                />
                <button
                  onClick={() => setHistory([])}
                  className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer"
                  title="Clear Terminal Output"
                />
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer"
                  title="Toggle Fullscreen"
                />

                <div className="flex items-center gap-1.5 ml-2 text-xs text-zinc-400">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-bold text-zinc-200">anuj@system: ~/portfolio (sh)</span>
                </div>
              </div>

              {/* Right Telemetry & Controls */}
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <div className="hidden md:flex items-center gap-2 text-zinc-500 border border-white/[0.06] bg-black/40 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SSH-2.0</span>
                  <span>·</span>
                  <span className="text-cyan-400">RTX 4090</span>
                  <span>·</span>
                  <span>RAM: 4.8/32 GB</span>
                </div>

                {/* CRT Toggle */}
                <button
                  onClick={() => setCrtEnabled(!crtEnabled)}
                  className={`px-1.5 py-0.5 rounded border text-[10px] transition-colors cursor-pointer ${
                    crtEnabled ? "border-cyan-500/40 text-cyan-300 bg-cyan-950/30" : "border-zinc-700 text-zinc-500"
                  }`}
                  title="Toggle CRT Scanline Effect"
                >
                  CRT
                </button>

                {/* Audio Toggle */}
                <button
                  onClick={() => setSoundActive(toggleSound())}
                  className="p-1 rounded text-zinc-400 hover:text-cyan-400 hover:bg-white/[0.05] transition-colors cursor-pointer"
                  title={soundActive ? "Audio Mute" : "Audio Unmute"}
                >
                  {soundActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1 rounded text-zinc-400 hover:text-cyan-400 hover:bg-white/[0.05] transition-colors cursor-pointer"
                  title="Toggle Maximize"
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-white/[0.05] transition-colors cursor-pointer"
                  title="Exit"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 cursor-text text-zinc-200 selection:bg-cyan-500/30"
            >
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  {item.command !== "init" && (
                    <div className="flex items-center gap-2 text-zinc-400 text-xs">
                      <span className="text-cyan-400 font-bold">anuj@system:~$</span>
                      <span className="text-white font-semibold">{item.command}</span>
                    </div>
                  )}
                  <div className="pl-0">{item.output}</div>
                </div>
              ))}

              {/* Active Prompt Line */}
              <div className="flex items-center gap-2 text-zinc-200 pt-1 text-xs sm:text-sm">
                <span className="text-cyan-400 font-bold whitespace-nowrap">anuj@system:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none border-none text-white font-mono p-0 focus:ring-0"
                  autoFocus
                  placeholder="type command ('whoami', 'pitch', 'skills', 'projects', 'interview', 'metrics', 'help')..."
                />
              </div>
            </div>

            {/* Interactive Quick-Action Command Chips Toolbar */}
            <div className="p-2 sm:px-3 sm:py-2 bg-[#0a0d15] border-t border-cyan-500/20 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
              <div className="flex items-center gap-1.5 text-[11px] font-mono shrink-0">
                <span className="text-zinc-500 text-[10px] hidden sm:inline">QUICK:</span>
                {[
                  { label: "whoami", icon: null },
                  { label: "pitch", icon: Sparkles },
                  { label: "skills", icon: null },
                  { label: "projects", icon: null },
                  { label: "interview", icon: Activity },
                  { label: "metrics", icon: Play },
                  { label: "resume", icon: null },
                  { label: "neofetch", icon: Cpu },
                  { label: "contact", icon: null },
                  { label: "clear", icon: RotateCcw }
                ].map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => {
                      executeCommand(chip.label);
                      inputRef.current?.focus();
                    }}
                    className="px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-950/30 transition-all text-[11px] cursor-pointer whitespace-nowrap flex items-center gap-1"
                  >
                    {chip.icon && <chip.icon className="w-3 h-3 text-cyan-400" />}
                    {chip.label}
                  </button>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-2 text-[10px] text-zinc-500 shrink-0">
                <span>Tab autocomplete</span>
                <span>·</span>
                <span>↑/↓ history</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
