"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Menu, X, FileText, Sun, Moon, ArrowUpRight, Zap, Volume2, VolumeX, Smartphone } from "lucide-react";
import { toggleSound, isSoundEnabled, setSoundEnabled, playClick } from "@/lib/audio";

interface NavbarProps {
  onOpenTerminal?: () => void;
  onOpenRecruiter?: () => void;
}

export function Navbar({ onOpenTerminal, onOpenRecruiter }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [soundActive, setSoundActive] = useState(true);

  useEffect(() => {
    // Theme initialization
    const savedTheme = (localStorage.getItem("portfolio-theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Audio initialization (default unmuted)
    const storedAudio = localStorage.getItem("portfolio-audio");
    const audioState = storedAudio !== null ? storedAudio === "true" : true;
    setSoundEnabled(audioState);
    setSoundActive(audioState);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    playClick();
  };

  const navLinks = [
    { label: "CAPABILITIES", href: "/#capabilities" },
    { label: "WORK", href: "/#work" },
    { label: "ARCHITECTURE", href: "/#architecture" },
    { label: "LAB", href: "/lab" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/#contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#07080a]/80 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 font-mono tracking-tight shrink-0"
          data-cursor="button"
        >
          <span className="text-base font-extrabold tracking-wider text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
            ANUJ MUNDU
          </span>
          <span className="hidden sm:inline-block text-[10px] text-zinc-500 font-mono tracking-widest whitespace-nowrap">
            [DATA × AI]
          </span>
        </Link>

        {/* Availability Live Indicator (Center on large screens) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.07] bg-white/[0.02] text-[11px] font-mono text-zinc-400 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="tracking-wide">AVAILABLE FOR OPPORTUNITIES</span>
        </div>

        {/* Desktop Nav Links & CTAs */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6 shrink-0">
          <nav className="flex items-center gap-3 lg:gap-4 xl:gap-5 font-mono text-xs tracking-wider text-zinc-400">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-white whitespace-nowrap ${
                    isActive ? "text-cyan-400 font-bold" : ""
                  }`}
                  data-cursor="button"
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cyan-400"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="h-4 w-[1px] bg-zinc-800" />

          {/* Recruiter Fast-Track Trigger */}
          {onOpenRecruiter && (
            <button
              onClick={() => {
                playClick();
                onOpenRecruiter();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-400 hover:text-black font-mono text-[11px] font-bold tracking-wider transition-all cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.15)] whitespace-nowrap"
              data-cursor="button"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>30s BRIEF</span>
            </button>
          )}

          {/* Responsive Device Simulator Trigger */}
          <button
            onClick={() => {
              playClick();
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-device-simulator"));
              }
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-400 hover:text-black font-mono text-[11px] font-bold tracking-wider transition-all cursor-pointer shadow-[0_0_10px_rgba(0,229,255,0.15)] whitespace-nowrap"
            title="Open Interactive Responsive Design Simulator (Alt+D or Ctrl+Shift+M)"
            data-cursor="button"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">SIMULATOR</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => setSoundActive(toggleSound())}
            className="p-1.5 rounded text-zinc-400 hover:text-cyan-400 hover:bg-white/[0.05] transition-colors cursor-pointer"
            title={soundActive ? "Audio Feedback: ON (Click to Mute)" : "Audio Feedback: OFF (Click to Enable)"}
            aria-label="Toggle Audio"
            data-cursor="button"
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Interactive Terminal Trigger */}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="p-1.5 rounded text-zinc-400 hover:text-cyan-400 hover:bg-white/[0.05] transition-colors cursor-pointer"
              title="Open Terminal (CLI Mode)"
              aria-label="Open Interactive CLI Terminal"
              data-cursor="button"
            >
              <Terminal className="w-4 h-4" />
            </button>
          )}

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded text-zinc-400 hover:text-amber-400 hover:bg-white/[0.05] transition-colors cursor-pointer"
            title="Toggle Visual Theme"
            aria-label="Toggle Theme"
            data-cursor="button"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Resume CTA */}
          <Link
            href="/resume"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400 hover:text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-[0_0_12px_rgba(0,229,255,0.15)] hover:shadow-[0_0_18px_rgba(0,229,255,0.4)] whitespace-nowrap"
            data-cursor="button"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </Link>
        </div>

        {/* Mobile menu buttons */}
        <div className="flex items-center gap-2 md:hidden">
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="p-1.5 text-zinc-400 hover:text-cyan-400"
              aria-label="Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#07080a]/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-6 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4 font-mono text-sm tracking-wider">
              <div className="flex items-center gap-2 pb-3 mb-1 border-b border-zinc-800/60 text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AVAILABLE FOR OPPORTUNITIES</span>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-300 hover:text-cyan-400 py-1 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {onOpenRecruiter && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    playClick();
                    onOpenRecruiter();
                  }}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded bg-amber-400 text-black font-bold text-xs shadow-[0_0_12px_rgba(245,158,11,0.3)] cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>RECRUITER 30s BRIEF</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  playClick();
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-device-simulator"));
                  }
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-bold text-xs shadow-[0_0_12px_rgba(0,229,255,0.2)] cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>RESPONSIVE DEVICE SIMULATOR</span>
              </button>
              <div className="pt-4 flex items-center justify-between border-t border-zinc-800/60">
                <Link
                  href="/resume"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold"
                >
                  <FileText className="w-4 h-4" />
                  <span>VIEW RESUME</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSoundActive(toggleSound())}
                    className="text-xs text-zinc-400 hover:text-cyan-400 flex items-center gap-1.5 cursor-pointer"
                    title="Toggle Audio"
                  >
                    {soundActive ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
                    <span>{soundActive ? "Sound ON" : "Muted"}</span>
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{theme === "dark" ? "Light" : "Dark"}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
