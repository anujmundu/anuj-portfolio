"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Activity, Volume2, VolumeX, Terminal, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { isSoundEnabled, toggleSound, playClick } from "@/lib/audio";

interface NotchProps {
  onOpenRecruiter?: () => void;
}

export function Notch({ onOpenRecruiter }: NotchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const handleAudioToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = toggleSound();
    setEnabled(next);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto max-w-[calc(100vw-2rem)]">
      <motion.div
        layout
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`relative cursor-pointer bg-black/90 backdrop-blur-2xl border border-white/[0.15] hover:border-cyan-400/80 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,229,255,0.2)] transition-colors overflow-hidden ${
          isOpen ? "px-5 py-3 rounded-2xl w-[340px] max-w-[calc(100vw-2rem)]" : "px-3.5 sm:px-4 py-2 w-auto"
        }`}
      >
        {/* Compact Pill State */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 font-mono text-[11px]"
          >
            {/* Pulsing indicator */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-white font-bold tracking-wider">SYSTEM ACTIVE</span>
            </div>

            <span className="text-zinc-600">|</span>

            <span className="text-emerald-400 font-semibold">18.4ms</span>

            <span className="text-zinc-600">|</span>

            <span className="text-zinc-400 hover:text-cyan-300">ANUJ HUD ▾</span>
          </motion.div>
        )}

        {/* Expanded Dynamic Island Notch State */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-3 font-mono text-xs"
          >
            {/* Top Bar of Expanded Island */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-extrabold text-[11px] tracking-widest uppercase glow-cyan">
                  PRODUCTION STATUS
                </span>
              </div>
              <button
                onClick={handleAudioToggle}
                className="p-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors"
                title="Toggle UI Audio"
              >
                {!enabled ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            </div>

            {/* Quick Diagnostic Metrics */}
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05]">
                <div className="text-zinc-500 uppercase">CV Model Latency</div>
                <div className="text-white font-bold text-xs mt-0.5 text-emerald-400">40.3 FPS (INT8)</div>
              </div>
              <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05]">
                <div className="text-zinc-500 uppercase">Availability</div>
                <div className="text-cyan-400 font-bold text-xs mt-0.5">OPEN FOR HIRES</div>
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <Link
                href="/work/omniforge-ai"
                className="flex-1 text-center px-2.5 py-1.5 rounded bg-white/[0.05] hover:bg-cyan-400 hover:text-black transition-colors text-[10px] font-bold text-zinc-300"
              >
                CASE STUDIES
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                  if (onOpenRecruiter) onOpenRecruiter();
                  else if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-recruiter-drawer"));
                  }
                }}
                className="flex-1 text-center px-2.5 py-1.5 rounded bg-gradient-to-r from-cyan-400 to-teal-300 text-black text-[10px] font-extrabold shadow-[0_0_12px_rgba(0,229,255,0.4)]"
              >
                ⚡ 30s BRIEF
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
