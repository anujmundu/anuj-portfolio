"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgressLaser() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[3px] bg-white/[0.04]">
      {/* Dynamic Laser Progress Beam with Traveling Spark */}
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-500 via-teal-300 to-purple-500 origin-left shadow-[0_0_15px_#00e5ff]"
        style={{ scaleX }}
      />
      {/* Trailing laser point */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#00e5ff,0_0_20px_#ffffff]"
        style={{
          left: useSpring(useScroll().scrollYProgress, { stiffness: 400, damping: 40 }),
        }}
      />
    </div>
  );
}
