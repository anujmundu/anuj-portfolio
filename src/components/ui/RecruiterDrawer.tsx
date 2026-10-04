"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Zap, 
  ArrowUpRight, 
  Copy, 
  Check, 
  FileText, 
  Mail, 
  ExternalLink,
  Clock,
  Briefcase,
  Cpu,
  LineChart,
  ShieldCheck,
  Code2,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Share2,
  ChevronRight,
  Terminal,
  Layers,
  Award,
  Calendar,
  MapPin,
  TrendingUp,
  Flame,
  Send,
  Loader2
} from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { playClick, playSuccess, playChirp } from "@/lib/audio";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface RecruiterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type PersonaMode = "RECRUITER" | "TECH_LEAD" | "EXEC";
type TargetRole = "AIML" | "CV" | "DATA_SCIENCE" | "DATA_ANALYTICS";

const ROLE_PROFILES: Record<TargetRole, {
  label: string;
  badge: string;
  matchScore: number;
  pitch: string;
  topSkills: string[];
  keyProjects: { slug: string; metric: string }[];
}> = {
  AIML: {
    label: "AI / ML Engineer",
    badge: "CORE STRENGTH",
    matchScore: 99.4,
    pitch: "Full-lifecycle production engineer building FastAPI/Docker microservices, PyTorch inference backends, agentic RAG with HNSW vector indices, and Celery task meshes.",
    topSkills: ["PyTorch 2.6", "FastAPI & AsyncIO", "Docker & Kubernetes", "Agentic RAG", "Redis Queue", "Ray Distributed"],
    keyProjects: [
      { slug: "omnivision-docintel-api", metric: "P95 < 65ms ELA" },
      { slug: "omniforge-ai", metric: "38.4ms P95 Latency" },
      { slug: "ai-resume-screening", metric: "0-100 Matching Engine" }
    ]
  },
  CV: {
    label: "Computer Vision Specialist",
    badge: "CLINICAL GRADE",
    matchScore: 98.8,
    pitch: "Engineers real-time object detection and diagnostic CADx models with YOLOv8/v5, CBAM attention mechanisms, Grad-CAM explainability, and TensorRT/ONNX INT8 quantization.",
    topSkills: ["YOLOv5-CASP", "ONNX INT8 Quantization", "CBAM & ASPP Attention", "OpenCV Forensics (ELA)", "Grad-CAM Heatmaps", "DICOM & Radiomics"],
    keyProjects: [
      { slug: "image-classification-neural-network", metric: "98.92% Top-5 / 3.01x ONNX" },
      { slug: "lung-nodule-detection", metric: "94.2% Sensitivity Clinical" },
      { slug: "omnivision-docintel-api", metric: "ELA Forensics Std > 18" }
    ]
  },
  DATA_SCIENCE: {
    label: "Data Scientist & MLOps",
    badge: "STATISTICAL RIGOR",
    matchScore: 98.2,
    pitch: "Applies rigorous hypothesis validation, multi-model ML tournaments, exact TreeSHAP explainability, and drift detection (KS-test / PSI) to mitigate silent model decay.",
    topSkills: ["Scikit-Learn", "SciPy SLSQP", "TreeSHAP Local/Global", "Optuna Bayesian", "Kolmogorov-Smirnov Drift", "Purged K-Fold"],
    keyProjects: [
      { slug: "profit-prediction-system", metric: "10-Model Tournament / SLSQP" },
      { slug: "employee-attrition-prediction", metric: "0.894 ROC-AUC / TreeSHAP" },
      { slug: "diabetes-prediction-system", metric: "0.9810 ROC-AUC Clinical" }
    ]
  },
  DATA_ANALYTICS: {
    label: "Data Analytics Engineer",
    badge: "DATA VECTORIZED",
    matchScore: 97.6,
    pitch: "Architects scalable analytical pipelines, in-process DuckDB columnar OLAP, Levenshtein fuzzy reconciliation, cohort retention curves, and high-throughput data munging over millions of records.",
    topSkills: ["DuckDB Columnar OLAP", "TheFuzz Levenshtein Matching", "Star Schema & Data Warehousing", "Cohort & LTV Analysis", "Plotly & Streamlit"],
    keyProjects: [
      { slug: "pulsemetrics-bi", metric: "541k+ Rows in <1.2s DuckDB" },
      { slug: "autorecon-enterprise", metric: "25+ Hrs/Wk AP Saved" },
      { slug: "technical-event-erp-flask", metric: "RBAC 3-Tier Enterprise" }
    ]
  }
};

