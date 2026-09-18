"use client";

import { Tabs } from "@/components/ui/tabs";

export default function TabsDemo() {
  const tabs = [
    {
      title: "Computer Vision",
      value: "cv",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 md:p-10 text-white bg-gradient-to-br from-cyan-900/60 to-slate-900 border border-cyan-500/20 shadow-2xl">
          <p className="text-xl md:text-3xl font-bold tracking-tight mb-2">Diagnostic Vision & CT Segmentation</p>
          <p className="text-sm text-cyan-200/80 mb-6">Dual-stage YOLOv8 + 3D U-Net pipeline for automated pulmonary nodule localization with Grad-CAM visual heatmaps.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-cyan-400 block text-base font-bold">99.4%</span>
              <span className="text-neutral-400">Sensitivity</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-emerald-400 block text-base font-bold">0.912</span>
              <span className="text-neutral-400">Dice Coeff</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-purple-400 block text-base font-bold">PyTorch</span>
              <span className="text-neutral-400">Core Engine</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-amber-400 block text-base font-bold">TensorRT</span>
              <span className="text-neutral-400">Inference Accel</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Autonomous LLMs",
      value: "llms",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 md:p-10 text-white bg-gradient-to-br from-purple-900/60 to-slate-900 border border-purple-500/20 shadow-2xl">
          <p className="text-xl md:text-3xl font-bold tracking-tight mb-2">Multi-Agent Cognitive Systems</p>
          <p className="text-sm text-purple-200/80 mb-6">Autonomous reasoning swarms with self-correcting reflection loops, function-calling schemas, and low-latency streaming.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-purple-400 block text-base font-bold">LangGraph</span>
              <span className="text-neutral-400">State Machine</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-cyan-400 block text-base font-bold">vLLM</span>
              <span className="text-neutral-400">PagedAttention</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-emerald-400 block text-base font-bold">Qdrant</span>
              <span className="text-neutral-400">Vector Index</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-pink-400 block text-base font-bold">120 t/s</span>
              <span className="text-neutral-400">Generation Rate</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "MLOps & Infra",
      value: "mlops",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 md:p-10 text-white bg-gradient-to-br from-emerald-900/60 to-slate-900 border border-emerald-500/20 shadow-2xl">
          <p className="text-xl md:text-3xl font-bold tracking-tight mb-2">Production Deployment Fabric</p>
          <p className="text-sm text-emerald-200/80 mb-6">Kubernetes orchestrated Triton inference servers with automated shadow deployments and real-time concept drift monitoring.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-emerald-400 block text-base font-bold">Docker</span>
              <span className="text-neutral-400">Containerized</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-cyan-400 block text-base font-bold">Prometheus</span>
              <span className="text-neutral-400">Telemetry</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-amber-400 block text-base font-bold">Ray Tune</span>
              <span className="text-neutral-400">Hyperparam Opt</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-purple-400 block text-base font-bold">99.99%</span>
              <span className="text-neutral-400">SLA Uptime</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[24rem] md:h-[32rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-12">
      <Tabs tabs={tabs} />
    </div>
  );
}
