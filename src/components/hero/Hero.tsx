"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Cpu, Database, Network, Zap } from "lucide-react";
import { ParticlePipelineCanvas } from "./ParticlePipelineCanvas";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { playClick } from "@/lib/audio";
import { BackgroundBeams } from "@/components/aceternity/BackgroundBeams";
import { SparklesCore } from "@/components/aceternity/SparklesCore";
import { TextGenerateEffect } from "@/components/aceternity/TextGenerateEffect";
import { triggerExplosion } from "@/components/animaster/ParticleExplosion";

import { DecoderText } from "@/components/ui/DecoderText";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { Meteors } from "@/components/ui/meteors";

export function Hero() {
  const [intelligentHover, setIntelligentHover] = useState(false);

  const lifecycle = [
    { label: "RAW DATA", icon: Database, color: "text-amber-400" },
    { label: "INSIGHT", icon: Cpu, color: "text-emerald-400" },
    { label: "MODEL", icon: Network, color: "text-cyan-400" },
    { label: "SYSTEM", icon: ArrowUpRight, color: "text-purple-400" }
  ];

  const heroCyclePhrases = [
    [
      { text: "Distributed", className: "text-zinc-100" },
      { text: "Inference", className: "text-zinc-100" },
      { text: "·", className: "text-cyan-500 font-bold" },
      { text: "3D", className: "text-zinc-100" },
      { text: "Vision", className: "text-zinc-100" },
      { text: "·", className: "text-cyan-500 font-bold" },
      { text: "Multi-Agent", className: "text-cyan-400 font-bold drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]" },
      { text: "Swarms.", className: "text-cyan-400 font-bold drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]" },
    ],
    [
      { text: "Autonomous", className: "text-zinc-100" },
      { text: "Agents", className: "text-zinc-100" },
      { text: "·", className: "text-emerald-500 font-bold" },
      { text: "LangGraph", className: "text-zinc-100" },
      { text: "·", className: "text-emerald-500 font-bold" },
      { text: "Context-Aware", className: "text-emerald-400 font-bold drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]" },
      { text: "RAG.", className: "text-emerald-400 font-bold drop-shadow-[0_0_129,0.4)]" },
    ],
    [
      { text: "INT8", className: "text-zinc-100" },
      { text: "Quantization", className: "text-zinc-100" },
      { text: "·", className: "text-purple-500 font-bold" },
      { text: "TensorRT", className: "text-zinc-100" },
      { text: "·", className: "text-purple-500 font-bold" },
      { text: "Edge", className: "text-purple-400 font-bold drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]" },
      { text: "Vision.", className: "text-purple-400 font-bold drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]" },
    ],
    [
      { text: "Triton", className: "text-zinc-100" },
      { text: "Serving", className: "text-zinc-100" },
      { text: "·", className: "text-amber-500 font-bold" },
      { text: "Celery", className: "text-zinc-100" },
      { text: "Queues", className: "text-zinc-100" },
      { text: "·", className: "text-amber-500 font-bold" },
      { text: "Low-Latency", className: "text-amber-400 font-bold drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]" },
      { text: "APIs.", className: "text-amber-400 font-bold drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]" },
    ],
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden technical-grid bg-[#020408]">
      {/* Aceternity Background Beams Laser Matrix */}
      <BackgroundBeams />

      {/* Atmospheric Meteors Stream */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1] opacity-70">
        <Meteors number={18} />
      </div>

      {/* Aceternity Celestial Sparkles Core */}
      <div className="w-full absolute inset-0 h-full pointer-events-none z-[2]">
        <SparklesCore
          id="heroSparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.8}
          particleDensity={45}
          className="w-full h-full"
          particleColor="#00e5ff"
        />
      </div>

      {/* Background Interactive Particle Pipeline Canvas */}
      <ParticlePipelineCanvas />

      {/* Radial gradient mask for background depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020408_80%)] z-[3]" />

      {/* Top Identity Tagline & Lifecycle Badge */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
            <span className="inline-block w-2 h-2 bg-cyan-400 rounded-sm animate-pulse shadow-[0_0_10px_#00e5ff]" />
            <span className="text-white font-semibold glow-cyan">
              <DecoderText text="DATA × AI × ENGINEERING" speed={25} />
            </span>
          </div>

          {/* Animated Lifecycle Pipeline Bar with HUD borders */}
          <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-zinc-400 bg-white/[0.02] border border-cyan-500/20 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.1)]">
            {lifecycle.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <React.Fragment key={stage.label}>
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3 h-3 ${stage.color}`} />
                    <span className="text-zinc-300 tracking-wider font-semibold">{stage.label}</span>
                  </div>
                  {idx < lifecycle.length - 1 && (
                    <span className="text-zinc-600">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Main Massive Editorial Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8">
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-extrabold tracking-[-0.04em] leading-[0.95] text-white uppercase select-none"
          >
            I TURN <span className="text-zinc-500 font-normal">DATA</span>
            <br />
            INTO{" "}
            <span
              onMouseEnter={() => setIntelligentHover(true)}
              onMouseLeave={() => setIntelligentHover(false)}
              className={`transition-all duration-300 cursor-pointer ${
                intelligentHover
                  ? "text-cyan-300 drop-shadow-[0_0_45px_rgba(0,229,255,0.9)] scale-[1.02] inline-block"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400"
              }`}
            >
              INTELLIGENT
            </span>
            <br />
            SYSTEMS.
          </motion.h1>

          {/* Smooth Dynamic Typewriter Sub-header */}
          <div className="pt-2">
            <TypewriterEffectSmooth
              cyclePhrases={heroCyclePhrases}
              className="my-1 font-mono items-center"
              textClassName="text-sm sm:text-base md:text-xl lg:text-2xl font-mono tracking-wide"
              cursorClassName="bg-cyan-400 shadow-[0_0_10px_#00e5ff]"
              typeDuration={1.8}
              pauseDuration={2400}
              eraseDuration={0.7}
            />
          </div>

          {/* Kinetic Aceternity typography for subtitle statement */}
          <div className="max-w-2xl pt-1">
            <TextGenerateEffect
              words="Python Backend Engineer · AI/ML Systems · Data Scientist. Building end-to-end solutions that synthesize raw data, train validated statistical & vision models, and serve production-grade low-latency inference."
              className="font-sans font-normal"
            />
          </div>
        </div>

        {/* CTAs & Jump Links with Exploding Particle FX & Moving Borders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-4 pt-6"
        >
          <Link href="#work" data-cursor="button">
            <MovingBorderButton
              borderRadius="0.5rem"
              duration={3000}
              className="px-6 py-3 bg-[#07090f] text-cyan-300 font-mono text-xs font-bold tracking-widest uppercase border-cyan-500/40"
              containerClassName="h-11 w-auto"
              onClick={(e: React.MouseEvent) => {
                triggerExplosion(e);
              }}
            >
              EXPLORE WORK ↗
            </MovingBorderButton>
          </Link>

          <button
            onClick={(e) => {
              playClick();
              triggerExplosion(e);
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-recruiter-drawer"));
              }
            }}
            className="px-5 py-3 border border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-400 hover:text-black rounded text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.25)] cursor-pointer h-11"
            data-cursor="button"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>30s BRIEF</span>
          </button>

          <MagneticButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              playClick();
              triggerExplosion(e);
              const el = document.getElementById("skills") || document.getElementById("stack");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            data-cursor="button"
            className="px-5 py-3 border border-white/[0.12] hover:border-cyan-400/60 bg-white/[0.03] text-zinc-300 hover:text-white rounded text-xs font-mono tracking-wider transition-all hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] h-11 flex items-center cursor-pointer"
          >
            TECH STACK & TABS
          </MagneticButton>

          <MagneticButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              playClick();
              triggerExplosion(e);
              const el = document.getElementById("architecture");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            data-cursor="button"
            className="px-5 py-3 border border-purple-500/40 hover:border-purple-400 bg-purple-950/20 text-purple-300 hover:text-purple-200 rounded text-xs font-mono tracking-wider transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] h-11 flex items-center cursor-pointer"
          >
            VIEW ARCHITECTURE
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom Status & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-end justify-between border-t border-white/[0.06] pt-5 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-zinc-400">FASTAPI · DISTRIBUTED QUEUES · YOLOv5-CASP · MLOps</span>
          </div>
          <div className="hidden md:block text-zinc-600">
            [SCROLL TO INSPECT CASE STUDIES]
          </div>
        </div>

        <Link
          href="#capabilities"
          className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors"
          data-cursor="button"
        >
          <span className="hidden sm:inline-block">PROCEED</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
