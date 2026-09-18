"use client";

import React from "react";
import { motion } from "motion/react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ${className || ""}`}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  badge,
  glowColor = "cyan",
  children,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  glowColor?: "cyan" | "emerald" | "amber" | "purple";
  children?: React.ReactNode;
}) {
  const glowMap = {
    cyan: "hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]",
    emerald: "hover:border-emerald-400/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]",
    amber: "hover:border-amber-400/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]",
    purple: "hover:border-purple-400/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`row-span-1 rounded-xl group/bento transition duration-300 p-5 bg-[#080a10] border border-white/[0.08] justify-between flex flex-col space-y-4 hud-corner relative overflow-hidden ${
        glowMap[glowColor]
      } ${className || ""}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl pointer-events-none group-hover/bento:bg-cyan-500/10 transition-colors" />

      {/* Reactive Proximity Glowing Effect Border */}
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={80}
        inactiveZone={0.01}
        borderWidth={1.5}
      />

      {header && <div className="w-full relative z-10">{header}</div>}

      <div className="group-hover/bento:translate-x-1 transition duration-200 relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            {badge && (
              <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.06]">
                {badge}
              </span>
            )}
          </div>
        </div>

        <div className="font-sans font-bold text-white text-base tracking-tight uppercase group-hover/bento:text-cyan-300 transition-colors">
          {title}
        </div>
        
        <div className="font-sans font-normal text-zinc-400 text-xs leading-relaxed">
          {description}
        </div>

        {children && <div className="pt-2 relative z-10">{children}</div>}
      </div>
    </motion.div>
  );
}
