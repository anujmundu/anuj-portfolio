"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "1. Multi-Modal Ingestion & Preprocessing",
    description:
      "High-throughput parallel pipelines normalizing volumetric 3D DICOM CT scans and unstructured textual clinical logs into synchronized tensor streams.",
    content: (
      <div className="flex h-full w-full items-center justify-center flex-col text-white font-mono text-center p-4">
        <span className="text-3xl font-bold mb-2">01</span>
        <span className="text-sm font-semibold">TENSOR PREPROCESSING</span>
        <span className="text-xs text-white/70 mt-2">DICOM · Hounsfield Windowing</span>
      </div>
    ),
  },
  {
    title: "2. Dual-Path Neural Backbone",
    description:
      "Hybrid architecture marrying YOLOv8 fast spatial ROI bounding-box localization with 3D Residual U-Net deep voxel segmentation.",
    content: (
      <div className="flex h-full w-full items-center justify-center flex-col text-white font-mono text-center p-4">
        <span className="text-3xl font-bold mb-2">02</span>
        <span className="text-sm font-semibold">DUAL-PATH BACKBONE</span>
        <span className="text-xs text-white/70 mt-2">YOLOv8 + 3D Res-UNet</span>
      </div>
    ),
  },
  {
    title: "3. Explainability & Attention Attribution",
    description:
      "Real-time Grad-CAM activations superimposed onto cross-sectional slices, rendering transparent clinician-verifiable decision bounds.",
    content: (
      <div className="flex h-full w-full items-center justify-center flex-col text-white font-mono text-center p-4">
        <span className="text-3xl font-bold mb-2">03</span>
        <span className="text-sm font-semibold">GRAD-CAM ATTRIBUTION</span>
        <span className="text-xs text-white/70 mt-2">Feature Importance Heatmaps</span>
      </div>
    ),
  },
  {
    title: "4. Triton Inference Production Serving",
    description:
      "Optimized FP16 TensorRT engines deployed onto distributed Triton server replicas delivering 14.2ms P99 inference latency.",
    content: (
      <div className="flex h-full w-full items-center justify-center flex-col text-white font-mono text-center p-4">
        <span className="text-3xl font-bold mb-2">04</span>
        <span className="text-sm font-semibold">TRITON DEPLOYMENT</span>
        <span className="text-xs text-white/70 mt-2">TensorRT FP16 · 14.2ms P99</span>
      </div>
    ),
  },
];

export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
