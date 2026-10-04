"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Download, Mail, Check, Copy } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/skills";
import { PROJECTS } from "@/data/projects";
import { TIMELINE } from "@/data/experience";
import { playClick, playSuccess } from "@/lib/audio";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function ResumePage() {
  const [copied, setCopied] = React.useState(false);
  const email = "anuj.engineering.ai@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    playClick();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-300 font-mono py-24 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:p-0">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation & Print Controls (Hidden on Print) */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 print:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/[0.08] bg-white/[0.03] text-xs text-white hover:border-cyan-400 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "COPIED" : "COPY EMAIL"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-cyan-400 text-black text-xs font-bold hover:bg-cyan-300 transition-colors cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.3)]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE AS PDF</span>
            </button>
          </div>
        </div>

        {/* ATS Resume Printable Container */}
        <article className="bg-[#0b0d14] print:bg-white border border-white/[0.08] print:border-none rounded-xl p-8 sm:p-12 space-y-8 shadow-2xl print:shadow-none print:p-0">
          {/* Header */}
          <header className="border-b border-white/[0.08] print:border-black/20 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white print:text-black tracking-tight uppercase">
                ANUJ MUNDU
              </h1>
              <div className="text-xs text-cyan-400 print:text-blue-700 font-bold uppercase tracking-wider">
                PYTHON BACKEND ENGINEER · AI/ML SYSTEMS · DATA SCIENTIST
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 print:text-zinc-700 pt-1">
              <span>anujmark.edwin.ame@gmail.com</span>
              <span>•</span>
              <span>Bhopal, India (Open to Remote / Relocation)</span>
              <span>•</span>
              <a href="https://github.com/anujmundu" target="_blank" rel="noreferrer" className="hover:underline text-cyan-400 print:text-blue-700">github.com/anujmundu</a>
              <span>•</span>
              <a href="https://linkedin.com/in/anujmundu" target="_blank" rel="noreferrer" className="hover:underline text-cyan-400 print:text-blue-700">linkedin.com/in/anujmundu</a>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 print:text-black font-bold border-b border-white/[0.06] print:border-black/10 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm font-sans text-zinc-300 print:text-zinc-800 leading-relaxed">
              Applied AI/ML Engineer, Data Scientist, and Data Analyst specializing in the end-to-end lifecycle: from SQL database extraction and exploratory data analysis to statistical predictive modeling in Scikit-Learn, deep learning computer vision in PyTorch, and low-latency microservice deployment via FastAPI and Docker.
            </p>
          </section>

          {/* Technical Skills Matrix */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 print:text-black font-bold border-b border-white/[0.06] print:border-black/10 pb-1">
              CORE TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <strong className="text-white print:text-black">01. Data Analytics:</strong>{" "}
                <span className="text-zinc-400 print:text-zinc-700">
                  SQL (PostgreSQL), Python, Pandas, NumPy, Statistics, EDA, Data Cleaning, Dimensional Modeling (Star Schema), Cohort Retention.
                </span>
              </div>
              <div>
                <strong className="text-white print:text-black">02. Data Science:</strong>{" "}
                <span className="text-zinc-400 print:text-zinc-700">
                  Scikit-Learn, XGBoost, Feature Engineering, Calibrated Cross-Validation, SHAP Factor Attribution, ROC-AUC, Precision-Recall.
                </span>
              </div>
              <div>
                <strong className="text-white print:text-black">03. AI & Computer Vision:</strong>{" "}
                <span className="text-zinc-400 print:text-zinc-700">
                  PyTorch 2.x, OpenCV, YOLOv5, Torchvision, Transfer Learning, ResNet-50, Grad-CAM, INT8 ONNX Runtime Quantization.
                </span>
              </div>
              <div>
                <strong className="text-white print:text-black">04. Software & Deployment:</strong>{" "}
                <span className="text-zinc-400 print:text-zinc-700">
                  FastAPI, REST APIs, Redis Queues, Multi-Stage Docker, Git, Linux CLI, WebSocket Feeds, CI/CD.
                </span>
              </div>
            </div>
          </section>

          {/* Flagship Production Projects */}
          <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 print:text-black font-bold border-b border-white/[0.06] print:border-black/10 pb-1">
              FLAGSHIP ENGINEERING PROJECTS
            </h2>

            <div className="space-y-4 text-xs">
              {PROJECTS.filter((p) => p.featured).map((proj) => (
                <div key={proj.slug} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="text-white print:text-black font-bold text-sm">
                      {proj.title}
                    </span>
                    <span className="text-cyan-400 print:text-blue-700 font-semibold text-[11px]">
                      {proj.metrics[0].label}: {proj.metrics[0].value}
                    </span>
                  </div>

                  <div className="text-zinc-500 print:text-zinc-600 text-[11px]">
                    Technologies: {proj.tags.join(", ")}
                  </div>

                  <p className="font-sans text-zinc-300 print:text-zinc-800 text-xs leading-relaxed">
                    {proj.shortDescription}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience & Education */}
          <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 print:text-black font-bold border-b border-white/[0.06] print:border-black/10 pb-1">
              EXPERIENCE & EDUCATION
            </h2>

            <div className="space-y-4 text-xs">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="text-white print:text-black font-bold">
                      {item.role}
                    </span>
                    <span className="text-zinc-500 print:text-zinc-600 text-[11px]">{item.period}</span>
                  </div>
                  <div className="text-zinc-400 print:text-zinc-700 font-semibold">
                    {item.organization} — {item.location}
                  </div>
                  <ul className="list-disc pl-4 space-y-1 font-sans text-zinc-400 print:text-zinc-800 pt-1">
                    {item.description.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
