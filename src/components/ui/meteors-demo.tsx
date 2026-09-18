"use client";
import React from "react";
import { Meteors } from "@/components/ui/meteors";

export default function MeteorsDemo() {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-cyan-500/20 bg-gradient-to-r from-cyan-500 to-emerald-500 blur-3xl" />
        <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/90 px-6 py-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-4 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-3.5 w-3.5 text-cyan-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h3 className="relative z-50 mb-2 text-xl font-bold text-white tracking-tight">
            High-Velocity Neural Compute
          </h3>

          <p className="relative z-50 mb-6 text-sm font-normal text-neutral-400 leading-relaxed">
            Streaming real-time micro-bursts of model predictions across distributed GPU worker nodes with sub-millisecond serialization.
          </p>

          <a
            href="#projects"
            className="relative z-50 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 transition duration-200"
          >
            Inspect Benchmarks →
          </a>

          <Meteors number={25} />
        </div>
      </div>
    </div>
  );
}
