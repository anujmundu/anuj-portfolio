"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white uppercase tracking-wider font-mono">
              Distributed Edge Inference & <br />
              <span className="text-4xl sm:text-5xl md:text-[5.5rem] font-extrabold mt-1 leading-none bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400">
                Tensor Acceleration
              </span>
            </h1>
          </>
        }
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-950 flex flex-col items-center justify-center p-6 border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.15),transparent_70%)]" />
          <div className="z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              SYSTEM TELEMETRY CONSOLE v4.2
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
              Enterprise Neural Vision Pipeline
            </h2>
            <p className="text-neutral-400 max-w-lg mx-auto text-sm">
              Real-time multi-agent inference tracking with 99.4% F1-score and distributed WebGPU tensor streaming.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-2xl z-10 font-mono text-xs">
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/5 text-center">
              <p className="text-cyan-400 text-lg font-bold">14.2 ms</p>
              <p className="text-neutral-500">Inference Latency</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/5 text-center">
              <p className="text-emerald-400 text-lg font-bold">99.4%</p>
              <p className="text-neutral-500">Precision Rate</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/5 text-center">
              <p className="text-purple-400 text-lg font-bold">1.2M+</p>
              <p className="text-neutral-500">Params Active</p>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
