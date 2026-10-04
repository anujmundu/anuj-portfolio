"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Activity, Radio, Volume2, Sparkles, RefreshCw, Cpu } from "lucide-react";
import { playClick, playChirp } from "@/lib/audio";

type ModulationType = "QPSK" | "16-QAM" | "BPSK" | "CHIRP";

export function GenerativeSignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modulation, setModulation] = useState<ModulationType>("QPSK");
  const [snrDb, setSnrDb] = useState(14); // SNR in dB
  const [carrierFreq, setCarrierFreq] = useState(48); // Relative carrier frequency
  const animationFrameRef = useRef<number | null>(null);
  const phaseRef = useRef(0);

  // History buffer for cascading waterfall spectrogram
  const waterfallRows = 70;
  const fftBins = 96;
  const waterfallHistoryRef = useRef<number[][]>(
    Array.from({ length: waterfallRows }, () => Array(fftBins).fill(0))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600);
    let height = (canvas.height = 240 * window.devicePixelRatio);

    const render = () => {
      phaseRef.current += 0.05;

      // 1. Generate current FFT slice based on modulation and noise
      const currentBinSlice = new Array(fftBins).fill(0);
      const noisePower = Math.pow(10, -snrDb / 20) * 0.45;
      const centerBin = Math.floor((carrierFreq / 100) * (fftBins - 20)) + 10;

      for (let i = 0; i < fftBins; i++) {
        // Gaussian noise floor
        const noise = (Math.random() - 0.5) * noisePower * 1.8;
        let signal = 0;

        // Add modulation peaks
        if (modulation === "BPSK") {
          const dist = Math.abs(i - centerBin);
          signal = Math.exp(-Math.pow(dist / 3, 2)) * 0.95;
        } else if (modulation === "QPSK") {
          const dist1 = Math.abs(i - (centerBin - 4));
          const dist2 = Math.abs(i - (centerBin + 4));
          signal = Math.max(Math.exp(-Math.pow(dist1 / 2.5, 2)), Math.exp(-Math.pow(dist2 / 2.5, 2))) * 0.92;
        } else if (modulation === "16-QAM") {
          const dist = Math.abs(i - centerBin);
          signal = (Math.exp(-Math.pow(dist / 6, 2)) * 0.75) + (Math.sin((i + phaseRef.current * 3) * 0.8) * 0.15);
        } else if (modulation === "CHIRP") {
          const chirpCenter = Math.floor(centerBin + Math.sin(phaseRef.current * 1.5) * 18);
          const dist = Math.abs(i - chirpCenter);
          signal = Math.exp(-Math.pow(dist / 2.2, 2)) * 0.98;
        }

        currentBinSlice[i] = Math.max(0, Math.min(1, signal + noise));
      }

      // 2. Push to waterfall history
      const history = waterfallHistoryRef.current;
      history.pop();
      history.unshift(currentBinSlice);

      // 3. Clear canvas with deep cyber navy
      ctx.fillStyle = "#040711";
      ctx.fillRect(0, 0, width, height);

      // 4. Render Spectrogram Waterfall (Top half)
      const waterfallHeight = height * 0.65;
      const binWidth = width / fftBins;
      const rowHeight = waterfallHeight / waterfallRows;

      for (let r = 0; r < waterfallRows; r++) {
        const row = history[r];
        for (let b = 0; b < fftBins; b++) {
          const val = row[b];
          if (val > 0.05) {
            // Cyber colormap: Navy -> Cyan -> Emerald -> Purple -> Gold
            let color = "";
            if (val < 0.25) {
              color = `rgba(0, 70, 140, ${val * 3})`;
            } else if (val < 0.55) {
              color = `rgba(0, 229, 255, ${val * 1.5})`;
            } else if (val < 0.8) {
              color = `rgba(16, 185, 129, ${val * 1.2})`;
            } else {
              color = `rgba(250, 204, 21, ${val})`;
            }
            ctx.fillStyle = color;
            ctx.fillRect(b * binWidth, r * rowHeight, binWidth + 0.5, rowHeight + 0.5);
          }
        }
      }

      // 5. Render Real-Time Time-Domain Oscilloscope Curve (Bottom third)
      const oscY = height * 0.82;
      const oscHeight = height * 0.14;

      // Oscilloscope background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, oscY);
      ctx.lineTo(width, oscY);
      ctx.stroke();

      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 8;
      ctx.beginPath();

      for (let x = 0; x < width; x += 2) {
        const t = (x / width) * 20 + phaseRef.current * 4;
        let wave = Math.sin(t * (carrierFreq / 30));
        if (modulation === "QPSK") wave += 0.5 * Math.cos(t * 1.4);
        if (modulation === "16-QAM") wave = wave * Math.sin(t * 0.3) * 1.2;
        const noiseSample = (Math.random() - 0.5) * noisePower * 1.5;

        const y = oscY + (wave + noiseSample) * oscHeight * 0.5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset blur

      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, modulation, snrDb, carrierFreq]);

  const togglePlay = () => {
    playClick();
    setIsPlaying(!isPlaying);
  };

  const handleModChange = (m: ModulationType) => {
    playClick();
    setModulation(m);
    playChirp();
  };

  return (
    <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#060914] space-y-5 shadow-2xl relative overflow-hidden font-mono text-xs">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white tracking-wide uppercase">
                EXP 04 // GENERATIVE RF SPECTROGRAM & DSP WATERFALL
              </h3>
              <span className="px-2 py-0.2 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[9px] font-bold">
                TECH-ART CANVAS
              </span>
            </div>
            <p className="text-[11px] font-sans text-zinc-400 mt-0.5">
              Live mathematical Fourier transformation synthesizing RF IQ constellations, AWGN channel noise, and dynamic spectrogram waterfall heatmaps.
            </p>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-[11px] font-bold transition-all cursor-pointer shrink-0"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? "FREEZE TIME" : "RESUME FEED"}</span>
        </button>
      </div>

      {/* Canvas Viewport */}
      <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#040711] relative shadow-inner">
        <canvas ref={canvasRef} className="w-full h-[220px] block cursor-crosshair" />

        <div className="absolute top-2 left-3 flex items-center gap-3 text-[10px] text-zinc-400 font-mono pointer-events-none bg-black/60 px-2 py-1 rounded border border-white/[0.06]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-white font-bold">{modulation}</span>
          </span>
          <span>•</span>
          <span>SNR: <strong className="text-emerald-400">{snrDb} dB</strong></span>
          <span>•</span>
          <span>FC: <strong className="text-cyan-300">{carrierFreq * 20} MHz</strong></span>
        </div>

        <div className="absolute bottom-2 right-3 text-[9px] text-zinc-500 font-mono pointer-events-none bg-black/50 px-2 py-0.5 rounded">
          SPECTROGRAM: FFT BINS 96 · TIME STEPS 70
        </div>
      </div>

      {/* Tactile Control Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        {/* 1. Modulation Scheme */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-zinc-400 uppercase tracking-wider block font-bold">
            MODULATION SCHEME:
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {(["QPSK", "16-QAM", "BPSK", "CHIRP"] as ModulationType[]).map((m) => (
              <button
                key={m}
                onClick={() => handleModChange(m)}
                className={`py-1.5 px-2 rounded text-center text-[10px] font-bold transition-all cursor-pointer border ${
                  modulation === m
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/80 shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                    : "bg-black/50 text-zinc-400 border-white/[0.06] hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* 2. SNR Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-zinc-400 uppercase tracking-wider font-bold">CHANNEL SNR (AWGN):</span>
            <span className="text-emerald-400 font-bold">{snrDb} dB</span>
          </div>
          <input
            type="range"
            min="-6"
            max="26"
            step="1"
            value={snrDb}
            onChange={(e) => setSnrDb(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-white/[0.08] h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[8px] text-zinc-500">
            <span>-6 dB (High Noise)</span>
            <span>+26 dB (Clean IQ)</span>
          </div>
        </div>

        {/* 3. Carrier Frequency Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-zinc-400 uppercase tracking-wider font-bold">CARRIER FREQUENCY:</span>
            <span className="text-cyan-300 font-bold">{carrierFreq * 20} MHz</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            step="1"
            value={carrierFreq}
            onChange={(e) => setCarrierFreq(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-white/[0.08] h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[8px] text-zinc-500">
            <span>200 MHz</span>
            <span>1800 MHz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
