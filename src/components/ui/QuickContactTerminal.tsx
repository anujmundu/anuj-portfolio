"use client";

import React, { useState } from "react";
import { Send, Check, Copy, Terminal, Sparkles, Mail } from "lucide-react";
import { playClick, playSuccess } from "@/lib/audio";

export function QuickContactTerminal() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  const targetEmail = "anuj.engineering.ai@gmail.com";

  const handleCopyOrSend = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    const formattedMessage = `Hi Anuj,

This is ${name || "a Recruiter / Engineering Lead"}${company ? ` from ${company}` : ""}.
I reviewed your systems portfolio (11 live apps & 419 unit tests).

Message:
${message || "We have an open AI/ML Engineer role and would like to schedule an interview."}

Best regards,
${name || "Candidate Sourcer"}`;

    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setDispatched(true);
    playSuccess();

    // Also attempt mailto safely
    const mailtoUrl = `mailto:${targetEmail}?subject=Interview / Project Inquiry: ${encodeURIComponent(name || "Engineering Team")}${company ? ` - ${encodeURIComponent(company)}` : ""}&body=${encodeURIComponent(formattedMessage)}`;
    
    // Attempt window open if desired
    const link = document.createElement("a");
    link.href = mailtoUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();

    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#060812] space-y-4 font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>INSTANT RECRUITER DISPATCH TERMINAL</span>
        </div>
        <span className="text-[10px] text-zinc-500 font-mono">DIRECT INBOX PIPELINE</span>
      </div>

      <p className="text-zinc-400 text-[11px] font-sans">
        Skip mail-client launch friction. Enter your details below to generate a pre-formatted message copied to clipboard and dispatched to <strong className="text-cyan-300 font-mono">{targetEmail}</strong>.
      </p>

      <form onSubmit={handleCopyOrSend} className="space-y-3 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider block">Your Name / Title:</label>
            <input
              type="text"
              placeholder="e.g. Sarah Connor (Tech Recruiter)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.08] focus:border-cyan-400 focus:outline-none text-zinc-200 text-xs font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider block">Company / Organization:</label>
            <input
              type="text"
              placeholder="e.g. Anthropic / Stealth AI"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.08] focus:border-cyan-400 focus:outline-none text-zinc-200 text-xs font-mono"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase tracking-wider block">Role Details / Opportunity:</label>
          <textarea
            rows={2}
            placeholder="e.g. We have an open Senior AI Systems Engineer role (Remote / Hybrid, $160k-$210k). Are you open to a chat this week?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.08] focus:border-cyan-400 focus:outline-none text-zinc-200 text-xs font-mono resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span>COPIED TO CLIPBOARD &amp; DISPATCHED!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>DISPATCH MESSAGE (1-CLICK COPY &amp; SEND)</span>
              </>
            )}
          </button>

          <span className="text-[10px] text-zinc-500 font-mono">
            Direct: <a href={`mailto:${targetEmail}`} className="text-zinc-400 hover:text-cyan-300 underline underline-offset-2">{targetEmail}</a>
          </span>
        </div>
      </form>
    </div>
  );
}
