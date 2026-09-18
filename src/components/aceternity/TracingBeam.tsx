"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "motion/react";

export function TracingBeam({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(1000);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight || 1000);
    }
  }, [children]);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.9], [20, Math.max(100, svgHeight - 40)]),
    { stiffness: 400, damping: 50 }
  );

  return (
    <motion.div
      ref={ref}
      className={`relative mx-auto h-full w-full max-w-7xl ${className || ""}`}
    >
      {/* Cyber Beam Track along the left edge */}
      <div className="absolute -left-3 sm:-left-6 lg:-left-8 top-0 bottom-0 w-8 hidden md:flex flex-col items-center pointer-events-none z-20">
        <motion.div
          style={{ y: y1 }}
          className="relative flex h-4 w-4 items-center justify-center rounded-full border border-cyan-400/80 bg-[#020408] shadow-[0_0_16px_#00e5ff]"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00e5ff] animate-ping" />
        </motion.div>

        <svg
          viewBox={`0 0 16 ${svgHeight}`}
          width="16"
          height={svgHeight}
          className="block overflow-visible"
          aria-hidden="true"
        >
          <line
            x1="8"
            y1="0"
            x2="8"
            y2={svgHeight}
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <motion.line
            x1="8"
            y1="0"
            x2="8"
            y2={y1}
            stroke="url(#beam-gradient)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="beam-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#00e5ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </motion.div>
  );
}
