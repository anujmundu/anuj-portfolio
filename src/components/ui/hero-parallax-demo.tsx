"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export default function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "PulmoVision 3D CT Segmentation",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "OmniForge Multi-Agent Swarm",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "AuraCommerce Vector Engine",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "SpectralSentinel SAR Earth Observation",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "NeuroPulse High-Frequency MLOps",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Quantum Tensor Compression",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Grad-CAM Interactive Heatmaps",
    link: "#lab",
    thumbnail:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Ray Tune Distributed Hyperparameter",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "vLLM PagedAttention Accelerator",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Triton FP16 Inference Pipeline",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "DICOM Volumetric Normalization",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Qdrant Vector Cluster",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Federated Medical Learning",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Real-time Drift Detection",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Autonomous Decision Loops",
    link: "#projects",
    thumbnail:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
  },
];
