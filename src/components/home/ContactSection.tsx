"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, FileText, ArrowUpRight, Copy, Check, Send, Sparkles, Terminal, ShieldCheck, Clock, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { SpotlightCard } from "@/components/aceternity/SpotlightCard";
import { LinkPreview } from "@/components/ui/link-preview";
import { playClick } from "@/lib/audio";
import { triggerExplosion } from "@/components/animaster/ParticleExplosion";

const inquiryLoadingStates = [
  { text: "Packaging message payload into structured JSON schema" },
  { text: "Establishing secure TLS 1.3 telemetry channel" },
  { text: "Synthesizing vector embedding & intent classification" },
  { text: "Dispatching packet to Anuj's engineering command terminal" },
  { text: "Signal acknowledged: Status 200 OK" },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [inquiryText, setInquiryText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const email = "anujmark.edwin.ame@gmail.com";

  const placeholders = [
    "Ask about Computer Vision pipeline latency...",
    "Propose a Full-Time AI/ML or Data Science role...",
    "Collaborate on distributed MLOps & Triton serving...",
    "Request custom fine-tuning or RAG architecture advice...",
    "Send a quick 'Hello Anuj' from your terminal...",
  ];

  const quickTopics = [
    {
      label: "🤖 Multi-Agent RAG",
      prompt: "Hi Anuj, let's discuss your LangGraph multi-agent RAG pipeline and context routing architecture.",
    },
    {
      label: "👁️ Edge Vision (INT8)",
      prompt: "Hi Anuj, interested in your YOLOv5-CASP + INT8 TensorRT edge vision optimization.",
    },
    {
      label: "⚡ Distributed MLOps",
      prompt: "Hi Anuj, let's connect regarding Triton model serving, Celery workers, and low-latency APIs.",
    },
    {
      label: "💼 AI/ML Role Opportunity",
      prompt: "Hi Anuj, we have an exciting AI/ML / Data Science engineering role that matches your profile.",
    },
  ];

  const handleInquiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInquiryText(e.target.value);
  };

  const handleInquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    playClick();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 9000);
    }, 4500);
  };

  const handleTopicClick = (topic: typeof quickTopics[0], e: React.MouseEvent) => {
    playClick();
    triggerExplosion(e);
    setInquiryText(topic.prompt);
    setActiveTopic(topic.label);
  };

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 pb-36 sm:pb-44 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#020408] overflow-hidden">
      {/* Ambient background depth glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,229,255,0.07),transparent_60%)] z-0" />
      <div className="pointer-events-none absolute top-1/3 right-0 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Availability & Telemetry Live Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-mono text-xs w-fit shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-semibold tracking-wider uppercase">
              STATUS: OPEN FOR AI/ML & DATA SCIENCE ROLES
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>TLS 1.3 SECURE</span>
            </span>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>SLA: &lt; 12H</span>
            </span>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              <span>BHOPAL, IN · REMOTE</span>
            </span>
          </div>
        </div>

        {/* Hero Editorial Headline & Inquiry Station Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Massive Editorial Copy & Context */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>// 07. TRANSMISSION CONSOLE & DISPATCH</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[0.95]">
              LET'S BUILD
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                SOMETHING USEFUL.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-lg">
              Whether you are architecting low-latency computer vision pipelines, multi-agent RAG systems, or seeking an AI/ML Engineer who ships validated mathematical code into production—I'd love to talk.
            </p>

            {/* Direct Email Fast-CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 text-black font-mono text-xs font-bold tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)]"
                data-cursor="button"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>DIRECT EMAIL DISPATCH</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/[0.1] bg-white/[0.03] text-zinc-300 hover:text-white hover:border-cyan-400/50 font-mono text-xs transition-colors cursor-pointer"
                data-cursor="button"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Terminal */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-white/[0.1] bg-[#07090f]/90 backdrop-blur-xl p-6 sm:p-8 space-y-6 hud-corner shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-bold uppercase tracking-wider">COMMAND INQUIRY DISPATCHER</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
              </div>

              {/* Quick Topic Prompts */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                  FAST-SELECT INQUIRY TOPIC:
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickTopics.map((topic) => {
                    const isActive = activeTopic === topic.label;
                    return (
                      <button
                        key={topic.label}
                        onClick={(e) => handleTopicClick(topic, e)}
                        className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all cursor-pointer border ${
                          isActive
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.25)] font-semibold"
                            : "bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:border-zinc-700 hover:text-white"
                        }`}
                        data-cursor="button"
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Particle Vanish Terminal Input */}
              <div className="pt-2">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  value={inquiryText}
                  setValue={setInquiryText}
                  onChange={handleInquiryChange}
                  onSubmit={handleInquirySubmit}
                />
              </div>

              {/* Status Confirmation or Fallback */}
              {isSent ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 font-bold">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>SIGNAL TRANSMISSION ACKNOWLEDGED (STATUS 200 OK)</span>
                  </div>
                  <p className="text-zinc-300 font-sans text-xs">
                    Your inquiry has been packaged and routed directly to Anuj's command console. Want to send a copy from your email client as well?
                  </p>
                  <a
                    href={`mailto:${email}?subject=Portfolio%20Inquiry&body=${encodeURIComponent(inquiryText)}`}
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-mono font-bold text-xs pt-1"
                  >
                    <span>OPEN IN YOUR EMAIL CLIENT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                  <span>Particle physics activated on enter</span>
                  <span>Direct SSL handshake</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Multi-Step MLOps Dispatch Modal */}
        <MultiStepLoader
          loadingStates={inquiryLoadingStates}
          loading={isLoading}
          duration={900}
          loop={false}
        />

        {/* 3 High-Impact Channel Cards Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono">
          {/* Card 1: Direct Inbox */}
          <SpotlightCard
            spotlightColor="rgba(0, 229, 255, 0.18)"
            className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#07090f] space-y-5 hud-corner hover:border-cyan-400/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                PRIMARY COMMS
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Copy Email"
                aria-label="Copy Email"
                data-cursor="button"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white tracking-tight break-all">
                {email}
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                Monitored daily with an average turnaround under 12 hours.
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                data-cursor="button"
              >
                <span>COMPOSE EMAIL</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </SpotlightCard>

          {/* Card 2: GitHub Codebase */}
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.18)"
            className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#07090f] space-y-5 hud-corner hover:border-emerald-400/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider">
                <GithubIcon className="w-4 h-4" />
                CODEBASE & REPOSITORIES
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                37+ REPOS
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white tracking-tight">
                github.com/anujmundu
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                Production PyTorch models, YOLOv5-CASP, LangGraph swarms, and FastAPI backends.
              </div>
            </div>

            <div className="pt-2">
              <LinkPreview
                url="https://github.com/anujmundu"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              >
                <span>EXPLORE CODE REPOSITORIES</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </LinkPreview>
            </div>
          </SpotlightCard>

          {/* Card 3: LinkedIn & ATS Resume */}
          <SpotlightCard
            spotlightColor="rgba(168, 85, 247, 0.18)"
            className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#07090f] space-y-5 hud-corner hover:border-purple-400/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-wider">
                <LinkedinIcon className="w-4 h-4" />
                PROFESSIONAL NETWORK
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                VERIFIED
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white tracking-tight">
                linkedin.com/in/anujmundu
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                Full career trajectory, published architectures, and recommendations.
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs">
              <LinkPreview
                url="https://linkedin.com/in/anujmundu"
                className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-bold transition-colors"
              >
                <span>CONNECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </LinkPreview>
              <span className="text-zinc-700">|</span>
              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
                data-cursor="button"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>ATS RESUME</span>
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
