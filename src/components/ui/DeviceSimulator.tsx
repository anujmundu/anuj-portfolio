"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Smartphone,
  Tablet,
  Monitor,
  Tv,
  RotateCw,
  Maximize2,
  Minimize2,
  X,
  Sparkles,
  Zap,
  Sliders,
  Check,
  Compass,
  Layers,
  Activity,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { playClick, playChirp } from "@/lib/audio";

export interface DevicePreset {
  id: string;
  name: string;
  category: "mobile" | "tablet" | "laptop" | "tv" | "responsive";
  icon: React.ElementType;
  width: number;
  height: number;
  dpr: number;
  aspectRatio: string;
  hasBezel: boolean;
  bezelRadius: string;
  notchType?: "island" | "camera" | "none";
}

const DEVICE_PRESETS: DevicePreset[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    category: "mobile",
    icon: Smartphone,
    width: 393,
    height: 852,
    dpr: 3.0,
    aspectRatio: "9:19.5",
    hasBezel: true,
    bezelRadius: "48px",
    notchType: "island"
  },
  {
    id: "galaxy-s24",
    name: "Galaxy S24",
    category: "mobile",
    icon: Smartphone,
    width: 390,
    height: 844,
    dpr: 3.0,
    aspectRatio: "9:19.5",
    hasBezel: true,
    bezelRadius: "42px",
    notchType: "camera"
  },
  {
    id: "compact-mobile",
    name: "Compact Mobile",
    category: "mobile",
    icon: Smartphone,
    width: 360,
    height: 740,
    dpr: 2.0,
    aspectRatio: "9:18.5",
    hasBezel: true,
    bezelRadius: "36px",
    notchType: "camera"
  },
  {
    id: "ipad-pro-11",
    name: "iPad Pro 11\"",
    category: "tablet",
    icon: Tablet,
    width: 834,
    height: 1194,
    dpr: 2.0,
    aspectRatio: "3:4.3",
    hasBezel: true,
    bezelRadius: "32px",
    notchType: "camera"
  },
  {
    id: "ipad-mini",
    name: "iPad Mini 768px",
    category: "tablet",
    icon: Tablet,
    width: 768,
    height: 1024,
    dpr: 2.0,
    aspectRatio: "3:4",
    hasBezel: true,
    bezelRadius: "28px",
    notchType: "camera"
  },
  {
    id: "macbook-14",
    name: "MacBook Pro 14\"",
    category: "laptop",
    icon: Monitor,
    width: 1440,
    height: 900,
    dpr: 2.0,
    aspectRatio: "16:10",
    hasBezel: true,
    bezelRadius: "16px",
    notchType: "island"
  },
  {
    id: "fhd-desktop",
    name: "1080p Desktop",
    category: "laptop",
    icon: Monitor,
    width: 1920,
    height: 1080,
    dpr: 1.0,
    aspectRatio: "16:9",
    hasBezel: false,
    bezelRadius: "8px",
    notchType: "none"
  },
  {
    id: "tv-4k",
    name: "4K Cinema / TV",
    category: "tv",
    icon: Tv,
    width: 2560,
    height: 1440,
    dpr: 1.5,
    aspectRatio: "16:9",
    hasBezel: true,
    bezelRadius: "6px",
    notchType: "none"
  }
];

