"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-cyan-500/[0.15] dark:bg-neutral-900 dark:border-white/[0.15] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-2xl p-6 border shadow-xl">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-800 dark:text-white"
        >
          PulmoVision 3D CT Diagnostic Model
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-400"
        >
          Sub-millimeter volumetric nodule localization with spatial bounding and Grad-CAM interpretability.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <div className="h-60 w-full rounded-xl bg-gradient-to-tr from-cyan-900/60 via-slate-900 to-indigo-950 p-6 flex flex-col justify-between border border-white/10 group-hover/card:shadow-2xl">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-cyan-400">STATUS: INFERRED</span>
              <span className="text-emerald-400">CONF: 98.7%</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-[94%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                <span>VOLUMETRIC SLICE: 142/256</span>
                <span>F1-SCORE: 0.942</span>
              </div>
            </div>
          </div>
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="a"
            href="#projects"
            className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:text-cyan-400 transition"
          >
            Inspect Architecture →
          </CardItem>
          <CardItem
            translateZ={20}
            as="a"
            href="#contact"
            className="px-4 py-2 rounded-xl bg-black dark:bg-cyan-500 dark:text-black text-white text-xs font-bold"
          >
            Deploy Pipeline
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
