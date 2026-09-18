import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Cpu, Database, Server, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PROJECTS, CaseStudy } from "@/data/projects";
import { VisionDetectionSim } from "@/components/projects/VisionDetectionSim";
import { ShapWaterfallSim } from "@/components/projects/ShapWaterfallSim";
import { GradCamSliderSim } from "@/components/projects/GradCamSliderSim";
import { CohortRetentionGrid } from "@/components/projects/CohortRetentionGrid";
import { ThresholdCalibrator } from "@/components/case-studies/ThresholdCalibrator";
import { LatencyBenchmarkSim } from "@/components/case-studies/LatencyBenchmarkSim";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-300 font-mono py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <Link
            href="/#work"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO SELECTED WORK</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/[0.08] bg-white/[0.02] text-xs text-white hover:border-cyan-400 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>SOURCE CODE</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>
            {project.apiDocsUrl && (
              <a
                href={project.apiDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 text-xs font-bold hover:bg-cyan-400/20 transition-colors"
              >
                <span>API DOCS</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-400 text-black text-xs font-bold hover:bg-cyan-300 transition-colors"
              >
                <span>LIVE DEMO</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <header className="space-y-6">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="text-cyan-400 font-bold">PROJECT {project.number}</span>
            <span className="text-zinc-700">•</span>
            <span className="uppercase px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-white font-semibold">
              {project.category}
            </span>
            <span className="text-zinc-700">•</span>
            <span>{project.capabilityGroup}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-cyan-300 max-w-3xl font-normal leading-relaxed">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Key Validated Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl border border-cyan-500/20 bg-[#0b0e16]">
          {project.metrics.map((m) => (
            <div key={m.label} className="space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{m.label}</div>
              <div className="text-2xl font-bold text-white">{m.value}</div>
              {m.detail && <div className="text-[10px] text-cyan-400/80">{m.detail}</div>}
            </div>
          ))}
        </div>

        {/* Interactive Engineering Diagnostics & Live Simulator */}
        <section className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
            // INTERACTIVE SYSTEM TELEMETRY & DIAGNOSTIC LAB
          </div>
          {project.slug === "lung-nodule-detection" && (
            <div className="space-y-6">
              <VisionDetectionSim />
              <GradCamSliderSim />
            </div>
          )}
          {project.slug === "employee-attrition-prediction" && (
            <div className="space-y-6">
              <ShapWaterfallSim />
              <ThresholdCalibrator />
            </div>
          )}
          {project.slug === "omniforge-ai" && (
            <div className="space-y-6">
              <LatencyBenchmarkSim />
            </div>
          )}
          {project.slug === "diabetes-prediction-system" && (
            <div className="space-y-6">
              <ThresholdCalibrator />
            </div>
          )}
          {project.slug === "distributed-task-engine" && (
            <CohortRetentionGrid />
          )}
        </section>

        {/* 01. Overview */}
        <section className="space-y-4 border-t border-white/[0.06] pt-8">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
            01 // SYSTEM OVERVIEW
          </h2>
          <p className="text-sm sm:text-base font-sans leading-relaxed text-zinc-300">
            {project.overview}
          </p>
        </section>

        {/* 02. Problem & Why It Matters */}
        <section className="space-y-6 border-t border-white/[0.06] pt-8">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
            02 // THE PROBLEM & ENGINEERING SIGNIFICANCE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-[#0a0c12] border border-white/[0.06] space-y-2">
              <div className="text-xs text-white font-bold uppercase">The Core Challenge</div>
              <p className="text-xs font-sans leading-relaxed text-zinc-400">
                {project.problem.summary}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-[#0a0c12] border border-white/[0.06] space-y-2">
              <div className="text-xs text-emerald-400 font-bold uppercase">Why This Matters</div>
              <p className="text-xs font-sans leading-relaxed text-zinc-400">
                {project.problem.whyItMatters}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-zinc-400 font-semibold">Key Constraints:</div>
            <ul className="space-y-2 text-xs text-zinc-300">
              {project.problem.keyChallenges.map((kc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>{kc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 03. Data Pipeline */}
        <section className="space-y-6 border-t border-white/[0.06] pt-8">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
            03 // DATA PIPELINE & PREPROCESSING
          </h2>
          <div className="p-6 rounded-lg bg-[#0a0c12] border border-white/[0.06] space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs border-b border-white/[0.06] pb-3">
              <span className="text-white font-bold">Input Format: {project.dataPipeline.inputFormat}</span>
              <span className="text-cyan-400">Sample Volume: {project.dataPipeline.datasetSize}</span>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-zinc-400 font-bold">Transformation Steps:</div>
              <ul className="space-y-2 text-xs text-zinc-300">
                {project.dataPipeline.preprocessing.map((prep, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{prep}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-zinc-400 pt-2 border-t border-white/[0.04]">
              <span className="text-white font-semibold">Cleaning Strategy:</span> {project.dataPipeline.cleaningStrategy}
            </div>
          </div>
        </section>

        {/* 04. System Architecture */}
        <section className="space-y-6 border-t border-white/[0.06] pt-8">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
            04 // SYSTEM ARCHITECTURE & DATA FLOW
          </h2>
          <p className="text-xs font-sans text-zinc-300">{project.architecture.overview}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.architecture.nodes.map((node, i) => (
              <div key={i} className="p-5 rounded-lg bg-[#0a0c12] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-bold">
                  <span>STEP 0{i + 1}</span>
                  <span className="text-cyan-400">{node.tech}</span>
                </div>
                <div className="text-sm font-bold text-white">{node.title}</div>
                <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                  {node.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 05. Model Engineering & Training */}
        <section className="space-y-6 border-t border-white/[0.06] pt-8">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
            05 // MODEL ENGINEERING & HYPERPARAMETERS
          </h2>
          <div className="p-6 rounded-lg bg-[#0a0c12] border border-white/[0.06] space-y-4">
            <div className="text-xs text-white font-bold">
              Base Architecture: <span className="text-cyan-400">{project.modelEngineering.modelType}</span>
            </div>
            <p className="text-xs font-sans text-zinc-300">{project.modelEngineering.trainingSetup}</p>

            <div className="space-y-2">
              <div className="text-xs text-zinc-400 font-semibold">Hyperparameters & Training Dynamics:</div>
              <ul className="space-y-1 text-xs text-zinc-400">
                {project.modelEngineering.hyperparameters.map((hp, i) => (
                  <li key={i}>• {hp}</li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-zinc-400 pt-2 border-t border-white/[0.04]">
              <span className="text-white font-semibold">Loss Function:</span> {project.modelEngineering.lossFunction}
            </div>
            <div className="text-xs text-zinc-400">
              <span className="text-amber-400 font-semibold">Trade-off Rationale:</span> {project.modelEngineering.tradeoffs}
            </div>
          </div>
        </section>

        {/* 06. Failure Analysis & Edge Cases */}
        <section className="space-y-6 border-t border-white/[0.06] pt-8">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
            06 // FAILURE ANALYSIS & ZERO-TRUST SAFEGUARDS
          </h2>
          <div className="p-6 rounded-lg bg-[#0a0c12] border border-red-500/20 space-y-4">
            <div className="flex items-center gap-2 text-xs text-red-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>OBSERVED FAILURE MODES UNDER STRESS</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300">
              {project.failureAnalysis.edgeCases.map((ec, i) => (
                <li key={i}>• {ec}</li>
              ))}
            </ul>
            <div className="text-xs text-zinc-400 pt-2 border-t border-white/[0.06]">
              <span className="text-emerald-400 font-semibold">Mitigation & Fallback:</span>{" "}
              {project.failureAnalysis.mitigationStrategy}
            </div>
          </div>
        </section>

        {/* 07. Production Deployment & API */}
        <section className="space-y-6 border-t border-white/[0.06] pt-8">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
            07 // PRODUCTION DEPLOYMENT SPECS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded bg-[#0a0c12] border border-white/[0.06]">
              <div className="text-[10px] text-zinc-500 uppercase">Serving Framework</div>
              <div className="text-xs text-white font-bold mt-1">{project.productionDeployment.servingFramework}</div>
            </div>
            <div className="p-4 rounded bg-[#0a0c12] border border-white/[0.06]">
              <div className="text-[10px] text-zinc-500 uppercase">Containerization</div>
              <div className="text-xs text-white font-bold mt-1">{project.productionDeployment.containerization}</div>
            </div>
            <div className="p-4 rounded bg-[#0a0c12] border border-white/[0.06]">
              <div className="text-[10px] text-zinc-500 uppercase">P95 SLA</div>
              <div className="text-xs text-cyan-400 font-bold mt-1">{project.productionDeployment.latencyP95}</div>
            </div>
            <div className="p-4 rounded bg-[#0a0c12] border border-white/[0.06]">
              <div className="text-[10px] text-zinc-500 uppercase">Throughput</div>
              <div className="text-xs text-emerald-400 font-bold mt-1">{project.productionDeployment.throughput}</div>
            </div>
          </div>
        </section>

        {/* 08. Engineering Decisions & Discarded Alternatives */}
        <section className="space-y-6 border-t border-white/[0.06] pt-8">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
            08 // ARCHITECTURAL DECISIONS & TRADE-OFFS
          </h2>
          <div className="space-y-4">
            {project.engineeringDecisions.map((dec, i) => (
              <div key={i} className="p-5 rounded-lg bg-[#0a0c12] border border-white/[0.06] space-y-2">
                <div className="text-sm font-bold text-white">{dec.decision}</div>
                <div className="text-xs font-sans text-zinc-300">
                  <span className="text-cyan-400 font-semibold font-mono">Why:</span> {dec.rationale}
                </div>
                <div className="text-xs font-sans text-zinc-500">
                  <span className="text-red-400/80 font-semibold font-mono">Alternative Discarded:</span> {dec.alternativeDiscarded}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 09. What I Would Improve */}
        <section className="space-y-4 border-t border-white/[0.06] pt-8">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
            09 // PLANNED IMPROVEMENTS & NEXT REVISIONS
          </h2>
          <ul className="space-y-2 text-xs text-zinc-300">
            {project.whatIWouldImprove.map((imp, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-cyan-400">→</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Bottom CTA */}
        <div className="border-t border-white/[0.08] pt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link
            href="/#work"
            className="text-xs text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL PROJECTS</span>
          </Link>

          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded bg-white text-black font-bold text-xs hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              <span>INSPECT ON GITHUB</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
