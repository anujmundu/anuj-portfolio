"use client";

import React from "react";
import { motion } from "motion/react";

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-60 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] ${
        className || ""
      }`}
    >
      <svg
        className="absolute inset-0 h-full w-full stroke-white/[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="beams-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <linearGradient id="beam-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-purple" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#beams-grid)" />

        {/* Diagonal moving laser rays */}
        <motion.path
          d="M -200 -200 L 1200 1200"
          stroke="url(#beam-cyan)"
          strokeWidth="2"
          strokeDasharray="180 360"
          animate={{
            strokeDashoffset: [-540, 540]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.path
          d="M 1400 -100 L -200 1300"
          stroke="url(#beam-purple)"
          strokeWidth="1.5"
          strokeDasharray="220 440"
          animate={{
            strokeDashoffset: [660, -660]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.path
          d="M 200 -300 L 900 1400"
          stroke="url(#beam-cyan)"
          strokeWidth="1"
          strokeDasharray="140 280"
          animate={{
            strokeDashoffset: [-420, 420]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5
          }}
        />
      </svg>

      {/* Ambient Pulsing Aura Blurs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-purple-500/15 blur-[140px]"
      />
    </div>
  );
}
