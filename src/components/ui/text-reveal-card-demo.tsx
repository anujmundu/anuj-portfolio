"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";

export default function TextRevealCardPreview() {
  return (
    <div className="flex items-center justify-center bg-[#07080a] h-[32rem] rounded-2xl w-full p-4 border border-white/5">
      <TextRevealCard
        text="Heuristic Rules"
        revealText="Deep Neural Architectures"
      >
        <TextRevealCardTitle>
          Interactive Decision Boundary Reveal
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          Hover across the card to inspect hidden latent features uncovered through multi-layer deep representations.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
