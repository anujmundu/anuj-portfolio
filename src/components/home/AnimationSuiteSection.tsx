"use client";

import React, { useState } from "react";
import { SvgCurveHero } from "@/components/ui/svg-curve-hero";
import Cards from "@/components/ui/cards";
import CardDemo from "@/components/ui/cards-demo-3";
import GlowingEffectDemo from "@/components/ui/glowing-effect-demo";
import TextRevealCardPreview from "@/components/ui/text-reveal-card-demo";
import TabsDemo from "@/components/ui/tabs-demo";
import ThreeDCardDemo from "@/components/ui/3d-card-demo";
import AnimatedPinDemo from "@/components/ui/3d-pin-demo";
import CometCardDemo from "@/components/ui/comet-card-demo";
import FollowingPointerDemo from "@/components/ui/following-pointer-demo";
import MeteorsDemo from "@/components/ui/meteors-demo";
import MovingBorderDemo from "@/components/ui/moving-border-demo";
import PlaceholdersAndVanishInputDemo from "@/components/ui/placeholders-and-vanish-input-demo";
import MultiStepLoaderDemo from "@/components/ui/multi-step-loader-demo";
import LinkPreviewDemo from "@/components/ui/link-preview-demo";
import ImagesSliderDemo from "@/components/ui/images-slider-demo";
import StickyScrollRevealDemo from "@/components/ui/sticky-scroll-reveal-demo";
import FeyCards from "@/components/ui/fey-cards";

