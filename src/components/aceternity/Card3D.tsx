"use client";

import React, { createContext, useState, useContext, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([
  false,
  () => {}
]);

export function CardContainer({
  children,
  className,
  containerClassName
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mousePosX = e.clientX - rect.left;
    const mousePosY = e.clientY - rect.top;

    setSpotlightPos({ x: mousePosX, y: mousePosY });
    x.set(mousePosX / width - 0.5);
    y.set(mousePosY / height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative flex items-center justify-center [perspective:1000px] ${containerClassName || ""}`}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          className={`relative transition-all duration-200 ease-linear ${className || ""}`}
        >
          {/* Dynamic Radial Spotlight */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(550px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0, 229, 255, 0.12), transparent 80%)`
            }}
          />
          {children}
        </motion.div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] ${
        className || ""
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardItem({
  children,
  className,
  translateZ = 0,
  as: Component = "div",
  ...rest
}: {
  children?: React.ReactNode;
  className?: string;
  translateZ?: number | string;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  return (
    <Component
      style={{
        transform: `translateZ(${translateZ}px)`
      }}
      className={`transition duration-200 ease-linear ${className || ""}`}
      {...rest}
    >
      {children}
    </Component>
  );
}

export const useCardMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (!context) {
    throw new Error("useCardMouseEnter must be used within a MouseEnterContext");
  }
  return context;
};
