"use client";

// Native Web Audio Synthesizer (Zero external audio assets)
// Native Web Audio Synthesizer (Zero external audio assets)
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function initAudio() {
  if (typeof window === "undefined") return;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
}

// Auto-attach resume on first interaction if sound is enabled
if (typeof window !== "undefined") {
  const handleFirstGesture = () => {
    if (soundEnabled) {
      initAudio();
    }
    window.removeEventListener("pointerdown", handleFirstGesture);
    window.removeEventListener("keydown", handleFirstGesture);
    window.removeEventListener("touchstart", handleFirstGesture);
  };
  window.addEventListener("pointerdown", handleFirstGesture, { passive: true });
  window.addEventListener("keydown", handleFirstGesture, { passive: true });
  window.addEventListener("touchstart", handleFirstGesture, { passive: true });
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): boolean {
  soundEnabled = enabled;
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio-audio", enabled ? "true" : "false");
    if (enabled) {
      initAudio();
      playChirp();
    }
  }
  return soundEnabled;
}

export function toggleSound(): boolean {
  return setSoundEnabled(!soundEnabled);
}

// Soft mechanical tactile click (50ms)
export function playClick() {
  if (!soundEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch {
    // Gracefully handle browser autoplay policies
  }
}

// Subtle high-tech data packet chirp (80ms)
export function playChirp() {
  if (!soundEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch {
    // Graceful fallback
  }
}

// Ascending harmonic chime on success
export function playSuccess() {
  if (!soundEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.02, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.12);
    });
  } catch {
    // Graceful fallback
  }
}