export function AnimationSuiteSection() {
  const [activeTab, setActiveTab] = useState<"ALL" | "INTERACTIVE" | "3D_DEPTH" | "SYSTEMS">("ALL");

  return (
    <section id="animation-suite" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#04060a] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#00e5ff]" />
              <span>// COMPLETE 23-COMPONENT INTERACTIVE SUITE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white glow-cyan">
              APPLIED AI & ANIMATION MATRIX
            </h2>
            <p className="mt-2 text-sm text-neutral-400 max-w-2xl font-sans">
              Live production-grade Aceternity UI & Animaster Lib component suite woven directly into Anuj&apos;s AI/ML engineering portfolio.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {(["ALL", "INTERACTIVE", "3D_DEPTH", "SYSTEMS"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded transition-all cursor-pointer ${
                  activeTab === tab
                    ? "text-black font-bold bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_18px_rgba(0,229,255,0.6)]"
                    : "text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06]"
                }`}
              >
                {tab.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* 01. Svg Bezier Curve Runner (All / Systems) */}
        {(activeTab === "ALL" || activeTab === "SYSTEMS") && (
          <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4 md:p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 font-mono text-xs text-neutral-400">
              <span className="text-cyan-400 font-bold">01 // BEZIER TRAJECTORY RUNNER</span>
              <span>INTERACTIVE SVG VECTOR MARQUEE</span>
            </div>
            <SvgCurveHero />
          </div>
        )}

        {/* 02. Interactive Fan Deck Cards (All / Interactive) */}
        {(activeTab === "ALL" || activeTab === "INTERACTIVE") && (
          <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-xs text-neutral-400">
              <span className="text-cyan-400 font-bold">02 // INTERACTIVE FAN DECK</span>
              <span>CLICK CARDS TO EXPAND SPECIALIZATIONS</span>
            </div>
            <Cards />
          </div>
        )}

        {/* 03. Glowing Effect Bento Matrix (All / Systems) */}
        {(activeTab === "ALL" || activeTab === "SYSTEMS") && (
          <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-xs text-neutral-400">
              <span className="text-cyan-400 font-bold">03 // PROXIMITY GLOW MATRIX</span>
              <span>RADIAL CONIC TRACKING</span>
            </div>
            <GlowingEffectDemo />
          </div>
        )}

        {/* 04. 3D Depth Trio: PulmoVision Card, OmniForge Pin, Comet Holo Card (All / 3D_DEPTH) */}
        {(activeTab === "ALL" || activeTab === "3D_DEPTH") && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-xs text-neutral-400">
              <span className="text-cyan-400 font-bold">04 // 3D PERSPECTIVE DEPTH TRIO</span>
              <span>GYROSCOPIC 3D TILT & HOLO REFLECTIONS</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4 backdrop-blur-xl flex flex-col items-center">
                <span className="text-xs font-mono text-cyan-400 mb-2 font-bold">3D CARD CONTAINER</span>
                <ThreeDCardDemo />
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4 backdrop-blur-xl flex flex-col items-center">
                <span className="text-xs font-mono text-cyan-400 mb-2 font-bold">3D PIN CONTAINER</span>
                <AnimatedPinDemo />
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4 backdrop-blur-xl flex flex-col items-center">
                <span className="text-xs font-mono text-cyan-400 mb-2 font-bold">COMET SPECULAR CARD</span>
                <CometCardDemo />
              </div>
            </div>
          </div>
        )}

        {/* 05. Autonomous AI Scanner & Meteors & Decision Reveal (All / Interactive) */}
        {(activeTab === "ALL" || activeTab === "INTERACTIVE") && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 font-mono text-xs text-neutral-400">
                <span className="text-cyan-400 font-bold">05 // AI STACK SCANNER</span>
                <span>MOTION/REACT</span>
              </div>
              <CardDemo />
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 font-mono text-xs text-neutral-400">
                <span className="text-cyan-400 font-bold">06 // METEOR CLOUD</span>
                <span>PARTICLE VELOCITY</span>
              </div>
              <MeteorsDemo />
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 font-mono text-xs text-neutral-400">
                <span className="text-cyan-400 font-bold">07 // FOLLOWER POINTER</span>
                <span>ATTRIBUTION BADGE</span>
              </div>
              <FollowingPointerDemo />
            </div>
          </div>
        )}

        {/* 06. Decision Boundary Reveal Card (All / Interactive) */}
        {(activeTab === "ALL" || activeTab === "INTERACTIVE") && (
          <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-xs text-neutral-400">
              <span className="text-cyan-400 font-bold">08 // DECISION BOUNDARY REVEAL</span>
              <span>CANVAS CLIP-PATH MASK</span>
            </div>
            <TextRevealCardPreview />
          </div>
        )}

        {/* 07. Multi-Domain Tabs & Fey Layered Stack (All / Systems) */}
        {(activeTab === "ALL" || activeTab === "SYSTEMS") && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 font-mono text-xs text-neutral-400">
                <span className="text-cyan-400 font-bold">09 // SPECIALIZATION TABS</span>
                <span>SPRING STACK TRANSITIONS</span>
              </div>
              <TabsDemo />
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 font-mono text-xs text-neutral-400">
                <span className="text-cyan-400 font-bold">10 // FEY LAYERED CARDS</span>
                <span>HOVER SWAP SKELETON</span>
              </div>
              <FeyCards />
            </div>
          </div>
        )}

        {/* 08. Pipeline Sticky Scroll Progression (All / Systems) */}
        {(activeTab === "ALL" || activeTab === "SYSTEMS") && (
          <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-xs text-neutral-400">
              <span className="text-cyan-400 font-bold">11 // PIPELINE STICKY SCROLL REVEAL</span>
              <span>PROGRESSIVE CONTAINER SCROLL TRACKING</span>
            </div>
            <StickyScrollRevealDemo />
          </div>
        )}

        {/* 09. Particle Canvas Vanishing Query & Multi-Step Loader (All / Interactive) */}
        {(activeTab === "ALL" || activeTab === "INTERACTIVE") && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl flex flex-col justify-center">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-6 font-mono text-xs text-neutral-400">
                <span className="text-cyan-400 font-bold">12 // CANVAS PARTICLE VANISH INPUT</span>
                <span>PHYSICS PARTICLE DISPERSION</span>
              </div>
              <PlaceholdersAndVanishInputDemo />
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl flex flex-col justify-center">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-6 font-mono text-xs text-neutral-400">
                <span className="text-cyan-400 font-bold">13 // MULTI-STEP PIPELINE LOADER</span>
                <span>KUBERNETES DEPLOY SIMULATOR</span>
              </div>
              <MultiStepLoaderDemo />
            </div>
          </div>
        )}

        {/* 10. Research Slideshow Theater & Moving Border CTAs (All / Systems) */}
        {(activeTab === "ALL" || activeTab === "SYSTEMS") && (
          <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-xs text-neutral-400">
              <span className="text-cyan-400 font-bold">14 // RESEARCH THEATER & MOVING BORDERS</span>
              <span>AUTOPLAY SLIDER & SVG SVG STROKE RUNNERS</span>
            </div>
            <ImagesSliderDemo />
            <div className="flex flex-col items-center justify-center pt-4 border-t border-white/5">
              <span className="text-xs font-mono text-neutral-400 mb-2">RADIAL MOVING BORDER CTAS</span>
              <MovingBorderDemo />
            </div>
          </div>
        )}

        {/* 11. Live Tooltip Link Previews (All / Interactive) */}
        {(activeTab === "ALL" || activeTab === "INTERACTIVE") && (
          <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 font-mono text-xs text-neutral-400">
              <span className="text-cyan-400 font-bold">15 // LIVE HOVER LINK PREVIEW</span>
              <span>SPRING HOVERCARD PREVIEW SYSTEM</span>
            </div>
            <LinkPreviewDemo />
          </div>
        )}
      </div>
    </section>
  );
}

export default AnimationSuiteSection;
