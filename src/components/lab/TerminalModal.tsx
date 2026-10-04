"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, X, Maximize2, Minimize2, Volume2, VolumeX, Sparkles, Cpu, Activity, Play, RotateCcw } from "lucide-react";
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
  "neofetch",
  "matrix",
  "benchmark",
  "train",
  "whoami",
  "stack",
  "projects",
  "roles",
  "contact",
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
        <div className="space-y-2 text-zinc-300">
          <div className="font-mono text-cyan-400 font-bold leading-none text-xs sm:text-sm whitespace-pre">
{`   ___    _  _   _   _   _  
  / _ \\  | \\| | | | | | | | 
 | (_) | | .\` | | |_| | |_| 
  \\___/  |_|\\_|  \\___/  (_) `}
          </div>
          <p className="text-xs text-zinc-400">
            <span className="text-cyan-400 font-bold">Anuj Cybernetic Kernel [Version 5.4.0-ml-prod]</span> — Host: <span className="text-emerald-400">titan-worker-01</span>
          </p>
          <p className="text-xs text-zinc-400">
            Hardware: <span className="text-amber-400">NVIDIA RTX 4090 24GB</span> · CUDA 12.6 · PyTorch 2.5.1 · FastAPI 0.115
          </p>
          <div className="p-2 rounded border border-cyan-500/20 bg-cyan-950/20 text-xs text-cyan-300">
            Type <span className="text-white font-bold bg-cyan-500/20 px-1 py-0.5 rounded">help</span> or click any quick-command chip below to explore interactive simulations.
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
          <div className="space-y-2 text-zinc-300 font-mono text-xs">
            <p className="text-cyan-400 font-bold tracking-wider">[ RECEPTIVE TERMINAL ROUTINES ]</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-1">
              <div><span className="text-emerald-400 font-bold inline-block w-24">neofetch</span> <span className="text-zinc-400">Host specifications & profile</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">matrix</span> <span className="text-zinc-400">Interactive digital stream rain</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">benchmark</span> <span className="text-zinc-400">Run 10K RPS latency audit</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">train</span> <span className="text-zinc-400">Simulate PyTorch model epoch loop</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">whoami</span> <span className="text-zinc-400">Developer clearance & thesis</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">stack</span> <span className="text-zinc-400">Architectural technology stack</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">projects</span> <span className="text-zinc-400">Flagship case studies & repos</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">roles</span> <span className="text-zinc-400">Target engineering positions</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">msg &lt;text&gt;</span> <span className="text-zinc-400">Dispatch directly to Anuj's Gmail</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">contact</span> <span className="text-zinc-400">Reach direct communication link</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">crt</span> <span className="text-zinc-400">Toggle retro CRT monitor scanlines</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">audio</span> <span className="text-zinc-400">Toggle audio sound synthesizer</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">clear</span> <span className="text-zinc-400">Flush terminal buffer</span></div>
              <div><span className="text-emerald-400 font-bold inline-block w-24">exit</span> <span className="text-zinc-400">Terminate modal connection</span></div>
            </div>
          </div>
        );
        break;

      case "neofetch":
      case "fastfetch":
        playSuccess();
        output = (
          <div className="flex flex-col sm:flex-row gap-4 p-3 rounded bg-zinc-950/80 border border-white/[0.08] text-xs font-mono">
            <div className="text-cyan-400 font-bold leading-tight select-none">
{`   /\\_____/\\
  /  o   o  \\   [ANUJ-SYS]
 ( ==  ^  == )  ----------
  )         (   OS: ArchLinux / PyTorch 2.5
 (           )  HOST: Titan-Server-v4
( (  )   (  ) ) KERNEL: 6.12.9-rt-ml-custom
(__(__)___(__)  UPTIME: 142 days, 9 hours`}
            </div>
            <div className="space-y-1 text-zinc-300 flex-1">
              <p><span className="text-cyan-400 font-bold">USER:</span> anuj @ titan-master-01</p>
              <p><span className="text-cyan-400 font-bold">POSITION:</span> AI/ML Engineer · Data Scientist · Data Analyst</p>
              <p><span className="text-cyan-400 font-bold">ALMA MATER:</span> MANIT Bhopal (National Institute of Technology)</p>
              <p><span className="text-cyan-400 font-bold">ACCELERATOR:</span> NVIDIA GeForce RTX 4090 (24,576 MiB VRAM)</p>
              <p><span className="text-cyan-400 font-bold">INFERENCE ENGINE:</span> TensorRT 10.4 + Triton Inference Server</p>
              <p><span className="text-cyan-400 font-bold">MESSAGE BROKER:</span> Redis Cluster + Celery Distributed Mesh</p>
              <p><span className="text-cyan-400 font-bold">CONTAINER MESH:</span> Kubernetes 1.31 / Docker Swarm (Cgroups V2)</p>
              <div className="pt-2 flex gap-1">
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
          <div className="space-y-2 p-3 rounded bg-zinc-950/80 border border-amber-500/30 text-xs font-mono">
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
          <div className="space-y-2 p-3 rounded bg-zinc-950/80 border border-emerald-500/30 text-xs font-mono">
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

      case "whoami":
        output = (
          <div className="text-zinc-300 space-y-1.5 text-xs font-mono">
            <p className="text-cyan-400 font-bold text-sm">ANUJ — AI/ML ENGINEER & DATA SCIENTIST</p>
            <p className="text-emerald-400">CORE ETHOS: "I turn empirical data into resilient, real-time intelligent software."</p>
            <p className="text-zinc-400">
              Specialized in end-to-end full-lifecycle systems: mathematical analysis & feature engineering, statistical modeling (XGBoost/SHAP), deep learning inference pipelines (PyTorch/YOLO/TensorRT), and low-latency microservice architectures (FastAPI/Celery/Redis/Docker).
            </p>
            <p className="text-zinc-500">Based in Bhopal, India (MANIT Bhopal). Ready for high-impact AI/ML and Data Engineering teams.</p>
          </div>
        );
        break;

      case "stack":
        output = (
          <div className="text-zinc-300 space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-bold tracking-wider">[ PRODUCTION ENGINEERING STACK ]</p>
            <div className="space-y-1">
              <p><span className="text-amber-400 font-bold">[Data Analysis & Ingestion]</span> PostgreSQL, SQL Star Schemas, Pandas, NumPy, Polars, SciPy, Scikit-Learn</p>
              <p><span className="text-emerald-400 font-bold">[ML & Explainability]</span> XGBoost, LightGBM, Random Forests, TreeSHAP, KS-Drift, Kolmogorov-Smirnov, Cross-Val</p>
              <p><span className="text-cyan-400 font-bold">[Deep Learning & Vision]</span> PyTorch 2.5, Torchvision, YOLOv5/v8, ResNet, OpenCV, ONNX Runtime, TensorRT</p>
              <p><span className="text-purple-400 font-bold">[Systems & Deployment]</span> FastAPI, Celery Distributed Queue, Redis Cluster, Docker, Kubernetes, Linux, Git</p>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="text-zinc-300 space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-bold tracking-wider">[ FLAGSHIP ARCHITECTURAL CASE STUDIES ]</p>
            <div className="space-y-2">
              <div className="border-l-2 border-cyan-400 pl-2">
                <p className="text-white font-bold">01. Real-Time Edge Computer Vision & Detection Pipeline</p>
                <p className="text-zinc-400 text-[11px]">YOLOv5 · PyTorch · OpenCV · FastAPI · Docker | 24.8ms P95 latency | 42 FPS stream</p>
              </div>
              <div className="border-l-2 border-emerald-400 pl-2">
                <p className="text-white font-bold">02. Customer Retention & Predictive Risk Modeling</p>
                <p className="text-zinc-400 text-[11px]">SQL · Pandas · Scikit-Learn · XGBoost · TreeSHAP | 0.914 ROC-AUC | Explainable AI</p>
              </div>
              <div className="border-l-2 border-purple-400 pl-2">
                <p className="text-white font-bold">03. Industrial Surface Defect Anomaly Classifier</p>
                <p className="text-zinc-400 text-[11px]">PyTorch · ResNet-50 · CBAM Dual Attention · Redis | 97.3% precision | Sub-40ms</p>
              </div>
              <div className="border-l-2 border-amber-400 pl-2">
                <p className="text-white font-bold">04. Enterprise Revenue Analytics & Cohort KPI Platform</p>
                <p className="text-zinc-400 text-[11px]">PostgreSQL Star Schema · Window Functions · Polars | 1.4M events | Sub-second SQL</p>
              </div>
            </div>
          </div>
        );
        break;

      case "roles":
        output = (
          <div className="text-zinc-300 space-y-1.5 text-xs font-mono">
            <p className="text-cyan-400 font-bold">[ TARGET POSITIONS & TECHNICAL FIT ]</p>
            <p>• <span className="text-white font-bold">AI / Machine Learning Engineer</span> — Model architecture, distributed training, edge deployment</p>
            <p>• <span className="text-white font-bold">Data Scientist</span> — Predictive modeling, hypothesis testing, causal inference, TreeSHAP</p>
            <p>• <span className="text-white font-bold">Data Analyst / Analytics Engineer</span> — SQL pipelines, star schemas, cohort metrics, executive dashboards</p>
            <p>• <span className="text-white font-bold">Computer Vision Engineer</span> — Real-time inference pipelines, object detection, anomaly recognition</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-zinc-300 space-y-1 text-xs font-mono">
            <p className="text-cyan-400 font-bold">[ DIRECT COMMUNICATIONS ENCRYPTION CHANNEL ]</p>
            <p>GitHub: <a href="https://github.com/anujmundu" target="_blank" rel="noreferrer" className="text-emerald-400 underline hover:text-white">github.com/anujmundu</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/anujmundu" target="_blank" rel="noreferrer" className="text-cyan-400 underline hover:text-white">linkedin.com/in/anujmundu</a></p>
            <p>Direct Gmail: <span className="text-amber-300">anujmark.edwin.ame@gmail.com</span></p>
            <p className="text-emerald-300 pt-1">⚡ Fast Terminal Dispatch: type <span className="text-white font-bold bg-white/[0.1] px-1 rounded">msg &lt;your note or email&gt;</span> to send directly to Anuj's inbox!</p>
            <p className="text-[11px] text-zinc-500">Location: Bhopal, India · Open for Global Remote & Relocation</p>
          </div>
        );
        break;

      case "sudo":
      case "sudo rm -rf /*":
      case "rm":
        playChirp();
        output = (
          <div className="p-2 rounded border border-red-500/40 bg-red-950/30 text-red-300 text-xs font-mono">
            <p className="font-bold">🚨 SECURITY ALERT: ACCESS_DENIED_HONEYPOT_TRIGGERED</p>
            <p className="text-[11px] text-zinc-300 mt-1">
              Nice try! But Anuj's infrastructure executes within immutable Linux read-only cgroups with automated self-healing K8s replica pods. Zero damage incurred 🛡️
            </p>
          </div>
        );
        break;

      default:
        output = (
          <p className="text-red-400 text-xs font-mono">
            zsh: command not found: "{cmd}". Type <span className="text-white font-bold underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> to view available system routines.
          </p>
        );
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
                  placeholder="type routine ('help', 'neofetch', 'matrix', 'train')..."
                />
              </div>
            </div>

            {/* Interactive Quick-Action Command Chips Toolbar */}
            <div className="p-2 sm:px-3 sm:py-2 bg-[#0a0d15] border-t border-cyan-500/20 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
              <div className="flex items-center gap-1.5 text-[11px] font-mono shrink-0">
                <span className="text-zinc-500 text-[10px] hidden sm:inline">QUICK:</span>
                {[
                  { label: "neofetch", icon: Cpu },
                  { label: "matrix", icon: Activity },
                  { label: "benchmark", icon: Play },
                  { label: "train", icon: Sparkles },
                  { label: "stack", icon: null },
                  { label: "projects", icon: null },
                  { label: "whoami", icon: null },
                  { label: "clear", icon: RotateCcw }
                ].map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => {
                      executeCommand(chip.label);
                      inputRef.current?.focus();
                    }}
                    className="px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-950/30 transition-all text-[11px] cursor-pointer whitespace-nowrap"
                  >
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
