"use client";
import { CometCard } from "@/components/ui/comet-card";

export default function CometCardDemo() {
  return (
    <div className="flex justify-center items-center py-6">
      <CometCard>
        <div
          className="flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border border-white/10 bg-[#0f121a] p-4"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-gradient-to-tr from-cyan-900/80 via-slate-900 to-emerald-950 p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] font-mono text-cyan-300">
              <span>CHECKPOINT #ANUJ-AI</span>
              <span className="bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-400">VERIFIED</span>
            </div>
            <div>
              <p className="text-white font-bold text-base">Anuj Tiwari</p>
              <p className="text-xs text-neutral-400 font-mono">Lead AI/ML Systems Engineer</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between font-mono text-white text-xs">
            <div className="text-neutral-400">Gold Medalist · MCA</div>
            <div className="text-cyan-400 font-bold">99.4% Acc</div>
          </div>
        </div>
      </CometCard>
    </div>
  );
}
