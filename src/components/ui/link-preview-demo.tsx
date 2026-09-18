"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";

export default function LinkPreviewDemo() {
  return (
    <div className="flex justify-center items-center h-[30rem] md:h-[40rem] flex-col px-4 text-center">
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10">
        Engineered with{" "}
        <LinkPreview url="https://pytorch.org" className="font-bold text-cyan-400">
          PyTorch
        </LinkPreview>{" "}
        and{" "}
        <LinkPreview url="https://framer.com/motion" className="font-bold text-emerald-400">
          Motion Physics
        </LinkPreview>{" "}
        for state-of-the-art model inference and telemetry.
      </p>
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto">
        Explore live repositories on{" "}
        <LinkPreview
          url="https://github.com/anujtiwari"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 to-purple-500"
        >
          GitHub Enterprise
        </LinkPreview>{" "}
        for open-source checkpoints and benchmarks.
      </p>
    </div>
  );
}
