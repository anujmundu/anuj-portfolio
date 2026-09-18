"use client";
import React from "react";
import { Button } from "@/components/ui/moving-border";

export default function MovingBorderDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-8">
      <Button
        borderRadius="1.75rem"
        className="bg-neutral-950 text-white border-neutral-800 font-mono text-xs"
      >
        ✦ Deploy Checkpoint
      </Button>
      <Button
        borderRadius="1.75rem"
        duration={2500}
        className="bg-neutral-950 text-cyan-400 border-cyan-900/50 font-mono text-xs"
      >
        ◈ Active Inference
      </Button>
    </div>
  );
}
