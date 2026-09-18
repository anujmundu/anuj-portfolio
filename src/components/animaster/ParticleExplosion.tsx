"use client";

import confetti from "canvas-confetti";
import { playSuccess, playClick } from "@/lib/audio";

export function triggerExplosion(e?: React.MouseEvent) {
  playSuccess();
  
  const x = e ? e.clientX / window.innerWidth : 0.5;
  const y = e ? e.clientY / window.innerHeight : 0.5;

  // Multi-burst neon sparkles and geometry
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x, y },
    colors: ["#00e5ff", "#a855f7", "#10b981", "#ffffff", "#f59e0b"],
    ticks: 200,
    gravity: 1.2,
    scalar: 0.9,
    shapes: ["circle", "square"]
  });

  setTimeout(() => {
    confetti({
      particleCount: 30,
      angle: 60,
      spread: 55,
      origin: { x: Math.max(0.1, x - 0.1), y },
      colors: ["#00e5ff", "#3b82f6", "#ffffff"]
    });
    confetti({
      particleCount: 30,
      angle: 120,
      spread: 55,
      origin: { x: Math.min(0.9, x + 0.1), y },
      colors: ["#a855f7", "#10b981", "#f59e0b"]
    });
  }, 120);
}
