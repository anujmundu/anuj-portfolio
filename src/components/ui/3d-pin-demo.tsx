"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";

export default function AnimatedPinDemo() {
  return (
    <div className="h-[32rem] w-full flex items-center justify-center">
      <PinContainer
        title="github.com/anujtiwari/omniforge"
        href="https://github.com/anujtiwari"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/80 sm:basis-1/2 w-[20rem] h-[20rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-white">
            OmniForge Swarm Engine
          </h3>
          <div className="text-xs !m-0 !p-0 font-normal">
            <span className="text-neutral-400">
              Distributed asynchronous multi-agent coordination with real-time vector memory and dynamic code generation.
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 p-3 flex flex-col justify-end">
            <span className="font-mono text-xs text-white font-bold bg-black/40 px-2 py-1 rounded w-fit">
              v2.4 Production Stable
            </span>
          </div>
        </div>
      </PinContainer>
    </div>
  );
}
