"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { QuickContactTerminal } from "@/components/ui/QuickContactTerminal";

export function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short"
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] text-zinc-400 font-mono text-xs py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        {/* Left: Brand Identity & Positioning */}
        <div className="space-y-4 max-w-md">
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold tracking-widest text-white">ANUJ</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/80 text-cyan-400 border border-zinc-700/50">
              DATA × AI × SYSTEMS
            </span>
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Python Backend Engineer · AI/ML Systems Engineer · Data Scientist. MANIT Bhopal graduate. Bridging the lifecycle from distributed queuing to production deep learning inference.
          </p>
          <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
            <span>LOC: BHOPAL, INDIA / REMOTE</span>
            <span>•</span>
            <span>SYS TIME: {time || "03:55:00 UTC"}</span>
          </div>
        </div>

        {/* Right: Quick Links & Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8 w-full md:w-auto justify-between">
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/anujmundu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              data-cursor="button"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB</span>
            </a>
            <a
              href="https://linkedin.com/in/anujmundu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              data-cursor="button"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LINKEDIN</span>
            </a>
            <a
              href="mailto:anujmark.edwin.ame@gmail.com"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              data-cursor="button"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL</span>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-600 bg-white/[0.02] text-zinc-300 hover:text-white transition-colors"
            data-cursor="button"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Recruiter Dispatch Terminal */}
      <div className="max-w-7xl mx-auto mt-12">
        <QuickContactTerminal />
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-600">
        <p>© {new Date().getFullYear()} Anuj. Engineered with Next.js, Motion & Tailwind CSS.</p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>ZERO UNVERIFIED METRICS · PRODUCTION READY</span>
        </p>
      </div>
    </footer>
  );
}
