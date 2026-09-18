"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TextFlippingBoardProps {
  messages?: string[];
  interval?: number;
  className?: string;
  label?: string;
}

const DEFAULT_MESSAGES = [
  "SYSTEM STATUS: 100% NOMINAL",
  "EDGE INFERENCE: 40.3 FPS ACTIVE",
  "AGENTIC RAG LATENCY: 18.4MS P95",
  "MODELS TRAINED: 12 PRODUCTION READY",
  "MANIT BHOPAL: MCA SPECIALIZATION",
  "OPEN FOR DATA & AI/ML ROLES",
];

const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.:%/-+";

export function TextFlippingBoard({
  messages = DEFAULT_MESSAGES,
  interval = 4000,
  className = "",
  label = "REAL-TIME TELEMETRY MATRIX",
}: TextFlippingBoardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(messages[0]);
  const [isFlipping, setIsFlipping] = useState(false);

  // Maximum characters in a board row
  const maxLength = 32;

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipping(true);
      setCurrentIndex((prev) => {
        const nextIdx = (prev + 1) % messages.length;
        setDisplayedText(messages[nextIdx]);
        return nextIdx;
      });
      setTimeout(() => setIsFlipping(false), 800);
    }, interval);

    return () => clearInterval(timer);
  }, [messages, interval]);

  const paddedText = displayedText.padEnd(maxLength, " ").slice(0, maxLength);

  return (
    <div className={`p-4 sm:p-6 rounded-xl border border-cyan-500/30 bg-[#04060a] shadow-[0_0_30px_rgba(0,229,255,0.12)] hud-corner overflow-hidden ${className}`}>
      {/* Top Header Label */}
      <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-2 font-mono text-[10px] sm:text-xs">
        <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-500">
          <span className="text-[10px] text-zinc-400 font-semibold uppercase">VESTABOARD SIMULATOR</span>
          <span className="text-emerald-400 font-bold">ACTIVE</span>
        </div>
      </div>

      {/* Flap Character Display Grid */}
      <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center py-2 font-mono">
        {paddedText.split("").map((char, index) => (
          <FlapCell
            key={`${index}-${char}`}
            char={char}
            index={index}
            isFlipping={isFlipping}
          />
        ))}
      </div>

      {/* Bottom Subtext */}
      <div className="mt-4 pt-2 border-t border-white/[0.04] flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-zinc-600">
        <span>AUTO-ROTATING STREAM // 32-CHAR MECHANICAL MATRIX</span>
        <span className="text-cyan-500/80">SYNCHRONIZED WITH K8S CLUSTER</span>
      </div>
    </div>
  );
}

function FlapCell({
  char,
  index,
  isFlipping,
}: {
  char: string;
  index: number;
  isFlipping: boolean;
}) {
  const isSpecial = [":", "%", "-", "/", "."].includes(char);
  const isDigit = !isNaN(Number(char)) && char !== " ";

  return (
    <div className="relative w-5 h-7 sm:w-6 sm:h-9 bg-[#0b0e14] border border-white/[0.1] rounded-[3px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Middle split-flap seam line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/80 z-20 shadow-[0_1px_1px_rgba(255,255,255,0.05)]" />

      {/* Flapping Motion Card */}
      <motion.div
        key={`${index}-${char}`}
        initial={{ rotateX: -90, opacity: 0.5 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{
          duration: 0.35,
          delay: (index % 12) * 0.025,
          ease: "easeOut",
        }}
        className={`w-full h-full flex items-center justify-center font-bold text-xs sm:text-sm ${
          char === " "
            ? "text-transparent"
            : isSpecial
            ? "text-cyan-400 drop-shadow-[0_0_8px_#00e5ff]"
            : isDigit
            ? "text-emerald-400 drop-shadow-[0_0_8px_#10b981]"
            : "text-zinc-200"
        }`}
      >
        {char}
      </motion.div>
    </div>
  );
}
