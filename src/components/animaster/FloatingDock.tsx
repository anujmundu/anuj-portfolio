"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { Home, Briefcase, Cpu, FlaskConical, Zap, Volume2, VolumeX, FileText } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { toggleSound, isSoundEnabled, playClick } from "@/lib/audio";

interface DockItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  onClick?: () => void;
  accent?: string;
}

function DockIcon({
  mouseX,
  item
}: {
  mouseX: any;
  item: DockItem;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-140, 0, 140], [42, 64, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 12 });

  const Icon = item.icon;

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={item.onClick}
      className="relative flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.1] hover:border-cyan-400/60 hover:bg-cyan-950/30 backdrop-blur-xl shadow-lg transition-colors cursor-pointer group"
      data-cursor="button"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            className="absolute -top-9 px-2.5 py-1 rounded bg-[#07080a] border border-cyan-400/40 text-[10px] font-mono text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.3)] whitespace-nowrap pointer-events-none"
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>

      <Icon className={`w-5 h-5 text-zinc-300 group-hover:text-cyan-300 transition-colors ${item.accent || ""}`} />
    </motion.div>
  );

  if (item.href) {
    if (item.href.startsWith("http")) {
      return (
        <a href={item.href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return <Link href={item.href}>{content}</Link>;
  }

  return content;
}

export function FloatingDock({
  className,
  onOpenRecruiter
}: {
  className?: string;
  onOpenRecruiter?: () => void;
}) {
  const mouseX = useMotionValue(Infinity);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    setSoundActive(isSoundEnabled());
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundActive(newState);
  };

  const handleRecruiterClick = () => {
    playClick();
    if (onOpenRecruiter) {
      onOpenRecruiter();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-recruiter-drawer"));
    }
  };

  const items: DockItem[] = [
    { title: "Home", icon: Home, href: "/" },
    { title: "Three Pillars", icon: Cpu, href: "/#capabilities" },
    { title: "Selected Work", icon: Briefcase, href: "/#work" },
    { title: "Neural Lab", icon: FlaskConical, href: "/lab", accent: "text-purple-400" },
    { title: "30s Recruiter Brief", icon: Zap, onClick: handleRecruiterClick, accent: "text-amber-400" },
    {
      title: soundActive ? "Sound: ON" : "Sound: OFF",
      icon: soundActive ? Volume2 : VolumeX,
      onClick: handleSoundToggle,
      accent: soundActive ? "text-cyan-400" : "text-zinc-500"
    },
    { title: "GitHub (37+ Repos)", icon: GithubIcon, href: "https://github.com/anujmundu" },
    { title: "ATS Resume", icon: FileText, href: "/resume" }
  ];

  return (
    <div className={`fixed bottom-6 inset-x-0 mx-auto z-40 w-fit hidden sm:block pointer-events-auto ${className || ""}`}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.8 }}
        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#06080e]/85 border border-white/[0.12] backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,229,255,0.15)]"
      >
        {items.map((item) => (
          <DockIcon key={item.title} mouseX={mouseX} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
