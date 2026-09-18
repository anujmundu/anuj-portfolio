"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  layer: number; // 0: Raw Data, 1: Insight, 2: Model, 3: System
  alpha: number;
}

export function ParticlePipelineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    let mouse = { x: -1000, y: -1000, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const nodeCount = prefersReducedMotion ? 15 : isMobile ? 30 : 65;
    let nodes: Node[] = [];

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        // Bias node distribution along horizontal pipeline flow
        const layer = Math.floor(Math.random() * 4); // 4 stages
        const xOffset = (width / 4) * layer + Math.random() * (width / 4.5);
        nodes.push({
          x: xOffset,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.4) + 0.15,
          vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.3),
          radius: Math.random() * 1.8 + 1.2,
          layer,
          alpha: Math.random() * 0.4 + 0.2
        });
      }
    };

    initNodes();

    const layerColors = [
      "rgba(245, 158, 11, ", // 0: Data - Amber
      "rgba(16, 185, 129, ", // 1: Insight - Emerald
      "rgba(0, 229, 255, ",  // 2: Model - Cyan
      "rgba(168, 85, 247, "  // 3: System - Purple
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle horizontal pipeline flow indicators
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      for (let y = height * 0.25; y < height; y += height * 0.25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Normal velocity
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around boundaries
        if (node.x > width + 20) node.x = -20;
        if (node.x < -20) node.x = width + 20;
        if (node.y > height) node.y = 0;
        if (node.y < 0) node.y = height;

        // Cursor interaction (gentle repulsion)
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 1.5;
            node.x -= (dx / dist) * force;
            node.y -= (dy / dist) * force;
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = layerColors[node.layer] + node.alpha + ")";
        ctx.fill();

        // Connect nearby nodes within same or adjacent pipeline stages
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxConnectDist = isMobile ? 80 : 125;

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.14;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60 mix-blend-screen"
    />
  );
}
