"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
  {
    text: "Mounting Volumetric DICOM Volume",
  },
  {
    text: "Extracting 3D Residual U-Net Feature Maps",
  },
  {
    text: "Compiling TensorRT FP16 Execution Plan",
  },
  {
    text: "Synthesizing Grad-CAM Activation Heatmaps",
  },
  {
    text: "Deploying Replicas to Triton Kubernetes Swarm",
  },
  {
    text: "Sub-millimeter Nodule Verification: 99.4% F1-Score",
  },
];

export default function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full h-[24rem] flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={loading} duration={1500} />

      <button
        onClick={() => setLoading(true)}
        className="bg-cyan-500 hover:bg-cyan-400 text-black mx-auto text-sm md:text-base transition font-semibold duration-200 h-11 rounded-xl px-8 flex items-center justify-center shadow-[0_0_25px_rgba(0,229,255,0.4)] cursor-pointer"
      >
        ✦ Simulate Pipeline Deployment
      </button>

      {loading && (
        <button
          className="fixed top-6 right-6 text-white z-[120] cursor-pointer hover:text-cyan-400 transition"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
