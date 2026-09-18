"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Architecting",
    },
    {
      text: "autonomous",
    },
    {
      text: "intelligence",
    },
    {
      text: "at",
    },
    {
      text: "scale.",
      className: "text-cyan-400 dark:text-cyan-400",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[28rem] px-4 text-center">
      <p className="text-neutral-400 text-xs sm:text-base font-mono uppercase tracking-widest">
        Deep Learning · Neural Inference · MLOps
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <a
          href="#projects"
          className="w-40 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold flex items-center justify-center transition"
        >
          View Models
        </a>
        <a
          href="#contact"
          className="w-40 h-10 rounded-xl bg-neutral-900 text-white border border-neutral-700 hover:border-neutral-500 text-sm flex items-center justify-center transition"
        >
          Initiate Contact
        </a>
      </div>
    </div>
  );
}
