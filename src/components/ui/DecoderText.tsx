"use client";

import React, { useState, useEffect } from "react";

interface DecoderTextProps {
  text: string;
  className?: string;
  speed?: number;
  triggerOnHover?: boolean;
}

const GLYPHS = "01#*$%&@!<>~_+=/{}[]";

export function DecoderText({
  text,
  className = "",
  speed = 30,
  triggerOnHover = true,
}: DecoderTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((_) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 2;
    }, speed);
  };

  useEffect(() => {
    startScramble();
  }, [text]);

  return (
    <span
      onMouseEnter={() => {
        if (triggerOnHover) startScramble();
      }}
      className={`inline-block cursor-default select-none font-mono ${className}`}
    >
      {displayText}
    </span>
  );
}
