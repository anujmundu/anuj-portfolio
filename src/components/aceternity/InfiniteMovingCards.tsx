"use client";

import React, { useEffect, useRef, useState } from "react";

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    tag: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] ${className || ""}`}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap ${
          start ? "animate-scroll" : ""
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[350px] max-w-full relative rounded-xl border border-white/[0.08] shrink-0 bg-[#090b10] px-6 py-5 md:w-[420px] hud-corner hover:border-cyan-400/50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 font-bold">
                {item.tag}
              </span>
              <span className="font-mono text-[10px] text-zinc-600">
                VERIFIED LOG
              </span>
            </div>

            <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed italic mb-4">
              "{item.quote}"
            </p>

            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-black font-mono">
                {item.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono uppercase">
                  {item.name}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">
                  {item.title}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
