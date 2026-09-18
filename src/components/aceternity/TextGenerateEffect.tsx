"use client";

import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

export function TextGenerateEffect({
  words,
  className,
  highlightWords = []
}: {
  words: string;
  className?: string;
  highlightWords?: string[];
}) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: "blur(0px)",
        transform: "translateY(0px)"
      },
      {
        duration: 0.5,
        delay: stagger(0.08)
      }
    );
  }, [animate]);

  return (
    <div className={`font-bold ${className || ""}`}>
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          const isHighlight = highlightWords.some(
            (hw) => hw.toLowerCase() === word.toLowerCase().replace(/[^a-z0-9]/gi, "")
          );
          return (
            <motion.span
              key={word + idx}
              initial={{ opacity: 0, filter: "blur(8px)", transform: "translateY(8px)" }}
              className={`inline-block mr-1.5 ${
                isHighlight
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                  : "text-white"
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}
