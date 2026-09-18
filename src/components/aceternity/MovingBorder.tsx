"use client";

import React, { useRef } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "motion/react";

export function MovingBorder({
  children,
  duration = 3000,
  rx = "12px",
  ry = "12px",
  className,
  containerClassName,
  borderClassName
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div
      className={`relative overflow-hidden rounded-xl p-[1.5px] ${
        containerClassName || ""
      }`}
    >
      <div className="absolute inset-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="h-full w-full"
          width="100%"
          height="100%"
        >
          <rect
            fill="none"
            width="100%"
            height="100%"
            rx={rx}
            ry={ry}
            ref={pathRef}
          />
        </svg>
        <motion.div
          style={{
            top: 0,
            left: 0,
            display: "inline-block",
            transform
          }}
          className={`absolute h-20 w-20 opacity-80 ${borderClassName || ""}`}
        >
          <div className="h-full w-full bg-[radial-gradient(#00e5ff_30%,transparent_70%)]" />
        </motion.div>
      </div>

      <div className={`relative z-10 rounded-[inherit] ${className || ""}`}>
        {children}
      </div>
    </div>
  );
}