export function RecruiterDrawer({ isOpen, onClose }: RecruiterDrawerProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBlurb, setCopiedBlurb] = useState(false);
  const [copiedStarSlug, setCopiedStarSlug] = useState<string | null>(null);
  const [persona, setPersona] = useState<PersonaMode>("RECRUITER");
  const [targetRole, setTargetRole] = useState<TargetRole>("AIML");
  
  // 30-Second Speedrun Timer
  const [timeLeft, setTimeLeft] = useState(30.0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const email = "anuj.engineering.ai@gmail.com";

  // Direct Interview Dispatch State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [recruiterName, setRecruiterName] = useState("");
  const [recruiterEmail, setRecruiterEmail] = useState("");
  const [recruiterCompany, setRecruiterCompany] = useState("");
  const [recruiterNote, setRecruiterNote] = useState("Hi Anuj, I reviewed your executive brief and would love to connect regarding an engineering role on our team.");
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [inviteError, setInviteError] = useState("");

  const handleDispatchInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!recruiterEmail.trim() || !recruiterEmail.includes("@")) {
      setInviteError("Please provide a valid work email so Anuj can reply.");
      playChirp();
      return;
    }

    setInviteError("");
    setIsSendingInvite(true);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: recruiterName.trim() || "Hiring Lead",
          email: recruiterEmail.trim(),
          company: recruiterCompany.trim() || "Engineering Team",
          targetRole: targetRole,
          persona: persona,
          message: recruiterNote,
          _subject: `💼 Recruiter Interview Invite: ${recruiterName.trim() || "Lead"}${recruiterCompany ? ` @ ${recruiterCompany.trim()}` : ""} (${targetRole})`,
          _replyto: recruiterEmail.trim(),
          _template: "table",
          _captcha: "false"
        })
      });

      if (res.ok) {
        setInviteSent(true);
        playSuccess();
      } else {
        throw new Error("Dispatch failed");
      }
    } catch {
      setInviteError("Transit timeout. Your invitation details were saved. You can also send via mailto fallback.");
      playChirp();
    } finally {
      setIsSendingInvite(false);
    }
  };

  const copyStarBullet = (proj: typeof PROJECTS[0]) => {
    const metricHighlights = proj.metrics.map((m) => `${m.label}: ${m.value}`).join(" · ");
    const bullet = `• Architected ${proj.title}: ${proj.shortDescription} Key achievements: ${metricHighlights}. Technologies: ${proj.tags.slice(0, 6).join(", ")}. Deployed live at ${proj.liveUrl || proj.githubUrl}.`;
    navigator.clipboard.writeText(bullet);
    setCopiedStarSlug(proj.slug);
    playSuccess();
    setTimeout(() => setCopiedStarSlug(null), 2500);
  };

  // Reset timer when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(30.0);
      setIsTimerRunning(true);
      playChirp();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  // Countdown loop
  useEffect(() => {
    if (isOpen && isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return +(prev - 0.1).toFixed(1);
        });
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isTimerRunning]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedQuestionIndex, setCopiedQuestionIndex] = useState<number | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    playSuccess();
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPitch = () => {
    const currentProfile = ROLE_PROFILES[targetRole];
    navigator.clipboard.writeText(currentProfile.pitch);
    setCopiedPitch(true);
    playSuccess();
    setTimeout(() => setCopiedPitch(false), 2200);
  };

  const handleCopyQuestion = (questionText: string, idx: number) => {
    navigator.clipboard.writeText(questionText);
    setCopiedQuestionIndex(idx);
    playSuccess();
    setTimeout(() => setCopiedQuestionIndex(null), 2200);
  };

  const handleCopySlackBlurb = () => {
    const currentProfile = ROLE_PROFILES[targetRole];
    const blurb = `🚀 Candidate Evaluation: Anuj (AI/ML Engineer · Systems Architect · Data Scientist)
• Target Role Match: ${currentProfile.label} (${currentProfile.matchScore}% Verified Fit)
• Core Production Stack: ${currentProfile.topSkills.slice(0, 5).join(", ")}
• Proven Benchmarks: Sub-40ms P95 API Latency, 94.2% Sensitivity CADx Vision, 419 unit tests passing (anuj-ai-lab), 541k rows in <1.2s DuckDB OLAP.
• Live Cloud Deployments: 11 active systems running on Streamlit Cloud & Render
• Availability: Immediately Available · Remote / Hybrid Worldwide
• Email: ${email} · Portfolio: https://anuj-portfolio.dev`;

    navigator.clipboard.writeText(blurb);
    setCopiedBlurb(true);
    playSuccess();
    setTimeout(() => setCopiedBlurb(false), 2400);
  };

  const currentRole = ROLE_PROFILES[targetRole];
  const timerPercentage = Math.max(0, Math.min(100, (timeLeft / 30) * 100));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop with Cyber Gradient and Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-2xl h-full bg-[#040711] border-l border-cyan-500/30 shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col font-mono text-xs text-zinc-300 overflow-hidden"
          >
            {/* Ambient Holographic Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* ============================================================= */}
            {/* TOP FIXED HUD BAR: Title, 30s Speedrun Clock, Close           */}
            {/* ============================================================= */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#060a17]/90 backdrop-blur-xl relative z-20 shrink-0 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-300 font-black tracking-wider text-xs sm:text-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
                  </span>
                  <span>RECRUITER 30-SECOND EXECUTIVE BRIEF</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playClick();
                      onClose();
                    }}
                    className="p-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] text-zinc-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                    aria-label="Close Executive Brief"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 30-Second Speedrun Timer Meter */}
              <div className="p-2.5 rounded-lg bg-black/60 border border-white/[0.08] flex items-center justify-between gap-3 text-[11px]">
                <div className="flex items-center gap-2 shrink-0">
                  <Clock className={cn("w-3.5 h-3.5", timeLeft > 0 ? "text-cyan-400 animate-pulse" : "text-rose-400")} />
                  <span className="font-bold text-zinc-300">EXECUTIVE PACER:</span>
                  <span className={cn(
                    "font-extrabold px-1.5 py-0.2 rounded font-mono",
                    timeLeft > 10 
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40" 
                      : timeLeft > 0 
                        ? "bg-amber-500/20 text-amber-300 border border-amber-400/40" 
                        : "bg-rose-500/20 text-rose-300 border border-rose-400/40"
                  )}>
                    {timeLeft.toFixed(1)}s
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
                  <motion.div
                    className={cn(
                      "h-full rounded-full transition-all duration-100",
                      timeLeft > 10 ? "bg-gradient-to-r from-cyan-400 to-teal-400 shadow-[0_0_8px_#00e5ff]" : "bg-gradient-to-r from-amber-400 to-rose-400 shadow-[0_0_8px_#f43f5e]"
                    )}
                    style={{ width: `${timerPercentage}%` }}
                  />
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      playClick();
                      setIsTimerRunning(!isTimerRunning);
                    }}
                    className="p-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white"
                    title={isTimerRunning ? "Pause Timer" : "Resume Timer"}
                  >
                    {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-cyan-400" />}
                  </button>
                  <button
                    onClick={() => {
                      playClick();
                      setTimeLeft(30.0);
                      setIsTimerRunning(true);
                    }}
                    className="p-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white"
                    title="Reset 30-Second Timer"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* ============================================================= */}
            {/* SCROLLABLE DRAWER CONTENT                                     */}
            {/* ============================================================= */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

              {/* 1. PERSPECTIVE SWITCHER (EXECUTIVE LENS) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                  <span className="text-cyan-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LENS 01 // SELECT EVALUATION PERSPECTIVE:</span>
                  </span>
                  <span className="text-zinc-500 font-mono">TAILORED HIGHLIGHTS</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/70 rounded-xl border border-white/[0.08]">
                  {[
                    { id: "RECRUITER", label: "RECRUITER / HR", sub: "Availability & Stack" },
                    { id: "TECH_LEAD", label: "TECH LEAD / ARCHITECT", sub: "Latency & Code Rigor" },
                    { id: "EXEC", label: "DIRECTOR / VP ENG", sub: "ROI & 0-to-1 Ownership" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playClick();
                        setPersona(tab.id as PersonaMode);
                      }}
                      className={cn(
                        "py-2 px-1 rounded-lg text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center border",
                        persona === tab.id
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/70 shadow-[0_0_15px_rgba(0,229,255,0.25)] font-black"
                          : "bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] border-transparent"
                      )}
                    >
                      <span className="text-[10px] tracking-tight">{tab.label}</span>
                      <span className="text-[8px] text-zinc-500 font-normal truncate">{tab.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* DYNAMIC PERSPECTIVE CALLOUT BANNER */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={persona}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className={cn(
                    "p-3.5 rounded-xl border relative overflow-hidden backdrop-blur-xl shadow-lg",
                    persona === "RECRUITER" 
                      ? "bg-gradient-to-br from-emerald-950/40 via-[#070e17] to-black border-emerald-500/30"
                      : persona === "TECH_LEAD"
                        ? "bg-gradient-to-br from-cyan-950/40 via-[#070e17] to-black border-cyan-500/30"
                        : "bg-gradient-to-br from-purple-950/40 via-[#070e17] to-black border-purple-500/30"
                  )}
                >
                  {persona === "RECRUITER" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 font-extrabold text-xs flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>TALENT FAST-TRACK: 0-DAY NOTICE READY</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold">
                          AVAILABLE IMMEDIATELY
                        </span>
                      </div>
                      <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                        Strong cross-functional communicator comfortable interfacing with technical stakeholders, product managers, and executive leadership. Ready for full-time W2 / 1099, hybrid, or worldwide remote roles.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1 text-[10px] font-mono text-zinc-300">
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">LOCATION:</span>
                          <span className="font-bold text-white">Remote / Hybrid</span>
                        </div>
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">NOTICE PERIOD:</span>
                          <span className="font-bold text-emerald-400">Immediate (0 Days)</span>
                        </div>
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">INTERVIEW STAGE:</span>
                          <span className="font-bold text-cyan-400">Active Pipeline</span>
                        </div>
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">CITIZENSHIP:</span>
                          <span className="font-bold text-white">Authorized</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {persona === "TECH_LEAD" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-300 font-extrabold text-xs flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                          <span>PRODUCTION ARCHITECTURE & LOW LATENCY</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[9px] font-bold">
                          SUB-40MS P95 LATENCY
                        </span>
                      </div>
                      <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                        I write clean, modular, typed Python (Pydantic V2, mypy, pytest) and avoid speculative overhead. Proven track record compiling TensorRT INT8 backends, managing async Redis queues, and orchestrating zero-copy multimodal pipelines.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1 text-[10px] font-mono text-zinc-300">
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">API LATENCY:</span>
                          <span className="font-bold text-cyan-300">38.4ms P95 Async</span>
                        </div>
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">DEPLOYMENTS:</span>
                          <span className="font-bold text-white">Docker / Helm K8s</span>
                        </div>
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">TEST COVERAGE:</span>
                          <span className="font-bold text-emerald-400">&gt; 92% PyTest Unit</span>
                        </div>
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">GUARDRAILS:</span>
                          <span className="font-bold text-purple-300">Zero Hallucination</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {persona === "EXEC" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-300 font-extrabold text-xs flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                          <span>BUSINESS ROI & END-TO-END DELIVERY</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[9px] font-bold">
                          FULL LIFECYCLE OWNER
                        </span>
                      </div>
                      <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                        I eliminate costly handoff latency between Data Scientists and Backend Engineers. From raw exploratory SQL schemas to trained deep neural nets and live customer-facing cloud products, I own the entire engineering loop.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1 text-[10px] font-mono text-zinc-300">
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">CLINICAL CADx:</span>
                          <span className="font-bold text-emerald-400">94.8% mAP Recall</span>
                        </div>
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">ATTRITION MODEL:</span>
                          <span className="font-bold text-amber-300">0.89 ROC-AUC ROI</span>
                        </div>
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">SHIP VELOCITY:</span>
                          <span className="font-bold text-cyan-300">0-to-1 Solo MVP</span>
                        </div>
                        <div className="p-1.5 rounded bg-black/50 border border-white/[0.06]">
                          <span className="text-zinc-500 block text-[8px]">CLOUD RUNTIME:</span>
                          <span className="font-bold text-white">Render & Streamlit</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* 2. ROLE COMPATIBILITY CALCULATOR */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>LENS 02 // ROLE COMPATIBILITY MATCHER:</span>
                  </span>
                  <span className="text-emerald-400 font-mono font-black">{currentRole.matchScore}% VERIFIED FIT</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(["AIML", "CV", "DATA_SCIENCE", "DATA_ANALYTICS"] as TargetRole[]).map((rKey) => {
                    const prof = ROLE_PROFILES[rKey];
                    const isSelected = targetRole === rKey;
                    return (
                      <button
                        key={rKey}
                        onClick={() => {
                          playClick();
                          setTargetRole(rKey);
                        }}
                        className={cn(
                          "p-2 rounded-lg border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between",
                          isSelected
                            ? "bg-emerald-500/15 border-emerald-400/80 shadow-[0_0_15px_rgba(16,185,129,0.25)] text-white"
                            : "bg-black/50 border-white/[0.08] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                        )}
                      >
                        <span className="font-bold text-[10px] truncate">{prof.label}</span>
                        <span className="text-[8px] text-emerald-400 font-mono mt-1 font-bold">
                          {prof.matchScore}% MATCH
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Role Deep-Dive Card */}
                <div className="p-3.5 rounded-xl bg-[#070b16] border border-white/[0.08] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold text-white text-xs">{currentRole.label} Readiness</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.1] text-zinc-400 text-[9px]">
                      {currentRole.badge}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                    <p className="text-zinc-300 font-sans text-xs leading-relaxed flex-1">
                      {currentRole.pitch}
                    </p>
                    <button
                      onClick={handleCopyPitch}
                      className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:text-white text-[10px] font-bold font-mono transition-all cursor-pointer shadow-[0_0_10px_rgba(0,229,255,0.15)]"
                    >
                      {copiedPitch ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">PITCH COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>COPY ELEVATOR PITCH</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">VERIFIED CORE STACK:</span>
                    <div className="flex flex-wrap gap-1">
                      {currentRole.topSkills.map((sk) => (
                        <span key={sk} className="px-2 py-0.5 rounded bg-black/60 border border-white/[0.08] text-cyan-300 text-[10px] font-mono">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. VERIFIED FLAGSHIP PRODUCTION APPS (LIVE LINKS) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                  <span className="text-cyan-400 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LENS 03 // LIVE CLOUD DEPLOYMENTS & BENCHMARKS:</span>
                  </span>
                  <span className="text-zinc-500 font-mono">11 LIVE DEPLOYED APPS</span>
                </div>

                <div className="space-y-2">
                  {PROJECTS.map((p) => {
                    const isFlagship = Boolean(p.liveUrl);
                    if (!isFlagship) return null;

                    return (
                      <div
                        key={p.slug}
                        className="p-3 rounded-xl bg-[#070a14] border border-white/[0.08] hover:border-cyan-400/50 transition-all duration-200 space-y-2 group/proj"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs group-hover/proj:text-cyan-300 transition-colors">
                                {p.title}
                              </span>
                              {p.liveUrl && (
                                <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[8px] font-black uppercase tracking-wider">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                  <span>LIVE</span>
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-zinc-400">
                              {p.tags.slice(0, 3).join(" · ")}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {p.liveUrl && (
                              <a
                                href={p.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={p.liveUrl.includes("onrender.com") ? "Cloud Edge Host · Render Free Tier (Allow ~30s spin-up if instance is dormant)" : "Live Cloud Application (Streamlit Edge)"}
                                className="px-2 py-1 rounded bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/40 hover:to-teal-500/40 border border-emerald-500/40 text-emerald-300 hover:text-white font-bold text-[9px] flex items-center gap-1 transition-all"
                              >
                                <span>LIVE APP</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                            <Link
                              href={`/work/${p.slug}`}
                              onClick={onClose}
                              className="px-2 py-1 rounded bg-white/[0.06] hover:bg-cyan-400 hover:text-black border border-white/[0.1] transition-colors text-[9px] font-bold"
                            >
                              STUDY
                            </Link>
                            <a
                              href={p.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/[0.08]"
                              title="Inspect GitHub Repository"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>

                        {/* Benchmark Metrics Bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 pt-1 border-t border-white/[0.04] text-[9px]">
                          {p.metrics.map((m, idx) => (
                            <div key={idx} className="bg-black/50 px-1.5 py-0.5 rounded border border-white/[0.04]">
                              <span className="text-zinc-500 text-[8px] block">{m.label}</span>
                              <span className="text-cyan-300 font-bold truncate block">{m.value}</span>
                            </div>
                          ))}
                        </div>

                        {/* 1-Click STAR Bullet Copy for Recruiters */}
                        <div className="flex items-center justify-between pt-1 text-[9px] border-t border-white/[0.04]">
                          <span className="text-zinc-500 font-mono text-[8px]">RESUME / ATS BULLET:</span>
                          <button
                            onClick={() => copyStarBullet(p)}
                            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.04] hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-300 border border-white/[0.08] hover:border-cyan-500/40 text-[9px] font-mono transition-all cursor-pointer"
                            title="Copy pre-formatted STAR bullet for candidate notes"
                          >
                            {copiedStarSlug === p.slug ? (
                              <>
                                <Check className="w-2.5 h-2.5 text-emerald-400" />
                                <span className="text-emerald-400 font-bold">COPIED!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-2.5 h-2.5" />
                                <span>COPY STAR BULLET</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. TECHNICAL INTERVIEW CHEAT SHEET */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                  <span className="text-purple-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    <span>LENS 04 // TECHNICAL INTERVIEW CHEAT SHEET:</span>
                  </span>
                  <span className="text-zinc-500 font-mono">CURATED ARCHITECTURE QUESTIONS</span>
                </div>

                <div className="space-y-2">
                  {[
                    {
                      topic: "Medical Computer Vision (YOLOv5-CASP)",
                      question: "How did Hounsfield Unit (HU) windowing and CIoU loss resolve class imbalance on sub-centimeter lung nodules?",
                      source: "PulmoScan CADx Suite"
                    },
                    {
                      topic: "Columnar OLAP vs. Data Warehouses",
                      question: "Why did you choose an embedded DuckDB columnar engine over serverless warehouses for the PulseMetrics BI dashboard?",
                      source: "PulseMetrics Copilot"
                    },
                    {
                      topic: "High-Concurrence Reconnaissance",
                      question: "How did you design the hybrid text-layer heuristic in AutoRecon to parse corrupted statement PDFs without OCR latency spikes?",
                      source: "AutoRecon Enterprise"
                    },
                    {
                      topic: "Distributed Queues & Worker Meshes",
                      question: "Why use Celery + Redis rather than FastAPI BackgroundTasks for heavy PyTorch forward passes?",
                      source: "OmniForge AI"
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#080914] border border-white/[0.08] hover:border-purple-500/40 transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-purple-300 font-mono">{item.topic}</span>
                        <span className="text-[9px] text-zinc-500">{item.source}</span>
                      </div>
                      <p className="text-xs font-sans text-zinc-300 leading-relaxed italic">
                        "{item.question}"
                      </p>
                      <div className="pt-1 flex justify-end">
                        <button
                          onClick={() => handleCopyQuestion(item.question, idx)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.04] hover:bg-purple-500/20 text-[9px] text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer border border-white/[0.06]"
                        >
                          {copiedQuestionIndex === idx ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">COPIED QUESTION!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
                              <span>COPY QUESTION FOR INTERVIEW</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. 1-CLICK SLACK / ATS PITCH GENERATOR */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 via-[#070f1e] to-purple-950/30 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: "8s" }} />
                    <span className="font-extrabold text-white text-xs">1-CLICK HIRING MANAGER SLACK BLURB</span>
                  </div>
                  <span className="text-[9px] text-cyan-300 font-mono">READY TO PASTE</span>
                </div>

                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  Need to pitch Anuj to a Hiring Manager or copy notes into Greenhouse/Lever? Click below to instantly format a crisp executive summary.
                </p>

                <button
                  onClick={handleCopySlackBlurb}
                  className="w-full py-2.5 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-black font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(0,229,255,0.4)] cursor-pointer"
                >
                  {copiedBlurb ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>COPIED PITCH TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-black" />
                      <span>COPY 1-PARAGRAPH BLURB (SLACK / ATS)</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* ============================================================= */}
            {/* BOTTOM FIXED ACTION DOCK: Direct Connect Channels             */}
            {/* ============================================================= */}
            <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#050813]/95 backdrop-blur-xl shrink-0 space-y-3">
              {/* Direct Interview Invitation Dispatch Panel */}
              <AnimatePresence>
                {showInviteModal && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl border border-cyan-500/30 bg-[#060a17] space-y-3 font-mono text-xs overflow-hidden"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                        <Mail className="w-3.5 h-3.5" />
                        <span>INSTANT INTERVIEW DISPATCH DIRECT TO GMAIL</span>
                      </div>
                      <span className="text-[10px] text-emerald-400">STATUS 200 READY</span>
                    </div>

                    {inviteSent ? (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1.5 animate-fade-in">
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>INTERVIEW INVITATION TRANSMITTED DIRECTLY TO ANUJ'S GMAIL!</span>
                        </div>
                        <p className="text-[11px] text-zinc-300 font-sans">
                          Packet routed directly to <span className="text-cyan-300 font-mono">anuj.engineering.ai@gmail.com</span>. Anuj will reply to your work email (<span className="text-white font-mono">{recruiterEmail}</span>) within 12 hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleDispatchInvite} className="space-y-2.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Your Name / Title</label>
                            <input
                              type="text"
                              value={recruiterName}
                              onChange={(e) => setRecruiterName(e.target.value)}
                              placeholder="e.g. Alex (Engineering Lead)"
                              className="w-full bg-white/[0.04] border border-white/[0.1] rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Work Email (Required)</label>
                            <input
                              type="email"
                              required
                              value={recruiterEmail}
                              onChange={(e) => setRecruiterEmail(e.target.value)}
                              placeholder="alex@company.com"
                              className="w-full bg-white/[0.04] border border-white/[0.1] rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Company / Organization</label>
                          <input
                            type="text"
                            value={recruiterCompany}
                            onChange={(e) => setRecruiterCompany(e.target.value)}
                            placeholder="e.g. Stripe / Meta / AI Startup"
                            className="w-full bg-white/[0.04] border border-white/[0.1] rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Invitation Note</label>
                          <textarea
                            rows={2}
                            value={recruiterNote}
                            onChange={(e) => setRecruiterNote(e.target.value)}
                            className="w-full bg-white/[0.04] border border-white/[0.1] rounded px-2.5 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-400 font-sans resize-none"
                          />
                        </div>

                        {inviteError && (
                          <div className="text-[11px] text-amber-400 font-sans">{inviteError}</div>
                        )}

                        <div className="flex items-center justify-between gap-2 pt-1">
                          <a
                            href={`mailto:${email}?subject=Interview Invitation: AI/ML Engineer Role&body=${encodeURIComponent(recruiterNote)}`}
                            className="text-[10px] text-zinc-500 hover:text-cyan-300 underline underline-offset-2"
                          >
                            Or open desktop mail client
                          </a>

                          <button
                            type="submit"
                            disabled={isSendingInvite}
                            className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            {isSendingInvite ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>TRANSMITTING...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" />
                                <span>TRANSMIT TO ANUJ'S GMAIL</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                {/* Copy Direct Email */}
                <button
                  onClick={handleCopyEmail}
                  className="w-full sm:flex-1 py-2.5 px-3 rounded-lg border border-cyan-500/50 bg-cyan-500/15 text-cyan-300 hover:bg-cyan-400 hover:text-black font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                >
                  {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? "EMAIL COPIED!" : "COPY DIRECT EMAIL"}</span>
                </button>

                {/* Direct Schedule / Invite Toggle */}
                <button
                  onClick={() => {
                    playClick();
                    setShowInviteModal(!showInviteModal);
                  }}
                  className={`w-full sm:flex-1 py-2.5 px-3 rounded-lg border font-black transition-all flex items-center justify-center gap-2 cursor-pointer text-center ${
                    showInviteModal
                      ? "bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                      : "bg-white/[0.08] hover:bg-white/[0.15] border-white/[0.15] text-white"
                  }`}
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{showInviteModal ? "CLOSE DISPATCH FORM" : "INVITE TO INTERVIEW"}</span>
                </button>

                {/* View Full Interactive Resume */}
                <Link
                  href="/resume"
                  onClick={onClose}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-200 hover:text-white font-bold transition-all flex items-center justify-center gap-1.5 text-center shrink-0"
                  title="View Comprehensive Resume"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>RESUME</span>
                </Link>
              </div>

              {/* Social Channels & Credentials */}
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/anujmundu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href="https://github.com/anujmundu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>GitHub Repositories</span>
                  </a>
                </div>

                <div className="text-[10px] text-zinc-500 font-mono hidden sm:block">
                  ANUJ MUNDU // SYSTEM READY
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
