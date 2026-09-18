"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Preloader() {
  const [complete, setComplete] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("anuj_portfolio_preloader_seen");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (hasSeen || prefersReducedMotion) {
        setSkip(true);
        setComplete(true);
        return;
      }

      const timer = setTimeout(() => {
        setComplete(true);
        sessionStorage.setItem("anuj_portfolio_preloader_seen", "true");
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#07080a] text-white select-none"
        >
          {/* Top and Bottom Curtain Reveal */}
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            className="absolute inset-0 bg-[#07080a] origin-top"
          />

          <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
            {/* Letters A N U J staggered */}
            <div className="flex items-center gap-3 overflow-hidden">
              {["A", "N", "U", "J"].map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="font-mono text-3xl md:text-5xl font-extrabold tracking-widest text-white"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
                className="flex items-center gap-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.25em] text-cyan-400"
              >
                <span>DATA</span>
                <span className="text-zinc-600">×</span>
                <span>AI</span>
                <span className="text-zinc-600">×</span>
                <span>ENGINEERING</span>
              </motion.div>
            </div>

            {/* Subtle pipeline ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-2 text-[10px] font-mono text-zinc-500 tracking-wider flex items-center gap-2"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>INITIALIZING SYSTEM</span>
            </motion.div>
          </div>

          {/* Quick Skip button */}
          <button
            onClick={() => {
              setComplete(true);
              sessionStorage.setItem("anuj_portfolio_preloader_seen", "true");
            }}
            className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-wider text-zinc-600 hover:text-zinc-300 transition-colors z-20 cursor-pointer"
          >
            [ESC / SKIP]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
