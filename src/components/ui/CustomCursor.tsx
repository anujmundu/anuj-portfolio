"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "motion/react";

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
}

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "project" | "link" | "button" | "drag">("default");

  // Physics springs
  const springConfig = { damping: 25, stiffness: 450, mass: 0.3 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const trailSpringConfig = { damping: 18, stiffness: 140, mass: 0.8 };
  const trailX = useSpring(-100, trailSpringConfig);
  const trailY = useSpring(-100, trailSpringConfig);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SparkleParticle[]>([]);
  const lastMousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) return;

    setMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const colors = ["#00e5ff", "#38bdf8", "#a855f7", "#10b981"];

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!visible) setVisible(true);

      // Spawn quantum trail particles on movement
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 4 && particlesRef.current.length < 50) {
        for (let i = 0; i < Math.min(3, Math.floor(speed / 8) + 1); i++) {
          particlesRef.current.push({
            id: Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 12,
            y: e.clientY + (Math.random() - 0.5) * 12,
            size: Math.random() * 2.2 + 1,
            alpha: 0.85,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest("[data-cursor='project']");
      const dragEl = target.closest("[data-cursor='drag']");
      const buttonEl = target.closest("button, [role='button'], a, input, [data-cursor='button']");
      const isExternal = target.closest("a[target='_blank']");

      if (projectEl) {
        setCursorVariant("project");
        setCursorText("VIEW");
      } else if (dragEl) {
        setCursorVariant("drag");
        setCursorText("DRAG");
      } else if (isExternal) {
        setCursorVariant("link");
        setCursorText("↗");
      } else if (buttonEl) {
        setCursorVariant("button");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    // Render loop for celestial particle trail
    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.alpha -= 0.035;
        p.size *= 0.95;
        p.y += 0.3;

        if (p.alpha <= 0.05 || p.size <= 0.3) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(renderParticles);
    };

    renderParticles();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, trailX, trailY, visible]);

  if (!mounted) return null;

  return (
    <>
      {/* HTML5 Canvas Stardust Particle Trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      />

      {/* Outer fluid trailing HUD targeting ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full border border-cyan-400/50 shadow-[0_0_18px_rgba(0,229,255,0.4)]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorVariant === "project" ? 64 : cursorVariant === "button" ? 48 : 34,
          height: cursorVariant === "project" ? 64 : cursorVariant === "button" ? 48 : 34,
          opacity: visible ? 0.75 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 220 }}
      >
        {/* Subtle HUD corner crosshairs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1 h-[2px] bg-cyan-400" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1 h-[2px] bg-cyan-400" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 h-1 w-[2px] bg-cyan-400" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 h-1 w-[2px] bg-cyan-400" />
      </motion.div>

      {/* Inner tactile magnetic core */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center font-mono text-[10px] font-bold tracking-wider select-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0
        }}
        animate={{
          scale: cursorVariant === "project" ? 2.6 : cursorVariant === "button" ? 1.6 : cursorVariant === "link" ? 1.8 : 1,
          backgroundColor:
            cursorVariant === "project"
              ? "rgba(0, 229, 255, 0.95)"
              : cursorVariant === "link"
              ? "rgba(16, 185, 129, 0.95)"
              : cursorVariant === "button"
              ? "rgba(255, 255, 255, 0.25)"
              : "rgba(255, 255, 255, 0.95)",
          borderColor:
            cursorVariant === "button"
              ? "rgba(0, 229, 255, 0.8)"
              : "rgba(0, 229, 255, 0)",
          borderWidth: cursorVariant === "button" ? 1.5 : 0,
          boxShadow: cursorVariant === "project"
            ? "0 0 30px rgba(0,229,255,0.9)"
            : cursorVariant === "link"
            ? "0 0 25px rgba(16,185,129,0.8)"
            : "0 0 12px rgba(255,255,255,0.6)",
          width: cursorVariant === "project" || cursorVariant === "link" ? 38 : cursorVariant === "button" ? 32 : 8,
          height: cursorVariant === "project" || cursorVariant === "link" ? 38 : cursorVariant === "button" ? 32 : 8,
          borderRadius: "9999px"
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        {cursorText && (
          <span className="text-[#020408] uppercase font-extrabold text-[9px] tracking-tight">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
