"use client";

import React, { useState } from "react";
import { Send, Check, Copy, Terminal, Sparkles, Mail, Loader2, AlertCircle } from "lucide-react";
import { playClick, playSuccess, playChirp } from "@/lib/audio";

export function QuickContactTerminal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const targetEmail = "anuj.engineering.ai@gmail.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please provide your name, email, and a brief message.");
      playChirp();
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    const formattedSummary = `Candidate Inquiry for Anuj Mundu:
From: ${name} (${email})
Company: ${company || "Not specified"}
Role/Message: ${message}`;

    try {
      // Direct-to-inbox dispatch via FormSubmit AJAX API
      const res = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          company: company || "Direct Visitor",
          message: message,
          _subject: `⚡ Portfolio Direct Dispatch: ${name}${company ? ` from ${company}` : ""}`,
          _template: "table",
          _captcha: "false"
        })
      });

      if (res.ok) {
        setSubmitted(true);
        navigator.clipboard.writeText(formattedSummary);
        setCopied(true);
        playSuccess();
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
      } else {
        throw new Error("Transmission failed. Falling back to local copy.");
      }
    } catch (err) {
      // Fallback: Copy to clipboard and provide mailto link
      navigator.clipboard.writeText(formattedSummary);
      setCopied(true);
      setErrorMsg("Background transit timed out. Your message was copied to clipboard!");
      playChirp();
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#060812] space-y-4 font-mono text-xs shadow-2xl relative overflow-hidden">
      {/* Ambient Cyber Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>INSTANT INBOX DISPATCH TERMINAL</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          DIRECT TO: {targetEmail}
        </span>
      </div>

      <p className="text-zinc-400 text-[11px] font-sans leading-relaxed">
        Send a direct message into Anuj's personal Gmail inbox right from this terminal. No external email apps required.
      </p>

      {submitted ? (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 text-emerald-300">
          <div className="flex items-center gap-2 font-bold text-xs">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>PAYLOAD TRANSMITTED DIRECTLY TO ANUJ'S GMAIL INBOX!</span>
          </div>
          <p className="text-[11px] text-zinc-300 font-sans">
            Thank you! Your message has been received. Anuj typically replies within 12 hours. A copy was also saved to your clipboard.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 text-[10px] text-cyan-300 hover:text-white underline underline-offset-2 cursor-pointer"
          >
            Send another dispatch →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">
                Your Name / Title: <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Sarah Connor (Tech Recruiter)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.08] focus:border-cyan-400 focus:outline-none text-zinc-200 text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">
                Your Email: <span className="text-cyan-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="sarah@anthropic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.08] focus:border-cyan-400 focus:outline-none text-zinc-200 text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">
                Company / Organization:
              </label>
              <input
                type="text"
                placeholder="Anthropic / Stealth AI"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.08] focus:border-cyan-400 focus:outline-none text-zinc-200 text-xs font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">
              Role Details / Inbound Message: <span className="text-cyan-400">*</span>
            </label>
            <textarea
              rows={2}
              required
              placeholder="We have an open Senior AI Systems Engineer role (Remote / Hybrid, $160k-$210k). Are you available for an intro chat this week?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.08] focus:border-cyan-400 focus:outline-none text-zinc-200 text-xs font-mono resize-none"
            />
          </div>

          {errorMsg && (
            <div className="text-[10px] text-amber-400 flex items-center gap-1.5 font-sans">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:bg-zinc-700 text-black font-black text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)] cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>TRANSMITTING DIRECT TO GMAIL...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND DIRECT TO ANUJ'S GMAIL INBOX</span>
                </>
              )}
            </button>

            <span className="text-[10px] text-zinc-500 font-mono">
              Manual fallback: <a href={`mailto:${targetEmail}`} className="text-zinc-400 hover:text-cyan-300 underline underline-offset-2">{targetEmail}</a>
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