export function DeviceSimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInsideIframe, setIsInsideIframe] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DevicePreset>(DEVICE_PRESETS[0]);
  const [isLandscape, setIsLandscape] = useState(false);
  const [showBezel, setShowBezel] = useState(true);
  const [zoomScale, setZoomScale] = useState(0.85);
  const [autoFit, setAutoFit] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("/");
  const [screenDim, setScreenDim] = useState({ w: 1920, h: 1080 });

  const stageRef = useRef<HTMLDivElement>(null);

  // Check if current window is inside an iframe or ?simulated=1
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isIframe = window.self !== window.top || window.location.search.includes("simulated=1");
    setIsInsideIframe(isIframe);

    const updateDim = () => {
      setScreenDim({ w: window.innerWidth, h: window.innerHeight });
    };
    updateDim();
    window.addEventListener("resize", updateDim);

    // Set clean current URL for the iframe
    const cleanPath = window.location.pathname + (window.location.hash || "");
    const sep = cleanPath.includes("?") ? "&" : "?";
    setCurrentUrl(`${cleanPath}${sep}simulated=1`);

    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-device-simulator", handleOpenEvent);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Hotkey: Ctrl+Shift+M or Alt+D to toggle simulator
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "m") || (e.altKey && e.key.toLowerCase() === "d")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", updateDim);
      window.removeEventListener("open-device-simulator", handleOpenEvent);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Dimensions with orientation factored in
  const targetWidth = isLandscape ? selectedDevice.height : selectedDevice.width;
  const targetHeight = isLandscape ? selectedDevice.width : selectedDevice.height;

  // Auto-calculate zoom scale to fit comfortably in user's browser window
  useEffect(() => {
    if (!autoFit || !isOpen || typeof window === "undefined") return;

    // Available space inside the studio stage (minus top bar 64px, margins 80px)
    const availableW = window.innerWidth - 80;
    const availableH = window.innerHeight - 150;

    const scaleW = availableW / targetWidth;
    const scaleH = availableH / targetHeight;
    const bestScale = Math.min(scaleW, scaleH, 1.0);

    // Clamp between 0.28 and 1.05
    const clamped = Math.max(0.28, Math.min(bestScale * 0.94, 1.05));
    setZoomScale(Number(clamped.toFixed(2)));
  }, [selectedDevice, isLandscape, autoFit, isOpen, screenDim]);

  const handleSelectDevice = (device: DevicePreset) => {
    playClick();
    setSelectedDevice(device);
    // If device was desktop or tv, default to landscape
    if (device.category === "laptop" || device.category === "tv") {
      setIsLandscape(false);
    }
  };

  const handleToggleOrientation = () => {
    playChirp();
    setIsLandscape(!isLandscape);
  };

  const handleReloadFrame = () => {
    playClick();
    setIframeKey((prev) => prev + 1);
  };

  // If page is being simulated inside the iframe itself, DO NOT render the simulator
  if (isInsideIframe) {
    return null;
  }

  const getBreakpointLabel = (w: number) => {
    if (w < 640) return "MOBILE (XS/SM)";
    if (w < 1024) return "TABLET (MD)";
    if (w < 1440) return "LAPTOP (LG/XL)";
    if (w < 2000) return "DESKTOP (2XL)";
    return "4K TV (3XL/4K)";
  };

  return (
    <>
      {/* Floating Trigger HUD Button (Visible on native viewport) */}
      {!isOpen && (
        <div className="fixed bottom-6 left-6 z-40 pointer-events-auto select-none">
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playClick();
              setIsOpen(true);
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#070b14]/90 hover:bg-[#0c1424] border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(0,229,255,0.2)] font-mono text-xs font-bold transition-all cursor-pointer group"
            title="Open Interactive Responsive Design Simulator (Alt+D or Ctrl+Shift+M)"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <Smartphone className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="tracking-wider uppercase">RESPONSIVE SIMULATOR</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-cyan-500/20 text-[10px] text-cyan-200 border border-cyan-400/30">
              {screenDim.w}×{screenDim.h}
            </span>
          </motion.button>
        </div>
      )}

      {/* Full-Screen Studio Overlay Mode */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#020408]/95 backdrop-blur-3xl flex flex-col font-mono select-none overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-3xl" />

            {/* Top Studio Control HUD */}
            <header className="h-16 px-4 sm:px-6 border-b border-white/[0.08] bg-[#040711]/90 backdrop-blur-xl flex items-center justify-between gap-4 z-30 shrink-0">
              {/* Left Brand & Title */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00e5ff]" />
                  <span className="text-white font-extrabold text-sm uppercase tracking-wider">
                    RESPONSIVE SIMULATOR STUDIO
                  </span>
                </div>
                <span className="hidden md:inline-block text-[10px] text-zinc-500 px-2 py-0.5 rounded border border-white/[0.06] bg-black/40">
                  {getBreakpointLabel(targetWidth)}
                </span>
              </div>

              {/* Center Device Selector Chips */}
              <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/[0.08]">
                {DEVICE_PRESETS.map((d) => {
                  const isSelected = selectedDevice.id === d.id;
                  const Icon = d.icon;
                  return (
                    <button
                      key={d.id}
                      onClick={() => handleSelectDevice(d)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-400/50 shadow-[0_0_12px_rgba(0,229,255,0.3)]"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{d.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Viewport Controls & Telemetry */}
              <div className="flex items-center gap-3">
                {/* Mobile Dropdown for Device Selection (Under lg) */}
                <div className="lg:hidden">
                  <select
                    value={selectedDevice.id}
                    onChange={(e) => {
                      const d = DEVICE_PRESETS.find((p) => p.id === e.target.value);
                      if (d) handleSelectDevice(d);
                    }}
                    className="bg-[#0b101d] text-cyan-300 border border-cyan-500/40 text-xs rounded-lg px-2.5 py-1.5 font-mono focus:outline-none"
                  >
                    {DEVICE_PRESETS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.width}×{d.height})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rotate Orientation */}
                <button
                  onClick={handleToggleOrientation}
                  className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isLandscape
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50"
                      : "bg-white/[0.03] text-zinc-400 hover:text-white border-white/[0.08]"
                  }`}
                  title="Toggle Portrait / Landscape Orientation"
                >
                  <RotateCw className="w-4 h-4" />
                  <span className="hidden sm:inline">{isLandscape ? "LANDSCAPE" : "PORTRAIT"}</span>
                </button>

                {/* Bezel Toggle */}
                <button
                  onClick={() => {
                    playClick();
                    setShowBezel(!showBezel);
                  }}
                  className={`hidden sm:flex p-2 rounded-lg border text-xs transition-colors cursor-pointer items-center gap-1.5 ${
                    showBezel
                      ? "bg-purple-500/20 text-purple-300 border-purple-400/50"
                      : "bg-white/[0.03] text-zinc-400 hover:text-white border-white/[0.08]"
                  }`}
                  title="Toggle Realistic Device Bezel Chassis"
                >
                  <Layers className="w-4 h-4" />
                  <span>BEZEL</span>
                </button>

                {/* Auto-Fit Toggle & Zoom */}
                <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/40 border border-white/[0.08] text-xs">
                  <button
                    onClick={() => {
                      playClick();
                      setAutoFit(!autoFit);
                    }}
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                      autoFit ? "bg-cyan-400 text-black" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    FIT
                  </button>
                  <span className="text-zinc-400 font-mono text-xs">{Math.round(zoomScale * 100)}%</span>
                  <input
                    type="range"
                    min="0.25"
                    max="1.25"
                    step="0.05"
                    value={zoomScale}
                    onChange={(e) => {
                      setAutoFit(false);
                      setZoomScale(parseFloat(e.target.value));
                    }}
                    className="w-16 h-1.5 bg-white/10 rounded appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Reload Frame */}
                <button
                  onClick={handleReloadFrame}
                  className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  title="Reload Simulated Viewport"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                {/* Close Studio */}
                <button
                  onClick={() => {
                    playClick();
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20 transition-colors cursor-pointer ml-1"
                  title="Exit Simulator Studio (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Main Interactive Device Stage */}
            <main
              ref={stageRef}
              className="flex-1 w-full h-full overflow-auto relative flex items-center justify-center p-4 sm:p-8 technical-grid"
            >
              {/* Simulated Device Frame Container */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: "center center"
                }}
                className="relative transition-transform duration-200"
              >
                {/* Physical Chassis Bezel Shadow & Housing */}
                <div
                  style={{
                    width: targetWidth + (showBezel ? 32 : 0),
                    height: targetHeight + (showBezel ? 32 : 0),
                    borderRadius: showBezel ? selectedDevice.bezelRadius : "12px"
                  }}
                  className={`relative flex items-center justify-center transition-all duration-300 ${
                    showBezel
                      ? "bg-[#10131c] border-4 border-[#22293b] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(0,229,255,0.15)] ring-1 ring-white/15"
                      : "border border-white/20 shadow-2xl"
                  }`}
                >
                  {/* Dynamic Island / Camera Notch (When Bezel Enabled) */}
                  {showBezel && selectedDevice.notchType === "island" && !isLandscape && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3 border border-white/10 pointer-events-none shadow-md">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0a121e] border border-white/20" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                  )}

                  {showBezel && selectedDevice.notchType === "camera" && !isLandscape && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-40 border border-white/20 pointer-events-none shadow-md" />
                  )}

                  {/* Speaker Ear Piece Top Slit */}
                  {showBezel && selectedDevice.category === "mobile" && !isLandscape && (
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-1 bg-zinc-700 rounded-full z-40 pointer-events-none" />
                  )}

                  {/* High-fidelity iframe with isolated viewport simulation */}
                  <iframe
                    key={`sim-frame-${iframeKey}-${selectedDevice.id}-${isLandscape}`}
                    src={currentUrl}
                    title={`${selectedDevice.name} Live Responsive Viewport`}
                    style={{
                      width: `${targetWidth}px`,
                      height: `${targetHeight}px`,
                      borderRadius: showBezel
                        ? `calc(${selectedDevice.bezelRadius} - 8px)`
                        : "8px"
                    }}
                    className="bg-[#020408] border-0 overflow-auto shadow-inner relative z-20"
                  />

                  {/* Bottom Home Indicator Bar on Mobile Devices */}
                  {showBezel && selectedDevice.category === "mobile" && !isLandscape && (
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-40 pointer-events-none" />
                  )}
                </div>
              </motion.div>
            </main>

            {/* Bottom Live Viewport Telemetry Status Bar */}
            <footer className="h-10 px-4 sm:px-6 border-t border-white/[0.08] bg-[#03060d]/90 text-[11px] text-zinc-400 flex items-center justify-between z-30 shrink-0 font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <selectedDevice.icon className="w-3.5 h-3.5" />
                  <span>{selectedDevice.name}</span>
                </span>
                <span className="text-zinc-600">|</span>
                <span>
                  VIEWPORT: <strong className="text-white">{targetWidth} × {targetHeight} px</strong>
                </span>
                <span className="text-zinc-600 hidden sm:inline">|</span>
                <span className="hidden sm:inline">
                  ASPECT RATIO: <strong className="text-zinc-300">{selectedDevice.aspectRatio}</strong>
                </span>
                <span className="text-zinc-600 hidden md:inline">|</span>
                <span className="hidden md:inline">
                  DPR: <strong className="text-zinc-300">{selectedDevice.dpr}x</strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-emerald-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>RESPONSIVE ENGINE ACTIVE</span>
                </span>
                <span className="text-zinc-600 hidden sm:inline">·</span>
                <span className="text-zinc-500 hidden sm:inline">PRESS ESC TO EXIT</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DeviceSimulator;
