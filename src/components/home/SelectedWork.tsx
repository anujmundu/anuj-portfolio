"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  Layers,
  GitBranch,
  Terminal,
  Activity,
  Gauge,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Server,
  Sparkles,
  Sliders,
  ChevronRight
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PROJECTS, CaseStudy } from "@/data/projects";
import { VisionDetectionSim } from "@/components/projects/VisionDetectionSim";
import { ShapWaterfallSim } from "@/components/projects/ShapWaterfallSim";
import { GradCamSliderSim } from "@/components/projects/GradCamSliderSim";
import { CohortRetentionGrid } from "@/components/projects/CohortRetentionGrid";
import { ProjectArchitectureDiagram } from "@/components/projects/ProjectArchitectureDiagram";
import { ProjectBenchmarksConsole } from "@/components/projects/ProjectBenchmarksConsole";
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/Card3D";
import { TracingBeam } from "@/components/aceternity/TracingBeam";
import { LinkPreview } from "@/components/ui/link-preview";
import AnimatedBackground from "@/components/home/AnimatedBackground";

type FilterType = "ALL" | "AI / ML" | "DATA SCIENCE" | "DATA ANALYTICS" | "ENGINEERING";
type CardTab = "sim" | "arch" | "metrics";

export function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [liveOnly, setLiveOnly] = useState(false);
  const [activeCardTabs, setActiveCardTabs] = useState<Record<string, CardTab>>({});

  const filterTabs: FilterType[] = [
    "ALL",
    "AI / ML",
    "DATA SCIENCE",
    "DATA ANALYTICS",
    "ENGINEERING"
  ];

  const liveCount = PROJECTS.filter((p) => Boolean(p.liveUrl)).length;

  const filteredProjects = PROJECTS.filter((p) => {
    if (liveOnly && !p.liveUrl) return false;
    if (activeFilter === "ALL") return true;
    return p.capabilityGroup === activeFilter;
  });

  const getCardTab = (slug: string): CardTab => {
    return activeCardTabs[slug] || "sim";
  };

  const setCardTab = (slug: string, tab: CardTab) => {
    setActiveCardTabs((prev) => ({ ...prev, [slug]: tab }));
  };

  const getCategoryBadgeClass = (group: string) => {
    switch (group) {
      case "AI / ML":
        return "text-cyan-300 border-cyan-400/40 bg-cyan-950/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]";
      case "DATA SCIENCE":
        return "text-emerald-300 border-emerald-400/40 bg-emerald-950/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]";
      case "DATA ANALYTICS":
        return "text-amber-300 border-amber-400/40 bg-amber-950/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]";
      case "ENGINEERING":
        return "text-purple-300 border-purple-400/40 bg-purple-950/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]";
      default:
        return "text-cyan-300 border-cyan-400/30 bg-white/[0.04]";
    }
  };

  return (
    <section
      id="work"
      className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative scanline bg-gradient-to-br from-[#020408] via-[#040a1a] to-[#0a0f30] overflow-hidden"
    >
      <AnimatedBackground />

      <div className="relative z-10">
        <div className="absolute inset-0 pointer-events-none noise-overlay"></div>

        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header & Command Telemetry Section */}
          <div className="space-y-8 border-b border-white/[0.08] pb-10">
            {/* Top Mission Telemetry HUD Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs uppercase tracking-widest">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_10px_#00e5ff]"></span>
                </span>
                <span className="font-bold">// 03. ARCHITECTED SYSTEMS & CASE STUDIES</span>
              </div>

              <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-zinc-400 bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-full backdrop-blur-md">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>11 LIVE CLOUD APPS // 15 VERIFIED SYSTEMS</span>
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-cyan-400">P95 &lt; 40ms</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-300">PRODUCTION K8S &amp; OLAP</span>
              </div>
            </div>

            {/* Main Header Title & Mission Statement */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-3">
                <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white glow-cyan leading-none">
                  ENGINEERED CASE STUDIES
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed font-sans">
                  Production machine learning architectures, distributed computing backends, and edge
                  computer vision pipelines engineered from first principles with empirical telemetry.
                </p>
              </div>

              {/* Aggregated Empirical Telemetry Ribbon */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#060911]/80 border border-cyan-500/20 shadow-inner">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">OLAP SPEED</div>
                  <div className="text-lg sm:text-xl font-black text-cyan-300 mt-0.5">541K+ Rows</div>
                  <div className="text-[9px] text-zinc-400">DuckDB Sub-1.2s Scan</div>
                </div>
                <div className="p-3 rounded-lg bg-[#060911]/80 border border-emerald-500/20 shadow-inner">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">ACCELERATION</div>
                  <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">3.01x ONNX</div>
                  <div className="text-[9px] text-zinc-400">98.92% Top-5 Ensemble</div>
                </div>
              </div>
            </div>

            {/* Filter Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                {filterTabs.map((tab) => {
                  const isSelected = activeFilter === tab;
                  const count =
                    tab === "ALL"
                      ? (liveOnly ? liveCount : PROJECTS.length)
                      : PROJECTS.filter((p) => (!liveOnly || Boolean(p.liveUrl)) && p.capabilityGroup === tab).length;

                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      className={`relative px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? "text-black font-extrabold bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.5)] scale-[1.02]"
                          : "text-zinc-400 hover:text-white bg-[#060911] hover:bg-white/[0.06] border border-white/[0.08]"
                      }`}
                      data-cursor="button"
                    >
                      <span>{tab}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected
                            ? "bg-black/20 text-black"
                            : "bg-white/[0.08] text-zinc-400"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}

                {/* 1-Click Live Apps Only Toggle */}
                <button
                  onClick={() => setLiveOnly(!liveOnly)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border font-mono text-xs transition-all cursor-pointer ${
                    liveOnly
                      ? "bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.4)] scale-[1.02]"
                      : "bg-[#060911] hover:bg-emerald-950/30 border-white/[0.08] hover:border-emerald-500/40 text-zinc-400 hover:text-emerald-300"
                  }`}
                  data-cursor="button"
                >
                  <span className="relative flex h-2 w-2">
                    {liveOnly && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${
                        liveOnly ? "bg-emerald-400 shadow-[0_0_8px_#10b981]" : "bg-zinc-600"
                      }`}
                    ></span>
                  </span>
                  <span className="font-bold tracking-wider">LIVE CLOUD APPS ONLY</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {liveCount}
                  </span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-500">
                <span>ACTIVE FILTER:</span>
                <span className="text-cyan-400 font-bold uppercase">{activeFilter}</span>
                {liveOnly && (
                  <span className="text-emerald-400 font-bold uppercase">[LIVE ONLY]</span>
                )}
                <span>({filteredProjects.length} AVAILABLE)</span>
              </div>
            </div>
          </div>

          {/* Tracing Beam Wrapper for Project Showcase */}
          <TracingBeam className="px-0 sm:px-2">
            <div className="space-y-16">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => {
                  const currentTab = getCardTab(project.slug);
                  const hasSimulator = [
                    "pulsemetrics-bi",
                    "image-classification-neural-network",
                    "profit-prediction-system",
                    "omniforge-ai",
                    "lung-nodule-detection",
                    "employee-attrition-prediction",
                    "distributed-task-engine"
                  ].includes(project.slug);

                  return (
                    <motion.article
                      key={project.slug}
                      layout
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, delay: idx * 0.06, ease: "easeOut" }}
                      data-cursor="project"
                    >
                      {/* Aceternity 3D Card Container */}
                      <CardContainer className="w-full">
                        <CardBody className="group relative rounded-2xl bg-[#050811]/90 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/40 shadow-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,229,255,0.15)] p-6 sm:p-8 lg:p-10 overflow-hidden w-full hud-corner">
                          {/* Ambient Cyberpunk Corner Glow */}
                          <div
                            className={`pointer-events-none absolute top-0 right-0 -mr-20 -mt-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br ${project.heroAccent} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}
                          />

                          {/* Top Mission Control Terminal Bar */}
                          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-5 mb-8">
                            {/* Mac/Terminal Indicator Dots & System ID */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                              </div>
                              <span className="font-mono text-xs text-zinc-500 tracking-wider">
                                SYS_ID // {project.number}_{project.slug.toUpperCase()}
                              </span>
                            </div>

                            {/* Classification Badge & Telemetry Pulse */}
                            <div className="flex items-center flex-wrap gap-2.5 font-mono text-xs">
                              {project.liveUrl ? (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-cyan-300 hover:text-white text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-400/60 font-bold transition-all shadow-[0_0_12px_rgba(0,229,255,0.35)] hover:shadow-[0_0_20px_rgba(0,229,255,0.7)] group/live"
                                >
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_6px_#00e5ff]"></span>
                                  </span>
                                  <span>LIVE CLOUD APP</span>
                                  <ArrowUpRight className="w-3 h-3 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform" />
                                </a>
                              ) : (
                                <span className="flex items-center gap-1.5 text-emerald-400 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 font-semibold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  PRODUCTION DEPLOYED
                                </span>
                              )}
                              <span
                                className={`px-2.5 py-0.5 rounded border uppercase tracking-wider font-semibold text-[10px] ${getCategoryBadgeClass(
                                  project.capabilityGroup
                                )}`}
                              >
                                {project.category}
                              </span>
                            </div>
                          </div>

                          {/* Main 2-Column Split: Deep Engineering Narrative vs. Mission Console */}
                          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                            {/* Left Column (Metadata, Title, Highlights, Tags, CTAs) */}
                            <div className="lg:col-span-7 space-y-6">
                              {/* Stencil Number & Category Breadcrumb */}
                              <CardItem translateZ={20} className="flex items-center gap-3 font-mono text-xs">
                                <span className="text-3xl font-black tracking-tight text-cyan-400 drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                                  {project.number}
                                </span>
                                <span className="h-5 w-[1px] bg-zinc-800" />
                                <span className="text-zinc-400 font-semibold uppercase tracking-widest">
                                  {project.capabilityGroup}
                                </span>
                                <span className="text-zinc-600">•</span>
                                <span className="text-cyan-300/80">ENGINEERED SUITE</span>
                              </CardItem>

                              {/* Title & Tagline */}
                              <CardItem translateZ={35}>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase group-hover:text-cyan-300 transition-colors leading-tight">
                                  {project.title}
                                </h3>
                                <p className="mt-2.5 text-sm text-cyan-400/90 font-mono font-medium leading-relaxed">
                                  {project.tagline}
                                </p>
                              </CardItem>

                              {/* Short Description */}
                              <CardItem translateZ={20} className="text-sm text-zinc-300 leading-relaxed font-sans">
                                {project.shortDescription}
                              </CardItem>

                              {/* Key Engineering Challenges & Feats */}
                              {project.problem?.keyChallenges && (
                                <CardItem translateZ={25} className="space-y-2 pt-1">
                                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                                    CORE ARCHITECTURAL FEATS:
                                  </div>
                                  <div className="space-y-1.5">
                                    {project.problem.keyChallenges.slice(0, 2).map((feat, fIdx) => (
                                      <div
                                        key={fIdx}
                                        className="flex items-start gap-2 text-xs text-zinc-400 font-sans"
                                      >
                                        <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                        <span>{feat}</span>
                                      </div>
                                    ))}
                                  </div>
                                </CardItem>
                              )}

                              {/* Tech Stack Badges */}
                              <CardItem translateZ={30} className="flex flex-wrap gap-2 pt-2">
                                {project.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2.5 py-1 rounded bg-[#090d18] text-zinc-300 border border-white/[0.08] font-mono text-[11px] hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </CardItem>

                              {/* Action Call-To-Action Suite */}
                              <CardItem translateZ={45} className="pt-4 flex flex-wrap items-center gap-3">
                                <Link
                                  href={`/work/${project.slug}`}
                                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black hover:bg-cyan-400 font-mono text-xs font-black tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] scale-100 hover:scale-[1.02]"
                                  data-cursor="button"
                                >
                                  <span>EXPLORE CASE STUDY</span>
                                  <ArrowUpRight className="w-4 h-4" />
                                </Link>

                                <LinkPreview
                                  url={project.githubUrl}
                                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-white/[0.15] bg-white/[0.04] text-zinc-300 hover:text-white hover:border-cyan-400 font-mono text-xs transition-all hover:shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                                >
                                  <GithubIcon className="w-4 h-4" />
                                  <span>CODE REPO</span>
                                </LinkPreview>

                                 {project.liveUrl && (
                                  <LinkPreview
                                    url={project.liveUrl}
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-cyan-400/70 bg-gradient-to-r from-cyan-500/20 via-teal-500/15 to-emerald-500/20 text-cyan-300 hover:text-white hover:border-cyan-300 font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] group/launch"
                                  >
                                    <span className="relative flex h-2.5 w-2.5">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#00e5ff]"></span>
                                    </span>
                                    <span>LAUNCH LIVE APP</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/launch:translate-x-0.5 group-hover/launch:-translate-y-0.5 transition-transform" />
                                  </LinkPreview>
                                )}
                              </CardItem>
                            </div>

                            {/* Right Column: Mission Console with Interactive Tab Switcher */}
                            <div className="lg:col-span-5 space-y-4">
                              {/* Interactive 3-Tab Mission Switcher */}
                              <div className="flex items-center justify-between p-1 rounded-lg bg-[#04060b] border border-white/[0.08] font-mono text-[11px]">
                                {hasSimulator && (
                                  <button
                                    onClick={() => setCardTab(project.slug, "sim")}
                                    className={`flex-1 py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                      currentTab === "sim"
                                        ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                                        : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                                  >
                                    <Activity className="w-3 h-3" />
                                    <span>SIMULATION</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => setCardTab(project.slug, "arch")}
                                  className={`flex-1 py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                    currentTab === "arch"
                                      ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                                      : "text-zinc-500 hover:text-zinc-300"
                                  }`}
                                >
                                  <Server className="w-3 h-3" />
                                  <span>TOPOLOGY</span>
                                </button>

                                <button
                                  onClick={() => setCardTab(project.slug, "metrics")}
                                  className={`flex-1 py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                    currentTab === "metrics"
                                      ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                                      : "text-zinc-500 hover:text-zinc-300"
                                  }`}
                                >
                                  <Gauge className="w-3 h-3" />
                                  <span>METRICS</span>
                                </button>
                              </div>

                              {/* Interactive Console Screen */}
                              <CardItem translateZ={45} className="w-full">
                                {currentTab === "sim" && hasSimulator && (
                                  <div className="w-full">
                                    {project.slug === "pulsemetrics-bi" && <CohortRetentionGrid />}
                                    {project.slug === "image-classification-neural-network" && <GradCamSliderSim />}
                                    {project.slug === "profit-prediction-system" && <ShapWaterfallSim />}
                                    {project.slug === "lung-nodule-detection" && <VisionDetectionSim />}
                                    {project.slug === "employee-attrition-prediction" && <ShapWaterfallSim />}
                                    {project.slug === "omniforge-ai" && <VisionDetectionSim />}
                                    {project.slug === "distributed-task-engine" && <CohortRetentionGrid />}
                                  </div>
                                )}

                                {currentTab === "arch" && project.architecture?.nodes && (
                                  <ProjectArchitectureDiagram
                                    nodes={project.architecture.nodes}
                                    overview={project.architecture.overview}
                                  />
                                )}

                                {currentTab === "metrics" && (
                                  <ProjectBenchmarksConsole project={project} />
                                )}

                                {/* Fallback when a non-simulator project has "sim" tab */}
                                {currentTab === "sim" && !hasSimulator && (
                                  <ProjectBenchmarksConsole project={project} />
                                )}
                              </CardItem>

                              {/* Quick Telemetry Footnote */}
                              <div className="p-3 rounded-lg bg-[#04060a]/80 border border-white/[0.04] font-mono text-[10px] text-zinc-500 flex items-center justify-between">
                                <span className="flex items-center gap-1 text-cyan-400">
                                  <Zap className="w-3 h-3" />
                                  <span>DETERMINISTIC LATENCY</span>
                                </span>
                                <span>VERIFIED WITH LOCUST &amp; PYTEST</span>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </CardContainer>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          </TracingBeam>
        </div>
      </div>
    </section>
  );
}
