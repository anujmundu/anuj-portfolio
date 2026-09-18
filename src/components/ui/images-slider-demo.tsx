"use client";
import { motion } from "motion/react";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";

export default function ImagesSliderDemo() {
  const images = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  ];
  return (
    <ImagesSlider className="h-[30rem] md:h-[36rem] rounded-2xl border border-white/10" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center text-center px-4"
      >
        <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs mb-4">
          DEEP NEURAL RESEARCH & PRODUCTION
        </span>
        <motion.h2 className="font-bold text-2xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-500 py-2 max-w-3xl">
          Transforming Raw Data into Autonomous Vision & Cognitive Systems
        </motion.h2>
        <p className="text-neutral-300 text-sm md:text-base max-w-xl mt-2">
          From hospital PACS CT scans to distributed LLM microservices serving millions of requests.
        </p>
        <a
          href="#projects"
          className="px-6 py-2.5 backdrop-blur-sm border bg-cyan-500/20 border-cyan-500/40 text-cyan-200 font-medium mx-auto text-center rounded-full relative mt-6 hover:bg-cyan-500/30 transition text-sm flex items-center gap-2"
        >
          <span>Explore Architectural Case Studies →</span>
          <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-cyan-400 to-transparent" />
        </a>
      </motion.div>
    </ImagesSlider>
  );
}
