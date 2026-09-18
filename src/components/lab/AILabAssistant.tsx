"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Send, Sparkles, MessageSquare, Terminal } from "lucide-react";

interface QnA {
  id: string;
  question: string;
  category: string;
  answer: string;
  tech: string[];
}

const PRESET_QUESTIONS: QnA[] = [
  {
    id: "yolo-choice",
    question: "Why did you select YOLOv5s over heavier modern detectors like YOLOv8x?",
    category: "COMPUTER VISION",
    answer: "Production hardware constraints dictated the decision. Edge CPU nodes have a strict 30ms latency budget. While YOLOv8x provided a marginal +2.1% mAP gain, it increased tensor parameter size fourfold and consumed 3.8x more CPU cycles. YOLOv5s quantized to INT8 with ONNX Runtime executes deterministically in 24.8ms P95 latency with 89.4% mAP.",
    tech: ["YOLOv5s", "ONNX Runtime", "INT8 Quantization", "CPU Optimization"]
  },
  {
    id: "temporal-leakage",
    question: "How did you prevent data leakage in the customer churn predictive model?",
    category: "DATA SCIENCE",
    answer: "Standard random K-Fold cross-validation allows future transactions to inform past predictions, causing artificial accuracy inflation. I implemented a strict 6-fold rolling Time-Series Split. All SQL feature engineering (rolling activity velocities, ticket escalations) utilized strictly backward-looking LAG and window aggregations anchored to the prediction cutoff date.",
    tech: ["SQL Window Functions", "Time-Series Split", "XGBoost", "Feature Engineering"]
  },
  {
    id: "star-schema",
    question: "What were the advantages of designing a Star Schema for retail transaction logs?",
    category: "DATA ANALYTICS",
    answer: "Raw event tables were denormalized with 45+ redundant text columns, leading to slow table scans. By modeling into FactOrders with integer surrogate keys linking to DimCustomer, DimProduct, and DimDate, query storage dropped by 62% and analytical aggregation queries (cohort retention matrices and AOV) accelerated 4.2x with materialized view caching.",
    tech: ["PostgreSQL", "Star Schema", "Materialized Views", "Dimensional Modeling"]
  },
  {
    id: "microservice-concurrency",
    question: "How does the computer vision service handle video stream frame drops without lagging?",
    category: "AI ENGINEERING",
    answer: "Instead of synchronous blocking loops, I architected a decoupled producer-consumer pipeline. An OpenCV thread ingests frames into an in-memory ring buffer with a 5-frame cap. If downstream ONNX inference or network delivery stutters, stale frames are discarded rather than queued, ensuring the client stream always reflects real-time reality.",
    tech: ["FastAPI", "Ring-Buffer Queue", "Python Threading", "WebSocket"]
  }
];

export function AILabAssistant() {
  const [selectedQnA, setSelectedQnA] = useState<QnA>(PRESET_QUESTIONS[0]);
  const [customQuery, setCustomQuery] = useState("");
  const [activeHistory, setActiveHistory] = useState<QnA[]>([PRESET_QUESTIONS[0]]);

  const handleSelectPreset = (qna: QnA) => {
    setSelectedQnA(qna);
    if (!activeHistory.find((item) => item.id === qna.id)) {
      setActiveHistory((prev) => [...prev, qna]);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    // Search existing preset answers for best keyword match
    const qLower = customQuery.toLowerCase();
    const matched = PRESET_QUESTIONS.find(
      (p) =>
        qLower.includes("yolo") ||
        qLower.includes("vision") ||
        qLower.includes("churn") ||
        qLower.includes("sql") ||
        qLower.includes("latency") ||
        qLower.includes("fastapi")
    ) || {
      id: "general-match",
      question: customQuery,
      category: "CONTEXTUAL INTELLIGENCE",
      answer: "Anuj specializes across three unified disciplines: Data Analytics (SQL, Pandas, cohort retention), Data Science (Scikit-Learn, XGBoost, SHAP, cross-validation), and AI/ML Engineering (PyTorch, OpenCV, YOLOv5, FastAPI, Docker). All implementations prioritize deterministic production performance and verified out-of-sample metrics.",
      tech: ["Python", "SQL", "PyTorch", "FastAPI", "Docker"]
    };

    setActiveHistory((prev) => [...prev, matched]);
    setSelectedQnA(matched);
    setCustomQuery("");
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0c0e15] p-6 sm:p-10 font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Bot className="w-4 h-4" />
            <span>ANUJ'S AI LAB // CONTEXTUAL SYSTEM QUERY</span>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Query specific architectural trade-offs, data pipelines, or modeling decisions directly against project telemetry.
          </p>
        </div>
      </div>

      {/* Preset Query Badges */}
      <div className="space-y-2">
        <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
          SUGGESTED ARCHITECTURAL INQUIRIES:
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUESTIONS.map((q) => (
            <button
              key={q.id}
              onClick={() => handleSelectPreset(q)}
              className={`text-xs px-3 py-1.5 rounded border transition-all text-left cursor-pointer ${
                selectedQnA.id === q.id
                  ? "bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                  : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
              data-cursor="button"
            >
              {q.question}
            </button>
          ))}
        </div>
      </div>

      {/* Query Answer Panel */}
      <div className="p-6 rounded-lg border border-cyan-500/30 bg-[#080a0f] space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
          <span className="text-cyan-400 font-bold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            RESPONSE FOR: "{selectedQnA.question}"
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 uppercase">
            {selectedQnA.category}
          </span>
        </div>

        <p className="text-sm text-zinc-300 font-sans leading-relaxed">
          {selectedQnA.answer}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-zinc-500">RELEVANT TECH:</span>
          {selectedQnA.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 text-[10px]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Quick custom query prompt */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Ask about my models, data pipelines, or architecture choices..."
            className="w-full bg-[#08090e] border border-white/[0.08] rounded px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded bg-cyan-400 text-black text-xs font-bold hover:bg-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          data-cursor="button"
        >
          <span>QUERY</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
}
